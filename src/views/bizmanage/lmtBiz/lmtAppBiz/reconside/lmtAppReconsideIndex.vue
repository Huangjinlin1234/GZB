<template>
  <div>
    <d1-billcard ref="d1_BillCard" v-show="isCardShow1"></d1-billcard>
    <d1-16-billcard ref="d1_16_BillCard" v-show="isCardShow2"></d1-16-billcard>
  </div>
</template>
<script>
import d1Billcard from './lmtAppReconside_d1_BillCard.vue';
import d116Billcard from './lmtAppReconside_d1_16_BillCard.vue';
/**
* title 单一客户授信复议基本信息
* author 朱滋润
* date 2021-04-02
* */
let wfFlag = '';

let serno = '';

export default {
  components: {d1Billcard, d116Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      d1_16_BillCard: null,
      isCardShow1: false,
      isCardShow2: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 初始化页面
    AfterInit () {
      // 明确是否为流程进入页面
      this.initWfStatus();

      if (this.getFactory().contextData.op == 'VIEW') {
        this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片
        this.isCardShow1 = true;
        this.isCardShow2 = false;
      } else {
        this.d1_BillCard = this.$refs.d1_16_BillCard; // 创建卡片
        this.isCardShow1 = false;
        this.isCardShow2 = true;
      }

      this.d1_BillCard.queryDataByCondition({'pkId': this.getFactory().contextData.pk_id}, 'post');
      serno = this.getFactory().contextData.serno;

      this.initBillCard();
    },

    // 判断是否流程进入页面
    initWfStatus () {
      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          wfFlag = true;
          this.getFactory().contextData.wfFlag = wfFlag;

          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            // 将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.serno = this.getFactory().contextData.flowData.instanceInfo.bizId;

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
    initBillCard () {
      // 针对查看以及流程进入页面，不允许编辑操作
      if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
        this.d1_BillCard.setBillCardItemRequired('*', false);
        this.d1_BillCard.setBillCardItemEditable('*', false);
      }

      if (this.getFactory().contextData.op == 'EDIT') {
        this.d1_BillCard.setBillCardItemEditable('*', false);
        this.d1_BillCard.setItemEditable('eval_high_curfund_lmt_amt;lmt_term;lmt_graper_term', true);
      }
    },

    showAction () {},


    // 刷新列表
    getRefreshList () {
      this.d1_BillCard.queryDataByCondition();
    },

    // 返回
    onBack () {
      this.$dialog.close(this.dialogId);
    },

    // 保存修改基本信息
    save () {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/update',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, this.getRefreshList);
            this.rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 发起复议
    onReconside () {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/onreconside',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '发起复议成功!', 350, 150, this.getRefreshList);
            this.rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    onRedicuss () {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/onredicuss',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '发起再议成功!', 350, 150, this.getRefreshList);
            this.rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    onUpdate () {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/updatelmtapp',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '更新数据成功!', 350, 150, this.getRefreshList);
            this.rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
