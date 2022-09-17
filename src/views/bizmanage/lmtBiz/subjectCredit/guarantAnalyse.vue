<template>
  <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable" :rules="formRules">
    <yu-panel title="担保人/增信人信息" panel-type="simple">
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button ref="btn_doAdd" type="primary" @click="guarant">担保人信息</yu-button>
        <yu-button ref="btn_doDelete" type="primary" @click="mainAnalyse">主体分析</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param_01" requestType="POST" style="width: 100%; height: 100%;">
        <yu-xtable-column label="客户编号" prop="grtCusId" width="250"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="grtCusName" width=""></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </yu-xform>
</template>
<script>
export default {
  props: {
    children: Object,
  },
  data() {
    return {
      dataUrl: backend.cmisBiz + "/api/lmtapprelguar/selectByModel",
      Param_01: {
        condition: JSON.stringify({
          oprType: "01",
          guarType: "30",
          serno: this.children.serno,
        }),
      },
      Param_02: {
        condition: JSON.stringify({
          oprType: "01",
          guarType: "02",
          serno: this.children.serno,
        }),
      },
      show_dialog: false,
      formdata: {},
      customer: 1,
    };
  },
  created() {
    this.op = this.children.op;
    console.log("this.serno==>", this.children);
  },
  methods: {
    guarant() {
      var _this = this;
      //获取选中的数据
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }
      let dialogData = {
        serno: jsoPar[0].serno,
        cusId: jsoPar[0].grtCusId,
        op: this.op,
      };
      let router;
      console.log("=======================>>>>", jsoPar[0])
      jsoPar[0].cusCatalog == 2 ? (router = "bussiness") : (router = "customer");
      _this.$dialog.open(
        "查看担保人详情",
        "bizmanage/lmtBiz/subjectCredit/bussinessInformation/" + router,
        -1,
        -1,
        dialogData,
        (retVal) => {
          console.log("return ===>", retVal);
        }
      );
    },
    mainAnalyse() {
      var _this = this;

      //获取选中的数据
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }
      let dialogData = {
        serno: jsoPar[0].serno,
        cusId: jsoPar[0].grtCusId,
        customer: jsoPar[0].cusCatalog, //2企业法人 3同业客户
        op: this.op,
      };

      _this.$dialog.open(
        "查看主体分析详情",
        "bizmanage/lmtBiz/subjectCredit/subjectAnalyse/bondInvest",
        -1,
        -1,
        dialogData,
        (retVal) => {
          console.log("return ===>", retVal);
        }
      );
    },
  },
};
</script>
