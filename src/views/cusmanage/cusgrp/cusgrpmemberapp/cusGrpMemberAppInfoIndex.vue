<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusGrpMemberAppInfo_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      d1_16_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 李召星
       * 集团成员客户修改，查看页面
       */
    AfterInit () {
      if (this.pageParams.op == 'update') {
        this.d1_BillCard = this.$refs.d1_BillCard;
      } else {
        this.d1_BillCard = this.$refs.d1_BillCard;
        this.d1_BillCard.setItemEditable('*', false);
      }

      // 流水号
      // const serno = this.pageParams.serno;
      this.$utils.clone(this.pageParams, this.d1_BillCard.formdata);
      // this.d1_BillCard.queryDataByCondition({serno: serno});
    },

    // 修改方法
    doSave () {
      // 获取客户类型 临时、正式
      // const cusRankCls = this.d1_BillCard.getBillCardItemValue('cusRankCls');

      // if (!(cusRankCls == '01' || cusRankCls == '02')) {
      //   this.$xutils.showMessage('成员客户必须是正式客户或临时客户!');
      //   return;
      // }

      // 更新最近更新人更新日期等
      const userInfo = this.$xutils.getLoginUserInfo();

      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd', new Date()));
      this.d1_BillCard.setItemValue('UPDATE_TIME', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));

      // 更新数据
      const flag = this.d1_BillCard.updateBillCardData();

      if (flag && flag.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 150, () => {
          this.$dialog.close(this.dialogId);
        });
      }
    },

    // 返回方法
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
