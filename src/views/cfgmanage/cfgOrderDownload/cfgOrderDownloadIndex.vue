<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgOrderDownload_d1_BillList.vue";
export default {
  inject: ["reload"],
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
    this.$lookup.reg(
      "STD_ORDER_TYPE,STD_ORDER_SOURCE,STD_ORDER_STATUS,STD_ORDER_WATER"
    );
    this.AfterInit();
  },
  methods: {
    // 制式模板文件下载
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    ordertest() {
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

      if (jsoPar.status == "1") {
        this.$xutils.showMsgBox("提示", "该预约已在运行!", 350, 150);
        return;
      }

      let startUrl = "";

      if (jsoPar.dataSource == "1") {
        startUrl = this.$backend.cmisBiz + "/api/orderdownlad/start";
      } else if (jsoPar.dataSource == "2") {
        startUrl = this.$backend.cmisGuar + "/api/orderdownlad/start";
      } else if (jsoPar.dataSource == "3") {
        startUrl = this.$backend.cmisLmt + "/api/orderdownlad/start";
      } else if (jsoPar.dataSource == "4") {
        startUrl = this.$backend.cmisCus + "/api/orderdownlad/start";
      }

      this.$xutils.request({
        url: startUrl,
        type: "POST",
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code != "0") {
            this.$xutils.showMsgBox(
              "提示",
              "错误代码：" + response.code + ",错误信息：" + response.message
            );
          } else {
            let data = response.data; // 删除条数

            if (data == "1") {
              this.$xutils.showMsgBox("提示", "启动失败 cron表达式不合法");
            } else {
              this.$xutils.showMsgBox("提示", "启动成功");
              this.updateStatus(jsoPar.pk_id, "1");
            }
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            "提示",
            errorThrown + "：错误信息：" + result.responseJSON.message
          ); // 弹出提示
        },
      });
    },

    orderstop() {
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

      let endUrl = "";

      if (jsoPar.dataSource == "1") {
        endUrl = this.$backend.cmisBiz + "/api/orderdownlad/end";
      } else if (jsoPar.dataSource == "2") {
        endUrl = this.$backend.cmisGuar + "/api/orderdownlad/end";
      } else if (jsoPar.dataSource == "3") {
        endUrl = this.$backend.cmisLmt + "/api/orderdownlad/end";
      } else if (jsoPar.dataSource == "4") {
        endUrl = this.$backend.cmisCus + "/api/orderdownlad/end";
      }

      this.$xutils.request({
        url: endUrl,
        type: "POST",
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code != "0") {
            this.$xutils.showMsgBox(
              "提示",
              "错误代码：" + response.code + ",错误信息：" + response.message
            );
          } else {
            this.$xutils.showMsgBox("提示", "停止成功");
            this.updateStatus(jsoPar.pk_id, "2");
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            "提示",
            errorThrown + "：错误信息：" + result.responseJSON.message
          ); // 弹出提示
        },
      });
    },

    updateStatus(pkId, status) {
      this.$xutils.request({
        // 同步请求
        async: false,

        type: "POST",

        data: {
          pkId: pkId,
          status: status,
        },

        url: this.$backend.cmisCfg + "/api/cfgorderdownload/updatestatus",

        success: (response, status, xhr) => {
          if (response.code != "0") {
            this.$xutils.showMsgBox(
              "提示",
              "错误代码：" + response.code + ",错误信息：" + response.message
            );
          } else {
            let count = response.data; // 更新条数
            // YuXP.showMsgBox('提示', '删除成功！删除条数：' + count); // 弹出提示
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            "提示",
            errorThrown + "：错误信息：" + result.responseJSON.message
          ); // 弹出提示
        },
      });
    },

    // 展示预约运行的记录
    showList() {
      let selPars = this.d1_BillList.getSelectedRowData();

      if (selPars == null || selPars == "") {
        this.$xutils.showMsgBox(
          "提示",
          "必须选择一条记录进行操作!\r\n请重新操作!",
          350,
          150
        );
        return;
      }

      this.$dialog.open(
        "查看预约下载记录",
        "cfgmanage/cfgOrderDownload/cfgOrderDownloadRecordIndex",
        -1,
        -1,
        selPars
      );
    },

    addOrder() {
      let selPars = {
        opType: "add",
      };
      this.$dialog.open(
        "新增",
        "cfgmanage/cfgOrderDownload/cfgOrderDownloadDetailsIndex",
        -1,
        -1,
        selPars,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
      // 刷新页面
      // this.d1_BillList.remoteBillListData();
    },

    updateOrder() {
      let selPars = this.d1_BillList.getSelectedRowData();

      if (selPars == null || selPars == "") {
        this.$xutils.showMsgBox("提示", "请选择一条数据", 350, 150);
        return;
      }

      if (selPars.status == "1") {
        this.$xutils.showMsgBox(
          "提示",
          "该预约正在运行中，请停止后进行修改!",
          350,
          150
        );
        return;
      }

      selPars.opType = "edit";

      this.$dialog.open(
        "修改",
        "cfgmanage/cfgOrderDownload/cfgOrderDownloadDetailsIndex",
        -1,
        -1,
        selPars,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
      // 刷新页面
      // this.d1_BillList.remoteBillListData();
    },

    deleteOrder() {
      let selPars = this.d1_BillList.getSelectedRowData();

      if (selPars == null || selPars == "") {
        this.$xutils.showMsgBox("提示", "请选择一条数据", 350, 150);
        return;
      }

      if (selPars.status == "1") {
        this.$xutils.showMsgBox(
          "提示",
          "该预约正在运行中，请停止后进行删除!",
          350,
          150
        );
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        type: "POST",
        url:
          this.$backend.cmisCfg +
          "/api/cfgorderdownload/delete/" +
          selPars.pkId,

        success: (response, status, xhr) => {
          if (response.code != "0") {
            this.$xutils.showMsgBox(
              "提示",
              "错误代码：" + response.code + ",错误信息：" + response.message
            );
          } else {
            let count = response.data; // 删除条数
            this.$xutils.showMsgBox("提示", "删除成功！删除条数：" + count); // 弹出提示
            // rtdata = true;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            "提示",
            errorThrown + "：错误信息：" + result.responseJSON.message
          ); // 弹出提示
        },
      });
      // 刷新页面
      this.d1_BillList.remoteBillListData();
    },

    viewOrder() {
      let selPars = this.d1_BillList.getSelectedRowData();

      if (selPars == null || selPars == "") {
        this.$xutils.showMsgBox("提示", "请选择一条数据", 350, 150);
        return;
      }

      selPars.opType = "view";

      this.$dialog.open(
        "查看",
        "cfgmanage/cfgOrderDownload/cfgOrderDownloadDetailsIndex",
        -1,
        -1,
        selPars
      );
    },
  },
};
</script>