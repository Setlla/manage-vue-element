<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>站点信息</el-breadcrumb-item>
				<el-breadcrumb-item>全部站点</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="handle-box">
			<el-input v-model="name" placeholder="输入站点名称" class="handle-input mr10"></el-input>
			<el-button type="primary" icon="search" @click="search">搜索</el-button>
		</div>
		<el-table :data="data" border @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column v-for="(value, key) in formHeader" :prop="key" :label="value" >
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
				formHeader: {
					name: '名称',
					address: '地址',
					territory: '负责区域',
					contactName: '负责人姓名',
					contactNickname: '负责人别称',
					contactPhone: '负责人电话',
					contactWechat: '负责人微信',
					contactHometown: '负责人家乡',
					remarks: '备注'
				}
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
						localStorage.setItem('siteData', JSON.stringify(res.result));
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
						self.getData();
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