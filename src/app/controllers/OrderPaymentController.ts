import { Request, Response } from 'express';
import { Op } from 'sequelize';
import OrderPayment from '@models/OrderPayment';

class OrderPaymentController {
  async index(req: Request, res: Response) {
    const store_id = req.storeId;
    const q = req.query.q || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 7, 10);

    const orderPayments = await OrderPayment.findAndCountAll({
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

    const lastPage = Math.ceil(orderPayments.count / perPage);

    return res.json({
      total: orderPayments.count,
      perPage,
      lastPage,
      page,
      data: orderPayments.rows,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const store_id = req.storeId;
      const { name, status, reference, price, amount, service } = req.body;

      const orderPayment = await OrderPayment.create({
        name,
        store_id,
        status,
        reference,
        price,
        amount,
        service,
      });

      return res.status(201).json(orderPayment);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const [rowsEffect, orderPayment] = await OrderPayment.update(
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

    return res.status(200).json(orderPayment);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await OrderPayment.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new OrderPaymentController();
