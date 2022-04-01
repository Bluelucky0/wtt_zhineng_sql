/*
 * @Author: wupinshuo
 * @Date: 2021-10-09 10:50:20
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-26 19:44:25
 */
import { Document } from 'mongoose';

export interface GroupTable extends Document {
  // 群聊id
  groupid: String;
  // 群聊名称
  groupname: String;
}

export interface MessageTable extends Document {
  // 用户id
  userId: String;
  //   消息id
  messageid: String;
  // 消息内容
  messagename: String;
  // 消息发送时间
  createTime: String;
}

export interface TravelTable extends Document {
  uuid: string;
  name: string;
  introduction: string;
  label: string;
  hot: number;
  tag: string;
  detail: string;
  discuss: string;
  good: string;
  sale: string;
  price: string;
  avatat:string;
  nickname:string;
  evaluate:string;
  evaluateimg:string;
  title:string;
}

export interface UserTable extends Document {
  userId: String;
  userName: String;
  password: String;
  label: String;
  uuid?:String;
  avatar:String;
  name:String;
  description:String;
  img:String;
  detail:String;
  introduction:String;
  aaa:String;
  bbb:String;
  ccc:String;
  ddd:String;
}
