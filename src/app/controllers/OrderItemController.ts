import { Request, Response } from 'express';
import { Op } from 'sequelize';
import OrderItem from '@models/OrderItem';

class OrderItemController {
  async index(req: Request, res: Response) {
    const store_id = req.storeId;
    const q = req.query.q || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 7, 10);

    const orderItens = await OrderItem.findAndCountAll({
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

    const lastPage = Math.ceil(orderItens.count / perPage);

    return res.json({
      total: orderItens.count,
      perPage,
      lastPage,
      page,
      data: orderItens.rows,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const store_id = req.storeId;
      const { name, status, reference, price, amount, service } = req.body;

      const orderIten = await OrderItem.create({
        name,
        store_id,
        status,
        reference,
        price,
        amount,
        service,
      });

      return res.status(201).json(orderIten);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const [rowsEffect, orderIten] = await OrderItem.update(
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

    return res.status(200).json(orderIten);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await OrderItem.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new OrderItemController();
