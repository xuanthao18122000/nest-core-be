"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../entities/user.entity");
const datasource_1 = require("../../configs/datasource");
const role_entity_1 = require("../entities/role.entity");
const provider_1 = require("../../utils/provider");
const md5 = require("md5");
class CreateUsers {
    async run(factory) {
        const userRepository = datasource_1.appDataSource.getRepository(user_entity_1.User);
        const roleRepository = datasource_1.appDataSource.getRepository(role_entity_1.Role);
        const listRole = [
            { role_key: 'ADMIN', role_name: 'admin' },
            { role_key: 'USER', role_name: 'user' },
        ];
        const roles = await userRepository
            .createQueryBuilder()
            .insert()
            .into(role_entity_1.Role)
            .values(listRole)
            .execute();
        const user = await userRepository
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.User)
            .values([
            {
                fullName: 'Administrator',
                email: 'minhhung2040@gmail.com',
                password: provider_1.UtilsProvider.generateHash(md5(md5('Wall68@14'))),
                phone: 123456789,
            },
        ])
            .execute();
        const userCreated = await userRepository.find({ where: {
                id: user.identifiers[0].id
            } });
        const userRoles = listRole.filter(role => role.role_key !== 'user');
        await userRepository
            .createQueryBuilder()
            .relation(user_entity_1.User, 'role')
            .of(userCreated)
            .add(userRoles);
    }
}
exports.default = CreateUsers;
//# sourceMappingURL=user.seeds.js.map