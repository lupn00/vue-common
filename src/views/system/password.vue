<template>
    <div class="container">
        <v-place></v-place>

        <div class="wrap">
            <h2 class="title">修改密码</h2>

            <el-form :model="formData" :rules="rules" ref="formData" class="form-box" label-width="100px">
                <el-form-item label="旧密码" prop="passwordOld">
                    <el-input type="password"
                              v-model="formData.passwordOld"
                              maxlength="12"
                              autocomplete="off"
                              placeholder="请输入旧密码">
                    </el-input>
                </el-form-item>

                <el-form-item label="新密码" prop="password">
                    <el-input type="password"
                              v-model="formData.password"
                              maxlength="12"
                              autocomplete="off"
                              placeholder="6~12位数字或字母">
                    </el-input>
                </el-form-item>

                <el-form-item label="确认新密码" prop="passwordAgain">
                    <el-input type="password"
                              v-model="formData.passwordAgain"
                              maxlength="12"
                              autocomplete="off"
                              placeholder="6~12位数字或字母">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="info" @click="resetFormFn">取消</el-button>
                    <el-button type="primary" @click="saveFormFn">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import vPlace from '@/components/common/place.vue';
    import http from "@/http-api";

    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (value !== this.formData.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };

            return {
                formData: {
                    passwordOld: "", //旧密码
                    password: "", //新密码
                    passwordAgain: "" //再次确认密码
                },
                rules: {
                    passwordOld: [
                        {required: true, message: "请输入旧密码", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入新密码", trigger: "blur"},
                        {min: 6, max: 12, message: "密码长度在6~12个字符", trigger: "blur"},
                        {pattern: /^[0-9A-Za-z]{6,12}$/, message: "只能输入6-12个字母、数字"}
                    ],
                    passwordAgain: [
                        {required: true, message: "请再次输入新密码", trigger: "blur"},
                        {min: 6, max: 12, message: "密码长度在6~12个字符", trigger: "blur"},
                        {pattern: /^[0-9A-Za-z]{6,12}$/, message: "只能输入6-12个字母、数字"},
                        {validator: validatePass, trigger: "blur"}
                    ]
                }
            };
        },
        components: {
            vPlace,
        },
        mounted() {

        },
        methods: {
            // 修改密码
            saveFormFn() {
                this.$refs['formData'].validate(valid => {
                    if (valid) {
                        let param = {
                            id: this.$store.state.userId,
                            oldPassword: this.formData.passwordOld,
                            password: this.formData.password,
                        };

                        http.editPassword(param, res => {
                            if (res) {
                                this.$alert("密码修改成功，请重新登录！", "提示", {
                                    confirmButtonText: "确定",
                                    callback: action => {
                                        this.$router.replace("/login");
                                    }
                                });
                            }
                        });
                    }
                });
            },
            // 重置
            resetFormFn() {
                this.$refs['formData'].resetFields();
            }
        }
    }
</script>

<style scoped>
    .form-box {
        margin-top: 20px;
        color: #2F2F2F;
    }
    .form-box .btn {
        height: 36px;
        line-height: 36px;
        margin-top: 20px;
    }
    .form-box .btn + .btn {
        margin-left: 40px;
    }
    /deep/ .form-box .el-form-item__label {
        color: #2F2F2F;
        line-height: 38px;
    }
    /deep/ .form-box .el-input__inner {
        width: 360px;
        height: 38px;
        line-height: 38px;
    }
</style>
