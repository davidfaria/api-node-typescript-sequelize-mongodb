import { req } from 'supertest';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '@models/Product';

class ProductController {
  async index(req: Request, res: Response) {
    const store_id = req.storeId;
    const q = req.query.q || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 7, 10);

    const products = await Product.findAndCountAll({
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

    const lastPage = Math.ceil(products.count / perPage);

    return res.json({
      total: products.count,
      perPage,
      lastPage,
      page,
      data: products.rows,
    });
  }

  async show(req: Request, res: Response) {
    const store_id = req.storeId;

    const product = await Product.findOne({
      where: {
        store_id,
      },
      include: [
        {
          association: 'category',
          attributes: ['id', 'name'],
        },
        {
          association: 'image',
          attributes: ['id', 'name', 'url'],
        },
      ],
    });

    return res.json(product);
  }

  async store(req: Request, res: Response) {
    try {
      const store_id = req.storeId;
      const {
        name,
        status,
        reference,
        price,
        price_cost,
        amount,
        service,
      } = req.body;

      const category_id = req.body.category_id || null;

      const product = await Product.create({
        name,
        category_id,
        store_id,
        status,
        reference,
        price,
        price_cost,
        amount,
        service,
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const [rowsEffect, product] = await Product.update(
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

    return res.status(200).json(product);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Product.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new ProductController();
