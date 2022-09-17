<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgStandardTemplateFileDownload_d1_BillList.vue';
yufp.lookup.reg('STD_STANDARD_TEMPLATE');
export default {
  components: { d1Billlist },
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
    // 制式模板文件下载
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    doDownload () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      let fileId = jsoPar.file_path;
      let loginToken = this.$xutils.getToken();
      let url = this.$backend.fileService + '/api/file/provider/download?fileId=' + fileId + '&access_token=' + loginToken;
      this.$xutils.downloadFile4Get(url);
    }
  }
};
</script>
