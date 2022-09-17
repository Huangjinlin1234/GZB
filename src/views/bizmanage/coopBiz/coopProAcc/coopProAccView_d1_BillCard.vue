<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="合作方信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="合作方案编号" ctype="yu-xcustom-ref" name="coopPlanNo" disabled placeholder="合作方案编号"></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="项目信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="proNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="项目类型" ctype="select" name="proType" rules="required" disabled data-code="STD_COOP_PRO_TYPE" placeholder="项目类型"></yu-xform-item>
            <yu-xform-item label="项目额度(元)" ctype="yu-num" number-formatter="0,000.00" name="proLmt" rules="required" disabled placeholder="项目额度(元)"></yu-xform-item>
            <yu-xform-item label="项目状态" ctype="select" name="proStatus" rules="required" disabled data-code="STD_COOP_PRO_STATUS" placeholder="项目状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="楼盘项目信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="是否通过销售公司销售" ctype="select" name="isSaleCprtSale" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否通过销售公司销售"></yu-xform-item>
            <yu-xform-item label="销售公司名称" ctype="input" placeholder="销售公司名称" name="saleCprtName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="销售公司电话" ctype="input" placeholder="销售公司电话" name="saleCprtPhone" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="负责人名称" ctype="input" placeholder="负责人名称" name="chiefName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" disabled data-code="IDENT_TYPE" placeholder="证件类型"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="项目总投资(元)" ctype="yu-num" number-formatter="0,000.00" placeholder="项目总投资(元)" name="proTotalInvest" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="项目权利人名称" ctype="input" placeholder="项目权利人名称" name="proWrrPersonName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="项目总销售收入(元)" ctype="yu-num" number-formatter="0,000.00" placeholder="项目总销售收入(元)" name="proTotalSaleIncome" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="其他部分销售总价(元)" ctype="yu-num" number-formatter="0,000.00" placeholder="其他部分销售总价(元)" name="otherPartSaleTotal" disabled></yu-xform-item>
            <yu-xform-item label="项目开工时间" ctype="input" placeholder="项目开工时间" name="proStartDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="项目竣工时间" ctype="input" placeholder="项目竣工时间" name="proEndDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="交付日期" ctype="input" placeholder="交付日期" name="deliverDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="input" placeholder="合作方类型" name="partnerType" hidden></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerId" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="楼盘详情信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="项目地址位置a" ctype="input" placeholder="项目地址位置a" name="proAddrPlaceA" rules="required" disabled :colspan="20"></yu-xform-item>
            <yu-xform-item label="项目地址位置b" ctype="input" placeholder="项目地址位置b" name="proAddrPlaceB" disabled></yu-xform-item>
            <yu-xform-item label="项目地址位置c" ctype="input" placeholder="项目地址位置c" name="proAddrPlaceC" disabled></yu-xform-item>
            <yu-xform-item label="项目具体位置" ctype="input" placeholder="项目具体位置" name="proDetailPlace" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="占地面积(㎡）" ctype="num" placeholder="占地面积(㎡）" name="occupSqu" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="总建筑面积(㎡）" ctype="num" placeholder="总建筑面积(㎡）" name="totalArchSqu" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="住宅建筑面积(㎡）" ctype="num" placeholder="住宅建筑面积(㎡）" name="resiArchSqu" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="商业建筑面积(㎡）" ctype="num" placeholder="商业建筑面积(㎡）" name="commArchSqu" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="工业建筑面积(㎡）" ctype="num" placeholder="工业建筑面积(㎡）" name="indtArchSqu" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="其他建筑面积(㎡）" ctype="num" placeholder="其他建筑面积(㎡）" name="otherArchSqu" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="住宅销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" placeholder="住宅销售均价(元/㎡)" name="resiSaleAvgPrice" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="商业销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" placeholder="商业销售均价(元/㎡)" name="commSaleAvgPrice" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="工业销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" placeholder="工业销售均价(元/㎡)" name="indtSaleAvgPrice" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="其他销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" placeholder="其他销售均价(元/㎡)" name="otherSaleAvgPrice" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopproaccinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/coopproaccinfo/',
      formdata: {},
      formType: 'details',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>