/*
 * @Author: wupinshuo
 * @Date: 2021-10-09 13:11:13
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-30 21:58:27
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserTable } from 'src/minichat/minichat.interface';
import { userTableDTO } from './usertable.dto';

@Injectable()
export class UsertableService {
  constructor(
    @InjectModel('minichat')
    private readonly userTableModel: Model<UserTable>,
  ) {}

  /**查询所有用户 */
  public async getAllUser() {
    return {
      status: 1,
      data: await this.getAllUsers(),
      message: '操作成功',
    };
  }

  /**用户登录 */
  public async login(req: userTableDTO.user) {
    let index = await this.userTableModel.find({
      userId: req.userId,
      password: req.password,
    });
    if (index.length === 0) {
      return {
        status: 0,
        data: null,
        message: '账号密码错误，请重新输入',
      };
    }
    let user = JSON.parse(JSON.stringify(index[0]));
    delete user._id;
    delete user.__v;
    return {
      status: 1,
      data: user,
      message: '登录成功',
    };
  }

  /**用户注册 */
  public async register(req: userTableDTO.user) {
    let index = await this.userTableModel.find({
      userId: req.userId,
    });
    if (index.length > 0) {
      return {
        status: 0,
        data: null,
        message: '用户名重复，请重新输入',
      };
    }
    req = {
      ...req,
      uuid: '',
      avatar: '',
      name: '',
      description: '',
      img: '',
      detail: '',
      introduction: '',
      aaa: '',
      bbb: '',
      ccc: '',
      ddd: '',
    };
    let res = new this.userTableModel(req);
    let data = await res.save();
    let user = JSON.parse(JSON.stringify(data));
    delete user._id;
    delete user.__v;
    return {
      status: 1,
      data: user,
      message: '注册成功',
    };
  }

  /* 编辑用户信息 */
  public async editUser(req: userTableDTO.user) {
    try {
      let res = await this.userTableModel.find({
        userId: req.userId,
      });
      if (res.length <= 0) {
        return {
          status: 0,
          data: null,
          message: `用户${req.userId}不存在，请检查`,
        };
      }
      let _req = {
        ...req,
        uuid: '',
        avatar: '',
        name: '',
        description: '',
        img: '',
        detail: '',
        introduction: '',
        aaa: '',
        bbb: '',
        ccc: '',
        ddd: '',
      };
      // 删除原用户
      await this.userTableModel.deleteOne({ userId: _req.userId });
      await new this.userTableModel(_req).save();
      return {
        status: 1,
        data: _req,
        message: `编辑${_req.userId}用户成功！`,
      };
    } catch (error) {
      return {
        status: 0,
        data: null,
        message: `发生了未知错误：${error}`,
      };
    }
  }

  /* 删除用户信息 */
  public async deleteUser(userId: string) {
    try {
      let res = await this.userTableModel.find({
        userId: userId,
      });
      if (res.length <= 0) {
        return {
          status: 0,
          data: null,
          message: `用户${userId}不存在，请检查`,
        };
      }
      await this.userTableModel.deleteOne({ userId: userId });
      return {
        status: 1,
        data: 1,
        message: `删除${userId}用户成功！`,
      };
    } catch (err) {
      return {
        status: 0,
        data: null,
        message: `发生了未知错误：${err}`,
      };
    }
  }

  /**查询所有用户 */
  public async getAllUsers() {
    let retuenArr: UserTable[] = [];
    let res = await this.userTableModel.find({});
    for (let elem of res) {
      let t = JSON.parse(JSON.stringify(elem));
      delete t._id;
      delete t.__v;
      retuenArr.push(t);
    }
    return retuenArr;
  }
}
