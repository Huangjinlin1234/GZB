<!--
    @created by 马顺
    @time  2021/5/5
    @description 集团批复查看
-->
<template>
  <div>
    <yu-panel title="集团客户批复查询列表">
    <yu-xform related-table-name="refTable" form-type="search" label-width="60px">
        <yu-xform-group :column="4">
            <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpCusId"></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpCusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="批复号" ctype="input" placeholder="批复号" name="grpReplySerno"></yu-xform-item>
            <yu-xform-item label="审批模式" ctype="select" data-code="STD_APPR_MODE" placeholder="审批模式" name="apprMode" ></yu-xform-item>
            <yu-xform-item label="审批结论" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批结论" name="apprResult" exclude-key="000"></yu-xform-item>
            <yu-xform-item label="批复状态" ctype="select" data-code="STD_XD_REPLY_STATUS" placeholder="批复状态" name="replyStatus" exclude-key="03"></yu-xform-item>
        </yu-xform-group>
    </yu-xform>
        <yu-button type="primary" ref="btn_replyReport" @click="viewCpt" v-if="checkCtrl('viewCpt')">查看批复报告</yu-button>
        <yu-button type="primary" ref="btn_replyDetail" @click="infoFn" v-if="checkCtrl('infoFn')">查看批复详情</yu-button>
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
        <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="replyInureDate"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理ID" prop="managerId" hide-column></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName "></yu-xtable-column>
        <yu-xtable-column label="主管机构ID" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="replyStatus" data-code="STD_XD_REPLY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_LMT_ACC_OPER_TYPE,STD_FINAL_APPR_BR_TYPE,STD_XD_REPLY_STATUS');

export default {
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpreplyacc/queryall',
      baseParams: {}
    };
  },
  methods: {
    // 客户信息查看
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
    },

    // 查看批复报告
    viewCpt: function () {
      var _this = this;
      var params = _this.$refs.refTable.selections;
      if (params.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpf3';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-JT.cpt&op=view&grpReplySerno=' + params[0].grpReplySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '授信批复（集团）',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 查看批复详情
    infoFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var grpAccNo = selections[0].grpAccNo;
      var grpReplySerno = selections[0].grpReplySerno;

      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/LmtGrpReplyAcc/lmtGrpReplyAccDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '集团批复查看',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'view',
          grpReplySerno: grpReplySerno,
          grpAccNo: grpAccNo
        }
      });
    }

  }

};
</script>
