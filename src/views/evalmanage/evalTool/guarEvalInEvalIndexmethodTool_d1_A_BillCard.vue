<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="指数法估值工具" panel-type="simple">
          <yu-xform-group :column="3">
            <!-- <yu-xform-item label="押品统一编号" ctype="yu-xcltrl-base1" name="guarNo" rules="required" placeholder="押品统一编号" @select-fn="commonSelectFn" :mapping="{ guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', guarCusId: 'guarCusId', guarCusName: 'guarCusName', guarTypeCd: 'guarTypeCd' }" width="80%" height="550"></yu-xform-item> -->
            <yu-xform-item label="押品统一编号" ctype="yu-common-pop" pop-type="guardAssessLivingRoom" title="请选择押品" label-width="200px" placeholder="押品统一编号" :pop-value="formdata.guarNo" @select-fn="guarSeleted" :data-url="guarNoUrl" rules="required" name="guarNo" :base-params="{ condition: {} }"></yu-xform-item>

            <yu-xform-item label="担保分类代码" ctype="input" placeholder="担保分类代码" name="guarTypeCd" disabled></yu-xform-item>
            <yu-xform-item label="担保分类名称" ctype="input" placeholder="担保分类名称" name="guarTypeName" disabled></yu-xform-item>
            <yu-xform-item label="所在/注册省份" ctype="select" name="provinceCd" disabled placeholder="所在/注册省份"></yu-xform-item>
            <yu-xform-item label="所在/注册市" ctype="select" name="cityCd" disabled placeholder="所在/注册市"></yu-xform-item>
            <yu-xform-item label="所在县（区）" ctype="select" name="countyCd" disabled placeholder="所在县（区）"></yu-xform-item>
            <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street" disabled></yu-xform-item>
            <yu-xform-item label="楼盘（社区）名称" ctype="input" placeholder="楼盘（社区）名称" name="communityName" disabled></yu-xform-item>
            <yu-xform-item label="楼号室号" ctype="input" placeholder="楼号室号" name="buildingRoomNum" disabled></yu-xform-item>
            <yu-xform-item label="建筑面积(㎡)" ctype="input" placeholder="建筑面积(㎡)" name="buildArea" disabled></yu-xform-item>
            <yu-xform-item label="初估认定日期" ctype="datepicker" name="evalOutDate" placeholder="初估认定日期" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="初估认定价值" ctype="input" name="evalOutAmt" placeholder="初估认定价值" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="当前评估日期" ctype="datepicker" name="nowEvaluatDate" placeholder="当前评估日期" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="当前外部价格指数值（元）" ctype="yu-num" name="nowEvaluatIndexValue" placeholder="当前外部价格指数值（元）" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="比较期外部价格指数值（元）" ctype="yu-num" name="compareEvaluatIndexValue" placeholder="比较期外部价格指数值（元）" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="房屋物理折损率" ctype="yu-num" name="housingRate" placeholder="房屋物理折损率" rules="required" sign="%" :multiple="100"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="confirm">估值</yu-button>
      <yu-button type="primary" @click="reset">重置</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixiUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_A_BillCard",
  mixins: [mixiUtils],
  inject: ["confirm", "reset"],
  data: function() {
    return {
      updateUrl: this.$backend.appOcaService + "/api/update",
      addUrl: this.$backend.appOcaService + "/api/",
      guarNoUrl: this.$backend.cmisGuar + "/api/guarinflivingroom/selectForGuardAssess",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    guarSeleted(items) {
      let _this = this;
      if (!items || !items.length) {
        // this.$alert("请选择一个押品", "提示");
        _this.$message.warning("请选择一个押品");
        return;
      }
      if (items[0].mappingType == "assign") {
        return; //页面反显时不需要pop内部的查询
      }
      const data = items[0];
      this.formdata.guarTypeName = data.guarTypeCdCnname;
      this.$request({
        url: this.$backend.cmisGuar + "/api/guarinflivingroom/selectIndexInfo/" + data.guarNo,
        method: "POST"
      }).then(response => {
        if (response.code != "0") {
          _this.$message.error(response.message);
          return;
        }
        if (response.data.evalCount == 0) {
          // _this.$alert("押品未进行外部价值评估，不适用指数法估值", "提示");
          _this.$message.warning("押品未进行外部价值评估，不适用指数法估值");
          return;
        }
        _this.$xutils.clone(response.data, _this.formdata);
        _this.formdata.evalOutDate = response.data.evalIdentyDate;
        _this.formdata.evalOutAmt = response.data.evalValue;
        _this.formdata.nowEvaluatDate = _this.$xutils.dateFormat("yyyy-MM-dd", new Date());
      });
    }
  }
};
</script>
