<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>快递员信息</el-breadcrumb-item>
				<el-breadcrumb-item>新增快递员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :model="courierForm" :rules="rules" ref="courierForm" label-width="100px">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="courierForm.name"></el-input>
			</el-form-item>
			<el-form-item label="别称" prop="nickName">
				<el-input v-model="courierForm.nickName"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone">
				<el-input v-model="courierForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="微信" prop="wechat">
				<el-input v-model="courierForm.wechat"></el-input>
			</el-form-item>
			<el-form-item label="家乡" prop="hometown">
				<el-input v-model="courierForm.hometown"></el-input>
			</el-form-item>
			<el-form-item label="省" prop="province">
				<el-input v-model="courierForm.province"></el-input>
			</el-form-item>
			<el-form-item label="市" prop="city">
				<el-input v-model="courierForm.city"></el-input>
			</el-form-item>
			<el-form-item label="区" prop="area">
				<el-input v-model="courierForm.area"></el-input>
			</el-form-item>
			<el-form-item label="所属站点" prop="siteID">
				<el-select v-model="courierForm.siteID" placeholder="请选择">
					<el-option v-for="item in siteData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注" prop="remarks">
				<el-input type="textarea" v-model="courierForm.remarks"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('courierForm')">立即提交</el-button>
				<el-button @click="resetForm('courierForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { getSite, addCourier, getCourier } from '../../service/getData'

	export default {
		data() {
			var validatPhone = (rule, value, callback) => {
				if(/^1[34578]\d{9}$/.test(value) || !value) {
					callback();
				}
				callback(new Error('请输入正确的电话号码'));
			};

			return {
				siteData: [],
				courierForm: {
					id: '',
					userID: '',
					name: '',
					nickName: '',
					phone: '',
					wechat: '',
					hometown: '',
					province: '',
					city: '',
					area: '',
					siteID: '',
					remarks: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入快递员姓名',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.fetchCourier();
			this.getSiteData();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchCourier'
		},
		methods: {
			fetchCourier() {
				let self = this;
				if(self.$route.params.id) {
					getCourier('', '', self.$route.params.id).then(res => {
						if(res.isSuccess) {
							self.courierForm = res.result[0]
						}
					})
				}
			},
			getSiteData() {
				let self = this;
				getSite().then(res => {
					if(res.isSuccess) {
						self.siteData = res.result;
					}
				})
			},
			submitForm(formName) {
				let self = this;
				self.$refs[formName].validate((valid) => {
					if(valid) {
						addCourier(self.courierForm).then(res => {
							if(res.isSuccess) {
								self.$message('操作成功');
								self.$router.push('/allcourier');
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>

</style>