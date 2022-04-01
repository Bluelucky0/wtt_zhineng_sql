/*
 * @Author: wupinshuo
 * @Date: 2021-08-24 09:30:32
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-10-08 18:14:43
 */
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseSchema } from './database.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ 
    HttpModule.register({
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }),

    MongooseModule.forFeature([
      {
        //与数据库名称对应
        name: 'database',
        // 引入的schema
        schema: DatabaseSchema,
        // 数据库名称
        collection:'database',
      },
    ]),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports:[DatabaseService]
})
export class DatabaseModule {}
