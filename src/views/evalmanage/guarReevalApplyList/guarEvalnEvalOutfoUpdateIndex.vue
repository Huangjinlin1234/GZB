<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
  </div>
</template>
<script>
import d1Billcard from "./guarEvalnEvalOutfoUpdate_d1_BillCard.vue";
/**
 *  押品外评估值-业务参数配置列表
 */

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
      factoryContextData: {}
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_APTI_LEVEL,STD_ZB_CUR_TYP,STD_ZB_YES_NO");
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
      //par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.factoryContextData = this.getFactory().contextData;

      // 设置本页编辑情况
      this.initSingelPageEdiable();
      //添加时可能切换标签故op == "ADD"时也需要查询
      if (this.factoryContextData.evalAppSerno) {
        this.d1_BillCard.queryFromByCondition(
          "refForm",
          this.d1_BillCard.getUrl,
          "get",
          {
            condition: {
              outEvalSerno: this.factoryContextData.evalAppSerno
            }
          },
          () => {
            // 暂存数据恢复
            if (tempData && tempData.formdata && Object.keys(tempData.formdata).length) {
              yufp.clone(tempData.formdata, _this.d1_BillCard.formdata);
            }
          }
        );
      } else if (this.getFactory().contextData.instanceInfo) {
        //当为流程进入时查询
        this.d1_BillCard.queryFromByCondition(
          "refForm",
          this.d1_BillCard.getUrl,
          "get",
          {
            condition: {
              outEvalSerno: this.getFactory().contextData.instanceInfo.bizId
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

      //不显示暂存按钮
      this.getFactory().setButtonVisiable("tempSave", false);
      //不显示提交按钮
      this.getFactory().setButtonVisiable("commit", false);
      if (this.factoryContextData.op == "ADD") {
        // 卡片新增时为主键设置默认值
        this.initFormData();
      } else {
        if (this.formdata) {
          if (this.factoryContextData.op != "EDIT") {
            // 查看
            this.d1_BillCard.setFormItemEditable("refForm", "*", false);
          }
        } else {
          this.initFormData();
        }
      }
    },

    initFormData() {
      this.d1_BillCard.formdata.evalAppSerno = this.factoryContextData.evalAppSerno;
      this.d1_BillCard.formdata.outEvalSerno = this.factoryContextData.evalAppSerno;
      this.d1_BillCard.formdata.evalWay = this.factoryContextData.evalWay;
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
         this.$message.warning("请检查页面要素是否录入完整!");
        return;
      }

      if (this.d1_BillCard.formdata.outEvalSerno != null && this.d1_BillCard.formdata.outEvalSerno != "") {
        //更新
        const jsoUser = this.$xutils.getLoginUserInfo();
        this.d1_BillCard.formdata.updId = jsoUser["loginCode"];
        this.d1_BillCard.formdata.updBrId = jsoUser["orgCode"];
        this.d1_BillCard.formdata.updDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date());
        this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.updateUrl, "保存成功");
      } else {
        //新增
        let outEvalSerno = this.factoryContextData.evalAppSerno; //初估流水
        this.d1_BillCard.formdata.outEvalSerno = outEvalSerno;
        this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.addUrl, "添加成功", () => {});
      }
    },

    //返回操作
    back() {
      //刷新父级页面数据
      this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition");
      this.$dialog.close(this.dialogId);
    },

    //设置本页面的编辑情况
    initSingelPageEdiable() {
      if ((this.factoryContextData.op && this.factoryContextData.op == "VIEW") || this.getFactory().contextData.instanceInfo) {
        this.getFactory().setButtonVisiable("tempSave", false);
        this.getFactory().setButtonVisiable("commit", false);
        // this.getFactory().setButtonVisiable("back", false);
        this.d1_BillCard.setFormItemEditable("refForm", "*", false);
      }
    },

    //流程提交成功的回调方法
    afterCommitCallBack() {
      //刷新列表页面
      this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition");
      this.$dialog.close(this.dialogId);
    },

    // 重新点击时重新加载页面
    showAction() {
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable("tempSave", false);
    }
  }
};
</script>
