/*
 * @Author: wupinshuo
 * @Date: 2022-03-17 12:27:24
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-26 19:44:51
 */
/*
 * @Author: wupinshuo
 * @Date: 2021-10-08 17:01:18
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-10-09 09:48:28
 */
import * as mongoose from 'mongoose';

export const UserTableSchema = new mongoose.Schema(
  {
    // 用户id
    userId: String,
    // 用户名称
    userName: String,
    // 用户密码
    password: String,
    // 标签
    label: String,
    uuid:String,
    avatar:String,
    name:String,
    description:String,
    img:String,
    detail:String,
    introduction:String,
    aaa:String,
    bbb:String,
    ccc:String,
    ddd:String,
  },
  { collection: 'userTable', versionKey: false },
);

export const GroupTableSchema = new mongoose.Schema(
  {
    // 群聊id
    groupid: String,
    // 群聊名称
    groupname: String,
  },
  { collection: 'groupTable', versionKey: false },
);

export const MessageTableSchema = new mongoose.Schema(
  {
    // 用户id
    userId: String,
    // 消息id
    // messageid: String,
    // 消息内容
    message: String,
    // 消息发送时间
    createTime: String,
  },
  { collection: 'messageTable', versionKey: false },
);

export const TravelTableSchema = new mongoose.Schema(
  {
    name: String,
    introduction: String,
    uuid: String,
    label: String,
    hot: Number,
    tag: String,
    detail: String,
    discuss: String,
    good: String,
    sale: String,
    price: String,
    avatat:String,
    nickname:String,
    evaluate:String,
    evaluateimg:String,
    title:String,
  },
  { collection: 'travelTable', versionKey: false },
);

export const UGTableSchema = new mongoose.Schema(
  {
    // 用户群聊关联表
    userGroupId: String,
    // 用户id
    userId: String,
    // 群聊id
    groupid: String,
  },
  { collection: 'userGroupTable', versionKey: false },
);

export const UMTableSchema = new mongoose.Schema(
  {
    // 用户信息关联表
    userMessageId: String,
    // 用户id
    userId: String,
    // 信息id
    messageid: String,
  },
  { collection: 'userMessageTable', versionKey: false },
);

export const GMTableSchema = new mongoose.Schema(
  {
    // 群聊信息关联表
    groupMessageId: String,
    // 群聊id
    groupid: String,
    // 信息id
    messageid: String,
  },
  { collection: 'groupMessageTable', versionKey: false },
);
