<template>
  <div>
    <yu-panel title="业务申请列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xproduct" placeholder="产品编号" name="prdId"  @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')"  v-if="checkCtrl('doAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_doUpdate" @click="customClick('doUpdate')"  v-if="checkCtrl('doUpdate')">修改</yu-button>
          <yu-button type="primary" ref="btn_doDelete" @click="customClick('doDelete')"  v-if="checkCtrl('doDelete')">删除</yu-button>
          <yu-button type="primary" ref="btn_cancellation" @click="customClick('cancellation')"  v-if="checkCtrl('cancellation')">作废</yu-button>
          <yu-button type="primary" ref="btn_doView" @click="customClick('doView')"  v-if="checkCtrl('doView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number  :default-sort="{prop:'iqpSerno',order:'descending'}" request-type="POST" condition-key="condition" selection-type="radio"  :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true" >
        <yu-xtable-column label="业务流水号" prop="iqpSerno" sortable></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="主担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
         <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="申请币种" prop="appCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" hide-column ></yu-xtable-column>
        <yu-xtable-column label="渠道来源" prop="chnlSour" hide-column ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_ZB_APPR_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {
        belgLine: '02',
        applyExistsStatus: '000,111,992',
        oprType: '01'
      }},
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqploanapp/selectbymodel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqploanapp/delete/'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /* 业务申请-单笔单批业务申请 首页*/

    AfterInit () {
      // this.searchData['inputId'] = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      // this.searchData['oprType'] = '01';
      // this.searchData['approveStatus'] = '000';
    }
  }
};
</script>