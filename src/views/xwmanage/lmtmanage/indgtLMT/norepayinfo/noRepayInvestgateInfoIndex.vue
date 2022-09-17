<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './noRepayInvestgateInfo_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dcjl: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 无还本续贷普转-调查结论
    /* 新增界面 下一步/取消按钮*/
    afterInit () {
      this.dcjl = this.$refs.d1_BillCard;
    },

    showAction () {},

    /* 保存按钮*/
    save () {
      const saveFlag = this.dcjl.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const SurveyConInfo = {
        'surveyConInfo': this.$xutils.toUpperCase(this.dcjl.getBillCardValue(), true)
      };
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/saveorupdatecon',
        data: JSON.stringify(this.$xutils.toUpperCase(this.dcjl.getBillCardValue(), true)),
        success: (response, status, xhr) => {
          if (response.data == '1') {
            this.$xutils.showMsgBox('提示', '保存成功');
          } else {
            this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
          }
        }
      });
    }
  }
};
</script>
