<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cfgExcelUpLoad_d1_BillCard.vue'
export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    // 表单change事件
    fileChangeFn(par, _src, _event) {
      const newData = {
        templetcode: this.pageParams.templetcode
      };
  
      par['data'] = par.data || {};
      this.$xutils.extend(par.data, newData);
      return true;
    },
  
    // 上传成功
    myUploadSuccess(response) {}
  }
};
</script>
