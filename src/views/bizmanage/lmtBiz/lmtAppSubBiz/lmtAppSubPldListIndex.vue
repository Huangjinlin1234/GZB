<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './lmtAppSubPldList_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       *
       引入抵押物列表
       *  @author 朱滋润
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.setBillListButtonVisable('确认引入', false);
    },

    onSave() {
      let rtnData = {};
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      const lmt_serno = this.pageParams.sub_serno;
      const lmt_scene = this.pageParams.guar_mode;
      jsoPar['lmt_serno'] = lmt_serno;
      jsoPar['lmt_scene'] = lmt_scene;

      // showHtmlConfirmBox('提示', '是否确认删除', 150, 100, _callback)
      //待开发
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtappguarrel/importguarcoll',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '修改成功!', 350, 150, this.getRefreshList);
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

    getRefreshList() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
