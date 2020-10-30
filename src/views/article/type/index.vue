<style lang="less" scoped>
.content{
    padding: 10px;
    margin: 10px;
}
</style>
<template>
    <div class="content">
        <el-row>
            <el-button type="primary" size="default" @click="addType">
                <i class="el-icon-edit"></i>
                添加分类
            </el-button>
        </el-row>
        <div class="linebox"></div>
        <el-table :data="list" border stripe>
            <el-table-column
                prop="id"
                label="ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop="type_name"
                label="分类名称"
                >
            </el-table-column>
            <el-table-column
                prop="type_name_en"
                label="分类英文名称"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="icon"
                label="图标"
                width="100"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width='80'
            >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" @change="changeswitch(scope.row.id,scope.row.status)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteClick(scope.row.id)" type="text" size="small" style="color:red">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <div class="linebox"></div>
        <el-row>
			<el-pagination
                background
                :page-size="limit"
                layout="prev, pager, next"
                :total="total"
                @current-change="changepage"
                >
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
import { setToken } from '@/utils/auth'
import { typeList,typeStatusEdit,typeDelete } from '@/api/article'
export default {
    data:function(){
        return {
            page:1,
            limit:10,
            total:0,
            list:[]
        }
    },
    created(){
        this.getlist()
    },
    methods:{
        deleteClick(id){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
          	type: 'warning'
        }).then(() => {
			typeDelete({id:id}).then((res)=>{
				setToken(res.token)
				if(res.code == 200){
					this.$message.success(res.msg)
					this.getlist()
				}else{
					this.$message.error(res.msg)
				}
			}).catch((res)=>{
				this.$message.error(res)
			})
			
        }).catch(() => {
			this.$message({
				type: 'info',
				message: '已取消删除'
			});          
        });
        },
        editClick(id){
            this.$router.push({path:'/article/typeedit',query:{id:id}})
        },
        changeswitch(id,status){
            typeStatusEdit({id:id,status:status}).then((res)=>{
                setToken(res.token)
                if(res.code == 200){
                    this.$message.success(res.msg);
                }else{
                    this.$message.error(res.msg)
                    this.getlist();
                }
            })
        },
        getlist(){
            typeList({page:this.page,limit:this.limit}).then((res)=>{
                if(res.code == 200){
                    this.list = res.list
                    this.total = res.total
                    setToken(res.token)
                }else{
                    this.$message.error(res.msg)
                }
                console.log(res)
            }).catch((error)=>{
                this.$message.error(error)
            })
        },
        changepage(res){
            this.page = res;
            this.getlist()
        },
        addType(){
            this.$router.push({path:'/article/typeedit'})
        }
    }
}
</script>