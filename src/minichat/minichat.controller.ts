/*
 * @Author: wupinshuo
 * @Date: 2021-10-08 16:59:29
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-30 20:48:05
 */
import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';
import { messageTableDTO } from './minichat.dto';
import { MinichatService } from './minichat.service';

@Controller('travel')
export class MinichatController {
  constructor(private readonly minichatService: MinichatService) {}

  /* 查询所有景点信息 */
  @Get('getTravel')
  public async getAllMessages() {
    return await this.minichatService.getAllMes();
  }

  /* 根据热门推荐返回景点信息 */
  @Get('getTravelByHot')
  public async getTravelByHot() {
    return await this.minichatService.getTravelByHot();
  }

  /* 根据uuid查询指定景点信息 */
  @Get('getTravel/:id')
  public async getSingleMes(@Param('id') id: string) {
    return await this.minichatService.getSingleMes(id);
  }

  /**根据用户label查询指定景点 */
  @Post('getTravelByLabel')
  public async getTravelByLabel(@Body() req: messageTableDTO.GetTravelByLabel) {
    return await this.minichatService.getTravelByLabel(req);
  }

  /**全局搜索 */
  @Post('globalSearch')
  public async globalSearch(@Body() req: messageTableDTO.GetTravelByLabel) {
    return await this.minichatService.globalSearch(req);
  }

  /* 返回景点的随机数组 */
  @Get('randomTravel')
  public async getRanDom() {
    return await this.minichatService.randomTravel();
  }

  /* 新增景点信息 */
  @Post('addTravel')
  public async addTravel(@Body() req: messageTableDTO.addTravel) {
    return await this.minichatService.addTravel(req);
  }

  /* 编辑景点信息 */
  @Put('editTravel')
  public async editTravel(@Body() req: messageTableDTO.editTravel) {
    return await this.minichatService.editTravel(req);
  }

  /* 删除景点信息 */
  @Delete('deleteTravel/:uuid')
  public async deleteTravel(@Param('uuid') uuid: string) {
    return await this.minichatService.deleteTravel(uuid);
  }
}
