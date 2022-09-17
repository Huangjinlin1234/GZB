<template>
  <div>
    <div>
    <yu-xform ref="refForm" label-width="180px" :form-type="formType" v-model="formdata" :disabled="disabledForm">
      <yu-panel title="贷款基本信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="iqpSerno" rules="required" ctype="input" disabled  placeholder="业务流水号"></yu-xform-item>
          <yu-xform-item label="借据编号" name="billNo" rules="required" ctype="input" disabled placeholder="借据编号"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" disabled placeholder="客户编号"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" disabled placeholder="客户名称"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" rules="required" ctype="input" disabled placeholder="合同编号"></yu-xform-item>
          <yu-xform-item label="贷款金额" name="loanAmt" rules="required"  ctype="yu-currency" disabled :min="0" placeholder="贷款金额"></yu-xform-item>
          <yu-xform-item label="贷款起始日" name="loanStartDate" rules="required"  ctype="datepicker" disabled placeholder="贷款起始日"></yu-xform-item>
          <yu-xform-item label="贷款到期日" name="loanEndDate" rules="required"  ctype="datepicker" disabled placeholder="贷款到期日"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="原利率信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="原利率调整方式" name="oldRateAdjMode" ctype="select" data-code="STD_RATE_ADJ_MODE" disabled placeholder="原利率调整方式"></yu-xform-item>
          <yu-xform-item label="原LPR授信利率区间" name="oldLprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" disabled placeholder="原LPR授信利率区间"></yu-xform-item>
          <yu-xform-item label="原LPR利率" name="oldCurtLprRate" ctype="yu-num" placeholder="原LPR利率" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原浮动点数" name="oldRateFloatPoint" ctype="yu-num" placeholder="原浮动点数" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原执行利率(年)" name="oldExecRateYear" ctype="yu-num" placeholder="原执行利率(年)" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原逾期利率浮动比" name="oldOverdueRatePefloat" ctype="yu-num" placeholder="原逾期利率浮动比" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原逾期执行利率(年利率)" name="oldOverdueExecRate" ctype="yu-num" placeholder="原逾期执行利率(年利率)" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原复息利率浮动比" name="oldCiRatePefloat" ctype="yu-num" placeholder="原复息利率浮动比" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原复息执行利率(年利率)" name="oldCiExecRate" ctype="yu-num" placeholder="原复息执行利率(年利率)" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原利率调整选项" name="oldRateAdjType" ctype="select" data-code="STD_ZB_REPC_OPT" placeholder="原利率调整选项" disabled colspan="8"></yu-xform-item>
          <yu-xform-item label="" name="oldNextRateAdjInterval" ctype="select" placeholder="原下一次利率调整间隔" disabled  data-code="STD_ZB_TERM_UNIT" colspan="4"></yu-xform-item>
          <yu-xform-item label="原下一次利率调整间隔单位" name="oldNextRateAdjUnit" ctype="input" placeholder="" disabled></yu-xform-item>
          <yu-xform-item label="原第一次调整日" name="oldFirstAdjDate" ctype="input" placeholder="原第一次调整日" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="变更后利率信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="利率调整方式" name="rateAdjMode" rules="required"  ctype="select" data-code="STD_RATE_ADJ_MODE" placeholder="利率调整方式"></yu-xform-item>
          <yu-xform-item label="" name="custom"  ctype="custom"><div></div></yu-xform-item>
          <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" rules="required"  ctype="select" data-code="STD_LPR_RATE_INTVAL"  placeholder="LPR授信利率区间" ></yu-xform-item>
          <yu-xform-item label="LPR利率" name="curtLprRate" ctype="yu-num" rules="required"  placeholder="LPR利率"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="yu-num"  placeholder="浮动点数"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" rules="required"   placeholder="执行利率(年)"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="yu-num" rules="required"   placeholder="逾期利率浮动比"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num"  placeholder="逾期执行利率(年利率)"  sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="yu-num" rules="required"  placeholder="复息利率浮动比"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" rules="required"  placeholder="复息执行利率(年利率)"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="input" rules="required"   placeholder="利率调整选项"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" rules="required"  ctype="input"  placeholder="下一次利率调整间隔"  colspan="8"></yu-xform-item>
          <yu-xform-item label="" name="nextRateAdjUnit" rules="required"  ctype="select" data-code="STD_ZB_TERM_UNIT"  placeholder="下一次利率调整间隔单位" colspan="4"></yu-xform-item>
           <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="datepicker" rules="required"  placeholder="第一次调整日"></yu-xform-item>
          <yu-xform-item label="调整后利率生效日" name="newInureDate" ctype="input" rules="required"  placeholder=""></yu-xform-item>
          <yu-xform-item label="补充协议签订日期" name="paperContSignDate" ctype="input" rules="required" hidden  placeholder="补充协议签订日期"></yu-xform-item>
          <yu-xform-item label="利率变更原因" name="appResn" ctype="textarea" :rows="3" :colspan="24"  placeholder="利率变更原因"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="登记人" name="inputId" ctype="input" disabled placeholder="登记人"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
          <yu-xform-item label="责任人" name="managerId" ctype="input" disabled placeholder="责任人"></yu-xform-item>
          <yu-xform-item label="责任机构" name="managerBrId" ctype="input" disabled placeholder="责任机构"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" disabled placeholder="登记日期"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="tempSave" v-if="pageParams.opType !== 'VIEW'">暂存</yu-button>
      <yu-button type="primary" @click="submit" v-if="pageParams.opType !== 'VIEW'">提交</yu-button>
      <yu-button type="primary" @click="back" >返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpratechgapp/update',
      formdata: {},
      formType: 'edit',
      formRules: { },
      disabledForm: false
    };
  },
  mounted () {
    this.initData();
    // 查询时不可编辑
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    } else if (this.pageParams.opType == 'EDIT') {
      // 签订的时候只能修改 补充协议签订日期
      if (this.pageParams.opDetialType == 'SIGN') {
        this.disabledForm = true;
        // 显示补充协议签订日期
        this.$refs.refForm.setItemHidden('paperContSignDate', false);
      }
    }
  },
  methods: {
    initData: function () {
      let _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqpratechgapp/' + this.pageParams.iqpSerno,
        method: 'post'
      }).then(({code, message, data}) => {
        if (data) {
          yufp.clone(data, _this.formdata);
        }
      });
    },
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    commit () {
      // 保存
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      const saveResult = this.tempSave();
      if (!saveResult || saveResult.code != '0') {
        return;
      }
      const iqpSerno = this.formdata.iqpSerno;
      const billNo = this.formdata.billNo;
      if (!this.isExistChgBiz(iqpSerno, billNo)) {
        return;
      }
      var _this = this;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.org.code;
      startdto.userId = _this.userCode;
      startdto.bizId = this.formdata.taskSerno;
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;
      startdto.param = {};
      // 小微
      if (this.formdata.belgLine == '01') {
        startdto.bizType = 'BG004';
      }
      // 零售
      if (this.formdata.belgLine == '02') {
        startdto.bizType = 'BG003';
        startdto.param = {
            isPc: '1', // 是否pc端发起:1-是,0-否
            isLsOrg: '1', // 是否零售支行:1-是,0-否
            isZh: '1', // 是否支行:1-是,0-否
            approvalModel: '01', // 审批模式：01单签模式 07双签模式一 08双签模式二 05贷审会模式
            isInteRiskLvl: '0', // 是否综合风险等级为A
            isLimitFlag: '0', // 是否自动审批
            isOfferRateMax: '0', // 是否大于等于报价利率
            ruleRiskLvl: 'D', // 规则风险等级
            isRelationSuperPower: '0', // 关联方交易是否超权 0-否,1-是
            appAmt: '0', // 授信申请金额
            prdT: '11', // 10-按揭，11-非按揭
            isSgh16: '0', // 是否资产保全客户经理  0-否,1-是
            isRaise: '0', // 是否上调权限:1-是,0-否
            powerFlag: 'false:', 
            orgType: _this.$store.state.oauth.org.orgType
        };
      }
      var contCurType = _this.search(this.formdata.billNo, this.formdata.contNo);
      // 对公人民币
      if (this.formdata.belgLine == '03' && contCurType != 'CNY') {
        startdto.bizType = 'BG002';
      }
      // 对公外币
      if (this.formdata.belgLine == '03' && contCurType == 'CNY') {
        startdto.bizType = 'BG001';
      }
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    tempSave () {
      let jsoRt = null;
      var jsoCardData = this.formdata; // 先取得表单的数据
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: jsoCardData,
        async: false,
        success: (response) => {
          if (response.code == '0') {
            jsoRt = response;
            this.$message('更新成功!');
            // 回调数据
            this.pageParams.callback && this.pageParams.callback();
            this.back();
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
      return jsoRt;
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    cancelFn: function () {
      this.getFactory.back();
    },
    search (billNo, contNo) {
      let contCurType = null;
      this.$request({
        url: this.$backend.cmisBiz + '/api/accloan/selectCurType',
        method: 'post',
        data: { billNo, contNo },
        async: false,
        success: (response) => {
          if (response.code == '0') {
            contCurType = response;
          }
        }
      });
      return contCurType;
    }
  }
};
</script>
