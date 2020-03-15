// import UserStore from '@models/UserStore';
import UserPermission from '@models/UserPermission';

class StoreService {
  async checkPermissionStore(
    user_id: number,
    store_id: number,
  ): Promise<boolean> {
    // console.log('User', user_id, 'Store', store_id);

    // const exists = await UserStore.count({
    //   where: { user_id, store_id },

    // });

    const exists = await UserPermission.findAll({});

    console.log('exists', exists);

    // const user = await User.findOne({
    //   where: { id: user_id },
    //   attributes: ['id', 'email'],
    //   include: [
    //     {
    //       association: 'stores',
    //       where: { id: store_id },
    //       as: 'stores',
    //       through: { attributes: [] },
    //       attributes: ['id'],
    //     },
    //   ],
    // });

    return exists ? true : false;
  }
}

export default new StoreService();
