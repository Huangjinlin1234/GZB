<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDisabled">
        <yu-panel title="借据信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" disabled></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" hidden></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','cusId':'cusId'}" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="发放日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="发放日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="变更信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="变更原因" ctype="textarea" name="changeAcctResn" placeholder="变更原因" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerId" disabled hidden placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerIdName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerName" rules="required" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="客户大类" ctype="input" placeholder="客户大类" name="cusCatalog" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      formDisabled: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 账户变更申请修改页面
       *  @author chenss
       */
    AfterInit () {
      // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
      this.isFromFlowPage();
      // this.d1_BillCard.queryDataByCondition({iqpSerno: this.getFactory().contextData.iqpSerno});
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);
      // 隐藏保存按钮
      this.getFactory().setButtonVisiable('save', false);
      // 隐藏提交按钮
      this.getFactory().setButtonVisiable('commit', false);
      // 设置页面只读
      if (this.getFactory().contextData.opType == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.formDisabled = true;
      } else if (this.getFactory().contextData.opType == 'add') {
        this.execBillCardDefaultValueFormula();
      }
    },

    // 重载页面
    showAction () {
      let _this = this;
      // 隐藏保存按钮
      this.getFactory().setButtonVisiable('tempSave', false);
      this.$request({
        url: this.addUrl,
        method: 'get', // 默认get请求
        data: {iqpSerno: this.getFactory().contextData.iqpSerno}
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          if (response.data instanceof Array) {
            // 数组就赋值第0项
            if (response.data.length > 0) {
              yufp.clone(response.data[0], _this.formdata);
            }
          } else {
            yufp.clone(response.data, _this.formdata);
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

    // 保存
    save () {
      let _this = this;
      // 校验必输
      var validate = false;
      this.$refs.refForm(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const userInfo = this.$xutils.getLoginUserInfo();
      let model = yufp.clone(this.formdata, {});
      model.updId = userInfo.loginCode;
      model.updBrId = userInfo.orgCode;
      model.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: yufp.clone(this.formdata, {}),
        success: (response) => {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
              this.getFactory.back();
            });
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
    },
    // 保存并提交
    commit () {
      // 校验必输
      let _this = this;
      let saveResult = null;
      // 校验必输
      let validate = false;
      this.$refs.refForm(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: yufp.clone(this.formdata, {}),
        async: false,
        success: (response) => {
          saveResult = response;
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
              this.getFactory.back();
            });
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
      if (!saveResult || saveResult.code != 'ok') {
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        // 校验是否存在同类业务
        url: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/checkIqpBillAcctChgAppByBillNo',
        data: yufp.clone(this.formdata, {}),
        success: (response, status, xhr) => {
          if (response.data == 0) {
            // 提交
            const loginUser = this.$xutils.getLoginUserInfo();
            const sendPars = {
              'systemId': 'cmis',
              'orgId': loginUser.orgId,
              'bizId': this.d1_BillCard.getItemValue('iqp_serno'),
              'bizType': 'IQP_BILL_ACCT_CHG_APP',
              'userId': loginUser.loginCode,
              'bizUserName': this.d1_BillCard.getItemValue('cus_name'),
              'bizUserId': this.d1_BillCard.getItemValue('cus_id')
            };
            this.$xutils.wfInit(sendPars, this.onCancelPage);
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 提交返回
    onCancelPage () {
      this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
      this.$dialog.close(this.dialogId);
    },

    // 返回
    onCancel () {
      this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
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
        // 同步请求
        async: false,
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
      if (jsoPar.cusId == '' || jsoPar.cusId == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }
      params['cusId'] = jsoPar.cusId;
      const cusCatalog = this.getFactory().contextData.cusCatalog;
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
        // 同步请求
        async: false,
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
        true
      );
    },

    // 查看个人客户页面
    routeToPageCusIndiv (cusId) {
      const params = {
        'cusId': cusId,
        flag: 'view',
        'model_group_no': 'CMG000013'
      };

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
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginUserId');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
