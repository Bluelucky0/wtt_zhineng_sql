/*
 * @Author: wupinshuo
 * @Date: 2021-08-24 09:30:32
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-10-08 17:29:59
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { databaseDTO } from './database.dto';
import * as moment from 'moment';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel('database') private readonly databaseModel) {}

  /**
   * @description: 查询MongoDB数据库所有的数据
   * @param {*}
   * @returns {*}
   */
  public async getAll() {
    let res = await this.databaseModel.find({});
    return res;
  }

  /**
   * @description: 新增数据
   * @param {*}
   * @returns {*}
   */
  public async addData(req: databaseDTO.addRequest) {
    // 获取当前时间并转化为时间戳存储 秒为单位 10位
    let now = moment();
    let date1 = moment().format('X');

    let obj = {
      time: date1,
      temperature: req.temperature,
      humidity: req.humidity,
    };
    let res = new this.databaseModel(obj);
    let returnObj = await res.save();
    console.log(`亲，您增加了一条数据！`);
    return returnObj;
  }

  /**
   * @description:按照时间段查询数据
   * @param {*}
   * @returns {*}
   */
  public async timeSearch(req: databaseDTO.searchRequest) {
    // let res = await this.databaseModel.find({ _id: `${id}` });

    // 获取当前时间
    // let now=moment();
    // let date1=moment().format('X');

    // 时间戳转化为16进制
    // let date1 = Number(time1).toString(16);
    // let date2 = Number(time2).toString(16);

    // 数据库中的时间戳
    // let date1 = res[0].get('id').substring(0, 8);
    // let date2=parseInt(date1,16);
    // let date3=moment.unix(date2).format('HH/mm/ss');

    let time1 = req.start;
    let time2 = req.stop;
    let date1 = moment.unix(time1).format('HH时mm分ss秒');
    let date2 = moment.unix(time2).format('HH时mm分ss秒');
    let res = await this.databaseModel.find({
      time: { $gte: time1, $lte: time2 },
    });

    console.log(`亲，您查询了${date1}到${date2}间的数据！`);

    // res = res.length == 0 ? '您查询的时间段内没有数据，请重新输入！' : res;
    return res;
  }

  /**
   * @description: 刪除所有数据
   * @param {*}
   * @returns {*}
   */
  public async deleteAll() {
    let res = await this.databaseModel.remove({});
    return res;
  }

  /**
   * @description: 更新数据
   * @param {*}
   * @returns {*}
   */
  public async updateData(req1, req2) {
    let res = await this.databaseModel.updateOne(req1, req2);
    return res;
  }

  /**
   * @description: 删除数据
   * @param {*}
   * @returns {*}
   */
  public async deleteData(id) {
    let res = await this.databaseModel.deleteOne({ _id: `${id}` });
    return res;
  }
}
