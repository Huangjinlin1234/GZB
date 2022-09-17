<template>
  <div>
    <yu-panel title="保证人列表" panel-type="simple">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="80px" related-table-name="refTable">
        <yu-xform-group :column="2">
          <yu-xform-item label="保证编号" ctype="input" placeholder="保证编号" name="guarantyId"></yu-xform-item>
          <yu-xform-item label="保证人客户编号" ctype="input" placeholder="保证人客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="保证人名称" ctype="input" placeholder="保证人名称" fuzzy-query="both" name="assureName"></yu-xform-item>
          <yu-xform-item label="保证人证件类型" ctype="select" placeholder="保证人证件类型" name="cerType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="保证人证件号码" ctype="input" placeholder="保证人证件号码" name="assureCertCode"></yu-xform-item>
          <yu-xform-item label="保证担保形式 " ctype="select" placeholder="保证担保形式" name="guarantyType" data-code="STD_ZB_GUARANTY_TYPE"></yu-xform-item>
          <!--<yu-xform-item label="保证方式" ctype="select" placeholder="保证方式" name="assureWay" data-code="STD_ZB_GUARANTY_TYPE"></yu-xform-item>-->
        </yu-xform-group>
        </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_cfirmImport" @click="customClick('cfirmImport')">确定引入</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="保证流水号" prop="guarantyId" hide-column></yu-xtable-column>
        <yu-xtable-column label="押品统一编号" prop="guarantyIdNew"></yu-xtable-column>
        <yu-xtable-column label="保证担保形式" prop="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xtable-column>
        <yu-xtable-column label="保证人客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型" prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="担保金额(元)" prop="guarAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUARANTEE_TY,STD_ZB_CERT_TYP');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'guarantyId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: '',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/'
    };
  },

  created () {
    var data = this.pageParams;
    if (data.isUnderLmt == 1) {
      this.dataUrl = this.$backend.cmisBiz + '/api/guarguarantee/queryGuarGuaranteeIsUnderLmt';
      // 是否授信项下为是时，展示授信分项下挂的保证人
      this.baseParams = {condition: {
        serno: data.iserno,
        oprType: '01',
        lmtAccNo: data.lmtAccNo, // 授信额度编号
      }};
    } else {
      // 是否授信项下为否时，展示所有的保证人
      this.dataUrl = this.$backend.cmisBiz + '/api/guarguarantee/queryList';
      this.baseParams = {condition: {
        // oprType: '01'
      }};
    }
  }
};
</script>
