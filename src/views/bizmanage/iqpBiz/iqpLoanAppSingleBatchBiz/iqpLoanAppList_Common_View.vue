<template>
  <div>
    <yu-panel title="共同借款人">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')" :hidden="viewflag">引入共同借款人</yu-button>
          <yu-button type="primary" ref="btn_doUpdate" @click="customClick('doUpdate')" :hidden="viewflag">修改</yu-button>
          <yu-button type="primary" ref="btn_doDelete" @click="customClick('doDelete')" :hidden="viewflag">删除</yu-button>
          <yu-button type="primary" ref="btn_doView" @click="customClick('doView')" :hidden="viewflag">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" :default-sort="{prop:'cusId',order:'descending'}"  row-number request-type="POST" condition-key="condition" selection-type="radio"  :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true" >
        <yu-xtable-column label="客户编号" prop="cusId" sortable></yu-xtable-column>
        <yu-xtable-column label="姓名" prop="commonDebitName"></yu-xtable-column>
        <yu-xtable-column label="性别" prop="commonDebitSex" width="100" data-code="STD_ZB_SEX"></yu-xtable-column>
        <yu-xtable-column label="婚姻状况" prop="commonDebitMarStatus" data-code="STD_ZB_MAR_ST"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="commonDebitCertCode" data-code="STD_ZB_ASSURE_MEANS"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="commonDebitCertType" width="100" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="工作单位" prop="commonDebitCprt"></yu-xtable-column>
        <yu-xtable-column label="手机号码" prop="commonDebitPhone"></yu-xtable-column>
        <yu-xtable-column label="与借款人关系" prop="commonDebitCorre" data-code="STD_ZB_SELFPER_REL_TYP" ></yu-xtable-column>
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_SELFPER_REL_TYP,STD_ZB_MAR_ST,STD_ZB_ASSURE_MEANS,STD_ZB_CERT_TYP,STD_ZB_SEX');
export default{
  props: {
    pageParams: Object,
    dialogId: String,
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      iqpSerno: '',
      params: {},
      searchData: {condition: {
        surveySerno: this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.meta.params.iqpSerno : this.node.iqpSerno
      }},
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/querybycondition',
      baseParams: {},
      viewflag: false,
      deleteUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/delete/'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      this.iqpSerno = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.meta.params.iqpSerno : this.node.iqpSerno;
      var op = this.$route.params.hasOwnProperty('op') ? _this.$route.meta.params.op : 'VIEW';
      if (op != 'EDIT') {
        this.viewflag = true;
      }
      this.params['iqp_Serno'] = this.iqpSerno;
    }


  }
};
</script>