<template>
  <!--
    @created by 屈文
    @description 授信批复
  -->
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata" disabled>
      <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata" :disabled="form1Disabled">
          <yu-xform-group>
            <yu-xform-item label="业务流水号" ctype="input" name="grpSerno" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="lmtType" :rules="baseFormRules[0]" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" :rules="baseFormRules[0]" disabled></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" :rules="baseFormRules[0]" disabled></yu-xform-item>
            <yu-xform-item label="审批模式" ctype="input" name="apprMode" :rules="baseFormRules[0]" disabled data-code="STD_APPR_MODE"></yu-xform-item>
            <yu-xform-item label="经办客户经理" ctype="input" name="managerId" :rules="baseFormRules[0]" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" name="managerBrId" :rules="baseFormRules[0]" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="集团授信额度情况" :hideFilter="false" :collapseHide="false">
        <yu-panel title="" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtCheck" label-width="100px" v-model="lmtCheckFormData">
            <yu-xform-group :column="1">
              <yu-xform-item label="用信审核方式" ctype="select" name="loanApprMode" :rules="baseFormRules[0]" data-code="STD_LOAN_APPR_MODE"></yu-xform-item>
              <yu-xform-item label="授信期限" ctype="input" name="lmtTerm" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-xtable ref="refTable" row-number :data="lmtMemberInfo" selection-type="radio" request-type="POST" show-summary="true">
          <yu-xtable-column label="单一客户申请流水号" prop="singleSerno" hide-column></yu-xtable-column>
          <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="成员客户类型" prop="cusType" data-code="NATIONALITY"></yu-xtable-column>
          <yu-xtable-column label="敞口额度合计（元）" prop="openTotalLmtAmt"></yu-xtable-column>
          <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
          <yu-xtable-column label="操作" width="120">
            <template slot-scope="scope">
              <a class="underline" @click="editSub(scope.row)">修改</a>
              <a class="underline" @click="dropPlanRegister(scope.row)">压降计划登记</a>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="集团贷后管理要求" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="pspManaNeed" label-width="100px" v-model="pspManaNeedFormData">
            <yu-xform-group :column="1">
              <yu-xform-item label="贷后管理要求" ctype="textarea" name="pspManaNeed" :rules="baseFormRules[0]"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      <!--<yu-panel title="审批意见" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="apprAdvice" label-width="100px" v-model="apprAdviceFormdata" :disabled="form3Disabled">
          <yu-xform-group>
            <yu-xform-item label="审批结论" ctype="input" name="apprResult" :rules="baseFormRules[0]" disabled="true" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            <yu-form-buttons align="center">
              <yu-button type="primary" @click="viewApproverOpinions">查看审批人意见</yu-button>
              <yu-button type="primary" @click="viewApprFlowTrail">查看审批流程轨迹</yu-button>>
            </yu-form-buttons>
            <yu-xform-item label="意见详情" ctype="textarea" name="" :rules="baseFormRules[0]" v-if="opinionInfo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>-->
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="transfer">转办</yu-button>
      <yu-button type="primary" @click="save">保存</yu-button>
      <yu-button type="primary" @click="commit">提交 </yu-button>
      <yu-button type="primary" @click="viewReplyReport">查看批复报告</yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('NATIONALITY,PUBLISH_STATUS,STD_SX_LMT_TYPE,EDUCATION_TYPE,IDENT_TYPE，STD_ZB_YES_NO');
// import { sessionStore } from 'xy-utils';
export default {
  data: function () {
    return {
      expandCollapseName: ['base'],
      viewType: 'DETAIL',
      opinionInfo: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      baseFormdata: {},
      lmtCheckFormData: {},
      pspManaNeedFormData: {},
      apprAdviceFormdata: {},
      lmtMemberInfo: []
    };
  },

  mounted () {
    var _this = this;
    // let grpSerno = _this.$route.meta.params.grpSerno;
    let data = _this.$route.meta.params;
    let grpSerno = data.grpSerno;
    // let lmtType = data.lmtType;
    // 客户成员列表信息
    _this.initMemberInfo(grpSerno);
    // 基本信息表单数据
    _this.initLmtBasicInfo(grpSerno);
  },

  methods: {
    // 成员客户列表信息
    initMemberInfo: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpmemrelbygrpsernoandmgr',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtMemberInfo = response.data;
        }
      });
    },

    // 基本信息表单数据
    initLmtBasicInfo: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpappr/querylmtgrpapprbygrpserno',
        data: {grpSerno: grpSerno},
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.baseFormdata);
          yufp.clone(response.data, _this.lmtCheckFormData);
          yufp.clone(response.data, _this.pspManaNeedFormData);
          yufp.clone(response.data, _this.apprAdviceFormdata);
          if (_this.apprAdviceFormdata.apprResult == '992' || _this.apprAdviceFormdata.apprResult == '993' || _this.apprAdviceFormdata.apprResult == '998') { _this.opinionInfo = true }
        }
      });
    },

    // 授信额度是否可调剂
    isAdjust: function (data) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/finishlmtgrpmemrelstatusbygrpsernoandmgr',
        // /api/lmtgrpmemrel/finishlmtgrpmemrelstatusbygrpsernoandmgr
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('保存成功');
          } else {
            _this.$message('保存失败');
            return;
          }
        }
      });
    },

    // 转办
    transfer: function () {

    },

    // 保存
    save: function () {
      var _this = this;
      var grpSerno = _this.baseFormdata.grpSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/finishlmtgrpmemrelstatusbygrpsernoandmgr',
        data: grpSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('提交成功');
          } else {
            _this.$message('提交失败');
            return;
          }
        }
      });
    },

    /**
     *  提交按钮，保存到数据库中
     */
    commit: function () {
      // var _this = this;
      // var grpSerno = _this.baseFormdata.grpSerno;
      // yufp.service.request({
      //   method: 'POST',
      //   url: backend.cmisBiz + '/api/lmtgrpmemrel/finishlmtgrpmemrelstatusbygrpsernoandmgr',
      //   data: grpSerno,
      //   callback: function (code, message, response) {
      //     if (response.code == '0000') {
      //       _this.$message('提交成功');
      //     } else {
      //       _this.$message('提交失败');
      //       return;
      //     }
      //   }
      // });
    },

    // 查看批复报告
    viewReplyRoport: function () {

    },

    // 查看审批人意见
    viewApproverOpinions: function () {

    },

    // 查看审批流程轨迹
    viewApprFlowTrail: function () {

    },

    /**
     *  修改
     */
    editSub: function (data) {
      var _this = this;
      _this.isAdjust(data);
      var singleSerno = data.singleSerno;
      var op = 'EDIT';
      _this.jumpFactoryBySerno(singleSerno, op);
    },

    // 调单一客户模板工厂
    jumpFactoryBySerno: function (singleSerno, op) {
      var jsoPar = {};
      jsoPar['model_group_no'] = 'CMG000106';
      jsoPar['op'] = op;
      jsoPar['serno'] = singleSerno;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    },

    /**
     *  压降计划登记
     */
    dropPlanRegister: function (data) {
      // var _this = this;
      // var singleSerno = data.singleSerno;
      // var op = 'VIEW';
      // _this.jumpFactoryBySerno(singleSerno, op);
    },

    /**
     *  退回按钮
     */
    back: function () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
