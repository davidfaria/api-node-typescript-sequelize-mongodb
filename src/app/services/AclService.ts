import User from '@models/User';

class AclService {
  async is(roles: string[], user_id: number): Promise<boolean> {
    // console.time();

    const user = await User.findOne({
      where: { id: user_id },
      attributes: ['id', 'email'],
      include: [
        {
          association: 'roles',
          as: 'roles',
          through: { attributes: [] },
          attributes: ['slug'],
        },
      ],
    });

    const userRoles = user?.roles;
    if (!userRoles) return false;

    const result = userRoles.some(current => roles.includes(current.slug));

    // console.timeEnd();

    return result;
  }

  // async can(permissions: string[], user_id: number) {
  //   console.log('aqui');
  //   console.time();
  //   const exists = await UserPermission.count({
  //     where: { user_id },
  //     include: [
  //       {
  //         association: 'permission',
  //         as: 'permission',
  //         where: {
  //           slug: {
  //             [Op.in]: permissions,
  //           },
  //         },
  //       },
  //     ],
  //   });
  //   // console.log('exists', exists);
  //   console.timeEnd();
  //   return exists ? true : false;
  // }
  async can(permissions: string[], user_id: number) {
    // console.time();
    const user = await User.findOne({
      where: { id: user_id },
      attributes: ['id', 'email'],
      include: [
        {
          association: 'permissions',
          through: { attributes: [] },
          attributes: ['slug'],
        },
      ],
    });

    const userPermissions = user?.permissions;
    if (!userPermissions) return false;

    const result = userPermissions.some(current =>
      permissions.includes(current.slug),
    );
    // console.timeEnd();
    return result;
  }
}

export default new AclService();
