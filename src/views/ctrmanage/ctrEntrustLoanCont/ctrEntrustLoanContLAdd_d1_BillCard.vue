<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="主合同信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled required></yu-xform-item>
            <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="contCnNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" name="contType" disabled data-code="STD_CONT_TYPE"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled colspan="24"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" placeholder="担保方式" name="guarMode" data-code="STD_ZB_GUAR_WAY" disabled></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" disabled></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt" disabled></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="input" placeholder="本合同项下最高可用信金额" name="contHighAvlAmt" disabled></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="input" placeholder="合同起始日" name="startDate" disabled></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="input" placeholder="合同到期日" name="endDate" disabled></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" disabled autofocus unit="月"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" value-format="yyyy-MM-dd" placeholder="纸质合同签订日期" required></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <!--担保合同信息-->
      <yu-panel title="担保合同信息" padding-top :collapseHide="false" v-show="guarModeSign">
        <yu-xtable ref="refDealTable" row-number :base-params="tableParams" :data-url="tableUrl" request-type="POST" condition-key="condition">
            <yu-xtable-column label="担保合同编号" prop="guarContNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同类型" prop="guarContType" width:="120" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_GUAR_WAY" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同金额" prop="guarAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保起始日" prop="guarStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保到期日" prop="guarEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同状态" prop="guarContState" width:="120" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
            <yu-xtable-column label="纸质合同签订日期" prop="signDate" ctype="datepicker" width:="120"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrentrustloancont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrentrustloancont/',
      // showList: true,
      guarModeSign: true,
      tableParams: {contNo: this.pageParams.contNo},
      tableUrl: backend.cmisBiz + '/api/grtguarbizrstrel/querygrtguarcontbyparams',
      formdata: {},
      formType: 'edit',
      formRules: {},
      bizType: '01',
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false
    };
  },

  mounted: function () {
    let _this = this;
    let guarMode = _this.pageParams.guarMode;
    if (guarMode == '00') {
      _this.guarModeSign = false;
    }
  },

  methods: {
    show () {
      this.isShow = true;
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
