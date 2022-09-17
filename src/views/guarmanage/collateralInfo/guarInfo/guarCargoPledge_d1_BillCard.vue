<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules"  :form-change="triggerEditChangeEvent" >
        <yu-xform-group :column="2">
          <yu-xform-item label="流水号"  ctype="input"  placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="货物名称"  ctype="input"  placeholder="货物名称" name="cargoName"></yu-xform-item>
          <yu-xform-item label="货物详细类型" ctype="input" placeholder="货物详细类型" name="coodsDetailType"></yu-xform-item>
          <yu-xform-item label="货物型号" ctype="input" placeholder="货物型号" name="goodsModel" ></yu-xform-item>
          <yu-xform-item label="货物数量" ctype="yu-num" name="cargoAmount" placeholder="货物数量" ></yu-xform-item>
          <yu-xform-item label="品牌/厂家/产地" ctype="input" placeholder="品牌/厂家/产地" name="vehicleBrand" rules="required" ></yu-xform-item>
          <yu-xform-item label="是否有监管公司" ctype="select" name="hasSupervision" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否有监管公司" ></yu-xform-item>
          <yu-xform-item label="货物计量单位" ctype="select" name="cargoMeasureUnit" data-code="STD_ZB_CARGO_MEASURE_UNIT" placeholder="货物计量单位" ></yu-xform-item>
          <yu-xform-item label="金额" ctype="yu-num" number-formatter="0,000.00" placeholder="金额" name="amt" rules="required" ></yu-xform-item>
          <yu-xform-item label="最新核定单价" ctype="yu-num" number-formatter="0,000.00" placeholder="最新核定单价" name="latestApprovedPrice" ></yu-xform-item>
          <yu-xform-item label="保管人" ctype="input" placeholder="保管人" name="keepId" rules="required" ></yu-xform-item>
          <yu-xform-item label="监管公司名称" ctype="input" placeholder="监管公司名称" name="supervisionCompanyName"  ></yu-xform-item>
          <yu-xform-item  label="监管公司组织机构代码" ctype="input" placeholder="监管公司组织机构代码" name="supervisionOrgCode" ></yu-xform-item>
          <yu-xform-item label="所在/注册省份" ctype="select" filterable :options="options" @change="changeSY" placeholder="所在/注册省份" name="provinceCd" rules="required" ></yu-xform-item>
          <yu-xform-item label="所在/注册市" ctype="select" filterable :options="optionsCY" @change="changeCY" placeholder="所在/注册市" name="cityCd" rules="required" ></yu-xform-item>
          <yu-xform-item  label="所在县（区）" ctype="select" filterable :options="optionsQX" placeholder="所在县（区）" name="countyCd"  rules="required" ></yu-xform-item>
          <yu-xform-item label="详细地址" ctype="input" placeholder="详细地址" name="detailsAddress" rules="required" ></yu-xform-item>
          <yu-xform-item label="协议生效日" ctype="datepicker" name="agreementBeginDate" value-format="yyyy-MM-dd"  placeholder="协议生效日" ></yu-xform-item>
          <yu-xform-item label="协议到期日"  ctype="datepicker" name="agreementEndDate" value-format="yyyy-MM-dd" placeholder="协议到期日" ></yu-xform-item>
          <yu-xform-item label="供应链质押价值" ctype="yu-num" number-formatter="0,000.00" placeholder="供应链质押价值" name="gylVal"  ></yu-xform-item>
          <yu-xform-item label="币种 std_zb_cur_ty" ctype="input" placeholder="币种 std_zb_cur_ty" name="curType"  disabled hidden ></yu-xform-item>
          <yu-xform-item label="货物其他计量单位文本输入" ctype="input" placeholder="货物其他计量单位文本输入" name="carMeasureUnitOther" disabled hidden ></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"  disabled hidden ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构"  name="inputBrId" disabled  hidden ></yu-xform-item>
          <yu-xform-item label="登记日期"  ctype="input" placeholder="登记日期" name="inputDate" disabled hidden ></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="最后修改日期"  ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden ></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden ></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" disabled hidden ></yu-xform-item>
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
      updateUrl: this.$backend.cmisBiz + '/api/guarinfcargopledge/update',
      addUrl: this.$backend.cmisBiz + '/api/guarinfcargopledge/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      options: [],
      optionsCY: [],
      optionsQX: []
    };
  },
  mounted () {
    this.formType = this.pageData.op;
    this.serno = this.pageData.serno;
    this.afterInit();
    this.querySelectData();
  },
  methods: {
    afterInit () {
      var _this = this;
      if (_this.formType == 'ADD') {
        _this.execBillCardDefaultValueFormula();
        _this.formdata.serno = this.serno;
      } else {
        _this.queryData(this.serno);
      }
    },
    /** 加载数据 */
    queryData (serno) {
      const _this = this;
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/guarinfcargopledge/queryBySerno',
        async: false,
        method: 'post',
        data: { serno: serno }
      }).then(response => {
        if (response.code === 0) {
          yufp.clone(response.data.data, _this.formdata);
          if (_this.formdata.serno == '' || !_this.formdata.serno) {
            _this.formdata.serno = _this.serno;
          }
        }
      });
    },

    querySelectData (opt = 'sf', id = '100000') {
      var _this = this;
      let model = { optType: 'STD_ZB_AREA_CODE', id };
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisCfg + '/api/adminsmtreedic/selecttree',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            switch (opt) {
            case 'sf':
              _this.options = response.data;
              break;
            case 'cy':
              _this.optionsCY = response.data;
              break;
            case 'qx':
              _this.optionsQX = response.data;
              break;
            default:
            }
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    execBillCardDefaultValueFormula: function () {
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.inputId = this.$xutils.getDefaultformulaData(
        '$LoginLoginCode'
      );
      this.formdata.inputIdDisplayname = this.$xutils.getDefaultformulaData(
        '$LoginUserName'
      );
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData(
        '$LoginOrgCode'
      );
      this.formdata.inputBrIdDisplayname = this.$xutils.getDefaultformulaData(
        '$LoginOrgName'
      );
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData(
        '$LoginLoginCode'
      );
      this.formdata.updIdDisplayname = this.$xutils.getDefaultformulaData(
        '$LoginUserName'
      );
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updBrIdDisplayname = this.$xutils.getDefaultformulaData(
        '$LoginOrgName'
      );
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    },
    changeSY (data) {
      this.querySelectData('cy', data);
    },
    changeCY (data) {
      this.querySelectData('qx', data);
    }
  }
};
</script>
