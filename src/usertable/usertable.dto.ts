/*
 * @Author: wupinshuo
 * @Date: 2022-03-23 23:35:37
 * @LastEditors: wupinshuo
 * @LastEditTime: 2022-03-26 19:50:59
 */
export module userTableDTO{

    /**用户登录请求参数 */
    export class user{
        userId:string;
        userName:string;
        password:string;
        label?:string;
        uuid?:string;
        avatar?:string;
        name?:string;
        description?:string;
        img?:string;
        detail?:string;
        introduction?:string;
        aaa?:string;
        bbb?:string;
        ccc?:string;
        ddd?:string;
    }
}