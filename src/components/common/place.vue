<template>
    <!--面包屑导航-->
    <el-breadcrumb class="place" separator-class="place-icon el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in place" :key="index">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                place: []
            };
        },
        mounted() {
            this.place = this.$route.matched;
        },
        methods: {}
    }
</script>
