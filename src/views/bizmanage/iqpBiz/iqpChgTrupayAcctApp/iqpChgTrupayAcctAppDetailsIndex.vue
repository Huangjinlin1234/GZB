<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufp-nwf-init>
  </div>
</template>
<script>
import d1Billcard from './iqpChgTrupayAcctAppDetails_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 修改受托账号申请详情
       */

    // 定义流程页面标识，用于区分流程进入与申请页面进入
    // var wfFlag = false;
    // var nodeFlag = frameContext.nodeFlag;

    AfterInit () {
      // this.checkWfPage();
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      let param = this.pageParams;
      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/showdetial',
        data: { serno: _this.pageParams.biz_serno },

        success: (response, status, xhr) => {
          if (response.code == '200') {
            this.$utils.clone(response.data, this.d1_BillCard.formdata);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 判断是否为流程进入页面
    checkWfPage () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      if (this.d1_BillCard.flowData) {
        if (this.d1_BillCard.flowData.instanceInfo) {
          let wfFlag = true;
          this.d1_BillCard.flowData['wfFlag'] = wfFlag;

          if (this.d1_BillCard.flowData.instanceInfo.bizId) {
            // 将流程的关联业务主键设置到业务流水号中
            this.d1_BillCard.serno = this.d1_BillCard.flowData.instanceInfo.bizId;

            this.d1_BillCard.biz_serno = this.d1_BillCard.flowData.instanceInfo.bizId;

            // 隐藏按钮
            this.getFactory().setButtonVisiable('commit', false);
            this.getFactory().setButtonVisiable('save', false);
            // this.getFactory().setButtonVisiable('tempSave', false);
            this.getFactory().setButtonVisiable('back', false);
          }
        }
      }
    },

    // // 初始化表单
    // initBillCard () {
    //   // 判断页面是否为查看页面或流程进入的页面
    //   wfFlag
    //   if (nodeFlag == '3') {} else {
    //     if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
    //       this.d1_BillCard.setBillCardItemRequired('*', false);
    //       this.d1_BillCard.setBillCardItemEditable('*', false);
    //     }
    //   }
    //   // initIsHasRefused();
    //   // initLmtAppType(d1_BillCard.getBillCardItemValue('lmt_app_type'));
    //   // initIsAdjTerm();
    //   // // 页面录入框下拉框绑定onchange事件
    //   // d1_BillCard.addEditChangeAction(isBasicChange);
    // },

    // 提交
    commit () {
      // 调用通用的保存方法
      let saveFlag = this.commonSave();

      if (saveFlag) {
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');
        this.afterSaveCommit();
      }
    },

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      // // 判断授信到期日
      // var checkFlag = judgeLmtEndDate();
      saveFlag = this.commitSave();

      return saveFlag;
    },

    // 提交保存方法
    commitSave () {
      let saveData = this.d1_BillCard.getBillCardValue();
      let saveFlag = true;
      let rtnData = {};

      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/commonsavechgtrupayacctappinfo',
        data: JSON.stringify(this.$xutils.toUpperCase(saveData, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            saveFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!saveFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return false;
      }

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        return false;
      }

      return true;
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      let loginUser = this.$xutils.getLoginUserInfo();
      var _this = this;
      var serno = this.d1_BillCard.getItemValue('serno');
      var cusId = this.d1_BillCard.getItemValue('cusId');
      var cusName = this.d1_BillCard.getItemValue('cusName');
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'BG025';
      startdto.bizId = serno;
      startdto.bizUserName = cusId;
      startdto.bizUserId = cusName;
      startdto.param = {};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      // 刷新列表页面
      // this.$xutils.getParentPage2(this, null, 'refreshBillListData');
      // this.$xutils.getParentPage(this, null, 'back');
      this.getFactory().back();
    },

    // 保存
    save () {
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      this.saveFn();
    },

    // 保存方法
    saveFn () {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      let rtnData = this.d1_BillCard.updateBillCardData();

      if (rtnData && rtnData.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
          // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
          // this.$xutils.getParentPage2(this, null, 'refreshBillListData');
          this.$dialog.close(this.dialogId);
        });
      }
    },

    // 返回
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
