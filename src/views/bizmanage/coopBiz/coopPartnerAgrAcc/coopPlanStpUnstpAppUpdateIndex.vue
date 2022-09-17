<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './coopPlanStpUnstpAppUpdate_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      params: {},
      operate: 'edit'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 合作方案中止恢复修改列表
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.params = this.pageParams;
      // 没看懂这个逻辑
      // this.d1_BillCard.queryDataByCondition('serno = \'' + this.pageParams.serno + '\'');
      // this.d1_BillCard.setItemEditable('serno', false);
      this.d1_BillCard.setBillCardValue(this.params);
    },

    onContinue () {
      // 检验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const data = this.d1_BillCard.getBillCardValue();
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/coopplanstpunstpapp/update',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '修改成功', 350, 150, () => {
              // 列表刷新
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');

              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
