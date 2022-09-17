
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="汇总信息" is-collapse :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata">
        <yu-xform-group>
          <yu-xform-item label="存量授信额度合计" ctype="input" name="lmtAmtTotal" disabled></yu-xform-item>
          <yu-xform-item label="余额合计" ctype="input" name="balanceTotal" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="明细信息" is-collapse :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" row-number request-type="POST" :data-url="dataUrl" :base-params="searchData" condition-key="condition">
        <yu-xtable-column label="存量授信额度" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="balance"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP');

export default {
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      expandCollapseName: ['base'],
      baseFormdata: {},
      lmtData: {},

      searchData: {condition: {iqpSerno: this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.meta.params.iqpSerno : this.node.iqpSerno
      }},

      dataUrl: this.$backend.cmisBiz + '/api/iqpstockloaninfo/selectbyiqpserno'

    };
  },
  mounted () {
    var _this = this;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpstockloaninfo/selectLmtAmtTotal',
      data: {iqpSerno: _this.getFactory().contextData.iqpSerno},
      callback: function (code, message, response) {
        _this.baseFormdata.lmtAmtTotal = response.data.lmtAmtTotal || '0';
        _this.baseFormdata.balanceTotal = response.data.balanceTotal || '0';
      }
    });
  }
};
</script>
