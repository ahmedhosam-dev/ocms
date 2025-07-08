import seedRolesAndPermissions from "./role.seeder.js";
import seedSuperAdminUser from "./superUser.seeder.js";

export default async function seedDatabase() {
    const SupperRole = await seedRolesAndPermissions()
    seedSuperAdminUser(SupperRole)
}
