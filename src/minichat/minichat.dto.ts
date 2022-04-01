/*
 * @Author: wupinshuo
 * @Date: 2022-03-23 23:35:37
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-30 20:39:03
 */
export module messageTableDTO {
  /**存储聊天记录参数 */
  export class saveMes {
    userId: string;
    // messageid?:string;
    message?: string;
    createTime?: string;
  }

  export class Travels {
    uuid?: string;
    name?: string;
    introduction?: string;
    label?: string;
    hot?: number;
    tag?: string;
    detail?: string;
    discuss?: string;
    good?: string;
    sale?: string;
    price?: string;
    avatat?: string;
    nickname?: string;
    evaluate?: string;
    evaluateimg?: string;
    title?: string;
  }

  export class User {
    userId: string;
    userName: string;
    password?: string;
    label?: string;
    uuid?: string;
    avatar?: string;
    name?: string;
    description?: string;
    img?: string;
    detail?: string;
    introduction?: string;
    aaa?: string;
    bbb?: string;
    ccc?: string;
    ddd?: string;
  }

  export class GetTravelByLabel {
    label?: string;
    tag?: string;
  }

  /* 新增景点参数 */
  export class addTravel extends Travels {}

  /* 编辑景点参数 */
  export class editTravel extends Travels {}
}
