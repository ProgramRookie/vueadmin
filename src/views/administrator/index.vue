<!--
 * @Author: 肥仔
 * @Date: 2020-10-28 09:37:16
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 16:52:35
 * @Description: file content
-->
<style lang="less" scoped>
.dashboard-container {
  margin: 10px;
  padding: 10px;
  .user-avatar{
	  height: 40px;
	  width: 40px;
  }
  
}
</style>
<template>
  <div class="dashboard-container">

	<el-row>
		<el-button type="primary" @click="adduser">
			<i class="el-icon-plus"></i>
			添加用户
		</el-button>
	</el-row>
	<div class="linebox"></div>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" sortable width="100">
      </el-table-column>
      <el-table-column prop="username" label="姓名"  width="200">
      </el-table-column>
	  <el-table-column prop="avatar" label="头像" width="80" >
		  <template slot-scope="scope">
			  <img :src=" scope.row.avatar +'?imageView2/1/w/80/h/80'" class="user-avatar" alt="">
		</template>
      </el-table-column>
	  <el-table-column prop="rule_name" label="用户组"  >
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
import { getuserlist,deleteuser } from '@/api/user'
import { setToken } from '@/utils/auth'

export default {
  data() {
    return {
      tableData: [
	  ],
	  limit:10,
	  page:1,
	  total:0
    };
  },
  components:{
	 getuserlist,
	 setToken
  },
  created: function () {
	  this.getlist()
  },
  methods: {
    //获取首页数据
    getlist() {
		var that = this
		getuserlist({ page:that.page,limit:that.limit }).then(response => {
			var res = response
			if(res.code == 200){
				that.total = res.count;
				that.tableData = res.list
			}
			setToken(res.token)
		}).catch(error => {
			console.log(error)
		})
	},
	//分页切换
	changepage(res){
		this.page = res
		this.getlist()
	},
	//修改
	editClick(id){
		this.$router.push({ path:'/administrator/edit',query:{id:id}})
		console.log(id)
	},
	//添加用户
	adduser(){
		this.$router.push({path:'/administrator/edit'})
	},
	//删除
	deleteClick(id){
		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
          	type: 'warning'
        }).then(() => {
			deleteuser({id:id}).then((res)=>{
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
	}
	

  },
};
</script>