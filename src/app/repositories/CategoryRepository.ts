import Category from '@models/Category';

interface ICategory {
  name: string;
  store_id: number;
  status?: boolean;
}

class CategoryRepository {
  async create({ name, store_id, status = true }: ICategory) {
    try {
      const category = await Category.create({
        name,
        store_id,
        status,
      });

      return category;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryRepository();
