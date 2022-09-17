<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusPubRelInverstUpdate_d1_BillCard.vue';
/**
对外投资修改
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
      let _this = this;
      data = _this.pageParams;
      var op = data.op;
      if (op == 'VIEW' || op == 'view') {
        this.$refs.d1_BillCard.disabledflg = true;
      }

      yufp.clone(data, _this.$refs.d1_BillCard.formdata);
      this.$nextTick(function(){
        this.$nextTick(function(){
          this.$refs.d1_BillCard.addEditChangeAction(this.cardDataChangeFn);
        });
      });
    },
    cardDataChangeFn (card, key, val, newVal) {
      if('certType' == key){
        this.$refs.d1_BillCard.formdata.certCode = '';
        this.$refs.d1_BillCard.formdata.cusNameRel = '';
        this.$refs.d1_BillCard.formdata.cusIdRel = '';
      }
    },
    // 保存
    doSave () {
      let _this = this;
      // 保存之前校验必输项
      const saveFlag = _this.$refs.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const Data = _this.$refs.d1_BillCard.getBillCardValue();
      _this.$xutils.request({
        // 同步请求
        async: true,
        url: _this.$backend.cmisCus + '/api/cuspubrelinvest/update',
        data: JSON.stringify(_this.$xutils.toUpperCase(Data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.$xutils.showMsgBox('提示', '修改成功', 500, 300, () => {});
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          //
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
