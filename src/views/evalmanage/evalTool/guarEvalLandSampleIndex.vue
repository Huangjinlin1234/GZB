<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
    <div style="text-align:center;">
      <yu-button type="primary" icon="arrow-left" @click="doLast()">上一页</yu-button>
      <yu-button type="primary" @click="doNext()">下一页<i class="el-icon-arrow-right el-icon--right"></i></yu-button>
    </div>
  </div>
</template>
<script>
import d1Billlist from "./guarEvalLandSample_d1_BillList.vue";
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
      provinceCd_0: null,
      cityCd_0: null,
      countyCd_0: null,
      provinceCd_1: null,
      cityCd_1: null,
      countyCd_1: null,
      provinceCd_2: null,
      cityCd_2: null,
      countyCd_2: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    doLast() {
      this.$dialog.close(this.dialogId);
    },

    doNext() {
      let selectRowData = {};
      selectRowData = this.d1_BillList.$refs.refTable.selections;

      if (Object.keys(selectRowData).length != 3) {
        // this.$alert("请选择三条比对样本", "提示");
        this.$message.warning(" 请选择三条比对样本");
        return;
      }
      let rsPars = {};
      let flag = "0";
      let flag1 = "1";
      let flag2 = "2";
      let falgSsq1 = "PROVICE";
      let falgSsq2 = "CITY";
      let falgSsq3 = "COUNTY";

      rsPars["modelStreet"] = this.pageParams.street;
      rsPars["modelLandUseArea"] = this.pageParams.landUseArea;
      rsPars["modelBeginDate"] = this.pageParams.landUseBeginDate;
      rsPars["modelEndDate"] = this.pageParams.landUseEndDate;

      this.proviceNameZh(selectRowData[0].provinceCd, flag, falgSsq1);
      this.proviceNameZh(selectRowData[0].cityCd, flag, falgSsq2);
      this.proviceNameZh(selectRowData[0].countyCd, flag, falgSsq3);
      rsPars["model1Addr"] = this.provinceCd_0 + this.cityCd_0 + this.countyCd_0 + selectRowData[0].detailAddress;
      //rsPars["model1Addr"] = selectRowData[0].provinceCd + selectRowData[0].cityCd + selectRowData[0].countyCd + selectRowData[0].detailAddress;

      this.proviceNameZh(selectRowData[1].provinceCd, flag1, falgSsq1);
      this.proviceNameZh(selectRowData[1].cityCd, flag1, falgSsq2);
      this.proviceNameZh(selectRowData[1].countyCd, flag1, falgSsq3);
      rsPars["model2Addr"] = this.provinceCd_1 + this.cityCd_1 + this.countyCd_1 + selectRowData[1].detailAddress;
      //rsPars["model2Addr"] = selectRowData[1].provinceCd + selectRowData[1].cityCd + selectRowData[1].countyCd + selectRowData[1].detailAddress;

      this.proviceNameZh(selectRowData[2].provinceCd, flag2, falgSsq1);
      this.proviceNameZh(selectRowData[2].cityCd, flag2, falgSsq2);
      this.proviceNameZh(selectRowData[2].countyCd, flag2, falgSsq3);
      rsPars["model3Addr"] = this.provinceCd_2 + this.cityCd_2 + this.countyCd_2 + selectRowData[2].detailAddress;
      //rsPars["model3Addr"] = selectRowData[2].provinceCd + selectRowData[2].cityCd + selectRowData[2].countyCd + selectRowData[2].detailAddress;

      rsPars["model1Area"] = selectRowData[0].useArea;
      rsPars["model2Area"] = selectRowData[1].useArea;
      rsPars["model3Area"] = selectRowData[2].useArea;
      rsPars["model1Price"] = selectRowData[0].unitPrice;
      rsPars["model2Price"] = selectRowData[1].unitPrice;
      rsPars["model3Price"] = selectRowData[2].unitPrice;
      rsPars["model1EvalDate"] = selectRowData[0].evalDate;
      rsPars["model2EvalDate"] = selectRowData[1].evalDate;
      rsPars["model3EvalDate"] = selectRowData[2].evalDate;
      rsPars["model1ActivateEnddate"] = selectRowData[0].activateEnddate;
      rsPars["model2ActivateEnddate"] = selectRowData[1].activateEnddate;
      rsPars["model3ActivateEnddate"] = selectRowData[2].activateEnddate;
      this.$dialog.open("", "evalmanage/evalTool/landEvalModelResultIndex", -1, -1, rsPars);
    },
    //省市区中文转换
    proviceNameZh(TypeCd, flag, falgSsq) {
      let params = { optType: "STD_GB_AREA_ALL", enName: TypeCd };
      this.$request({
        async: false,
        url: this.$backend.cmisCfg + "/api/adminsmtreedic/queryDictByCode",
        method: "POST",
        data: JSON.stringify(params),
        success: (response, status, xhr) => {
          if (response.data != null) {
            if (flag == "0") {
              if (falgSsq == "PROVICE") {
                this.provinceCd_0 = response.data[0].label;
              } else if (falgSsq == "CITY") {
                this.cityCd_0 = response.data[0].label;
              } else {
                this.countyCd_0 = response.data[0].label;
              }
            } else if (flag == "1") {
              if (falgSsq == "PROVICE") {
                this.provinceCd_1 = response.data[0].label;
              } else if (falgSsq == "CITY") {
                this.cityCd_1 = response.data[0].label;
              } else {
                this.countyCd_1 = response.data[0].label;
              }
            } else {
              if (falgSsq == "PROVICE") {
                this.provinceCd_2 = response.data[0].label;
              } else if (falgSsq == "CITY") {
                this.cityCd_2 = response.data[0].label;
              } else {
                this.countyCd_2 = response.data[0].label;
              }
            }
          }
        },
        error: (result, status, errorThrown) => {
          this.$message.error(result);
        }
      });
    }
  }
};
</script>
