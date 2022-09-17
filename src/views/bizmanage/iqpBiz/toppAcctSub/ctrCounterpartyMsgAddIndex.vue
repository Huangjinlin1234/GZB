<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './ctrCounterpartyMsgAdd_d1_BillCard.vue';
let serno = '';

let par = {};
let jsoPar = '';

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
      this.d1_BillCard.setBillCardItemValue('bizSerno', par.iqpSerno);
    },

    doAdd () {
      serno = par.iqpSerno;
      jsoPar = this.d1_BillCard.getBillCardValue();
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }
      jsoPar.pkId = this.$xutils.getUUID();
      jsoPar.bizSerno = serno;

      if (jsoPar) {
        this.$xutils.request({
          // 同步请求
          async: false,

          // 新增
          url: this.$backend.cmisBiz + '/api/toppacctsub/insertBySerno',

          data: JSON.stringify(jsoPar),

          success: (response, status, xhr) => {
            if (response.code == '0') {
              // this.$xutils.showMsgBox('提示', '新增成功', 350, 150, () => {
              //   // 列表刷新
              //   this.d1_BillList.queryDataByCondition({serno: this.getFactory().contextData.iqpSerno});
              // });
              this.$xutils.showMsgBox('提示', '新增成功！');
              this.$dialog.close(this.dialogId);
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
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
