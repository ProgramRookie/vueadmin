<!--
 * @Author: 肥仔
 * @Date: 2020-10-28 11:09:15
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 17:04:01
 * @Description: file content
-->
<style lang="less" scoped>
.contant {
  padding: 10px;
  margin: 10px;
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
}
</style>
<template>
  <div class="contant">
    <el-form
      :model="form"
      :ref="form"
      :rules="rules"
      label-width="120px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="账号名称：" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入账号名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="账号密码：" prop="password">
        <el-input
          v-model="form.password"
          :placeholder="
            id > 0 ? '请输入密码，如果不为空则进行修改密码' : '请输入密码'
          "
        ></el-input>
      </el-form-item>

      <el-form-item label="账号组：" prop="rule_id">
        <el-select v-model="form.rule_id" placeholder="请选择账号组">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in rulelist"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像" size="normal" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://mvc.rrabw.com/api/upload/uploadavatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getuserlist, getinfobyId, adduser } from "@/api/user";
import { getauthselect } from "@/api/auth";
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      id: "",
      form: {
        username: "",
        password: "",
        rule_id: "",
        avatar: "",
      },
      rulelist: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { message: "请输入账号密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度 6-12个字符", trigger: "blur" },
        ],
        rule_id: [
          { required: true, message: "请选择用户组", trigger: "change" },
        ],
        avatar: [
          { required: true, message: "请上传用户头像", trigger: "change" },
        ],
      },
    };
  },
  components: {
    getuserlist,
    setToken,
    getauthselect,
    getinfobyId,
  },
  created() {
    this.id = this.$route.query.id;
    this.getuserinfo();
    this.getauthinfo();
  },
  methods: {
    getauthinfo() {
      getauthselect()
        .then((res) => {
          setToken(res.token);
          if (res.code == 200) {
            this.rulelist = res.list;
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    getuserinfo() {
      if (this.id > 0) {
        getinfobyId({
          id: this.id,
        })
          .then((res) => {
            if (res.code == 200) {
              this.form.username = res.data.username;
              this.form.avatar = res.data.avatar;
              this.form.rule_id = res.data.rule_id;
            }
          })
          .catch((res) => {
            this.$message.error(res);
          });
      }
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var savedata = this.form;
          if (this.id > 0) {
            savedata.id = this.id;
          } else {
            if (!savedata.password) {
              this.$message.error("请输入用户密码");
              return false;
            }
          }
          adduser(savedata)
            .then((res) => {
              if (res.code == 200) {
                setToken(res.token);
                this.$message.success(res.msg);
                this.$router.push({ path: "/administrator/index" });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((res) => {
              this.$message.error(res);
            });
        } else {
          this.$message.error("请填写完整表单");
          // console.log('请填写完整表单');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.closeFullScreen(this.openFullScreen());
        this.form.avatar = res.path;
      } else {
        this.$message.error(res.msg);
        this.closeFullScreen(this.openFullScreen());
      }
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/gif" || file.type === 'images/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.openFullScreen();
      return isJPG && isLt2M;
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "头像上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return loading;
    },
    closeFullScreen(loading) {
      loading.close();
    },
  },
};
</script>