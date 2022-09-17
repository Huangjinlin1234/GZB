<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo" hidden></yu-xform-item>
          <yu-xform-item label="在线评估流水号" ctype="input" placeholder="在线评估流水号" name="onlineEvalSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="evalAppSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保分类代码" ctype="input" placeholder="担保分类代码" name="guarTypeCd" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="input" placeholder="押品分类名称" name="guarTypeCdCnname" disabled></yu-xform-item>

          <!-- 
          <yu-xform-item label="所在/注册省份" ctype="select" name="provinceCd" disabled placeholder="所在/注册省份"></yu-xform-item>
          <yu-xform-item label="所在/注册市" ctype="select" name="cityCd" disabled placeholder="所在/注册市"></yu-xform-item>
          <yu-xform-item label="所在县（区）" ctype="select" name="countyCd" disabled placeholder="所在县（区）"></yu-xform-item>
          -->

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
                _this.formdata.cityCd = data.id;
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
                _this.formdata.countyCd = data.id;
              }
            "
            :mapping="{ id: 'arbitrateAddr' }"
            width="80%"
            height="550"
            :parms="{ optType: 'STD_GB_AREA_ALL' }"
            :selectionType="radio"
          ></yu-xform-item>

          <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street" disabled></yu-xform-item>
          <yu-xform-item label="门牌号/弄号" ctype="input" placeholder="门牌号/弄号" name="houseNo" disabled></yu-xform-item>
          <yu-xform-item label="盘（社区）名称" ctype="input" placeholder="盘（社区）名称" name="communityName" disabled></yu-xform-item>
          <yu-xform-item label="楼号" ctype="input" placeholder="楼号" name="buildingRoomNum" disabled></yu-xform-item>
          <yu-xform-item label="室号" ctype="input" placeholder="室号" name="roomNum" disabled></yu-xform-item>
          <yu-xform-item label="建筑面积" ctype="input" placeholder="建筑面积" name="buildArea" disabled></yu-xform-item>
          <yu-xform-item label="层次（标的楼层）" ctype="input" placeholder="层次（标的楼层）" name="bdlc" disabled></yu-xform-item>
          <yu-xform-item label="层数（标的楼高）" ctype="input" placeholder="层数（标的楼高）" name="bdgd" disabled></yu-xform-item>
          <yu-xform-item label="套型" ctype="select" name="fSty" disabled data-code="STD_ZB_F_STY" placeholder="套型"></yu-xform-item>
          <yu-xform-item label="朝向" ctype="input" placeholder="朝向" name="orientations" disabled></yu-xform-item>
          <yu-xform-item label="交通便捷" ctype="input" placeholder="交通便捷" name="traffic" disabled></yu-xform-item>
          <yu-xform-item label="公共配套" ctype="select" name="publicFacilities" disabled data-code="STD_ZB_PUBLIC_FACILITIES" placeholder="公共配套"></yu-xform-item>
          <yu-xform-item label="装修状况" ctype="select" name="decoration" disabled data-code="STD_ZB_DECORATION" placeholder="装修状况"></yu-xform-item>
          <yu-xform-item label="临街状况" ctype="select" name="streetSituation" disabled data-code="STD_ZB_STREET_SITUATION" placeholder="临街状况"></yu-xform-item>
          <yu-xform-item label="评估价值" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" placeholder="评估价值" name="evalOnlineValue" :min="0"></yu-xform-item>
          <yu-xform-item label="评估价值币种" ctype="select" name="evalOnlineCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="评估价值币种"></yu-xform-item>
          <yu-xform-item label="评估时间" ctype="datepicker" name="evalOnlineDate" value-format="yyyy-MM-dd" rules="required" placeholder="评估时间"></yu-xform-item>
          <yu-xform-item label="评估方法选择理由" ctype="input" placeholder="评估方法选择理由" name="evalModeResn" disabled hidden></yu-xform-item>
          <yu-xform-item label="评估类型" ctype="input" placeholder="评估类型" name="evalType" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  data: function() {
    return {
      getUrl: this.$backend.cmisEval + "/api/guarevalonlineevalinfo/",
      updateUrl: this.$backend.cmisEval + "/api/guarevalonlineevalinfo/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalonlineevalinfo/create",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  watch: {
    "formdata.isPreReport": function(newVal) {
      if (newVal == "Y") {
        this.setFormItemVisible("refForm", "preOutAmt", true);
        this.setFormItemVisible("refForm", "evalOutAmt", false);
      } else if (newVal == "N") {
        this.setFormItemVisible("refForm", "preOutAmt", false);
        this.setFormItemVisible("refForm", "evalOutAmt", true);
      }
    }
  },
  methods: {
    /***
     * 模板工厂暂存数据
     */
    saveStagFactoryData() {
      return {
        formdata: yufp.clone(this.formdata, {})
      };
    },
    execBillCardDefaultValueFormula: function() {
      this.formdata.traffic = "1";
      this.formdata.oprType = "01";
      this.formdata.inputId = this.$xutils.getLoginUserInfo().loginCode;
      this.formdata.inputBrId = this.$xutils.getLoginUserInfo().org.code;
      this.formdata.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
    }
  }
};
</script>
