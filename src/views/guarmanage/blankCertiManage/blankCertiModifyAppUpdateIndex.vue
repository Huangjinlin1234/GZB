<template>
  <d2-billcard ref="d2_BillCard" :pageParams="pageParams"></d2-billcard>
</template>
<script>
import d2Billcard from './blankCertiModifyAppUpdate_d2_BillCard.vue';
export default {
  components: {d2Billcard},
  props: {
    pageParams: Object,
    dialogId: String,
    params: Object,
    wfData: Object
  },
  data () {
    return {
      d2_BillCard: null
    };
  },
  mounted () {
    if (this.wfData) {
      let serno = this.wfData.instanceInfo.bizId;
      this.editInit(serno, 'VIEW');
    } else {
      this.d2_BillCard = this.$refs.d2_BillCard;
      yufp.clone(this.pageParams, this.d2_BillCard.formdata);
    }
  },
  methods: {
    editInit (_serno, type) {
      this.$request({
        url: this.$backend.cmisBiz + '/api/blankcertimodifyapp/querylist',
        method: 'POST',
        data: {
          condition: JSON.stringify({
            serno: _serno
          })
        }
      }).then((response) => {
        if (response.code === '0') {
          this.d2_BillCard = this.$refs.d2_BillCard;
          yufp.clone(response.data[0], this.d2_BillCard.formdata);
          if (response.data[0].appType == '01') {
            this.d2_BillCard.optReasonLabel = '修改原因';
          } else if (response.data[0].appType == '02') {
            this.d2_BillCard.optReasonLabel = '作废原因';
          }
          this.d2_BillCard.cancelIsHidden = true;
          if (type == 'VIEW') {
            this.d2_BillCard.certiNoDisabled = true;
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    }
  },
  created () {
  }
};
</script>