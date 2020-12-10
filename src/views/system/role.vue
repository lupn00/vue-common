<template>
    <div class="container">
        <v-place></v-place>

        <div class="wrap">
            <div class="table-top">
                <el-button type="primary" @click="updateShowFn()">添加角色</el-button>
            </div>

            <div class="table-main">
                <!-- 表格 -->
                <el-table ref="mainTable" stripe tooltip-effect="dark" :data="dataList" border>
                    <el-table-column label="角色ID" prop="id" show-overflow-tooltip></el-table-column>
                    <el-table-column label="角色名" prop="roleName" show-overflow-tooltip></el-table-column>

                    <!--<el-table-column label="角色权限" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-tooltip placement="left" class="tooltip">
                                <div slot="content">
                                    <el-tree class="menuTip" ref="menuTip"
                                             :data="roleMenu[scope.row.id]"
                                             default-expand-all
                                             :props="defaultProps">
                                    </el-tree>
                                </div>
                                <el-button type="text">鼠标停留展开</el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>-->

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="updateShowFn(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteDataFn(scope.row.id)">删除</el-button>
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

            <!-- 新增修改角色 -->
            <el-dialog class="dialog-box" :title="showType+'角色'" :close-on-click-modal="false"
                       :visible.sync="updateShow">
                <el-form :model="update" :rules="rules" ref="update" label-width="110px">
                    <el-form-item v-if="showType=='修改'" label="角色ID：">
                        <el-input :disabled="true" v-model="update.id"></el-input>
                    </el-form-item>

                    <el-form-item label="角色名称：" prop="roleName">
                        <el-input v-model="update.roleName" maxlength="20" placeholder="请输入角色名称"></el-input>
                    </el-form-item>

                    <el-form-item label="角色权限：" class="role-ckb">
                        <el-tree class="role-tree"
                                 ref="menuList"
                                 :data="menuList"
                                 show-checkbox
                                 node-key="id"
                                 default-expand-all
                                 :props="defaultProps">
                        </el-tree>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="cancelDataFn">取消</el-button>
                    <el-button type="primary" @click="updateDataFn">确认</el-button>
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
                dataList: [],
                menuList: [],
                roleMenu: [],
                showType: "新增",
                updateShow: false,
                update: {
                    id: "", // 新增传ID 修改传''
                    roleName: "", // 角色名称
                },
                rules: {
                    roleName: [
                        {required: true, message: "请输入角色名称", trigger: "blur"},
                        {validator: this.$rules.validateLength, trigger: 'blur'},
                    ]
                },
                defaultProps: {
                    children: "modulePermissionList",
                    label: "permissionName"
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
            this.getMenuListFn();
        },
        methods: {
            // 获取栏目列表
            getMenuListFn() {
                http.getMenuTree(res => {
                    res.data.forEach(v => {
                        v.id = 'A' + v.id
                    });
                    this.menuList = res.data;
                });
            },
            // 获取角色列表
            getDataListFn() {
                let param = {
                    page: this.pageNo,
                    pageSize: this.pageSize,
                };

                this.roleMenu = [];

                http.getRoleList(param, res => {
                    this.dataList = res.data.records;
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
                this.updateShow = true;
                // 清空校验
                if (this.$refs["update"]) {
                    this.$refs["update"].clearValidate();
                }

                if (item) {
                    this.showType = "修改";
                    this.update.id = item.id;
                    this.update.roleName = item.roleName;
                    let roleIds = item.ids;
                    console.log(roleIds)
                    this.$nextTick(() => {
                        this.$refs.menuList.setCheckedKeys(roleIds);
                    });
                } else {
                    this.showType = "新增";
                    this.update.id = "";
                    this.update.roleName = "";
                    this.$nextTick(() => {
                        this.$refs.menuList.setCheckedKeys([]);
                    });
                }
            },
            // 保存
            updateDataFn() {
                this.$refs["update"].validate(valid => {
                    if (valid) {
                        let checkedIds = [],
                            checkedNodes = this.$refs.menuList.getCheckedNodes();

                        checkedNodes.forEach(v => {
                            if (!v.modulePermissionList) {
                                checkedIds.push({id: v.id})
                            }
                        });

                        if (!checkedIds || checkedIds.length === 0) {
                            this.$alert("请选择需要添加的角色权限");
                            return false;
                        }

                        if (this.showType === "新增") {
                            let param = {
                                roleName: this.update.roleName,
                                rolePermissionAddList: checkedIds,
                            };
                            http.addRole(param, res => {
                                this.$message.success('新增成功！');
                                this.$refs.menuList.setCheckedKeys([]);
                                this.updateShow = false;
                                this.getDataListFn();
                            });
                        } else {
                            let param = {
                                id: this.update.id,
                                roleName: this.update.roleName,
                                rolePermissionUpdateList: checkedIds,
                            };
                            http.editRole(param, res => {
                                this.$message.success('修改成功！');
                                this.$refs.menuList.setCheckedKeys([]);
                                this.updateShow = false;
                                this.getDataListFn();
                            });
                        }

                    }
                });
            },
            // 取消
            cancelDataFn() {
                this.$refs.menuList.setCheckedKeys([]);
                this.updateShow = false;
            },
            // 获取角色的menu树
            getRoleMenuTreedFn(id) {
                // http.getRoleMenuTreed({id: id}, res => {
                //     this.$set(this.roleMenu, id, res.data.rights.childList)
                // });
            },
            // 选中全部
            // checkedAllFn() {
            //   if (this.ifAllChecked) {
            //     this.$refs.menuList.setCheckedNodes(this.menuList);
            //   } else {
            //     // 取消选中
            //     this.$refs.menuList.setCheckedKeys([]);
            //   }
            // },

            // 展开全部
            // expandAllFn() {
            //   for (let i = 0; i < this.$refs.menuList.store._getAllNodes().length; i++) {
            //     this.$refs.menuList.store._getAllNodes()[i].expanded = this.ifAllExpanded;
            //   }
            //   this.$refs.menuList.store.defaultExpandAll = this.ifAllExpanded;
            //   console.log(this.$refs.menuList.store._getAllNodes())
            // },

            // 删除
            deleteDataFn(id) {
                if (!id) {
                    this.$message("请选择需要删除的角色");
                    return false;
                }

                this.$confirm("确定需要删除此的角色吗？", "温馨提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消"
                    }
                ).then(() => {
                    http.deleteRole({id: id}, res => {
                        this.$message.success('删除成功！');

                        if (this.dataList.length === 1 && this.pageNo > 1) {
                            this.pageNo--;
                        }
                        this.getDataListFn();
                    });
                });
            }
        }
    };
</script>

<style scoped>
    .table-main .tooltip {
        padding: 0;
    }
    .menuTip {
        color: #fff;
        background: #303133;
    }
    /deep/ .menuTip .el-tree-node__content {
        padding-right: 10px;
    }
    /deep/ .menuTip .el-tree-node__content:hover {
        padding-right: 10px;
        background: #666;
    }
</style>
