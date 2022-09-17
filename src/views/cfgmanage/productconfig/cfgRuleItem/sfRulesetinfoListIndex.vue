<template>
<div></div>
</template>
<script>
const par = {};

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 查询规则列表信息
       */
    AfterInit () {
      var par = this.pageParams;
      this.d1_BillList = this.$refs.d1_BillList;

      // 查询规则列表信息
      this.getRuleList(par.BillCardData.rule_set_id);

      // 双击
      this.d1_BillList.addRowDBClickAction(this.dBClickRowAction);
    },

    getRuleList (rule) {
      // 获取已选要素
      const returnData = [];

      this.$xutils.request({
        type: 'GET',
        url: this.$backend.shuffleService + '/api/shuffle/rules/list/' + rule,

        // url: YuXPUtil.getTopWindow().backend.shuffleService + '/api/shuffle/rules/list/'+rule,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.d1_BillList.setBillListData(response.data);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: () => {
          this.$xutils.showMsgBox('提示', '无法获取规则列表');
        }
      });
    },

    // 双击事件
    dBClickRowAction (row, event) {
      this.$dialog.close(this.dialogId, row); // 把当前行记录返回
    }
  }
};
</script>
