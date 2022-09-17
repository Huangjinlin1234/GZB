<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYXDLoanIndgtReportAdd_d1_BillCard.vue';
/**
 * 刘愿 优享贷名单申请侧面调查
 *
 */

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
      // selfPars = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      // this.d1_BillCard.addEditChangeAction(change);
      this.d1_BillCard.execBillCardDefaultValueFormula();

      // 查询优享贷名单下的侧面调查报告
      this.getFactory().setButtonVisiable('save', false);
    },

    // 优享贷 新增功能
    onSave () {
      const validate = this.d1_BillCard.validateBillCardValue();
      if (validate) {
        this.d1_BillCard.setBillCardItemValue('serno', this.pageParams.serno);
        const flag = this.d1_BillCard.saveBillCardData();
        if (flag) {
          this.$xutils.showMsgBox('提示', '新增成功！', 350, 150, () => {
            // 刷新父级页面的列表数据
            // this.$xutils.getParentPage(
            //   this,
            //   'd1_BillList',
            //   'queryDataByCondition',
            //   ['serno = \'' + this.pageParams.serno + '\'']
            // );

            this.$dialog.close(this.dialogId, this.pageParams.serno);
          });
        } else {
          this.$xutils.showMsgBox('提示', '新增失败！');
          return;
        }
      }
    },

    // 取消按钮
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
