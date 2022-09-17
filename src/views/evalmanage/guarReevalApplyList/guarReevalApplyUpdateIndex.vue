<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
  </div>
</template>
<script>
import d1Billcard from "./guarReevalApplyUpdate_d1_BillCard.vue";
import yufpNwfInit from "@/components/widgets/YufpNwfInit";
/**
 *  押品重估-业务参数配置列表
 */
export default {
  components: { d1Billcard, yufpNwfInit },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      viewGuar: this.viewGuar
    };
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_EVAL_INOUT_TYPE, STD_ZB_APP_ST, STD_ZB_OPR_TYPE");
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
      this.getFactory().setButtonVisiable("commit", true);
      //判断是否为流程进入页面
      if (this.getFactory().contextData.flowParam) {
        if (this.getFactory().contextData.instanceInfo) {
          if (this.getFactory().contextData.instanceInfo.bizId) {
            // 设置流程中不可编辑
            this.d1_BillCard.setFormItemEditable("refForm", "evalWay", false);
            this.getFactory().flowParamHandle(this.getFactory().contextData.flowParam);
            //将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.serno = this.getFactory().contextData.instanceInfo.bizId;

            //隐藏按钮
            this.getFactory().setButtonVisiable("save", false);
            this.getFactory().setButtonVisiable("commit", false);
            this.getFactory().setButtonVisiable("back", false);
          }
        }
      }
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
          // this.lmtEvalAppInfo();
          //虽然不清楚为什么要将evalAppSerno，但从列表进入详情时这么使用了，且模板工厂其他页签有用evalAppSerno做判断，此处也做统一，防止产生新bug
          this.d1_BillCard.formdata["evalAppSerno"] = this.d1_BillCard.formdata.serno;
        }
      );

      //不显示暂存按钮
      this.getFactory().setButtonVisiable("tempSave", false);

      // 设置本页编辑情况
      this.initSingelPageEdiable();

      if (this.getFactory().contextData.op == "ADD") {
        // 卡片新增时为主键设置默认值
        this.$xutils.clone(this.getFactory().contextData, this.d1_BillCard.formdata);

        // 执行默认值公式
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else {
        if (this.getFactory().contextData.op === "VIEW") {
          //查看
          this.d1_BillCard.setFormItemEditable("refForm", "*", false);
        }
      }
      // 暂存数据恢复
      if (tempData && tempData.formdata && Object.keys(tempData.formdata).length) {
        yufp.clone(tempData.formdata, _this.d1_BillCard.formdata);
      }
    },

    // 重新点击时重新加载页面
    showAction() {
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable("tempSave", false);
    },

    //查看押品详细信息
    viewGuar() {
      const guarNo = this.getFactory().contextData.guarNo;
      let returnData = {};
      this.$request({
        async: false,
        method: "get",
        url: this.$backend.cmisGuar + "/api/guarbaseinfo/" + guarNo,
        success: (response, status, xhr) => {
          if (response.code == "0") {
            returnData = response.data || {};
          } else {
            this.$message.error("错误代码：" + response.code + ",错误信息：" + response.message);
          }
        },
        error: (result, b) => {
          this.$message.error(result);
        }
      });

      if (returnData) {
        const params = returnData;
        if (params) {
          params["model_group_no"] = "GUARINFO_SHOW_MODEL_GROUP";
          params["op"] = "VIEW";
          this.$dialog.open("押品基本信息", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, params);
        }
      }
    },

    //申请信息初始化
    lmtEvalAppInfo() {
      if (this.getFactory().contextData.op === "EDIT") {
        const jsoUser = this.$store.state.oauth;
        this.d1_BillCard.formdata.updId = jsoUser.loginCode;
        this.d1_BillCard.formdata.updBrId = jsoUser.org.code;
        this.d1_BillCard.formdata.updDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date());
      }
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
      this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.updateUrl, "保存成功", () => {});
    },

    //设置本页面的编辑情况
    initSingelPageEdiable() {
      if (this.getFactory().contextData.op === "VIEW") {
        this.getFactory().setButtonVisiable("tempSave", false);
        this.getFactory().setButtonVisiable("commit", false);
        //this.getFactory().setButtonVisiable("back", false);
        this.d1_BillCard.setFormItemEditable("refForm", "*", false);
      }
    },

    //流程提交
    commit() {
      // 申请流水号
      const serno = this.getFactory().contextData.serno;

      //查询关联项目信息是否保存,,,,,,提交校验
      this.$request({
        method: "post",
        async: false,
        url: this.$backend.cmisEval + "/api/guarevalreevalapply/checkProjectDetails/" + serno,
        success: (response, status, xhr) => {
          if (response.data > 0) {
            const loginUser = this.$store.state.oauth;

            //设置流程提交参数
            const rsPars = {
              systemId: "cmis",
              orgId: loginUser.org.code,
              bizId: this.getFactory().contextData.serno,
              bizType: "WF_GUAR_REEVAl_APP",
              userId: loginUser.loginCode,
              bizUserName: this.getFactory().contextData.guarCusName,
              bizUserId: this.getFactory().contextData.guarCusId,
              param: this.d1_BillCard.formdata
            };

            //流程提交
            this.$refs.yufpNwfInit.wfInit(rsPars, this.afterCommitCallBack);
          } else {
            // this.$alert("项目信息未保存，不允许提交！", "提示");
            this.$message.warning("项目信息未保存，不允许提交！");
          }
        }
      });
    },

    //返回操作
    back() {
      //刷新父级页面数据
      this.$dialog.close(this.dialogId);
    },

    //流程提交成功的回调方法
    afterCommitCallBack() {
      //刷新列表页面
      this.getFactory().back();
    }
  }
};
</script>
