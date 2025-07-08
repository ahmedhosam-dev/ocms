import Role from '../models/role.model.js'
import Permission from '../models/permission.model.js'
import { feature, action } from '../Enums/permission.enum.js'

export default async function seedRolesAndPermissions() {
    const superAdminPermissions = [
        { feature: feature.USER,            action: action.ALL },
        { feature: feature.TAG,             action: action.ALL },
        { feature: feature.ROLE,            action: action.ALL },
        { feature: feature.PERMISSION,      action: action.ALL },
        { feature: feature.CATEGORY,        action: action.ALL },
        { feature: feature.LIKE,            action: action.ALL },
        { feature: feature.COMMENT,         action: action.ALL },
        { feature: feature.FOLLOW,          action: action.ALL },
        { feature: feature.CONTENT,         action: action.ALL },
        { feature: feature.NOTIFICATION,    action: action.ALL },
        { feature: feature.ACTIVITY_LOG,    action: action.ALL },
    ]

    const permissions = await Promise.all(
        superAdminPermissions.map(async (perm) => {
          return await Permission.findOneAndUpdate(
            perm,
            { ...perm, isSystem: true },
            { upsert: true, new: true }
          )
        })
    )

    const superAdminRole = await Role.findOneAndUpdate(
        { name: 'superadmin' },
        {
          name: 'superadmin',
          description: 'System Super Admin',
          permissions: permissions.map(p => p._id),
          isSystem: true,
        },
        { upsert: true, new: true }
    );

    console.log('Seeded Super Admin role and permissions');

    return superAdminRole;
}
