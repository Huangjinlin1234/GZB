<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
  </div>
</template>
<script>
import d1Billcard from "./guarEvalOnlineEvalInfo_d1_BillCard.vue";
/**
 *  押品在线估值-业务参数配置列表
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
    this.$lookup.reg("STD_ZB_F_STY", "STD_ZB_PUBLIC_FACILITIES", "STD_ZB_DECORATION", "STD_ZB_STREET_SITUATION", "STD_ZB_CUR_TYP");
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
      this.initSingelPageEdiable();

      // 不显示暂存按钮
      this.getFactory().setButtonVisiable("tempSave", false);
      //不显示提交按钮
      this.getFactory().setButtonVisiable("commit", false);
      //查询押品数据
      this.d1_BillCard.queryFromByCondition(
        "refForm",
        this.d1_BillCard.getUrl,
        "get",
        {
          condition: {
            evalAppSerno: this.factoryContextData.evalAppSerno
          }
        },
        () => {}
      );
      const returnData = this.queryGuar(this.factoryContextData.guarNo);
      // 押品编号不为空
      if (returnData.guarNo != null && returnData.guarNo != "") {
        this.d1_BillCard.formdata.buildArea = returnData.buildArea; // 建筑面积
        this.d1_BillCard.formdata.fSty = returnData.fsty; //套型
        this.d1_BillCard.formdata.orientations = returnData.orientations; //朝向
        this.d1_BillCard.formdata.street = returnData.street; //街道/村镇/路名
        this.d1_BillCard.formdata.houseNo = returnData.houseNo; //门牌号/弄号
        this.d1_BillCard.formdata.buildingRoomNum = returnData.buildingRoomNum; //楼号
        this.d1_BillCard.formdata.roomNum = returnData.roomNum; //室号
        this.d1_BillCard.formdata.communityName = returnData.communityName; //楼盘（社区）名称
        this.d1_BillCard.formdata.bdlc = returnData.bdlc; //层次（标的楼层）
        this.d1_BillCard.formdata.bdgd = returnData.bdgd; //层数（标的楼高）
        this.d1_BillCard.formdata.streetSituation = returnData.streetSituation; //临街状况
        this.d1_BillCard.formdata.publicFacilities = returnData.publicFacilities; //公共配套
        this.d1_BillCard.formdata.decoration = returnData.decoration; //装修状况
        this.d1_BillCard.formdata.provinceCd = returnData.provinceCd; //省
        this.d1_BillCard.formdata.cityCd = returnData.cityCd; //市
        this.d1_BillCard.formdata.countyCd = returnData.countyCd; //区

        // 查询押品类型
        const returnTypeData = this.queryGuarType(returnData.guarNo);
        this.d1_BillCard.formdata.guarTypeCdCnname = returnTypeData.guarTypeCdCnname; // 押品类型名称
      }

      if (this.factoryContextData.op == "ADD") {
        // 卡片新增时为主键设置默认值
        let evalAppSerno = this.factoryContextData.evalAppSerno; //初估流水
        this.d1_BillCard.formdata.evalAppSerno = evalAppSerno; //流水
        this.d1_BillCard.formdata.guarNo = this.factoryContextData.guarNo; //押品编号
        this.d1_BillCard.formdata.evalWay = this.factoryContextData.evalWay; //评估方式
        this.d1_BillCard.formdata.inputIdName = this.factoryContextData.inputIdName; //登记人
        this.d1_BillCard.formdata.inputId = this.factoryContextData.inputId;
        this.d1_BillCard.formdata.inputDate = this.factoryContextData.inputDate;
        this.d1_BillCard.formdata.inputBrName = this.factoryContextData.inputBrName;
        this.d1_BillCard.formdata.inputBrId = this.factoryContextData.inputBrId;

        // 执行默认值公式
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else {
        if (this.factoryContextData.op == "EDIT") {
          // 编辑
        } else {
          // 查看
        }
      }
      // 暂存数据恢复
      if (tempData && tempData.formdata && Object.keys(tempData.formdata).length) {
        yufp.clone(tempData.formdata, _this.d1_BillCard.formdata);
      }
    },

    //查寻押品详细信息
    queryGuar(value) {
      const guarNo = value;
      let returnData = {};
      this.$request({
        async: false,
        method: "get",
        url: this.$backend.cmisGuar + "/api/guarinflivingroom/" + guarNo,
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
      return returnData;
    },

    queryGuarType(value) {
      const guarNo = value;
      let returnData = {};
      this.$request({
        async: false,
        method: "get",
        url: this.$backend.cmisGuar + "/api/guarclassinfo/queryGuarType/" + guarNo,
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
      return returnData;
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

      if (this.d1_BillCard.formdata.onlineEvalSerno) {
        // 更新
        const jsoUser = this.$xutils.getLoginUserInfo();
        this.d1_BillCard.formdata.updId = jsoUser["loginCode"];
        this.d1_BillCard.formdata.updBrId = jsoUser["orgCode"];
        this.d1_BillCard.formdata.updDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date());
        this.d1_BillCard.doSaveBillCardData("refForm", this.d1_BillCard.updateUrl, "保存成功");
      } else {
        // 新增
        let onlineEvalSerno = this.factoryContextData.evalAppSerno; //初估流水
        this.d1_BillCard.formdata.evalAppSerno = this.factoryContextData.evalAppSerno;
        this.d1_BillCard.formdata.onlineEvalSerno = onlineEvalSerno;
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
    initSingelPageEdiable() {
      if (this.factoryContextData.op && this.factoryContextData.op == "VIEW") {
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
