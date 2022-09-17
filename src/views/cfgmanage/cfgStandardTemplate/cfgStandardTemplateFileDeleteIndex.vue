<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgStandardTemplateFileDelete_d1_BillList.vue";
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    // 制式模板文件删除
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 删除模板文件
    doDeleteFile() {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == "") {
        this.$xutils.showMsgBox("提示", "请选择模板!", 350, 150);
        return;
      }

      //var url = YuXPUtil.getTopWindow().backend.fileService + '/api/file/delete?fileId=' + jsoPar.file_id;

      this.$xutils.request({
        type: "POST",

        // 同步请求
        async: false,

        url: this.$backend.fileService + "/api/file/delete?fileId=" + jsoPar.file_id,

        success: (response, status, xhr) => {
          if (response.code == "0") {
            this.cancel();
          } else {
            this.$xutils.showMsgBox("提示", "错误代码：" + response.code + ",错误信息：" + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        }
      });
    },

    cancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
