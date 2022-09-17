<template>
  <div>
    <yu-tabs v-model="activeName2" type="card">
      <yu-tab-pane label="批复变更" name="preIn" >
        <yu-xform ref="prefForm" label-width="200px" v-model="preformdata" :rules="preRules" :disabled="formDisable">
          <yu-panel title="基本信息" is-collapse panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="主键" placeholder="主键" name="pkId" ctype="input" disabled hidden></yu-xform-item>
              <yu-xform-item label="申请流水号" placeholder="申请流水号" name="iqpSerno" ctype="input" hidden disabled></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="批复编号" name="replyNo" ctype="input"  disabled></yu-xform-item>
              <yu-xform-item label="产品名称" placeholder="产品名称" name="prdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="原批复信息" is-collapse panel-type="normal">
           <yu-xform-group :column="2">
            <yu-xform-item label="原批复额度" placeholder="原批复额度" name="oldReplyAmt" ctype="input"  disabled></yu-xform-item>
            <yu-xform-item label="原批复期限" placeholder="原批复期限" name="oldReplyTerm" ctype="input"  disabled></yu-xform-item>
            <yu-xform-item label="原批复利率" placeholder="原批复利率" name="oldReplyRate" ctype="yu-num" sign="%" :multiple="100" :precision="6" disabled></yu-xform-item>
            <yu-xform-item label="原还款方式" placeholder="原还款方式" name="oldRepayMode" ctype="select"  data-code="STD_REPAY_MODE" disabled></yu-xform-item>
            <yu-xform-item label="原担保方式" placeholder="原担保方式" name="oldGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" disabled></yu-xform-item>
            <yu-xform-item label="原用信条件" placeholder="原用信条件" name="oldLoanCond" ctype="textarea" colspan="20" disabled></yu-xform-item>
            <yu-xform-item label="原风控建议" placeholder="原风控建议" name="oldRiskAdvice" ctype="textarea" colspan="20" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="变更批复信息" is-collapse panel-type="normal">
           <yu-xform-group :column="2">
            <yu-xform-item label="批复变更额度" placeholder="批复变更额度 " name="replyAmtChg" ctype="yu-num" rules="required" :disabled="formDisable"></yu-xform-item>
            <yu-xform-item label="批复变更利率" placeholder="批复变更利率 " name="replyRateChg" ctype="yu-num" rules="required" sign="%" :multiple="100" :precision="6" :disabled="formDisable"></yu-xform-item>
            <yu-xform-item label="批复变更期限" placeholder="批复变更期限" name="replyTermChg" ctype="yu-currency" rules="required" :disabled="formDisable"></yu-xform-item>
            <yu-xform-item label="批复变更还款方式" placeholder="批复变更还款方式" name="repayModeChg" ctype="select" rules="required" data-code="STD_REPAY_MODE" :disabled="formDisable"></yu-xform-item>
            <yu-xform-item label="批复变更担保方式" placeholder="批复变更担保方式" name="guarModeChg" ctype="select" rules="required" data-code="STD_ZB_GUAR_WAY" :disabled="formDisable"></yu-xform-item>
            <yu-xform-item label="批复变更用信条件" placeholder="批复变更用信条件" name="loanCondChg" ctype="textarea" colspan="20" rules="required" :disabled="formDisable"></yu-xform-item>
            <yu-xform-item label="批复变更风控建议" placeholder="批复变更风控建议" name="riskAdviceChg" ctype="textarea" colspan="20" rules="required" :disabled="formDisable"></yu-xform-item>
          </yu-xform-group>
          </yu-panel>
           <yu-panel title="登记信息" is-collapse panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
           </yu-panel>
          <div class="yu-grpButton">
            <yu-button type="primary" v-if="!formDisable" @click="saveFn(null)">保存</yu-button>
            <yu-button type="primary" v-if="!formDisable" @click="saveFn('submit')">提交</yu-button>
            <yu-button type="primary" @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-tab-pane>
      <yu-tab-pane label="批复变更历史" name="his">
      <yu-xtable index selection-type="radio" ref="yutable" :data-url="urls.listUrl" style="width: 100%"
          condition-key="condition" request-type="POST" :base-params="searchData">
        <yu-xtable-column label="批复流水号" prop="replyNo" ></yu-xtable-column>
        <yu-xtable-column label="调查编号" prop="iqpSerno" ></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="原批复额度" prop="oldReplyAmt"></yu-xtable-column>
        <yu-xtable-column label="原批复期限" prop="oldReplyterm"></yu-xtable-column>
        <yu-xtable-column label="原批复利率" prop="oldReplyRate"></yu-xtable-column>
        <yu-xtable-column label="原担保方式" prop="oldGuarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="批复变更额度" prop="replyAmtChg"></yu-xtable-column>
        <yu-xtable-column label="批复变更利率" prop="replyRateChg"></yu-xtable-column>
        <yu-xtable-column label="批复变更期限" prop="replyTermChg"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
      </yu-tab-pane>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="successCbFn"></yufpNwfInit>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import { validator } from '@/utils/validate';
