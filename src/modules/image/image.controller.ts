import {
    Body,
    Controller, Delete, FileTypeValidator, HttpStatus,
    MaxFileSizeValidator,
    ParseFilePipe, ParseFilePipeBuilder,
    Post, Req,
    UploadedFile, UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiTags} from "@nestjs/swagger";
import {diskStorage} from "multer";
import {SendResponse} from "../../utils/send-response";
import { extname } from 'path'
import {ImageService} from "./image.service";


@ApiTags('Image')
@Controller()
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) {
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: 'src/upload/temp'
            , filename: (req, image, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(image.originalname)}`)
            }
        })
    }))
    uploadSingleFile(@UploadedFile(
        new ParseFilePipeBuilder()
            // .addFileTypeValidator({
            //     fileType: 'jpg',
            // })
            // .addMaxSizeValidator({
            //     maxSize: 100000
            // })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) image: Express.Multer.File) {
        return SendResponse.success([{imageName: image.filename}], 'Upload image successful!')
    }

    @Delete('delete')
    async deleteImageTemp(@Body() body, @Req() req) {
        const imageName = body.data[0].imageName;
        await this.imageService.deleteImageTemp(imageName);
        return SendResponse.success([], 'Delete image successful!')
    }

}