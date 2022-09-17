<template>
  <d1-billcard ref="d1_BillCard" :form-type="formType"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpCertBaseBook_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      formType: 'edit'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      // 资本构成信息
      this.d1_BillCard = this.$refs.d1_BillCard;
      if (this.pageParams.op == 'ADD') {
        // 设置主键
        const pkValue = this.$xutils.getSEQWithParamFromServer('PK_VALUE');
        this.d1_BillCard.setItemValue('pk_id', pkValue);
        // 设置企业客户编号
        // const corp_cus = this.$xutils.getSEQWithParamFromServer('CORP_CUS');
        this.d1_BillCard.setItemValue('cusId', this.pageParams.cusIdRel);
      } else if (this.pageParams.op == 'EDIT' || this.pageParams.op == 'VIEW') {
        yufp.clone(this.pageParams.row, this.d1_BillCard.formdata);
      }
      if (this.pageParams.op == 'VIEW') {
        this.formType = 'details';
      }
    },

    onSave () {
      var valid = this.d1_BillCard.validateBillCardValue();
      if (!valid) {
        return;
      }
      // 保存数据
      if (this.pageParams.op == 'ADD') {
        this.d1_BillCard.saveBillCardData(() => {
          this.onBack();
        });
      } else if (this.pageParams.op == 'EDIT') {
        this.d1_BillCard.updateBillCardData((response) => {
          if (response.erortx != null) {
            this.$message({message: response.erortx, type: 'error'});
          }

          this.onBack();
        });
      }
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
