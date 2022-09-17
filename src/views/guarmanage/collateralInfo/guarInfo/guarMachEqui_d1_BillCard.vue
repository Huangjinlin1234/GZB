<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform
        ref="refForm"
        label-width="120px"
        :form-type="formType"
        v-model="formdata"
        :rules="formRules"
        :form-change="triggerEditChangeEvent"
      >
        <yu-xform-group :column="3">
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
            label="设备铭牌编号"
            ctype="input"
            placeholder="设备铭牌编号"
            name="equipNo"
            rules="required"
          ></yu-xform-item>
          <yu-xform-item
            label="设备类型"
            ctype="select"
            name="machineType"
            data-code="STD_ZB_SBLX"
            placeholder="设备类型"
          ></yu-xform-item>
          <yu-xform-item
            label="一手/二手标识 "
            ctype="select"
            name="isUsed"
            rules="required"
            data-code="STD_ZB_IS_USED"
            placeholder="一手/二手标识 "
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
            label="设备分类"
            ctype="select"
            name="machineCode"
            data-code="STD_ZB_SBFL"
            placeholder="设备分类"
          ></yu-xform-item>
          <yu-xform-item
            label="型号/规格"
            ctype="input"
            placeholder="型号/规格"
            name="specModel"
          ></yu-xform-item>
          <yu-xform-item
            label="品牌/生产厂商"
            ctype="input"
            placeholder="品牌/生产厂商"
            name="vehicleBrand"
          ></yu-xform-item>
          <yu-xform-item
            label="出厂日期或报关日期"
            ctype="datepicker"
            name="factoryDate"
            value-format="yyyy-MM-dd"
            rules="required"
            placeholder="出厂日期或报关日期"
          ></yu-xform-item>
          <yu-xform-item
            label="设计使用到期日期"
            ctype="datepicker"
            name="matureDate"
            value-format="yyyy-MM-dd"
            rules="required"
            placeholder="设计使用到期日期"
          ></yu-xform-item>
          <yu-xform-item
            label="是否有产品合格证"
            ctype="select"
            name="indEligibleCerti"
            data-code="STD_ZB_YES_NO"
            placeholder="是否有产品合格证"
          ></yu-xform-item>
          <yu-xform-item
            label="发票编号"
            ctype="input"
            placeholder="发票编号"
            name="invoiceNo"
          ></yu-xform-item>
          <yu-xform-item
            label="发票日期"
            ctype="datepicker"
            name="invoiceDate"
            value-format="yyyy-MM-dd"
            rules="required"
            placeholder="发票日期"
          ></yu-xform-item>
          <yu-xform-item
            label="发票金额（元）"
            ctype="yu-num" number-formatter="0,000.00"
            name="buyPrice"
            placeholder="发票金额（元）"
            :min="0"
          ></yu-xform-item>
          <yu-xform-item
            label="设备名称"
            ctype="input"
            placeholder="设备名称"
            name="equipName"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="设备数量"
            ctype="yu-num"
            name="equipQnt"
            rules="required"
            placeholder="设备数量"
          ></yu-xform-item>
          <yu-xform-item
            label="设备存放地址"
            ctype="input"
            placeholder="设备存放地址"
            name="equipDepo"
            rules="required"
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
      updateUrl: this.$backend.cmisBiz + '/api/guarinfmachequi/update',
      addUrl: this.$backend.cmisBiz + '/api/guarinfmachequi/',
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
    /** 加载数据* */
    queryData (serno) {
      const _this = this;
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/guarinfmachequi/queryBySerno',
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
    /** *默认值加载* **/
    execBillCardDefaultValueFormula: function () {
      this.formdata.buyPrice = this.$xutils.getDefaultformulaData('0');
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