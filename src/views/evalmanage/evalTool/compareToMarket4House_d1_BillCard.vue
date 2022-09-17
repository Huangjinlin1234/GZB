<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType === 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="适用于房产的市场比较法" panel-type="simple">
          <yu-xform-group :column="3">
             <yu-xform-item label="押品统一编号" v-if="!ctl.addPageHandle" ctype="yu-xcltrl-base1" name="guarNo" rules="required" placeholder="押品统一编号" @select-fn="commonSelectFn" :mapping="{ guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', guarCusId: 'guarCusId', guarCusName: 'guarCusName', guarTypeCd: 'guarTypeCd' }" width="80%" height="550"></yu-xform-item>
            <yu-xform-item label="押品统一编号" v-else ctype="yu-common-pop" pop-type="guardAssessLivingRoom" title="请选择押品" placeholder="押品统一编号" label-width="200px" :pop-value="formdata.guarNo" @select-fn="guarSeleted" :data-url="guarNoUrl" rules="required" name="guarNo" :base-params="{ condition: {} }" disabled></yu-xform-item>

            <yu-xform-item label="担保三级分类名称" ctype="input" placeholder="担保三级分类名称" name="guarTypeCdCnname" rules="required" disabled></yu-xform-item>

            <yu-xform-item
              label="注册地行政区划"
              ctype="yu-xcity-cascader"
              name="provinceCd"
              disabled
              :colspan="16"
              placeholder="请选择地区"
              separator="->"
              style="width: 100%"
              @selectFn="
                val => {
                  let _this = this;
                  _this.formdata.provinceCd = val;
                }
              "
            ></yu-xform-item>
            <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street" disabled></yu-xform-item>
            <yu-xform-item label="楼盘（社区）名称" ctype="input" placeholder="楼盘（社区）名称" name="communityName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="楼号" ctype="input" placeholder="楼号" name="buildingRoomNum" disabled></yu-xform-item>
            <yu-xform-item label="室号" ctype="input" placeholder="室号" name="roomNum" disabled></yu-xform-item>
            <yu-xform-item label="层次（标的楼层）" ctype="input" placeholder="层次（标的楼层）" name="bdlc" disabled></yu-xform-item>
            <yu-xform-item label="层数（标的楼高）" ctype="input" placeholder="层数（标的楼高）" name="bdgd" disabled></yu-xform-item>
            <yu-xform-item label="建筑面积" ctype="input" placeholder="建筑面积" name="buildArea" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="房屋结构" ctype="select" name="houseStructure" disabled data-code="STD_ZB_HOUSE_STRUCTURE" placeholder="房屋结构"></yu-xform-item>
            <yu-xform-item label="公共配套" ctype="input" placeholder="公共配套" name="publicFacilities" disabled></yu-xform-item>
            <yu-xform-item label="楼层情况" ctype="input" placeholder="楼层情况" name="floor" disabled></yu-xform-item>
            <yu-xform-item label="装修状况" ctype="input" placeholder="装修状况" name="decoration" disabled></yu-xform-item>
            <yu-xform-item label="通风采光" ctype="input" placeholder="通风采光" name="ventilationAndLighting" disabled></yu-xform-item>
            <yu-xform-item label="临街状况" ctype="select" name="streetSituation" data-code="STD_ZB_STREET_SITUATION" placeholder="临街状况" disabled></yu-xform-item>
            <yu-xform-item label="产权地址" ctype="input" placeholder="产权地址" name="pocAddr" disabled></yu-xform-item>
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
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
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
      File: {},
      ctl: {
        addPageHandle: false
      },
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
      this.formdata.guarTypeCdCnname = data.guarTypeCdCnname;

      this.formdata.provinceCd = data.provinceCd;
      this.formdata.cityCd = data.cityCd;
      this.formdata.countyCd = data.countyCd;

      this.formdata.street = data.street;
      this.formdata.houseNo = data.houseNo;
      this.formdata.communityName = data.communityName;
      this.formdata.buildingRoomNum = data.buildingRoomNum;
      this.formdata.roomNum = data.roomNum;
      this.formdata.bdlc = data.bdlc;
      this.formdata.bdgd = data.bdgd;
      this.formdata.buildArea = data.buildArea;
      this.formdata.houseStructure = data.houseStructure;
      this.formdata.publicFacilities = data.publicFacilities;
      this.formdata.floor = data.floorCase;
      this.formdata.decoration = data.decoration;
      this.formdata.ventilationAndLighting = data.ventilationAndLighting;
      this.formdata.streetSituation = data.streetSituation;
      this.formdata.pocAddr = data.pocAddr;
    }
  }
};
</script>
