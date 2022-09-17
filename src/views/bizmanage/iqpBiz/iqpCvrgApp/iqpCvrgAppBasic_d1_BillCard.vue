<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isFormDisabled">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" data-code="STD_CONT_TYPE" placeholder="合同类型" :colspan="12" disabled></yu-xform-item>
            <!--<yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" placeholder="客户编号" :disabled="true"></yu-xform-item>-->
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="viewCusDataByCusId" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled colspan="24"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="保函类型" ctype="select" data-code="STD_ZB_LOG_TYPE" placeholder="保函类型" name="guarantType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="保函种类" ctype="input" placeholder="保函种类" name="guarantMode" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" placeholder="是否在线抵押" name="isOlPld" rules="required"  :colspan="12" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" placeholder="是否电子用印" name="isESeal" rules="required"  data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" name="isRenew" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否续签" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled  v-show="origiContNo"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同币种" ctype="select" placeholder="合同币种" name="curType" rules="required"  data-code="STD_ZB_CUR_TYP"  :colspan="12" :disabled="isDomesticCvrg" @change="getCurTypeRate"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="合同金额" ctype="num" placeholder="合同金额" name="contAmt" rules="required" :colspan="12" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="input" placeholder="汇率" name="exchangeRate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="num" placeholder="折算人民币金额" name="cvtCnyAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="num" placeholder="本合同项下最高可用信金额" name="contHighAvlAmt" rules="required" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" placeholder="合同起始日" name="startDate" rules="required"  @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" placeholder="合同到期日" name="endDate" rules="required"  @change="termChange"></yu-xform-item>
            <yu-xform-item label="保证金比例(%)" ctype="yu-num" sign="%" :multiple="100" placeholder="保证金比例(%)" name="bailPerc" v-if="contTypeSign" rules="required" hidden-rule="false" @blur="isBailPercCorrect"></yu-xform-item>
            <yu-xform-item label="保证金币种" ctype="select" data-code="STD_ZB_CUR_TYP"  placeholder="保证金币种" name="bailCurType" v-if="contTypeSign" hidden-rule="false" rules="required" @change="getBailCurTypeRate"></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="num" placeholder="保证金金额" name="bailAmt" v-if="contTypeSign" hidden-rule="false" @blur="bailAmtChange"></yu-xform-item>
            <yu-xform-item label="保证金汇率" ctype="input" placeholder="保证金汇率" name="bailExchangeRate" v-if="contTypeSign" hidden-rule="false" disabled></yu-xform-item>
            <yu-xform-item label="保证金折算人民币金额" ctype="num" placeholder="保证金折算人民币金额" name="bailCvtCnyAmt" v-if="contTypeSign" hidden-rule="false" @blur="bailAmtChange" disabled></yu-xform-item>
            <yu-xform-item label="手续费金额" ctype="yu-num" number-formatter="0,000.00" placeholder="手续费金额" name="chrgAmt" v-if="contTypeSign" hidden-rule="false" :required="isReqBycontType"></yu-xform-item>
            <yu-xform-item label="手续费率（‰）" ctype="yu-num" sign="‰" :multiple="1000" placeholder="手续费率(‰)" name="chrgRate" v-if="contTypeSign"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="input" placeholder="业务类型" name="busiType" hidden></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" hidden></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" placeholder="纸质合同签订日期" name="paperContSignDate" hidden></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="select" name="belgLine"  data-code="BIZ_BELG" placeholder="所属条线" hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false" v-if="contTypeSign">
          <yu-toolbar>
            <yu-button @click="addFnBailLmt" :hidden="isHidden">新增</yu-button>
            <yu-button @click="deleteFnBailLmt" :hidden="isHidden">删除</yu-button>
            <yu-button @click="saveFnBailLmt" :hidden="isHidden">保存</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number border :data="bailaccinfo" :pageable="false">
            <yu-xtable-column label="保证金账号" prop="bailAccNo" ctype="input" icon="search" :triger-click="false" :on-icon-click="initBail" :data="bailAccNoData"></yu-xtable-column>
            <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
            <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="bailCurType" ctype="select" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="保函相关" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否线上保函" ctype="select" name="isEGuarant" data-code="STD_ZB_YES_NO" placeholder="是否线上保函" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="是否为转开代理行保函" ctype="select" name="isAgentbankGuarant" data-code="STD_ZB_YES_NO" placeholder="是否为转开代理行保函" v-if="contTypeSign" hidden-rule="false" rules="required"></yu-xform-item>
            <yu-xform-item label="代理行名称" ctype="input" placeholder="代理行名称" name="agentbankName" v-if="contTypeSign" hidden-rule="false"></yu-xform-item>
            <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" v-if="contTypeSign" hidden-rule="false"></yu-xform-item>
            <yu-xform-item label="项目金额" ctype="yu-num" number-formatter="0,000.00" placeholder="项目金额" name="proAmt" v-if="contTypeSign" hidden-rule="false" rules="required"></yu-xform-item>
            <yu-xform-item label="合同协议" ctype="input" placeholder="合同协议" name="contAgr" v-if="contTypeSign"  hidden-rule="false" rules="required"></yu-xform-item>
            <yu-xform-item label="受益人名称" ctype="input" placeholder="受益人名称" name="beneficiarName" v-if="contTypeSign" hidden-rule="false" rules="required"></yu-xform-item>
            <yu-xform-item label="保函付款方式" ctype="select" placeholder="保函付款方式" name="guarantPayMode" rules="required" data-code="STD_GUARANT_PAY_TYPE"></yu-xform-item>
            <yu-xform-item label="保函承付条件说明" ctype="input" placeholder="保函承付条件说明" name="guarantHonourCond" v-if="contTypeSign" hidden-rule="false"></yu-xform-item>
            <yu-xform-item label="相关贸易合同金额" ctype="yu-num" number-formatter="0,000.00" placeholder="相关贸易合同金额" name="correBusnesContAmt" v-if="contTypeSign"  hidden-rule="false" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled>
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="viewReplyNo" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" rules="mobile"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email" rules="email"></yu-xform-item>
            <yu-xform-item label="qq" ctype="input" placeholder="qq" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="textarea" placeholder="送达地址" name="deliveryAddr" rules="required" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="select" data-code="STD_DEBT_GRADE" placeholder="债项等级" name="debtLevel" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="getDebtLevel" :disabled="op == 'VIEW'">债项评级测算</yu-button>
            </yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD" ctype="input" placeholder="违约风险暴露EAD" name="ead"></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="input" placeholder="违约损失率LGD" name="lgd"></yu-xform-item>
            <yu-xform-item label="转敞口对象的PD" ctype="input" placeholder="转敞口对象的PD" name="pd"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" name="managerIdName" disabled rules="required" placeholder="主管客户经理"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="主管机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>

