<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="评级必要信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" rules="required" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="注册地行政区划" ctype="input" placeholder="注册地行政区划" name="regiAddr" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="行业分类" ctype="yu-xdic-tree" rules="required" placeholder="行业分类" name="tradeClass" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="注册登记地行政区划" ctype="yu-xdic-tree-addr" rules="required" placeholder="注册登记地行政区划" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :mapping="{'id':'regiAreaCode', 'label':'regiAddr'}" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="成立日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="成立日期" name="buildDate"></yu-xform-item>
            <yu-xform-item label="财务报表类型" ctype="select"  data-code="STD_ZB_FNC_TYP" placeholder="财务报表类型" name="finaReportType" disabled></yu-xform-item>
            <yu-xform-item label="是否新建企业" ctype="select"  data-code="STD_ZB_YES_NO" placeholder="是否新建企业" name="isNewBuildCorp" disabled></yu-xform-item>
            <yu-xform-item label="是否国控" ctype="select"  data-code="STD_ZB_YES_NO" placeholder="是否国控" name="isNatctl" disabled></yu-xform-item>
            <yu-xform-item label="国控层级" ctype="select"  data-code="STD_ZB_NATCTL_LEVEL" placeholder="国控层级" name="natctlLevel" disabled></yu-xform-item>
            <yu-xform-item label="是否钢贸企业" ctype="select"  data-code="STD_ZB_YES_NO" placeholder="是否钢贸企业" name="isSteelCus" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人证件类型" ctype="select" disabled data-code="STD_ZB_CERT_TYP" placeholder="主要实际控制人证件类型" name="mrgCertType"></yu-xform-item>
            <yu-xform-item label="主要实际控制人证件号码" ctype="input" placeholder="主要实际控制人证件号码" name="mrgCertCode" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人是否常住本地" ctype="select" disabled data-code="STD_ZB_YES_NO" placeholder="主要实际控制人是否常住本地" name="mgrIsPermanent"></yu-xform-item>
            <yu-xform-item label="主要实际控制人本地居住年限" ctype="input" placeholder="主要实际控制人本地居住年限" name="mgrLiveAge" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人从业日期" ctype="input" placeholder="主要实际控制人从业日期" name="fjobDate" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人个人净资产" ctype="input" placeholder="主要实际控制人个人净资产" name="indivNas" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人最高学历" ctype="input" placeholder="主要实际控制人最高学历" name="mrgEdt" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSave">保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO, STD_ZB_NATCTL_LEVEL, STD_ZB_FNC_TYP');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      finOptions: []
    };
  },
  props: {
    cusCorp: Object,
    dialogId: String
  },
  mounted () {
    this.afterInit();
    // this.getFinOptions();
    var _this = this;
    _this.formdata.cusId = _this.$route.meta.params.cusId;
    yufp.service.request({
      method: 'GET',
      url: `${backend.cmisCus}/api/cusbase/${_this.$route.meta.params.cusId}`,
      callback: function (code, message, response) {
        _this.formdata.certType = response.data.certType;
        _this.formdata.certCode = response.data.certCode;
        _this.formdata.cusName = response.data.cusName;
      }
    });
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.afterInit();
    }
  },
  methods: {
    // 评级必要信息
    afterInit () {
      var _this = this;
      if (_this.cusCorp) {
        _this.formdata.certType = _this.cusCorp.certType;
        _this.formdata.certCode = _this.cusCorp.certCode;
        _this.formdata.cusType = _this.cusCorp.cusType;
        _this.formdata.cusName = _this.cusCorp.cusName;
        _this.formdata.tradeClass = _this.cusCorp.tradeClass;
        _this.formdata.regiAreaCode = _this.cusCorp.regiAreaCode;
        _this.formdata.buildDate = _this.cusCorp.buildDate;
        _this.formdata.isNatctl = _this.cusCorp.isNatctl;
        _this.formdata.natctlLevel = _this.cusCorp.natctlLevel;
        _this.formdata.finaReportType = _this.cusCorp.finaReportType;
        _this.formdata.isNewBuildCorp = _this.cusCorp.isNewBuildCorp;
        _this.formdata.isSteelCus = _this.cusCorp.isSteelCus;
      }
    },

    onSave () {
      this.updateBillCardData();
    }

    /**
         * 获取财报类型option
         */
    // getFinOptions: function () {
    //   var _this = this;
    //   yufp.service.request({
    //     method: 'GET',
    //     url: this.$backend.cmisCus + '/api/nrcs-cms/fncconftemplate/q/fncconftemplate/all/list',
    //     callback: function (code, message, response) {
    //       if (response.code == '0') {
    //         _this.finOptions = [];
    //         response.data.forEach(function (item) {
    //           _this.finOptions.push({
    //             key: item.fncId,
    //             value: item.fncName
    //           });
    //         });
    //       } else {
    //         this.$message({message: response.message, type: 'error'});
    //       }
    //     }
    //   });
    // }
  }
};
</script>