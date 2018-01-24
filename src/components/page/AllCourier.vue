<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>快递员信息</el-breadcrumb-item>
				<el-breadcrumb-item>全部快递员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px">
			<el-form-item prop="name">
				<el-input v-model="searchForm.name" placeholder="输入快递员姓名"></el-input>
			</el-form-item>
			<el-form-item prop="siteID">
				<el-select v-model="searchForm.siteID" placeholder="请选择">
					<el-option v-for="item in siteData" :key="item.id" :label="item.name" :value="item.id">
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
			<el-table-column prop="nickName" label="别称">
			</el-table-column>
			<el-table-column prop="phone" label="电话">
			</el-table-column>
			<el-table-column prop="wechat" label="微信">
			</el-table-column>
			<el-table-column prop="hometown" label="家乡">
			</el-table-column>
			<el-table-column prop="siteID" label="所属站点" :formatter="formatSite">
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
	import { getSite, getCourier, delCourier } from '../../service/getData'

	export default {
		data() {
			return {
				searchForm: {
					name: '',
					siteID: ''
				},
				courierData: [],
				siteData: [],
				curPage: 1,
				pageSize: 10, //每一页的数量
				total: 0
			}
		},
		computed: {
			data() { //分页
				let start = 0;
				if(this.total > this.pageSize) {
					start = this.pageSize * this.curPage - 1;
				}
				let end = start + this.pageSize;
				return this.courierData.slice(start, end);
			}
		},
		created() {
			this.getData();
			this.getSiteData();
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
			getData() {
				let self = this;
				getCourier(self.searchForm.name, self.searchForm.siteID).then(res => {
					if(res.isSuccess) {
						self.courierData = res.result;
						self.total = res.result.length;
					}
				})
			},
			search() {
				this.getData();
			},
			handleEdit(row) {
				this.$router.push('/updatecourier/' + row.id);
			},
			handleDelete(index, row, rows) {
				let self = this;
				delCourier(row.id).then(res => {
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
			}
		}
	}
</script>
