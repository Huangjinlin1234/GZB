<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" :data-url="dataUrl" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" >
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="在建工程关联的土地证" ctype="input" placeholder="在建工程关联的土地证" name="landNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="工程项目名称" ctype="input" placeholder="工程项目名称" name="projectName" disabled hidden></yu-xform-item>
          <yu-xform-item label="建设用地规划许可证号" ctype="input" placeholder="建设用地规划许可证号" name="landLicence" disabled hidden></yu-xform-item>
          <yu-xform-item label="建设工程规划许可证号" ctype="input" placeholder="建设工程规划许可证号" name="layoutLicence" rules="required"></yu-xform-item>
          <yu-xform-item label="施工许可证号" ctype="input" placeholder="施工许可证号" name="consLicence" disabled hidden></yu-xform-item>
          <yu-xform-item label="工程启动日期" ctype="input" placeholder="工程启动日期" name="projStartDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="工程竣工预计交付日期" ctype="input" placeholder="工程竣工预计交付日期" name="planFinishDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="工程预计总造价（元）" ctype="input" placeholder="工程预计总造价（元）" name="projPlanAccnt" disabled hidden></yu-xform-item>
          <yu-xform-item label="工程契约合同编号" ctype="input" placeholder="工程契约合同编号" name="businessContractNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同签订日期" ctype="input" placeholder="合同签订日期" name="purchaseDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同签订金额（元）" ctype="input" placeholder="合同签订金额（元）" name="purchaseAccnt" disabled hidden></yu-xform-item>
          <yu-xform-item label="建筑面积" ctype="input" placeholder="建筑面积" name="buildArea" disabled hidden value="0"></yu-xform-item>
          <yu-xform-item label="房产类别" ctype="select" name="houseType" rules="required" data-code="STD_ZB_HOUSE_PROPERTY_CLS" placeholder="房产类别"></yu-xform-item>
          <yu-xform-item label="土地用途" ctype="select" name="landPurp" rules="required" data-code="STD_ZB_LANDYT" placeholder="土地用途"></yu-xform-item>
          <yu-xform-item label="所在/注册省份" ctype="select" filterable :options="options" @change="changeSY" placeholder="所在/注册省份" name="provinceCd" rules="required"></yu-xform-item>
          <yu-xform-item label="所在/注册市" ctype="select" filterable :options="optionsCY" @change="changeCY" placeholder="所在/注册市" name="cityCd" rules="required"></yu-xform-item>
          <yu-xform-item label="所在县（区）" ctype="select" filterable :options="optionsQX" placeholder="所在县（区）" name="countyCd" rules="required"></yu-xform-item>
          <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street" rules="required"></yu-xform-item>
          <yu-xform-item label="详细地址" ctype="input" placeholder="详细地址" name="detailsAddress" disabled hidden></yu-xform-item>
          <yu-xform-item label="所得税率" ctype="input" placeholder="所得税率" name="getTax" disabled hidden></yu-xform-item>
          <yu-xform-item label="建筑年份" ctype="input" placeholder="建筑年份" name="archYear" disabled hidden></yu-xform-item>
          <yu-xform-item label="已缴纳土地出让金（元）" ctype="input" placeholder="已缴纳土地出让金（元）" name="landSellAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="已投入工程款（元）" ctype="input" placeholder="已投入工程款（元）" name="useProjectAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="已完成工程量" ctype="input" placeholder="已完成工程量" name="finishProjectQnt" disabled hidden></yu-xform-item>
          <yu-xform-item label="在建工程类型 std_zb_pr" ctype="input" placeholder="在建工程类型 std_zb_pr" name="builtProjectType" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权性质 std_zb_l" ctype="input" placeholder="土地使用权性质 std_zb_l" name="landUseQual" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权取得方式 std_zb" ctype="input" placeholder="土地使用权取得方式 std_zb" name="landUseWay" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权使用年限起始日期" ctype="input" placeholder="土地使用权使用年限起始日期" name="landUseBeginDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用年限" ctype="input" placeholder="土地使用年限" name="landUseYears" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否欠工程款" ctype="select" name="isDelayProjectAmt" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否欠工程款"></yu-xform-item>
          <yu-xform-item label="欠工程款金额" ctype="yu-num" number-formatter="0,000.00" name="delayProjectAmt" placeholder="欠工程款金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="土地说明" ctype="input" placeholder="土地说明" name="landExplain"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型  " ctype="input" placeholder="操作类型  " name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" disabled hidden></yu-xform-item>
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
      dataUrl: this.$backend.cmisBiz + '/api/guarinfbuilproject/',
      updateUrl: this.$backend.cmisBiz + '/api/guarinfbuilproject/update',
      addUrl: this.$backend.cmisBiz + '/api/guarinfbuilproject/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      disabledflg: false,
      serno: '',
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
    queryData () {
      const _this = this;
      _this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/guarinfbuilproject/queryBySerno',
        data: {serno: _this.serno},
        success: (response, status, xhr) => {
          if (response.code == 0) {
            yufp.clone(response.data, _this.formdata);
            if (_this.formdata.serno == '' || !_this.formdata.serno) {
              _this.formdata.serno = this.serno;
            }
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
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
    afterInit () {
      if (this.formType == 'ADD') {
        this.execBillCardDefaultValueFormula();
        this.formdata.serno = this.serno;
      } else {
        this.queryData();
      }
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