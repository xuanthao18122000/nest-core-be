import { Seeder, Factory } from 'typeorm-seeding';
import { getRepository } from 'typeorm';
import {User} from "../entities/user.entity";
import {appDataSource} from "../../configs/datasource";
import {Role} from "../entities/role.entity";
import {UtilsProvider} from "../../utils/provider";
import * as md5 from 'md5';


export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<void> {
        const userRepository = appDataSource.getRepository(User);
        const roleRepository = appDataSource.getRepository(Role);

        const listRole = [
            { role_key: 'ADMIN', role_name: 'admin' },
            { role_key: 'USER', role_name: 'user' },
        ];

        const roles = await roleRepository
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values(listRole)
            .execute();

        const user = await userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    fullName: 'Administrator',
                    email: 'minhhung2040@gmail.com',
                    password: UtilsProvider.generateHash(md5(md5('Wall68@14'))),
                    phone: 123456789,
                },
            ])
            .execute();

        const userCreated = await userRepository.find({where: {
            id: user.identifiers[0].id
            }})
        // Add role for use created
        const userRoles = listRole.filter(role => role.role_key !== 'user');
        await userRepository
            .createQueryBuilder()
            .relation(User, 'role')
            .of(userCreated)
            .add(userRoles);
    }
}