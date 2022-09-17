<template>
  <div>
    <yu-panel title="经营状况检查(农林牧渔)" panel-type="simple">
      <yu-xform ref="refBaseForm" v-model="baseFormdata" :disabled="formType != 'edit' ? true : false" label-width="200px">
        <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
          <yu-xform-item label="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="任务编号" name="taskNo" hidden></yu-xform-item>
          <yu-xform-item label="是否受疫情影响" ctype="radio" name="isEpidemicImp" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否受疫情影响" @change="onChange"></yu-xform-item>
          <yu-xform-item label="说明" ctype="textarea" name="epidemicExpl" :rules="rulesValue"></yu-xform-item>
          <yu-xform-item label="是否受天灾影响" ctype="radio" name="isWeatherImp" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否受天灾影响" @change="doOnChange"></yu-xform-item>
          <yu-xform-item label="说明" ctype="textarea" name="weatherExpl" :rules="rulesValue1"></yu-xform-item>
          <yu-xform-item label="主要产品价格是否异常波动" ctype="radio" name="priceAbn" rules="required" data-code="STD_ZB_YES_NO" placeholder="主要产品价格是否异常波动" @change="doChange"></yu-xform-item>
          <yu-xform-item label="说明" ctype="textarea" name="priceAbnExpl" :rules="rulesValue2"></yu-xform-item>
        </yu-xform-group> 
        <yu-table ref="refTable" :data="tableData" :span-method="objectSpanMethod" :default-load="false" border style="width: 100%; margin-top: 20px">
          <yu-table-column prop="id" label="概述" ctype="input"></yu-table-column>
          <yu-xtable-column prop="prd" label="检查项目">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.prdname" v-model="scope.row.prd" ctype="input"/> 
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="price" label="产品价格">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.pricename" v-model="scope.row.price" ctype="input"/>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="scale" label="产品规模">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.scalename" v-model="scope.row.scale" ctype="input"/>
            </template>
          </yu-xtable-column>
        </yu-table>
        <yu-xform-group :column="1" style="margin-top: 10px">
            <yu-xform-item label="说明" name="taskExpl" ctype="textarea" label-width="60px" colspan="24" ></yu-xform-item>
        </yu-xform-group> 
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg("STD_ZB_YES_NO");

export default {

  props: {
      taskNo: String,
      formType: String
  },

  data: function() {
    return {
      tableData: [],
      baseFormdata: {},
      rulesValue: {required: false},
      rulesValue1: {required: false},
      rulesValue2: {required: false}
    
    };
  },

  methods: {
    objectSpanMethod: function (obj) {
      if (obj.columnIndex === 0) {
        if (obj.rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    /**
     * 选择
     */
    onChange: function (isEpidemicImp) {
      if (isEpidemicImp == '1'){
        this.rulesValue = {required: true, message: "必输项"}
      }else if (isEpidemicImp == '0'){
        this.rulesValue = {required: false}
      }
    },
    doOnChange: function(isWeatherImp){
      if (isWeatherImp == '1'){
        this.rulesValue1 = {required: true, message: "必输项"}
      }else if (isWeatherImp == '0'){
        this.rulesValue1 = {required: false}
      }
    },
    doChange: function(priceAbn){
      if (priceAbn == '1'){
        this.rulesValue2 = {required: true, message: "必输项"}
      }else if (priceAbn == '0'){
        this.rulesValue2 = {required: false}
      }
    },
    /**
     * 提交表单信息
     */

    validate: function () {
      var validate = false;
      this.$refs.refBaseForm.validate(function (valid) {
        validate = valid;
      });
      return validate
    },

    save: function() {

      return this.$request({
        url: this.$backend.cmisPsp + "/api/pspoperstatuscheckagriculture/update",
        method: 'post',
        data: this.baseFormdata,
      })

    },

  },
  /**
     * 页面初始化
     */
  created: function() {
    var _this = this;

    this.$request({
        url: _this.$backend.cmisPsp + "/api/pspoperstatuscheckagriculture/",
        method: 'get',
        data: {condition: {taskNo: _this.taskNo}},
    }).then((response) => {
      if (response.code == '0') {
        yufp.clone(response.data[0], _this.baseFormdata);

        var baseFormdata = _this.baseFormdata;
        _this.tableData = [{
          id: '上期主要产品',
          prd: baseFormdata.prePrdOne,
          price: baseFormdata.prePriceOne,
          scale: baseFormdata.preScaleOne,
          prdname: "prePrdOne",
          pricename: "prePriceOne",
          scalename: "preScaleOne"
        }, {
          id: '上期主要产品',
          prd: baseFormdata.prePrdTwo,
          price: baseFormdata.prePriceTwo,
          scale: baseFormdata.preScaleTwo,
          prdname: "prePrdTwo",
          pricename: "prePriceTwo",
          scalename: "preScaleTwo"
        }, {
          id: '上期主要产品',
          prd: baseFormdata.prePrdThree,
          price: baseFormdata.prePriceThree,
          scale: baseFormdata.preScaleThree,
          prdname: "prePrdThree",
          pricename: "prePriceThree",
          scalename: "preScaleThree"
        }, {
          id: '本期主要产品',
          prd: baseFormdata.curtPrdOne,
          price: baseFormdata.curtScaleOne,
          scale: baseFormdata.curtPriceOne,
          prdname: "curtPrdOne",
          pricename: "curtScaleOne",
          scalename: "curtPriceOne"
        }, {
          id: '本期主要产品',
          prd: baseFormdata.curtPrdTwo,
          price: baseFormdata.curtScaleTwo,
          scale: baseFormdata.curtPriceTwo,
          prdname: "curtPrdTwo",
          pricename: "curtScaleTwo",
          scalename: "curtPriceTwo"
        }, {
          id: '本期主要产品',
          prd: baseFormdata.curtPrdThree,
          price: baseFormdata.curtScaleThree,
          scale: baseFormdata.curtPriceThree,
          prdname: "curtPrdThree",
          pricename: "curtScaleThree",
          scalename: "curtPriceThree"
        },
        ]
      }
    }).catch(() => {
        _this.$message({
          message: "请求失败"
        })
    });
  },
}
</script>