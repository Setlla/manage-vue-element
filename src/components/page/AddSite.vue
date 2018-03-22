<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>站点信息</el-breadcrumb-item>
				<el-breadcrumb-item>编辑站点</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :model="siteForm" :rules="rules" ref="siteForm" label-width="100px">
			<el-form-item label="站点名称" prop="name">
				<el-input v-model="siteForm.name"></el-input>
			</el-form-item>
			<el-form-item label="地址" prop="address">
				<el-input type="textarea" v-model="siteForm.address"></el-input>
			</el-form-item>
			<el-form-item label="负责区域" prop="territory">
				<el-input type="textarea" v-model="siteForm.territory"></el-input>
			</el-form-item>
			<el-form-item label="负责人姓名" prop="contactName">
				<el-input v-model="siteForm.contactName"></el-input>
			</el-form-item>
			<el-form-item label="负责人别称" prop="contactNickname">
				<el-input v-model="siteForm.contactNickname"></el-input>
			</el-form-item>
			<el-form-item label="负责人电话" prop="contactPhone">
				<el-input v-model="siteForm.contactPhone"></el-input>
			</el-form-item>
			<el-form-item label="负责人微信" prop="contactWechat">
				<el-input v-model="siteForm.contactWechat"></el-input>
			</el-form-item>
			<el-form-item label="负责人家乡" prop="contactHometown">
				<el-input v-model="siteForm.contactHometown"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remarks">
				<el-input type="textarea" v-model="siteForm.remarks"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('siteForm')">立即提交</el-button>
				<el-button type="primary" @click="cancelForm()">取消编辑</el-button>
				<el-button @click="resetForm('siteForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { addSite, getSite } from '../../service/getData'

	export default {
		data() {
			var validatPhone = (rule, value, callback) => {
				if(/^1[34578]\d{9}$/.test(value) || !value) {
					callback();
				}
				callback(new Error('请输入正确的电话号码'));
			};

			return {
				siteForm: {
					id: '',
					name: '',
					address: '',
					territory: '',
					contactName: '',
					contactNickname: '',
					contactPhone: '',
					contactWechat: '',
					contactHometown: '',
					remarks: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入站点名称',
						trigger: 'blur'
					}],
					contactPhone: [{
						validator: validatPhone,
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.fetchSite();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchSite'
		},
		methods: {
			fetchSite() {
				let self = this;
				if(self.$route.params.id) {
					getSite('', self.$route.params.id).then(res => {
						if(res.isSuccess) {
							self.siteForm = res.result[0]
						}
					})
				}
			},
			submitForm(formName) {
				let self = this;
				self.$refs[formName].validate((valid) => {
					if(valid) {
						addSite(self.siteForm).then(res => {
							if(res.isSuccess) {
								self.$message('操作成功');
								self.$router.push('/allsite');
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