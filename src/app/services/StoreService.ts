import User from '@models/User';

class StoreService {
  async checkPermissionStore(
    user_id: number,
    store_id: number,
  ): Promise<boolean> {
    console.log('User', user_id, 'Store', store_id);

    const user = await User.findOne({
      where: { id: user_id },
      attributes: ['id', 'email'],
      include: [
        {
          association: 'stores',
          where: { id: store_id },
          as: 'stores',
          through: { attributes: [] },
          attributes: ['id'],
        },
      ],
    });

    const userStores = user?.stores?.map(current => current.id);
    if (!userStores) return false;

    const result = userStores.includes(store_id);

    console.log('exists', result);

    return result;
  }
}

export default new StoreService();
