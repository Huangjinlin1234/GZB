<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
    <yu-tabs type="card">
    <yu-tab-pane label="基本信息">
     <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="lwaSerno" rules="required" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" rules="required" @select-fn="commonSelectFn" :mapping="{listBelg:'listBelg',managerBrId:'belgOrg',innerEval:'innerEval',lmtAmt:'lmtAmt',cusId:'cusId',cusName:'cusName',managerId:'managerId'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户规模" ctype="select" name="cusScale" data-code="STD_ZB_CUS_SCALE" rules="required" placeholder="客户规模"></yu-xform-item>
          <yu-xform-item label="是否优良信贷客户" ctype="select" name="isFineCretCus" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否优良信贷客户"></yu-xform-item>
          <yu-xform-item label="授信金额" ctype="input" placeholder="授信金额" name="lmtAmt" rules="required"></yu-xform-item>
          <yu-xform-item label="内部评级" ctype="select" name="innerEval" data-code="STD_ZB_EVAL_RST" rules="required" placeholder="内部评级"></yu-xform-item>
          <yu-xform-item label="名单归属" ctype="select" name="listBelg" data-code="STD_LST_WHBXD_LIST_BELG" rules="required" placeholder="名单归属"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg"  disabled hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="datepicker" name="appDate" value-format="yyyy-MM-dd" disabled rules="required" placeholder="申请日期"></yu-xform-item>
          <yu-xform-item label="申请说明" ctype="textarea" name="appExpl" placeholder="申请说明" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="customClick('doSubmit')">提交</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史" v-if="formType == 'details'">
    <spls :params="params"></spls>
    </yu-tab-pane>
  </yu-tabs>
    </div>

  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import spls from '@/views/zrcbank/common/ApproveHis.vue';
yufp.lookup.reg('STD_ZB_CUS_SCALE,STD_ZB_YES_NO,STD_ZB_EVAL_RST,STD_LST_WHBXD_LIST_BELG,STD_ZB_APPR_STATUS');
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  components: { spls },
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      params: {serno: ''},
      updateUrl: this.$backend.cmisCus + '/api/cuslstwhbxdapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstwhbxdapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  watch: {
    'formdata.lwaSerno': function (val) {
      if (val) {
        this.params.serno = val;
      }
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      let user = this.$xutils.getLoginUserInfo();
      this.formdata.lwaSerno = this.$xutils.getSEQFromServer('MD_SERNO');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.belgOrgName = user.org.name;
      this.formdata.managerIdName = user.userName;
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.belgOrg = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.approveStatus = '000';
    },
    initFormData (lwaSerno) {
      let _this = this;
      var model = {};
      model['lwaSerno'] = lwaSerno;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'post',
        url: _this.addUrl + 'check',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
          } else {
            _this.$message({ message: '数据加载失败！', type: 'error'});
          }
        }
      });
    }
  },
  created () {
    if (this.bizPageData) {
      this.formType = 'details';
      let lwaSerno = this.bizPageData.instanceInfo.bizId;
      this.initFormData(lwaSerno);
    }
  }
};
</script>
