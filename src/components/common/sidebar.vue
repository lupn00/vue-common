<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"
                 :default-active="onRoutes"
                 :collapse="collapse"
                 background-color="#324157"
                 text-color="#bfcbd9"
                 active-text-color="#20a0ff"
                 unique-opened router>
            <template v-for="item in menuList">
                <template v-if="item.menuList">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i> <span slot="title">{{ item.menuName }}</span>
                        </template>
                        <template v-for="twoItem in item.menuList">
                            <el-submenu v-if="twoItem.menuList&&twoItem.menuList>0" :index="twoItem.url"
                                        :key="twoItem.url">
                                <template slot="title">{{ twoItem.title }}</template>

                                <template v-if="twoItem.menuList&&twoItem.menuList>0">
                                    <el-menu-item v-for="(threeItem,i) in twoItem.menuList" :key="i"
                                                  :index="threeItem.url">
                                        {{ threeItem.menuName }}
                                    </el-menu-item>
                                </template>

                            </el-submenu>
                            <el-menu-item v-else :index="twoItem.url" :key="twoItem.url">
                                {{ twoItem.menuName }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i> <span slot="title">{{ item.menuName }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '@/assets/js/bus';

    export default {
        data() {
            return {
                collapse: false,
                menuList: this.$store.state.navList
            };
        },
        computed: {
            onRoutes() {
                // return this.$route.path.replace('/', '');
                return this.$route.path;
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    };
</script>

<style scoped>
</style>
