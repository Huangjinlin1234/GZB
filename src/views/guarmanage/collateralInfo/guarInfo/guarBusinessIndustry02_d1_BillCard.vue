<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled hidden ></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" rules="required" hidden ></yu-xform-item>
          <yu-xform-item label="一手/二手标识" ctype="select" name="isUsed" data-code="STD_ZB_IS_USED" placeholder="一手/二手标识" ></yu-xform-item>
          <yu-xform-item label="该产证是否全部抵押" ctype="select" name="houseAllPledgeInd" rules="required" data-code="STD_ZB_YES_NO" placeholder="该产证是否全部抵押"></yu-xform-item>
          <yu-xform-item label="房产使用情况" ctype="select" name="houseProperty" rules="required" placeholder="房产使用情况" data-code="STD_ZB_GUAR_UTIL_CASE"></yu-xform-item>
          <yu-xform-item label="工业房地产开发模式" ctype="select" name="industryDecelopModel" rules="required" data-code="STD_ZB_DECELOP_MODEL" placeholder="工业房地产开发模式"></yu-xform-item>
          <yu-xform-item label="是否两证合一 "
            ctype="select"
            name="twocard2oneInd"
            data-code="STD_ZB_YES_NO"
            placeholder="是否两证合一 "
          ></yu-xform-item>
          <yu-xform-item
            label="产权证号"
            ctype="input"
            placeholder="产权证号"
            name="houseLandNo"
          ></yu-xform-item>
          <yu-xform-item
            label="物业情况"
            ctype="select"
            name="propertyCase"
            rules="required"
            data-code="STD_ZB_PROPERTY"
            placeholder="物业情况"
          ></yu-xform-item>
          <yu-xform-item
            label="所属地理位置"
            ctype="select"
            name="belongArea"
            rules="required"
            data-code="STD_BELG_PLACE"
            placeholder="所属地理位置"
          ></yu-xform-item>
          <yu-xform-item
            label="房地产买卖合同编号"
            ctype="input"
            placeholder="房地产买卖合同编号"
            name="businessHouseNo"
          ></yu-xform-item>
          <yu-xform-item
            label="购买日期"
            ctype="datepicker"
            name="purchaseDate"
            value-format="yyyy-MM-dd"
            placeholder="购买日期"
          ></yu-xform-item>
          <yu-xform-item
            label="购买价格（元）"
            ctype="yu-num" number-formatter="0,000.00"
            placeholder="购买价格（元）"
            name="purchaseAccnt" maxlength="13"
          ></yu-xform-item>
          <yu-xform-item
            label="建筑面积"
            ctype="num"
            placeholder="建筑面积" max="9999999999999.99" min="0.00" :precision="2"
            name="buildArea"
            value="0"
          ></yu-xform-item>
          <yu-xform-item
            label="竣工日期"
            ctype="datepicker"
            name="endDate"
            value-format="yyyy-MM-dd"
            placeholder="竣工日期"
          ></yu-xform-item>
          <yu-xform-item
            label="建成年份"
            ctype="input"
            placeholder="建成年份"
            name="activateYears"
          ></yu-xform-item>
          <yu-xform-item
            label="楼龄"
            ctype="input"
            placeholder="楼龄"
            name="floorAge"
          ></yu-xform-item>
          <yu-xform-item
            label="所在/注册省份"
            ctype="input"
            placeholder="所在/注册省份"
            name="provinceCd"
          ></yu-xform-item>
          <yu-xform-item
            label="所在/注册市"
            ctype="input"
            placeholder="所在/注册市"
            name="cityCd"
          ></yu-xform-item>
          <yu-xform-item
            label="所在县（区）"
            ctype="input"
            placeholder="所在县（区）"
            name="countyCd"
          ></yu-xform-item>
          <yu-xform-item
            label="街道/村镇/路名"
            ctype="input"
            placeholder="街道/村镇/路名"
            name="street"
          ></yu-xform-item>
          <yu-xform-item
            label="门牌号/弄号"
            ctype="input"
            placeholder="门牌号/弄号"
            name="houseNo"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="产权地址"
            ctype="input"
            placeholder="产权地址"
            name="pocAddr"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="层次（标的楼层）"
            ctype="input"
            placeholder="层次（标的楼层）"
            name="bdlc"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="层数（标的楼高）"
            ctype="input"
            placeholder="层数（标的楼高）"
            name="bdgd"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="房地产所在地段情况 std_zb"
            ctype="input"
            placeholder="房地产所在地段情况 std_zb"
            name="housePlaceInfo"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地证号"
            ctype="input"
            placeholder="土地证号"
            name="landNo"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地使用权性质 std_zb_l"
            ctype="input"
            placeholder="土地使用权性质 std_zb_l"
            name="landUseQual"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地使用权取得方式 std_zb"
            ctype="input"
            placeholder="土地使用权取得方式 std_zb"
            name="landUseWay"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地使用权使用年限起始日期"
            ctype="input"
            placeholder="土地使用权使用年限起始日期"
            name="landUseBeginDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地使用权使用年限到期日期"
            ctype="input"
            placeholder="土地使用权使用年限到期日期"
            name="landUseEndDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地使用年限"
            ctype="input"
            placeholder="土地使用年限"
            name="landUseYears"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地用途 std_zb_land"
            ctype="input"
            placeholder="土地用途 std_zb_land"
            name="landPurp"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地说明"
            ctype="input"
            placeholder="土地说明"
            name="landExplain"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地使用权面积"
            ctype="input"
            placeholder="土地使用权面积"
            name="landUseArea"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="土地使用权单位"
            ctype="input"
            placeholder="土地使用权单位"
            name="landUseUnit"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="房屋用途 std_zb_hous"
            ctype="input"
            placeholder="房屋用途 std_zb_hous"
            name="houseUseType"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="承租人名称"
            ctype="input"
            placeholder="承租人名称"
            name="lesseeName"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="年租金（元）"
            ctype="input"
            placeholder="年租金（元）"
            name="annualRent"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="租期（月）"
            ctype="input"
            placeholder="租期（月）"
            name="lease"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="剩余租期（月）"
            ctype="input"
            placeholder="剩余租期（月）"
            name="leftLease"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="修改次数"
            ctype="input"
            placeholder="修改次数"
            name="modifyNum"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="房产取得方式 std_zb_es"
            ctype="input"
            placeholder="房产取得方式 std_zb_es"
            name="estateAcquireWay"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="已使用年限"
            ctype="input"
            placeholder="已使用年限"
            name="inUseYear"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="物业类型 std_zb_prop"
            ctype="input"
            placeholder="物业类型 std_zb_prop"
            name="houseType"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="发证日期"
            ctype="input"
            placeholder="发证日期"
            name="issueCertiDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="工业园区等级"
            ctype="input"
            placeholder="工业园区等级"
            name="industryZoneLevel"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="盈利模式 std_zb_prof"
            ctype="input"
            placeholder="盈利模式 std_zb_prof"
            name="profitModel"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="基础设施情况描述"
            ctype="input"
            placeholder="基础设施情况描述"
            name="bascFaciDesc"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="是否满足该行业厂房设计标准 st"
            ctype="input"
            placeholder="是否满足该行业厂房设计标准 st"
            name="isIndustryDesignPlant"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="部分抵押描述"
            ctype="input"
            placeholder="部分抵押描述"
            name="partRegPositionDesc"
          ></yu-xform-item>
          <yu-xform-item
            label="楼号"
            ctype="input"
            placeholder="楼号"
            name="buildingRoomNum"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="室号"
            ctype="input"
            placeholder="室号"
            name="roomNum"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="房屋结构 std_zb_hous"
            ctype="input"
            placeholder="房屋结构 std_zb_hous"
            name="houseStructure"
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="市场租金"
            ctype="input"
            placeholder="市场租金"
            name="marketRent"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="租赁合同生效日"
            ctype="input"
            placeholder="租赁合同生效日"
            name="leaseConEftDt"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="租赁合同到期日"
            ctype="input"
            placeholder="租赁合同到期日"
            name="leaseConEndDt"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="租赁形式 std_zb_leas"
            ctype="input"
            placeholder="租赁形式 std_zb_leas"
            name="leaseType"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="楼盘名称"
            ctype="input"
            placeholder="楼盘名称"
            name="communityName"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="商业繁华程度 std_zb_bu"
            ctype="input"
            placeholder="商业繁华程度 std_zb_bu"
            name="bustlingLevel"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="交通便捷程度 std_zb_tr"
            ctype="input"
            placeholder="交通便捷程度 std_zb_tr"
            name="trafficConvenientLevel"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="外界环境 std_zb_envi"
            ctype="input"
            placeholder="外界环境 std_zb_envi"
            name="environment"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="空置率"
            ctype="input"
            placeholder="空置率"
            name="vacancyRate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="临街情况 std_zb_stre"
            ctype="input"
            placeholder="临街情况 std_zb_stre"
            name="streetSituation"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="是否位于城市地带 std_zb_"
            ctype="input"
            placeholder="是否位于城市地带 std_zb_"
            name="isUrbanZone"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="建筑外观与公共装修 std_zb"
            ctype="input"
            placeholder="建筑外观与公共装修 std_zb"
            name="buildPubFit"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="物业管理资质等级 std_zb_"
            ctype="input"
            placeholder="物业管理资质等级 std_zb_"
            name="realtyManaNaturLevel"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记人"
            ctype="input"
            placeholder="登记人"
            name="inputId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记机构"
            ctype="input"
            placeholder="登记机构"
            name="inputBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记日期"
            ctype="input"
            placeholder="登记日期"
            name="inputDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改人"
            ctype="input"
            placeholder="最后修改人"
            name="updId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改机构"
            ctype="input"
            placeholder="最后修改机构"
            name="updBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="最后修改日期"
            ctype="input"
            placeholder="最后修改日期"
            name="updDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="操作类型  "
            ctype="input"
            placeholder="操作类型  "
            name="oprType"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="责任人"
            ctype="input"
            placeholder="责任人"
            name="managerId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="责任机构"
            ctype="input"
            placeholder="责任机构"
            name="managerBrId"
            disabled
            hidden
          ></yu-xform-item>
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
      updateUrl: this.$backend.cmisBiz + '/api/guarinfbusinessindustryhousr/update',
      addUrl: this.$backend.cmisBiz + '/api/guarinfbusinessindustryhousr/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      disabledflg: false
    };
  },
  mounted () {
    this.formType = this.pageData.op;
    this.serno = this.pageData.serno;
    this.afterInit();
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
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarinfbusinessindustryhousr/queryBySerno',
        async: false,
        method: 'post',
        data: {'serno': serno}
      }).then((response) => {
        if (response.code === 0) {
          yufp.clone(response.data, this.formdata);
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
    }
  }
};
</script>