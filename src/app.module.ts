/*
 * @Author: wupinshuo
 * @Date: 2021-08-16 15:04:34
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-10-09 13:43:08
 */
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MinichatModule } from './minichat/minichat.module';
// import { DatabaseModule } from './database/database.module';
import { UsertableModule } from './usertable/usertable.module';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
   
    MinichatModule,
    UsertableModule,
    // DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost:27017/minichat',{
      connectionName:'messages',
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/minichat',{
      connectionName:'users',
    }),
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
