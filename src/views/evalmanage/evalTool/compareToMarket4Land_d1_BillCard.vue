<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" class="long-label">
        <yu-panel title="适用于土地的市场比较法" panel-type="simple">
          <yu-xform-group :column="3">
            <!-- <yu-xform-item label="押品统一编号" ctype="yu-xcltrl-base1" name="guarNo" rules="required" placeholder="押品统一编号" @select-fn="commonSelectFn" :mapping="{ guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', guarCusId: 'guarCusId', guarCusName: 'guarCusName', guarTypeCd: 'guarTypeCd' }" width="80%" height="550"></yu-xform-item> -->
            <yu-xform-item label="押品统一编号" ctype="yu-common-pop" pop-type="guardAssessBuilduse" title="请选择押品" label-width="200px" placeholder="押品统一编号" :pop-value="formdata.guarNo" @select-fn="guarSeleted" :data-url="guarNoUrl" rules="required" name="guarNo" :base-params="{ condition: {} }"></yu-xform-item>

            <yu-xform-item label="押品分类名称" ctype="input" placeholder="押品分类名称" name="guarTypeCdCnname" disabled></yu-xform-item>
            <yu-xform-item label="押品分类代码" ctype="input" placeholder="押品分类代码" name="guarTypeCd" disabled></yu-xform-item>
            <yu-xform-item label="土地证（不动产权证号）" ctype="input" placeholder="土地证（不动产权证号）" name="landNo" disabled></yu-xform-item>
            <yu-xform-item label="土地使用权性质" ctype="select" name="landUseCha" disabled data-code="STD_ZB_LAND_USE_QUAL" placeholder="土地使用权性质"></yu-xform-item>
            <yu-xform-item label="土地使用权取得方式" ctype="select" name="landUseWay" disabled data-code="STD_ZB_LAND_USE_WAY" placeholder="土地使用权取得方式"></yu-xform-item>
            <yu-xform-item label="使用权抵押登记证号" ctype="input" placeholder="使用权抵押登记证号" name="usePldRegNo" disabled></yu-xform-item>
            <yu-xform-item label="使用权登记机关" ctype="input" placeholder="使用权登记机关" name="useRegDep" disabled></yu-xform-item>
            <yu-xform-item label="土地使用权使用年限起始日期" ctype="datepicker" name="landUseBeginDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="土地使用权使用年限起始日期"></yu-xform-item>
            <yu-xform-item label="土地使用权使用年限到期日期" ctype="datepicker" name="landUseEndDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="土地使用权使用年限到期日期"></yu-xform-item>
            <yu-xform-item label="土地用途" ctype="select" name="landPurp" rules="required" disabled data-code="STD_ZB_LAND_PURP" placeholder="土地用途"></yu-xform-item>
            <yu-xform-item label="土地使用权面积" ctype="yu-num" name="landUseArea" rules="required" disabled placeholder="土地使用权面积" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="闲置土地类型" ctype="select" name="landNotinuseType" disabled data-code="STD_ZB_LAND_NOTINUSE_TYPE" placeholder="闲置土地类型"></yu-xform-item>
            <yu-xform-item label="土地说明" ctype="input" placeholder="土地说明" name="landDesc" disabled></yu-xform-item>

            <yu-xform-item
              label="所在/注册省份"
              ctype="yu-xaddr"
              name="provinceCd"
              rules="required"
              placeholder="所在/注册省份"
              disabled
              @select-fn="
                data => {
                  let _this = this;
                  //_this.formdata.provinceCd = data.id;
                  _this.formdata.provinceCdName = data.label;
                }
              "
              :mapping="{ id: 'arbitrateAddr' }"
              width="80%"
              height="550"
              :parms="{ optType: 'STD_GB_AREA_ALL' }"
              :selectionType="radio"
            ></yu-xform-item>

            <yu-xform-item
              label="所在/注册市"
              ctype="yu-xaddr"
              name="cityCd"
              rules="required"
              placeholder="所在/注册市"
              disabled
              @select-fn="
                data => {
                  let _this = this;
                  //_this.formdata.cityCd = data.id;
                  _this.formdata.cityCdName = data.label;
                }
              "
              :mapping="{ id: 'arbitrateAddr' }"
              width="80%"
              height="550"
              :parms="{ optType: 'STD_GB_AREA_ALL' }"
              :selectionType="radio"
            ></yu-xform-item>

            <yu-xform-item
              label="所在县（区）"
              ctype="yu-xaddr"
              name="countyCd"
              rules="required"
              placeholder="所在县（区）"
              disabled
              @select-fn="
                data => {
                  let _this = this;
                  //_this.formdata.countyCd = data.id;
                  _this.formdata.countyCdName = data.label;
                }
              "
              :mapping="{ id: 'arbitrateAddr' }"
              width="80%"
              height="550"
              :parms="{ optType: 'STD_GB_AREA_ALL' }"
              :selectionType="radio"
            ></yu-xform-item>

            <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street" disabled></yu-xform-item>
            <yu-xform-item label="土地详细地址" ctype="input" placeholder="土地详细地址" name="landDetailadd" disabled></yu-xform-item>
            <yu-xform-item label="宗地号" ctype="input" placeholder="宗地号" name="parcelNo" disabled></yu-xform-item>
            <yu-xform-item label="土地所在地段情况" ctype="select" name="landPlaceCase" disabled data-code="STD_ZB_LAND_LOCATE_AREA" placeholder="土地所在地段情况"></yu-xform-item>
            <yu-xform-item label="购买日期" ctype="datepicker" name="purchaseDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="购买日期"></yu-xform-item>
            <yu-xform-item label="购买价格" ctype="yu-num" name="purchaseAccnt" disabled placeholder="购买价格" :min="0"></yu-xform-item>
            <!--<yu-xform-item label="币种" ctype="select" name="evalCurrency" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>-->
            <yu-xform-item label="是否有地上定着物" ctype="select" name="landUp" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否有地上定着物"></yu-xform-item>
            <yu-xform-item label="定着物种类" ctype="select" name="landUpType" rules="required" disabled data-code="STD_ZB_LAND_UP_TYPE" placeholder="定着物种类"></yu-xform-item>
            <yu-xform-item label="地上建筑物项数" ctype="yu-num" name="landBuildAmount" disabled placeholder="地上建筑物项数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="定着物所有权人名称" ctype="input" placeholder="定着物所有权人名称" name="landUpOwnershipName" disabled></yu-xform-item>
            <yu-xform-item label="地上定着物说明" ctype="input" placeholder="地上定着物说明" name="landUpDesc" disabled></yu-xform-item>
            <yu-xform-item label="地上定着物总面积" ctype="input" placeholder="地上定着物总面积" name="landUpAllArea" disabled></yu-xform-item>
            <yu-xform-item label="建成年份" ctype="input" placeholder="建成年份" name="bornDate" disabled></yu-xform-item>
            <yu-xform-item label="房产年限" ctype="input" placeholder="房产年限" name="housePr" disabled></yu-xform-item>
            <yu-xform-item label="定着物所有权人范围" ctype="checkbox" name="landUpOwnershipScope" disabled data-code="STD_ZB_LAND_UP_SCOPE" placeholder="定着物所有权人范围" :colspan="24"></yu-xform-item>
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
  name: "d1_BillCard",
  mixins: [mixinForm],
  inject: ["confirm", "reset"],
  data: function() {
    return {
      updateUrl: this.$backend.appOcaService + "/api/update",
      addUrl: this.$backend.appOcaService + "/api/",
      guarNoUrl: this.$backend.cmisGuar + "/api/guarinfbuilduse/selectForGuardAssess",
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
      this.formdata.guarTypeCdCnname = data.guarTypeCdCnname;
      this.formdata.guarTypeCd = data.guarTypeCd;
      this.$request({
        url: this.$backend.cmisGuar + "/api/guarinfbuilduse/" + data.guarNo
      }).then(response => {
        if (response.code != "0") {
          this.$message.error("错误代码：" + response.code + ",错误信息：" + response.message);
          return;
        }
        if (response.data != null) {
          this.formdata.landNo = response.data.landNo;
          this.formdata.landUseCha = response.data.landUseCha;
          this.formdata.landUseWay = response.data.landUseWay;
          this.formdata.usePldRegNo = response.data.usePldRegNo;
          this.formdata.useRegDep = response.data.useRegDep;
          this.formdata.landUseBeginDate = response.data.landUseBeginDate;
          this.formdata.landUseEndDate = response.data.landUseEndDate;
          this.formdata.landPurp = response.data.landPurp;
          this.formdata.landUseArea = response.data.landUseArea;
          this.formdata.landNotinuseType = response.data.landNotinuseType;
          this.formdata.landDesc = response.data.landDesc;

          this.formdata.provinceCd = response.data.provinceCd;
          this.formdata.cityCd = response.data.cityCd;
          this.formdata.countyCd = response.data.countyCd;

          this.formdata.street = response.data.street;
          this.formdata.landDetailadd = response.data.landDetailadd;
          this.formdata.parcelNo = response.data.parcelNo;
          this.formdata.landPlaceCase = response.data.landPlaceCase;
          this.formdata.purchaseDate = response.data.purchaseDate;
          this.formdata.purchaseAccnt = response.data.purchaseAccnt;

          // this.formdata.evalCurrency = response.data.parcelNo;
          this.formdata.landUp = response.data.landUp;
          this.formdata.landUpType = response.data.landUpType;
          this.formdata.landBuildAmount = response.data.landBuildAmount;
          this.formdata.landUpOwnershipName = response.data.landUpOwnershipName;
          this.formdata.landUpDesc = response.data.landUpDesc;
          this.formdata.landUpAllArea = response.data.landUpAllArea;
          this.formdata.bornDate = response.data.bornDate;
          this.formdata.housePr = response.data.housePr;
          this.formdata.landUpOwnershipScope = response.data.landUpOwnershipScope.split(";");
        }
      });
    }
  }
};
</script>
