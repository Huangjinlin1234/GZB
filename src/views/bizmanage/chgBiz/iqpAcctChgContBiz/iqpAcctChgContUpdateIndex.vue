<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDisabled">
        <yu-panel title="合同信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" disabled></yu-xform-item>
            <yu-xform-item label="合同签订日期" ctype="datepicker" name="signDate" value-format="yyyy-MM-dd" disabled placeholder="合同签订日期"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="yu-xloan-cont" name="contNo" disabled placeholder="合同编号" @select-fn="commonSelectFn" :mapping="{'contNo':'contNo'}" width="730" height="480" :parms="{'belgLine':'bl300','oprType':'01'}" ></yu-xform-item>
            <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="cnContNo" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="yu-xproduct" name="prdId" disabled placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" :parms="{'belgLine':'bl300','cusState':'20','oprType':'01'}" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" disabled placeholder="合同金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="合同余额" ctype="yu-currency" name="contBalance" disabled placeholder="合同余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="合同起始日期" ctype="datepicker" name="contStartDate" value-format="yyyy-MM-dd" disabled placeholder="合同起始日期"></yu-xform-item>
            <yu-xform-item label="合同到期日期" ctype="datepicker" name="contEndDate" value-format="yyyy-MM-dd" disabled placeholder="合同到期日期"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="变更信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同待变更帐号" ctype="yu-xaccount" name="acctNo" hidden placeholder="合同待变更帐号" @select-fn="commonSelectFn" :mapping="{'acctNo':'acctNo','contNo':'contNo'}" width="1000" height="780" :parms="{'a.contNo':'${contNo}','a.oprType':'01'}" ></yu-xform-item>
            <yu-xform-item label="账号变更原因" ctype="textarea" name="changeAcctResn" rules="required" placeholder="账号变更原因"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerName" rules="required" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="客户大类" ctype="input" placeholder="客户大类" name="cusCatalog" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
/**
 *合同帐号变更申请修改页面
 *  @author yxl
 */
// var pars = self.jsoOpenPars;
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_ZB_APPR_STATUS,STD_ZB_OPR_TYPE');

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpacctchgcont/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpacctchgcont/',
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
    AfterInit () {
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);
      // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
      this.isFromFlowPage();
      this.queryData({iqpSerno: this.getFactory().contextData.iqpSerno}); // 查询数据
      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(yufp.clone(this.formdata, {}));
      // 加载工具js
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   null
      // );
      // 设置页面只读
      if (this.getFactory().contextData.op == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.formDisabled = true;
        // 隐藏保存按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('save', false);
        // 隐藏提交按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('commit', false);
      }
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
            this.getFactory().contextData.op = 'view';
            this.getFactory().contextData.fromFlow = 'Y';
          }
        }
      }
    },


    // 封装发送后台的逻辑，保存，暂存通用的方法
    sendSavePost (params) {
      const saveFlag = true;
      let rtnData = {};
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/iqpacctchgcont/updateIqpAcctChgCont',
        data: JSON.stringify(params),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', '错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });

      if (JSON.stringify(rtnData) == '{}') {
        return false;
      }
      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
        return false;
      }
      return saveFlag;
    },

    // 保存，提交通用的方法
    commonSave (func, opFlag) {
      // TODO 此处对于某些保存按钮不需要校验的根据opFlag判断是保存还是提交，对d1_BillCard中的字段去掉必填项校验
      // d1_BillCard.setBillCardItemRequired(_itemKey, _required) 1._itemKey 多字段： 'username;usercode'  所有字段 '*' 2._required:true 必填/false非
      // 必输校验
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 获取页面保存数据
      const params = this.formdata;
      // 20201225 入参标志位用于保存暂存的校验
      params['opFlag'] = opFlag;
      // 增加第三方额度校验标志位
      // params['thCheckStage'] = 'update';
      // 调用后续保存方法
      const saveFlag = this.sendSavePost(params);
      if (saveFlag) {
        func();
      }
    },

    // 页面定义的保存方法
    save () {
      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, () => {
          // 刷新列表页面
          this.d1_BillCard.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');

          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(this.formdata);
        });
      }, 'save');
    },

    // 暂存方法
    tempSave () {
      // 获取页面保存数据
      const params = this.formdata;

      // 20201225 入参标志位用于保存暂存的校验
      params['opFlag'] = 'tempSave';

      // 调用后续保存方法
      const saveFlag = this.sendSavePost(params);

      if (saveFlag) {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, () => {
          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(yufp.clone(this.formdata, {}));
        });
      }
    },

    // 提交按钮
    commit () {
      const checkflag = this.checkExistIqpAcctChg();
      // 不存在true，存在false
      if (!checkflag) {
        return;
      }
      // 提交
      const loginUser = this.$xutils.getLoginUserInfo();
      const sendPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.formdata.iqpSerno,
        'bizType': 'IQP_ACCT_CHG_CONT',
        'userId': loginUser.loginCode,
        'bizUserName': this.formdata.cusName,
        'bizUserId': this.formdata.cusId
      };
      this.$xutils.wfInit(sendPars, this.onCancelPage);
    },

    // 提交返回
    onCancelPage () {
      this.$xutils.getParentPage2(this, 'd1_BillList', 'queryDataByCondition');
      // YuXP.closeDialog();
      this.$xutils.getParentPage(this, null, 'back');
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      const loginUser = this.$xutils.getLoginUserInfo();
      const rsPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.formdata.iqpSerno,
        // 流程申请类型会自动创建队列
        'bizType': 'IQP_ACCT_CHG_CONT',
        'userId': loginUser.loginCode,
        // 客户名称
        'bizUserName': this.formdata.cusName,
        // 客户编号
        'bizUserId': this.formdata.cusId
      };

      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.workflowService + '/api/core/start',
        data: JSON.stringify(rsPars),
        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message, 350, 200);
          } else {
            this.$xutils.showMsgBox('提示', '提交成功 ', 350, 200, () => {
              // 刷新列表页面
              this.d1_BillCard.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');

              this.$xutils.getParentPage(this, null, 'back');
            });
          }
        }
      });
    },

    checkExistIqpAcctChg () {
      let saveFlag = false;
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        type: 'POST',
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/iqpacctchgcont/checkExistIqpAcctChg',
        data: JSON.stringify(this.formdata),
        success: (response, status, xhr) => {
          if (response.data) {
            saveFlag = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      return saveFlag;
    },

    // 返回
    onCancel () {
      this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
      this.$dialog.close(this.dialogId);
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
        cusId: cusId,
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
    // 查看合同信息
    routeToPageCusIndiv (cusId) {
      let returnData = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'get',
        url: this.$backend.cmisCus + '/api/cusindiv/' + cusId,
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

      if (returnData) {
        const selectedRowData = returnData;
        selectedRowData.flag = 'view';
        this.$dialog.open('个人客户查看页面', 'cusmanage/indivCus/indivCusMsgIndex', -1, -1, selectedRowData);
      }
    },
    viewCont () {
      const billData = this.formdata.contNo;

      if (!(billData && billData != '')) {
        this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
        return;
      }
      const opeType = 'ctrLoanCont';
      const params = this.findContInfoFromBackend(billData, opeType);
      if (params) {
        params['model_group_no'] = 'CTR_LOAN_CONT_SIGN';
        params['op'] = 'VIEW';
        params['contNo'] = billData;
        // 用于区分查询担保与业务申请(结果)表
        params['bizTy'] = 'grtLoanGuar';
        params['oprTyp'] = 'grtGuarBizRel';
        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },
    execDefaultValueFormula: function () {
      this.formdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
