<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './maxGuarInsert_d1_BillCard.vue';
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
    // 新增担保合同向导页面
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;

      // alert(JSON.stringify(jsoOpenPars)) ;
      this.d1_BillCard.setBillCardValue(this.pageParams);
    },

    // 点击下一步，跳转到抵押担保合同界面
    // 担保方式
    next () {
      // js校验必输
      let saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      let guarWay = this.d1_BillCard.getBillCardItemValue('guar_way');// 担保方式
      let params = this.d1_BillCard.getBillCardValue();

      params["type"] = "ADD";

      // 获取传过来的数值
      params['rowData'] = this.pageParams;
      if (guarWay != 30) {
        this.$dialog.open(
          '担保合同修改(抵质押)',
          'grtmanage/publicLetterManage/maxGuarUpdatePldimnIndex',
          900,
          650,
          params,
          () => {
            this.OnCancel();
          },
          true,
          true
        );
      } else {
        this.$dialog.open(
          '担保合同修改(保证人)',
          'grtmanage/publicLetterManage/maxGuarUpdateGuarntrIndex',
          900,
          650,
          params,
          () => {
            this.OnCancel();
          },
          true,
          true
        );
      }
      //this.OnCancel();
    },

    // 返回列表
    OnCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
