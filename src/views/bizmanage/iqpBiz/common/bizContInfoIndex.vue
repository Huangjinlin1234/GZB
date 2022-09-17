<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./bizContInfo_d1_BillList.vue";
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
    //存量业务页面
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition(
        "cus_id = '" + this.getFactory().contextData.cus_id + "'"
      );
      this.d1_BillList.setAppendSQLCondition(
        "cus_id = '" + this.getFactory().contextData.cus_id + "'"
      );
    },

    //存量合同业务查看
    doView() {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox("提示", "请选择一条数据", 350, 150);
        return;
      }

      let rtnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + "/api/ctrloancont/getLmtAcctInfoByContNo",
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == "0") {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox(
              "提示",
              "错误代码：" + response.code + ",错误信息：" + response.message
            );
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        }
      });

      //针对异常的场景，无返回数据，不进行后续的处理
      if (JSON.stringify(rtnData) == "{}") {
        return;
      }

      let rtnCode = rtnData.rtnCode;

      if (rtnCode != "000000") {
        this.$xutils.showMsgBox("提示", rtnData.rtnMsg);
      } else {
        //合同录入的页面
        params["model_group_no"] = "CMG000023";

        params["myop"] = "PVPCONTVIEW";
        params["lmt_serno"] = rtnData.lmtSerno; //额度申请流水号，用于查询额度申请流程审批历史
        params["iqp_serno"] = params.iqpSerno; //业务申请流水号，用于查询业务申请审批历史
        params["pageDataFlag"] = "wfEnd"; //审批历史数据

        this.$dialog.open(
          "",
          "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex",
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      }
    }
  }
};
</script>
