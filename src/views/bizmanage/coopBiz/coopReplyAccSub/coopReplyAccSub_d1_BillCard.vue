<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="160px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" disabled hidden ></yu-xform-item>
          <yu-xform-item label="合作产品名称" ctype="input" name="coopPrdName" placeholder="合作产品名称" disabled  width="480" height="480" ></yu-xform-item>-->
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdTypeProp" :on-icon-click="selectCoopReplyAccSub" icon="search"></yu-xform-item>
          <yu-xform-item label="单个产品合作额度(元)" ctype="yu-num" number-formatter="0,000.00" name="singlePrdCoopLmt" placeholder="单个产品合作额度(元)"></yu-xform-item>
          <yu-xform-item label="单笔最低缴存金额(元)" ctype="yu-num" number-formatter="0,000.00" name="sigLowDepositAmt" placeholder="单笔最低缴存金额(元)"></yu-xform-item>
          <yu-xform-item label="保证金比例(%)" ctype="yu-num" name="bailPerc" placeholder="保证金比例(%)" :multiple="100"></yu-xform-item>
          <yu-xform-item label="本次签订金额" ctype="yu-num" name="signAmt" placeholder="本次签订金额" ></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden ></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden ></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden ></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden ></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden ></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('back')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_PRD_TYPE_PROP_COOP');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopreplyagrsub/update',
      addUrl: this.$backend.cmisBiz + '/api/coopreplyagrsub/',
      formdata: {},
      formType: 'edit',
      formRules: { }
    };
  },
  mounted () {
    
  },
  methods: {       
    // 引入批复台账-特殊限额控制信息
    selectCoopReplyAccSub () {
      var _this = this;
      let params = {};
      params['coopPlanNo'] = _this.formdata.coopPlanNo;
      this.$dialog.open('特殊限额信息', 'bizmanage/coopBiz/coopReplyAccSub/coopReplyAccSubSelectIndex', 1000, 600, params, function (rowData) {
        yufp.clone(rowData, _this.formdata);
      });
    }
  }
};
</script>
