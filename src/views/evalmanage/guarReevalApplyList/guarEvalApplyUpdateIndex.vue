<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
  </div>
</template>
<script>
import d1Billcard from "./guarEvalApplyUpdate_d1_BillCard.vue";
import yufpNwfInit from "@/components/widgets/YufpNwfInit";
/**
 *  押品初估-业务参数配置列表
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
    console.log(this.getFactory().contextData);
    this.$lookup.reg("STD_ZB_EVAL_INOUT_TYPE,STD_ZB_APP_ST");
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
      // 显示提交按钮
      this.getFactory().setButtonVisiable("commit", true);
      // 判断是否为流程进入页面
      if (this.getFactory().contextData.instanceInfo) {
        // wfFlag = true;
        // this.getFactory().contextData["wfFlag"] = wfFlag;

        if (this.getFactory().contextData.instanceInfo.bizId) {
          // 设置流程中不可编辑
          this.d1_BillCard.setFormItemEditable("refForm", "evalWay", false);
          // 将流程的关联业务主键设置到业务流水号中
          this.getFactory().contextData.evalAppSerno = this.getFactory().contextData.instanceInfo.bizId;
          // 隐藏按钮
          this.getFactory().setButtonVisiable("save", false);

          this.getFactory().setButtonVisiable("commit", false);
          this.getFactory().setButtonVisiable("back", false);

          this.initBillCard4Flow();
        }
      }
      // 卡片新增时为主键设置默认值
      this.d1_BillCard.formdata.evalAppSerno = this.getFactory().contextData.evalAppSerno;
      this.d1_BillCard.formdata.guarNo = this.getFactory().contextData.guarNo;
      this.d1_BillCard.formdata.guarCusId = this.getFactory().contextData.guarCusId;
      this.d1_BillCard.formdata.guarCusName = this.getFactory().contextData.guarCusName;
      this.d1_BillCard.formdata.evalWay = this.getFactory().contextData.evalWay;
      this.d1_BillCard.formdata.inputIdName = this.getFactory().contextData.inputName;
      this.d1_BillCard.formdata.inputId = this.getFactory().contextData.inputId;
      this.d1_BillCard.formdata.inputDate = this.getFactory().contextData.inputDate;
      this.d1_BillCard.formdata.inputBrName = this.getFactory().contextData.inputBrName;
      this.d1_BillCard.formdata.inputBrId = this.getFactory().contextData.inputBrId;
      this.d1_BillCard.formdata.approveStatus = this.getFactory().contextData.approveStatus;

      // 执行默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();

      // 不显示暂存按钮
      this.getFactory().setButtonVisiable("tempSave", false);
      // 设置本页编辑情况
      this.initSingelPageEdiable();

      this.getFactory().triggerAction(this.d1_BillCard.formdata);
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

    //针对流程进入的页面，需要查询数据并进行初始化操作
    initBillCard4Flow() {
      const _this = this;
      _this.d1_BillCard.queryFromByCondition(
        "refForm",
        _this.d1_BillCard.getUrl,
        "post",
        {
          condition: JSON.stringify({
            evalAppSerno: _this.getFactory().contextData.evalAppSerno
          })
        },
        data => {
          // 申请信息初始化
          _this.lmtEvalAppInfo(data);
        }
      );
    },

    // 查看押品详细信息
    viewGuar() {
      this.$request({
        async: true,
        method: "get",
        url: this.$backend.cmisGuar + "/api/guarbaseinfo/" + this.d1_BillCard.formdata.guarNo
      }).then(response => {
        if (response.code != "0") {
          this.$message.error("错误代码：" + response.code + ",错误信息：" + response.message);
          return;
        }
        const params = response.data;
        if (params) {
          params["model_group_no"] = "GUARINFO_SHOW_MODEL_GROUP";
          params["op"] = "VIEW";
          this.$dialog.open("押品基本信息", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, params);
        }
      });
    },

    // 申请信息初始化
    lmtEvalAppInfo(data) {
      const _this = this;
      _this.getFactory().triggerAction({
        evalWay: _this.d1_BillCard.formdata.evalWay,
        guarNo: data.guarNo
      });

      if (_this.getFactory().contextData.op == "EDIT") {
        const jsoUser = _this.$xutils.getLoginUserInfo();
        _this.d1_BillCard.formdata.updId = jsoUser["loginCode"];
        _this.d1_BillCard.formdata.updBrId = jsoUser["orgCode"];
        _this.d1_BillCard.formdata.updDate = _this.$xutils.dateFormat("yyyy-MM-dd", new Date());
      }
    },

    // 保存信息
    save() {
      let validatedResult = false;
      this.d1_BillCard.$refs.refForm.validate(valid => {
        validatedResult = valid;
      });
      if (!validatedResult) {
        this.$message.warning("请检查页面要素是否录入完整!");
        return;
      }
      this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.updateUrl, "保存成功", () => {});
    },

    // 设置本页面的编辑情况
    initSingelPageEdiable() {
      if (this.getFactory().contextData.op == null || this.getFactory().contextData.op == "") {
        return;
      }
      if (this.getFactory().contextData.op == "VIEW") {
        this.getFactory().setButtonVisiable("tempSave", false);
        this.getFactory().setButtonVisiable("commit", false);
        // this.getFactory().setButtonVisiable("back", false);
        this.d1_BillCard.setFormItemEditable("refForm", "*", false);
      }
    },

    // 流程提交成功的回调方法
    afterCommitCallBack() {
      // 刷新列表页面
      const _this = this;
      _this.$xutils.getParentPage(this, "d1_BillList", "queryData");
      _this.getFactory().back();
    },

    // 流程提交
    commit() {
      // 申请流水号
      const _this = this;
      const evalAppSerno = _this.getFactory().contextData.evalAppSerno;
      // 查询关联内评外评信息是否保存
      _this.$request({
        async: false,
        method: "post",
        url: _this.$backend.cmisEval + "/api/guarevalapp/checkProjectDetails/" + evalAppSerno,
        success: (response, status, xhr) => {
          if (response.data > 0) {
            const loginUser = _this.$xutils.getLoginUserInfo();
            // 设置流程提交参数
            const rsPars = {
              systemId: "cmis",
              orgId: loginUser.orgCode,
              bizId: evalAppSerno,
              bizType: "WF_GUAR_EVAl_APP",
              userId: loginUser.loginCode,
              bizUserName: _this.getFactory().contextData.guarCusName,
              bizUserId: _this.getFactory().contextData.guarCusId,
              callback: _this.afterCommitCallBack // 定义流程提交的回调方法
            };
            // 流程提交
            _this.$refs.yufpNwfInit.wfInit(rsPars);
          } else {
            _this.$message.error("存在项目信息未保存，不允许提交");
          }
        }
      });
    }
  }
};
</script>
