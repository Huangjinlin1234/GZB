<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform
        ref="refForm"
        label-width="200px"
        :form-type="formType"
        v-model="formdata"
        :rules="formRules"
        :form-change="triggerEditChangeEvent"
      >
        <yu-xform-group :column="2">
          <yu-xform-item
            label="业务流水号"
            ctype="input"
            placeholder="业务流水号"
            name="serno"
            rules="required"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="押品统一编号"
            ctype="input"
            placeholder="押品统一编号"
            name="guarNo"
            rules="required"
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="不动产权证号"
            ctype="input"
            placeholder="不动产权证号"
            name="bdcCrno"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="使用权权证号"
            ctype="input"
            placeholder="使用权权证号"
            name="useNo"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="使用权抵押登记证号"
            ctype="input"
            placeholder="使用权抵押登记证号"
            name="useCertNo"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="使用权登记机关"
            ctype="input"
            placeholder="使用权登记机关"
            name="useCertOffice"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="使用权取得日期"
            ctype="input"
            placeholder="使用权取得日期"
            name="useCertBeginDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="使用权到期日期"
            ctype="input"
            placeholder="使用权到期日期"
            name="useCertEndDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="使用权面积"
            ctype="input"
            placeholder="使用权面积"
            name="useCertArea"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="押品使用情况"
            ctype="select"
            name="guarUtilCase"
            rules="required"
            data-code="STD_ZB_GUAR_UTIL_CASE"
            placeholder="押品使用情况"
          ></yu-xform-item>
          <yu-xform-item
            label="所在/注册市"
            ctype="input"
            placeholder="所在/注册市"
            name="cityCd"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权位置"
            ctype="input"
            placeholder="使用权位置"
            name="useCertLocation"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="买卖合同编号"
            ctype="input"
            placeholder="买卖合同编号"
            name="businessContractNo"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="购买日期"
            ctype="datepicker"
            placeholder="购买日期"
            name="purchaseDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="购买价格（元）"
            ctype="yu-num" number-formatter="0,000.00"
            placeholder="购买价格（元）"
            name="purchaseAccnt"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="所在县（区）"
            ctype="input"
            placeholder="所在县（区）"
            name="countyCd"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="街道/村镇/路名"
            ctype="input"
            placeholder="街道/村镇/路名"
            name="street"
          ></yu-xform-item>
          <yu-xform-item
            label="所在/注册省份"
            ctype="input"
            placeholder="所在/注册省份"
            name="provinceCd"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="林地名称"
            ctype="input"
            placeholder="林地名称"
            name="forestName"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="林种"
            ctype="input"
            placeholder="林种"
            name="forestVariet"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="主要种树"
            ctype="input"
            placeholder="主要种树"
            name="forestMain"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="取得方式"
            ctype="input"
            placeholder="取得方式"
            name="acquMode"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记人"
            ctype="input"
            placeholder="登记人"
            name="inputId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记机构"
            ctype="input"
            placeholder="登记机构"
            name="inputBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记日期"
            ctype="input"
            placeholder="登记日期"
            name="inputDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改人"
            ctype="input"
            placeholder="最后修改人"
            name="updId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改机构"
            ctype="input"
            placeholder="最后修改机构"
            name="updBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改日期"
            ctype="input"
            placeholder="最后修改日期"
            name="updDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="操作类型  "
            ctype="input"
            placeholder="操作类型  "
            name="oprType"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="责任人"
            ctype="input"
            placeholder="责任人"
            name="managerId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="责任机构"
            ctype="input"
            placeholder="责任机构"
            name="managerBrId"
            disabled
            hidden
          ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageData: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/guarinfusufland/update',
      addUrl: this.$backend.cmisBiz + '/api/guarinfusufland/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.formType = this.pageData.op;
    this.serno = this.pageData.serno;
    this.afterInit();
  },
  methods: {
    afterInit () {
      var _this = this;
      if (_this.formType == 'ADD') {
        this.execBillCardDefaultValueFormula();
        _this.formdata.serno = this.serno;
      } else {
        _this.queryData(this.serno);
      }
    },
    /** 加载数据* */
    queryData (serno) {
      const _this = this;
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/guarinfusufland/queryBySerno',
        async: false,
        method: 'post',
        data: {'serno': serno}
      }).then((response) => {
        if (response.code === 0) {
          yufp.clone(response.data.data, _this.formdata);
          if (_this.formdata.serno == '' || !_this.formdata.serno) {
            _this.formdata.serno = _this.serno;
          }
        }
      });
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>