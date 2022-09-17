<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgOrderDownloadRecord_d1_BillList.vue";
let par = {};
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      d1_BillList: null,
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      par = this.pageParams;
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition("rel_pk_id = '" + par.pk_id + "'");
    },

    download() {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == "") {
        this.$xutils.showMsgBox(
          "提示",
          "必须选择一条记录进行操作!\r\n请重新操作!",
          350,
          150
        );
        return;
      }

      let downUrl = "";
      let dataSource = par.data_source;

      if (dataSource == "1") {
        downUrl = this.$backend.cmisBiz + "/api/orderdownlad/download";
      } else if (dataSource == "2") {
        downUrl = this.$backend.cmisGuar + "/api/orderdownlad/download";
      } else if (dataSource == "3") {
        downUrl = this.$backend.cmisLmt + "/api/orderdownlad/download";
      } else if (dataSource == "4") {
        downUrl = this.$backend.cmisCus + "/api/orderdownlad/download";
      }

      // YuXPUtil.AJAX({
      //   url: downUrl + '/' + jsoPar.pk_id,
      //   type: 'POST',
      //   success: function (response, status, xhr) {

      //   }
      // });

      let loginToken = this.$xutils.getToken();

      let url =
        downUrl + "?pkId=" + jsoPar.pk_id + "&access_token=" + loginToken;
      this.$xutils.downloadFile4Get(url);
    },
  },
};
</script>