/*
 * @Author: 肥仔
 * @Date: 2020-10-27 16:04:31
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 14:39:46
 * @Description: file content
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/getinfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
export function getuserlist(data){
  return request({
    url:'user/getuserlist',
    method:'post',
    data
  })
}
export function getinfobyId(data){
  return request({
    url:'user/getuserbyid',
    method:'post',
    data
  })
}
export function adduser(data){
  return request({
    url:'user/edituser',
    method:'post',
    data
  })
}
export function deleteuser(data){
  return request({
    url:'user/deleteuser',
    method:'post',
    data
  })
}
