<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="130px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusbankbase_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save"
      >
        <yu-panel title="客户属性" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否苏州综合平台企业" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="是否苏州综合平台企业" name="iisSzjrfwCrop"></yu-xform-item>
            <yu-xform-item label="是否钢贸企业" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="是否钢贸企业" name="isSteelCus"></yu-xform-item>
            <yu-xform-item label="是否上市公司" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="是否上市公司" name="isStockCorp"></yu-xform-item>
            <yu-xform-item label="是否战略客户" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="是否战略客户" name="isStrgcCus"></yu-xform-item>
            <yu-xform-item label="是否国控" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="是否国控" name="isNatctl"></yu-xform-item>
            <yu-xform-item label="是否城投" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否城投" name="isCtinve"></yu-xform-item>
            <yu-xform-item label="国控层级" ctype="select" data-code="STD_ZB_NATCTL_LEVEL" placeholder="国控层级" name="natctlLevel" :disabled="isNatctld" :rules="{ required: isNatctl, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="城投层级" ctype="select" data-code="STD_ZB_CTINVE_LEVEL" placeholder="城投层级" name="ctinveLevel" :disabled="isCtinved" :rules="{ required: isCtinve, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="政府投资平台" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="政府投资平台" name="goverInvestPlat"></yu-xform-item>
            <yu-xform-item label="进出口标识" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="进出口标识" name="impexpFlag"></yu-xform-item>
            <yu-xform-item label="地区重点企业" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="地区重点企业" name="areaPriorCorp"></yu-xform-item>
            <yu-xform-item label="特种经营标识" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="特种经营标识" name="spOperFlag"></yu-xform-item>
            <yu-xform-item label="经营场地所有权" ctype="select" utrace rules="required" data-code="STD_ZX_FIELD_OWNER" placeholder="经营场地所有权" name="operPlaceOwnshp"></yu-xform-item>
            <yu-xform-item label="集团客户类型" ctype="select" utrace rules="required" data-code="STD_ZB_COM_GRP_MODE" placeholder="集团客户类型" name="grpCusType"></yu-xform-item>
            <yu-xform-item label="再贴现业务中申请单位行业分类" ctype="select" data-code="STD_REDCBIZ_UNIT_TRADE_CLASS" placeholder="再贴现业务中申请单位行业分类" name="redcbizUnitTradeClass"></yu-xform-item>
            <yu-xform-item label="贷款类型" ctype="select" utrace rules="required" data-code="STD_QC_FM" placeholder="贷款类型" name="loanType"></yu-xform-item>
            <yu-xform-item label="财务报表类型" ctype="select" utrace  :options="finOptions" placeholder="财务报表类型" name="finaReportType"></yu-xform-item>
            <yu-xform-item label="是否新建企业" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="是否新建企业" name="isNewBuildCorp"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记时间" name="inputDate" disabled></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" disabled ></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrIdName" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import backend from '@/config/constant/app.data.service';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String
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
    this.getFinOptions();
    this.AfterInit();
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit();
    }
  },
  computed: {
    isNatctl: function () {
      return this.formdata.isNatctl == '1';
    },
    isNatctld: function () {
      return this.formdata.isNatctl == '0';
    },
    isCtinve: function () {
      return this.formdata.isCtinve == '1';
    },
    isCtinved: function () {
      return this.formdata.isCtinve == '0';
    }
  },
  methods: {
    // 登记注册信息
    AfterInit () {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;

      if (_this.cusCorp) {
        _this.copyExsitFieldValue(_this.cusCorp, _this.formdata);
        // _this.formdata.iisSzjrfwCrop = _this.cusCorp.iisSzjrfwCrop;
        // _this.formdata.isSteelCus = _this.cusCorp.isSteelCus;
        // _this.formdata.isStockCorp = _this.cusCorp.isStockCorp;
        // _this.formdata.isStrgcCus = _this.cusCorp.isStrgcCus;
        // _this.formdata.isNatctl = _this.cusCorp.isNatctl;
        // _this.formdata.isCtinve = _this.cusCorp.isCtinve;
        // _this.formdata.natctlLevel = _this.cusCorp.natctlLevel;
        // _this.formdata.ctinveLevel = _this.cusCorp.ctinveLevel;
        // _this.formdata.goverInvestPlat = _this.cusCorp.goverInvestPlat;
        // _this.formdata.impexpFlag = _this.cusCorp.impexpFlag;
        // _this.formdata.areaPriorCorp = _this.cusCorp.areaPriorCorp;
        // _this.formdata.spOperFlag = _this.cusCorp.spOperFlag;
        // _this.formdata.operPlaceOwnshp = _this.cusCorp.operPlaceOwnshp;
        // _this.formdata.grpCusType = _this.cusCorp.grpCusType;
        // _this.formdata.redcbizUnitTradeClass = _this.cusCorp.redcbizUnitTradeClass;
        // _this.formdata.loanType = _this.cusCorp.loanType;
        // _this.formdata.finaReportType = _this.cusCorp.finaReportType;
        // _this.formdata.isNewBuildCorp = _this.cusCorp.isNewBuildCorp;
        // _this.formdata.managerId = _this.cusCorp.managerId;
        // _this.formdata.managerBrId = _this.cusCorp.managerBrId;
        // _this.formdata.inputId = _this.cusCorp.inputId;
        // _this.formdata.inputDate = _this.cusCorp.inputDate;
      }
    },
    copyExsitFieldValue (source, target) {
      for (let i in source) { // 仅赋值表单存在的字段
        if (target.hasOwnProperty(i)) {
          target[i] = source[i];
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
