<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-menu"></i>包裹信息</el-breadcrumb-item>
				<el-breadcrumb-item>全部包裹</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px">
			<el-form-item prop="number">
				<el-input v-model="searchForm.number" placeholder="输入快递单号"></el-input>
			</el-form-item>
			<el-form-item prop="customeName">
				<el-input v-model="searchForm.customeName" placeholder="输入客户姓名"></el-input>
			</el-form-item>
			<el-form-item prop="customerMPhone">
				<el-input v-model="searchForm.customerMPhone" placeholder="输入收件人手机号码"></el-input>
			</el-form-item>
			<el-form-item prop="state">
				<el-input v-model="searchForm.state" placeholder="输入包裹状态"></el-input>
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
			<el-form-item prop="startTime">
				<el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item prop="endTime">
				<el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间">
				</el-date-picker>
			</el-form-item>

			<el-button type="primary" icon="search" @click="search">搜索</el-button>
			<el-button @click="resetForm('searchForm')">清空</el-button>
		</el-form>
		<el-table :data="data" border style="width: 100%" ref="multipleTable" >
			<el-table-column v-for="(value, key) in formHeader" :prop="key" :label="value" >
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination @current-change="handleCurrentChange" :page-size='pageSize' layout="prev, pager, next" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { getSite, getExpress, getCourier } from '../../service/getData'

	export default {
		data() {
			return {
				searchForm: {
					number: '',
					customeName: '',
					customerMPhone: '',
					siteID: null,
					courierID: null,
					id: null,
					state: '',
					startTime: '',
					endTime: ''
				},
				expressData: [],
				siteData: [],
				courierData: [],
				curPage: 1,
				pageSize: 10, //每一页的数量
				total: 0,
				formHeader: {
					number: '单号',
					receiverName: '收件人姓名',
					customeName: '客户姓名',
					customerMPhone: '客户手机',
					courierName: '快递员姓名',
					siteName: '所属站点',
					companyName: '快递公司',
					remarks: '备注'
				}
			}
		},
		computed: {
			data() { //分页
				let start = 0;
				if(this.total > this.pageSize) {
					start = this.pageSize * (this.curPage - 1);
				}
				let end = start + this.pageSize;
				return this.expressData.slice(start, end);
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
				getExpress(self.searchForm).then(res => {
					if(res.isSuccess) {
						self.expressData = res.result;
						self.total = res.result.length;
					}
				})
			},
			search() {
				this.getData();
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.getData();
			}
		}
	}
</script>