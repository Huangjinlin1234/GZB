<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./guarReevalApplyValue_d1_BillCard.vue";
/**
 *  押品价值重估认定价值-业务参数配置列表
 */

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
    this.$lookup.reg("STD_ZB_CUR_TYP,STD_ZB_EVAL_INOUT_TYPE,STD_ZB_APP_ST,STD_ZB_OPR_TYPE");
    this.AfterInit();
  },
  methods: {
    /***
     * 模板工厂暂存数据
     */
    saveStagFactoryData() {
      return {
        formdata: yufp.clone(this.$refs.d1_BillCard.formdata, {})
      };
    },
    AfterInit() {
      const _this = this;
      // 获取暂存数据
      let tempData = this.getStagFactoryData && this.getStagFactoryData();
      this.d1_BillCard = this.$refs.d1_BillCard;

      if (this.getFactory().contextData.serno) {
        this.d1_BillCard.queryFromByCondition(
          "refForm",
          this.d1_BillCard.getUrl,
          "get",
          {
            condition: {
              serno: this.getFactory().contextData.serno
            }
          },
          () => {
            // 暂存数据恢复
            if (tempData && tempData.formdata && Object.keys(tempData.formdata).length) {
              yufp.clone(tempData.formdata, _this.d1_BillCard.formdata);
            }
          }
        );
      }

      if (this.getFactory().contextData.op == "ADD") {
        // 卡片新增时为主键设置默认值
        this.d1_BillCard.formdata.guarNo = this.getFactory().contextData.guarNo;
        this.d1_BillCard.formdata.guarCusId = this.getFactory().contextData.guarCusId;
        this.d1_BillCard.formdata.guarCusName = this.getFactory().contextData.guarCusName;
        this.d1_BillCard.formdata.evalWay = this.getFactory().contextData.evalWay;
        this.d1_BillCard.formdata.inputIdName = this.getFactory().contextData.inputIdName;
        this.d1_BillCard.formdata.inputId = this.getFactory().contextData.inputId;
        this.d1_BillCard.formdata.inputDate = this.getFactory().contextData.inputDate;
        this.d1_BillCard.formdata.inputBrName = this.getFactory().contextData.inputBrName;
        this.d1_BillCard.formdata.inputBrId = this.getFactory().contextData.inputBrId;
        this.d1_BillCard.formdata.approveStatus = this.getFactory().contextData.approveStatus;
        this.d1_BillCard.formdata.evalAppSerno = this.getFactory().contextData.evalAppSerno;

        // 执行默认值公式
        this.d1_BillCard.execBillCardDefaultValueFormula();

        //不显示暂存按钮
        this.getFactory().setButtonVisiable("tempSave", false);

        // 设置本页编辑情况
        this.initSingelPageEdiable();
      } else {
        if (this.getFactory().contextData.op == "EDIT") {
          // 变价
        } else {
          // 查看
          this.d1_BillCard.setFormItemEditable("refForm", "*", false);
          this.d1_BillCard.ctl.viewOnly = true;
        }
      }
    },

    // 重新点击时重新加载页面
    showAction() {
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable("tempSave", false);
    },

    //保存信息
    save() {
      let validatedResult = false;
      this.d1_BillCard.$refs.refForm.validate(valid => {
        validatedResult = valid;
      });
      if (!validatedResult) {
        return;
      }

      const jsoUser = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.formdata.updId = jsoUser["loginCode"];
      this.d1_BillCard.formdata.updBrId = jsoUser["orgCode"];
      this.d1_BillCard.formdata.updDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date());
      this.d1_BillCard.formdata.serno = this.getFactory().contextData.serno;
      this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.updateUrl2, "保存成功", () => {});
    },

    //设置本页面的编辑情况
    initSingelPageEdiable() {
      if (this.getFactory().contextData.op && this.getFactory().contextData.op == "VIEW") {
        this.getFactory().setButtonVisiable("tempSave", false);
        this.getFactory().setButtonVisiable("commit", false);
        // this.getFactory().setButtonVisiable("back", false);
        this.d1_BillCard.setFormItemEditable("refForm", "*", false);
      }
    },

    //返回操作
    back() {
      //刷新父级页面数据
      this.$xutils.getParentPage(this, "d1_BillList", "queryData");
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
      this.$xutils.getParentPage(this, "d1_BillList", "queryData");
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
