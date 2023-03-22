import {join} from "path";
import * as fs from "fs";

export class ImageService{
    constructor(
    ) {}

    deleteImageTemp(imageName) {
        const imgPath = join(__dirname,'../../..', 'src/upload/temp', imageName);
        fs.unlink(imgPath, function (err) {
            if (err) {
                console.log(err)
                throw err;
            } else {
                console.log("Successfully delete the file!");
            }
        });
        console.log(imageName)
    }
}