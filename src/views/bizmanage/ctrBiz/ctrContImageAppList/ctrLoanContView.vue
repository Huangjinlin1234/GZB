<template>
  <!--
    @created by 王玉坤 20210504
    @description 模板示例——分组表单
  -->
  <div>
    <div>
      <!-- 借款合同修改 -->
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="借款合同" name="first">
          <yu-xform ref="refBaseForm" label-width="100px" v-model="baseFormdata" :disabled="true">
            <yu-panel title="借款人信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="申请流水号" ctype="input" name="iqpSerno" disabled></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
                <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
                <yu-xform-item label="证件号码" ctype="input" name="certCode" disabled></yu-xform-item>
                <yu-xform-item label="手机号码" ctype="input" name="phone" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="借款合同信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="合同编号" ctype="input" name="contNo" disabled></yu-xform-item>
                <yu-xform-item label="中文合同编号" ctype="input" name="contCnNo" disabled></yu-xform-item>
                <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled></yu-xform-item>
                <yu-xform-item label="金额" ctype="input" name="contAmt" :disabled="disabledflg" :rules="numberRules"></yu-xform-item>
                <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled></yu-xform-item>
                <yu-xform-item label="用途" ctype="input" name="loanUse" disabled></yu-xform-item>
                <yu-xform-item label="币种" ctype="input" name="curType" disabled :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="合同模式" ctype="select" data-code="STD_CONT_MODE" name="contMode" :disabled="disabledflg"></yu-xform-item>
                <yu-xform-item label="是否在线抵押" ctype="select" data-code="STD_ZB_YES_NO" name="isOlPld" :disabled="disabledflg"></yu-xform-item>
                <yu-xform-item label="期限" ctype="input" name="contTerm" disabled></yu-xform-item>
                <yu-xform-item label="合同到期日" ctype="input" name="contEndDate" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="借款利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_LOAN_RATE_ADJ_DAY"  :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="当前LPR利率（%）" name="curtLprRate" ctype="yu-num" disabled sign="%" :multiple="100" :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="LPR定价区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" disabled :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="执行年利率" name="execRateYear" ctype="yu-num" disabled sign="%" :multiple="100" ></yu-xform-item>
                <yu-xform-item label="LPR浮动点（BP）" name="rateFloatPoint" ctype="yu-num" disabled :rules="baseFormRules[0]"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="结息方式" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="结息方式" ctype="select" name="eiMode" data-code="STD_EI_MODE" disabled :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="具体说明" ctype="input" name="eiModeExpl" :disabled="disabledflg" :rules="baseFormRules[0]"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE" :disabled="disabledflg" :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="天数限制" ctype="input" :disabled="disabledflg" name="dayLimit" :rules="editRules"></yu-xform-item>
              </yu-xform-group>
              <yu-form-buttons align="left">
                <yu-button @click="drawAdd" type="primary" round :disabled="disabledflg">新增</yu-button>
              </yu-form-buttons>
              <yu-xtable ref="refDrawTable" row-number :base-params="searchFormdata" border :data="drawData" width="800">
                <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
                <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
                <yu-xtable-column label="提款日期" prop="drawDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
                <yu-xtable-column label="提款金额" prop="drawAmt" width="300" align="center" ctype="input"></yu-xtable-column>
                <yu-xtable-column label="操作" prop="opr" align="center">
                  <template slot-scope="drawScope">
                    <yu-button size="small" type="primary" :disabled="disabledflg" @click="drawSave(drawScope.$index, drawScope.row)">保存</yu-button>
                    <yu-button size="small" type="danger" :disabled="disabledflg" @click.stop="drawDelete(drawScope.$index, drawScope.row)">删除</yu-button>
                  </template>
                </yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="支付方式" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_ZB_DZZC_ZFFS" disabled :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="账户名" ctype="input" name="loanPayoutAccName" :disabled="disabledflg" :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="账号" ctype="input" name="loanPayoutAccno" :disabled="disabledflg" :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="开户行" ctype="select" name="acctsvcrName" disabled :rules="baseFormRules[0]"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" :disabled="disabledflg">
              <yu-xform-group>
                <yu-xform-item label="还款方式" ctype="select" name="repayType" @change="otherHin(baseFormdata.repayType)" :disabled="disabledflg"></yu-xform-item>
                <yu-xform-item label="具体说明" ctype="input" name="dayLimit" hide-column="false" :disabled="disabledflg" :hidden="hiddenFlg"></yu-xform-item>//还款方式为其他时才显示
              </yu-xform-group>
              <yu-form-buttons align="left">
                <yu-button @click="repayAdd" type="primary" round :disabled="disabledflg">新增</yu-button>
              </yu-form-buttons>
              <yu-xtable ref="refRepayTable" row-number :base-params="searchFormdata" border :data="repayData" width="800">
                <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
                <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
                <yu-xtable-column label="计划还款日期" prop="planRepayDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
                <yu-xtable-column label="计划还款金额" prop="planAmt" width="300" align="center" ctype="input"></yu-xtable-column>
                <yu-xtable-column label="操作" prop="opr" align="center">
                  <template slot-scope="repayScope">
                    <yu-button size="small" type="primary" :disabled="disabledflg" @click="repaySave(repayScope.$index, repayScope.row)">保存</yu-button>
                    <yu-button size="small" type="danger" :disabled="disabledflg" @click="repayDelete(repayScope.$index, repayScope.row)">删除</yu-button>
                  </template>
                </yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="担保方式" :hideFilter="false" :collapseHide="false" :rules="baseFormRules[0]">
              <yu-xform-group>
                <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="送达地址确认" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="联系人" ctype="input" name="linkman" disabled :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="地址" ctype="input" name="addr" disabled :rules="baseFormRules[0]"></yu-xform-item>
                <yu-xform-item label="电话" ctype="input" name="phone" disabled :rules="phoneRules"></yu-xform-item>
                <yu-xform-item label="传真" ctype="input" name="fax" :disabled="disabledflg"></yu-xform-item>
                <yu-xform-item label="邮箱" ctype="input" name="email" :disabled="disabledflg" :rules="emailRules"></yu-xform-item>
                <yu-xform-item label="QQ" ctype="input" name="qq" :disabled="disabledflg"></yu-xform-item>
                <yu-xform-item label="微信" ctype="input" name="wechat" :disabled="disabledflg"></yu-xform-item>
                <yu-xform-item label="其他通讯方式及账号" ctype="input" name="otherPhone" :disabled="disabledflg"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记人电话" ctype="input" name="inputIdPhone" disabled></yu-xform-item>
                <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled></yu-xform-item>
                <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled></yu-xform-item>
                <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-xform>
        </yu-tab-pane>
        <yu-tab-pane label="分析信息录入" name="tab2">
          <yu-xform ref="loanDirection" label-width="100px" v-model="loanDirectiondata">
            <yu-panel title="分析信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="贷款投向" ctype="input" name="loanDirection" :disabled="disabledflg"></yu-xform-item>
                <yu-xform-item label="贷款投向名称" ctype="input" name="loanDirectionName" :disabled="disabledflg"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-xform>
        </yu-tab-pane>
        <yu-tab-pane label="影像资料" name="tab3">
          <imageSystem v-if="activeName == 'tab3'" authority="import;download" :s="2" :para="imageBizParam"></imageSystem>
        </yu-tab-pane>
        <yu-tab-pane label="审批历史意见" name="tab4">
          <processTrajectory v-if="activeName == 'tab4'" :page-params="otherParams"> </processTrajectory>
        </yu-tab-pane>
      </yu-tabs>
    </div>
    <div>
      <yu-form-buttons align="center">
        <!--<yu-button type="primary" @click="submitFn">提交</yu-button>-->
        <yu-button type="primary" @click="returnFn">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import tempetfactorypreviewIndex from '@/views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import processTrajectory from '@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/processTrajectory';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_IR_ADJUST_TYPE,STD_LOAN_RATE_ADJ_DAY,STD_LPR_RATE_INTVAL,STD_EI_MODE,STD_DRAW_MODE,STD_ZB_DZZC_ZFFS,STD_ZB_GUAR_WAY,STD_CONT_MODE,STD_ZB_YES_NO');
