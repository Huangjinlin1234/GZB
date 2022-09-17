<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './coopPlanProAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      operate: '',
      pageData: {}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 项目信息 列表
    afterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.operate = this.pageParams.operate;
      this.pageData = this.pageParams;
      if (this.operate == 'add') {
        this.d1_BillCard.execBillCardDefaultValueFormula();
        this.d1_BillCard.setBillCardItemValue('serno', this.pageData.serno);
        this.d1_BillCard.setBillCardItemValue('coopPlanNo', this.pageData.coopPlanNo);
      } else {
        this.d1_BillCard.setBillCardValue(this.pageData);
      }
    },
    // 【保存】按钮的逻辑
    save () {
      let _this = this;
      // 保存
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }

      var pageData = _this.d1_BillCard.getBillCardValue();
      // 保存数据
      let url = '';
      if (_this.operate == 'add') {
        url = _this.$backend.cmisBiz + '/api/coopplanproinfo/';
      } else {
        url = _this.$backend.cmisBiz + '/api/coopplanproinfo/update';
      }
      _this.$xutils.request({
        url: url,
        data: JSON.stringify(pageData),
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            let totlCoopLmtAmt = response.data;
            this.$route.params.totlCoopLmtAmt = totlCoopLmtAmt;
            this.$route.params.totlCoopLmtAmtUsed = totlCoopLmtAmt - this.$route.params.totlCoopLmtAmtUsable;
            // this.$refs.d1_BillCard.
            // let totlCoopLmtAmt = response.data.
            _this.$xutils.showMsgBox('提示', '保存成功');
            _this.$dialog.close(_this.dialogId);
          }
        }
      });
    },
    bycancel () {
      this.$dialog.close(this.dialogId);
    }  
  }
};
</script>
