<template>
  <div>
    <yu-panel title="集团客户批复查询列表">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" relate-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpCusId"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpCusName"></yu-xform-item>
          <yu-xform-item label="批复号" ctype="input" placeholder="批复号" name="grpReplySerno"></yu-xform-item>
          <yu-xform-item label="审批模式" ctype="select" data-code="STD_APPR_MODE" placeholder="审批模式" name="apprMode" ></yu-xform-item>
          <yu-xform-item label="审批结论" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批结论" name="apprResult" exclude-key="000"></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="select" data-code="STD_XD_REPLY_STATUS" placeholder="批复状态" name="replyStatus" exclude-key="03"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button>
          <yu-button ref="btn_replyReport" @click="customClick('replyReport')">查看批复报告</yu-button>
          <yu-button ref="btn_replyDetail" @click="customClick('replyDetail')">查看批复详情</yu-button>
      </yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" request-type="post" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="台账号" prop="grpAccNo"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusId">
          <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusId }}</a>
              </template>
        </yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpCusName">
          <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusName }}</a>
              </template>
        </yu-xtable-column>
        <yu-xtable-column label="批复号" prop="grpReplySerno"></yu-xtable-column>
        <yu-xtable-column label="集团申请流水号" prop="grpSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="replyInureDate"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="replyStatus" data-code="STD_XD_REPLY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpreplyacc/queryall',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtgrpreplyacc/delete/'
    };
  },
  methods: {
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      var params = {};
      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000311';
      params['grpNo'] = data.grpCusId;

      params['op'] = 'view';

      this.$dialog.open(
        '集团客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        true
      );
    }
  }
};
</script>
