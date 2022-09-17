<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"><yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品使用情况" ctype="select" name="guarUtilCase" rules="required" data-code="STD_ZB_GUAR_UTIL_CASE" placeholder="押品使用情况"></yu-xform-item>
          <yu-xform-item label="房产类别" ctype="select" name="houseType" rules="required" data-code="STD_ZB_HOUSE_PROPERTY_CLS" placeholder="房产类别"></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="土地证（不动产权证号）" ctype="input" placeholder="土地证（不动产权证号）" name="landNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权性质 std_zb_l" ctype="input" placeholder="土地使用权性质 std_zb_l" name="landUseQual" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权取得方式 std_zb" ctype="input" placeholder="土地使用权取得方式 std_zb" name="landUseWay" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权使用年限起始日期" ctype="input" placeholder="土地使用权使用年限起始日期" name="landUseBeginDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权使用年限到期日期" ctype="input" placeholder="土地使用权使用年限到期日期" name="landUseEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地用途 std_zb_land" ctype="input" placeholder="土地用途 std_zb_land" name="landPurp" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权面积" ctype="input" placeholder="土地使用权面积" name="landUseArea" disabled hidden value="0"></yu-xform-item>
          <yu-xform-item label="所在/注册省份" placeholder="所在/注册省份" name="provinceCd" ctype="select" filterable :options="options" @change="changeSY" rules="required"></yu-xform-item>
          <yu-xform-item label="所在/注册市" placeholder="所在/注册市" name="cityCd" ctype="select" filterable :options="optionsCY" @change="changeCY" rules="required"></yu-xform-item>
          <yu-xform-item label="所在县（区）" placeholder="所在县（区）" name="countyCd" ctype="select" filterable :options="optionsQX" rules="required"></yu-xform-item>
          <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street"></yu-xform-item>
          <yu-xform-item label="所属地段" ctype="select" name="belongArea" rules="required" data-code="STD_ZB_BELG_PLACE" placeholder="所属地段" ></yu-xform-item>
          <yu-xform-item label="土地所在地段情况 " ctype="select" name="landPInfo" data-code="STD_ZB_FCDDQK" placeholder="土地所在地段情况 "></yu-xform-item>
          <yu-xform-item label="土地详细地址" ctype="input" placeholder="土地详细地址" name="landDetailadd" disabled hidden></yu-xform-item>
          <yu-xform-item label="闲置土地类型" ctype="select" name="landNotinuseType" data-code="STD_ZB_XZTDLX" placeholder="闲置土地类型"></yu-xform-item>
          <yu-xform-item label="宗地号" ctype="input" placeholder="宗地号" name="parcelNo"></yu-xform-item>
          <yu-xform-item label="土地说明" ctype="input" placeholder="土地说明" name="landExplain"></yu-xform-item>
          <yu-xform-item label="购买时间" ctype="input" placeholder="购买时间" name="purchaseDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="购买价格（元）" ctype="input" placeholder="购买价格（元）" name="purchaseAccnt" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否有地上定着物" ctype="select" name="landUp" data-code="STD_ZB_YES_NO" placeholder="是否有地上定着物"></yu-xform-item>
          <yu-xform-item label="地上建筑物项数" ctype="" name="landBuildAmount" placeholder="地上建筑物项数"></yu-xform-item>
          <yu-xform-item label="定着物种类" ctype="select" name="landUpType" data-code="STD_ZB_DZWZL" placeholder="定着物种类"></yu-xform-item>
          <yu-xform-item label="定着物所有权人名称" ctype="input" placeholder="定着物所有权人名称" name="landUpOwnershipName"></yu-xform-item>
          <yu-xform-item label="定着物所有权人范围" ctype="select" name="landUpOwnershipScope" data-code="STD_ZB_LAND_UP_SCOPE" placeholder="定着物所有权人范围"></yu-xform-item>
          <yu-xform-item label="地上定着物总面积" ctype="" name="landUpAllArea" placeholder="地上定着物总面积"></yu-xform-item>
          <yu-xform-item label="使用权抵押登记证号" ctype="input" placeholder="使用权抵押登记证号" name="useCertNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="使用权登记机关" ctype="input" placeholder="使用权登记机关" name="useCertDep" disabled hidden></yu-xform-item>
          <yu-xform-item label="产权年限" ctype="input" placeholder="产权年限" name="housePr" disabled hidden></yu-xform-item>
          <yu-xform-item label="建筑年份" ctype="input" placeholder="建筑年份" name="bornDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用类型 std_zb_pr" ctype="input" placeholder="土地使用类型 std_zb_pr" name="landUsedType" disabled hidden></yu-xform-item>
          <yu-xform-item label="转让金拖欠金额（元）" ctype="input" placeholder="转让金拖欠金额（元）" name="transfUnpaidAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="地上定着物说明" ctype="input" placeholder="地上定着物说明" name="landUpExplain"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型  " ctype="input" placeholder="操作类型  " name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageData: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/guarinfbuilduse/update',
      addUrl: this.$backend.cmisBiz + '/api/guarinfbuilduse/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      options: [],
      optionsCY: [],
      optionsQX: []
    };
  },
  mounted () {
    this.formType = this.pageData.op;
    this.serno = this.pageData.serno;
    this.afterInit();
    this.querySelectData();
  },
  methods: {
    afterInit () {
      var _this = this;
      if (_this.formType == 'ADD') {
        _this.execBillCardDefaultValueFormula();
        _this.formdata.serno = this.serno;
      } else {
        _this.queryData(this.serno);
      }
    },

    /** 加载数据 */
    queryData (serno) {
      const _this = this;
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/guarinfbuilduse/queryBySerno',
        async: false,
        method: 'post',
        data: {'serno': serno}
      }).then((response) => {
        if (response.code === 0) {
          yufp.clone(response.data.data, _this.formdata);
          if (_this.formdata.serno == '' || !_this.formdata.serno) {
            _this.formdata.serno = _this.serno;
          }
        }
      });
    },
    querySelectData (opt = 'sf', id = '100000') {
      var _this = this;
      let model = { optType: 'STD_ZB_AREA_CODE', id };
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisCfg + '/api/adminsmtreedic/selecttree',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            switch (opt) {
            case 'sf':
              _this.options = response.data;
              break;
            case 'cy':
              _this.optionsCY = response.data;
              break;
            case 'qx':
              _this.optionsQX = response.data;
              break;
            default:
            }
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    },
    changeSY (data) {
      this.querySelectData('cy', data);
    },
    changeCY (data) {
      this.querySelectData('qx', data);
    }
  }
};
</script>