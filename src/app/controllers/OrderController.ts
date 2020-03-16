import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Order from '@models/Order';

class OrderController {
  async index(req: Request, res: Response) {
    const store_id = req.storeId;
    const q = req.query.q || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 7, 10);

    const orders = await Order.findAndCountAll({
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

    const lastPage = Math.ceil(orders.count / perPage);

    return res.json({
      total: orders.count,
      perPage,
      lastPage,
      page,
      data: orders.rows,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const store_id = req.storeId;
      const { name, status, reference, price, amount, service } = req.body;

      const order = await Order.create({
        name,
        store_id,
        status,
        reference,
        price,
        amount,
        service,
      });

      return res.status(201).json(order);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const [rowsEffect, order] = await Order.update(
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

    return res.status(200).json(order);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Order.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new OrderController();