yufp.lookup.reg('STD_CONT_TYPE,STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_ZB_APPR_STATUS,STD_GUARANT_PAY_TYPE,STD_DEBT_GRADE');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      // updateUrl: this.$backend.cmisBiz + '/api/iqpcvrgapp/update',
      // dataUrl: backend.cmisBiz + '/api/bailaccinfo/showlist',
      // addUrl: this.$backend.cmisBiz + '/api/iqpcvrgapp/',
      contTypeSign: true,
      isReqBycontType: false,
      origiContNo: false,
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isDomesticCvrg: false,
      bailaccinfo: [],
      tableParams: {},
      isLmtAccNoRequired: true,
      isReplyNoRequired: true,
      bailParms: {
        title: '选择保证金信息',
        dataUrl: `${backend.cmisBiz}/api/bailaccinfo/sendcoreforbail`,
        tableColumns: [
          { label: '保证金账号', prop: 'bailAccNo' },
          { label: '客户号', prop: 'cusId' },
          { label: '客户名称', prop: 'cusName' },
          { label: '保证金账号子序号 ', prop: 'bailAccNoSub' },
          { label: '开户行名称 ', prop: 'acctsvcrName' }
        ],
        baseParams: {
          condition: JSON.stringify({
            cusId: this.getFactory().contextData.cusId
          })
        }
      },
      prdCode: '',
      isShow: false,
      checkValue: true,
      checkMsg: '',
      isShowButton: true,
      isFormDisabled: false,
      serno: ''
    };
  },
  mounted () {
    var _this = this;
    var serno = '';
    var op = '';
    let data = _this.getFactory().contextData;
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      op = 'VIEW';
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      serno = data.biz_serno;
      op = data.op;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      serno = data.biz_serno;
      op = data.op;
    }
    // 进入初始化
    _this.serno = serno;
    _this.op = op;
    if (_this.op == 'VIEW') {
      this.isHidden = true;
      this.isDisabled = true;
    }
    this.tableParams = { serno: _this.serno };
    this.getAllBailData(this.tableParams);
  },
  methods: {
    getAllBailData: function (tableParams) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/getList/',
        data: tableParams,
        callback: function (code, message, response) {
          _this.bailaccinfo = response.data || [];
        }
      });
    },

    // changeAmt (amt) {
    //   // 担保方式
    //   let guarMode = this.formdata.guarMode;
    //   // 全额保证金时，手续费金额= 合同金额 * 手续费率；担保方式为其他时，手续费金额 = (合同金额/(1-保证金比例))* 手续费率
    //   // 保证金金额=（合同金额/1-保证金比例）* 保证金比例；其中：合同金额/(1-保证金比例)  = 合同总金额（含风险敞口金额+保证金金额）
    //   if (guarMode == '40') {
    //     // 手续费金额
    //     this.formdata.chrgAmt = this.formdata.contAmt * this.formdata.chrgRate;
    //     // 保证金金额
    //     this.formdata.bailAmt = this.formdata.contAmt * this.formdata.bailPerc;
    //   } else {
    //     if (guarMode == '21') {
    //       // 如果是低风险
    //       if (this.formdata.bailPerc > 100) {
    //         this.$xutils.showMsgBox('提示', '非全额保证担保方式，保证金比例不得大于100'); // 弹出提示
    //         this.formdata.bailPerc = 0;
    //       }
    //     } else {
    //       if (this.formdata.bailPerc >= 100) {
    //         this.$xutils.showMsgBox('提示', '非全额保证担保方式，保证金比例不得大于等于100'); // 弹出提示
    //         this.formdata.bailPerc = 0;
    //       }
    //     }
    //     if (this.formdata.bailPerc == '100.00') {
    //       // 手续费金额
    //       this.formdata.chrgAmt = this.formdata.contAmt * this.formdata.chrgRate;
    //       // 保证金金额
    //       this.formdata.bailAmt = this.formdata.contAmt * this.formdata.bailPerc;
    //     } else {
    //       this.formdata.chrgAmt = this.formdata.contAmt / (1 - this.formdata.bailPerc) * this.formdata.chrgRate;
    //       // 保证金金额
    //       this.formdata.bailAmt = this.formdata.contAmt / (1 - this.formdata.bailPerc) * this.formdata.bailPerc;
    //     }
    //   }
    // },

    // 选取保证金
    initBail: function (value) {
      var _this = this;
      let jsoPar = _this.$refs.refTable.selections[0];
      if (!jsoPar.bailAccNo) {
        _this.$message({
          message: '请先输入客户号！',
          type: 'warning'
        });
        return;
      }
      var formdataCusId = _this.formdata.cusId;
      if (jsoPar.bailAccNo != formdataCusId) {
        _this.$message({
          message: '输入的客户号与申请客户不一致！',
          type: 'warning'
        });
        return;
      }
      var data = { cusId: jsoPar.bailAccNo };
      this.$dialog.open('', 'zrcbank/biz/common/commonCusAndBailInfo', 1000, 800, data, params => {
        _this.$refs.refTable.selections[0].bailAccNo = params.settlAcctNum;
        _this.$refs.refTable.selections[0].bailAccNoSub = params.acctSubNum;
        _this.$refs.refTable.selections[0].bailCurType = params.curType;
        _this.$refs.refTable.selections[0].acctsvcrName = params.openOrgId;
      });
    },

    amtChange (value) {
      var _this = this;
      let contAmt = _this.$refs.refForm.formdata.contAmt;
      let contHighAvlAmt = _this.$refs.refForm.formdata.contHighAvlAmt;
      if (parseFloat(contAmt) < parseFloat(contHighAvlAmt)) {
        _this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        _this.formdata.contHighAvlAmt = '';
      }
      _this.formdata.cvtCnyAmt = parseFloat(contHighAvlAmt) * _this.formdata.exchangeRate;
    },

    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    bailAmtChange (value) {
      var _this = this;
      let bailAmt = _this.$refs.refForm.formdata.bailAmt;
      let bailCvtCnyAmt = _this.$refs.refForm.formdata.bailCvtCnyAmt;
      _this.formdata.bailCvtCnyAmt = parseFloat(bailAmt) * _this.formdata.bailExchangeRate;
    },

    viewReplyNo () {
      if (this.formdata.replyNo == null || this.formdata.replyNo == '') {
        this.$xutils.showMsgBox('提示', '批复编号为空!');
        return;
      }
      let params = {};
      params['replySerno'] = this.formdata.replyNo;
      this.$dialog.open(
        '',
        'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
        -1,
        -1,
        params
      );
    },

    // 债项等级
    getDebtLevel () {
      if (this.formdata.debtLevel == null || this.formdata.debtLevel == '') {
        this.$xutils.showMsgBox('提示', '债项等级为空!');
        return;
      }
      this.$xutils.showMsgBox('提示', '暂未开发!');
    },

    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.serno = this.$xutils.getDefaultformulaData('getSequence(IQP_SERNO)');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    },

    // 根据币种得到对应的汇率
    getCurTypeRate: function (value) {
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.exchangeRate = response.data.rate;
              this.formdata.cvtCnyAmt = parseFloat(this.formdata.contHighAvlAmt) * this.formdata.exchangeRate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.contAmt = '';
              this.formdata.cvtCnyAmt = '';
              this.formdata.contHighAvlAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.contAmt = '';
            this.formdata.cvtCnyAmt = '';
            this.formdata.contHighAvlAmt = '';
            return;
          }
        });
      }
    },

    // 根据币种得到对应的汇率
    getBailCurTypeRate: function (value) {
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.bailExchangeRate = response.data.rate;
              this.formdata.bailCvtCnyAmt = parseFloat(this.formdata.bailAmt) * this.formdata.bailExchangeRate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.bailCurType = 'CNY';
              this.formdata.bailAmt = '';
              this.formdata.bailCvtCnyAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.bailAmt = '';
            this.formdata.bailCvtCnyAmt = '';
            return;
          }
        });
      }
    },

    /**
     * 选择保证金账号信息
     */
    selectBail: function (arr) {
      // var _this = this;
      this.bailaccinfo[this.bailaccinfo.length - 1].bailAccNo = arr[0].bailAccNo;
      this.bailaccinfo[this.bailaccinfo.length - 1].bailAccNoSub = arr[0].bailAccNoSub;
      this.bailaccinfo[this.bailaccinfo.length - 1].acctsvcrName = arr[0].acctsvcrName;
      // _this.bailaccinfo.bailAccNo = arr[0].bailAccNo;
      // _this.bailaccinfo.bailAccNoSub = arr[0].bailAccNoSub;
      // _this.bailaccinfo.acctsvcrName = arr[0].acctsvcrName;
      // _this.bailaccinfo = arr[0];
    },

    termChange (value) { // 校验合同期限
      var _this = this;
      let startDate = this.formdata.startDate;
      let endDate = this.formdata.endDate;

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate <= startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日需大于合同起始日'); // 弹出提示
        this.formdata.contTerm = '';
        // this.formdata.startDate = '';
        this.formdata.endDate = '';
        return;
      }
      let termMap = {
        startDate: this.formdata.startDate,
        endDate: this.formdata.endDate
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
        data: termMap,
        callback: function (code, message, response) {
          var data = response.data;
          _this.formdata.contTerm = data;
        }
      });
    },

    /**
     * 新增按钮
     */
    addFnBailLmt: function () {
      var _this = this;
      _this.bailaccinfo.push({
        serno: _this.serno
      });
    },

    // 校验所填保证金比例是否大于等于批复中的保证金比例
    isBailPercCorrect () {
      var _this = this;
      var bailPerc = _this.formdata.bailPerc;
      var lmtAccNo = _this.formdata.lmtAccNo;
      if (!lmtAccNo || lmtAccNo == null || lmtAccNo == '') {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsubprd/querylmtreplyaccsubprdbyparams',
        data: {accSubPrdNo: lmtAccNo},
        callback: function (code, message, response) {
          if (response.code == 0) {
            let bailPreRate = response.data.bailPreRate;
            if (bailPreRate && bailPreRate != null) {
              if (bailPerc < bailPreRate) {
                _this.$message({ message: '保证金比例必须大于等于对应授信分项中批复的保证金比例!', type: 'warning' });
                _this.formdata.bailPerc = 0.00;
                _this.checkValue = false;
                _this.checkMsg = '保证金比例必须大于等于对应授信分项中批复的保证金比例!';
              } else {
                _this.checkValue = true;
                _this.checkMsg = '保证金比例必须大于等于对应授信分项中批复的保证金比例!';
              }
            }
          }
        }
      });
    },

    // 保存
    saveFnBailLmt: function () {
      var _this = this;
      var data = _this.$refs.refTable.tabledata;
      for (let i = 0; i < data.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/bailaccinfo/savebailaccinfo',
          data: data[i],
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.rtnCode == '000000') {
                if (i == data.length - 1) {
                  _this.$message({ message: '保存成功', type: 'success' });
                }
              } else {
                _this.$message.error(response.data.rtnMsg);
              }
            } else {
              _this.$message({
                showClose: true,
                message: response.data.rtnMsg,
                type: 'error'
              });
            }
          }
        });
      }
    },


    // 删除
    deleteFnBailLmt: function () {
      var _this = this;
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      var row = selections[0];
      if (!row.pkId) {
        _this.bailaccinfo.splice(selections, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/bailaccinfo/delete/' + row.pkId,
          callback: function (code, message, response) {
            if (code == 0) {
              _this.bailaccinfo.splice(selections, 1);
              _this.prdCode = response.data.prdId;
              _this.$message('删除成功');
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    },

    // // 添加数据 添加一条空白数据
    // pushRefTable1Row: function () {
    //   let isRefTable1ValidateOk = false;
    //   this.$refs.refTable1.validate(function (fields) {
    //     if (!fields) { // 如果校验通过, fields为null
    //       isRefTable1ValidateOk = true;
    //     }
    //   });
    //   if (isRefTable1ValidateOk) {
    //     let userInfo = this.$xutils.getLoginUserInfo();
    //     let pkId = this.$xutils.getUUID();
    //     let row = {serno: this.formdata.serno, bailAccNo: '', bailAccNoSub: '', bailInterestMode: ''};
    //     // this.currentDrawTableRow.push(row);
    //     this.$refs.refTable1.tabledata.push(row);
    //     this.$refs.refTable1.setCurrentRow(row);
    //   }
    // },

    // table获取数据
    customClick: function () {
      var _this = this;
      var bailAccnoData = _this.bailAccNo;
      // console.log(bailAccnoData);
    },

    // 对公客户查看
    viewCusDataByCusId () {
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },
    // 展示小助手
    show () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
