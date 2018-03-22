<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>客户信息</el-breadcrumb-item>
				<el-breadcrumb-item>编辑客户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :model="customerForm" :rules="rules" ref="customerForm" label-width="100px">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="customerForm.name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mPhone">
				<el-input v-model="customerForm.mPhone"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone">
				<el-input v-model="customerForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="微信" prop="wechat">
				<el-input v-model="customerForm.wechat"></el-input>
			</el-form-item>
			<el-form-item label="地址1" prop="address1">
				<el-input v-model="customerForm.address1"></el-input>
			</el-form-item>
			<el-form-item label="地址2" prop="address2">
				<el-input v-model="customerForm.address2"></el-input>
			</el-form-item>
			<el-form-item label="省" prop="province">
				<el-input v-model="customerForm.province"></el-input>
			</el-form-item>
			<el-form-item label="市" prop="city">
				<el-input v-model="customerForm.city"></el-input>
			</el-form-item>
			<el-form-item label="区" prop="area">
				<el-input v-model="customerForm.area"></el-input>
			</el-form-item>
			<el-form-item label="所属站点" prop="siteID">
				<el-select v-model="customerForm.siteID" placeholder="请选择">
					<el-option v-for="item in siteData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属快递员" prop="courierID">
				<el-select v-model="customerForm.courierID" placeholder="请选择">
					<el-option v-for="item in courierData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="等级" prop="grade">
				<el-input v-model="customerForm.grade"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remarks">
				<el-input type="textarea" v-model="customerForm.remarks"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('customerForm')">立即提交</el-button>
				<el-button type="primary" @click="cancelForm()">取消编辑</el-button>
				<el-button @click="resetForm('customerForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { getSite, getCourier, addCustomer, getCustomer } from '../../service/getData'

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
				courierData: [],
				customerForm: {
					id: null,
					userID: null,
					name: '',
					mPhone: '',
					phone: '',
					wechat: '',
					siteID: null,
					courierID: null,
					grade: '',
					address1: '',
					address2: '',
					province: '',
					city: '',
					area: '',
					chargeTime: null,
					balance: null,
					remarks: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入客户姓名',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.fetchcustomer();
			this.getSiteData();
			this.getCourierData();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchcustomer'
		},
		methods: {
			fetchcustomer() {
				let self = this;
				if(self.$route.params.id) {
					getCustomer({id: self.$route.params.id}).then(res => {
						if(res.isSuccess) {
							self.customerForm = res.result[0]
						}
					})
				}
			},
			getSiteData() {
				let self = this;
				let _siteData = JSON.parse(localStorage.getItem('siteData'));

				if(_siteData) {
					self.siteData = _siteData;
				} else {
					getSite().then(res => {
						if(res.isSuccess) {
							localStorage.setItem('siteData', JSON.stringify(res.result));
							self.siteData = res.result;
						}
					})
				}
			},
			getCourierData() {
				let self = this;
				let _courierData = JSON.parse(localStorage.getItem('courierData'));

				if(_courierData) {
					self.courierData = _courierData;
				} else {
					getCourier().then(res => {
						if(res.isSuccess) {
							localStorage.setItem('courierData', JSON.stringify(res.result));
							self.courierData = res.result;
						}
					})
				}
			},
			submitForm(formName) {
				let self = this;
				self.$refs[formName].validate((valid) => {
					if(valid) {
						addCustomer(self.customerForm).then(res => {
							if(res.isSuccess) {
								self.$message('操作成功');
								self.$router.push('/allcustomer');
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
			},
			cancelForm() {
				window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
			}
		}
	}
</script>

<style>

</style>