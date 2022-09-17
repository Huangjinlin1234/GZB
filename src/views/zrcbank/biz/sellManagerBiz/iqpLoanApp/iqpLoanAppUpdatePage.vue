<template>
  <div class="standard-form">
    <el-tabs :tab-position="'left'">
      <el-tab-pane label="业务申请">
        <yu-xform ref="refForm" label-width="200px" v-model="tableFormdata1" more-fields-flag="true">
          <yu-panel title="贷款信息" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="全局流水号" ctype="input" name="serno" :rules="nameRule" v-if="show"></yu-xform-item>
              <yu-xform-item label="业务流水号" ctype="input" name="iqpSerno" :disabled="true" required="true"></yu-xform-item>
              <yu-xform-item label="借款人" ctype="input" name="cusId" :disabled="true" required="true"></yu-xform-item>
              <yu-xform-item label="申请金额" ctype="input" name="appAmt" required="true"></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName" :disabled="true" required="true"></yu-xform-item>
              <yu-xform-item label="贷款期限（月）" ctype="input" name="appTerm" required="true"></yu-xform-item>
              <yu-xform-item label="贷款形式" ctype="select" name="loanModel" data-code="STD_ZB_LOAN_TYPE" :disabled="false"></yu-xform-item>
              <yu-xform-item label="贷款用途" ctype="select" name="loanUse" data-code="STD_ZB_LOAN_USE" required="true"></yu-xform-item>
              <yu-xform-item label="申请贷款类型" ctype="select" name="loanWay" data-code="STD_ZB_CONT_TYPE2" :disabled="true"></yu-xform-item>
              <yu-xform-item label="是否公积金组合贷款" ctype="select" name="loanUnionYes" data-code="STD_ZB_YES_NO" required="true"></yu-xform-item>
              <yu-xform-item label="币种" ctype="select" data-code="STD_ZB_CUR_TYP" name="appCurType" :disabled="true" required="true"></yu-xform-item>
              <yu-xform-item label="公积金贷款利率" ctype="input" name="pundRate" required="true"></yu-xform-item>
              <yu-xform-item label="公积金贷款金额" ctype="input" name="pundAmt" required="true"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="利率信息" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="是否申请优惠利率" ctype="select" name="preferRateFlag" :rules="nameRule" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="利率调整日" ctype="select" name="loanRateAdjDay" data-code="STD_ZB_CHANGE_IR2"></yu-xform-item>
              <yu-xform-item label="利率调整方式" ctype="select" data-code="STD_ZB_IR_ADJ_MODE3" name="irAdjustType" required="true"></yu-xform-item>
              <yu-xform-item label="LPR定价区间" ctype="select" name="curtLprRate" data-code="STD_ZB_LPR_LIMIT"></yu-xform-item>
              <yu-xform-item label="当前LPR利率（%）" ctype="input" name="lprRate" required="true"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="还款方式" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="结息方式" ctype="select" name="eiMode" data-code="STD_ZB_EI_MODE"></yu-xform-item>
              <yu-xform-item label="还款方式" ctype="select" name="repaymentTypr" data-code="STD_ZB_PUND_REPAY_MODE"></yu-xform-item>
              <yu-xform-item label="本笔公积金贷款月还款额" ctype="input" name="pundLoanMonRepay" :rules="numRule"></yu-xform-item>
              <yu-xform-item label="本笔月还款额" ctype="input" name="monthRepay"></yu-xform-item>
              <yu-xform-item label="本笔月还款额合计" ctype="input" name="monthRepaySum"></yu-xform-item>
              <yu-xform-item label="其他消费贷款月还款额" ctype="input" name="otherMonthRepay"></yu-xform-item>
              <yu-xform-item label="合计月还款额" ctype="input" name="monthSum"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="担保信息" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="担保方式" ctype="select" name="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
              <yu-xform-item label="是否在线抵押" ctype="select" name="onlinePldFlag" data-code="STD_ZB_YES_NO"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="合同信息" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="合同模式" ctype="select" name="contMode" data-code="STD_ZB_CONT_MODE"></yu-xform-item>
              <yu-xform-item label="线上提款" ctype="select" name="drawMode" data-code="STD_ZB_YES_NO"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="第三方信息" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="第三方标识" ctype="select" name="isOut" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="项目编号" ctype="input" name="tdpAgrNo" :rules="ruleAcco"></yu-xform-item>
              <yu-xform-item label="项目流水号" ctype="input" name="tdpAgrNo" :rules="ruleAcco"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="调查结论" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="调查人意见" ctype="input" name="inveResult"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="登记信息" is-collapse>
            <yu-xform-group :column="2">
              <yu-xform-item label="登记人" ctype="input" name="inputId" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记人电话" ctype="input" name="author" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记时间" ctype="input" name="inputDate" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="inputId" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="inputBrId" :disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
        <yu-form-buttons :padding-left="500">
          <yu-button type="primary" @click="saveFn">暂存</yu-button>
          <yu-button type="primary" @click="saveFn">保存</yu-button>
          <yu-button @click="cancelFn">返回</yu-button>
        </yu-form-buttons>
      </el-tab-pane>
      <el-tab-pane label="小贷集中放款-已办">
        <yu-panel title="核心出账列表">
          <template slot="filter">
            <yu-xform related-table-name="refDealTable" form-type="search">
              <yu-xform-group :column="4">
                <yu-xform-item placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
                <yu-xform-item placeholder="借据编号" ctype="input" name="billNo"></yu-xform-item>
                <yu-xform-item placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                <yu-xform-item placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
                <yu-xform-item placeholder="授权状态" ctype="input" name="authStatus"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-button-drop>
            <yu-button @click="infosFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refDealTable" row-number :data-url="dataUrls" request-type="POST">
            <yu-xtable-column label="交易流水号" prop="tranSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权编号" prop="authorizeNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="业务编号" prop="iqpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权类型 STD_ZB_AUTH_TYPE" prop="authorizeType" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="未受托支付类型" prop="untruPayType" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易编号" prop="tranId" width="120"></yu-xtable-column>
            <yu-xtable-column label="账号" prop="acctNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="账号名称" prop="acctName" width="120"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="交易金额" prop="tranAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易日期" prop="tranDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="发送次数" prop="sendTimes" width="120"></yu-xtable-column>
            <yu-xtable-column label="应答信息" prop="returnDesc" width="120"></yu-xtable-column>
            <yu-xtable-column label="主办人" prop="managerId" width="120"></yu-xtable-column>
            <yu-xtable-column label="主办机构" prop="managerBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="放款机构" prop="acctBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权状态 STD_ZB_AUTH_ST" prop="authStatus" data-code="STD_ZB_AUTH_ST"></yu-xtable-column>
            <yu-xtable-column label="出账状态" prop="tradeStatus" data-code="STD_JXHJCZ_TYPE" :datacode-filter="datacodeFilterFn"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </el-tab-pane>
      <el-tab-pane label="客户信息">客户信息</el-tab-pane>
      <el-tab-pane label="共同借款人">共同借款人</el-tab-pane>
      <el-tab-pane label="购房信息">购房信息</el-tab-pane>
      <el-tab-pane label="担保情况">担保情况</el-tab-pane>
      <el-tab-pane label="还款能力分析">还款能力分析</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
