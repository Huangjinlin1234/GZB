<template>
  <div></div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * title 集团其他审批事项新增
       * author yangwl
       * date 2021-04-14
       * */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(this.pageParams);
    },

    onNextStep() {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpappr/saveLmtGrpAppr',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(this.rtnData) == '{}') {
        return;
      }

      if (this.rtnData.rtnCode != 'ECB010000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + this.rtnData.rtnCode + '；错误信息：' + this.rtnData.rtnMsg); // 弹出提示
        return;
      }

      jsoPar['model_group_no'] = 'CMG000227';
      jsoPar['op'] = 'ADD';
      jsoPar['flag'] = 'add';
      jsoPar['sub_serno'] = this.rtnData.subSerno;

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        null,
        true,
        true
      );
    }
  }
};
</script>
