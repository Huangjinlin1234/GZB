<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './ctrBankMsgUpdate_d1_BillCard.vue';
// 参与行银行信息
let par = {};
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
      par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({pkId: par.pkId});
    },
    doUpdate () {
      let reqData = this.d1_BillCard.formdata;
      let checkFlag = this.d1_BillCard.validateBillCardValue();
      if (!checkFlag) {
        return;
      }
      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,
          // 新增
          url: this.$backend.cmisBiz + '/api/iqploanappprtcptbanksub/update',
          // data: JSON.stringify(YuXPUtil.toUpperCase(par, true)),
          data: JSON.stringify(reqData),
          success: (response, status, xhr) => {
            if (response.code == '0') {
              this.$xutils.showMsgBox('提示', '修改成功！');
              this.$dialog.close(this.dialogId);

            } else {
              this.$xutils.showMsgBox('提示', response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        return;
      }
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
