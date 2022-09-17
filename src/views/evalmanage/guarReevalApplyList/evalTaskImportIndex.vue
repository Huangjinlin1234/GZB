<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
    <d1-billcard ref="d1_BillCard" hidden></d1-billcard>
  </div>
</template>
<script>
import d1Billcard from "./evalTaskImport_d1_BillCard.vue";
import d1Billlist from "./evalTaskImport_d1_BillList.vue";
export default {
  components: { d1Billcard, d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      onImport: this.onImport,
      onCancel: this.onCancel
    }
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_CUR_TYP,STD_ZB_REVAL_TASK_STATUS,STD_ZB_GUAR_STATE");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryData();
    },

    //引入
    onImport() {
      //20210115 特殊申请可引入多笔借据台账
      let params = this.d1_BillList.$refs.refTable.selections;
      if (params == null || params.length == 0) {
        this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }

      this.$request({
        async: false,
        method: "POST",
        url: this.$backend.cmisEval + "/api/guarevalbatchreevaltask/batchInsert",
        data: JSON.stringify(params),
        success: (response, status, xhr) => {
          if (response.code == "0") {
            // this.$alert("重估任务新增成功", "提示");
            this.$message.success("重估任务新增成功");
            this.$dialog.close(this.dialogId);
          } else {
            this.$message.error(response.message);
          }
        }
      });

      // this.addPageHandle(params);
    },

    //新增页面进入的引入押品的操作
    addPageHandle(params) {
      //获取参数
      //执行新增操作
      let resp = "";

      //let totalContBalance = "";

      for (let i = 0; i < params.length; i++) {
        //totalContBalance = totalContBalance * 1 + params[i].loan_balance * 1;
        let guarNo = params[i].guarNo;
        this.d1_BillCard = this.$refs.d1_BillCard;

        // 获取当前登录信息
        const userInfo = this.$xutils.getLoginUserInfo();

        // 生成任务流水
        let task_id = this.$xutils.getSEQWithParamFromServer("PK_VALUE");

        this.d1_BillCard.setBillCardItemValue("taskId", task_id);
        this.d1_BillCard.setBillCardItemValue("guarNo", guarNo);
        this.d1_BillCard.setBillCardItemValue("revalTaskStatus", "01"); //任务状态
        this.d1_BillCard.setBillCardItemValue("arrangeId", userInfo.loginCode);
        this.d1_BillCard.setBillCardItemValue("arrangeOrg", userInfo.orgCode);
        this.d1_BillCard.setBillCardItemValue("createDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));
        this.d1_BillCard.setBillCardItemValue("cusManagerOrg", userInfo.orgCode);
        this.d1_BillCard.setBillCardItemValue("cusManagerId", userInfo.loginCode);
        this.d1_BillCard.setBillCardItemValue("oprType", "01");
        this.d1_BillCard.setBillCardItemValue("inputId", userInfo.loginCode);
        this.d1_BillCard.setBillCardItemValue("inputBrId", userInfo.orgCode);
        this.d1_BillCard.setBillCardItemValue("inputDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));
        this.d1_BillCard.setBillCardItemValue("updId", userInfo.loginCode);
        this.d1_BillCard.setBillCardItemValue("updBrId", userInfo.orgCode);
        this.d1_BillCard.setBillCardItemValue("updDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));
        this.d1_BillCard.setBillCardItemValue("finishDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));
        this.d1_BillCard.setBillCardItemValue("source", "1");

        //保存
        resp = this.d1_BillCard.saveBillCardData(); //新增

        // 调用重估任务新增接口,新增一笔待发起的重估任务
        this.insertGuarEval(guarNo);
      }

      if (resp.taskId != null && resp.taskId != "") {
        //返回主页面
        this.onCancel();
        //this.d1_BillList.queryDataByCondition();
      }
      //数据回调
      //YuXPUtil.closeDialog(data);
    },

    // 调用重估任务新增接口,新增一笔待发起的重估任务
    insertGuarEval(guarNo) {
      let userInfo = this.$xutils.getLoginUserInfo();
      let data = {};

      //生成流水号
      let serno = this.$xutils.getSEQWithParamFromServer("SERNO");

      data.serno = serno;
      data.guarNo = guarNo; //押品编号
      data.inputId = userInfo.loginCode; //登记人
      data.inputBrId = userInfo.orgCode; //登记机构
      data.inputDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date()); //登记日期
      data.approveStatus = "000"; //审批状态000
      data.wfApprStatus = "000"; //审批状态000
      data.evalInOutType = ""; //评估方式
      data.oprType = "01"; //操作类型
      //let loginToken = this.$xutils.getToken();

      this.$request({
        async: false,
        method: "POST",
        url: this.$backend.cmisEval + "/api/guarevalreevalapply/insert",
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.data == 0) {
            // this.$xutils.showMsgBox("提示", "重估任务新增失败", 350, 150);
            this.$message.error("重估任务新增失败");

          } else {
          }
        }
      });
    },

    //返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
