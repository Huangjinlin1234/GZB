<!--
    @created by 马顺
    @time  2021/5/5
    @description 集团批复查看
-->
<template>
    <yu-tabs  type="card">
        <yu-tab-pane label="授信批复信息">
        <div>
        <div style="height:30%">
            <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
                <yu-xform-group :column="2">
                    <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
                    <yu-xform-item label="批复台账编号" ctype="input"  name="grpAccNo" disabled></yu-xform-item>
                    <yu-xform-group>
                        <yu-xform-item label="批复编号" ctype="input"  name="grpReplySerno" disabled></yu-xform-item>
                        <yu-button type="primary" @click="viewCpt">查看批复报告</yu-button>
                    </yu-xform-group>
                    <yu-xform-item label="授信申请流水号" ctype="input"  name="lmtGrpAppSerno" hidden></yu-xform-item>
                    <yu-xform-item label="批复生效日期" ctype="input"  name="replyInureDate" disabled></yu-xform-item>
                    <yu-xform-item label="业务类型" ctype="input"  name="lmtType" hidden></yu-xform-item>
                    <yu-xform-item label="集团客户编号" ctype="input"  name="grpCusId" disabled></yu-xform-item>
                    <yu-xform-item label="集团客户名称" ctype="input"  name="grpCusName" disabled></yu-xform-item>
                    <yu-xform-item label="审批模式" ctype="select"  name="apprMode" data-code="STD_APPR_MODE" disabled></yu-xform-item>
                    <yu-xform-item label="终审机构" ctype="select"  name="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE" disabled></yu-xform-item>
                    <yu-xform-item label="审批结论" ctype="select"  name="apprResult" data-code="STD_ZB_APPR_STATUS" disabled></yu-xform-item>
                    <yu-xform-item label="批复状态" ctype="select"  name="replyStatus" data-code="STD_XD_REPLY_STATUS" disabled></yu-xform-item>
                    <yu-xform-item label="用信审核方式" ctype="select"  name="loanApprMode" data-code="STD_LOAN_APPR_MODE" hidden></yu-xform-item>
                    <yu-xform-item label="币种" ctype="input"  name="curType" hidden></yu-xform-item>
                    <yu-xform-item label="授信期限" ctype="input"  name="lmtTerm" hidden></yu-xform-item>
                    <yu-xform-item label="操作类型" ctype="input"  name="oprType" hidden></yu-xform-item>
                    <yu-xform-item label="登记人" ctype="input"  name="inputIdName" hidden></yu-xform-item>
                    <yu-xform-item label="登记机构" ctype="input"  name="inputBrIdName" hidden></yu-xform-item>
                    <yu-xform-item label="登记日期" ctype="input"  name="inputDate" hidden></yu-xform-item>
                    <yu-xform-item label="最近修改人" ctype="input"  name="updId" hidden></yu-xform-item>
                    <yu-xform-item label="最近修改机构" ctype="input"  name="updBrId" hidden></yu-xform-item>
                    <yu-xform-item label="最近修改日期" ctype="input"  name="updDate" hidden></yu-xform-item>
                    <yu-xform-item label="主管客户经理" ctype="input"  name="managerIdName" disabled></yu-xform-item>
                    <yu-xform-item label="主管机构" ctype="input"  name="managerBrIdName" disabled></yu-xform-item>
                    <yu-xform-item label="主管客户经理" ctype="input"  name="managerId" hidden disabled></yu-xform-item>
                    <yu-xform-item label="主管机构" ctype="input"  name="managerBrId" hidden disabled></yu-xform-item>
                    <yu-xform-item label="创建时间" ctype="input"  name="createTime" hidden></yu-xform-item>
                    <yu-xform-item label="修改时间" ctype="input"  name="updateTime" hidden></yu-xform-item>
                </yu-xform-group>
            </yu-xform>
        </div>
        <div style="height:calc(100% - 30%)">
            <yu-panel title="集团授信额度情况" :hideFilter="false" :collapseHide="false">
                <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="grpDataUrlParams" :pageable="false" :data-url="grpDataUrl" :default-load="true" request-type="POST">
                    <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
                    <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
                    <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
                    <yu-xtable-column label="敞口额度合计" prop="openLmtAmt"></yu-xtable-column>
                    <yu-xtable-column label="低风险额度合计" prop="lowRiskLmtAmt" width="200"></yu-xtable-column>
                    <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
                    <yu-xtable-column label="主管机构" prop="managerBrIdName" width="200"></yu-xtable-column>
                    <yu-xtable-column label="是否可调剂" prop="isAdjustFlag" width="100" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <yu-button type="primary" @click.native.prevent="detailFn(scope.row)" size="small">查看详情</yu-button>
                    </template>
                    </yu-xtable-column>
                </yu-xtable>
            </yu-panel>
            <yu-panel title="集团贷后管理要求" :hideFilter="false" :collapseHide="false">
              <yu-xform-item label="贷后管理要求" ctype="textarea"  name="pspManaNeed" disabled></yu-xform-item>
            </yu-panel>
        </div>
        </div>
        </yu-tab-pane>
        <yu-tab-pane label="批复历史沿革">
              <yu-button type="primary" ref="btn_replyReport" @click="viewCptFnc">查看批复报告</yu-button>
              <yu-button type="primary" ref="btn_replyDetail" @click="infoFn">查看授信申报详情</yu-button>
            <yu-xtable ref="refTableHis" row-number condition-key="condition" :base-params="grpHisDataUrlParams" selection-type="radio" :pageable="true" request-type="POST" :data-url="grpHisDataUrl" :default-load="true">
                <yu-xtable-column label="批复流水号" prop="grpReplySerno"></yu-xtable-column>
                <yu-xtable-column label="客户编号" prop="grpCusId"></yu-xtable-column>
                <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
                <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
                <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
                <yu-xtable-column label="批复生效日期" prop="replyInureDate"></yu-xtable-column>
                <yu-xtable-column label="关联的授信业务流水号" prop="grpSerno" ></yu-xtable-column>
                <yu-xtable-column label="关联的授信业务类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
                <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
                <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
            </yu-xtable>
        </yu-tab-pane>
    </yu-tabs>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_LMT_ACC_OPER_TYPE,STD_APPR_MODE,STD_FINAL_APPR_BR_TYPE,STD_SX_LMT_TYPE,STD_XD_REPLY_STATUS,STD_ZB_YES_NO');

