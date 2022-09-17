<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './coopReplyAccPro_d1_BillCard.vue';
/**
 * 合作方案申请限额
 * author yumeng@yusys.com.cn
 * date 2021-04-15
 **/
let param = null;

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
      param = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 将主表流水号的关联设置到表单中
      this.d1_BillCard.setBillCardValue(param);
      if (param.operate && param.operate == 'ADD') {
        // 执行默认值公式使模板设置的默认值生效
        // this.d1_BillCard.updateFlag = "false";
        this.d1_BillCard.execBillCardDefaultValueFormula();
        this.d1_BillCard.setBillCardItemValue('coopPlanNo', this.pageParams.coopPlanNo);
      } else if (param.operate && param.operate == 'UPDATE') {
        this.d1_BillCard.updateFlag = 'true';
      }
    },

    /**
       * 保存特殊限额控制
       * 根据上一个页面参数进行判断是更新还是修改操作
       * 操作成功后关闭页面
       **/
    save () {
      const reslut = this.d1_BillCard.validateBillCardValue();
      if (!reslut) {
        return false;
      }
      let singlePrdCoopLmt = this.$refs.d1_BillCard.formdata.singlePrdCoopLmt;
      let singlePrdCoopLmtAll = parseFloat(param.singlePrdCoopLmtAll) + parseFloat(singlePrdCoopLmt);
      let totlCoopLmtAmt = this.$route.params.totlCoopLmtAmt;
      if (totlCoopLmtAmt === null || totlCoopLmtAmt === '') {
        this.$xutils.showMsgBox('提示', '请先录入总合作额度', 400, 300, callback => {
          this.$dialog.close(this.dialogId);
        }); // 弹出提示
        return;
      }
      if (singlePrdCoopLmtAll > totlCoopLmtAmt) {
        this.$xutils.showMsgBox('提示', '单个产品合作额度不能大于总合作额度', 400, 300); // 弹出提示
        return;
      }
      if (param.operate && param.operate == 'ADD') {
        this.d1_BillCard.saveBillCardData();
      } else if (param.operate && param.operate == 'UPDATE') {
        this.d1_BillCard.updateBillCardData();
      }
      this.$dialog.close(this.dialogId);
    },

    /**
       * 关闭页面
       **/
    back () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
