"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
dotenv.config({ path: '.env' });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (!process.env.JWT_SECRET) {
    }
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await app.listen(3535);
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map