<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYndUrgentListAppAdd_d1_BillCard.vue';
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
    /**
       * 紧急联系人新增
       */

    AfterInit () {
      const jsoPar = this.d1_BillCard = this.$refs.d1_BillCard;
      const jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      jsoPar.managerId = jsoUser['loginCode'];// 主办人
      jsoPar.managerBrId = jsoUser['orgCode'];// 主办机构
      jsoPar.inputId = jsoUser['loginCode'];// 登记人
      jsoPar.inputBrId = jsoUser['orgCode'];// 登记机构
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 登记日期
      jsoPar.updId = jsoUser['loginCode'];// 最后修改人
      jsoPar.updBrId = jsoUser['orgCode'];// 最后修改机构
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 最后修改日期

      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 【保存】按钮的逻辑
    save1 () {
      // 校验
      const isValidateSucess = this.d1_BillCard.validateBillCardValue();

      if (!isValidateSucess) {
        return;
      }

      // 保存数据
      const resp = this.d1_BillCard.insertBillCardData();

      if (resp) {
        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
          this.$dialog.close(this.dialogId);
        });
      }
    },

    save () {
      const validate = this.d1_BillCard.validateBillCardValue();
      if (validate) {
      // this.d1_BillCard.setBillCardItemValue('serno', this.pageParams.serno);
        let cardData = this.d1_BillCard.getBillCardValue();
        cardData.serno = this.pageParams.serno;
        // this.d1_BillCard.insertBillCardData();
        this.$request({
          url: this.d1_BillCard.addUrl,
          method: 'post',
          data: cardData// 先取得表单的数据
        }).then(req => {
          if (req.code == '0') {
            this.$message('新增成功!');
            this.bycancel();
          }
        });
      // if (flag) {
      //   this.$xutils.showMsgBox('提示', '新增成功！', 350, 150, () => {
      //     this.$dialog.close(this.dialogId);
      //   });
      // } else {
      //   this.$xutils.showMsgBox('提示', '新增失败！');
      //   return;
      // }
      }
    },

    // 取消
    bycancel () {
      this.$dialog.close(this.dialogId);
    },

    getDialogDataFunc () {}
  }
};
</script>
