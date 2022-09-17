<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
  </div>
</template>
<script>
import d1Billcard from "./guarEvalnEvalnfoUpdate_d1_BillCard.vue";
yufp.lookup.reg("STD_ZB_EVAL_METHOD,STD_ZB_CUR_TYP");
/**
 *  押品内评估值-业务参数配置列表
 */
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      valuation: this.valuation
    };
  },
  data() {
    return {
      width: -1,
      height: 550,
      factoryContextData: {},
      d1_BillCard: null
    };
  },
  mounted() {
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
      this.factoryContextData = this.getFactory().contextData;

      // 设置本页编辑情况
      this.initSinglePageEditable();
      this.getFactory().setButtonVisiable("commit", false);
      //添加时可能切换标签故op == "ADD"时也需要查询
      if (this.factoryContextData.evalAppSerno) {
        this.d1_BillCard.queryFromByCondition(
          "refForm",
          this.d1_BillCard.getUrl,
          "get",
          {
            condition: {
              inEvalSerno: this.factoryContextData.evalAppSerno
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
      if (this.factoryContextData.op === "ADD") {
        // 卡片新增时为主键设置默认值
        this.initFormData();

        //不显示暂存按钮
        this.getFactory().setButtonVisiable("tempSave", false);
        this.d1_BillCard.formType = "add";
      } else {
        if (this.d1_BillCard.formdata.evalAppSerno) {
          if (this.factoryContextData.op === "EDIT") {
            // 修改
            this.d1_BillCard.formType = "edit";
          } else {
            //查看
            this.d1_BillCard.setFormItemEditable("refForm", "*", false);
            this.d1_BillCard.formType = "view";
          }
        } else {
          // 执行默认值公式
          this.initFormData();
        }
      }
    },

    initFormData() {
      // 卡片新增时为主键设置默认值
      let evalAppSerno = this.factoryContextData.evalAppSerno; //初估流水
      this.d1_BillCard.formdata.evalAppSerno = evalAppSerno;
      this.d1_BillCard.formdata.inputIdName = this.factoryContextData.inputIdName;
      this.d1_BillCard.formdata.inputId = this.factoryContextData.inputId;
      this.d1_BillCard.formdata.inputDate = this.factoryContextData.inputDate;
      this.d1_BillCard.formdata.inputBrName = this.factoryContextData.inputBrName;
      this.d1_BillCard.formdata.inputBrId = this.factoryContextData.inputBrId;

      // 执行默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
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

      if (this.$refs.d1_BillCard.formdata.inEvalSerno != null && this.$refs.d1_BillCard.formdata.inEvalSerno != "") {
        // 更新
        const jsoUser = this.$xutils.getLoginUserInfo();
        this.d1_BillCard.formdata.updId = jsoUser["loginCode"];
        this.d1_BillCard.formdata.updBrId = jsoUser["orgCode"];
        this.d1_BillCard.formdata.updDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date());
        this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.updateUrl, "保存成功");
      } else {
        // 新增
        let inEvalSerno = this.factoryContextData.evalAppSerno; //初估流水
        this.d1_BillCard.formdata.inEvalSerno = inEvalSerno;
        this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.addUrl, "添加成功", () => {});
      }
    },

    //返回操作
    back() {
      //刷新父级页面数据
      this.$xutils.getParentPage(this, "d1_BillList", "queryData");
      this.$dialog.close(this.dialogId);
    },

    //设置本页面的编辑情况
    initSinglePageEditable() {
      if (this.factoryContextData.op === "VIEW" || this.factoryContextData.flowParam) {
        this.getFactory().setButtonVisiable("tempSave", false);
        this.getFactory().setButtonVisiable("commit", false);
        // this.getFactory().setButtonVisiable("back", false);
        this.d1_BillCard.setFormItemEditable("refForm", "*", false);
      }
    },

    //估值方法
    valuation() {
      //获取估值方法
      const evalEnname = this.d1_BillCard.formdata.evalMode;
      if (evalEnname == null || evalEnname == "") {
        // this.$alert("请选择估值方法", "提示");
        this.$message.warning("请选择估值方法");
        return;
      }

      //调用估值方法
      if (evalEnname == "01") {
        //指数法
        this.$dialog.open(
          "指数法估值",
          "evalmanage/evalTool/guarEvalInEvalIndexmethodToolIndex",
          this.width,
          this.height,
          {
            isAdd: true,
            guarNo: this.getFactory().guarNo
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "02") {
        //市场比较法
        //适用于房产
        this.$dialog.open(
          "市场比较法",
          "evalmanage/evalTool/compareToMarket4HouseIndex",
          this.width,
          this.height,
          {
            isAdd: true,
            guarNo: this.getFactory().contextData.guarNo
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "03") {
        //基准地价系数修正法
        this.$dialog.open(
          "基准地价系数修正法",
          "evalmanage/evalTool/landPriceLandPriceToolIndex",
          this.width,
          this.height,
          {
            isAdd: true,
            guarNo: this.getFactory().contextData.guarNo
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "04") {
        //工程进度法
        this.$dialog.open(
          "工程进度法",
          "evalmanage/evalTool/projectProgressEvalToolIndex",
          this.width,
          this.height,
          {
            isAdd: true,
            guarNo: this.getFactory().contextData.guarNo
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "05") {
        //净资产调整法
        this.$dialog.open(
          "净资产调整法",
          "evalmanage/evalTool/assetsTrimEvalToolIndex",
          this.width,
          this.height,
          {
            isAdd: true,
            guarNo: this.getFactory().contextData.guarNo
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "06") {
        //市场价格法
        this.$dialog.open(
          "市场价格法",
          "evalmanage/evalTool/marketPriceMethodEvalToolForEstateTwoIndex",
          this.width,
          this.height,
          {
            isAdd: true,
            guarNo: this.getFactory().contextData.guarNo
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "07") {
        //账面价值法
        this.$dialog.open(
          "账面价值法",
          "evalmanage/evalTool/bookPriceMethodEvalToolIndex",
          this.width,
          this.height,
          {
            isAdd: true
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "08") {
        //直接询价法
        this.$dialog.open(
          "直接询价法",
          "evalmanage/evalTool/autoInquiryToolIndex",
          this.width,
          this.height,
          {
            isAdd: true
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "09") {
        //收益法
        this.$dialog.open(
          "收益法",
          "evalmanage/evalTool/incomeRuleEvalToolIndex",
          this.width,
          this.height,
          {
            isAdd: true
          },
          this.processEvalInValueCallback
        );
      } else if (evalEnname == "10") {
        //重置成本法
        this.$dialog.open(
          "重置成本法",
          "evalmanage/evalTool/resetCostRuleEvalToolIndex",
          this.width,
          this.height,
          {
            isAdd: true
          },
          this.processEvalInValueCallback
        );
      }
    },

    // 重新点击时重新加载页面
    showAction() {
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable("tempSave", false);
    },

    // 处理估值回调
    processEvalInValueCallback(data) {
      if (!data || data.valueAmt == null) {
        return;
      }
      this.d1_BillCard.formdata.evalInValue = data.valueAmt;
    },

    //流程提交成功的回调方法
    afterCommitCallBack() {
      //刷新列表页面
      this.$xutils.getParentPage(this, "d1_BillList", "queryData");
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