export default {
  components: { tempetfactorypreviewIndex, imageSystem, processTrajectory },
  data: function () {
    return {
      activeName: 'first',
      expandCollapseName: ['base'],
      otherParams: {},
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'number',
          required: true,
          message: '请输入数字',
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
      familyFormRules: [
        {
          validator: yufp.validator.number
        }
      ],
      numberRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
      phoneRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'phone', message: '请输入正确的号码', trigger: 'blur' }],
      emailRules: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
      baseFormdata: {},
      familyFormdata: {},
      otherFormdata: {},
      drawData: [],
      repayData: [],
      dialogFormVisibleAdd: false,
      disabledflg: true,
      hiddenFlg: true,
      pageParams: {}
    };
  },
  mounted () {
    var _this = this;
    var contNo = _this.$route.meta.params.contNo;
    var params;
    _this.otherParams.serno = _this.$route.meta.params.iqpSerno;
    console.log('<<<<<<<<<<_this.$route.params>>>>ctrLoanContView', _this.$route.meta.params);
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
      async: false,
      data: {
        contNo: contNo
      },
      callback: function (code, message, response) {
        yufp.clone(response.data.ctrLoanCont, _this.baseFormdata);
        params = response.data.ctrLoanCont;
        var repayType = response.data.ctrLoanCont.repayType;
        if (repayType == '06') {
          _this.hiddenFlg = false;
        }
        if (response.data.iqpLoanAppDramPlanSubList.length > 0) {
          _this.drawData = response.data.iqpLoanAppDramPlanSubList || [];
        }
        if (response.data.iqpRepayPlanList && response.data.iqpRepayPlanList.length > 0) {
          _this.repayData = response.data.iqpRepayPlanList || [];
        }
      }
    });
    _this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'ZQSQYX',
        index: {
          businessid: params.iqpSerno,
          custconduct: '',
          operid: '',
          maintaindate: '',
          custtype: params.curType,
          custconductname: params.updIdName,
          orgid: params.inputBrId,
          orgname: params.inputBrIdName,
          opername: params.updIdName,
          custid: params.cusId,
          custname: params.inputIdName
          // custname: params.updBrIdName,
        }
      }
    ];
  },
  methods: {
    /**
     * 提交表单信息
     */
    submitFormFn: function () {
      var _this = this;
      var data = {};
      var validate = false;

      _this.$refs.refBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.clone(_this.baseFormdata, data);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/updateSelective',
        data: data,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            yufp.router.removeTab('/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContEdit/' + data.contNo);
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },

    /**
     * 重置所有表单内容
     */
    resetFormFn: function () {
      var _this = this;
      _this.$refs.refBaseForm.resetFields();
    },

    link: function () {
      // templateFactory //@views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex.vue
      this.$router.push({ path: '/templateFactory', query: { tplId: 'IQP_SINGLE_BATCH_APP' } });
    },
    /**
     * 还款方式为其他时，隐藏说明
     */
    otherHin: function (repayType) {
      var _this = this;
      if (_this.repayType == '06') {
        _this.hiddenFlg = false;
      }
    },

    /** 返回操作 */
    returnFn: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>
