import {
    Body,
    Controller, FileTypeValidator, HttpStatus,
    MaxFileSizeValidator,
    ParseFilePipe, ParseFilePipeBuilder,
    Post,
    UploadedFile, UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiTags} from "@nestjs/swagger";
import {diskStorage} from "multer";
import {SendResponse} from "../../utils/send-response";
import { extname } from 'path'


@ApiTags('Image')
@Controller()
export class ImageController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'src/upload/images'
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    uploadSingleFile(@UploadedFile(
        new ParseFilePipeBuilder()
            // .addFileTypeValidator({
            //     fileType: 'jpg',
            // })
            // .addMaxSizeValidator({
            //     maxSize: 1000
            // })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) file: Express.Multer.File) {
        console.log(file);
        return SendResponse.success([], 'Upload image successful!')
    }


}