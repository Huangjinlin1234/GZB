<template>
  <div>
    <div style="height:50%">
        <div>
    <div style="height:40%">
        <d1-a-a-billcard ref="d1_A_A_BillCard"></d1-a-a-billcard>
    </div>
    <div style="height:calc(100% - 40%)">
        <d1-a-b-billlist ref="d1_A_B_BillList"></d1-a-b-billlist>
    </div>
  </div>
    </div>
    <div style="height:calc(100% - 50%)">
        <div>
    <div style="height:80%">
        <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
    </div>
    <div style="height:calc(100% - 80%)">
        <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
    </div>
  </div>
    </div>
  </div>
</template>
<script>
import d1AABillcard from './rePlanUpdate_d1_A_A_BillCard.vue'
import d1BBBillcard from './rePlanUpdate_d1_B_B_BillCard.vue'
import d1ABBilllist from './rePlanUpdate_d1_A_B_BillList.vue'
import d1BABilllist from './rePlanUpdate_d1_B_A_BillList.vue'
export default {
  components:{d1AABillcard, d1BBBillcard, d1ABBilllist, d1BABilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_A_BillCard: null,
      d1_B_B_BillCard: null,
      d1_A_B_BillList: null,
      d1_B_A_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * 还款计划变更申请修改页面
       *  @author lzz
       */
    AfterInit() {
      // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
      this.isFromFlowPage();
  
      this.d1_A_A_BillCard = this.$refs.d1_A_A_BillCard;
      this.d1_A_A_BillCard.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');
  
      //原还款计划信息
      this.d1_A_B_BillList = this.$refs.d1_A_B_BillList;
  
      this.d1_A_B_BillList.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');
  
      //调整后还款计划信息
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
  
      this.d1_B_A_BillList.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');
  
      if (this.getFactory().contextData.op == 'VIEW') {
        this.d1_B_A_BillList.setBillListButtonVisable('新增', false);
        this.d1_B_A_BillList.setBillListButtonVisable('删除', false);
      }
  
      //登记信息
      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;
  
      this.d1_B_B_BillCard.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');
  
      // 添加表单监听 设置CHANGE事件
      /*  d1_BillCard.addEditChangeAction(change);*/
  
      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_A_A_BillCard.getBillCardValue());
  
      //隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);
  
      // 设置页面只读
      if (this.getFactory().contextData.op_type == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.d1_A_A_BillCard.setItemEditable('*', false);
  
        //隐藏保存按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('save', false);
  
        //隐藏提交按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('commit', false);
      }
    },
  
    // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
    isFromFlowPage() {
      this.getFactory().contextData.fromFlow = 'N';// 设置初始值   Y 从流程页面打开;N 一般申请打开
  
      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            this.getFactory().contextData.iqp_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;
            this.getFactory().contextData.op_type = 'view';
            this.getFactory().contextData.fromFlow = 'Y';
          }
        }
      }
    },
  
    // 保存
    save() {
      // 校验必输
      const saveFlag = this.d1_A_A_BillCard.validateBillCardValue();
  
      if (!saveFlag) {
        return;
      }
  
      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_A_A_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_A_A_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_A_A_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      const resp = this.d1_A_A_BillCard.updateBillCardData();
  
      if (resp && resp.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
          this.$xutils.getParentPage2(this, 'd1_BillList', 'queryDataByCondition');
          this.$xutils.getParentPage(this, null, 'back');
        });
      }
    },
  
    // 保存并提交
    commit() {
      // 校验必输
      const saveFlag = this.d1_A_A_BillCard.validateBillCardValue();
  
      const saveFlag1 = this.d1_B_B_BillCard.validateBillCardValue();
  
      if (!saveFlag) {
        return;
      }
  
      if (!saveFlag1) {
        return;
      }
  
      //保存
      const saveResult = this.d1_A_A_BillCard.updateBillCardData();
  
      const saveResult1 = this.d1_B_B_BillCard.updateBillCardData();
  
      if (!saveResult || saveResult.code != 'ok') {
        return;
      }
  
      if (!saveResult1 || saveResult1.code != 'ok') {
        return;
      }
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        // 校验是否存在同类业务
        url: this.$backend.cmisBiz + '/api/reyPlan/checkIsExistWFBizByBillNo',
  
        data: JSON.stringify(this.$xutils.toUpperCase(this.d1_A_A_BillCard.getBillCardValue(), true)),
  
        success: (response, status, xhr) => {
          if (response.data == 0) {
            //提交
            const rsPars = this.sendSubmit();
  
            if (!rsPars.handleFlag) {
              return;
            } else {
              this.$xutils.showMsgBox('提示', '提交成功!', 350, 150, _rt => {
                this.$xutils.getParentPage(this, null, 'back');
              });
            }
          } else {
            this.$xutils.showMsgBox('提示', '存在同类业务,不可提交');
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
  
    sendSubmit() {
      //提交
      const info = this.d1_A_A_BillCard.getBillCardValue();
  
      const loginUser = this.$xutils.getLoginUserInfo();
  
      const sendPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.d1_A_A_BillCard.getItemValue('iqp_serno'),
        'bizType': 'IQP_REPAY_PLAN',
        'userId': loginUser.loginCode,
        'bizUserName': info.cus_name,
        'bizUserId': info.cus_id
      };
  
      this.$xutils.wfInit(sendPars, this.onCancelPage);
    },
  
    // 返回
    onCancel() {
      this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
      this.$dialog.close(this.dialogId);
    },
  
    // 借据查看
    viewLoan() {
      const billNo = this.d1_A_A_BillCard.getItemValue('bill_no');
  
      if (!(billNo && billNo != '')) {
        this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
        return;
      }
  
      const params = this.findAccInfoFromBackend(billNo);
  
      if (params) {
        params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';//贷款台账模块
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
  
    //获取借据信息
    findAccInfoFromBackend(billNo) {
      let returnData = {};
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        type: 'get',
        url: this.$backend.cmisBiz + '/api/accloan/' + billNo,
  
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
  
      return returnData;
    },
  
    // 客户信息查看
    // 客户信息查看
    viewCus() {
      const jsoPar = this.d1_A_A_BillCard.getBillCardValue();
      const params = {};
  
      if (jsoPar.cus_id == '' || jsoPar.cus_id == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }
  
      params['cus_id'] = jsoPar.cus_id;
      const cus_catalog = this.getFactory().contextData.cus_catalog;
  
      if (cus_catalog == '1') {
        //对公
        params['model_group_no'] = 'CMG000114';
  
        params['flag'] = 'view';
  
        this.$dialog.open(
          '企业客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      } else if (cus_catalog == '2') {
        //对私
        params['model_group_no'] = 'CMG000013';
  
        params['flag'] = 'view';
  
        this.$dialog.open(
          '个人客户查看界面',
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
  
    //客户信息
    findCusInfoFromBackend(cusId) {
      let returnData = {};
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        type: 'get',
        url: this.$backend.cmisCus + '/api/cusbase/' + cusId,
  
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
  
      return returnData;
    },
  
    //查看公司客户页面
    routeToPageCusCorp(cusId) {
      const params = {
        cus_id: cusId,
        flag: 'view',
        model_group_no: 'CMG000114'
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
  
    //查看个人客户页面
    routeToPageCusIndiv(cusId) {
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
        this.$dialog.open('个人客户查看页面', 'cusmanage/indivCus/indivCusMsgIndex', -1, -1, selectedRowData);
      }
    },
  
    //新增
    addFn() {
      const iqpSerno = this.d1_A_A_BillCard.getBillCardValue();
  
      this.$dialog.open(
        '新增调整后还款计划信息页面',
        'bizmanage/chgBiz/reyPlan/rePlanDtlAddIndex',
        '900',
        '600',
        iqpSerno,
        null
      );
    },
  
    //删除
    deleteFn() {
      const row = this.d1_B_A_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      // 获取业务规则方案编号查询条件
      const pkId = row.pk_id;
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisBiz + '/api/iqprepayplandtl/delete/' + pkId,
  
        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, () => {
              this.d1_B_A_BillList.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');
            });
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
  
    // 提交返回
    onCancelPage() {
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
