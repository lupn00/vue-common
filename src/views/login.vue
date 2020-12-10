<template>
    <div class="login-wrap">
        <div class="login-box">
            <h1 class="login-title">
                <!--<img src="../assets/images/login_logo.png" alt="logo">-->
                <span>{{$store.state.systemName}}</span>
            </h1>
            <el-form class="login-form" :model="param" :rules="rules" ref="login" label-width="0px">
                <el-form-item prop="userName">
                    <el-input placeholder="请输入用户名" v-model="param.userName"
                              prefix-icon="iconfont iconyonghuming">
                    </el-input>
                </el-form-item>

                <el-form-item prop="userPassword">
                    <el-input type="password" placeholder="请输入密码" v-model="param.userPassword"
                              prefix-icon="iconfont iconmima" @keyup.enter.native="submitForm()">
                    </el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" :loading="isLoading" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import http from "../http-api";

    export default {
        data() {
            return {
                isLoading: false,
                param: {
                    userName: 'lupn',
                    userPassword: 'lp000000',
                },
                rules: {
                    userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    userPassword: [{required: true, message: '请输入密码', trigger: 'blur'}],
                },
            };
        },
        mounted() {
            this.getSystemNameFn()
        },
        methods: {
            // 获取系统名称
            getSystemNameFn() {
                http.getSystemName( res => {
                    this.$store.commit('updateSystemName', res.data.dictionariesValue);
                });
            },
            // 登录
            submitForm() {
                this.isLoading = true;
                this.$refs.login.validate(valid => {
                    if (valid) {
                        http.login(this.param, res => {
                            this.$store.commit('updateUserId', res.data.user.userId);
                            this.$store.commit('updateUserName', res.data.user.userName);
                            this.$store.commit('updateNavList', res.data.right.childList);
                            this.$store.commit('updateSystemName', res.data.system.dictionariesValue);
                            this.$store.commit('updateUserStatus', res.data.role[0].roleStatus);
                            this.isLoading = false;
                            // this.$router.push('/index');
                        });
                    } else {
                        this.$message.error('请输入账号和密码');
                        this.isLoading = false;
                        return false;
                    }
                });
            },
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/images/login_bg.png") center no-repeat;
        background-size: cover;
    }
    .login-box {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 770px;
        height: 588px;
        text-align: center;
        margin: -294px 0 0 -385px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.17);
        border-radius: 20px;
    }
    .login-title {
        width: 100%;
        height: 80px;
        margin-top: 25px;
        line-height: 80px;
        text-align: center;
        font-weight: normal;
    }
    .login-title img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: middle;
    }
    .login-title span {
        margin-left: 16px;
        font-size: 36px;
        color: rgba(47, 47, 47, 1);
        display: inline-block;
        vertical-align: middle;
    }
    .login-form {
        position: absolute;
        left: -32px;
        width: 834px;
        height: 410px;
        margin-top: 29px;
        padding: 96px 190px 0;
        background: url("../assets/images/login_ipt_bg.png") left top no-repeat;
        background-size: 100%;
    }
    /deep/ .login-form .iconfont {
        color: #fff;
        font-size: 24px;
    }
    /deep/ .login-form .el-form-item {
        margin-bottom: 56px;
    }
    /deep/ .login-form .el-input__inner {
        width: 366px;
        height: 38px;
        padding: 0 15px;
        line-height: 36px;
        background: rgba(255, 255, 255, 1);
        box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.5);
        border-radius: 6px;
        border: 1px solid rgba(178, 178, 178, 1);
    }
    /deep/ .login-form .el-form-item__error {
        left: 55px;
    }
    /deep/ .el-input__prefix {
        left: 4px;
    }
    .login-btn {
        padding-top: 84px;
        text-align: center;
    }
    .login-btn button {
        width: 318px;
        height: 40px;
        color: #fff;
        font-size: 18px;
        background: linear-gradient(360deg, rgba(91, 140, 255, 1) 0%, rgba(63, 230, 255, 1) 100%);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        border-radius: 10px;
    }
</style>
