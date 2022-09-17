<!--
    @created by 屈文
    @description 首页待办
-->
<template>
  <div>
    <yu-panel title="申请列表" is-collapse>
      <template slot="right" :hideFilter="false" :collapseHide="false">
      </template>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item label="标题" placeholder="标题" ctype="input" name="title"></yu-xform-item>
            <yu-xform-item label="时间" placeholder="时间" ctype="datepicker" name="createAt"></yu-xform-item>
            <yu-xform-item label="类型" placeholder="类型" ctype="select" name="type" data-code="NATIONALITY"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-toolbar>
        <yu-button type="primary" @click="fillInFn">填报</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" @row-click="onSelected" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtType" sortable data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号" prop="grpCusId" sortable></yu-xtable-column>
            <yu-xtable-column label="集团客户名称" prop="grpCusName" sortable></yu-xtable-column>
            <!--<yu-xtable-column label="客户类型" prop="cusType" data-code="NATIONALITY"></yu-xtable-column>-->
            <yu-xtable-column label="敞口额度合计（元）" prop="openTotalLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" > </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" hide-column> </yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_SX_LMT_TYPE,STD_ZB_APPR_STATUS');
export default {
  data: function () {
    return {
      searchFormdata: {},
      // baseParamsPers: {condition: JSON.stringify({ cusType: '02', oprType: '01' })},
      dataUrl: backend.cmisBiz + '/api/lmtgrpapp/queryallgrpapplistforpartmgr',
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
      saveBtnShow: true
    };
  },
  methods: {
    /**
     * 填报
     */
    fillInFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      var grpSerno = obj.grpSerno;
      var lmtType = obj.lmtType;
      var name = '';
      // 01新增,05复议,06再议
      if (lmtType == '01' || lmtType == '03') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpAppGroupWait/lmtGrpAppMemberGuide';
      } else if (lmtType == '05') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppReconsider/lmtGrpAppReconsiderMemberGuide';
      } else if (lmtType == '06') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDicuss/lmtGrpAppDicussMemberGuide';
      } else if (lmtType == '07') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDetails/lmtGrpAppDetailsMemberGuide';
      } else if (lmtType == '02') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppChange/lmtGrpAppChangeMemberGuide';
      } else if (lmtType == '04') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppRecheck/lmtGrpAppRecheckMemberGuide';
      } else if (lmtType == '08') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppAdjust/lmtGrpAppAdjustMemberGuide';
      }
      this.$router.addTab({
        name: name,
        title: '成员客户授信申报向导',
        key: 'key',
        data: {
          grpSerno: grpSerno
        }
      });
    }
  }
};
</script>
