<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="180px" :form-type="formType" v-model="formdata" :disabled="disabledForm">
        <yu-panel title="贷款基本信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" disabled placeholder="业务流水号"></yu-xform-item>
            <yu-xform-item label="借据编号" name="billNo" ctype="input" disabled placeholder="借据编号"></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label="合同编号" name="contNo" ctype="input" disabled placeholder="合同编号"></yu-xform-item>
            <yu-xform-item label="产品名称" name="prdName" ctype="input" disabled placeholder="产品名称"></yu-xform-item>
            <yu-xform-item label="贷款金额" name="loanAmt" ctype="yu-currency" disabled :min="0" :precision="2" placeholder="贷款金额"></yu-xform-item>
            <yu-xform-item label="贷款余额" name="loanBalance" ctype="yu-currency" disabled :min="0" :precision="2" placeholder="贷款余额"></yu-xform-item>
            <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="datepicker" disabled placeholder="贷款起始日"></yu-xform-item>
            <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="datepicker" disabled placeholder="贷款到期日"></yu-xform-item>
            <yu-xform-item label="申请渠道" name="loanAppChnl" ctype="select" data-code="STD_APP_CHNL" disabled placeholder="申请渠道"></yu-xform-item>
            <yu-xform-item label="台账状态" name="accStatus" ctype="select" data-code="STD_ACC_STATUS" disabled placeholder="台账状态"></yu-xform-item>
            <yu-xform-item label="业务条线" name="belgLine" ctype="input" disabled hidden></yu-xform-item>
            <yu-xform-item label="产品编号" name="prdId" ctype="input" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="还款情况信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否打包转让贷款" placeholder="是否打包转让贷款" name="isAllowTakeover" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="还款模式" placeholder="还款模式" name="repayMode" ctype="select" rules="required" data-code="STD_REPAY_MODE_TYPE" @change="changeRepayMode"></yu-xform-item>
            <yu-xform-item label="还款模式明细" placeholder="还款模式明细" name="repayModeDesc" rules="required" @change="changeRepayModeDesc" :options="repayModeDescOpt" ctype="select" data-code="STD_REPAY_MODE_DESC"></yu-xform-item>
            <yu-xform-item label="贷款收回方式" placeholder="贷款收回方式" name="repayType" rules="required" ctype="select" data-code="STD_REPAY_TYPE"></yu-xform-item>
            <yu-xform-item label="资金来源" placeholder="资金来源" name="amtSource" rules="required" ctype="select" data-code="STD_AMT_SOURCE"></yu-xform-item>
            <yu-xform-item label="还本金额" placeholder="还本金额" name="repayPriAmt" rules="required" ctype="yu-currency" :precision="2" :min="0" :hidden="hiddenFlag" ></yu-xform-item>
            <yu-xform-item label="还款金额" placeholder="还款金额" name="repayAmt" rules="required" ctype="yu-currency" :precision="2" :min="0" :hidden="!hiddenFlag"></yu-xform-item>
            <yu-xform-item label="是否缩期" placeholder="是否缩期" name="isPeriod" rules="required" ctype="select" data-code="STD_ZB_YES_NO"  @change="changeIsPeriod" :hidden="hiddenFlag"></yu-xform-item>
            <yu-xform-item label="缩期期数" placeholder="缩期期数" :hidden="formdata.isPeriod == '0'" name="periodTimes" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="还款账户信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否第三方还款" placeholder="是否第三方还款" name="isOtherAcct" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="还款账号" placeholder="还款账号" name="repayAcctNo" rules="required" ctype="input" :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" :colspan="2">
              <yu-button type="primary" @click="getAccNoT">选择</yu-button>
            </yu-xform-item>
            <yu-xform-item label="还款账户名称" placeholder="还款账户名称" name="repayAcctName" rules="required" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="还款账户子序号" placeholder="还款账户子序号" name="repaySubAccno" rules="required" ctype="input" disabled > </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="计算还款明细信息" panel-type="normal">
          <template slot="right">
            <yu-button-drop type="button">
              <yu-button key="add" type="primary" @click="handleClick" v-if="pageParams.opType !== 'VIEW'">计算还款</yu-button>
            </yu-button-drop>
          </template>
          <yu-xform-group :column="2">
            <yu-xform-item label="1-归还正常本金" placeholder="1-归还正常本金" disabled name="trialZcbjAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="9-归还逾期本金" placeholder="9-归还逾期本金"  disabled name="trialYqbjAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="2-归还呆滞本金" placeholder="2-归还呆滞本金" disabled name="trialDzbjAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="10-归还呆账本金" placeholder="10-归还呆账本金" disabled name="trialDaizbjAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="3-归还应收应计利息" placeholder="3-归还应收应计利息" disabled name="trialYsyjlxXmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="11-归还催收应计利息" placeholder="11-归还催收应计利息" disabled name="trialCsyjlxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="4-归还应收欠息" placeholder="4-归还应收欠息" disabled name="trialYsqxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="12-归还催收欠息" placeholder="12-归还催收欠息"  disabled name="trialCsqxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="5-归还应收应计罚息" placeholder="5-归还应收应计罚息"  disabled name="trialYsyjfxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="13-归还催收应计罚息" placeholder="13-归还催收应计罚息" disabled name="trialCsyjfxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="6-归还应收罚息" placeholder="6-归还应收罚息"  disabled name="trialYsfxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="14-归还催收罚息" placeholder="14-归还催收罚息" disabled name="trialCsfxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="7-归还应计复息" placeholder="7-归还应计复息" disabled name="trialYjfxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="15-归还复息" placeholder="15-归还复息" disabled name="trialFxAmt"  ctype="yu-currency" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="8-归还应收罚金" placeholder="8-归还应收罚金"  disabled name="trialYsfjAmt"  ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
         <yu-panel title="灵活还款信息" :hidden="!showDymic" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="1-归还正常本金" placeholder="1-归还正常本金" rules="required" name="zcbjAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="9-归还逾期本金" placeholder="9-归还逾期本金" rules="required" name="yqbjAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="2-归还呆滞本金" placeholder="2-归还呆滞本金" rules="required" name="dzbjAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="10-归还呆账本金" placeholder="10-归还呆账本金" rules="required" name="daizbjAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="3-归还应收应计利息" placeholder="3-归还应收应计利息" rules="required" name="ysyjlxXmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="11-归还催收应计利息" placeholder="11-归还催收应计利息" rules="required" name="csyjlxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="4-归还应收欠息" placeholder="4-归还应收欠息" rules="required" name="ysqxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="12-归还催收欠息" placeholder="12-归还催收欠息" rules="required" name="csqxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="5-归还应收应计罚息" placeholder="5-归还应收应计罚息" rules="required" name="ysyjfxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="13-归还催收应计罚息" placeholder="13-归还催收应计罚息" rules="required" name="csyjfxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="6-归还应收罚息" placeholder="6-归还应收罚息" rules="required" name="ysfxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="14-归还催收罚息" placeholder="14-归还催收罚息" rules="required" name="csfxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="7-归还应计复息" placeholder="7-归还应计复息" rules="required" name="yjfxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="15-归还复息" placeholder="15-归还复息" rules="required" name="fxAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
            <yu-xform-item label="8-归还应收罚金" placeholder="8-归还应收罚金" rules="required" name="ysfjAmt"  ctype="yu-currency" :precision="2" :min="0" @change="calculateTotalAmt" :hidden="!showDymic"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="计算还款汇总信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="本金" placeholder="本金" name="totalBjAmt" disabled ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="利息" placeholder="利息" name="totalLxAmt" disabled ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="罚息" placeholder="罚息" name="totalFxAmt" disabled ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="复息" placeholder="复息" name="totalFuxAmt" disabled ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="核销本金" placeholder="核销本金" name="totalHxbjAmt" disabled ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="核销利息" placeholder="核销利息" name="totalHxlxAmt" disabled ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="拖欠利息总额" placeholder="拖欠利息总额" name="totalTqlxAmt" disabled ctype="yu-currency" :precision="2" :min="0"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled placeholder="登记人"></yu-xform-item>
            <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
            <yu-xform-item label="责任人" name="managerIdName" ctype="input" disabled placeholder="责任人"></yu-xform-item>
            <yu-xform-item label="责任机构" name="managerBrIdName" ctype="input" disabled placeholder="责任机构"></yu-xform-item>
            <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" disabled placeholder="登记日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button type="primary" @click="tempSave" v-if="pageParams.opType !== 'VIEW'">暂存</yu-button>
      <yu-button type="primary" @click="commit" v-if="pageParams.opType !== 'VIEW'">提交</yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { yufpNwfInit },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpprepayment/update',
      formdata: {},
      formType: 'edit',
      formRules: {},
      disabledForm: false,
      showDymic: false,
      hiddenFlag: false,
      repayModeDescOpt: [],
      changeRepayModeDescFlag: false
    };
  },
  mounted () {
    this.initData();
    // 查询时不可编辑
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    }
  },
  methods: {
    initData: function () {
      let _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqpprepayment/' + this.pageParams.iqpSerno,
        method: 'post'
      }).then(({ code, message, data }) => {
        if (data) {
          yufp.clone(data, _this.formdata);
          if(!data.loanAppChnl){
            _this.formdata.loanAppChnl = '02';
          }
          if(!data.isAllowTakeover){
            _this.formdata.isAllowTakeover = '0';
          }
          this.getBelgLine();
        }
      });
    },
    /** 计算还款 */
    handleClick () {
      let _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      let model = {};
      yufp.clone(_this.formdata, model);
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqpprepayment/queryln3111',
        method: 'post',
        data: JSON.stringify(model)
      }).then(({ code, message, data }) => {
        if (data) {
          yufp.clone(data, _this.formdata);
          // 试算赋值
          this.valuationAmt();
        }
      });
    },
    /** 归还拖欠时 隐藏 “是否缩期” 字段 **/
    changeRepayMode(val){
      // 只有贷款台账状态为正常，才允许提前还款
      if (this.formdata.accStatus != 1) {
        if (this.formdata.repayMode == '01') {
          this.$message('只有贷款台账状态为正常，才允许提前还款!');
          this.formdata.repayMode = '02';
          return;
        }
      }
      const datacode2 = this.$lookup.find('STD_REPAY_MODE_DESC');
      if (val == '02') {
        this.hiddenFlag = true;
        this.formdata.isPeriod = '0';
        this.formdata.periodTimes = '';
        this.repayModeDescOpt = datacode2.filter(function (op) {
          return op.key === '03' || op.key === '04';
        });
        if(this.formdata.repayModeDesc == '01' ||this.formdata.repayModeDesc == '02'  ){
          this.formdata.repayModeDesc = '';
        }
        if(this.formdata.repayPriAmt != '0'){
          this.formdata.repayPriAmt = '0';
        }
        if(this.formdata.repayAmt == '0'){
          this.formdata.repayAmt = '';
        }
      }else{
        this.hiddenFlag = false;
        this.repayModeDescOpt = datacode2.filter(function (op) {
          return op.key === '01' || op.key === '02' || op.key === '03';
        });
        if(this.formdata.repayModeDesc == '04'){
          this.formdata.repayModeDesc = '';
        }
        if(this.formdata.repayAmt != '0'){
          this.formdata.repayAmt = '0';
        }
        if(this.formdata.repayPriAmt == '0'){
          this.formdata.repayPriAmt = '';
        }
      }
    },
    changeIsPeriod () {
      // 灵活还款调用核心接口Ln3042，核心不支持缩期 
      if (this.formdata.repayModeDesc == '03') {
          this.formdata.isPeriod = '0';
      }
    },
    /** 灵活还款时展示灵活还款表单 */
    changeRepayModeDesc (newVal) {
      var _this = this;
      if (newVal == '03') {
        _this.showDymic = true;
      } else {
        _this.showDymic = false;
      }
       // 还款模式明细变了需要重新试算对应金额置成0(首次加载不用置成0)
      if (_this.formdata.changeRepayModeDescFlag) {
        _this.formdata.zcbjAmt = '0';
        _this.formdata.yqbjAmt = '0';
        _this.formdata.dzbjAmt = '0';
        _this.formdata.daizbjAmt = '0';
        _this.formdata.ysyjlxXmt = '0';
        _this.formdata.csyjlxAmt = '0';
        _this.formdata.ysqxAmt = '0';
        _this.formdata.csqxAmt = '0';
        _this.formdata.ysyjfxAmt = '0';
        _this.formdata.csyjfxAmt = '0';
        _this.formdata.ysfxAmt = '0';
        _this.formdata.csfxAmt = '0';
        _this.formdata.yjfxAmt = '0';
        _this.formdata.fxAmt = '0';
        _this.formdata.ysfjAmt = '0';  
      }
      _this.formdata.changeRepayModeDescFlag = true;
      this.valuationAmt();
    },
    // 校验负数
    checkData(val){
      val += '';
      let flag = true;
      if(val.startsWith('-')){
         flag = !(/^\d+$/.test(val.substr(1)) && val.substr(1) > 0);
      }
      return flag;
    },
    /** 选择账户子序号 */
    onIconClickFn () {},
    /** 关闭页面 */
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    // 试算结果赋值
    valuationAmt () {
      var _this = this;
      _this.formdata.trialZcbjAmt = _this.formdata.zcbjAmt;
      _this.formdata.trialYqbjAmt = _this.formdata.yqbjAmt;
      _this.formdata.trialDzbjAmt = _this.formdata.dzbjAmt;
      _this.formdata.trialDaizbjAmt = _this.formdata.daizbjAmt;
      _this.formdata.trialYsyjlxXmt = _this.formdata.ysyjlxXmt;
      _this.formdata.trialCsyjlxAmt = _this.formdata.csyjlxAmt;
      _this.formdata.trialYsqxAmt = _this.formdata.ysqxAmt;
      _this.formdata.trialCsqxAmt = _this.formdata.csqxAmt;
      _this.formdata.trialYsyjfxAmt = _this.formdata.ysyjfxAmt;
      _this.formdata.trialCsyjfxAmt = _this.formdata.csyjfxAmt;
      _this.formdata.trialYsfxAmt = _this.formdata.ysfxAmt;
      _this.formdata.trialCsfxAmt = _this.formdata.csfxAmt;
      _this.formdata.trialYjfxAmt = _this.formdata.yjfxAmt;
      _this.formdata.trialFxAmt = _this.formdata.fxAmt;
      _this.formdata.trialYsfjAmt = _this.formdata.ysfjAmt;
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

      // 缩期 需要 校验缩期期数为负数
      if(this.formdata.isPeriod == '1'){
        let flag = this.checkData(this.formdata.periodTimes);
        if(flag){
          this.$xutils.showMsgBox('提示', '缩期期数应该为负整数，请重新输入!', 350, 150);
          return;
        }
      }
      //金额校验
      var repayMode = this.formdata.repayMode;
      var loanBalance = this.formdata.loanBalance;
      var repayType = this.formdata.repayType;
      if (repayMode == '01') {
        var repayPriAmt = this.formdata.repayPriAmt;
        if (repayPriAmt > loanBalance) {
          this.formdata.repayPriAmt = '';
          this.$xutils.showMsgBox('提示', '还本金额应小于贷款余额!', 350, 150);
          return;
        }
        var totalBjAmt = this.formdata.totalBjAmt;
        let prdTypeProp = this.getPrdTypeProp(this.formdata.billNo);
        if (prdTypeProp == 'P003' && repayPriAmt < totalBjAmt) {
          this.formdata.repayPriAmt = '';
          this.$xutils.showMsgBox('提示', '不支持部分提前还款！', 350, 150);
          return;
        }
        var totalPriAmt = parseFloat(this.formdata.totalBjAmt) + parseFloat(this.formdata.totalHxbjAmt);
        if (repayPriAmt != totalPriAmt) {
          this.$xutils.showMsgBox('提示', '提前还款时，还本金额应等于本金合计!', 350, 150);
          return;
        }
      } else {
        var repayAmt = this.formdata.repayAmt;
        // if (repayAmt > loanBalance) {
        //   this.formdata.repayAmt = '';
        //   this.$xutils.showMsgBox('提示', '还款金额应小于贷款余额!', 350, 150);
        //   return;
        // }
        var totalAmt = parseFloat(this.formdata.totalBjAmt) + parseFloat(this.formdata.totalHxbjAmt) + parseFloat(this.formdata.totalTqlxAmt);
        if (repayAmt != totalAmt) {
          this.$xutils.showMsgBox('提示', '归还欠款时，还款金额应等于本金与利息合计!', 350, 150);
          return;
        }
      }

      var isOtherAcct = this.formdata.isOtherAcct;
      var cusName = this.formdata.cusName;
      var repayAcctName = this.formdata.repayAcctName;
      if(isOtherAcct == '1'){
        if(cusName == repayAcctName ){
           this.formdata.repayAcctNo = '';
           this.$xutils.showMsgBox('提示', '第三方还款，请使用第三方还款账号!', 350, 150);
           return;
        }
      }else{
        if(cusName != repayAcctName ){
           this.formdata.repayAcctNo = '';
           this.$xutils.showMsgBox('提示', '非第三方还款，请使用本人还款账号!', 350, 150);
           return;
        }
      }

      const saveResult = this.tempSave();
      if (!saveResult || saveResult.code != '0') {
        return;
      }
      var _this = this;
      // 提交流程
      const userInfo = _this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizId = _this.formdata.iqpSerno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;

      //判断日期
      var day = yufp.session.openday.substr(6, 2);
      day = parseInt(day,10) ;
      console.log(day);
      var dayFlagStr = '';
      if(day > 25){
        dayFlagStr = '1';
      }else{
        dayFlagStr = '0';
      }
      console.log(dayFlagStr);
      startdto.param = {repayMode: repayMode,dayFlag: dayFlagStr};
      console.log(startdto.param);

      // 委托贷款042175 条线都是对公
      if('042175' == _this.formdata.prdId){
        _this.formdata.belgLine = '03'
      }

      //小微
      if(_this.formdata.belgLine == '01'){
          startdto.bizType = 'BG024';
      }
      //零售
      if(_this.formdata.belgLine == '02'){
          startdto.bizType = 'BG023';
      }
      //对公
      if(_this.formdata.belgLine == '03'){
          startdto.bizType = 'BG022';
      }

      //贷款收回方式
      console.log(repayType);
      if(repayType == '02'){
        startdto.bizType = 'BG021';
      }
      // 岗位校验
      const loginUser = _this.$xutils.getLoginUserInfo();
        const dutysList = loginUser.dutys;
        if (dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];

            //判断是否小微客户经理
            if(repayType == '02'){
              if(item.code === 'XWB01'){
                startdto.param = {xwFlag: '1'};
              }else{
                startdto.param = {xwFlag: '0'};
              }
              console.log(startdto.param);
            }
            if (item.code === 'FZH01' && _this.formdata.belgLine != '03') { //  对公客户经理但条线不是对公的则不给提交
             this.$message('非对公条线请确认!');
             return;
            }
            if (item.code === 'FZH02' && _this.formdata.belgLine != '02') { //  零售客户经理但条线不是零售的则不给提交
             this.$message('非零售条线请确认!');
             return;
            }
            if (item.code === 'XWB01' && _this.formdata.belgLine != '01') { //  小微客户经理但条线不是小微的则不给提交
             this.$message('非小微条线请确认!');
             return;
            }
          };
        }
      if('A' == loginUser.org.orgType){
           // 是否保全客户经理岗
        startdto.param.duty = '0';
        const dutysList = loginUser.dutys;
        if (dutysList != undefined && dutysList.length > 0) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
              startdto.param.duty = '1';
              break;
            }
          }
        }
        if (loginUser.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH15';// （寿光）
            if(repayType == '02'){ // 保证金代偿
              startdto.bizType = 'SGH14';
            }
          } else if (loginUser.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH15';// （东海）
            if(repayType == '02'){ // 保证金代偿
              startdto.bizType = 'DHH14';
            }
          }
          

      }
       console.log('业务类型--->', startdto.bizType);
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    getPrdTypeProp (billNo) {
      let prdTypeProp = '';
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/accloan/selectbybill',
        data: { billNo: billNo },
        callback: function (code, message, response) {
          prdTypeProp = response.data.prdTypeProp;
        }
     });
     return prdTypeProp;
    },
    tempSave () {
      let jsoRt = null;
      var jsoCardData = this.formdata; // 先取得表单的数据
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: jsoCardData,
        async: false,
        success: response => {
          if (response.code == '0') {
            jsoRt = response;
            this.$message('更新成功!');
            // 回调数据
            this.pageParams.callback && this.pageParams.callback();
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
      this.back();
    },

    // 查询业务条线
    getBelgLine(){
      var model = {};
      var _this = this;
      model.billNo = _this.pageParams.billNo;
      _this.$request({
      url: _this.$backend.cmisBiz + '/api/accloan/querymodel',
        method: 'post',
        data: JSON.stringify({ condition: JSON.stringify(model) })
      }).then((response) => {
       if (response.code == '0') {
            _this.formdata.belgLine = response.data[0].belgLine;
            //默认回显 客户的还款账户
            if(!_this.formdata.isOtherAcct){
              _this.formdata.isOtherAcct = '0';
              _this.formdata.repayAcctNo = response.data[0].repayAccno;
              _this.formdata.repayAcctName = response.data[0].repayAcctName;
              _this.formdata.repaySubAccno = response.data[0].repaySubAccno;
            }
       }
      })
    },

    getAccNoT () {
      var _this = this;
      let jsoPar = _this.formdata;
      let repayAcctNo = jsoPar.repayAcctNo;
      if (repayAcctNo == null || repayAcctNo == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { loanPayoutAccno: jsoPar.repayAcctNo };
      _this.$dialog.open('', 'bizmanage/iqpBiz/iqpEntrustLoanApp/singleAccountSelectApp', 1000, 800, data, params => {
        // console.log(params);
        _this.$refs.refForm.formdata.repayAcctName = params.zhhuzwmc;
        _this.$refs.refForm.formdata.repaySubAccno = params.zhhaoxuh;
      });
    },

    calculateTotalAmt () {
      this.checkAmt();
      this.formdata.totalBjAmt = parseFloat(this.formdata.zcbjAmt) + parseFloat(this.formdata.yqbjAmt) + + parseFloat(this.formdata.dzbjAmt) +parseFloat(this.formdata.daizbjAmt);
      this.formdata.totalLxAmt = parseFloat(this.formdata.ysyjlxXmt) + parseFloat(this.formdata.csyjlxAmt) + parseFloat(this.formdata.ysqxAmt) + parseFloat(this.formdata.csqxAmt);
      this.formdata.totalFxAmt = parseFloat(this.formdata.ysyjfxAmt) + parseFloat(this.formdata.ysfxAmt) + parseFloat(this.formdata.csyjfxAmt) + parseFloat(this.formdata.csfxAmt);
      this.formdata.totalFuxAmt = parseFloat(this.formdata.yjfxAmt) + parseFloat(this.formdata.fxAmt);
      this.formdata.totalTqlxAmt = parseFloat(this.formdata.totalLxAmt) + parseFloat(this.formdata.totalFxAmt) + parseFloat(this.formdata.totalFuxAmt) + parseFloat(this.formdata.totalHxlxAmt);
      //  已核销贷款
      if ('6' == this.formdata.accStatus) {
        this.formdata.totalBjAmt= '0';
        this.formdata.totalLxAmt = '0';
        this.formdata.totalFxAmt = '0';
        this.formdata.totalFuxAmt = '0';
      } else {
        this.formdata.totalHxbjAmt = '0';
        this.formdata.totalHxlxAmt = '0';
      }
    },
    checkAmt () {
      if (this.formdata.zcbjAmt > this.formdata.trialZcbjAmt) {
        this.$message('1-归还正常本金不能大于对应的试算金额!');
        this.formdata.zcbjAmt = this.formdata.trialZcbjAmt;
        return;
      }
      if (this.formdata.yqbjAmt > this.formdata.trialYqbjAmt) {
        this.$message('9-归还逾期本金不能大于对应的试算金额!');
        this.formdata.yqbjAmt = this.formdata.trialYqbjAmt
        return;
      }
      if (this.formdata.dzbjAmt > this.formdata.trialDzbjAmt) {
        this.$message('2-归还呆滞本金不能大于对应的试算金额!');
        this.formdata.dzbjAmt = this.formdata.trialDzbjAmt
        return;
      }
      if (this.formdata.daizbjAmt > this.formdata.trialDaizbjAmt) {
        this.$message('10-归还呆账本金不能大于对应的试算金额!');
        this.formdata.daizbjAmt = this.formdata.trialDaizbjAmt
        return;
      }
      if (this.formdata.ysyjlxXmt > this.formdata.trialYsyjlxXmt) {
        this.$message('3-归还应收应计利息不能大于对应的试算金额!');
        this.formdata.ysyjlxXmt = this.formdata.trialYsyjlxXmt
        return;
      }
      if (this.formdata.csyjlxAmt > this.formdata.trialCsyjlxAmt) {
        this.$message('11-归还催收应计利息不能大于对应的试算金额!');
        this.formdata.csyjlxAmt = this.formdata.trialCsyjlxAmt
        return;
      }
      if (this.formdata.ysqxAmt > this.formdata.trialYsqxAmt) {
        this.$message('4-归还应收欠息不能大于对应的试算金额!');
        this.formdata.ysqxAmt = this.formdata.trialYsqxAmt
        return;
      }
      if (this.formdata.csqxAmt > this.formdata.trialCsqxAmt) {
        this.$message('12-归还催收欠息不能大于对应的试算金额!');
        this.formdata.csqxAmt = this.formdata.trialCsqxAmt
        return;
      }
      if (this.formdata.ysyjfxAmt > this.formdata.trialYsyjfxAmt) {
        this.$message('5-归还应收应计罚息不能大于对应的试算金额!');
        this.formdata.ysyjfxAmt = this.formdata.trialYsyjfxAmt
        return;
      }
      if (this.formdata.csyjfxAmt > this.formdata.trialCsyjfxAmt) {
        this.$message('13-归还催收应计罚息不能大于对应的试算金额!');
        this.formdata.csyjfxAmt = this.formdata.trialCsyjfxAmt
        return;
      }
      if (this.formdata.ysfxAmt > this.formdata.trialYsfxAmt) {
        this.$message('6-归还应收罚息不能大于对应的试算金额!');
        this.formdata.ysfxAmt = this.formdata.trialYsfxAmt
        return;
      }
      if (this.formdata.csfxAmt > this.formdata.trialCsfxAmt) {
        this.$message('14-归还催收罚息不能大于对应的试算金额!');
        this.formdata.csfxAmt = this.formdata.trialCsfxAmt
        return;
      }
      if (this.formdata.yjfxAmt > this.formdata.trialYjfxAmt) {
        this.$message('7-归还应计复息不能大于对应的试算金额!');
        this.formdata.yjfxAmt = this.formdata.trialYjfxAmt
        return;
      }
      if (this.formdata.fxAmt > this.formdata.trialFxAmt) {
        this.$message('15-归还复息不能大于对应的试算金额!');
        this.formdata.fxAmt = this.formdata.trialFxAmt
        return;
      }
      if (this.formdata.ysfjAmt > this.formdata.trialYsfjAmt) {
        this.$message('8-归还应收罚金不能大于对应的试算金额!');
        this.formdata.ysfjAmt = this.formdata.trialYsfjAmt
        return;
      }
    }
  }
};
</script>
