<style lang="less" scoped>
.content{
    padding: 10px;
    margin: 10px;
}
</style>
<template>
    <div class="content">
        <el-form :model="form" :ref="form" :rules="rules" label-width="120px" :inline="false" size="normal">
            <el-form-item label="新闻标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入新闻标题"></el-input>
            </el-form-item>
            <el-form-item label="新闻短标题" prop="sort_title">
                <el-input v-model="form.sort_title" placeholder="请输入新闻短标题"></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop="keyword" >
                <el-input v-model="form.keyword" placeholder="请输入文章关键字"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="form.author" placeholder="请输入文章作者"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="type_id">
                <el-select v-model="form.type_id" placeholder="请选择文章分类">
                    <el-option v-for="item in typelist"
                        :key="item.id"
                        :label="item.type_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面图" prop="pic">
                <el-upload
                    class="avatar-uploader"
                    action="https://mvc.rrabw.com/api/upload/uploadarticleicon"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    >
                    <img v-if="form.pic" :src="form.pic" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章内容" size="normal">
                
            </el-form-item>
            <el-form-item label="文章状态" size="normal">
                <el-radio-group v-model="form.status" >
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>
<script>
export default {
    data:function(){

        return {
            form:{},
            rules:[],
            id:'',
            typelist:[]
        }
    }
}
</script>