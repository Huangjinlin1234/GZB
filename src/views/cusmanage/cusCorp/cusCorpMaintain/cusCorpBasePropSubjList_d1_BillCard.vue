<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" :disabled="viewType=='VIEW'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="客户属性"  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否苏州综合平台企业" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否苏州综合平台企业" name="iisSzjrfwCrop"></yu-xform-item>
            <yu-xform-item label="是否钢贸企业" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否钢贸企业" name="isSteelCus"></yu-xform-item>
            <yu-xform-item label="是否上市公司" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否上市公司" name="isStockCorp"></yu-xform-item>
            <yu-xform-item label="是否战略客户" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否战略客户" name="isStrgcCus"></yu-xform-item>
            <yu-xform-item label="是否国控" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否国控" name="isNatctl" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否城投" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否城投" name="isCtinve"></yu-xform-item>
            <yu-xform-item label="国控层级" ctype="select" data-code="STD_ZB_NATCTL_LEVEL" placeholder="国控层级" name="natctlLevel" :colspan="12" :disabled="isNatctld" :rules="{ required: isNatctl, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="城投层级" ctype="select" placeholder="城投层级" name="ctinveLevel" data-code="STD_ZB_CTINVE_LEVEL" :disabled="isCtinved" :rules="{ required: isCtinve, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="政府投资平台" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="政府投资平台" name="goverInvestPlat"></yu-xform-item>
            <yu-xform-item label="进出口标识" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="进出口标识" name="impexpFlag"></yu-xform-item>
            <yu-xform-item label="地区重点企业" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="地区重点企业" name="areaPriorCorp"></yu-xform-item>
            <yu-xform-item label="特种经营标识" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="特种经营标识" name="spOperFlag"></yu-xform-item>
            <yu-xform-item label="经营场地所有权" ctype="select" rules="required" data-code="STD_ZX_FIELD_OWNER" placeholder="经营场地所有权" name="operPlaceOwnshp"></yu-xform-item>
            <yu-xform-item label="集团客户类型" ctype="select" rules="required" data-code="STD_ZB_COM_GRP_MODE" placeholder="集团客户类型" name="grpCusType"></yu-xform-item>
            <yu-xform-item label="再贴现业务中申请单位行业分类" ctype="select" placeholder="再贴现业务中申请单位行业分类" name="redcbizUnitTradeClass"></yu-xform-item>
            <yu-xform-item label="贷款类型" ctype="select" rules="required" data-code="STD_QC_FM" placeholder="贷款类型" name="loanType"></yu-xform-item>
            <yu-xform-item label="财务报表类型" ctype="select" placeholder="财务报表类型" name="finaReportType" :options="finOptions"></yu-xform-item>
            <yu-xform-item label="是否新建企业" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否新建企业" name="isNewBuildCorp"></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId"  hidden></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName"  disabled></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="inputBrId"  hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="inputBrIdName"  disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"  hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName"  disabled></yu-xform-item>
            <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import backend from '@/config/constant/app.data.service';
yufp.lookup.reg('STD_ZB_NATCTL_LEVEL');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String,
    viewType: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      finOptions: []
    };
  },
  mounted () {
    this.AfterInit();
    this.getFinOptions();
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit();
    }
  },
  computed: {
    isNatctl: function () {
      return this.formdata.isNatctl == "1" ? true : false
    },
     isNatctld: function () {
      return this.formdata.isNatctl == "0" ? true : false
    },
    isCtinve: function () {
      return this.formdata.isCtinve == "1" ? true : false
    },
     isCtinved: function () {
      return this.formdata.isCtinve == "0" ? true : false
    }
  },
  methods: {
    AfterInit () {
      var _this = this;
      if (_this.cusCorp) {
        _this.formdata.iisSzjrfwCrop = _this.cusCorp.iisSzjrfwCrop;
        _this.formdata.isSteelCus = _this.cusCorp.isSteelCus;
        _this.formdata.isStockCorp = _this.cusCorp.isStockCorp;
        _this.formdata.isStrgcCus = _this.cusCorp.isStrgcCus;
        _this.formdata.isNatctl = _this.cusCorp.isNatctl;
        _this.formdata.isCtinve = _this.cusCorp.isCtinve;
        _this.formdata.natctlLevel = _this.cusCorp.natctlLevel;
        _this.formdata.ctinveLevel = _this.cusCorp.ctinveLevel;
        _this.formdata.goverInvestPlat = _this.cusCorp.goverInvestPlat;
        _this.formdata.impexpFlag = _this.cusCorp.impexpFlag;
        _this.formdata.areaPriorCorp = _this.cusCorp.areaPriorCorp;
        _this.formdata.spOperFlag = _this.cusCorp.spOperFlag;
        _this.formdata.operPlaceOwnshp = _this.cusCorp.operPlaceOwnshp;
        _this.formdata.grpCusType = _this.cusCorp.grpCusType;
        _this.formdata.redcbizUnitTradeClass = _this.cusCorp.redcbizUnitTradeClass;
        _this.formdata.loanType = _this.cusCorp.loanType;
        _this.formdata.finaReportType = _this.cusCorp.finaReportType;
        _this.formdata.isNewBuildCorp = _this.cusCorp.isNewBuildCorp;
        _this.formdata.managerId = _this.cusCorp.managerId;
         _this.formdata.inputDate = _this.cusCorp.inputDate;
        if(_this.cusCorp.cusId){
          this.$request({
            url: this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
            method: 'POST',
            data: _this.cusCorp.cusId
          }).then((response) => {
            if(response.code == '0' && response.data){
              _this.formdata.managerId = response.data.managerId;
              _this.formdata.inputBrId = response.data.inputBrId;
              _this.formdata.inputId = response.data.inputId;
             
              _this.formdata.managerIdName = response.data.managerIdName;
              _this.formdata.inputBrIdName = response.data.inputBrIdName;
              _this.formdata.inputIdName = response.data.inputIdName;
            }
          });
        }
      }

    },
    /**
         * 获取财报类型option
         */
    getFinOptions: function () {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: backend.cmisCus + '/api/nrcs-cms/fncconftemplate/q/fncconftemplate/all/list',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.finOptions = [];
            response.data.forEach(function (item) {
              _this.finOptions.push({
                key: item.fncId,
                value: item.fncName
              });
            });
          } else {
            this.$message({message: response.message, type: 'error'});
          }
        }
      });
    }
  }
};
</script>
