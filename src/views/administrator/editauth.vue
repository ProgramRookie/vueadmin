<style lang="less" scoped>
    .contant{
        padding: 10px;
        margin: 10px;
    }
</style>
<template>
    <div class="contant">
        <el-form :model="form" :ref="form" :rules="rules" label-width="120px" :inline="false" size="normal">
            <el-form-item label="角色名称：" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色状态：" >
                <el-radio-group v-model="form.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择权限：" prop="auth">
                <el-checkbox-group v-model="form.auth"  >
                    <el-checkbox label="admin" name="auth" >管理员</el-checkbox>
                    <el-checkbox label="edit" name="auth" > 修改</el-checkbox>
                    <el-checkbox label="add" name="auth" >添加</el-checkbox>
                    <el-checkbox label="delete" name="auth" >删除</el-checkbox>
                    
                </el-checkbox-group>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit(form)">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>
<script>
import { setToken } from '@/utils/auth';
import { editAuth,getInfo } from '@/api/auth'
export default {
    data(){
        return {
            id:0,
            form:{
                name:'',
                status:1,
                auth:[]
            },
            rules:{
                name:[
                    {require:true,message:'请输入管理组名称',trigger:'blur'}
                ],
                auth:[
                     { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
                ]
            }
        }
    },
    components:{
        setToken,
        editAuth,
        getInfo,
    },
    created(){
        this.id = this.$route.query.id
        if(this.id > 0){
            this.getAuthInfo();
        }
    },
    methods:{
        getAuthInfo(){
            getInfo({id:this.id}).then((res)=>{
                setToken(res.token)
                if(res.code == 200){
                    this.form.name = res.info.name
                    this.form.status = res.info.status
                    this.form.auth = JSON.parse(res.info.auth)
                }
            }).catch((error)=>{
                this.$message.error(error);
            })
        },
        onSubmit(form){
            var that = this
            this.$refs[form].validate((valid)=>{
                if(valid){
                    var saveData = this.form;
                    if(this.id >0){
                        saveData.id = this.id;
                    }
                    editAuth(saveData).then((res)=>{
                        setToken(res.token)
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            setTimeout(function(){
                                // this.$route.push({path:'/administrator/auth'})
                                that.$router.push({path:'/administrator/auth'})
                            },2000)
                        }else{
                            this.$message.errror(res.msg)
                        }
                    }).catch((error)=>{
                        this.$message.error(error);
                    })
                }else{
                    this.$message.error('请填写完整表单');
                }
            })
        }
    }
}
</script>