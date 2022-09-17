<template>
  <div>
    <yu-panel title="苏州地方企业征信查询" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" related-table-name="refTable">
        <yu-xform-group :column="2">
          <yu-xform-item label="征信查询对象名称" ctype="input" placeholder="征信查询对象名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="查询对象证件号码" ctype="input" placeholder="查询对象证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="开始时间" ctype="datepicker" placeholder="开始时间" name="startTime"></yu-xform-item>
          <yu-xform-item label="结束时间" ctype="datepicker" placeholder="结束时间" name="endTime"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doInsect" v-if="checkCtrl('add')" @click="customClick('doInsect')">新增</yu-button>
        <yu-button type="primary" ref="btn_doUpdate"  v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
        <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_doCreditReportView" v-if="checkCtrl('report')" @click="customClick('doCreditReportView')">查看征信报告</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="POST">
        <yu-xtable-column label="征信查询对象名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="查询对象证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="征信查询原因" prop="qryResn" :options="dicOptions.qryResnOptions"></yu-xtable-column>
        <yu-xtable-column label="查询对象证件类型" prop="certType" :options="dicOptions.certTypeOptions"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="成功发起时间" prop="sendTime"></yu-xtable-column>
        <yu-xtable-column label="报告生成时间" prop="reportCreateTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './creditSZReportQryInfoList_dialog_BillCard';
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default{
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'crqlSerno',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions: [{key: '1', value: '贷前'}, {key: '2', value: '贷中'}, {key: '3', value: '贷后'}, {key: '4', value: '关联查询'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], certTypeOptions: [{key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}], authbookContentOptions: [{key: '001', value: '审核本单位信贷业务申请'}, {key: '002', value: '审批本单位信贷业务'}, {key: '003', value: '审核本单位作为担保人'}, {key: '004', value: '对授权人已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '涉及本单位的关联人的信贷业务或担保业务，需要查询本单位信用状况'}, {key: '006', value: '处理本单位的征信异议'}, {key: '007', value: '其他支行认为需要查询本单位的信用状况'}, {key: '008', value: '受理企业信用等级评定'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/',
      baseParams: {'condition': {'qryCls': '3'}, 'sort': 'isnull(approve_status),field(approve_status,000,992,111,997,993,996,998,991),if(isnull(report_create_time),0,1),report_create_time desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/delete/'
    };
  }
};
</script>
