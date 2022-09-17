<template>
  <!--
    @created by lixm 2021-06-04
    @description 引入原利率定价信息
  -->
  <div>
    <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      <yu-panel title="关联原利率定价" panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" @click="getFn">引入</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" selection-type="radio" :data-url="dataUrl" :default-load="false">
          <yu-xtable-column label="额度分项编号" prop="subAccNo"></yu-xtable-column>
          <yu-xtable-column label="贷款品种" prop="loanType"></yu-xtable-column>
          <yu-xtable-column label="贷款期限" prop="loanTerm"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarType"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="preferResn"></yu-xtable-column>
          <yu-xtable-column label="执行利率" prop="execRateYear"></yu-xtable-column>
          <yu-xtable-column label="定价方式" prop="priceMode" data-code="STD_PRICE_MODE"></yu-xtable-column>
          <yu-xtable-column label="保证人名称" prop="guarntrNo"></yu-xtable-column>
          <yu-xtable-column label="对外担保总额" prop="outguarTotalAmt"></yu-xtable-column>
          <yu-xtable-column label="其中为本行担保额" prop="orgGuarAmt"></yu-xtable-column>
          <yu-xtable-column label="分项流水号" prop="subSerno" hidden></yu-xtable-column>
        </yu-xtable>
        <yu-xform-item label="分项流水号" placeholder="分项流水号" name="thisSubSerno" ctype="input" hidden></yu-xform-item>
        <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" hidden></yu-xform-item>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>
<script>
import { clone, lookup, dateFormat } from "@/utils";
yufp.lookup.reg("STD_ZB_CUS_TYP,STD_ZB_CERT_TYP");
export default {
  props: {
    pageParams: Object,
    operate: String,
    dialogId: String,
  },
  data: function () {
    return {
      dataUrl:
        this.$backend.cmisBiz +
        "/api/othercnyrateappfindetails/selectEffectiveList/",
      formDisabled: false,
    };
  },
  mounted() {
    this.searchFormdata.cusId = this.$route.meta.params.cusId;
    this.searchFormdata.thisSubSerno = this.pageParams.thisSubSerno;
    this.$refs.refTable.remoteData({
      condition: {
        cusId: this.pageParams.cusId,
        subSerno: this.pageParams.thisSubSerno,
      },
    });
  },
  methods: {
    /** 引入 */
    getFn() {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: "请至少选择一条记录",
          type: "warning",
        });
        return;
      }
      selections[0].pkId = "LS" + new Date().getTime();
      selections[0].ogrinSubSerno = selections[0].subSerno;
      selections[0].subSerno = this.pageParams.thisSubSerno
      _this
        .$request({
          method: "POST",
          url: backend.cmisBiz + "/api/othercnyrateloanreloldrate/",
          data: selections[0],
          // {condition: JSON.stringify(selections[0])},
        })
        .then((data) => {
          if (data.code == "0") {
            _this.cancelFn()
          } else {
            _this.$message({ message: "请求失败", type: "error" });
          }
        });
    },
    // 返回新增融资担保信息页面
    cancelFn() {
      this.$dialog.close(this.dialogId);
    },
  },
};
</script>