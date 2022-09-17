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
            rules="required"
            placeholder="不动产权证号"
            name="bdcCrno"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权权证号"
            ctype="input"
            rules="required"
            placeholder="使用权权证号"
            name="useNo"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权抵押登记证号"
            ctype="input"
            rules="required"
            placeholder="使用权抵押登记证号"
            name="useCertNo"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权登记机关"
            ctype="input"
            rules="required"
            placeholder="使用权登记机关"
            name="useCertOffice"
          ></yu-xform-item>
          <yu-xform-item
            label="林地名称"
            ctype="input"
            placeholder="林地名称"
            :hidden="linyeShow"
            name="forestName"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="林种"
            ctype="select"
            :hidden="linyeShow"
            placeholder="林种"
            data-code="STD_FOREST_VARIET"
            name="forestVariet"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="主要种树"
            ctype="input"
            :hidden="linyeShow"
            placeholder="主要种树"
            name="forestMain"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="取得方式"
            ctype="select"
            :hidden="linyeShow"
            placeholder="取得方式"
            data-code="STD_ZB_ESTATE_ACQUIRE_WAY"
            name="acquMode"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权取得日期"
            ctype="datepicker"
            rules="required"
            placeholder="使用权取得日期"
            name="useCertBeginDate"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权到期日期"
            ctype="datepicker"
            rules="required"
            placeholder="使用权到期日期"
            name="useCertEndDate"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权面积"
            ctype="input"
            placeholder="使用权面积"
            name="useCertArea"
          ></yu-xform-item>
          <yu-xform-item
            label="押品使用情况"
            ctype="select"
            name="guarUtilCase"
            rules="required"
            data-code="STD_ZB_GUAR_UTIL_CASE"
            placeholder="押品使用情况"
          ></yu-xform-item>
          <!-- <yu-xform-item
            label="取得方式"
            ctype="select"
            name="acquMode"
            rules="required"
            data-code="STD_ZB_LAND_OBTAIN_WAY"
            placeholder="取得方式"
          ></yu-xform-item> -->
          <yu-xform-item
            label="买卖合同编号"
            ctype="input"
            placeholder="买卖合同编号"
            name="businessContractNo"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="所在/注册省份"
            placeholder="所在/注册省份"
            name="provinceCd"
            ctype="select"
            filterable
            :options="options"
            @change="changeSY"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="所在/注册市"
            placeholder="所在/注册市"
            name="cityCd"
            ctype="select"
            filterable
            :options="optionsCY"
            @change="changeCY"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="所在县（区）"
            placeholder="所在县（区）"
            name="countyCd"
            ctype="select"
            filterable
            :options="optionsQX"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="使用权位置"
            ctype="input"
            placeholder="使用权位置"
            name="useCertLocation"
          ></yu-xform-item>
          <yu-xform-item
            label="购买日期"
            ctype="datepicker"
            placeholder="购买日期"
            name="purchaseDate"
          ></yu-xform-item>
          <yu-xform-item
            label="购买价格（元）"
            ctype="yu-num" number-formatter="0,000.00"
            placeholder="购买价格（元）"
            name="purchaseAccnt"
          ></yu-xform-item>
          <yu-xform-item
            label="街道/村镇/路名"
            ctype="input"
            placeholder="街道/村镇/路名"
            name="street"
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
          <!-- <yu-xform-item
            label="备注"
            ctype="textarea"
            placeholder="备注"
            name=""
          ></yu-xform-item> -->
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_GUAR_UTIL_CASE,STD_FOREST_VARIET,STD_ZB_ESTATE_ACQUIRE_WAY');
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
  computed: {
    linyeShow: function () {
      return this.pageData.guarTypeCd != 'DY0299004';
    }
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