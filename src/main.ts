import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
// import config from './config/config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as requestIp from 'request-ip';
import RateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

try {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // using helmet middleware
    app.use(helmet());

    // validate pipe
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        // whitelist: true,
        // transformOptions: {
        //   enableImplicitConversion: true,
        // },
      }),
    );

    app.use(requestIp.mw());

    const configService: ConfigService = app.get(ConfigService);

    // enabled cors
    app.enableCors({
      origin: [
        'http://localhost:8080',
        'http://localhost:4000',
        'http://localhost:4200',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://contag.id',
        'https://contag.id',
        'http://www.contag.id',
        'https://www.contag.id',
        'http://staging.contag.id',
        'https://staging.contag.id',
        'http://backoffice.contag.id',
        'https://backoffice.contag.id',
        'http://staging-backoffice.contag.id',
        'https://staging-backoffice.contag.id',
      ],
      // origin: ['http://localhost:8080'],
      credentials: true,
    });

    /**
     * Set Global prefix & exclude root
     */
    app.setGlobalPrefix('api', {
      exclude: [{ path: '/', method: RequestMethod.GET }],
    });

    const options = new DocumentBuilder()
      .setTitle('Contag Api')
      .setDescription('Contag Api Test & Documentation - Monolith')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'JWT Authorization',
          in: 'header',
        },
        'JWT-Auth',
      )
      .build();

    /**
     * Swagger Setup.
     */
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    /**
     * Rate Limit.
     */
    app.use(
      RateLimit({
        windowMs: 2 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );

    const port = configService.get<number>('PORT');
    console.log(`Server running on port ${port}`);
    await app.listen(port);
  }
  bootstrap();
} catch (error) {
  console.log(error);
}
