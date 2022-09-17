<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './addProfile_d1_BillCard.vue';
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      cmdcbg: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 新增界面 下一步/取消按钮*/
    afterInit () {
      this.cmdcbg = this.$refs.d1_BillCard;
      this.cmdcbg.execBillCardDefaultValueFormula();

      if (!this.pageParams.isAdd) {
        this.cmdcbg.setBillCardValue(this.pageParams);
      }
      // 初始化序列号信息
      // 给流水号赋值
      this.cmdcbg.setItemValue('surveySerno', this.pageParams.surveySerno);
    },

    /* 保存按钮*/
    doNextStep () {
      // 先进行校验
      const validateFlag = this.cmdcbg.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      let flag = false;
      if (this.pageParams.isAdd) {
        flag = this.cmdcbg.saveBillCardData();
      } else {
        flag = this.cmdcbg.updateBillCardData();
      }
      if (!flag) {
        this.$message({message: '保存失败', type: 'warning'});
        // this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
        return;
      }
      // this.$message({message: '操作成功', type: 'success'});
      //  this.$xutils.showMsgBox('提示', '保存成功', 500, 200, () => {
      this.$dialog.close(this.dialogId);
    //  }) // 弹出提示
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    },

    doselectCob () {
      this.$xutils.showMsgBox('提示', '查询');
    }
  }
};
</script>
