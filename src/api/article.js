import request from '@/utils/request'
export function typeEdit(data){
    return request({
        url:'/article/typeedit',
        method:'post',
        data
    })
}
export function typeInfo(data){
    return request({
        url:'/article/typeinfo',
        method:'post',
        data
    })
}
export function typeList(data){
    return request({
        url:'/article/typelist',
        method:'post',
        data
    })
}
export function typeStatusEdit(data){
    return request({
        url:'/article/typeeditstatus',
        method:'post',
        data
    })
}
export function typeDelete(data){
    return request({
        url:'/article/typedelete',
        method:'post',
        data
    })
}