yufp.lookup.reg(
  'USER_STATUS,USER_CLASSIFY,DEPARTMENT,GENDER,IDENT_TYPE,BRANCH,PWD_TYPE'
);

export default {
  name: 'StandardForm',
  data: function () {
    /**
      * 检测站好是否为数字或英文不区分大小写
      */
    var checkAcco = function (rule, value, callback) {
      setTimeout(function () {
        var reg = /^[0-9a-zA-Z]+$/;
        if (!reg.test(value)) {
          callback(new Error('账号必须为数字或英文'));
        } else {
          callback();
        }
      }, 1000);
    };
      /**
      * 检验密码是6-18位，由数字、大小写字母组成
      */
    var checkPwd = function (rule, value, callback) {
      setTimeout(function () {
        var reg = /^[a-zA-Z0-9]{6,18}$/;
        if (!reg.test(value)) {
          callback(new Error('密码必须由6-18位，由数字、大小写字母组成'));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      userStatus: {},
      tableFormdata: {
        status: '01',
        sex: '01'
      }, // 编辑表格表单
      rule: [
        { required: true, message: '必填项' },
        { validator: yufp.validator.number, message: '数字' }
      ],
      numRule: [{ required: true, message: '请输入工号' }],
      orgRule: [{ required: true, message: '请选择所属机构' }],
      partRule: [{ required: true, message: '请选择所属部门' }],
      pwdRule: [{ required: true, message: '请选择或自定义输入密码' }],
      nameRule: [{ required: true, message: '请选输入姓名' }],
      emailRule: [{ required: true, message: '请选输入电子邮件' }],
      telNumberRule: [{ required: true, message: '请输入联系电话' }],
      statusRule: [{ required: true, message: '请选择状态' }],
      pwdInputRule: [{ validator: checkPwd }],
      options: [
        { key: 'default', value: '默认(8888)' },
        { key: 'define', value: '自定义' }
      ],
      surePwd: '',
      pwdType: 'default'
    };
  },
  created: function () {
    this.userStatus = yufp.lookup.find('USER_STATUS', false);
  },
  mounted: function () {
    let _this = this;
    // 输出
    console.log(this.$route.params);
    var iqpSerno = this.$route.params.iqpSerno;
    console.log('业务流水号' + iqpSerno);
    yufp.service.request({
      method: 'GET',
      url: backend.cmisBiz + '/api/iqploanapp/' + iqpSerno,
      callback: function (code, message, response) {
        if (code === '0') {
          yufp.clone(response.data, _this.tableFormdata1);
        } else {
          this.$message({
            message: message,
            type: 'error'
          });
        }
      }
    });
    yufp.service.request({
      method: 'GET',
      url: backend.cmisBiz + '/api/iqploanappassist/' + iqpSerno,
      callback: function (code, message, response) {
        if (code === '0') {
          yufp.clone(response.data, _this.tableFormdata1);
        } else {
          this.$message({
            message: message,
            type: 'error'
          });
        }
      }
    });
    var pkId = iqpSerno;
    yufp.service.request({
      method: 'GET',
      url: backend.cmisBiz + '/api/iqphouse/' + pkId,
      callback: function (code, message, response) {
        if (code === '0') {
          yufp.clone(response.data, _this.tableFormdata1);
        } else {
          this.$message({
            message: message,
            type: 'error'
          });
        }
      }
    });
  },
  methods: {
    /**
      * 保存
      */
    saveFn: function () {
      console.log('保存开始');
      var _this = this;
      var model = {};
      yufp.clone(_this.tableFormdata1, model);
      // var validate = false;
      // _this.$refs.refForm.validate(function (valid) {
      //   validate = valid;
      // });
      // if (!validate) {
      //   return;
      // }

      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/updateiqpLoanappsell',
        data: {iqpLoanApp: model,
          iqpLoanAppAssist: model,
          iqpHouse: model
        },
        callback: function (code, message, response) {
          var rtnCode = response.data.rtnCode;
          var rtnMsg = response.data.rtnMsg;
          if (rtnCode == '000000') {
            _this.$message('保存成功');
          } else {
            _this.$message(rtnMsg);
          }
        }
      });
    },
    /**
      * 取消弹框
      */
    cancelFn: function (data) {
      this.dialogDetailVisible = false;
      this.dialogVisible = false;
    },
    /**
      * 重置所有表单内容
      */
    resetFormFn: function () {
      this.$refs.refForm.resetFields();
    },
    /**
      * 判断第一次密码是否已经输入
      */
    preInput: function () {
      if (!this.tableFormdata.pwd) {
        this.$message('请先输入密码', '警告');
        return false;
      }
    },
    /**
      * 判断2次密码是否一致
      */
    judgePwd: function () {
      if (this.tableFormdata.pwd !== this.tableFormdata.surePwd) {
        this.$message('两次密码输入不一致', '警告');
      }
    }
  }
};
</script>
<style>
.el-tabs.el-tabs--left {
  min-height: 200px!important;
  height: auto!important;
}
</style>