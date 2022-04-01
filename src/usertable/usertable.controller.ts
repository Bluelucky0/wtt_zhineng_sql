/*
 * @Author: wupinshuo
 * @Date: 2022-03-24 13:27:02
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-30 21:44:59
 */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { userTableDTO } from './usertable.dto';
import { UsertableService } from './usertable.service';

@Controller('travel')
export class UsertableController {
  constructor(private readonly usertableService: UsertableService) {}

  @Get('getAllUsers')
  public async getAllUsers(){
    return await this.usertableService.getAllUser();
  }

  @Post('login')
  public async login(@Body()req:userTableDTO.user){
    return await this.usertableService.login(req);
  }

  @Post('register')
  public async register(@Body()req:userTableDTO.user){
    return await this.usertableService.register(req);
  }

  @Put('editUser')
  public async editUser(@Body() req:userTableDTO.user){
    return await this.usertableService.editUser(req);
  }

  @Delete('deleteUser/:userId')
  public async deleteUser(@Param('userId') userId:string ){
    return await this.usertableService.deleteUser(userId);
  }
}
