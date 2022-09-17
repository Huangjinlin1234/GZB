<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './noRepayZhenXinInfo_d1_BillList.vue';

let d1_BillCard = 'xxx';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /* 无还本续贷征信信息页面*/
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      d1_BillCard.execBillCardDefaultValueFormula();

      // 初始化序列号信息
      // 给流水号赋值
      d1_BillCard.setItemValue('survey_no', this.pageParams.survey_no);
    },

    /* 保存按钮*/
    doNextStep () {
      // 先进行校验
      const validateFlag = d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      const flag = d1_BillCard.saveBillCardData();

      if (!flag) {
        this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
        return;
      }

      this.$xutils.showMsgBox('提示', '保存成功', 500, 200, () => {
        this.$dialog.close(this.dialogId);
      }); // 弹出提示
      // YuXP.closeDialog();
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    },

    /* 执行查询*/
    doselectCob () {
      // 校验
      if (d1_BillCard.getBillCardItemValue('cob_name') == null || d1_BillCard.getBillCardItemValue('cob_name').toString().length == 0 || d1_BillCard.getBillCardItemValue('cob_cert_no') == null || d1_BillCard.getBillCardItemValue('cob_cert_no').toString().length == 0) {
        this.$xutils.showMsgBox('提示', '请补全共借人姓名或共借人证件号码');
        return;
      }

      this.pageParams = d1_BillCard.getBillCardValue();

      this.$dialog.open(
        '',
        'xwmanage/lmtmanage/indgtLMT/cusBaseFindOneListIndex',
        750,
        600,
        this.pageParams,
        params => {
          d1_BillCard.setBillCardItemValue('cob_name', params.cus_name);
          d1_BillCard.setBillCardItemValue('cob_cert_no', params.cert_code);

          d1_BillCard.setBillCardItemValue('cob_cus_id', params.cus_id);
          // d1_B_A_BillList.queryDataByCondition("SURVEY_NO='"+jsoOpenPars.survey_no+"'")
        }
      );
      /* var validateFlag = d1_BillCard.validateBillCardValue();
            if (!validateFlag) {
                return;
            }
        */
    }
  }
};
</script>
