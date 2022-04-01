/*
 * @Author: wupinshuo
 * @Date: 2021-10-08 16:59:29
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-17 12:34:57
 */
import { Module } from '@nestjs/common';
import { MinichatService } from './minichat.service';
import { MinichatController } from './minichat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelTableSchema } from './minichat.schema';
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
        name: 'minichat',
        schema: TravelTableSchema,
        collection: 'travelTable',
      },
    ],'messages'),
  ],
  controllers: [MinichatController],
  providers: [MinichatService],
  exports: [MinichatService,MongooseModule],
})
export class MinichatModule {}
