<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './addEgc_d1_BillCard.vue';
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      jjlxr: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 新增界面 下一步/取消按钮*/
    afterInit () {
      this.jjlxr = this.$refs.d1_BillCard;
      this.jjlxr.execBillCardDefaultValueFormula();

      if (!this.pageParams.isAdd) {
        this.jjlxr.setBillCardValue(this.pageParams);
      }
      // 初始化序列号信息
      // 给流水号赋值

      this.jjlxr.setItemValue('survey_serno', this.pageParams.surveySerno);
    },

    /* 保存按钮*/
    doNextStep () {
      // 先进行校验
      const validateFlag = this.jjlxr.validateBillCardValue();
      if (!validateFlag) {
        return;
      }

      if (this.pageParams.isAdd) {
        // this.d1_BillCard.saveBillCardData();
        // 新增操作
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtegcinfo/addegc',
          data: this.jjlxr.formdata
        }).then(({code, message, data}) => {
          if (code == 0) {
          // 请求成功
            if (data != null) {
            // 操作成功
              this.$message({ message: '操作成功', type: 'success' });
              // this.d1_1_BillList.$refs.refTable.remoteData();
              this.$dialog.close(this.dialogId);
            } else {
            // 操作失败
              this.$message({ message: message, type: 'warning' });

            // this.d1_1_BillList.$refs.refTable.remoteData();
            }
          }
        });
      } else {
        this.jjlxr.updateBillCardData();
        this.$dialog.close(this.dialogId);
      }
      // if (flag == null) {
      //   this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
      //   return;
      // }
      // this.$message({message: '操作成功', type: 'success'});

      // this.$xutils.showMsgBox('提示', '操作成功', 500, 200, () => {

      // }); // 弹出提示
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
