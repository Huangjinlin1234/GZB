<template>
  <div>
    <yu-panel title="小微无还本续贷名单" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <!-- <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certNo"></yu-xform-item>
          <yu-xform-item label="联系方式" ctype="input" placeholder="联系方式" name="linkMode"></yu-xform-item> -->
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="状态" name="status" clearable></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
          <yu-button type="primary" ref="btn_insert" v-if="checkCtrl('add')" @click="customClick('insert')">新增</yu-button>
          <yu-button type="primary" ref="btn_modify" v-if="checkCtrl('modify')" @click="customClick('modify')">修改</yu-button>
          <yu-button type="primary" ref="btn_delete" v-if="checkCtrl('delete')" @click="customClick('delete')">删除</yu-button>
          <yu-button type="primary" ref="btn_stop" v-if="checkCtrl('stop')" @click="customClick('stop')">停用</yu-button>
          <yu-button type="primary" ref="btn_start" v-if="checkCtrl('start')" @click="customClick('start')">启用</yu-button>
          <yu-button type="primary" ref="btn_credit" v-if="checkCtrl('credit')" @click="customClick('credit')">预授信</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="post" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="流水号" prop="serno" width="100px"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="100px"></yu-xtable-column>
        <yu-xtable-column label="联系方式" prop="linkMode"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <!-- <yu-xtable-column label="借据产品" prop="billPrd"></yu-xtable-column> -->
        <yu-xtable-column label="借据金额" prop="billAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="借据余额" prop="billBal" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="借据起始日" prop="billStartDate"></yu-xtable-column>
        <yu-xtable-column label="借据到期日" prop="billEndDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="名单归属" prop="listBelg"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS"></yu-xtable-column>
        <yu-xtable-column label="办理状态" prop="applyStatus" data-code="STD_WHD_APPLY_TYPE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_ZB_STATUS,STD_ZB_CERT_TYP,STD_WHD_APPLY_TYPE');
export default{
  name: 'D1BillList',
  mixins: [mixinList, mixin],
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  data: function () {
    return {
      pkField: 'billNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/cuslstmclwhbxd/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/cuslstmclwhbxd/delete/'
    };
  }
};
</script>