export default {
  data: function () {
    return {
      detailUrl: this.$backend.cmisBiz + '/api/lmtgrpreplyacc/querydetail',
      grpDataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpreplybygrpserno',
      grpDataUrlParams: {condition: {grpSerno: this.$route.params.grpAccNo}},
      grpHisDataUrl: this.$backend.cmisBiz + '/api/lmtgrpreply/getHisReply',
      grpHisDataUrlParams: {condition: {grpReplySerno: this.$route.params.grpReplySerno}}
    };
  },

  mounted () {
    var _this = this;
    var grpAccNo = _this.$route.params.grpAccNo;
    _this.getFormdata(grpAccNo);
  },

  methods: {
    getFormdata: function (grpAccNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.detailUrl,
        data: {grpAccNo: grpAccNo},
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.formdata);
          } else {
            _this.$message('保存失败');
            return;
          }
        }
      });
    },

    // 查看详情按钮
    detailFn (row) {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyAccDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyAccDetail', // 必传
        // 页签名称
        title: '集团客户批复详情',
        data: {
          accNo: row.singleSerno
        }
      });
    },


    // 查看批复报告
    viewCpt: function () {
      var _this = this;
      var params = _this.formdata;
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpfjt';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-JT.cpt&op=view&grpReplySerno=' + params.grpReplySerno;
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

    // 查看批复报告
    viewCptFnc: function () {
      var _this = this;
      var params = _this.$refs.refTableHis.selections[0];
      if (_this.$refs.refTableHis.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpfjt2';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-JT.cpt&op=view&grpReplySerno=' + params.grpReplySerno;
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
      var selections = _this.$refs.refTableHis.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let modelGroupNo = '';
      if (selections[0].lmtType == '01') { // 授信新增
        modelGroupNo = 'CMG000153';
      } else if (selections[0].lmtType == '02') { // 授信变更
        modelGroupNo = 'CMG000540';
      } else if (selections[0].lmtType == '03') { // 授信续作
        modelGroupNo = 'CMG000153';
      } else if (selections[0].lmtType == '04') { // 授信复审
        modelGroupNo = 'CMG000715';
      } else if (selections[0].lmtType == '05') { // 授信复议
        modelGroupNo = 'CMG000536';
      } else if (selections[0].lmtType == '06') { // 授信再议
        modelGroupNo = 'CMG000537';
      } else if (selections[0].lmtType == '07') { // 预授信细化
        modelGroupNo = 'CMG000611';
      } else if (selections[0].lmtType == '08') { // 额度调剂
        modelGroupNo = 'CMG000695';
      } else {
        _this.$message({
          message: '未识别的授信申报类型!',
          type: 'warning'
        });
      }
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: selections[0].grpSerno,
        title: '集团客户授信申报',
        data: {
          model_group_no: modelGroupNo,
          op: 'VIEW',
          grpSerno: selections[0].grpSerno,
          serno: selections[0].grpSerno,
          grpCusId: selections[0].grpCusId,
          cusId: selections[0].grpCusId
        }
      });
    }
  }

};
</script>
