<template>
  <div>
    <yu-row></yu-row>
    <yu-row>
      <yu-col :span="12">

      </yu-col>
      <yu-col :span="12">
        <yu-row>
          <d1-b-b-a-billlist ref="d1_B_B_A_BillList"></d1-b-b-a-billlist>
        </yu-row>
        <yu-row></yu-row>
      </yu-col>
    </yu-row>
  </div>
  <!-- <div>
    <div style="height: 5%">
      <div>
        <div style="display: inline-block; width: 50%">
          <div>
            <div style="height: 50%">
              <d1-b-b-a-billlist ref="d1_B_B_A_BillList"></d1-b-b-a-billlist>
            </div>
            <div style="height: calc(100% - 50%)"></div>
          </div>
        </div>
        <div style="display: inline-block; width: calc(100% - 50%)"></div>
      </div>
    </div>
    <div style="height: calc(100% - 5%)"></div>
  </div> -->
</template>
<script>
import d1BBABilllist from "./indivCusFncStatBaseCent_d1_B_B_A_BillList.vue";
/**
个人财报信息(集中页面)
*/
// 获取流水号

export default {
  components: { d1BBABilllist },
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      d1_B_B_A_BillList: null,
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      let bizType, cusId, cusName, inputDate;
      const serno = this.pageParams.flowData.instanceInfo.bizId;
      if (serno) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url:
            this.$backend.cmisCus +
            "/api/cusmanatask/queryCusManaTask/" +
            serno,
          data: JSON.stringify(this.$xutils.toUpperCase(serno, true)),
          success: (response, status, xhr) => {
            if (response.code == "0") {
              bizType = response.data.bizType;
              cusId = response.data.cusId;
              cusName = response.data.cusName;
              inputDate = response.data.inputDate;
            } else {
              this.$xutils.showMsgBox(
                "提示",
                "错误代码：" + response.code + ",错误信息：" + response.message
              );
              // 
              // exit;// ajax中return不生效，可以用exit
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
            // 
          },
        });

        // const html =
        //   "</div><div style ='height: 100%;margin-left:10px; width: 100px;display: flex;align-items: center;justify-content: space-around'>" +
        //   "<div style='width:40px;white-space: nowrap'><a src='javascript:void(0)' style='color:black;margin-left:50px;'>业务编号:" +
        //   serno +
        //   "</a></div>" +
        //   "<div style='width:40px;white-space: nowrap'><a src='javascript:void(0)' style='color:black;text-decoration:underline;margin-left:350px;'>业务类型" +
        //   bizType +
        //   "</a></div>" +
        //   "<div style='width:40px;white-space: nowrap'><a src='javascript:void(0)' style='color:black;text-decoration:underline;margin-left:650px;'>客户编号" +
        //   cusId +
        //   "</a></div>" +
        //   "<div style='width:40px;white-space: nowrap'><a src='javascript:void(0)' style='color:black;text-decoration:underline;margin-left:950px;'>客户名称" +
        //   cusName +
        //   "</a></div>" +
        //   "<div style='width:40px;white-space: nowrap'><a src='javascript:void(0)' style='color:black;text-decoration:underline;margin-left:1250px;'>申请日期" +
        //   inputDate +
        //   "</a></div>" +
        //   "</div>";
        // this.$xutils.createHtml("d1_A", html);
        this.d1_B_B_A_BillList = this.$refs.d1_B_B_A_BillList;
        this.d1_B_B_A_BillList.queryDataByCondition({
          cus_id: cusId,
          state_flg: "1",
        });

        //var iframeHtml="<iframe src='http://www.baidu.com' style='height:100%;width:100%;'></iframe>";
        // const iframeHtml =
        //   "<iframe src='https://vip.iqiyi.com/' style='height:100%;width:100%;'></iframe>";

        // this.$xutils.createHtml("d1_B_A", iframeHtml);
      }
      // 通过流水号 获取任务表任务
    }
  }
};
</script>
