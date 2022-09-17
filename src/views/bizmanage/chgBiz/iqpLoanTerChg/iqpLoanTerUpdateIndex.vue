<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpLoanTerUpdate_d1_BillCard.vue'
export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       *贷款投向调整修改页面
       *  @author lzz
       */
    AfterInit() {
      // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
      this.isFromFlowPage();

      // 表单信息
      this.d1_BillCard = this.$refs.d1_BillCard;

      this.d1_BillCard.queryDataByCondition({iqpSerno:this.getFactory().contextData.iqpSerno});

      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());

      //隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);

      // 设置页面只读
      if (this.getFactory().contextData.opType == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.d1_BillCard.setItemEditable('*', false);

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
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      const resp = this.d1_BillCard.updateBillCardData();

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
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      //保存
      const saveResult = this.d1_BillCard.updateBillCardData();

      if (!saveResult || saveResult.code != 'ok') {
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        // 校验是否存在同类业务
        url: this.$backend.cmisBiz + '/api/iqpLoanTerAdd/checkIsExistWFBizByContNo',

        data: JSON.stringify(this.$xutils.toUpperCase(this.d1_BillCard.getBillCardValue(), true)),

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
            this.$xutils.showMsgBox('提示', '存在同类业务');
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    sendSubmit(saveResult) {
      const info = this.d1_BillCard.getBillCardValue();

      //提交
      const loginUser = this.$xutils.getLoginUserInfo();

      const sendPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.d1_BillCard.getItemValue('iqp_serno'),
        'bizType': 'IQP_LOAN_TER_CHG',
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
      const billNo = this.d1_BillCard.getItemValue('bill_no');

      if (!(billNo && billNo != '')) {
        this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
        return;
      }

      const params = this.findAccInfoFromBackend(billNo);

      if (params) {
        params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';//贷款台账模块
        params['op'] = 'VIEW';

        this.$dialog.open(
          '贷款投向调整',
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
    viewCus() {
      const cusId = this.d1_BillCard.getItemValue('cus_id');

      if (!(cusId && cusId != '')) {
        this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
        return;
      }

      const cusBaseInfo = this.findCusInfoFromBackend(cusId);
      const params = null;

      //判定对公对私
      if (cusBaseInfo && cusBaseInfo != null) {
        const cus_catalog = cusBaseInfo.cus_catalog;

        if (cus_catalog == '1') {
          //对公
          this.routeToPageCusCorp(cusId);
        } else if (cus_catalog == '2') {
          //对私
          this.routeToPageCusIndiv(cusId);
        } else {
          this.$xutils.showMsgBox('提示', '无法确定客户大类！');
          return;
        }
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

    // 提交返回
    onCancelPage() {
      this.$xutils.getParentPage(this, null, 'back');
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
    }
  }
};
</script>
