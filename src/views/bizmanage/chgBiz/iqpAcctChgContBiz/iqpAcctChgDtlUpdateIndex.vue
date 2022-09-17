<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpAcctChgDtlUpdate_d1_BillCard.vue'
let pars = {};
let selPars;

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
      pars = this.pageParams;
      selPars = this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();

      //d1_BillCard.setItemVisible('pay_use', false);
      //d1_BillCard.setBillCardItemClearValue('pay_use');
      //设置币种默认为人民币不可编辑
      this.d1_BillCard.setBillCardItemEditable('cur_type', false);

      this.d1_BillCard.setBillCardItemValue('cur_type', 'CNY');
      this.d1_BillCard.queryDataByCondition('a.pk_id=\'' + pars.pk_id + '\'');
      this.d1_BillCard.addEditChangeAction(this.change);
      this.setVauleAndIsShow();
    },

    //修改后保存
    doUpdate() {
      // 检验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      this.d1_BillCard.updateBillCardData();

      this.$xutils.showMsgBox('提示', '保存成功', 350, 150, () => {
        this.$dialog.close(this.dialogId);
      });
    },

    // 页面初始化控制
    setVauleAndIsShow() {
      if (selPars.getBillCardValue().acct_belong == '10') {
        // 是本行账户，显示机构号机构名，隐藏行号，行名
        this.d1_BillCard.setItemVisible('org_no;org_name', true);

        this.d1_BillCard.setBillCardItemClearValue('opan_org_no;opan_org_name');
        this.d1_BillCard.setItemVisible('opan_org_no;opan_org_name', false);
        this.d1_BillCard.setBillCardItemRequired('org_no;org_name', true);
        this.d1_BillCard.setBillCardItemRequired('opan_org_no;opan_org_name', false);
      }

      if (selPars.getBillCardValue().acct_belong == '20') {
        // 不是本行账户，隐藏机构号机构名，显示行号，行名
        this.d1_BillCard.setItemVisible('org_no;org_name', false);

        this.d1_BillCard.setBillCardItemClearValue('org_no;org_name');
        this.d1_BillCard.setItemVisible('opan_org_no;opan_org_name', true);
        this.d1_BillCard.setBillCardItemRequired('org_no;org_name', false);
        this.d1_BillCard.setBillCardItemRequired('opan_org_no;opan_org_name', true);
      }

      if (selPars.getBillCardValue().acct_attr == '4') {
        // 账户属性为：放款账号、借款人印花税账号、还款账号、委托人印花税账号、费用账号时，隐藏支付金额；否则展示支付金额
        this.d1_BillCard.setItemVisible('pay_amt', true);

        this.d1_BillCard.setBillCardItemRequired('pay_amt', true);
        this.d1_BillCard.setBillCardItemEditable('acct_belong', true);
      } else {
        this.d1_BillCard.setItemVisible('pay_amt', false);
        this.d1_BillCard.setBillCardItemClearValue('pay_amt');
        this.d1_BillCard.setBillCardItemRequired('pay_amt', false);

        //非受托支付的场景，设置账户归属为【我行账户】，不可编辑
        this.d1_BillCard.setBillCardItemValue('acct_belong', '10');

        this.d1_BillCard.setBillCardItemEditable('acct_belong', false);
        // change(thisCard,'acct_belong','','10');//触发账户归属变化的事件
      }
    },

    change(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'acct_belong' && newVal == '10') {
        // 是本行账户，显示机构号机构名，隐藏行号，行名
        this.d1_BillCard.setItemVisible('org_no;org_name', true);

        this.d1_BillCard.setBillCardItemClearValue('opan_org_no;opan_org_name');
        this.d1_BillCard.setItemVisible('opan_org_no;opan_org_name', false);
        this.d1_BillCard.setBillCardItemRequired('org_no;org_name', true);

        this.d1_BillCard.setBillCardItemRequired('opan_org_no;opan_org_name', false);
        //d1_BillCard.setBillCardItemValue('','',true)
      }

      if (itemKey == 'acct_belong' && newVal == '20') {
        // 不是本行账户，隐藏机构号机构名，显示行号，行名
        this.d1_BillCard.setItemVisible('org_no;org_name', false);

        this.d1_BillCard.setBillCardItemClearValue('org_no;org_name');
        this.d1_BillCard.setItemVisible('opan_org_no;opan_org_name', true);
        this.d1_BillCard.setBillCardItemRequired('org_no;org_name', false);
        this.d1_BillCard.setBillCardItemRequired('opan_org_no;opan_org_name', true);
      }

      if (itemKey == 'acct_attr') {
        if (newVal == '4') {
          this.d1_BillCard.setItemVisible('pay_amt', true);
          this.d1_BillCard.setBillCardItemRequired('pay_amt', true);
          this.d1_BillCard.setBillCardItemEditable('acct_belong', true);
        } else {
          this.d1_BillCard.setItemVisible('pay_amt', false);
          this.d1_BillCard.setBillCardItemClearValue('pay_amt');
          this.d1_BillCard.setBillCardItemRequired('pay_amt', false);

          //非受托支付的场景，设置账户归属为【我行账户】，不可编辑
          this.d1_BillCard.setBillCardItemValue('acct_belong', '10');

          this.d1_BillCard.setBillCardItemEditable('acct_belong', false);
          this.change(thisCard, 'acct_belong', '', '10');//触发账户归属变化的事件
        }
      }
    },

    //关闭窗口
    doCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
