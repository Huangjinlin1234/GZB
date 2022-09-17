<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" class="long-label">
        <yu-panel title="现场查勘法" panel-type="simple">
          <yu-xform-group :column="3">
            <!-- <yu-xform-item label="押品统一编号" ctype="yu-xcltrl-base1" name="guarNo" rules="required" placeholder="押品统一编号" @select-fn="commonSelectFn" :mapping="{ guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', guarCusId: 'guarCusId', guarCusName: 'guarCusName', guarTypeCd: 'guarTypeCd' }" width="80%" height="550"></yu-xform-item> -->

            <yu-xform-item label="押品统一编号" ctype="yu-common-pop" pop-type="guardAssessLivingRoom" label-width="200px" title="请选择押品" placeholder="押品统一编号" :pop-value="formdata.guarNo" @select-fn="guarSeleted" :data-url="guarNoUrl" rules="required" name="guarNo" :base-params="{ condition: {} }"></yu-xform-item>

            <yu-xform-item label="担保分类编号" ctype="input" placeholder="担保分类编号" name="collateralTypeCd" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="担保分类" ctype="input" placeholder="担保分类" name="collateralTypeName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="所在/注册省份" ctype="select" name="provinceName" rules="required" disabled placeholder="所在/注册省份"></yu-xform-item>
            <yu-xform-item label="所在/注册市" ctype="select" name="cityName" rules="required" disabled placeholder="所在/注册市"></yu-xform-item>
            <yu-xform-item label="所在县（区）" ctype="select" name="countyName" rules="required" disabled placeholder="所在县（区）"></yu-xform-item>
            <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="楼盘（社区）名称" ctype="input" placeholder="楼盘（社区）名称" name="communityName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="楼号" ctype="input" placeholder="楼号" name="buildingRoomNum" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="室号" ctype="input" placeholder="室号" name="roomNum" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="评估类型" ctype="select" name="evalType" data-code="STD_ZB_EVAL_TYPE" placeholder="评估类型"></yu-xform-item>
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
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_A_BillCard",
  mixins: [mixinForm],
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
      if (!items || !items.length) {
        // this.$alert("请选择一个押品", "提示");
        this.$message.warning("请选择一个押品");
        return;
      }
      if (items[0].mappingType == "assign") {
        return; //页面反显时不需要pop内部的查询
      }
      const data = items[0];
      this.formdata.collateralTypeCd = data.guarTypeCd;
      this.formdata.collateralTypeName = data.guarTypeCdCnname;
      this.formdata.provinceName = data.provinceCd;
      this.formdata.cityName = data.cityCd;
      this.formdata.countyName = data.countyCd;
      this.formdata.street = data.street;
      this.formdata.houseNo = data.houseNo;
      this.formdata.communityName = data.communityName;
      this.formdata.buildingRoomNum = data.buildingRoomNum;
      this.formdata.roomNum = data.roomNum;
      this.formdata.buildArea = data.buildArea;

      // this.$request({
      //   url: this.$backend.cmisEval + "/api/guarevalinevalindexmethod/" + data.guarNo,
      //   method: "GET"
      // }).then((response) => {
      //   if (response.code != "0") {
      //     this.$message.error("错误代码：" + response.code + ",错误信息：" + response.message);
      //     return;
      //   }
      //   if (response.data != null) {
      //     this.formdata.collateralTypeCd = response.data.guarTypeCd;
      //     this.formdata.collateralTypeName = response.data.guarTypeCdCnname;
      //     this.formdata.provinceName = response.data.provinceCd;
      //     this.formdata.cityName = response.data.cityCd;
      //     this.formdata.countyName = response.data.countyCd;
      //     this.formdata.street = response.data.street;
      //     this.formdata.houseNo = response.data.houseNo;
      //     this.formdata.communityName = response.data.communityName;
      //     this.formdata.buildingRoomNum = response.data.buildingRoomNum;
      //     this.formdata.buildArea = response.data.buildArea;
      //   }
      // });
    }
  }
};
</script>
