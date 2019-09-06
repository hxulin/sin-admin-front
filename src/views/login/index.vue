<template>
  <div class="login-container">
    <el-card class="box-card login-form-layout" shadow="always">
      <div class="logo">
        <svg-icon class="logo_icon" icon-class="logo"/>
      </div>
      <h2>sin-admin</h2>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off"
               label-position="left">
        <el-form-item prop="loginName">
          <el-input v-model="loginForm.loginName" placeholder="请输入用户名">
            <svg-icon class="prefix_icon" slot="prefix" icon-class="user"/>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :type="passwordType" placeholder="请输入密码">
            <svg-icon class="prefix_icon" slot="prefix" icon-class="password"/>
            <span slot="suffix" class="show-pwd" @click="showPwd">
                            <svg-icon class="suffix_icon"
                                      :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
                        </span>
          </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
          <el-input v-model="loginForm.captcha" placeholder="请输入验证码" @keyup.enter.native="handleLogin">
            <svg-icon class="prefix_icon captcha_icon" slot="prefix" icon-class="captcha"/>
            <template slot="append">
              <div class="captcha-container">
                <img ref="captchaImg" src="@/assets/login/securityCode.png" alt="验证码"/>
                <span @click="refreshCaptcha">
                                    <i class="el-icon-refresh"></i>
                                </span>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-button class="login_btn" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录
        </el-button>
      </el-form>
    </el-card>
    <img class="login_bg" src="@/assets/login/login_center_bg.png" alt="">
  </div>
</template>

<script>

  import {Notification} from "element-ui";
  import {getCaptcha} from '@/api/login'
  import {validUsername} from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateLoginName = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('用户名由2-20位字母或数字组成'));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6 || value.length > 16) {
          callback(new Error('密码由6-16位字符组成'));
        } else {
          callback();
        }
      };
      const validateCaptcha = (rule, value, callback) => {
        if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
          callback(new Error('验证码格式错误'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          loginName: 'admin',
          password: '123456',
          captcha: '',
          token: ''
        },
        loginRules: {
          loginName: [{required: true, trigger: 'blur', validator: validateLoginName}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          captcha: [{required: true, trigger: 'blur', validator: validateCaptcha}]
        },
        passwordType: 'password',
        loading: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    mounted() {
      this.refreshCaptcha();
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = '';
        } else {
          this.passwordType = 'password';
        }
      },
      refreshCaptcha() {
        getCaptcha().then(response => {
          this.loginForm.token = response.headers['sin-token'];
          const blob = response.data;
          const img = this.$refs.captchaImg;
          img.onload = function () {
            window.URL.revokeObjectURL(img.src);
          };
          img.src = window.URL.createObjectURL(blob);
        });
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({path: this.redirect || '/'})
            }).catch(err => {
              this.loading = false;
              if (err !== undefined) {
                Notification.error({
                  title: '登录失败',
                  message: err
                });
                this.loginForm.captcha = '';
                this.refreshCaptcha();
              }
            });
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $mainColor: #409eff;
  .login-container {
    .login-form-layout {
      position: absolute;
      left: 0;
      right: 0;
      width: 360px;
      margin: 120px auto;
      border-top: 10px solid $mainColor;

      .logo {
        text-align: center;

        .logo_icon {
          width: 75px;
          height: 75px
        }
      }

      h2 {
        text-align: center;
        color: $mainColor;
        margin-top: 5px;
      }

      .login-form {
        .prefix_icon {
          color: $mainColor;
        }

        .suffix_icon {
          color: $mainColor;
        }

        .captcha_icon {
          font-size: 18px;
          position: relative;
          top: 9px;
        }

        /deep/ .el-input-group__append {
          padding: 0 1px;
        }

        .captcha-container {
          position: relative;
          height: 30px;

          img {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            position: relative;
            top: -1px;
            width: 80px;
            height: 32px;
          }

          span {
            opacity: 0;
            position: absolute;
            width: 80px;
            height: 32px;
            left: 0;
            top: -1px;
            background-color: rgba(0, 0, 0, .5);
            text-align: center;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            font-size: 20px;
            font-weight: bold;
            line-height: 32px;
            color: #FFF;
            cursor: pointer;
          }

          span:hover {
            opacity: 1;
          }
        }

        .login_btn {
          width: 100%;
          margin-bottom: 30px;
        }
      }
    }

    .login_bg {
      background: $mainColor;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      margin-top: 200px;
    }
  }
</style>
