<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
    <yu-tabs type="card">
    <yu-tab-pane label="基本信息">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="lywaSerno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="datepicker" placeholder="申请日期" value-format="yyyy-MM-dd" name="appDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','managerId':'managerId','managerBrIdName':'belgOrg','cusId':'cusId'}" width="1200" height="600" pagePath="cusmanage/nameListManage/cus_selectIndex" title="自定义参照Title" :disabled="formType==='details'"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请理由" ctype="select" name="appResn" rules="required" data-code="STD_APP_RESN_YPQF" placeholder="申请理由"></yu-xform-item>
          <yu-xform-item label="申请有效期" ctype="datepicker" name="appIdate" value-format="yyyy-MM-dd" rules="required" placeholder="申请有效期"></yu-xform-item>
          <yu-xform-item label="补充说明" ctype="textarea" name="spplExpl" rules="required" placeholder="补充说明" :colspan="24"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrg" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huserName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="lastUpdateId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="lastUpdateBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="lastUpdateDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType == 'edit'" @click="customClick('doSubmit')">提交</yu-button>
      <yu-button type="primary" v-if="notSp" @click="onCancel">取消</yu-button>
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
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  components: { spls },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data: function () {
    return {
      params: {serno: ''},
      queryUrl: this.$backend.cmisCus + '/api/cuslstypqfwhiteapp/',
      updateUrl: this.$backend.cmisCus + '/api/cuslstypqfwhiteapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstypqfwhiteapp/',
      formdata: {},
      formType: 'details',
      formRules: { },
      imageUrls: {},
      File: {},
      notSp: true
    };
  },
  mounted() {
    if(this.bizPageData.instanceInfo != undefined) {
      this.notSp = false;
      this.getCusLstYpqfWhite();
    }
  },
  watch: {
    'formdata.lywaSerno': function (val) {
      if (val) {
        this.params.serno = val;
      }
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {

      this.formdata.lywaSerno = this.$xutils.getDefaultformulaData('SEQ:MD_SERNO');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('getCurrDate()');
      this.formdata.huser = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.huserName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.handOrg = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.handOrgName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      this.formdata.updateTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

    },

    getCusLstYpqfWhite: function() {
      var instanceInfo = this.bizPageData.instanceInfo;
      var _this = this;
      this.formdata.lywaSerno = instanceInfo.bizId;

      this.$request({
        url: this.queryUrl + this.formdata.lywaSerno,
        method: 'get',
      }).then((response) => {
        if (response.code == '0') {
          var cusLstYpqfWhite = response.data;
          yufp.clone(cusLstYpqfWhite, _this.formdata);

          return _this.$request({
            url: this.$backend.appOcaService + '/api/adminsmuser/info/' + this.formdata.huser,
            method: 'get',
          })
        };
      }).then((response) => {
        if (response.code == '0') {
          this.formdata.huserName = response.data.userName;
          
          return _this.$request({
            url: this.$backend.appOcaService + '/api/adminsmorg/info/' + this.formdata.handOrg,
            method: 'get',
          })
        };
      }).then((response) => {
        if (response.code == '0') {
          this.formdata.handOrgName = response.data.orgName;
        }
      }).catch(() => {
        _this.$message({
          message: '请求失败'
        });
      });;
    }
  }
};
</script>
