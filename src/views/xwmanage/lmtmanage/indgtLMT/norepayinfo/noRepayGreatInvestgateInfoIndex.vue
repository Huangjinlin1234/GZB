<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './noRepayGreatInvestgateInfo_d1_BillCard.vue';
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
    // 无还本续贷优转-调查结论
    /* 新增界面 下一步/取消按钮*/
    afterInit () {
      this.dcjl = this.$refs.d1_BillCard;
    },

    /* 保存按钮*/
    save () {
      const saveFlag = this.dcjl.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      const SurveyConInfo = {
        'surveyConInfo': this.$xutils.toUpperCase(this.dcjl.getBillCardValue(), true)
      };

      const rsPars = {};

      this.$xutils.request({
        // 同步请求
        url: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/saveSurveyConInfo/',
        data: JSON.stringify(this.$xutils.toUpperCase(this.dcjl.getBillCardValue(), true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['data'] = response.data;
            if (rsPars.data == 1) {
              // ajax返回值正常
              this.$xutils.showMsgBox('提示', '保存成功'); // 弹出提示
            } else {
              this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
            }
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.responseJSON.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
    },

    showAction () {}
  }
};
</script>
