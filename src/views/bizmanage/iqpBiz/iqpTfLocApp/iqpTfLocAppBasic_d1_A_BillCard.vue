<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2" :hideFilter="false" :collapseHide="false">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_ZB_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled>
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewCusDataByCusId')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="showHelper()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" :disabled="isCurTypeDisabled" @change="getCurTypeRate"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="num" name="contAmt" rules="required" placeholder="合同金额" :min="0" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="input" placeholder="汇率" name="exchangeRate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="num" name="cvtCnyAmt" rules="required" placeholder="折算人民币金额" :min="0" @blur="amtChange" disabled></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="num" name="contHighAvlAmt" rules="required" placeholder="本合同项下最高可用信金额" :min="0" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日"  @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日"  @change="termChange"></yu-xform-item>
            <yu-xform-item label="贸易合同号" ctype="input" placeholder="贸易合同号" name="tcontNo" rules="required"></yu-xform-item>
            <yu-xform-item label="溢装比例" ctype="yu-num" sign="%" :multiple="100" placeholder="溢装比例" name="floodactPerc" rules="required"></yu-xform-item>
            <yu-xform-item label="货物名称" ctype="input" placeholder="货物名称" name="goodsName"></yu-xform-item>
            <yu-xform-item label="受益人名称" ctype="input" placeholder="受益人名称" name="beneficiarName" rules="required"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" sign="%" :multiple="100" name="bailPerc" rules="required" placeholder="保证金比例"></yu-xform-item>
            <yu-xform-item label="手续费率（‰）" ctype="yu-num" sign="‰" :multiple="1000" name="chrgRate" rules="required" placeholder="手续费率（‰）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_ZB_CONT_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqptflocapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqptflocapp/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isCurTypeDisabled: false,
      prdCode: '',
      isShow: false
    };
  },
  methods: {
    termChange (value) { // 校验合同期限
      let startDate = this.getTime(this.formdata.startDate);
      let endDate = this.getTime(this.formdata.endDate);

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.startDate = '';
        this.formdata.endDate = '';
        return;
      }
    },
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },

    // 根据币种得到对应的汇率
    getCurTypeRate: function (value) {
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        let rqData = {};
        rqData['curType'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.exchangeRate = response.data.rate;
              this.formdata.cvtCnyAmt = parseFloat(this.formdata.contHighAvlAmt) * this.formdata.exchangeRate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.contAmt = '';
              this.formdata.cvtCnyAmt = '';
              this.formdata.contHighAvlAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.contAmt = '';
            this.formdata.cvtCnyAmt = '';
            this.formdata.contHighAvlAmt = '';
            return;
          }
        });
      }
    },
    // 展示小助手
    showHelper () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    amtChange (value) {
      var _this = this;
      let contAmt = _this.$refs.refForm.formdata.contAmt;
      let contHighAvlAmt = _this.$refs.refForm.formdata.contHighAvlAmt;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      if (parseFloat(contAmt) < parseFloat(contHighAvlAmt)) {
        _this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        _this.formdata.contHighAvlAmt = '';
      }
      _this.formdata.cvtCnyAmt = parseFloat(contHighAvlAmt) * _this.formdata.exchangeRate;
    },

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