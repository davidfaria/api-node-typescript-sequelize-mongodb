import User from '@models/User';

class AclService {
  async is(roles: string[], user_id: number): Promise<boolean> {
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

    return userRoles.some(current => roles.includes(current.slug));
  }

  async can(permissions: string[], user_id: number) {
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

    return userPermissions.some(current => permissions.includes(current.slug));
  }
}

export default new AclService();
