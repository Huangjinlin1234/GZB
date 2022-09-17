<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDisabled">
        <yu-panel title="借据基本信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" disabled></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="起始日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原还款方式信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="原还款方式" ctype="select" name="oldRepayMode" disabled data-code="STD_ZB_REPAY_TYP" placeholder="原还款方式"></yu-xform-item>
            <yu-xform-item label="原停本付息期间" ctype="select" name="oldStopPintTerm" disabled data-code="STD_ZB_PINT_TERM" placeholder="原停本付息期间"></yu-xform-item>
            <yu-xform-item label="原还款间隔周期" ctype="select" name="oldRepayTerm" disabled data-code="STD_ZB_REPAY_TERM" placeholder="原还款间隔周期"></yu-xform-item>
            <yu-xform-item label="原还款间隔" ctype="select" name="oldRepaySpace" disabled data-code="STD_ZB_REPAY_SPACE" placeholder="原还款间隔"></yu-xform-item>
            <yu-xform-item label="原还款日确定规则" ctype="select" name="oldRepayRule" disabled data-code="STD_ZB_REPAY_RULE" placeholder="原还款日确定规则"></yu-xform-item>
            <yu-xform-item label="原还款日类型" ctype="select" name="oldRepayDtType" disabled data-code="STD_ZB_REPAY_DT_TYPE" placeholder="原还款日类型"></yu-xform-item>
            <yu-xform-item label="原还款日" ctype="yu-num" name="oldRepayDate" disabled placeholder="原还款日" :precision="0" :min="0" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="调整后的还款方式信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="还款间隔周期" ctype="select" name="repayTerm" rules="required" data-code="STD_ZB_REPAY_TERM" placeholder="还款间隔周期" @change="repayTermChange"></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="select" name="repaySpace" rules="required" data-code="STD_ZB_REPAY_SPACE" placeholder="还款间隔"></yu-xform-item>
            <yu-xform-item label="还款日" ctype="yu-num" name="repayDate" rules="required" placeholder="还款日" :precision="0" :min="0" @change="repayDateChange" :disabled="repayDateDisabled"></yu-xform-item>
            <yu-xform-item label="变更原因" ctype="textarea" name="changeResn" rules="required" placeholder="变更原因"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerName" rules="required" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerId" rules="required" disabled hidden placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerIdName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="客户大类" ctype="input" placeholder="客户大类" name="cusCatalog" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_REPAY_TYP,STD_ZB_PINT_TERM,STD_ZB_REPAY_TERM,STD_ZB_REPAY_SPACE,STD_ZB_REPAY_RULE,STD_ZB_REPAY_DT_TYPE,STD_ZB_APPR_STATUS,STD_ZB_OPR_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqprepaytermchg/update',
      addUrl: this.$backend.cmisBiz + '/api/iqprepaytermchg/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      repayDateDisabled: true,
      formDisabled: false
    };
  },
  mounted () {
  },
  methods: {
    /**
       *还款间隔周期变更申请修改页面
       *  @author chenss
       */
    AfterInit () {
      // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
      this.isFromFlowPage();
      // d1_BillCard.setBillCardValue(frameContext);frameContext.ext_serno
      this.queryData({iqpSerno: this.getFactory().contextData.iqpSerno});

      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(yufp.clone(this.formdata < {}));
      // 还款日 字段规则处理

      // 原还款日类型=固定日 该字段默认20不可修改，
      //           =协商日该字段只能录入1-27
      this.rePayDateRuleChange();
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);

      // 设置页面只读
      if (this.getFactory().contextData.opType == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.formDisabled = true;
        // 隐藏保存按钮
        this.getFactory().setButtonVisiable('save', false);

        // 隐藏提交按钮
        this.getFactory().setButtonVisiable('commit', false);
      }
    },

    // 重载页面
    showAction () {
      // 隐藏保存按钮
      this.getFactory().setButtonVisiable('tempSave', false);
      this.queryData({iqpSerno: this.getFactory().contextData.iqp_serno});
    },
    queryData: function (queryParam) {
      this.$request({
        url: this.addUrl,
        method: 'get', // 默认get请求
        data: {condition: JSON.stringify(queryParam)}
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          if (response.data instanceof Array) {
            // 数组就赋值第0项
            if (response.data.length > 0) {
              yufp.clone(response.data[0], this.formdata);
            }
          } else {
            yufp.clone(response.data, this.formdata);
          }
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '请求表单数据失败', type: 'error' });
      });
    },
    // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
    isFromFlowPage () {
      this.getFactory().contextData.fromFlow = 'N';// 设置初始值   Y 从流程页面打开;N 一般申请打开

      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            this.getFactory().contextData.iqpSerno = this.getFactory().contextData.flowData.instanceInfo.bizId;
            this.getFactory().contextData.opType = 'view';
            this.getFactory().contextData.fromFlow = 'Y';
          }
        }
      }
    },

    repayTermChange (newVal) {
      // 还款间隔周期选按周（01）时，还款间隔默认为2；
      // 其余为1；
      if (newVal == '01') {
        this.formdata.repaySpace = 'b';
      } else if (newVal == '02' || newVal == '03' || newVal == '04' || newVal == '05') {
        this.formdata.repaySpace = 'a';
      } else {
        this.formdata.repaySpace = '20';
      }
    },
    // 还款日 规则控制
    repayDateChange: function (newVal) {
      if (parseInt(newVal) < 1 || parseInt(newVal) > 28) {
        this.formdata.repayDate = '';
        this.$xutils.showMsgBox('提示', '请输入1-28的整数！');
      }
    },
    // 还款日字段初始化控制
    rePayDateRuleChange () {
      const rePayDateRule = this.formdata.oldRepayDtType;
      if (rePayDateRule == '1') {
        // 固定日
        this.repayDateDisabled = true;
        this.formdata.repayDate = '20';
      } else if (rePayDateRule == '2') {
        // 协商日
        this.repayDateDisabled = false;
        this.formdata.repayDate = '';
      } else {
        // 对应日
        this.repayDateDisabled = false;
      }
    },
    // 保存
    save () {
      // 校验必输
      var _this = this;
      var validate = false;
      this.$refs.refForm(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const userInfo = this.$xutils.getLoginUserInfo();
      this.formdata.updId = userInfo.loginCode;
      this.formdata.updBrId = userInfo.orgCode;
      this.formdata.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // 保存
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: yufp.clone(this.formdata, {})
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          _this.$xutils.getParentPage(this, null, 'back');
        }
      }).catch(() => {
        // 处理请求失败的情况
        _this.$message({ message: '暂存失败', type: 'error' });
      });
    },

    // 保存并提交
    commit () {
      // 校验必输
      var _this = this;
      let saveResult = null;
      var validate = false;
      this.$refs.refForm(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 保存
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: yufp.clone(this.formdata, {}),
        async: false
      }).then((response) => {
        if (response.code == '0') {
          saveResult = response;
          _this.$message('更新成功!');
        }
      }).catch(() => {
        // 处理请求失败的情况
        _this.$message({ message: '更新失败', type: 'error' });
      });
      if (!saveResult || saveResult.code != 'ok') {
        return;
      }
      this.$xutils.request({
        // 同步请求
        // 校验是否存在同类业务
        url: this.$backend.cmisBiz + '/api/iqprepaytermchg/checkIsExistIqpRepayTermChgBizByBillNo',
        data: JSON.stringify(this.formdata),
        success: (response, status, xhr) => {
          if (response.data == 0) {
            const loginUser = this.$xutils.getLoginUserInfo();
            const sendPars = {
              'systemId': 'cmis',
              'orgId': loginUser.orgId,
              'bizId': this.formdata.iqpSerno,
              'bizType': 'IQP_REPAY_TERM_CHG_FLOW',
              'userId': loginUser.loginCode,
              'bizUserName': this.formdata.cusName,
              'bizUserId': this.formdata.cusId
            };

            _this.$xutils.wfInit(sendPars, this.onCancelPage);
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', '错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });
    },
    // 提交返回
    onCancelPage () {
      this.$xutils.getParentPage(this, null, 'back');
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 借据查看
    viewLoan () {
      const billNo = this.formdata.billNo;
      if (!(billNo && billNo != '')) {
        this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
        return;
      }
      const params = this.findAccInfoFromBackend(billNo);
      if (params) {
        params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';// 贷款台账模块
        params['op'] = 'VIEW';
        this.$dialog.open(
          '贷款台账',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },

    // 获取借据信息
    findAccInfoFromBackend (billNo) {
      let returnData = {};
      this.$xutils.request({
        type: 'get',
        url: this.$backend.cmisBiz + '/api/accloan/' + billNo,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = response.data;
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      return returnData;
    },

    // 客户信息查看
    viewCus () {
      const jsoPar = this.formdata;
      const params = {};
      if (jsoPar.cus_id == '' || jsoPar.cus_id == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }
      params['cusId'] = jsoPar.cusId;
      const cusCatalog = this.getFactory().contextData.cus_catalog;
      if (cusCatalog == '2') {
        // 对公
        params['model_group_no'] = 'CMG000114';
        params['flag'] = 'view';
        this.$dialog.open(
          '企业客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      } else if (cusCatalog == '1') {
        // 对私
        params['model_group_no'] = 'CMG000013';
        params['flag'] = 'view';
        this.$dialog.open(
          '个人客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      } else {
        this.$xutils.showMsgBox('提示', '无法确定客户大类！');
        return;
      }
    },

    // 客户信息
    findCusInfoFromBackend (cusId) {
      let returnData = {};
      this.$xutils.request({
        type: 'get',
        url: this.$backend.cmisCus + '/api/cusbase/' + cusId,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = response.data;
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      return returnData;
    },

    // 查看公司客户页面
    routeToPageCusCorp (cusId) {
      const params = {
        'cusId': cusId,
        flag: 'view',
        'model_group_no': 'CMG000114'
      };
      this.$dialog.open(
        '企业客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        false
      );
    },

    // 查看个人客户页面
    routeToPageCusIndiv (cusId) {
      let returnData = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'get',
        url: this.$backend.cmisCus + '/api/cusindiv/' + cusId,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      if (returnData) {
        const selectedRowData = returnData;
        selectedRowData.flag = 'view';
        this.$dialog.open('个人客户查看页面', 'cusmanage/indivCus/indivCusMsgIndex', -1, -1, yufp.clone(selectedRowData, {}));
      }
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
