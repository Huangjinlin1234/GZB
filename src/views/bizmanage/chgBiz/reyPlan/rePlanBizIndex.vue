<template>
  <div>
    <yu-panel title="还款计划变更申请">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" exclude-key="111,997,998"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="addFn">新增</yu-button>
          <yu-button ref="btn_editFn" @click="editFn">修改</yu-button>
          <yu-button ref="btn_doDel" @click="doDel">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="220"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="200.00"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/**
 * 业务变更/还款计划变更/列表页面
 */

// 修改界面路径
const detailPage = '/yuxp/product/pages/bizmanage/chgBiz/reyPlan/rePlanUpdate.js';
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqprepayplanchg/',
      baseParams: {condition: {oprType: '01', approveStatusList: '000,990,991,992'}}
    };
  },
  methods: {
    // 新增
    addFn () {
      const params = {
        detailPage: detailPage
      };
      this.$dialog.open(
        '还款计划变更新增',
        'bizmanage/chgBiz/reyPlan/rePlanAddIndex',
        400,
        200,
        params,
        null
      );
    },
    // 修改
    editFn () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      let model = yufp.clone(jsoPar, {});
      model['model_group_no'] = 'CMG000031';// 合作方额度申请模板
      model['op'] = 'EDIT';
      this.$dialog.open(
        '还款计划变更修改页面',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        '1200',
        '800',
        model,
        null,
        true,
        true
      );
    },
    // 删除
    doDel () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      const approveStatus = jsoPar.approve_status;
      if (approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '仅【待发起】的放款申请可以删除!');
        return;
      }
      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    },
    // 查看
    doView () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      let model = yufp.clone(jsoPar, {});
      model['model_group_no'] = 'CMG000031';
      model['op'] = 'VIEW';
      model['opType'] = 'view';
      this.$dialog.open(
        '还款计划变更申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        model
      );
    },
    // 修改后列表回调函数，实现列表数据自动刷新
    doCallQuery () {
      this.$refs.refTable.remoteData();
    },
    // 刷新页面数据
    refreshBillListData () {
      this.$refs.refTable.remoteData();
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
