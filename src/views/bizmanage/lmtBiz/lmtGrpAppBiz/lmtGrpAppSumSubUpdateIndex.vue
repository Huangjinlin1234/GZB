<template>
  <div>
    <div style="height:50%">
      <d1-a-billlist ref="d1_A_BillList"></d1-a-billlist>
    </div>
    <div style="height:calc(100% - 50%)">
      <d1-b-billlist v-show="lmtType01" ref="d1_B_BillList"></d1-b-billlist>
      <d1-b-15-billlist v-show="lmtType04" ref="d1_B_15_BillList"></d1-b-15-billlist>
      <d1-b-17-billlist v-show="!lmtType01 && lmtType04" ref="d1_B_17_BillList"></d1-b-17-billlist>
    </div>
  </div>
</template>
<script>
import d1ABilllist from "./lmtGrpAppSumSubUpdate_d1_A_BillList.vue";
import d1BBilllist from "./lmtGrpAppSumSubUpdate_d1_B_BillList.vue";
import d1B15Billlist from "./lmtGrpAppSumSubUpdate_d1_B_15_BillList.vue";
import d1B17Billlist from "./lmtGrpAppSumSubUpdate_d1_B_17_BillList.vue";
export default {
  components: { d1ABilllist, d1BBilllist, d1B15Billlist, d1B17Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillList: null,
      d1_B_BillList: null,
      lmtType01: false,
      lmtType04: false
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_YES_NO", "STD_ZB_LMT_GUAR_WAY");
    this.AfterInit();
  },
  methods: {
    /**
     * title  集团授信申请汇总分项页面
     * author xiamc
     * date 2021-04-08
     * */

    AfterInit() {
      let serno = this.getFactory().contextData.serno;
      let lmtType = this.getFactory().contextData.lmtType;

      // 填充模板信息
      this.d1_A_BillList = this.$refs.d1_A_BillList;

      if (lmtType == "01") {
        // 获取填充数据 并赋值到表格
        this.lmtType01 = true;
        this.lmtType04 = false;
        this.d1_B_BillList = this.$refs.d1_B_BillList;
      } else if (lmtType == "04") {
        this.lmtType01 = false;
        this.lmtType04 = true;
        this.d1_B_BillList = this.$refs.d1_B_15_BillList;
      } else {
        this.lmtType01 = false;
        this.lmtType04 = false;
        this.d1_B_BillList = this.$refs.d1_B_17_BillList;
      }

      this.d1_A_BillList.queryDataByCondition({ grpSerno: serno });
      this.d1_B_BillList.queryDataByCondition({ params: serno });
    },

    onView() {},

    // 成员额度调剂设定
    onAdjustSet() {
      // 1.获取响应的下拉框数值
      const jsoPar = this.d1_A_BillList.getSelectedRowsData();

      // 2. 传递具体集团成员
      this.$dialog.open("增加", "bizmanage/lmtBiz/lmtGrpAppBiz/memLimitAdjustListIndex", "1000", "600", jsoPar, null);
    },

    // 查看单一客户授信申请页面
    onViewSingleLmtApp() {
      const jsoPar = this.d1_A_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }

      // TODO 跳转单一客户授信申请查看页面
    },

    showAction() {},

    /**
     * 退回单一客户授信申请填报
     */
    onBackSingleLmtApp() {
      // 1.获取前台的选择传送参数的数值，支持单个选择
      const jsoPar = this.d1_A_BillList.getSelectedRowData();

      // 2.校验，

      // 3.发送Ajax请求，根据集团成员关系表的关联信息，修改单笔记录的客户经理提交状态
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + "/api/lmtgrpmemrel/UpdateGrpStatus/",
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == "0") {
            this.$xutils.showMsgBox("提示", " 状态退回成功", 200, 200, () => {});
            this.rtnData = response.data;
          } else {
            this.$xutils.showMsgBox("提示", "错误代码：" + response.code + ",错误信息：" + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        }
      });

      // 4.END 刷新表单状态
    }
  }
};
</script>
