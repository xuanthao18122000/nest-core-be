import { Repository } from 'typeorm';
import { Role } from '../../database/entities/role.entity';
export declare class RoleService {
    private readonly roleRepo;
    constructor(roleRepo: Repository<Role>);
    createRoles(): Promise<boolean>;
    findRole(role: any): Promise<Role>;
}
