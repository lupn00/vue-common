<template>
    <div class="container">
        <v-place></v-place>

        <div class="wrap">
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="search-form" label-width="120px">
                <div class="search-p">
                    <el-form-item label="搜索：" prop="keyWord">
                        <el-input v-model="searchForm.keyWord" placeholder="用户名、姓名、手机号"></el-input>
                    </el-form-item>

                    <el-button type="primary" @click="searchFormFn()">查询</el-button>
                </div>
            </el-form>

            <div class="table-top">
                <el-button type="primary" @click="updateShowFn()">添加用户</el-button>
            </div>

            <div class="table-main">
                <!-- 表格 -->
                <el-table ref="mainTable" stripe tooltip-effect="dark" :data="dataList" border>

                    <el-table-column label="用户名" prop="loginName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="姓名" prop="realName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="身份证号" prop="idNum" show-overflow-tooltip></el-table-column>
                    <el-table-column label="手机号" prop="phone" show-overflow-tooltip></el-table-column>
                    <el-table-column label="邮箱" prop="email" show-overflow-tooltip></el-table-column>
                    <el-table-column label="性别" prop="sex" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <template v-if="scope.row.sex===1">男</template>
                            <template v-else>女</template>
                        </template>
                    </el-table-column>

                    <el-table-column label="状态" prop="status" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <template v-if="scope.row.sex===1">正常</template>
                            <template v-else>停用</template>
                        </template>
                    </el-table-column>

                    <el-table-column label="角色" prop="roleName" show-overflow-tooltip></el-table-column>

                    <el-table-column label="创建时间" show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.createTime | getFormatDate}}</template>
                    </el-table-column>

                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="updateShowFn(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteDataFn(scope.row.id)">删除</el-button>
                            <el-button size="mini" type="warning" @click="passwordShowFn(scope.row.id)">重置密码
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination class="pagination" background
                               @size-change="sizeChange"
                               @current-change="pageChange"
                               :current-page.sync="pageNo"
                               layout="pager, sizes, jumper"
                               :page-sizes="[10, 20, 30, 40]"
                               :page-size="pageSize"
                               :total="totalPages">
                </el-pagination>
            </div>

            <!-- 新增修改用户 -->
            <el-dialog class="dialog-box" :title="showType+'用户'" :close-on-click-modal="false" :visible.sync="userShow">

                <el-form :model="update" :rules="rules" ref="update" label-width="95px">
                    <el-form-item label="用户名：" prop="loginName">
                        <el-input v-model="update.loginName" maxlength="20" placeholder="请输入用户名"
                                  :disabled="showType!=='新增'"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名：" prop="realName">
                        <el-input v-model="update.realName" maxlength="20" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证：" prop="idNum">
                        <el-input v-model="update.idNum" maxlength="18" placeholder="请输入身份证号"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号：" prop="phone">
                        <el-input v-model="update.phone" maxlength="11" placeholder="请输入手机号"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="update.email" maxlength="50" placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    <el-form-item v-if="showType==='新增'" label="密码：" prop="password">
                        <el-input type="password" v-model="update.password" maxlength="12"
                                  placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="用户角色：" prop="roleId">
                        <el-select clearable v-model="update.roleId" placeholder="请选择角色">
                            <el-option v-for="item in roleList" :key="item.id"
                                       :value="item.id" :label="item.roleName"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="性别：" prop="sex">
                        <el-radio-group v-model="update.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="状态：" prop="status">
                        <el-radio-group v-model="update.status">
                            <el-radio :label="1">正常</el-radio>
                            <el-radio :label="2">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="备注：">
                        <el-input v-model="update.remark" maxlength="50"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="userShow = false">取消</el-button>
                    <el-button type="primary" @click="saveDataFn()">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import http from "@/http-api";
    import vPlace from "@/components/common/place";

    export default {
        data() {
            return {
                searchForm: {
                    keyWord: "", //关键词
                },
                roleList: [],
                dataList: [],
                chooseIds: [],
                showType: "新增",
                userShow: false,
                update: {
                    id: "",
                    loginName: "", // 用户名
                    realName: "", // 姓名
                    idNum: "", // 身份证号
                    phone: '', // 手机号
                    email: '', // 邮箱
                    password: '', // 密码
                    roleId: '',// 角色id
                    sex: '', // 性别--1：男 2：女
                    status: '', // 状态--1：正常 2：停用
                    remark: '', // 备注
                },
                rules: {
                    loginName: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {max: 20, message: "用户名最长不能超过20个字", trigger: "blur"}
                    ],
                    realName: [
                        {required: true, message: "请输入真实姓名", trigger: "blur"},
                        {max: 20, message: "姓名最长不能超过20个字", trigger: "blur"}
                    ],
                    idNum: [
                        {required: true, message: "请输入身份证号", trigger: "blur"},
                        {validator: this.$rules.idCard, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: "请输入手机号码", trigger: "blur"},
                        {validator: this.$rules.phoneNumber, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: "请输入邮箱号", trigger: "blur"},
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 12, message: "密码长度在6~12个字符", trigger: "blur"},
                        {pattern: /^[0-9A-Za-z]{6,12}$/, message: "只能输入6-12个字母、数字"}
                    ],
                    roleId: [
                        {required: true, message: "请选择角色", trigger: "change"},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    status: [
                        {required: true, message: "请选择状态", trigger: "change"},
                    ]
                },
                pageNo: 1, // 当前页
                pageSize: 10, // 每页显示的个数
                totalPages: 10 // 总条数
            };
        },
        components: {
            vPlace,
        },
        mounted() {
            this.getDataListFn();
            this.getAllRolesFn();
        },
        methods: {
            // 获取角色列表
            getAllRolesFn() {
                http.getAllRolesList(res => {
                    this.roleList = res.data.records;
                });
            },
            // 搜索
            searchFormFn() {
                this.pageNo = 1;
                this.getDataListFn();
            },
            // 获取用户列表
            getDataListFn() {
                let userData = {
                    keyWord: this.searchForm.keyWord,
                    page: this.pageNo,
                    pageSize: this.pageSize,
                };

                http.getUserList(userData, res => {
                    this.dataList = res.data.records;
                    this.totalPages = res.data.count;
                });
            },
            // 分页
            pageChange(pageNo) {
                this.pageNo = pageNo;
                this.getDataListFn();
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getDataListFn();
            },
            // 显示新增/修改
            updateShowFn(item) {
                this.userShow = true;
                // 清空校验
                if (this.$refs["update"]) {
                    this.$refs["update"].clearValidate();
                }

                if (item) {
                    this.showType = '修改';
                    this.update.id = item.id;
                    this.update.loginName = item.loginName;
                    this.update.realName = item.realName;
                    this.update.idNum = item.idNum;
                    this.update.phone = item.phone;
                    this.update.email = item.email;
                    this.update.password = '';
                    this.update.roleId = item.roleId;
                    this.update.sex = item.sex;
                    this.update.status = item.status;
                    this.update.remark = item.remark;
                } else {
                    this.showType = '新增';
                    this.update.id = '';
                    this.update.loginName = ''; // 用户名
                    this.update.realName = '';
                    this.update.idNum = "";
                    this.update.phone = '';
                    this.update.email = '';
                    this.update.password = '';
                    this.update.roleId = '';
                    this.update.sex = '';
                    this.update.status = '';
                    this.update.remark = '';
                }
            },
            // 更新上传
            saveDataFn() {
                this.$refs["update"].validate(valid => {
                    if (valid) {
                        if (this.showType === '新增') {
                            http.addUser(this.update, res => {
                                this.$message.success("新增成功！");
                                this.userShow = false;
                                this.getDataListFn();
                            });
                        } else {
                            http.editUser(this.update, res => {
                                this.$message.success("修改成功！");
                                this.userShow = false;
                                this.getDataListFn();
                            });
                        }
                    }
                });
            },
            passwordShowFn(id) {
                if (id === this.$store.state.userId) {
                    this.$message("当前用户不能重置密码");
                    return false
                }

                this.$confirm("确定需要重置此的用户密码吗？", "温馨提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    }
                ).then(() => {
                    http.resetPassword({id: id}, res => {
                        this.$alert('重置密码成功，用户【' + res.data.loginName + '】的当前密码为：' + res.data.password, '温馨提示',);
                    });
                });
            },
            // 删除
            deleteDataFn(id) {
                if (!id) {
                    this.$message("请选择需要删除的用户");
                    return false;
                }
                if (id === this.$store.state.userId) {
                    this.$message("当前用户登录，不能删除");
                    return false
                }

                this.$confirm("确定需要删除此的用户吗？", "温馨提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    }
                ).then(() => {
                    http.deleteUser({id: id}, res => {
                        this.$message.success("删除成功！");
                        if (this.dataList.length === 1 && this.pageNo > 1) {
                            this.pageNo--;
                        }
                        this.getDataListFn();
                    });
                });
            }
        }
    }
</script>
