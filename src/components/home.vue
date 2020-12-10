<template>
    <div class="wrapper">
        <header>
            <div class="header-name">{{$store.state.systemName}}</div>

            <div class="header-nav">
                <ul class="clearfix">
                    <li v-for="item in navList" :key="item.id" :class="{'on':item.isThis}"
                        @click="navClickFn(item)">{{item.rightName}}
                    </li>
                </ul>
            </div>

            <!-- 用户名下拉菜单 -->
            <el-dropdown class="header-user" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您，{{username}} <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </header>

        <div v-if="menuList&&menuList.length>0" class="sidebar">
            <ul>
                <li v-for="item in menuList" :key="item.id" :class="{'on':item.rightUrl===pathName}"
                    @click="menuClickFn(item)">
                    <i :class="item.rightIcon" class="iconfont"></i>
                    <span>{{ item.rightName }}</span>
                </li>
            </ul>
        </div>

        <div class="content" :class="{'content-index':pathName==='/index'}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: this.$store.state.userName,
                navList: this.$store.state.navList,
                menuList: [],
                pathName: ''
            };
        },
        mounted() {
            this.changeNavFn();
        },
        methods: {
            // 定位当前菜单
            changeNavFn() {
                this.pathName = this.$route.path;
                let pathNav = this.pathName.split('/')[1];

                this.navList.forEach((v) => {
                    let thisNav = v.rightUrl.split('/')[1];
                    if (thisNav === pathNav) {
                        this.$set(v, 'isThis', true);
                        this.menuList = v.childList;
                    } else {
                        this.$set(v, 'isThis', false);
                    }
                });
            },
            // 导航点击
            navClickFn(item) {
                this.menuList = item.child ? item.child : [];
                this.$router.push(item.rightUrl);
            },
            // 菜单点击
            menuClickFn(item) {
                this.$router.push(item.rightUrl);
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'logout') {
                    this.$router.push('/login');
                }
            },
        },
        watch: {
            $route: {
                handler(val, valOld) {
                    this.changeNavFn();
                }
            },
        }
    };
</script>
