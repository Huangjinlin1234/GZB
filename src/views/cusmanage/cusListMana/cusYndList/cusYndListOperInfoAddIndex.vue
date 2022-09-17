<template>
  <d1-billcard ref="d1_BillCard" :form-type="formType"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYndListOperInfoAdd_d1_BillCard.vue';
/**
 * 刘愿 优农贷名单准入申请 经营信息 新增
 */
const jsoPar = {};

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
  created () {
    if (this.pageParams.op == 'VIEW') {
      this.formType = 'details';
    }
  },
  mounted () {
    this.d1_BillCard = this.$refs.d1_BillCard;
    if (this.pageParams.op == 'ADD') {
      this.AfterInit();
    } else if (this.pageParams.op == 'EDIT' || this.pageParams.op == 'VIEW') {
      yufp.clone(this.pageParams.row, this.d1_BillCard.formdata);
    }
  },
  methods: {
    AfterInit () {
      const jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      jsoPar.managerId = jsoUser['loginCode'];// 主办人
      jsoPar.managerBrId = jsoUser['orgCode'];// 主办机构
      jsoPar.inputId = jsoUser['loginCode'];// 登记人
      jsoPar.inputBrId = jsoUser['orgCode'];// 登记机构
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 登记日期
      jsoPar.updId = jsoUser['loginCode'];// 最后修改人
      jsoPar.updBrId = jsoUser['orgCode'];// 最后修改机构
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 最后修改日期
      jsoPar.oprType = '01';
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.setBillCardValue(jsoPar);

      if (this.pageParams) {
        this.d1_BillCard.setItemValue('serno', this.pageParams.serno);
      }
    },

    // 【保存】按钮的逻辑
    save () {
      if (this.pageParams.op == 'ADD') {
        const validate = this.d1_BillCard.validateBillCardValue();
        if (validate) {
          this.d1_BillCard.setBillCardItemValue('serno', this.pageParams.serno);
          const flag = this.d1_BillCard.saveBillCardData();

          if (flag) {
            this.$xutils.showMsgBox('提示', '新增成功！', 350, 150, () => {
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '新增失败！');
            return;
          }
        }
      } else if (this.pageParams.op == 'EDIT') {
        this.d1_BillCard.updateBillCardData(() => {
          this.bycancel();
        });
      }
    },

    // 取消按钮
    bycancel () {
      this.$dialog.close(this.dialogId);
    },

    getDialogDataFunc () {},

    showAction () {
      const serno = this.getFactory().contextData.serno;
      jsoPar.serno = serno;
      this.d1_BillCard.setBillCardValue(jsoPar);
    }
  }
};
</script>
