<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>客户信息</el-breadcrumb-item>
				<el-breadcrumb-item>全部客户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px">
			<el-form-item prop="name">
				<el-input v-model="searchForm.name" placeholder="输入客户姓名"></el-input>
			</el-form-item>
			<el-form-item prop="mPhone">
				<el-input v-model="searchForm.mPhone" placeholder="输入手机号码"></el-input>
			</el-form-item>
			<el-form-item prop="grade">
				<el-input v-model="searchForm.grade" placeholder="输入客户级别"></el-input>
			</el-form-item>
			<el-form-item prop="siteID">
				<el-select v-model="searchForm.siteID" placeholder="请选择站点">
					<el-option v-for="item in siteData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="courierID">
				<el-select v-model="searchForm.courierID" placeholder="请选择快递员">
					<el-option v-for="item in courierData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-button type="primary" icon="search" @click="search">搜索</el-button>
			<el-button @click="resetForm('searchForm')">清空</el-button>
		</el-form>
		<el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="mPhone" label="手机">
			</el-table-column>
			<el-table-column prop="phone" label="电话">
			</el-table-column>
			<el-table-column prop="wechat" label="微信">
			</el-table-column>
			<el-table-column prop="grade" label="等级">
			</el-table-column>
			<el-table-column prop="siteID" label="所属站点" :formatter="formatSite">
			</el-table-column>
			<el-table-column prop="courierID" label="所属快递员" :formatter="formatCourier">
			</el-table-column>
			<el-table-column prop="remarks" label="备注">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.row )">编辑</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row, data)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination @current-change="handleCurrentChange" :page-size='pageSize' layout="prev, pager, next" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { getSite, getCustomer, delCustomer, getCourier } from '../../service/getData'

	export default {
		data() {
			return {
				searchForm: {
					name: '',
					siteID: null,
					id: null,
					grade: '',
					mPhone: '',
					courierID: null
				},
				customerData: [],
				siteData: [],
				courierData: [],
				curPage: 1,
				pageSize: 10, //每一页的数量
				total: 0
			}
		},
		computed: {
			data() { //分页
				let start = 0;
				if(this.total > this.pageSize) {
					start = this.pageSize * (this.curPage - 1);
				}
				let end = start + this.pageSize;
				return this.customerData.slice(start, end);
			}
		},
		created() {
			this.getData();
			this.getSiteData();
			this.getCourierData();
		},
		methods: {
			handleCurrentChange(val) {
				this.curPage = val;
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
			getData() {
				let self = this;
				getCustomer(self.searchForm).then(res => {
					if(res.isSuccess) {
						self.customerData = res.result;
						self.total = res.result.length;
					}
				})
			},
			search() {
				this.getData();
			},
			handleEdit(row) {
				this.$router.push('/updateCustomer/' + row.id);
			},
			handleDelete(index, row, rows) {
				let self = this;
				delCustomer(row.id).then(res => {
					if(res.isSuccess) {
						rows.splice(index, 1);
						self.$message('删除成功');
					}
				})
			},
			delAll() {

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.getData();
			},
			formatSite(row) {
				for(var i = 0; i < this.siteData.length; i++) {
					if(this.siteData[i].id == row.siteID) {
						return this.siteData[i].name;
					}
				}
				return '';
			},
			formatCourier(row) {
				for(var i = 0; i < this.courierData.length; i++) {
					if(this.courierData[i].id == row.courierID) {
						return this.courierData[i].name;
					}
				}
				return '';
			}
		}
	}
</script>
