/*
 * @Author: 肥仔
 * @Date: 2020-10-28 13:49:41
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 17:03:37
 * @Description: file content
 */
import request from '@/utils/request'
export function getauthselect(){
    return request({
        url: '/auth/getselect',
        method: 'post',
    })
}
export function getauthlist(data){
    return request({
        url:'/auth/getlist',
        method:'post',
        data
    })
}
export function getInfo(data){
    return request({
        url:'/auth/getinfo',
        method:'post',
        data
    })
}
export function editAuth(data){
    return request({
        url:'/auth/editauth',
        method:'post',
        data
    })
}
export function delAuth(data){
    return request({
        url:'/auth/delauth',
        method:"post",
        data
    })
}
export function editStatus(data){
    return request({
        url:'/auth/editstatus',
        method:'post',
        data
    })
}