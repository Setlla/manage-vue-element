<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>快递员信息</el-breadcrumb-item>
				<el-breadcrumb-item>全部快递员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box">
			<el-input v-model="name" placeholder="输入快递员姓名" class="handle-input mr10"></el-input>
			<el-select v-model="siteID" placeholder="请选择">
				<el-option v-for="item in siteData"  :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<el-button type="primary" icon="search" @click="search">搜索</el-button>
		</div>
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
			<el-table-column prop="siteID" label="所属站点">
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
				courierData: [],
				siteData: [],
				name: '',
				siteID: '',
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
				getSite().then(res => {
					if(res.isSuccess) {
						self.siteData = res.result;
					}
				})
			},
			getData() {
				let self = this;
				getCourier(self.name).then(res => {
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
			}
		}
	}
</script>

<style>
	.handle-box {
		margin-bottom: 20px;
	}
	
	.handle-select {
		width: 120px;
	}
	
	.handle-input {
		width: 300px;
		display: inline-block;
	}
	.cell{
		text-align: center;
	}
</style>