<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYndListAppIndgtResult_d1_BillCard.vue';
/**
 * 刘愿 优农贷名单申请调查结论
 */
const jsoPar = {};

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
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      if (this.getFactory().contextData.op == 'VIEW') {
        // this.d1_A_BillCard.changeStatus();
        this.d1_BillCard.formDis = true;
      }
      this.d1_BillCard.formdata.serno = this.getFactory().contextData.serno;
      if (this.getFactory().contextData) {
        this.d1_BillCard.queryDataByCondition({serno: this.getFactory().contextData.serno});
      }
    },

    // 保存
    onSave () {
      const validate = this.d1_BillCard.validateBillCardValue();
      if (validate) {
        const flag = this.d1_BillCard.saveBillCardData();
        if (flag) {
          this.$xutils.showMsgBox('提示', '保存成功！', 350, 150, () => {
            this.d1_BillCard.queryDataByCondition({serno: this.getFactory().contextData.serno});
          });
        } else {
          this.$xutils.showMsgBox('提示', '保存失败！');
          return;
        }
      }
    },

    // 取消
    onCancel () {
      if (this.getFactory().contextData) {
        this.getFactory().getFactory().back();
      } else {
        this.$dialog.close(this.dialogId);
      }
    }
  }
};
</script>
