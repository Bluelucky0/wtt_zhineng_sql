/*
 * @Author: wupinshuo
 * @Date: 2021-10-09 13:11:13
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-10-09 13:48:41
 */
import { Module } from '@nestjs/common';
import { UsertableService } from './usertable.service';
import { UsertableController } from './usertable.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTableSchema } from 'src/minichat/minichat.schema';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),

    MongooseModule.forFeature([
      {
        name: 'minichat',
        schema: UserTableSchema,
        collection: 'userTable',
      },
    ],'users'),
  ],
  controllers: [UsertableController],
  providers: [UsertableService],
  exports: [UsertableService],
})
export class UsertableModule {}
