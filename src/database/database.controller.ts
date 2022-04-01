/*
 * @Author: wupinshuo
 * @Date: 2021-08-24 09:30:32
 * @LastEditors: wupinshuo
 * @LastEditTime: 2021-08-30 10:14:35
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { databaseDTO } from './database.dto';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * @description: 查询MongoDB数据库所有的数据
   * @param {*}
   * @returns {*}
   */
  @Get('getall')
  public async getAll() {
    return await this.databaseService.getAll();
  }

  /**
   * @description:增加数据
   * @param {*}
   * @returns {*}
   */
  @Post('add')
  public async add(@Body() req:databaseDTO.addRequest) {
    return await this.databaseService.addData(req);
  }

  /**
   * @description: 按照时间段查询
   * @param {*}
   * @returns {*}
   */
  @Post('search/')
  public async get(@Body() req:databaseDTO.searchRequest) {
    return await this.databaseService.timeSearch(req);
  }

  /**
   * @description: 删除所有数据
   * @param {*}
   * @returns {*}
   */
  @Delete('deleteall')
  public async deleteall() {
    return await this.databaseService.deleteAll();
  }

  /**
   * @description:删除数据
   * @param {*}
   * @returns {*}
   */
  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    return await this.databaseService.deleteData(id);
  }
}
