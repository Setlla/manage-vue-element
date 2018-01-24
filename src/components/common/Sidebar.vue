<template>
    <div class="el-aside sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'allcustomer',
                        title: '客户信息',
                        subs: [
                            {
                                index: 'allcustomer',
                                title: '全部客户'
                            },
                            {
                                index: 'addcustomer',
                                title: '编辑客户'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '站点信息',
                        subs: [
                            {
                                index: 'allsite',
                                title: '全部站点'
                            },
                            {
                                index: 'addsite',
                                title: '编辑站点'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '3',
                        title: '快递员信息',
                        subs: [
                            {
                                index: 'allcourier',
                                title: '全部快递员'
                            },
                            {
                                index: 'addcourier',
                                title: '编辑快递员'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '4',
                        title: '快递公司信息',
                        subs: [
                            {
                                index: 'allcompany',
                                title: '全部快递公司'
                            },
                            {
                                index: 'addcompany',
                                title: '编辑快递公司'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '5',
                        title: '全部包裹',
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
