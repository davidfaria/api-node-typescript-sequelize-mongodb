import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Customer from '@models/Customer';

class CustomerController {
  async index(req: Request, res: Response) {
    const store_id = req.storeId;
    const q = req.query.q || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 7, 10);

    const customers = await Customer.findAndCountAll({
      order: ['name'],
      where: {
        store_id,
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const lastPage = Math.ceil(customers.count / perPage);

    return res.json({
      total: customers.count,
      perPage,
      lastPage,
      page,
      data: customers.rows,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const store_id = req.storeId;
      const { name, status, reference, price, amount, service } = req.body;

      const customer = await Customer.create({
        name,
        store_id,
        status,
        reference,
        price,
        amount,
        service,
      });

      return res.status(201).json(customer);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const [rowsEffect, customer] = await Customer.update(
      {
        name,
        status,
      },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      },
    );

    return res.status(200).json(customer);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Customer.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new CustomerController();
