<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusrelapp_d1_BillCard.vue';
// 关联成员申请界面
let par = {};
/* 确定按钮*/
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
    this.$lookup.reg('STD_ZB_CERT_TYP', 'STD_CORRE_RELA_TYPE', 'STD_ZB_DATA_SOUR');
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;// 卡片

      this.d1_BillCard.setBillCardItemValue('serno', par.serno);
      this.d1_BillCard.setBillCardItemValue('corre_no', par.correNo);

      this.d1_BillCard.setBillCardItemValue('pkId', this.$xutils.dateFormat('yyyyMMddhhmmss', new Date()));

      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    baocun () {
      const reqData = this.$xutils.toUpperCase(this.d1_BillCard.getBillCardValue(), true);
      reqData['oprType'] = '01';
      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,

          // 新增
          url: this.$backend.cmisCus + '/api/cusrelcusmemapp/',

          data: JSON.stringify(reqData),

          success: (response, status, xhr) => {
            if (response.data) {
              this.$dialog.close(this.dialogId, reqData);
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

    cancel () {
      this.$dialog.close(this.dialogId, jsoPar);
    }
  }
};
</script>
