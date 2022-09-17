<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './coopColonyWhiteLstInsectList_d1_BillCard.vue';
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
    // 集群白名单信息列表增加
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 加载默认值
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },
    onSave () {
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      // 保存数据
      const data = this.d1_BillCard.getBillCardValue();
      const userinfo = this.$xutils.getLoginUserInfo();
      data.updId = userinfo.userCode;
      data.updBrId = userinfo.orgCode;
      data.updDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/coopcolonywhitelst/',
        data: data,
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '新增成功', 350, 150, () => {
              // 列表刷新
              // this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              this.onBack();
            });
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
