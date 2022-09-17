<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './maxGrtContImport_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 担保合同(引入)

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // 刷新数据//查询条件改变时,会默认刷新页面
      this.d1_BillList.baseParams = {condition: {
        guarContType: 'B', guarContState: '101', oprType: '01'
        // cusId : this.pageParams.cusId
      }};
    },

    // 引入保存到关系表
    OnImport () {
      let params = this.d1_BillList.getSelectedRowData();
      var data = this.pageParams;
      params['serno'] = data.iqpSerno ? data.iqpSerno : data.serno;
      params['contNo'] = data.contNo;
      // 担保合同编号是需要的
      // params['guarContNo'] = null;
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'post',
        url: this.$backend.cmisBiz + '/api/grtguarbizrstrel/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '引入成功!', 500, 300, () => {
              this.$dialog.close(this.dialogId);
            });
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
    OnCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
