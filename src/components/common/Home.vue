<template>
	<section class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>
		<section class="el-main content">
			<transition name="move" mode="out-in">
				<router-view></router-view>
			</transition>
		</section>
	</section>
</template>

<script>
	import vHead from './Header.vue';
	import vSidebar from './Sidebar.vue';
	import {getMenuData} from '../../service/getData'
	
	export default {
		components: {
			vHead,
			vSidebar
		},

		mounted() {
			// 获取当前城市
			getMenuData().then(res => {
				console.log(res)
			})
		}
	}
</script>