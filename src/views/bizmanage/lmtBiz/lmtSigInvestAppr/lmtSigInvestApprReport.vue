<template>
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formReport" :rules="rules">
      <yu-panel title="授信基本信息" panel-type="simple">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <div v-show="showBuild==1||showBuild==2">
            <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
          </div>
          <div v-show="showBuild==3">
            <yu-xform-item label="原始权益人/委托人客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="原始权益人/委托人客户名称" name="cusName" ctype="input"  disabled></yu-xform-item>
            <yu-xform-item label="项目名称" name="proName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="预计年化收益率（%）" name="rate" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="项目总金额" name="intendActualIssuedScale" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="底层资产类型" name="basicAssetType" ctype="select" data-code="STD_ZB_BOTT_TYPE" disabled></yu-xform-item>
          </div>
          <div v-show="showBuild==4">
            <yu-xform-item label="管理人客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="管理人客户名称" name="cusName" ctype="input"  disabled></yu-xform-item>
            <yu-xform-item label="项目名称" name="proName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="预计年化收益率（%）" name="rate" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="项目总金额" name="intendActualIssuedScale" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="计划类型" name="assetPlanAppBusiType" ctype="select" data-code="STD_ZB_ASSET_PLAN_APP_BUSI_TYPE" disabled></yu-xform-item>
          </div>
          <yu-xform-item label="发起人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="投资机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="授信额度情况" panel-type="simple">
        <yu-button v-show="saveBtnShow" type="primary" @click="updateApprSubFn">修改</yu-button>
        <yu-button type="primary" @click="selectApprSubFn">查看</yu-button>
        <yu-xtable ref="refTable" condition-key="condition" row-number :pageable="false" :data="data">
          <yu-xtable-column label="申请流水号" prop="serno" align="center"></yu-xtable-column>
          <yu-xtable-column label="授信品种" prop="lmtBizType" align="center" data-code="STD_ZB_PRD_BIZ_TYPE"></yu-xtable-column>
          <yu-xtable-column label="授信期限（月）" prop="lmtTerm" align="center"></yu-xtable-column>
          <yu-xtable-column label="授信金额(万元)" prop="lmtAmt" align="center">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <div v-show="showBuild==1||showBuild==3||showBuild==4">
            <yu-xtable-column label="利率" prop="rate" align="center">
              <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.rate * 100).toFixed(2)) }}%</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarTypeName" align="center"></yu-xtable-column>
          </div>
          <div v-show="showBuild==2">
            <!-- <yu-xtable-column label="其中，自营额度(万元)" prop="sobsAmt" align="center">
              <template slot-scope="scope">
                <span>{{ numFn(scope.row.sobsAmt) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="其中，资管额度(万元)" prop="assetManaAmt" align="center">
              <template slot-scope="scope">
                <span>{{ numFn(scope.row.assetManaAmt) }}</span>
              </template>
            </yu-xtable-column> -->
            <yu-xtable-column label="剩余期限限制" prop="highLmtInvestSurplusTerm" align="center"></yu-xtable-column>
          </div>
          <yu-xtable-column label="是否循环" prop="isRevolv" align="center" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog title="授信额度情况" :visible.sync="dialogVisible" width="1000px">
        <yu-xform ref="refFormDialog" label-width="120px" v-model="formdataDialog">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="授信品种" name="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" ctype="select" disabled></yu-xform-item>
            <yu-xform-item label="授信期限（月）" ctype="input" rules="number" name="lmtTerm" :disabled="formDisabled"></yu-xform-item>
            <yu-xform-item label="授信金额(万元)" name="lmtAmt" ctype="yu-num" number-formatter="0,000" :disabled="formDisabled"></yu-xform-item>
            <div v-show="showBuild==1||showBuild==3||showBuild==4">
              <yu-xform-item label="利率" name="rate" ctype="yu-num" sign="%" :multiple="100" :disabled="formDisabled"></yu-xform-item>
              <yu-xform-item label="担保方式" name="guarTypeName" ctype="input" disabled></yu-xform-item>
            </div>
            <div v-show="showBuild==2">
              <!-- <yu-xform-item label="其中，自营额度(万元)" name="sobsAmt" ctype="yu-num" number-formatter="0,000" rules="required" :disabled="formDisabled"></yu-xform-item>
              <yu-xform-item label="其中，资管额度(万元)" name="assetManaAmt" ctype="yu-num" number-formatter="0,000" rules="required" :disabled="formDisabled"></yu-xform-item> -->
              <yu-xform-item label="剩余期限限制" ctype="input" rules="number" name="highLmtInvestSurplusTerm" :disabled="formDisabled"></yu-xform-item>
            </div>
            <yu-xform-item label="是否循环额度" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO" :disabled="formDisabled"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button v-show="saveBtnShow" type="primary" @click="saveBtn">保存</yu-button>
            <yu-button type="primary" @click="canclFn">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      <yu-panel title="审批意见" panel-type="simple">
        <yu-xform-group>
          <yu-xform-item :hidden="showInteAnaly" label-width="200px" label="金融市场总部风险合规部信评岗出具综合分析" name="inteAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!disabledInteAnaly"></yu-xform-item>
          <yu-xform-item label-width="200px" label="信贷管理部风险派驻岗出具综合分析" name="inteAnalyZh" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!disabledInteAnalyZH"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="其他要求" panel-type="simple">
          <yu-button-drop v-show="saveBtnShow" :show-length="8">
            <yu-button type="primary" @click="addLoanCond">添加</yu-button>
            <yu-button type="primary" @click="deleteLoanCond">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1" condition-key="condition" row-number :pageable="false" :data-url="apprLoanUrl" :base-params="apprLoanParam" request-type="POST">
            <yu-xtable-column label="具体内容" prop="condDesc" align="left"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-panel>
    </yu-xform>
    <yu-xdialog title="其他要求" :visible.sync="dialogLoanCond" width="1000px">
      <yu-xform ref="refFormLoanCond" label-width="100px" v-model="formdataLoanCond">
        <yu-xform-group>
          <yu-xform-item label="具体内容" name="condDesc" rules="required" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveLoanBtn">保存</yu-button>
          <yu-button type="primary" @click="canclLoanFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <div class="yu-grpButton">
      <yu-button type="primary" v-show="saveBtnShow" @click="saveReportData">保存</yu-button>
      <yu-button type="primary" @click="doPrint">查看审查报告</yu-button>
      <yu-button type="primary" @click="goBackFn">返回</yu-button>
    </div>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import {numFn, approveProcess} from '@/utils/unitchange';
yufp.lookup.reg('STD_SX_LMT_TYPE,STD_ZB_YES_NO,STD_ZB_ASSET_PLAN_APP_BUSI_TYPE,STD_ZB_PRD_BIZ_TYPE');
export default {
  components: { YufpDemoSelector },
  mixins: [approveProcess],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      numFn,
    };
  },
  mounted () {},
  methods: {
    saveReportData () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtsiginvestappr/update',
        data: _this.formReport,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message({ message: '保存成功', type: 'success' });
          } else {
            _this.$message({ message: '保存失败', type: 'error' });
          }
        }
      });
    },
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtsiginvestappr/selectBySerno',
        data: {
          condition: JSON.stringify({
            serno: _this.pageParams.serno,
            oprType: '01',
            issueReportType: '01'

          }),
          sort: 'createTime desc'
        },
        callback: function (code, message, response) {
          if (code == 0) {
            let obj = response.data.lmtSigInvestAppr;

            // 反显字段
            yufp.clone(obj, _this.formReport);
            _this.approveSerno = obj.approveSerno;
            // 表格反显
            obj.guarTypeName = response.data.guarTypeName;
            _this.data = [];
            _this.data.push(obj);

            _this.apprLoanUrl =
              _this.$backend.cmisBiz +
              '/api/lmtapprloancond/selectByQueryModel';
            _this.apprLoanParam = {
              condition: JSON.stringify({
                approveSerno: _this.approveSerno,
                condType: '01'
              })
            };
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 打印
    onPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.formReport.serno;
      params.cusId = _this.formReport.cusId;
      let name = 'bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
      let key = 'report';
      params.src = _this.$backend.frptRptService + 'zjty-scbg15.cpt&serno=' +
        params.serno + '&lmtBizType=' + _this.pageParams.lmtBizType;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    // 打印
    doPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.formReport.serno;
      params.cusId = _this.formReport.cusId;
      let strPrint;
      if (this.showBuild == 1 || this.showBuild == 2) {
        strPrint = 'zjty-scbg15.cpt&serno=';
      } else if (this.showBuild == 3) {
        strPrint = 'zjty-scbg16.cpt&serno=';
      } else if (this.showBuild == 4) {
        strPrint = 'zjty-scbg18.cpt&serno=';
      }
      params.src =
        _this.$backend.frptRptService + strPrint +
        params.serno + '&lmtBizType=' + _this.pageParams.lmtBizType;
      this.$emit('doPrint', params);
    }
  }
};
</script>
