import { Seeder, Factory } from 'typeorm-seeding';
export default class CreateUsers implements Seeder {
    run(factory: Factory): Promise<void>;
}
