/*
 * @Author: wupinshuo
 * @Date: 2021-08-24 09:54:56
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-08-24 09:58:57
 */
import * as mongoose from 'mongoose';

export const DatabaseSchema = new mongoose.Schema(
  {
    //时间
    time: String,
    // 温度
    temperature: Number,
    // 湿度
    humidity: Number,
  },
  { collection: 'database', versionKey: false },
);
