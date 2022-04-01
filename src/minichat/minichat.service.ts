/*
 * @Author: wupinshuo
 * @Date: 2021-10-08 16:59:29
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-30 21:29:40
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { messageTableDTO } from './minichat.dto';
import { TravelTable } from './minichat.interface';

@Injectable()
export class MinichatService {
  constructor(
    @InjectModel('minichat')
    private readonly TravelTableModel: Model<TravelTable>,
  ) {}

  /**查询所有景点 */
  public async getAllMes() {
    return {
      status: 1,
      data: await this.getAllTravels(),
      message: '查询所有景点信息成功',
    };
  }

  /* 查询指定景点信息 */
  public async getSingleMes(id) {
    try {
      let res = await this.TravelTableModel.find({
        uuid: id,
      });
      //   删除原景点
      await this.TravelTableModel.deleteOne({ uuid: id });
      let travel = JSON.parse(JSON.stringify(res[0]));
      delete travel._id;
      let new_hot = travel.hot;
      let new_obj = { ...travel, hot: ++new_hot };
      //修改hot值
      await new this.TravelTableModel(new_obj).save(new_obj);
      return {
        status: 1,
        data: new_obj,
        message: '查询指定景点信息成功',
      };
    } catch (err) {
      console.warn(err);
      return {
        status: 1,
        data: null,
        message: `该${id}景点不存在`,
      };
    }
  }

  /* 新增景点信息 */
  public async addTravel(req: messageTableDTO.addTravel) {
    try {
      let index = await this.TravelTableModel.find({
        uuid: req.uuid,
      });
      if (index.length > 0) {
        return {
          status: 0,
          data: null,
          message: `景点${req.uuid}重复，请重新输入`,
        };
      }
      await new this.TravelTableModel(req).save();
      return {
        status: 1,
        data: req,
        message: `新增${req.uuid}景点成功！`,
      };
    } catch (err) {
      return {
        status: 0,
        data: null,
        message: `发生了未知错误：${err}`,
      };
    }
  }

  /* 编辑景点信息 */
  public async editTravel(req: messageTableDTO.editTravel) {
    try {
      let res = await this.TravelTableModel.find({
        uuid: req.uuid,
      });
      if (res.length <= 0) {
        return {
          status: 0,
          data: null,
          message: `景点${req.uuid}不存在，请检查`,
        };
      }
      // 删除原景点
      await this.TravelTableModel.deleteOne({ uuid: req.uuid });
      await new this.TravelTableModel(req).save();
      return {
        status: 1,
        data: req,
        message: `编辑${req.uuid}景点成功！`,
      };
    } catch (err) {
      return {
        status: 0,
        data: null,
        message: `发生了未知错误：${err}`,
      };
    }
  }

  /* 删除景点信息 */
  public async deleteTravel(uuid: string) {
    try{
      let res = await this.TravelTableModel.find({
        uuid:uuid,
      });
      if (res.length <= 0) {
        return {
          status: 0,
          data: null,
          message: `景点${uuid}不存在，请检查`,
        };
      }
      await this.TravelTableModel.deleteOne({uuid:uuid});
      return{
        status: 1,
        data: 1,
        message: `删除${uuid}景点成功！`,
      }
    }catch(err){
      return {
        status: 0,
        data: null,
        message: `发生了未知错误：${err}`,
      };
    }
  }

  /*根据热门推荐返回景点信息 */
  public async getTravelByHot() {
    return {
      status: 1,
      data: await this.hotSort(),
      message: '查询热门景点信息成功',
    };
  }

  /**根据标签查询指定景点 */
  public async getTravelByLabel(req: messageTableDTO.GetTravelByLabel) {
    // 所有景点
    let allTravels = await this.getAllTravels();
    // 所有标签
    let labels: Array<string> = [];
    if (req.label) {
      /**筛选出label标签的景点 */
      labels = req.label.split(',');
      return {
        status: 1,
        data: this.sortByLabels(labels, allTravels),
        message: '根据table查询特定景点信息成功',
      };
    }
    return {
      status: 1,
      data: await this.getAllTravels(),
      message: '查询所有景点信息成功',
    };
  }

  /* 全局搜索 */
  public async globalSearch(req: messageTableDTO.GetTravelByLabel) {
    // 所有景点
    let allTravels = await this.getAllTravels();
    let returnArr: TravelTable[] = [];
    let noArr: TravelTable[] = [];
    if (req.tag) {
      for (let elem of allTravels) {
        if (elem.tag.includes(req.tag)) {
          returnArr.push(elem);
        } else {
          noArr.push(elem);
        }
      }
      return {
        status: 1,
        data: returnArr.concat(noArr),
        message: '全局搜索成功',
      };
    }
    return {
      status: 1,
      data: await this.getAllTravels(),
      message: '查询所有景点信息成功',
    };
  }

  /* 随机返回所有的景点信息 */
  public async randomTravel() {
    return {
      status: 1,
      data: await this.randomSort(await this.getAllTravels()),
      message: '随机查询所有景点信息成功',
    };
  }

  /**所有景点信息 */
  public async getAllTravels(): Promise<TravelTable[]> {
    let res = await this.TravelTableModel.find({});
    return this.jsonParseData(res);
  }

  /*按照hot字段排序  */
  public async hotSort(): Promise<TravelTable[]> {
    let res = await this.TravelTableModel.find({}).sort({ hot: -1 });
    return this.jsonParseData(res);
  }

  /* 处理返回格式 */
  public jsonParseData(res: TravelTable[]): TravelTable[] {
    let retuenArr: TravelTable[] = [];
    for (let elem of res) {
      let t = JSON.parse(JSON.stringify(elem));
      delete t._id;
      retuenArr.push(t);
    }
    return retuenArr;
  }

  /*数组随机排序 */
  public randomSort(arr: Array<any>): Array<any> {
    arr.sort(() => {
      return Math.random() - 0.5;
    });
    return arr;
  }

  /**按照标签进行排序 */
  public sortByLabels(
    arr1: Array<string>,
    arr2: Array<TravelTable>,
  ): Array<TravelTable> {
    let returnArr: TravelTable[] = [];
    let nonArr: TravelTable[] = [];
    // arr1.reverse();
    for (let e of arr2) {
      if (arr1.includes(e.label)) {
        returnArr.push(e);
      } else {
        nonArr.push(e);
      }
    }
    return returnArr.concat(nonArr);
  }

  /**
   * @description: 存储聊天记录
   * @param {messageTableDTO} req 存储聊天记录参数
   * @returns {*}
   */
  // public async addMes(req: messageTableDTO.saveMes) {
  //   // TODO 对输入的用户id进行判断是否存在
  //   if (!req.userId || !req.message) {
  //     return {
  //       status: 0,
  //       data: null,
  //       message: '输入字段错误，请重新输入',
  //     };
  //   }
  //   let date = moment().format('X');
  //   let obj = {
  //     ...req,
  //     createTime: date,
  //   };

  //   let res = new this.messageTableModel(obj);
  //   let data = await res.save();
  //   return {
  //     status: 1,
  //     data: data,
  //     message: '操作成功',
  //   };
  // }

  /**
   * @description: 刪除所有聊天记录
   * @param {*}
   * @returns {*}
   */
  // public async deleteAll() {
  //   let res = await this.messageTableModel.remove({});
  //   return {
  //     status: 1,
  //     data: res,
  //     message: '操作成功',
  //   };
  // }
}
