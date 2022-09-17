<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgRateListUpdate_d1_BillCard.vue";
/**
 *  业务参数配置列表
 */
let par = {};

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_OPRD_TYP", "STD_ZB_CUR_TYP", "STD_ZB_BIZ_TYP");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({ pkId: this.pageParams.pkId });
    },

    // 保存
    save() {
      // 校验必输
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      this.d1_BillCard.execBillCardDefaultValueFormula();
      //保存
      //var saveResult = d1_BillCard.insertBillCardData();
      const saveResult = this.d1_BillCard.updateBillCardData();

      if (saveResult && saveResult.code == "0") {
        this.cancel();
      } else {
        return;
      }
    },

    //返回操作
    cancel() {
      //刷新父级页面数据
      this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition");

      this.$dialog.close(this.dialogId);
    },

    //流程提交
    //         function commit() {
    //              //保存页面数据
    //              var flag = true;
    ////              if(frameContext.recons == 'RECONS'){
    ////                 flag = saveRecons();
    ////              }else{
    ////                 flag = submitSave();
    ////              }
    //               if(flag){
    //                   //查询关联项目信息是否保存
    ////                   YuXPUtil.AJAX({
    ////                       async: false, // 同步请求
    ////                       url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/cfgrate/checkProjectDetails/'+frameContext.serno,
    ////                       success: function (response, status, xhr) {
    ////                           if (response.data > 0) {
    //                              var loginUser = YuXPUtil.getLoginUserInfo();
    //                              //设置流程提交参数
    //                              var rsPars = {
    //                                   "systemId": "cmis",
    //                                   "orgId": loginUser.orgId,
    //                                   "bizId": d1_BillCard.getItemValue('pk_id'),
    //                                   "bizType": "WF_CFG_RATE",
    //                                   "userId": loginUser.loginCode,
    //                                   "bizUserName": "老李",
    //                                   "bizUserId": "1001"
    //                              };
    //                               //流程提交
    //                              YuXPUtil.wfInit(rsPars,afterCommitCallBack);
    ////                           } else {
    ////                               YuXP.showMsgBox('提示：', '项目信息未保存，不允许提交！', '500', '200', null);
    ////                               return;
    ////                           }
    ////                       }
    ////                   });
    //               }
    //         }

    //流程提交成功的回调方法
    afterCommitCallBack() {
      //刷新列表页面
      this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition");

      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
