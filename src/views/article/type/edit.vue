<style lang="less" scoped>
.content{
    padding: 10px;
    margin: 10px;
    //touxiang
    .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        border: 1px dashed #ccc;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
  //头像结束
}
</style>
<template>
    <div class="content">
        <el-form :model="form" :ref="form" :rules="rules" label-width="120px" :inline="false">
            <el-form-item label="分类名称：" prop="type_name">
                <el-input placeholder="请输入分类名称" v-model="form.type_name"></el-input>
            </el-form-item>
            <el-form-item label="英文名称：">
                <el-input placeholder="请输入分类英文名称" v-model="form.type_name_en"></el-input>
            </el-form-item>
            <el-form-item label="图标：">
                <el-upload
                    class="avatar-uploader"
                    action="https://mvc.rrabw.com/api/upload/uploadtypeicon"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    >
                    <img v-if="form.icon" :src="form.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="状态：">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1">
                        正常
                    </el-radio>
                    <el-radio :label="2">
                        禁用
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit(form)">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>
<script>
import { setToken } from "@/utils/auth";
import { typeEdit,typeInfo } from '@/api/article'
export default {
    data:function(){
        return {
            id:0,
            form:{
                type_name:'',
                type_name_en:'',
                icon:'',
                status:1
            },
            rules:{
                type_name:[
                     { required: true, message: "请输入用户名称", trigger: "blur" },
                ]
            }
        }
    },
    created(){
        this.id = this.$route.query.id
        if(this.id >0){
            this.getinfo();
        }
    },
    methods:{
        getinfo(){
            typeInfo({id:this.id}).then((res)=>{
                setToken(res.token)
                if(res.code == 200){
                    this.form.type_name = res.info.type_name
                    this.form.type_name_en = res.info.type_name_en
                    this.form.icon = res.info.icon
                    this.form.status = res.info.status
                }
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
                    typeEdit(saveData).then((res)=>{
                        setToken(res.token)
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            setTimeout(function(){
                                // this.$route.push({path:'/administrator/auth'})
                                that.$router.push({path:'/article/type'})
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
        },
        handleAvatarSuccess(res, file) {
            if (res.code == 200) {
                this.closeFullScreen(this.openFullScreen());
                this.form.icon = res.path;
            } else {
                this.$message.error(res.msg);
                this.closeFullScreen(this.openFullScreen());
            }
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg" || file.type === "image/gif" || file.type === 'images/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传图片只能是 JPG、GIF、PNG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 2MB!");
            }
            this.openFullScreen();
            return isJPG && isLt2M;
        },
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: "图片上传中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            return loading;
        },
        closeFullScreen(loading) {
            loading.close();
        },
    }
}
</script>