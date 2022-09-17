<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="一级行业名称" ctype="yu-xdic-tree" rules="required" placeholder="一级行业名称" name="oneLevelTradeCode" @select-fn="commonSelectFn" width="480" height="480" :parms="topParam" :selectedVal="1" :selectionType="radio"
          :mapping="{'label':'oneLevelTradeName'}"></yu-xform-item>
          <yu-xform-item label="细分行业名称" ctype="input" placeholder="细分行业名称" name="detailsTradeCode" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="一级行业名称" ctype="input" placeholder="一级行业名称" name="oneLevelTradeName" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="细分行业名称" ctype="input" placeholder="细分行业名称" name="detailsTradeName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="经营规模" ctype="input" placeholder="经营规模" name="operScale" rules="required"></yu-xform-item>
          <yu-xform-item label="经营规模单位" ctype="input" placeholder="经营规模单位" name="operScaleUnit" rules="required"></yu-xform-item>
          <yu-xform-item label="年销售收入" ctype="yu-currency" name="yearSaleIncome" rules="required" placeholder="年销售收入"></yu-xform-item>
          <yu-xform-item label="年利润" ctype="yu-currency" name="yearProfit" rules="required" placeholder=" 年利润"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('bycancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    formType: {
      type: String,
      default: 'edit'
    }
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstyndjyxxapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstyndjyxxapp/',
      formdata: {},
      formRules: {
        yearSaleIncome: [{validator: validator.digit, message: '不是正确的小数', trigger: 'blur'}],
        yearProfit: [{validator: validator.digit, message: '不是正确的小数', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      topParam: { optType: 'STD_ZB_YN_TRADE', levels: '1', id: 'SZTC9999' },
      detailParams: { optType: 'STD_ZB_YN_TRADE' }
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    commonSelectFn: function (row, mapping) {
      debugger;
      var _this = this;
      this.formdata.detailsTradeCode = row.id;
      this.formdata.detailsTradeName = row.label;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCfg + '/api/adminsmtreedic/queryhighcfgtreebycode',
        data: {enName: row.id, optType: 'STD_ZB_YN_TRADE'},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.formdata.oneLevelTradeCode = response.data.enName;
            _this.formdata.oneLevelTradeName = response.data.cnName;
          } else {
            _this.$message({ message: response.erortx, type: 'warning' });
          }
        }
      });
    }
  }
};
</script>