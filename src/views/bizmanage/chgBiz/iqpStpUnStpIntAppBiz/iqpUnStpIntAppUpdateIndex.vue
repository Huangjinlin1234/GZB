<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDisabled">
        <yu-panel title="申请信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" disabled></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="起始日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
            <yu-xform-item label="表内欠息" ctype="yu-currency" name="innerOweInt" disabled placeholder="表内欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="复利" ctype="yu-currency" name="psCommOdInt" disabled placeholder="复利" :min="0" ></yu-xform-item>
            <yu-xform-item label="计息类型" ctype="select" name="intType" rules="required" disabled data-code="STD_ZB_INT_TYPE" placeholder="计息类型"></yu-xform-item>
            <yu-xform-item label="是否计收复利" ctype="select" name="isCalCi" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否计收复利"></yu-xform-item>
            <yu-xform-item label="恢复计息日期" ctype="datepicker" name="unstopDate" value-format="yyyy-MM-dd" rules="required" placeholder="恢复计息日期"></yu-xform-item>
            <yu-xform-item label="恢复计息原因" ctype="textarea" name="resn" rules="required" placeholder="恢复计息原因"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerIdName" rules="required" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','userName':'managerIdName'}" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrIdName" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrIdName','orgId':'managerBrId'}" ></yu-xform-item>
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code=" STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="停息日期" ctype="datepicker" name="stopDate" value-format="yyyy-MM-dd" hidden placeholder="停息日期"></yu-xform-item>
            <yu-xform-item label="表外欠息" ctype="input" placeholder="表外欠息" name="outOweInt" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
/**
 * title 停息新增修改界面
 * author 马顺
 * date 2021-01-13
 * */
// 是否流程进入主页面
let wfFlag = false;

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      formDisabled: false,
      updateUrl: this.$backend.cmisBiz + '/api/iqpstpunstpintapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpstpunstpintapp/',
      formdata: {},
      formType: 'edit'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 初始化页面
    afterInit () {
      // 明确是否为流程进入页面
      this.initWfStatus();
      // 创建借据选择列表
      this.queryData({iqpSerno: this.getFactory().contextData.iqpSerno});
      this.initData();

      // 执行配置的默认值公式
      this.execDefaultValueFormula();
      // 加载工具js
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   null
      // );
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

    // 判断是否流程进入页面
    initWfStatus () {
      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          wfFlag = true;
          this.getFactory().contextData.wfFlag = wfFlag;

          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            // 将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.iqpSerno = this.getFactory().contextData.flowData.instanceInfo.bizId;

            // 隐藏按钮
            this.getFactory().setButtonVisiable('commit', false);
            //
            this.getFactory().setButtonVisiable('save', false);
            this.getFactory().setButtonVisiable('tempSave', false);
            this.getFactory().setButtonVisiable('back', false);
          }
        }
      }
    },

    // 初始化触发
    initData () {
      // 针对查看以及流程进入页面，不允许编辑操作
      if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
        this.formDisabled = true;
      }
    },


    // 保存，提交通用的方法
    commonSave (func) {
      // 必输校验
      var validate = false;
      this.$refs.refForm(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 获取页面保存数据
      let params = this.formdata;
      // 调用后续保存方法
      let saveFlag = this.sendSavePost(params);

      if (saveFlag) {
        func();
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
        url: this.$backend.cmisBiz + '/api/iqpstpunstpintapp/update',
        data: JSON.stringify(params),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      if (rtnData != '1') {
        this.$xutils.showMsgBox('提示', '错误代码：修改失败,错误信息：更新异常');
        return false;
      }
      return saveFlag;
    },
    // 页面定义的保存方法
    save () {
      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, () => {
          // 刷新列表页面
          this.$xutils.getParentPage2(this, null, 'refreshBillListData');

          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(yufp.clone(this.formdata, {}));
        });
      });
    },

    // 暂存方法
    tempSave () {
      // 因为为单表数据保存，因此暂存操作可以调用框架的保存方法
      const rtnData = this.tempSaveData();

      if (rtnData && rtnData.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功！', 350, 200, () => {
          // 刷新列表页面
          this.$xutils.getParentPage2(this, null, 'refreshBillListData');
          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(yufp.clone(this.formdata, {}));
        });
      } else {
        this.$xutils.showMsgBox('提示', '保存失败！错误信息：' + rtnData.msg);
      }
    },
    tempSaveData: function () {
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: yufp.clone(this.formdata, {})
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          // jsoRt = response;
          this.$message('暂存成功!');
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '暂存失败', type: 'error' });
      });
    },
    // 提交按钮
    commit () {
      this.commonSave(() => {
        // 刷新列表页面
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');

        this.afterSaveCommit();
      });
    },
    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      const loginUser = this.$xutils.getLoginUserInfo();
      const rsPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.formdata.iqpSerno,

        // 流程申请类型会自动创建队列
        'bizType': 'IQP_UNSTP_INT_APP',

        'userId': loginUser.loginCode,

        // 客户名称
        'bizUserName': this.formdata.cusName,

        // 客户编号
        'bizUserId': this.formdata.cusId
      };
      this.$xutils.wfInit(rsPars, null);
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

    // 查看客户号
    doCusView () {
      const cusId = this.formdata.cusId;
      if (!(cusId && cusId != '')) {
        this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
        return;
      }
      const cusBaseInfo = this.findCusInfoFromBackend(cusId);
      // 判定对公对私
      if (cusBaseInfo && cusBaseInfo != null) {
        const cusCatalog = cusBaseInfo.cusCatalog;
        if (cusCatalog == '2') {
          // 对公
          this.routeToaPgeCusCorp(cusId);// 原js文件巍找到定义
        } else if (cusCatalog == '1') {
          // 对私
          this.routeToPageCusIndiv(cusId);// 原js文件巍找到定义
        } else {
          this.$xutils.showMsgBox('提示', '无法确定客户大类！');
          return;
        }
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

    // 查看借据号
    doBillView () {
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
    execDefaultValueFormula: function () {
      this.formdata.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
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
