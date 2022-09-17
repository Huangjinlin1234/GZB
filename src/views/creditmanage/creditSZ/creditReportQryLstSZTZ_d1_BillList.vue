<template>
  <div>
    <yu-panel title="苏州地方征信查询台账" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" :custom-search-fn="customSearch" :custom-reset-fn="resetFn">
        <yu-xform-group :column="4">
          <yu-xform-item label="开始时间" ctype="datepicker" placeholder="开始时间" name="startTime" ></yu-xform-item>
          <yu-xform-item label="结束时间" ctype="datepicker" placeholder="结束时间" name="endTime" ></yu-xform-item>
          <yu-xform-item label="征信查询对象名称" ctype="input" placeholder="征信查询对象名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="所在机构" ctype="yu-xorg" placeholder="所在机构" name="orgName"  @select-fn="commonSelectFn" :mapping="{'orgName':'orgName','orgCode':'managerBrId'}" width="880" height="680" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yufp-excel-export type="primary" v-show="excelExport"  v-if="checkCtrl('export')"  :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}"></yufp-excel-export>
        <yu-button type="primary" v-show="!excelExport" @click="excelExportfake">导出</yu-button>
        <yu-button type="primary" ref="btn_doReportViewRecord" v-if="checkCtrl('report')" @click="customClick('doReportViewRecord')">征信报告查看记录</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :parse-response="requestSuccess" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="POST">
        <yu-xtable-column label="征信查询流水号" prop="crqlSerno"></yu-xtable-column>
        <yu-xtable-column label="征信查询对象名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="征信查询原因" prop="qryResn" :options="dicOptions.qryResnOptions"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所在机构" prop="managerBrIdName" width="180"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="报告生成时间" prop="reportCreateTime"></yu-xtable-column>
        <!-- <yu-xtable-column label="关联业务流水号" prop="bizSerno"></yu-xtable-column> -->
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  components: { YufpExcelExport },
  data: function () {
    return {
      pkField: 'crqlSerno',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions: [{key: '1', value: '贷前'}, {key: '2', value: '贷中'}, {key: '3', value: '贷后'}, {key: '4', value: '关联查询'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], certTypeOptions: [{key: '1', value: '户口簿'}, {key: '2', value: '护照'}, {key: '5', value: '港澳居民来往内地通行证'}, {key: '6', value: '台湾同胞来往内地通行证'}, {key: '8', value: '外国人居留证'}, {key: '9', value: '警官证'}, {key: 'A', value: '香港身份证'}, {key: 'B', value: '澳门身份证'}, {key: 'C', value: '台湾身份证'}, {key: 'X', value: '其他证件'}, {key: '10', value: '居民身份证及其他以公民身份证号为标识的证件'}, {key: '20', value: '军人身份证件'}], authbookContentOptions: [{key: '001', value: '审核本单位信贷业务申请'}, {key: '002', value: '审批本单位信贷业务'}, {key: '003', value: '审核本单位作为担保人'}, {key: '004', value: '对授权人已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '涉及本单位的关联人的信贷业务或担保业务，需要查询本单位信用状况'}, {key: '006', value: '处理本单位的征信异议'}, {key: '007', value: '其他支行认为需要查询本单位的信用状况'}, {key: '008', value: '受理企业信用等级评定'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}, {key: '03', value: '自动化贷后征信查询'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/getCreditInfo',
      baseParams: {condition: JSON.stringify({qryCls: '3', qryStatus: '003'})},
      searchFormdata: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/delete/',
      excelExportUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/asyncExportCreditListDZ',
      excelExport: true,
      totalData: ''
    };
  },
  watch: {
    // 监听totalData变化
    totalData: function (val) {
      if (val > 200) {
        this.excelExport = false;
      } else {
        this.excelExport = true;
      }
    }
  },
  methods: {
    // 自定义重置功能
    resetFn: function () {
      var _this = this;
      _this.value = null;
      _this.param = null;
      _this.$refs.refForm.resetFields();
      _this.customSearch();
    },
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      this.totalData = response.total;
    },
    excelExportfake () {
      this.$xutils.showMsgBox('提示', '导出数据过多,请缩小查询范围');
    }
  }
};
</script>
