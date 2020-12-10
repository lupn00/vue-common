<template>
    <div class="container">
        <v-place></v-place>

        <div class="wrap">
            <h2 class="title">系统名称</h2>

            <div class="system">
                <el-input class="s-ipt" v-model="systemName" maxlength="10" :disabled="!isEdit"></el-input>
                <el-button v-if="!isEdit" class="btn btn-zi" @click="isEditFn">编辑</el-button>
                <el-button v-else class="btn btn-zi" @click="saveSystemNameFn">完成</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '@/http-api';
    import vPlace from "@/components/common/place";

    export default {
        data() {
            return {
                systemName: this.$store.state.systemName,
                isEdit: false
            };
        },
        components: {
            vPlace,
        },
        mounted() {

        },
        methods: {
            // 是否编辑
            isEditFn() {
                this.isEdit = true;
            },
            // 修改系统名称
            saveSystemNameFn() {
                let param = {
                    key: "systemName",
                    value: this.systemName,
                    createUser: "admin"
                };

                http.saveSystemName(param, res => {
                    this.$store.commit('updateSystemName', this.systemName);
                    this.$message({type: "success", message: res.msg});
                    this.isEdit = false;
                })
            }
        }
    }
</script>

<style>
    .s-ipt {
        width: 248px;
        height: 34px;
        margin-right: 24px;
        border-radius: 4px;
        border: 1px solid rgba(178, 178, 178, 0.17);
    }
    .s-ipt .el-input__inner {
        height: 32px;
        line-height: 32px;
    }
</style>
