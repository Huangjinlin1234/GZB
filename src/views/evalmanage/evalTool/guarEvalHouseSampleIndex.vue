<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
    <div style="text-align:center;">
      <yu-button type="primary" icon="arrow-left" @click="doLast()">上一步</yu-button>
      <yu-button type="primary" @click="doNext()">下一步<i class="el-icon-arrow-right el-icon--right"></i></yu-button>
    </div>
  </div>
</template>
<script>
import d1Billlist from "./guarEvalHouseSample_d1_BillList.vue";
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
      let rsPars = {};
      let selectRowData = {};
      rsPars["modelArea"] = this.pageParams.buildArea;
      rsPars["modelStreet"] = this.pageParams.street;
      selectRowData = this.d1_BillList.$refs.refTable.selections;

      if (Object.keys(selectRowData).length != 3) {
        // this.$alert("请选择三条比对样本", "提示");
        this.$message.warning(" 请选择三条比对样本");
        return;
      }
      let flag = "0";
      let flag1 = "1";
      let flag2 = "2";
      let falgSsq1 = "PROVICE";
      let falgSsq2 = "CITY";
      let falgSsq3 = "COUNTY";

      this.proviceNameZh2(selectRowData[0].provinceCd, flag, falgSsq1);
      this.proviceNameZh2(selectRowData[0].cityCd, flag, falgSsq2);
      this.proviceNameZh2(selectRowData[0].countyCd, flag, falgSsq3);
      rsPars["model1Addr"] = this.provinceCd_0 + this.cityCd_0 + this.countyCd_0 + selectRowData[0].street;

      this.proviceNameZh2(selectRowData[1].provinceCd, flag1, falgSsq1);
      this.proviceNameZh2(selectRowData[1].cityCd, flag1, falgSsq2);
      this.proviceNameZh2(selectRowData[1].countyCd, flag1, falgSsq3);
      rsPars["model2Addr"] = this.provinceCd_1 + this.cityCd_1 + this.countyCd_1 + selectRowData[1].street;

      this.proviceNameZh2(selectRowData[2].provinceCd, flag2, falgSsq1);
      this.proviceNameZh2(selectRowData[2].cityCd, flag2, falgSsq2);
      this.proviceNameZh2(selectRowData[2].countyCd, flag2, falgSsq3);
      rsPars["model3Addr"] = this.provinceCd_2 + this.cityCd_2 + this.countyCd_2 + selectRowData[2].street;

      rsPars["model1Area"] = selectRowData[0].buildArea;
      rsPars["model2Area"] = selectRowData[1].buildArea;
      rsPars["model3Area"] = selectRowData[2].buildArea;
      rsPars["model1Price"] = selectRowData[0].unitPrice;
      rsPars["model2Price"] = selectRowData[1].unitPrice;
      rsPars["model3Price"] = selectRowData[2].unitPrice;
      this.$dialog.open("", "evalmanage/evalTool/houseEvalModelResult", -1, -1, rsPars, params => {
        if (params.closeFlag && params.closeFlag == "closeTwo") {
          this.$dialog.close(this.dialogId);
        }
      });
    },
    //省市区中文转换
    proviceNameZh2(TypeCd, flag, falgSsq) {
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
