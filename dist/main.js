"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const validation_pipe_1 = require("./pipe/validation.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes((0, validation_pipe_1.ValidationPipe)({
        whitelist: false,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        disableErrorMessages: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Rice Core')
        .setDescription('Rice Core API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(3000);
    app.enableCors();
}
bootstrap();
//# sourceMappingURL=main.js.map