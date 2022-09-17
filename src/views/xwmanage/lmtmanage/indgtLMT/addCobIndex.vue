<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
/**
 * 授信调查-调查信息-新增共借人
 */
import d1Billcard from './addCob_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      gjrPage: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 新增界面 下一步/取消按钮*/
    afterInit () {
      this.gjrPage = this.$refs.d1_BillCard;
      this.gjrPage.execBillCardDefaultValueFormula();

      if (!this.pageParams.isAdd) {
        this.gjrPage.setBillCardValue(this.pageParams);
      }
      // 初始化序列号信息
      // 给流水号赋值
      this.gjrPage.setItemValue('surveySerno', this.pageParams.surveySerno);
    },

    /* 保存按钮*/
    doNextStep () {
      // 先进行校验
      const validateFlag = this.gjrPage.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      let flag = false;
      if (this.pageParams.isAdd) {
        flag = this.gjrPage.saveBillCardData();
      } else {
        flag = this.gjrPage.updateBillCardData();
      }
      if (!flag) {
        this.$message({message: '保存失败'});
        //  this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
        return;
      }
      this.$message({message: '保存成功'});
      this.$dialog.close(this.dialogId);
      // this.$xutils.showMsgBox('提示', '保存成功', 500, 200, () => {

      // }); // 弹出提示
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    },

    /* 执行查询*/
    doselectCob () {
      // 校验
      if (this.gjrPage.getBillCardItemValue('commonDebitCusName') == null ||
        this.gjrPage.getBillCardItemValue('commonDebitCusName').toString().length == 0 ||
        this.gjrPage.getBillCardItemValue('commonDebitCertCode') == null ||
        this.gjrPage.getBillCardItemValue('commonDebitCertCode').toString().length == 0) {
        this.$message({message: '请补全共借人姓名或共借人证件号码'});
        return;
      }
      let data = this.gjrPage.getBillCardValue();
      this.$dialog.open(
        '',
        'xwmanage/lmtmanage/indgtLMT/hxdmanage/hxdPage2-addCobIndex',
        750,
        450,
        data,
        params => {
          this.gjrPage.setBillCardItemValue('commonDebitCusName', params.cusName);
          this.gjrPage.setBillCardItemValue('commonDebitCertCode', params.certCode);

          this.gjrPage.setBillCardItemValue('commonDebitCusId', params.cusId);
          // d1_B_A_BillList.queryDataByCondition("SURVEY_NO='"+jsoOpenPars.survey_no+"'")
        }
      );
    }
  }
};
</script>
