<template>
  <div>
    <d1-billcard ref="d1_BillCard" hidden></d1-billcard>
    <d1-billlist ref="d1_BillList"></d1-billlist>
  </div>
</template>
<script>
import d1Billcard from "./evalBatchImport_d1_BillCard.vue";
import d1Billlist from "./evalBatchImport_d1_BillList.vue";
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
      d1_BillCard: null,
      d1_BillList: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_CUR_TYP,STD_ZB_CERT_TYP,STD_ZB_CUS_TYPE,STD_ZB_YES_NO,STD_ZB_DEF_EFFECT_TYPE,STD_ZB_FORCECREATE_IND,STD_ZB_REG_STATE,STD_ZB_GUAR_BUSISTATE,STD_ZB_GUAR_STATE,STD_ZB_DATA_SOURCE,STD_ZB_OPR_TYPE");
    this.AfterInit();
  },
  methods: {
    /**押品列表引入界面列表**/
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.baseParams = {
        oprType: '01',
        guarBizState: "01"
      };
      this.d1_BillList.queryData();
    },

    //引入
    onImport() {
      //20210115 特殊申请可引入多笔
      let params = this.d1_BillList.$refs.refTable.selections;
      if (params == null || params.length == 0) {
        this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      this.$request({
        async: false,
        method: "POST",
        url: this.$backend.cmisEval + "/api/guarevalbatchrevalapp/batchInsert",
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

      //this.addPageHandle(params);
    },

    //新增页面进入的引入借据的操作
    addPageHandle(params) {
      //生成主流水号
      let batchSerno = this.$xutils.getSEQWithParamFromServer("SERNO");

      //执行新增操作
      let resp = "";

      //let totalContBalance = "";

      for (let i = 0; i < params.length; i++) {
        // totalContBalance = totalContBalance * 1 + params[i].loan_balance * 1;
        let guarNo = params[i].guarNo;


        // 获取当前登录信息
        let userInfo = this.$xutils.getLoginUserInfo();

        // 生成任务流水
        let taskId = this.$xutils.getSEQWithParamFromServer("PK_VALUE");

        this.d1_BillCard.setBillCardItemValue("pk", taskId);
        this.d1_BillCard.setBillCardItemValue("batchSerno", batchSerno);


        this.d1_BillCard.setBillCardItemValue("guarNo", guarNo);
        this.d1_BillCard.setBillCardItemValue("oprType", "01");
        this.d1_BillCard.setBillCardItemValue("inputId", userInfo.loginCode);
        this.d1_BillCard.setBillCardItemValue("inputBrId", userInfo.orgCode);
        this.d1_BillCard.setBillCardItemValue("inputDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));

        //保存
        resp = this.d1_BillCard.saveBillCardData(); //新增

        //生成批量重估结果信息表（重估结果为空,流程结束后处理）
        let guarTypeCd = params[i].guarTypeCd;

        let guarCusId = params[i].guarCusId;
        let guarCusName = params[i].guarCusName;
        this.insertResult(taskId, guarNo, guarTypeCd, guarCusId, guarCusName);
      }

      //生成批量记录
      this.insertBatchApp(batchSerno);

      if (resp != "" && resp != null) {
        //返回主页面
        this.onCancel();
      }
      //数据回调
      //YuXPUtil.closeDialog(data);
    },

    // 调用批量新增接口,新增批量新增记录
    insertBatchApp(batchSerno) {
      let userInfo = this.$xutils.getLoginUserInfo();
      let data = {};

      //生成流水号
      data.batchSerno = batchSerno; //业务流水号

      data.inputId = userInfo.loginCode; //登记人
      data.inputBrId = userInfo.orgCode; //登记机构
      data.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()); //登记日期
      data.approveStatus = "000"; //审批状态000
      data.oprType = "01"; //操作类型

      this.$request({
        async: false,
        method: "POST",
        url: this.$backend.cmisEval + "/api/guarevalbatchrevalapp/insert",
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.data != null && response.data != "") {
            // this.$xutils.showMsgBox("提示", "重估任务新增成功", 350, 150);
            this.$message.success("重估任务新增成功");
          } else {
          }
        }
      });
    },

    // 调用批量重估结果接口,新增量重估结果记录
    insertResult(taskId, guarNo, guarTypeCd, guarCusId, guarCusName) {
      let userInfo = this.$xutils.getLoginUserInfo();
      let data = {};

      data.taskId = taskId;

      data.guarNo = guarNo; //押品编号
      data.guarTypeCd = guarTypeCd; //押品类型
      data.guarCusId = guarCusId; //押品所有人编号
      data.guarCusName = guarCusName; //押品所有人姓名
      data.inputId = userInfo.loginCode; //登记人
      data.inputBrId = userInfo.orgCode; //登记机构
      data.updId = userInfo.loginCode; //修改人
      data.updBrId = userInfo.orgCode; //修改机构
      data.oprType = "01"; //操作类型

      this.$request({
        async: false,
        method: "POST",
        url: this.$backend.cmisEval + "/api/guarevalbatchreevalresult/insert",
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.data != null && response.data != "") {
            // this.$alert("重估任务新增成功", "提示");
            this.$message.success("重估任务新增成功");
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
