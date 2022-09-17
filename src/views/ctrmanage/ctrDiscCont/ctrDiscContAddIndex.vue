<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './ctrDiscContAdd_d1_BillCard.vue';
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
    /**
     * 贴现协议签订页面
     */
    AfterInit () {
      selfPar = this.pageParams;
      // 创建卡片
      this.d1_BillCard = this.$refs.d1_BillCard;
      const param = this.pageParams;
      this.$nextTick(() => {
        this.$utils.clone(selfPar, this.d1_BillCard.formdata);
      });
    },

    // 签订
    onSign () {
      let rtnData = {};
      const validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      const jsoPar = this.d1_BillCard.getBillCardValue();
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      const paperDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_BillCard.getBillCardItemValue('paper_cont_sign_date')));
      if (paperDate != '' && paperDate > openday) {
        this.$xutils.showMsgBox('提示', '纸质合同日期必须小于等于当前日期!');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/ctrdisccont/onsign',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '签订成功!', 350, 150, this.getRefreshList);
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 刷新列表
    getRefreshList () {
      this.$dialog.close(this.dialogId);
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
