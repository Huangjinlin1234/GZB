<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="协议编号" ctype="input" placeholder="协议编号" name="contNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="协议类型" ctype="select" placeholder="协议类型" name="discContType" disabled  data-code="STD_DISC_CONT_TYPE"></yu-xform-item>
          <!--<yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>-->
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCusDataByCusId" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <!--<yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled></yu-xform-item>-->
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewIqpDataBySerno" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
          <yu-xform-item label="票据种类" ctype="select" name="drftType" disabled data-code="STD_DRFT_TYPE" placeholder="票据种类"></yu-xform-item>
          <yu-xform-item label="是否电子票据" ctype="select" name="isEDrft" disabled placeholder="是否电子票据" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="买入类型" ctype="select" name="purType" disabled placeholder="买入类型" data-code="STD_PUR_TYPE"></yu-xform-item>
          <yu-xform-item label="贴现币种" ctype="select" name="discCurType" disabled placeholder="贴现币种" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="票面总金额" ctype="yu-currency" name="drftTotalAmt" disabled placeholder="票面总金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="贴现协议金额" ctype="yu-currency" name="contAmt" disabled placeholder="贴现协议金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" value-format="yyyy-MM-dd" rules="required" placeholder="纸质合同签订日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSign')">签订</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_DISC_CONT_TYPE,STD_DRFT_TYPE,STD_ZB_CUR_TYP,STD_PUR_TYPE,STD_ZB_YES_NO');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrdisccont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrdisccont/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false
    };
  },
  methods: {
    // 对公客户查看
    viewCusDataByCusId () {
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },

    // 对业务流号的查看
    viewIqpDataBySerno () {
      if (this.formdata.serno == null || this.formdata.serno == '') {
        this.$xutils.showMsgBox('提示', '业务流水号为空!');
        return;
      }
      let json = {};
      json['serno'] = this.formdata.serno;
      json['model_group_no'] = 'CMG000172';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      json['biz_serno'] = this.formdata.serno;
      json['biz_op'] = 'view';
      json['period'] = '02';
      json['bizLine'] = '03';
      json['busiType'] = '01';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        json
      );
    },
    show() {
      this.isShow = true;
    },
    hideNow() {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>