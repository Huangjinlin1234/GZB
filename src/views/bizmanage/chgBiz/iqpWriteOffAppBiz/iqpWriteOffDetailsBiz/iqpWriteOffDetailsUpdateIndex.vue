<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpWriteOffDetailsUpdate_d1_BillCard.vue'
import d110Billcard from './iqpWriteOffDetailsUpdate_d1_10_BillCard.vue'
export default {
  components:{d1Billcard, d110Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
      d1_10_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * title 呆账核销申请引导界面
       * author 马顺
       * date 2021-01-20
       * */
  
    // 初始化页面
    AfterInit() {
      // 创建借据选择列表
      if (this.getFactory().contextData.op == 'VIEW') {
        this.d1_BillCard = this.$refs.d1_BillCard;
      } else {
        this.d1_BillCard = this.$refs.d1_BillCard;
      }
  
      this.d1_BillCard.queryDataByCondition('pk_id = \'' + this.getFactory().contextData.pk_id + '\'');
      this.initBillCard();
  
      // 赋值
      this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.cus_id);
  
      this.d1_BillCard.setBillCardItemValue('iqp_serno', this.getFactory().contextData.iqp_serno);
    },
  
    // 初始化触发
    initBillCard() {
      // 针对查看以及流程进入页面，不允许编辑操作
      if (this.getFactory().contextData.op == 'VIEW') {
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
  
      if (itemKey == 'writeoff_cap') {
        // 核销本金校验
        if (!(newVal >= 0 && newVal < parseFloat(thisCard.getItemValue('loan_balance')))) {
          this.$xutils.showMsgBox('提示', '核销本金需要小于贷款余额且大于0！', 350, 200, () => {
            // 清空已选择的数据
            thisCard.setBillCardItemValue('writeoff_cap', oldVal);
          });
        }
  
        this.setWriteoffSum(thisCard);
      }
  
      if (itemKey == 'writeoff_int') {
        // 核销利息校验
        if (!(newVal >= 0 && newVal < parseFloat(thisCard.getItemValue('inner_owe_int')) + parseFloat(thisCard.getItemValue('out_owe_int')))) {
          this.$xutils.showMsgBox('提示', '核销利息需要小于表内欠息与表外欠息之和且大于0！', 350, 200, () => {
            // 清空已选择的数据
            thisCard.setBillCardItemValue('writeoff_int', oldVal);
          });
        }
  
        this.setWriteoffSum(thisCard);
      }
  
      if (itemKey == 'bill_no') {
        // 借据号更换时
        thisCard.setBillCardItemValue('writeoff_cap', '0');
  
        thisCard.setBillCardItemValue('writeoff_int', '0');
        thisCard.setBillCardItemValue('writeoff_sum', '0');
        thisCard.setBillCardItemValue('inner_owe_int', '0');
        thisCard.setBillCardItemValue('out_owe_int', '0');
        thisCard.setBillCardItemValue('total_owe_int', '0');
      }
    },
  
    // 重新计算核销总金额
    setWriteoffSum(thisCard) {
      let writeoff_cap = thisCard.getItemValue('writeoff_cap');
      let writeoff_int = thisCard.getItemValue('writeoff_int');
      let writeoff_sum = Math.floor(parseFloat(writeoff_cap * 100) + parseFloat(writeoff_int * 100)) / 100;
      this.d1_BillCard.setBillCardItemValue('writeoff_sum', writeoff_sum);
    },
  
    // 结息试算
    doAsyn() {
      // 需要调用核算系统实时查询
      // 通过接口获取表内欠息 表外欠息字段
      let inner_owe_int = Math.random(1000) * 100;
  
      let out_owe_int = Math.random(100) * 100;
      let total_owe_int = Math.floor(parseFloat(inner_owe_int * 100) + parseFloat(out_owe_int * 100)) / 100;
      this.d1_BillCard.setBillCardItemValue('inner_owe_int', inner_owe_int);
      this.d1_BillCard.setBillCardItemValue('out_owe_int', out_owe_int);
      this.d1_BillCard.setBillCardItemValue('total_owe_int', total_owe_int);
    },
  
    // 保存
    doSave() {
      // 必输校验
      let validateFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!validateFlag) {
        return;
      }
  
      // 获取页面保存数据
      let params = this.d1_BillCard.getBillCardValue();
  
      // 调用后端生成放款申请记录的ajax请求
      let rtnData = {};
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisBiz + '/api/iqpwriteoffdetl/saveIqpWriteOffDetailLeadInfo/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
  
        success: (response, status, xhr) => {
          if (response.code == '') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
  
      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(rtnData) == '{}') {
        return;
      }
  
      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg); // 弹出提示
        return;
      }
  
      this.$xutils.showMsgBox('提示', '保存成功', null, null, () => {
        // 刷新列表页面
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');
  
        this.$xutils.getParentPage(this, null, 'back');
      });
    },
  
    // 返回
    doBack() {
      // 刷新列表页面
      this.$xutils.getParentPage2(this, null, 'refreshBillListData');
  
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
