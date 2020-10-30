<style lang="less" scoped>
.content{
    padding: 10px;
    margin: 10px;
}
</style>
<template>
    <div class="content">
        <el-row>
            <el-button type="primary" size="default" @click="addarticle">添加新闻</el-button>
        </el-row>
        <div class="linebox"></div>
        <el-table data="" border stripe>
            
        </el-table>
        
        <div class="linebox"></div>
        <el-row>

        </el-row>
        
    </div>
</template>
<script>
export default {
    data:function(){
        return {

        }
    },
    methods:{
        addarticle(){
            this.$router.push({path:'/article/add'})
        }
    }
}
</script>