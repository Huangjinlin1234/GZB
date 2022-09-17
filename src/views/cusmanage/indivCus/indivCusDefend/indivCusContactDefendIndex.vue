<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusContactDefend_d1_BillCard.vue';
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
    /*
        个人客户地址与联系方式信息
       */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;

      if (this.getFactory().contextData != null && this.getFactory().contextData != 'undefined') {
        // 客户编号
        if (this.getFactory().contextData.cusId != null && this.getFactory().contextData.cusId != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.cusId);
        }

        // 业务条线（1:正式/2:临时）
        if (this.getFactory().contextData.bizType != null && this.getFactory().contextData.bizType != 'undefined') {
          var bizType = this.getFactory().contextData.bizType;
          if (bizType == 'B04') {
            this.d1_BillCard.required = 'required';
          }
        }
      }
    },

    // 暂存
    save () {
      const wechatNo = this.d1_BillCard.getItemValue('wechat_no');
      const qq = this.d1_BillCard.getItemValue('qq');
      const email = this.d1_BillCard.getItemValue('email');
      if ((wechatNo == '' || wechatNo == null) && (qq == '' || qq == null) && (email == '' || email == null)) {
        this.$xutils.showMsgBox('温馨提示', '微信、QQ、Email地址三项中至少输入一项!');
        return;
      }
      const Data = this.d1_BillCard.getBillCardValue();
      this.$xutils.request({
        // 同步请求
        async: true,

        url: this.$backend.cmisCus + '/api/cusindivcontact/save',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回
    doBack () {
      this.getFactory().back();
      // window.parent.back();
    },

    // 提交
    commit () {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      this.save();
    }
  }
};
</script>
