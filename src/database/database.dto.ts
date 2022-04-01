/*
 * @Author: wupinshuo
 * @Date: 2021-08-24 10:00:29
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-08-30 10:10:30
 */
export module databaseDTO {
  /**数据格式 */
  export class data {
    //时间主键
    _id: string;
    // 温度
    temperature: number;
    // 湿度
    humidity: number;
  }

  /**查询所有数据返回data */
  export class searchData {
    //主键
    _id: string;
    //新增的时间
    time:string;
    // 温度
    temperature: number;
    // 湿度
    humidity: number;
  }

  /**查询所有数据返回结果 */
  export class returnSrearch {}

  /**新增数据请求参数 */
  export class addRequest {
    //时间主键
    _id?: string;
    //新增的时间
    time?:string;
    // 温度
    temperature: number;
    // 湿度
    humidity: number;
  }

  /**按照时间段查询输入的参数 */
  export class searchRequest{
    start:number;
    stop:number;
  }
}
