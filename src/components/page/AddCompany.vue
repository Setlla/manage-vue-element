<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>公司信息</el-breadcrumb-item>
				<el-breadcrumb-item>编辑公司</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :model="companyForm" :rules="rules" ref="companyForm" label-width="100px">
			<el-form-item label="公司名称" prop="name">
				<el-input v-model="companyForm.name"></el-input>
			</el-form-item>
			<el-form-item label="编码" prop="code">
				<el-input v-model="companyForm.code"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remarks">
				<el-input type="textarea" v-model="companyForm.remarks"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('companyForm')">立即提交</el-button>
				<el-button @click="resetForm('companyForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { addCompany, getCompany } from '../../service/getData'

	export default {
		data() {
			return {
				companyForm: {
					id: '',
					code: '',
					name: '',
					remarks: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.fetchCompany();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchCompany'
		},
		methods: {
			fetchCompany() {
				let self = this;
				if(self.$route.params.id) {
					getCompany('', '', self.$route.params.id).then(res => {
						if(res.isSuccess) {
							self.companyForm = res.result[0]
						}
					})
				}
			},
			submitForm(formName) {
				let self = this;
				self.$refs[formName].validate((valid) => {
					if(valid) {
						addCompany(self.companyForm).then(res => {
							if(res.isSuccess) {
								self.$message('操作成功');
								self.$router.push('/allcompany');
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