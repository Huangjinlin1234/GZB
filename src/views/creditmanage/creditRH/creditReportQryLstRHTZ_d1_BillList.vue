<template>
  <div>
    <yu-panel title="人行征信查询台账" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" :custom-search-fn="customSearch" :custom-reset-fn="resetFn">
        <yu-xform-group :column="4">
          <yu-xform-item label="开始时间" ctype="datepicker" placeholder="开始时间" name="startTime" ></yu-xform-item>
          <yu-xform-item label="结束时间" ctype="datepicker" placeholder="结束时间" name="endTime" ></yu-xform-item>
          <yu-xform-item label="是否成功发起" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否成功发起" name="isSuccssInit" ></yu-xform-item>
          <yu-xform-item label="征信查询类别" ctype="select" :options="dicOptions.qryClsOptions" placeholder="征信查询类别" name="qryCls" ></yu-xform-item>
          <yu-xform-item label="所在机构" ctype="yu-xorg" placeholder="所在机构" name="orgName"  @select-fn="commonSelectFn" :mapping="{'orgName':'orgName','orgCode':'managerBrId'}" width="880" height="680" ></yu-xform-item>
          <yu-xform-item label="征信查询对象名称" ctype="input" placeholder="征信查询对象名称" name="cusName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yufp-excel-export type="primary" v-show="excelExport"  v-if="checkCtrl('export')" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}"></yufp-excel-export>
        <yu-button type="primary" v-show="!excelExport" @click="excelExportfake">导出</yu-button>
        <yu-button type="primary" ref="btn_doReportViewRecord" v-if="checkCtrl('report')" @click="customClick('doReportViewRecord')">征信报告查看记录</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :parse-response="requestSuccess" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="POST">
        <yu-xtable-column label="征信查询流水号" prop="crqlSerno"></yu-xtable-column>
        <yu-xtable-column label="征信查询对象名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="征信查询类别" prop="qryCls" :options="dicOptions.qryClsOptions"></yu-xtable-column>
        <yu-xtable-column label="征信查询原因" prop="qryResn" :options="dicOptions.qryResnOptions"></yu-xtable-column>
        <yu-xtable-column label="与主借款人关系" prop="borrowRel" :options="dicOptions.borrowRelOptions"></yu-xtable-column>
        <yu-xtable-column label="客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所在机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="授权书日期" prop="authbookDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="是否成功发起" prop="isSuccssInit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="报告生成时间" prop="reportCreateTime"></yu-xtable-column>
        <yu-xtable-column label="发起方式" prop="qryFlag" :options="dicOptions.qryFlagOptions"></yu-xtable-column>
        <yu-xtable-column label="报告来源">
          <template slot-scope="scope">
            <span >{{ scope.row.qryCls == '3' ? '本地' : '人行' }}</span>
          </template>
        </yu-xtable-column>
        <!-- <yu-xtable-column label="关联业务流水号" prop="bizSerno"></yu-xtable-column> -->
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  components: { YufpExcelExport },
  data: function () {
    return {
      pkField: 'crqlSerno',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}], qryResnOptions: [{key: '02', value: '贷款审批'}, {key: '08', value: '担保资格审查'}, {key: '22', value: '法人代表，出资人及关联人等资信查询'}, {key: '25', value: '资信审查'}, {key: '27', value: '贷后管理'}, {key: '17', value: '额度审批'}, {key: '01', value: '贷前审查'}, {key: '04', value: '其他原因'}, {key: '05', value: '关联查询'}, {key: '18', value: '担保审查'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}, {key: '003', value: '关联人'}], certTypeOptions: [{key: '1', value: '户口簿'}, {key: '2', value: '护照'}, {key: '5', value: '港澳居民来往内地通行证'}, {key: '6', value: '台湾同胞来往内地通行证'}, {key: '8', value: '外国人居留证'}, {key: '9', value: '警官证'}, {key: 'A', value: '香港身份证'}, {key: 'B', value: '澳门身份证'}, {key: 'C', value: '台湾身份证'}, {key: 'X', value: '其他证件'}, {key: '10', value: '居民身份证及其他以公民身份证号为标识的证件'}, {key: '20', value: '军人身份证件'}], authbookContentOptions: [{key: '001', value: '审核本人贷款申请'}, {key: '002', value: '审批本人贷记卡'}, {key: '003', value: '审核本人作为担保人'}, {key: '004', value: '对已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '受理法人或其他组织的贷款申请或其作为担保人，需要查询本人作为法定代表人、出资人及关联人信用情况'}, {key: '006', value: '对公业务贷后管理需要查询本人作为法定代表人、出资人及关联人信用状况'}, {key: '007', value: '特约商户实名审查'}, {key: '008', value: '处理本人的征信异议'}, {key: '009', value: '其他支行认为需要查询本人的信用状况'}, {key: '010', value: '资信审查'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}, {key: '03', value: '自动化贷后征信查询'}, {key: '04', value: '信用卡发起'}, {key: '05', value: '移动OA'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/getCreditInfo',
      baseParams: {condition: JSON.stringify({ qryStatus: '003'})},
      searchFormdata: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/delete/',
      excelExportUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/asyncExportCreditList',
      excelExport: true,
      totalData: ''
    };
  },
  watch: {
    // 监听totalData变化
    totalData: function (val) {
      if (val > 5000) {
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
      this.$xutils.showMsgBox('提示', '导出数据不能超过5000条,请增加查询条件！');
    }
  }
};
</script>
