<template>
  <!--
    @created by qw
    @description 贷款出账申请—————小企业无还本续贷
  -->
  <div>
    <yu-panel title="风控模型结果" :hideFilter="false" :collapseHide="false">
        <!--<yu-toolbar>
          <yu-button type="primary" @click="addFn"  :hidden="op=='VIEW'||op=='view'">新增</yu-button>
          <yu-button type="primary" @click="modifyFn"  :hidden="op=='VIEW'||op=='view'">修改</yu-button>
          <yu-button type="primary" @click="deleteFn"  :hidden="op=='VIEW'||op=='view'">删除</yu-button>
          <yu-button type="primary" @click="infoFn"  >查看</yu-button>
        </yu-toolbar>-->
      <yu-xtable ref="refTable"  row-number :data-url="dataUrl"  request-type="POST" style="margin-top: 10px" condition-key="condition" :base-params="baseParams"  >
        <yu-xtable-column label="借据编号" prop="billNo" width="100px"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="100px"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="100px"></yu-xtable-column>
        <yu-xtable-column label="审批结果" prop="approveStatus" width="80px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="行内贷款无欠本欠息情况" prop="rule01" width="140px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="本行或他行经营性贷款无欠本欠息情况" prop="rule02" width="160px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="原周转贷款分类为正常类" prop="rule03" width="160px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="企业工商信息状态正常，且无工商处罚记录" prop="rule04" width="160px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="个人和企业无失信被执行情况" prop="rule05" width="160px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="授信评审部提供的信贷客户内部分类" prop="rule06" width="160px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="内部评级为BBB级以上" prop="rule07" width="160px" data-code="STD_FB_AUDIT"></yu-xtable-column>
        <yu-xtable-column label="查询时间" prop="queryTime" width="100px"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO,STD_BIZ_SENCE,STD_FB_AUDIT');
let obj = {};
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/pvploanappxqywhbxdresult/selectbymodel',
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
  },
  created () {
    var _this = this;
    var billNo = '';
    if (this.getFactory().contextData.instanceInfo) {
      obj = this.getFactory().contextData.instanceInfo;
      this.op = obj.param.op;
      billNo = obj.param.billNo;
    } else if (this.$route.meta.params) {
      obj = this.$route.meta.params;
      this.op = obj.op;
      billNo = obj.billNo;
    } else {
      obj = this.getFactory().contextData;
      this.op = obj.op;
      billNo = obj.billNo;
    }
    _this.baseParams = {condition: JSON.stringify({ billNo: billNo})};
  }
};
</script>
