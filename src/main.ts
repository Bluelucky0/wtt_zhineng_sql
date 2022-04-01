/*
 * @Author: wupinshuo
 * @Date: 2021-10-08 16:32:20
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-10-08 17:41:17
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 跨域问题解決
  const app = await NestFactory.create(AppModule,{cors:true});  
  await app.listen(3003);

  //允许跨域
  // app.enableCors();

  console.log(`Port 3003 is running!`);
}
bootstrap();
