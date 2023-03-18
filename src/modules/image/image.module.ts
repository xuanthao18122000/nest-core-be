import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImageController} from "./image.controller";
import {ImageService} from "./image.service";

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [ImageController],
    providers: [ImageService]
})
export class ImageModule{}