<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>公司信息</el-breadcrumb-item>
				<el-breadcrumb-item>全部公司</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box">
			<el-input v-model="name" placeholder="输入公司名称" class="handle-input mr10"></el-input>
			<el-input v-model="code" placeholder="输入公司编码" class="handle-input mr10"></el-input>
			<el-button type="primary" icon="search" @click="search">搜索</el-button>
		</div>
		<el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="name" label="公司名称" width="120">
			</el-table-column>
			<el-table-column prop="code" label="公司编码">
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
	import { getSite, delSite } from '../../service/getData'

	export default {
		data() {
			return {
				siteData: [],
				name: '',
				curPage: 1,
				pageSize: 10, //每一页的数量
				total: 0,
				code: ''
			}
		},
		computed: {
			data() {//分页
				let start = 0;
				if(this.total > this.pageSize) {
					start = this.pageSize * this.curPage - 1;
				}
				let end = start + this.pageSize;
				return this.siteData.slice(start, end);
			}
		},
		created() {
			this.getData();
		},
		methods: {
			handleCurrentChange(val) {
				this.curPage = val;
			},
			getData() {
				let self = this;
				getSite(self.name).then(res => {
					if(res.isSuccess) {
						self.siteData = res.result;
						self.total = res.result.length;
					}
				})
			},
			search() {
				this.getData();
			},
			handleEdit(row) {
				this.$router.push('/updatesite/' + row.id);
			},
			handleDelete(index, row, rows) {
				let self = this;
				delSite(row.id).then(res => {
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
</style>