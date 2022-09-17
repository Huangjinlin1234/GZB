
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="批复基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="160px" v-model="formdata" :rules="rules">
        <yu-xform-group>
          <yu-xform-item label="批复编号" disabled ctype="input" name="replySerno"></yu-xform-item>
          <yu-xform-item label="批复生效日期" disabled ctype="input" name="startDate"></yu-xform-item>
          <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
          <yu-xform-item label="审批结论" disabled ctype="select" name="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          <yu-xform-item label="批复状态" disabled ctype="select" name="replyStatus" data-code="STD_REPLY_STATUS"></yu-xform-item>
          <yu-xform-item label="责任人" disabled ctype="input" name="managerIdName"></yu-xform-item>
          <yu-xform-item label="责任机构" disabled ctype="input" name="managerBrIdName"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="授信额度情况" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="标准化投资类型" disabled ctype="select" name="normalInvestType" data-code="STD_ZB_NORM_INVEST_TYPE"></yu-xform-item>
            <yu-xform-item label="是否循环" ctype="select" name="isRevolv" data-code="STD_ZB_YES_NO" :rules="rules[0]" disabled></yu-xform-item>
            <yu-xform-item label="币种:" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" :rules="rules[0]" disabled></yu-xform-item>
            <yu-xform-item label="利率（%）" :disabled="disable" ctype="yu-num" sign="%" :multiple="100" name="rate" :rules="rules[0]"></yu-xform-item>
            <yu-xform-item label="授信金额(万元)" :disabled="disable" ctype="yu-num" name="lmtAmt" number-formatter="0,000" maxlength="14" :rules="rules[0]"></yu-xform-item>
            <yu-xform-item label="授信期限" :disabled="disable" ctype="input" name="lmtTerm" :rules="rules[0]"></yu-xform-item>
            <yu-xform-item label="债项评级日期" disabled ctype="datepicker" name="debtEvalDate" ></yu-xform-item>
            <yu-xform-item label="债项评级结果" disabled ctype="select" name="debtEvalResult" data-code="STD_ZB_DEBT_EVAL_RESULT" ></yu-xform-item>
            <yu-xform-item label="评级机构" disabled ctype="select" data-code="STD_DEBT_EVAL_ORG" name="debtEvalOrgName" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="变更情况说明" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="变更流水号" disabled ctype="input" name="serno"></yu-xform-item>
            <yu-xform-item label="登记日期" disabled ctype="input" name="inputDate"></yu-xform-item>
            <yu-xform-item label="变更事项说明" ctype="textarea" name="replyChgContentMemo" colspan="24" :disabled="disable" :rules="rules[0]"></yu-xform-item>
            <yu-xform-item label="登记人" disabled ctype="input" name="inputIdName"></yu-xform-item>
            <yu-xform-item label="登记机构" disabled ctype="input" name="inputBrIdName"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </yu-panel>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="doSave" v-show="newDefined1">保存</yu-button>
      <yu-button type="primary" @click="submitFn" v-show="newDefined1">提交</yu-button>
      <yu-button type="primary" @click="goBack">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg(
  'STD_ZB_APPR_STATUS,STD_REPLY_STATUS,STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_ZB_NORM_INVEST_TYPE,STD_ZB_DEBT_EVAL_RESULT,STD_DEBT_EVAL_ORG'
);
export default {
  components: { YufpDemoSelector, yufpNwfInit },
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      disable: false,
      newDefined1: true,
      formdata: {},
      chgdata: {},
      replyChg: {},
      serno: '',
      dataUrl: '',
      dataParam: '',
      accNo: '',
      formDisabled: false,
      saveBtnShow: true,
      op: '',
      // rules: {
      //   replyChgContentMemo: [
      //     { required: true, message: "请输入变更事项说明", trigger: "blur" },
      //   ],
      // },
      rules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
    };
  },
  mounted () {
    var _this = this;
    if (this.pageParams) {
      this.serno = this.pageParams.serno;
      this.op = this.pageParams.op;
      this.cusId = this.pageParams.cusId;
    } else if (this.$route.meta.params) {
      _this.serno = _this.$route.meta.params.serno;
      _this.replySerno = _this.$route.meta.params.replySerno;
      _this.op = this.$route.meta.params.viewType;
    }
    if (this.op == 'DETAIL') {
      this.disable = true;
      this.newDefined1 = false;
    }
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtsiginvestchgreply/selectBySerno',
        data: JSON.stringify({ serno: _this.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            // 反显字段
            yufp.clone(response.data, _this.formdata);
            _this.formdata.investAmt = parseFloat(
              parseFloat(response.data.investAmt / 10000).toFixed()
            );
            _this.formdata.lmtAmt = parseFloat(
              parseFloat(response.data.lmtAmt / 10000).toFixed()
            );

            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    doSave: function () {
      return new Promise((resolve, reject) => {
        var _this = this;
        var validate = false;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        var model = {};
        yufp.clone(_this.formdata, model);
        model.investAmt = parseFloat(parseFloat(model.investAmt * 10000).toFixed());
        model.lmtAmt = parseFloat(parseFloat(model.lmtAmt * 10000).toFixed());
        _this
          .$request({
            method: 'POST',
            url: _this.$backend.cmisBiz + '/api/lmtsiginvestchgreply/updateReplyChg',
            data: model
          })
          .then((data) => {
            if (data.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              resolve();
            } else {
              _this.$message({ message: '保存失败', type: 'error' });
            }
          });
      });
    },
    // 提交操作
    submitFn () {
      var _this = this;
      _this.doSave().then(res => {
        var obj = _this.formdata;
        const loginUser = this.$xutils.getLoginUserInfo();
        let dutysArry = []; //  loginUser.dutys
        for (let i = 0; i < loginUser.dutys.length; i++) {
          dutysArry.push(loginUser.dutys[i].code);
        }
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = _this.$store.state.oauth.loginCode;
        startdto.userId = _this.$store.state.oauth.loginCode;
        startdto.bizType = 'TY017'; // 修改为主体授信批复变更申请流程code
        startdto.bizId = obj.serno; // this.getFactory().contextData.surveySerno;
        startdto.bizUserName = obj.cusName; // this.d1_A_BillCard.getItemValue('cusName');
        startdto.bizUserId = obj.cusId; // this.d1_A_BillCard.getItemValue('cusId');
        startdto.bizPkId = obj.pkId;
        startdto.param = {
          userId: _this.$store.state.oauth.loginCode,
          BizPkId: obj.pkId,
          dutyOrgType: loginUser.org.orgType, // 客户经理所属机构类型  分行、支行、小微、非客户经理
          dutys: dutysArry.join(',')
        };
        startdto.param.tableName = 'lmtSigInvestChgReply';
        _this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    forceUpdate () {
      this.goBack();
    },
    // 返回
    goBack: function () {
      yufp.globalEventBus.$emit('refreshLmtSigInvestReplyTable1');
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
