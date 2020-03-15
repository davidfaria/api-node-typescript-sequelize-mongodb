import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Category from '@models/Category';
import CategoryRepository from '@repositories/CategoryRepository';

class CategoryController {
  async index(req: Request, res: Response) {
    const store_id = req.storeId;
    const q: string = req.query.q || '';
    const page: number = Number(req.query.page || 1);
    const perPage: number = Number(req.query.perPage || 7);

    const limit: number = perPage;
    const offset: number = Number(page - 1) * perPage;

    const categories = await Category.findAndCountAll({
      order: ['name'],
      where: {
        store_id,
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      limit,
      offset,
    });

    // console.log('categories', categories);

    // return res.json(categories);
    const lastPage = Math.ceil(categories.count / perPage);

    return res.json({
      total: categories.count,
      perPage,
      lastPage,
      page,
      data: categories.rows,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const store_id = req.storeId;
      const { name, status } = req.body;

      const category = await Category.create({
        name,
        store_id,
        status,
      });

      return res.status(201).json(category);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const [, result] = await Category.update(
      {
        name,
        status,
      },
      {
        where: {
          id,
        },
        returning: true,
        limit: 1,
        // plain: true,
      },
    );

    const [category] = result;

    console.log('Ca', category);

    return res.status(200).json(category);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Category.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new CategoryController();
