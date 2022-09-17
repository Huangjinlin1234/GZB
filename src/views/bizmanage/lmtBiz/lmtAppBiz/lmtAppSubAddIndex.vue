<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './lmtAppSubAdd_d1_BillCard.vue';
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
    /**
      * title 授信分项明细
      * author 朱滋润
      * date 2021-04-02
      * */

    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(this.pageParams);
    },

    // 点击下一步，后台新增授信分项信息,并进入分项详情页面
    onNextStep () {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtappsub/savelmtappsub',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data.data;
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

      if (this.rtnData.rtnCode != '0000') {
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
  },
  onBack() {
    this.$dialog.close(this.dialogId);
  }
};
</script>
