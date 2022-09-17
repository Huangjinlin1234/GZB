<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="140px" :form-type="formType" :disabled="formDisabled" v-model="formdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="contSerno" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="原贷款合同信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="客户号" ctype="input" placeholder="客户号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt" disabled></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="input" placeholder="合同起始日" name="contStartDate" disabled></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="input" placeholder="合同到期日" name="contEndDate" disabled></yu-xform-item>
            <yu-xform-item label="贷款合同类型" ctype="select" placeholder="贷款合同类型" name="contType" data-code="STD_ZB_CONT_TYPE"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原使用额度信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="是否使用授信额度" ctype="input" placeholder="是否使用授信额度" name="isUtilLmt"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtNo"></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo"></yu-xform-item>
            <yu-xform-item label="展期申请关联流水号" ctype="input" placeholder="展期申请关联流水号" name="extSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
            <yu-xform-item label="申请人" ctype="input" placeholder="申请人" name="inputIdDisplayname" disabled></yu-xform-item>
            <yu-xform-item label="申请人" ctype="input" placeholder="申请人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请时间" ctype="input" placeholder="申请时间" name="inputDate" disabled></yu-xform-item>
            <yu-xform-item label="申请机构" ctype="input" placeholder="申请机构" name="inputBrIdDisplayname" disabled></yu-xform-item>
            <yu-xform-item label="申请展期原因及还款措施" ctype="textarea" name="extReason" rules="required" placeholder="申请展期原因及还款措施" colspan="24"></yu-xform-item>
            <yu-xform-item label="申请人机构" ctype="input" placeholder="申请人机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doSave" v-if="btnVisibile">暂存</yu-button>
      <yu-button type="primary" @click="submit" v-if="btnVisibile">保存</yu-button>
      <yu-button type="primary" @click="back" v-if="btnVisibile">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CONT_TYPE,STD_ZB_APPR_STATUS');
export default {
  name: 'ExtInfo',
  props: {
    pageParams: Object
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpcontext/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpcontext/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      btnVisibile: true,
      formDisabled: false
    };
  },
  mounted () {
    if (this.pageParams.opType == 'ADD') {
      const userInfo = this.$xutils.getLoginUserInfo();
      this.formdata['inputId'] = userInfo.loginCode;
      this.formdata['inputIdDisplayname'] = userInfo.userName;
      this.formdata['inputBrId'] = userInfo.orgCode;
      this.formdata['inputBrIdDisplayname'] = userInfo.orgName;
      this.formdata['inputDate'] = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
    } else if (this.pageParams.opType == 'EDIT') {
      // 查询数据
    } else if (this.pageParams.opType == 'VIEW') {
      this.formDisabled = true;
      this.btnVisibile = false;
    }
  },
  methods: {
    // 保存
    doSave () {
      const data = this.formdata;
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisBiz + '/api/iqpcontext/save',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功');
            this.back();
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    submit: function () {
      let validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.doSave();
    },
    back () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