lookup.reg('STD_CARD_CUS_TYPE,STD_ZB_YES_NO,STD_ZB_CERT_TYP,STD_CARD_APPLY_TYPE,STD_CARD_APPLY_CARD_PRD,STD_CARD_APP_CHNL');
export default {
  data () {
    return {
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/lmtcrdreplyinfo/selectreplybypk',
        queryChgUrl: this.$backend.cmisBiz + '/api/lmtcrdreplychg/selectnew',
        saveUrl: this.$backend.cmisBiz + '/api/lmtcrdreplychg/saveorupdate',
        listUrl: this.$backend.cmisBiz + '/api/lmtcrdreplychg/selectbymodel',
        queryContUrl: this.$backend.cmisBiz + '/api/ctrloancont/queryctrloancontdatabyiqperno'
      },
      activeName2: 'preIn',
      preformdata: {},
      formDisable: false,
      searchData: {
        condition: {
          inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
          replyNo: this.$route.query.replySerno
        }
      }
    };
  },
  mounted: function () {
    if (this.$route.query.type == 'add') {
      this.formDisable = false;
    } else {
      this.formDisable = true;
    }
    var _this = this;
    this.$request({
      url: this.urls.queryUrl,
      method: 'POST',
      data: {replySerno: this.$route.query.replySerno}
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data, _this.preformdata);
        this.preformdata.iqpSerno = data.surveySerno;
        this.preformdata.replyNo = data.replySerno;
        this.preformdata.oldReplyTerm = data.appTerm;
        this.preformdata.oldReplyRate = data.execRateYear;
        this.preformdata.oldReplyAmt = data.replyAmt;
        this.preformdata.oldRepayMode = data.repayMode;
        this.preformdata.oldGuarMode = data.guarMode;
        this.preformdata.oldLoanCond = data.loanCond;
        this.preformdata.oldRiskAdvice = data.riskAdvice;
        this.preformdata.replyTermChg = data.appTerm;
        this.preformdata.replyAmtChg = data.appTerm;
        this.preformdata.replyRateChg = data.execRateYear;
        this.preformdata.replyAmtChg = data.replyAmt;
        this.preformdata.repayModeChg = data.repayMode;
        this.preformdata.guarModeChg = data.guarMode;
        this.preformdata.loanCondChg = data.loanCond;
        this.preformdata.riskAdviceChg = data.riskAdvice;
      }
    });
    this.$request({
      url: this.urls.queryChgUrl,
      method: 'POST',
      data: {replyNo: this.$route.query.replySerno}
    }).then(({code, message, data}) => {
      if (code == '0') {
        if (data != null) {
          clone(data, _this.preformdata);
        }
      }
    });
  },
  methods: {
    // 新增/修改的保存方法
    saveFn (callback) {
      var _this = this;
      let validate = false;
      this.$refs.prefForm.validate(valid => {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.$request({
        url: this.urls.saveUrl,
        method: 'POST',
        data: this.preformdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.$message({message: '保存成功', type: 'success'});
          _this.preformdata.pkId = data.pkId;
          if (callback) {
            this[callback](data.pkId); // 执行提交方法
          }
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });
    },
    submit (pkId) {
      var _this = this;
      // 1、只针对合同状态为未生效或者空的合同通过，其余拦截提示“合同状态不符合要求”
      // 2、按揭类业务申请，合同超过三个月未签订合同，提示客户“合同已超三个月未签订，不允许变更”
      // 3、非按揭类业务申请，合同超过一个月未签订合同，提示客户“合同已超月个月未签订，不允许变更”
      this.$request({
        url: this.urls.queryContUrl,
        method: 'POST',
        data: this.preformdata.surveySerno
      }).then(({code, message, data}) => {
        if (code == '0') {
          var contStatus = data.contStatus;
          var s = this.$xutils.dateFormat('yyyy-MM-dd', new Date(data.contStartDate));
          var e = this.$xutils.dateFormat('yyyy-MM-dd', new Date(data.signDate));
          if (contStatus != '100' && contStatus != '' && contStatus != null) {
            this.$message({message: '合同状态为：' + contStatus + '不符合要求!', type: 'error'});
          } else {
            if (data.signDate != null && data.signDate != '' && data.contStartDate != '' && data.contStartDate != null) {
              _this.confirmTerm(data.prdId, s, e, pkId);
            } else {
              _this.commit(pkId);
            }
          }
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });
    },
    confirmTerm (prdId, s, e, pkId) {
      var _this = this;
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
        data: prdId,
        callback: function (code, message, response) {
          if (response.data.catalogId == 'C000700020001') {
            _this.$request({
              method: 'POST',
              url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
              data: {startDate: s, endDate: e}
            }).then(({code, message, data}) => {
              if (code == 0) {
                if (data != null) {
                  if (data > '3') {
                    _this.$message({message: '合同已超三个月未签订，不允许变更', type: 'warning'});
                  } else {
                    _this.commit(pkId);
                  }
                }
              } else {
                _this.$message({message: message, type: 'warning'});
              }
            });
            // 非按揭类
          } else if (response.data.catalogId == 'C000700020002') {
            _this.$request({
              method: 'POST',
              url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
              data: {startDate: s, endDate: e}
            }).then(({code, message, data}) => {
              if (code == 0) {
                if (data != null) {
                  if (data > '1') {
                    _this.$message({message: '合同已超1个月未签订，不允许变更', type: 'warning'});
                  } else {
                    _this.commit(pkId);
                  }
                }
              } else {
                _this.$message({message: message, type: 'warning'});
              }
            });
          }
        }
      });
    },
    commit (pkId) {
      var bizType = 'LS009';
      const startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.org.code;
      startdto.userId = this.$store.state.oauth.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = this.$route.query.replySerno;
      startdto.bizUserName = this.preformdata.cusName;
      startdto.bizUserId = this.preformdata.cusId;
      startdto.param = {
        replyNo: this.preformdata.replyNo
      };
      this.$refs.yufpNwfInit.wfInit(startdto);
    },
    successCbFn () {
      yufp.router.removeTab(this.$route.path);
    },
    // 清空
    clearFn () {
      this.$refs.prefForm.resetFields();
    },
    // 取消
    cancelFn () {
      this.$refs.prefForm.resetFields();
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({name: this.routeName});
    },
    getFormdata () {
      var _this = this;
      this.$request({
        url: this.urls.queryUrl,
        method: 'POST',
        data: {
          serno: this.serno
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          clone(data, this.preformdata);
          _this.changeFlag = true;
          _this.cusType = data.cardCusType;
          _this.oldApplyCardPrd = data.applyCardPrd;
          if (data.applyType == null || data.applyType == '') {
            _this.preformdata.applyType = 'A';
          }
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    }
  }
};
</script>