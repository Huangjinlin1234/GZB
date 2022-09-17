<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYpQfbmdUpdate_d1_BillCard.vue';
/**
 * 银票签发白名单-修改
 */
export default {
  components: { d1Billcard },
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
      var op = this.pageParams.op;
      var pars = '';
      if (op == 'add') {
        pars = this.d1_BillCard.execBillCardDefaultValueFormula();
      } else if (op == 'edit') {
        pars = this.pageParams;
      } else {
        pars = this.pageParams;
      }
      // const param = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      //
      //  this.d1_BillCard.setBillCardValue(param);

      this.d1_BillCard.setBillCardValue(pars);
    },

    // 保存
    save () {
      // 校验必输
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const resp = this.d1_BillCard.updateBillCardData();
      if (resp && resp.code == 'ok') {
        this.$xutils.showMsgBox('提示', '修改成功!', 350, 150, () => {
          // 刷新父级页面数据
          this.$dialog.close(this.dialogId);
        });
      }
    },

    // 返回操作
    cancel () {
      // 刷新父级页面数据
      this.$dialog.close(this.dialogId);
    },

    submit () {
      // 校验必输
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const resp = this.d1_BillCard.updateBillCardData();
      if (resp && resp.code == 'ok') {
        const loginUser = this.$xutils.getLoginUserInfo();
        const rsPars = {
          systemId: 'cmis',
          orgId: loginUser.orgId,
          bizId: this.d1_BillCard.getBillCardItemValue('lywaSerno'),
          // 流程申请类型会自动创建队列
          bizType: 'WF_CUS_LST_YPQF_WHITE_APP',
          userId: loginUser.loginCode,
          // 客户名称
          bizUserName: this.d1_BillCard.getBillCardItemValue('cusName'),
          // 客户编号
          bizUserId: this.d1_BillCard.getBillCardItemValue('cusId')
        };
        // 流程提交调用公用的方法
        this.$xutils.wfInit(rsPars, () => {});
      }
    }
  }
};
</script>
