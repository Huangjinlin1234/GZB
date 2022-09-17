<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './coopPlanStpUnstpAppInsect_d1_BillCard.vue';
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
      operate: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 合作方案中止恢复申请列表
    AfterInit () {
      this.params = this.getFactory().contextData.params;
      this.operate = this.getFactory().contextData.op;
      this.d1_BillCard = this.$refs.d1_BillCard;
      if (this.operate == 'add') {
        const coopSerno = this.$xutils.getSEQWithParamFromServer('COOP_SERNO');
        this.d1_BillCard.setBillCardItemValue('serno', coopSerno, coopSerno);
        // 加载默认值
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else {
        this.d1_BillCard.setBillCardValue(this.params);
      }
    },
    onSave () {
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      // 保存数据
      const data = this.d1_BillCard.getBillCardValue();
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/coopplanstpunstpapp/',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '新增成功', 350, 150, () => {
              // 列表刷新
              this.$xutils.getParentPage2(this, 'd1_BillList', 'queryDataByCondition');
              this.onBack();
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
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
