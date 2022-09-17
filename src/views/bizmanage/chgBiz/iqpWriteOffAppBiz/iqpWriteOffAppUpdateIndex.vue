<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpWriteOffAppUpdate_d1_BillCard.vue'
/**
 * title 呆账核销信息详细页面
 * author 马顺
 * date 2021-01-19
 * */
let wfFlag = '';

let iqpSerno = '';

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
    // 初始化页面
    AfterInit() {
      // 明确是否为流程进入页面
      this.initWfStatus();
  
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片
      this.d1_BillCard.queryDataByCondition('iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\'');
      iqpSerno = this.getFactory().contextData.iqp_serno;
      this.initBillCard();
    },
  
    // 判断是否流程进入页面
    initWfStatus() {
      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          wfFlag = true;
          this.getFactory().contextData.wfFlag = wfFlag;
  
          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            // 将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.iqp_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;
  
            // 隐藏按钮
            this.getFactory().setButtonVisiable('commit', false);
  
            this.getFactory().setButtonVisiable('save', false);
            this.getFactory().setButtonVisiable('tempSave', false);
            this.getFactory().setButtonVisiable('back', false);
          }
        }
      }
    },
  
    // 初始化触发
    initBillCard() {
      // 针对查看以及流程进入页面，不允许编辑操作
      if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
        this.d1_BillCard.setBillCardItemRequired('*', false);
        this.d1_BillCard.setBillCardItemEditable('*', false);
      }
  
      // 绑定onchange事件
      this.d1_BillCard.addEditChangeAction(this.isBasicChangeFn);
    },
  
    // onchange触发
    isBasicChangeFn(thisCard, itemKey, oldVal, newVal) {
      // 调整以后的值与调整之前的值一样时，不触发onchange方法
      if (oldVal == newVal) {
        return;
      }
    },
  
    // 封装发送后台的逻辑，保存，暂存通用的方法
    sendSavePost(params) {
      const saveFlag = true;
      let rtnData = {};
  
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisBiz + '/api/iqpwriteoffapp/update',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
  
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
        this.$xutils.showMsgBox('提示', '错误代码：保存失败,错误信息：更新异常');
        return false;
      }
  
      return saveFlag;
    },
  
    // 页面定义的保存方法
    save() {
      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, () => {
          // 刷新列表页面
          this.$xutils.getParentPage2(this, null, 'refreshBillListData');
  
          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
        });
      });
    },
  
    // 保存，提交通用的方法
    commonSave(func) {
      // 必输校验
      let validateFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!validateFlag) {
        return;
      }
  
      // 获取页面保存数据
      let params = this.d1_BillCard.getBillCardValue();
  
      // 调用后续保存方法
      let saveFlag = this.sendSavePost(params);
  
      if (saveFlag) {
        func();
      }
    },
  
    // 暂存方法
    tempSave() {
      // 因为为单表数据保存，因此暂存操作可以调用框架的保存方法
      const rtnData = this.d1_BillCard.tempUpdateBillCardData();
  
      if (rtnData && rtnData.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功！', 350, 200, () => {
          // 刷新列表页面
          this.$xutils.getParentPage2(this, null, 'refreshBillListData');
  
          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
        });
      } else {
        this.$xutils.showMsgBox('提示', '保存失败！错误信息：' + rtnData.msg);
      }
    },
  
    // 提交按钮
    commit() {
      this.commonSave(() => {
        // 刷新列表页面
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');
  
        this.afterSaveCommit();
      });
    },
  
    // 重新点击时重新加载页面
    showAction() {
      this.d1_BillCard.queryDataByCondition('iqp_serno = \'' + iqpSerno + '\'');
  
      // 加载公式实在创建表单Html的时候在服务中计算的，加载数据的时候要重洗计算
      const total_out_int = this.d1_BillCard.getBillCardItemValue('total_out_int');
  
      const total_inner_int = this.d1_BillCard.getBillCardItemValue('total_inner_int');
      let total_sum_int = Math.floor(parseFloat(total_out_int * 100) + parseFloat(total_inner_int * 100)) / 100;
      this.d1_BillCard.setBillCardItemValue('total_sum_int', total_sum_int);
    },
  
    // 保存成功后调用发起流程的方法
    afterSaveCommit() {
      const loginUser = this.$xutils.getLoginUserInfo();
  
      const rsPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.d1_BillCard.getItemValue('iqp_serno'),
  
        // 流程申请类型会自动创建队列
        'bizType': 'IQP_WRITE_OFF',
  
        'userId': loginUser.loginCode,
  
        // 客户名称
        'bizUserName': this.d1_BillCard.getBillCardItemValue('cus_name'),
  
        // 客户编号
        'bizUserId': this.d1_BillCard.getBillCardItemValue('cus_id')
      };
  
      this.$xutils.wfInit(rsPars, this.onCancelPage);
    },
  
    // 提交返回
    onCancelPage() {
      //YuXP.closeDialog();
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
