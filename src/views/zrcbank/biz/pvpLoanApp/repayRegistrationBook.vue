<template>
  <!--
    @created by qw
    @description 贷款出账申请—————小企业无还本续贷登记簿
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="原借据号" name="oldBillNo" ctype="input"></yu-xform-item>
            <yu-xform-item label="第一次续贷借据号" name="firstBillNo" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable"  row-number :data-url="dataUrl"  request-type="POST" style="margin-top: 10px"  :pageable="true" condition-key="condition" :base-params="{condition:{belgLine:'03'}}">
          <yu-xtable-column label="原借据号" prop="oldBillNo" width=""></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" width="120px"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="120px"></yu-xtable-column>
          <yu-xtable-column label="第一次续贷借据号" prop="firstBillNo" width=""></yu-xtable-column>
          <yu-xtable-column label="第一次续贷时间" prop="firstDate" width=""></yu-xtable-column>
          <yu-xtable-column label="第二次续贷借据号" prop="secondBillNo" width=""></yu-xtable-column>
          <yu-xtable-column label="第二次续贷时间" prop="secondDate" width=""></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-tabs>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_YES_NO,STD_BIZ_SENCE');
export default {
  components: { YufpDemoSelector },
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/pvprenewloaninfo/selectbymodel',
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      isHidden: false,
      op: ''
    };
  }
  // created () {
  //   var _this = this;
  //   var firstBillNo = '';
  //   if (this.getFactory().contextData.instanceInfo) {
  //     obj = this.getFactory().contextData.instanceInfo;
  //     this.op = obj.param.op;
  //     firstBillNo = obj.param.billNo;
  //   } else if (this.$route.meta.params) {
  //     obj = this.$route.meta.params;
  //     this.op = obj.op;
  //     firstBillNo = obj.billNo;
  //   } else {
  //     obj = this.getFactory().contextData;
  //     this.op = obj.op;
  //     firstBillNo = obj.billNo;
  //   }
  //   _this.baseParams = {condition: JSON.stringify({ firstBillNo: firstBillNo})};
  // }
};
</script>