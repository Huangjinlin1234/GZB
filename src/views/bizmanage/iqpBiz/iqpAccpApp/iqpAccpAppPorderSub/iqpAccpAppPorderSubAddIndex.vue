<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpAccpAppPorderSubAdd_d1_BillCard.vue';
let selfPar = {};

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
      selfPar = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    // 保存操作
    doSave () {
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();
      debugger;
      jsoPar['serno'] = selfPar.serno;
      let iqpAccpApp = this.$xutils.toUpperCase(jsoPar, true);

      // 保存操作
      let rtnData = '';

      let rtnFlag = true;

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqpaccpapppordersub/saveiaapordersubinfo',
        data: JSON.stringify(iqpAccpApp),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            rtnFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!rtnFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return;
      }

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        return;
      }

      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        //     // 刷新父级页面的列表数据
        this.$dialog.close(this.dialogId);
      });
    },

    doCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
