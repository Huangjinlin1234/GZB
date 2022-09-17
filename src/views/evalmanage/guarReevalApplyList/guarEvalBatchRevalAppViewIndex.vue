<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
  </div>
</template>
<script>
import d1Billlist from "./guarEvalBatchRevalAppView_d1_BillList.vue";
/**
 *  押品批量重估提交（明细页面）
 */
//let batchSerno = this.getFactory().contextData.batchSerno;
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
    this.$lookup.reg("STD_ZB_CUR_TYP");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      //判定是否流程进入,给流水号 塞值
      if (this.getFactory().contextData) {
        if (this.getFactory().contextData.instanceInfo) {
          if (this.getFactory().contextData.instanceInfo.bizId) {
            this.getFactory().contextData.batchSerno = this.getFactory().contextData.instanceInfo.bizId;
          }
        }
      }

      let batchSerno = this.getFactory().contextData.batchSerno;
      //判断是否为流程进入页面
      if (this.getFactory().contextData.flowParam) {
        if (this.getFactory().contextData.instanceInfo) {
          let wfFlag = true;
          this.getFactory().contextData["wfFlag"] = wfFlag;

          if (this.getFactory().contextData.instanceInfo.bizId) {
            //将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.serno = this.getFactory().contextData.instanceInfo.bizId;

            this.getFactory().contextData.bizSerno = this.getFactory().contextData.instanceInfo.bizId;

            batchSerno = this.getFactory().contextData.instanceInfo.bizId;
          }
        }
      }
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.baseParams = {
        batchSerno: batchSerno
      };
      this.d1_BillList.queryData();
      this.showAction();
    },

    // 重新点击时重新加载页面
    showAction() {
      this.getFactory().setButtonVisiable("tempSave", false);
      this.getFactory().setButtonVisiable("save", false);
    },

    //流程提交
    commit() {
      // 申请流水号
      let evalAppSerno = this.getFactory().contextData.batchSerno;

      //          //查询关联内评外评信息是否保存
      //          YuXPUtil.AJAX({
      //              async: false, // 同步请求
      //              url: YuXPUtil.getTopWindow().backend.cmisEval + '/api/guarevalapply/checkProjectDetails/'+evalAppSerno,
      //              success: function (response, status, xhr) {
      //                  if (response.data > 0) {
      let loginUser = this.$xutils.getLoginUserInfo();

      //设置流程提交参数
      let rsPars = {
        systemId: "cmis",
        orgId: loginUser.orgId,
        bizId: evalAppSerno,
        bizType: "WF_BATCH_REVAL",
        userId: loginUser.loginCode,
        bizUserName: loginUser.userName,
        bizUserId: loginUser.loginCode
      };
      //流程提交

      //this.$xutils.wfInit(rsPars, afterCommitCallBack);
      //                  } else {
      //                      YuXP.showMsgBox('提示：', '存在项目信息未保存，不允许提交！', '500', '200', null);
      //                      return;
      //                  }
      //              }
      //          });
    },

    //流程提交成功的回调方法
    afterCommitCallBack() {
      //刷新列表页面
      this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition");
    }
  }
};
</script>
