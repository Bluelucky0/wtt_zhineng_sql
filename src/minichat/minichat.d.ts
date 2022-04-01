/*
 * @Author: wupinshuo
 * @Date: 2021-10-09 09:49:45
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-17 12:32:07
 */
export interface userTable {
  // 用户id
  userId: String;
  // 用户名称
  username: String;
  // 用户密码
  password: String;
  // 用户创建时间
  createTime: String;
}

export interface groupTable {
  // 群聊id
  groupid: String;
  // 群聊名称
  groupname: String;
}

// export interface 
