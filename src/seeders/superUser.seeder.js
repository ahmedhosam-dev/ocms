import User from '../models/user.model.js';
import { encrptPssword } from '../utils/auth.utils.js';

export default async function seedSuperAdminUser(superAdminRole) {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = await encrptPssword(process.env.SUPER_ADMIN_PASS);

  const user = await User.findOneAndUpdate(
    { email },
    {
      name: process.env.SUPER_ADMIN_NAME,
      email,
      password:password, 
      role: superAdminRole._id,
      isVerified: new Date(),
      createdBy: null,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Super admin user created: ${user.email}`);
}
