<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="现房/期房标识 std_zb_p" ctype="input" placeholder="现房/期房标识 std_zb_p" name="readyOrPeriodHouse" disabled hidden></yu-xform-item>
          <yu-xform-item label="预购商品房预告登记证明号" ctype="input" placeholder="预购商品房预告登记证明号" name="purchseHouseNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="预购商品房抵押权预告登记证明号" ctype="input" placeholder="预购商品房抵押权预告登记证明号" name="purchseHouseRegNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="预售许可证编号" ctype="input" placeholder="预售许可证编号" name="presellPermitNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="预售许可证有效期" ctype="input" placeholder="预售许可证有效期" name="presellPermitValDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="预计房屋交付时间" ctype="input" placeholder="预计房屋交付时间" name="pGetDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="预计预抵押凭证取得时间" ctype="input" placeholder="预计预抵押凭证取得时间" name="pCreditGetDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="预计产权证办理时间" ctype="input" placeholder="预计产权证办理时间" name="pDoDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="预计他项权证取得时间" ctype="input" placeholder="预计他项权证取得时间" name="pOtherDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="一手/二手标识 " ctype="select" name="isUsed" rules="required" data-code="STD_ZB_IS_USED" placeholder="一手/二手标识 "></yu-xform-item>
          <yu-xform-item label="抵押住房是否权属人唯一住所 " ctype="select" name="houseOwnershipInd" rules="required" data-code="STD_ZB_YES_NO" placeholder="抵押住房是否权属人唯一住所 "></yu-xform-item>
          <yu-xform-item label="是否两证合一 std_zb_ye" ctype="input" placeholder="是否两证合一 std_zb_ye" name="twocard2oneInd" disabled hidden></yu-xform-item>
          <yu-xform-item label="产权证号" ctype="input" placeholder="产权证号" name="houseLandNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="销售许可证编号" ctype="input" placeholder="销售许可证编号" name="marketPermitNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="该产证是否全部抵押  std_z" ctype="input" placeholder="该产证是否全部抵押  std_z" name="houseAllPledgeInd" disabled hidden></yu-xform-item>
          <yu-xform-item label="部分抵押描述" ctype="input" placeholder="部分抵押描述" name="partRegPositionDesc" disabled hidden></yu-xform-item>
          <yu-xform-item label="房地产买卖合同编号" ctype="input" placeholder="房地产买卖合同编号" name="businessHouseNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同签订日期" ctype="input" placeholder="合同签订日期" name="purchaseDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="购买价格（元）" ctype="input" placeholder="购买价格（元）" name="purchaseAccnt" disabled hidden></yu-xform-item>
          <yu-xform-item label="销售备案  std_zb_yes" ctype="input" placeholder="销售备案  std_zb_yes" name="saleBak" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否本次申请所购房产  std_" ctype="input" placeholder="是否本次申请所购房产  std_" name="applyForHouse" disabled hidden></yu-xform-item>
          <yu-xform-item label="建筑面积" ctype="input" placeholder="建筑面积" name="buildArea" disabled hidden value="0"></yu-xform-item>
          <yu-xform-item label="建成年份" ctype="input" placeholder="建成年份" name="activateYears" disabled hidden></yu-xform-item>
          <yu-xform-item label="楼盘（社区）名称" ctype="input" placeholder="楼盘（社区）名称" name="communityName"></yu-xform-item>
          <yu-xform-item label="房产使用情况" ctype="select" name="houseProperty" rules="required" placeholder="房产使用情况" data-code="STD_ZB_GUAR_UTIL_CASE"></yu-xform-item>
          <yu-xform-item label="楼龄" ctype="input" placeholder="楼龄" name="floorAge" disabled hidden></yu-xform-item>
          <yu-xform-item label="所属地段" ctype="input" placeholder="所属地段" name="belongArea" data-code="STD_ZB_BELG_PLACE" hidden></yu-xform-item>
          <yu-xform-item label="周边环境 " ctype="select" name="arrEnv" data-code="STD_ZB_ZBHJ" placeholder="周边环境 "></yu-xform-item>
          <yu-xform-item label="套型" ctype="select" name="fSty" data-code="STD_ZB_FWTX" placeholder="套型"></yu-xform-item>
          <yu-xform-item label="房屋状态 " ctype="select" name="houseSta" data-code="STD_ZB_FWZT" placeholder="房屋状态 "></yu-xform-item>
          <yu-xform-item label="房屋结构 " ctype="select" name="houseStructure" rules="required" data-code="STD_ZB_HOUSE_STRUC" placeholder="房屋结构 "></yu-xform-item>
          <yu-xform-item label="地面构造 " ctype="select" name="groundStructure" data-code="STD_ZB_DMWDGZ" placeholder="地面构造 "></yu-xform-item>
          <yu-xform-item label="屋顶构造" ctype="select" name="roofStructure" data-code="STD_ZB_DMWDGZ" placeholder="屋顶构造"></yu-xform-item>
          <yu-xform-item label="所在/注册省份" ctype="input" placeholder="所在/注册省份" name="provinceCd" disabled hidden></yu-xform-item>
          <yu-xform-item label="所在/注册市" ctype="input" placeholder="所在/注册市" name="cityCd" disabled hidden></yu-xform-item>
          <yu-xform-item label="公共配套 " ctype="select" name="publicFacilities" rules="required" data-code="STD_ZB_GGPZ" placeholder="公共配套 "></yu-xform-item>
          <yu-xform-item label="所在县（区）" ctype="input" placeholder="所在县（区）" name="countyCd" disabled hidden></yu-xform-item>
          <yu-xform-item label="装修状况" ctype="select" name="decoration" rules="required" data-code="STD_ZB_ZXZK" placeholder="装修状况"></yu-xform-item>
          <yu-xform-item label="平面布局" ctype="input" placeholder="平面布局" name="planeLayout"></yu-xform-item>
          <yu-xform-item label="朝向" ctype="select" name="orientations" data-code="STD_ZB_FWCX" placeholder="朝向"></yu-xform-item>
          <yu-xform-item label="门牌号/弄号" ctype="input" placeholder="门牌号/弄号" name="houseNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="通风采光 " ctype="select" name="ventilationAndLighting" data-code="STD_ZB_TFCG" placeholder="通风采光 "></yu-xform-item>
          <yu-xform-item label="楼号" ctype="input" placeholder="楼号" name="buildingRoomNum" disabled hidden></yu-xform-item>
          <yu-xform-item label="临街状况 " ctype="select" name="streetSituation" data-code="STD_ZB_LJZK" placeholder="临街状况 "></yu-xform-item>
          <yu-xform-item label="室号" ctype="input" placeholder="室号" name="roomNum" disabled hidden></yu-xform-item>
          <yu-xform-item label="产权地址" ctype="input" placeholder="产权地址" name="pocAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="街道/村镇/路名" ctype="input" placeholder="街道/村镇/路名" name="street"></yu-xform-item>
          <yu-xform-item label="物业情况" ctype="select" name="propertyCase" rules="required"  data-code="STD_ZB_PROPERTY"  placeholder="请选择"></yu-xform-item>
          <yu-xform-item label="层次（标的楼层）" ctype="input" placeholder="层次（标的楼层）" name="bdlc" disabled hidden></yu-xform-item>
          <yu-xform-item label="层数（标的楼高）" ctype="input" placeholder="层数（标的楼高）" name="bdgd" disabled hidden></yu-xform-item>
          <yu-xform-item label="建筑物说明" ctype="input" placeholder="建筑物说明" name="buildDesc" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地证号" ctype="input" placeholder="土地证号" name="landNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权性质  std_zb_" ctype="input" placeholder="土地使用权性质  std_zb_" name="landUseQual" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权取得方式 std_zb" ctype="input" placeholder="土地使用权取得方式 std_zb" name="landUseWay" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权面积" ctype="input" placeholder="土地使用权面积" name="landUseArea" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权单位" ctype="input" placeholder="土地使用权单位" name="rightUseUnit" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权使用年限起始日期" ctype="input" placeholder="土地使用权使用年限起始日期" name="landUseBeginDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用权使用年限到期日期" ctype="input" placeholder="土地使用权使用年限到期日期" name="landUseEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地使用年限" ctype="input" placeholder="土地使用年限" name="landUseYears" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地用途 std_zb_land" ctype="input" placeholder="土地用途 std_zb_land" name="landPurp" disabled hidden></yu-xform-item>
          <yu-xform-item label="土地说明" ctype="input" placeholder="土地说明" name="landExplain" disabled hidden></yu-xform-item>
          <yu-xform-item label="竣工日期" ctype="input" placeholder="竣工日期" name="completeDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="楼层情况" ctype="input" placeholder="楼层情况" name="floor" disabled hidden></yu-xform-item>
          <yu-xform-item label="房屋用途 std_zb_hous" ctype="input" placeholder="房屋用途 std_zb_hous" name="houseUseType" disabled hidden></yu-xform-item>
          <yu-xform-item label="承租人名称" ctype="input" placeholder="承租人名称" name="lesseeName" disabled hidden></yu-xform-item>
          <yu-xform-item label="市场租金" ctype="input" placeholder="市场租金" name="marketRent" disabled hidden></yu-xform-item>
          <yu-xform-item label="租赁合同生效日" ctype="input" placeholder="租赁合同生效日" name="leaseConEftDt" disabled hidden></yu-xform-item>
          <yu-xform-item label="租赁合同到期日" ctype="input" placeholder="租赁合同到期日" name="leaseConEndDt" disabled hidden></yu-xform-item>
          <yu-xform-item label="年租金（元）" ctype="input" placeholder="年租金（元）" name="annualRent" disabled hidden></yu-xform-item>
          <yu-xform-item label="租期（月）" ctype="input" placeholder="租期（月）" name="lease" disabled hidden></yu-xform-item>
          <yu-xform-item label="剩余租期（月）" ctype="input" placeholder="剩余租期（月）" name="leftLease" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改次数" ctype="input" placeholder="修改次数" name="modifyNum" disabled hidden></yu-xform-item>
          <yu-xform-item label="房产取得方式 std_zb_es" ctype="input" placeholder="房产取得方式 std_zb_es" name="estateAcquireWay" disabled hidden></yu-xform-item>
          <yu-xform-item label="已使用年限" ctype="input" placeholder="已使用年限" name="inUseYear" disabled hidden></yu-xform-item>
          <yu-xform-item label="居住用房类型 std_zb_ho" ctype="input" placeholder="居住用房类型 std_zb_ho" name="houseType" disabled hidden></yu-xform-item>
          <yu-xform-item label="租赁形式 std_zb_leas" ctype="input" placeholder="租赁形式 std_zb_leas" name="leaseType" disabled hidden></yu-xform-item>
          <yu-xform-item label="开发商名称" ctype="input" placeholder="开发商名称" name="developerName" disabled hidden></yu-xform-item>
          <yu-xform-item label="预计不动产权证取得日期" ctype="input" placeholder="预计不动产权证取得日期" name="fetchCertiDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="发证日期" ctype="input" placeholder="发证日期" name="issueCertiDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="分摊面积" ctype="input" placeholder="分摊面积" name="apportArea" disabled hidden></yu-xform-item>
          <yu-xform-item label="房屋产权期限信息（年）" ctype="yu-num" name="housePrDesc" placeholder="房屋产权期限信息（年）" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="房地产所在地段情况  " ctype="select" name="housePlaceInfo" data-code="STD_ZB_FCDDQK" placeholder="房地产所在地段情况  "></yu-xform-item>
          <yu-xform-item label="是否有独立产权证 std_zb_" ctype="input" placeholder="是否有独立产权证 std_zb_" name="propertyPermitsInd" disabled hidden></yu-xform-item>
          <yu-xform-item label="车库/车位类型 std_zb_c" ctype="input" placeholder="车库/车位类型 std_zb_c" name="carportType" disabled hidden></yu-xform-item>
          <yu-xform-item label="车库具体位置" ctype="input" placeholder="车库具体位置" name="detailAdd" disabled hidden></yu-xform-item>
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
export default{
  name: 'D1illCard',
  mixins: [mixinForm],
  props: {
    pageData: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/guarinflivingroom/update',
      addUrl: this.$backend.cmisBiz + '/api/guarinflivingroom/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
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
    queryData (serno) {
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarinflivingroom/queryBySerno',
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