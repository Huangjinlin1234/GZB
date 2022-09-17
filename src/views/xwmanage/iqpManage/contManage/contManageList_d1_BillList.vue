<template>
  <div>
    <yu-panel title="合同管理">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doPrinting" @click="customClick('doPrinting')">合同打印</yu-button>
          <yu-button ref="btn_doSign" @click="customClick('doSign')">合同签订</yu-button>
          <yu-button ref="btn_doImage" @click="customClick('doImage')">影像上传</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
          <yu-button ref="btn_doReSign" @click="customClick('doReSign')">合同重签</yu-button>
          <yu-button ref="btn_doCancel" @click="customClick('doCancel')">合同注销</yu-button>
          <yu-button ref="btn_doCancelSignAppr" @click="customClick('doCancelSignAppr')">作废签章审批</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_CONT_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/ctrloancont/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/ctrloancont/delete/'
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
