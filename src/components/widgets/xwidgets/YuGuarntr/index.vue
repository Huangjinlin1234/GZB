<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="保证人信息台账">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="80px" related-table-name="refTable">
        <yu-xform-group :column="2">
          <yu-xform-item label="保证编号" ctype="input" placeholder="保证编号" name="guarantyId"></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarantyIdNew"></yu-xform-item>
          <yu-xform-item label="保证人客户编号" ctype="input" placeholder="保证人客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="保证人名称" ctype="input" placeholder="保证人名称" fuzzy-query="both" name="assureName"></yu-xform-item>
          <yu-xform-item label="保证人证件类型" ctype="select" placeholder="保证人证件类型" name="cerType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="保证人证件号码" ctype="input" placeholder="保证人证件号码" name="assureCertCode"></yu-xform-item>
          <yu-xform-item label="保证方式 " ctype="select" placeholder="保证方式" name="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xform-item>
        </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" request-type="POST">
          <yu-xtable-column label="保证编号" prop="guarantyId"></yu-xtable-column>
          <yu-xtable-column label="押品统一编号" prop="guarantyIdNew"></yu-xtable-column>
          <yu-xtable-column label="保证人客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
          <yu-xtable-column label="保证方式 " prop="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xtable-column>
          <yu-xtable-column label="保证人类型" prop="cusTyp" data-code="STD_ASSURE_CUS_TYPE"></yu-xtable-column>
          <yu-xtable-column label="保证人证件类型 " prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
          <yu-xtable-column label="担保金额" prop="guarAmt" :formatter="Currency"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuGuarntr',
  componentName: 'YuGuarntr',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/guarguarantee/queryList',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusId',
      baseParams: {},
    };
  },

  created () {
    var _this = this;
    let loginUser = _this.$xutils.getLoginUserInfo();
    this.baseParams = {
      condition: JSON.stringify({ managerId: loginUser.loginCode })
    };
  },

};
</script>
