<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <d2-billcard ref="d2_BillCard"></d2-billcard>
  </div>
</template>
<script>
import d1Billcard from "./compareToMarket4House_d1_BillCard.vue";
import d2Billcard from "./compareToMarket4House_d2_BillCard.vue";
yufp.lookup.reg("STD_ZB_HOUSE_STRUCTURE,STD_ZB_STREET_SITUATION");

export default {
  components: { d1Billcard, d2Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      confirm: this.confirm,
      reset: this.reset,
      addPageHandle: this.addPageHandle
    };
  },
  data() {
    return {
      d1_BillCard: null,
      d2_BillCard: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d2_BillCard = this.$refs.d2_BillCard;
      this.$gon("compare_to_market_4_house_result_event", value => {
        this.d2_BillCard.formdata.evalResult = value;
      });
      if (this.pageParams && this.pageParams.isAdd) {
        this.d2_BillCard.ctl.addPageHandle = true;
        this.d1_BillCard.formdata.guarNo = this.pageParams.guarNo;
        this.d1_BillCard.queryFromByCondition("refForm", this.d1_BillCard.guarNoUrl, "get", {condition:{guarNo: this.pageParams.guarNo}})
      }
    },
    confirm() {
      let validatedResult = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(valid => {
        validatedResult = valid;
      });
      if (!validatedResult) {
        return;
      }

      let rsPars = {};
      //根据provinceCd 查询 provinceCdName
      let provinceCdName = "";
      let provinceCd = this.d1_BillCard.formdata.provinceCd;
      let provinceCds = provinceCd.split(",");
      let code1 = provinceCds[0];
      let code2 = provinceCds[1];
      let code3 = provinceCds[2];
      let string1 = this.proviceNameZh(code1, "PROVICE");
      let string2 = this.proviceNameZh(code2, "CITY");
      let string3 = this.proviceNameZh(code3, "OTHERS");
      provinceCdName = string1 + string2 + string3;
      rsPars["street"] = provinceCdName + this.d1_BillCard.formdata.street;
      rsPars["buildArea"] = this.d1_BillCard.formdata.buildArea;
      this.$dialog.open("", "evalmanage/evalTool/guarEvalHouseSampleIndex", -1, -1, rsPars);
    },
    reset() {
      this.d1_BillCard.$refs.refForm.resetFields();
    },
    // 新增页面进入的引入借据的操作
    addPageHandle(params) {
      // 通过第一条数据获取授信协议编号
      const valueAmt = this.d2_BillCard.formdata.evalResult; // 估值结果
      if (valueAmt == null || valueAmt == "") {
        // this.$alert("请先进行估值", "提示");
         this.$message.warning("请先进行估值");
        return;
      }

      this.$dialog.close(this.dialogId, {
        valueAmt: valueAmt
      });
    },
    //省市区中文转换
    proviceNameZh(TypeCd, falgSsq) {
      let lableName = "";
      let params = { optType: "STD_GB_AREA_ALL", enName: TypeCd };
      this.$request({
        async: false,
        url: this.$backend.cmisCfg + "/api/adminsmtreedic/queryDictByCode",
        method: "POST",
        data: JSON.stringify(params),
        success: (response, status, xhr) => {
          if (response.data != null) {
            if (falgSsq == "PROVICE") {
              lableName = response.data[0].label;
            } else if (falgSsq == "CITY") {
              lableName = response.data[0].label;
            } else {
              lableName = response.data[0].label;
            }
          }
        },
        error: (result, status, errorThrown) => {
          this.$message.error(result);
        }
      });
      return lableName;
    }
  }
};
</script>
