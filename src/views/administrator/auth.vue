<!--
 * @Author: 肥仔
 * @Date: 2020-10-28 16:48:50
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 17:26:57
 * @Description: file content
-->
<style lang="less" scoped>
    .contant{
        padding: 10px;
        margin: 10px;
    }
</style>
<template>
    <div class="contant">
        <el-row>
            <el-button type="primary" @click="addauth">
                <i class="el-icon-plus"></i>
                添加角色
            </el-button>
        </el-row>
        <div class="linebox"></div>
        <el-table :data="list" style="width: 100%" border stripe>
            <el-table-column
                prop="id"
                label="ID"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="权限名称"
                width="200"
                >
            </el-table-column>
            <el-table-column
                prop="auth"
                label="权限值">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="150">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" @change="changeSwitch(scope.row.id,scope.row.status)">
                    </el-switch>
                    
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteClick(scope.row.id)" type="text" size="small" style="color:red">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <div class="linebox"></div>
        <el-row>
            <el-pagination
                @current-change="currentChange"
                :page-size="limit"
                layout="total, prev, pager, next"
                :total="total" background>
                >
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
import { getauthlist,delAuth,editStatus } from '@/api/auth'
import { setToken } from '@/utils/auth'
export default {
    data(){
        return {
            total:1000,
            page:1,
            limit:10,
            list:[]
        }
    },
    created(){
        this.getlist();
    },
    methods:{
        getlist(){
            getauthlist({page:this.page,limit:this.limit}).then((res)=>{
                setToken(res.token)
                if(res.code == 200){
                    this.list = res.list
                    this.total = res.count
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res)=>{
                this.$message.error(res)
            })
        },
        currentChange(res){
            this.page = res;
            this.getlist();
        },
        handleClick(res){},
        editClick(res){
            this.$router.push({path:'/administrator/editauth',query:{id:res}})
        },
        deleteClick(id){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                    delAuth({id:id}).then((res)=>{
                        setToken(res.token)
                        if(res.code == 200){
                            this.getlist();
                            this.$message.success(res.msg)
                        }else{
                            this.$message.error(res.msg)
                        }

                    }).catch((error)=>{
                        this.$message.error(error)
                    })
                }).catch(()=>{
                    this.$message.info('取消操作')
                });
        },
        changeSwitch(id,status){
            editStatus({id:id,status:status}).then((res)=>{
                setToken(res.token)
                if(res.code == 200){
                    this.$message.success(res.msg);
                }else{
                    this.$message.error(res.msg);
                    this.getlist()
                }
            })
        },
        addauth(){
            this.$router.push({path:'/administrator/editauth'});
        }
    }
}
</script>