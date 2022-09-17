<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './cusWebFinWhiteDetailsAdd_d1_BillCard.vue';
/**
 * 刘愿 网金客户白名单申请新增
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
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(this.pageParams);
      this.d1_BillCard.setBillCardItemValue('serno', this.pageParams.serno);
      this.d1_BillCard.setBillCardItemValue('oprType', '01');
    },

    // 取消按钮，关闭当前页面
    doBack () {
      this.$dialog.close(this.dialogId, null);
    },

    // 保存
    onSave () {
      var _this = this;
      this.$xutils.request({
        url: this.$backend.cmisCus + '/api/cuslstwjkhmxxx/',
        data: JSON.stringify(this.d1_BillCard.getBillCardValue()),
        type: 'post',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.$xutils.showMsgBox('提示', '保存成功!', 500, 300, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            _this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    }
  }
};
</script>
