<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusPubRelInverstAdd_d1_BillCard.vue';
/**
对外投资新增
*/
let data = {};

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
      data = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    // 保存
    doSave () {
      let _this = this;
      let cusId = _this.$route.params.cusId;
      // 保存之前校验必输项
      const saveFlag = _this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      let data = _this.d1_BillCard.getBillCardValue();
      data['cusId'] = cusId;
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisCus + '/api/cuspubrelinvest/save',
        data: JSON.stringify(_this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              _this.doBack();
            });
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回
    doBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
