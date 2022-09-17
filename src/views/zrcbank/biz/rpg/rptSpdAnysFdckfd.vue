<template>
  <div>
    <yu-panel title="房地产开发贷"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="op =='VIEW'" :form-type="viewType">
                <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                <yu-xform-item label="房地产贷款标识" ctype="input" name="flag" hidden="true"></yu-xform-item>
                <yu-xform-item label="固定资产贷款类型" ctype="input" name="fixedAssetsLoansType"></yu-xform-item>
                <yu-xform-item label="项目名称" ctype="input" name="entryName" ></yu-xform-item>
                <yu-xform-item label="项目概况项目概况（包括占地面积、建筑总面积、不计容面积等）" ctype="input"  name="projectOverview"></yu-xform-item>
                <yu-xform-item label="容积率" ctype="input"  name="plotRatio"  ></yu-xform-item>
                <yu-xform-item label="建设地点" ctype="input"  name="constructionSite"  ></yu-xform-item>
                <yu-xform-item label="投资规模" ctype="input" name="investmentScale"  ></yu-xform-item>
                <yu-xform-item label="建设周期" ctype="input" name="constructionCycle"  ></yu-xform-item>
                <yu-xform-item label="资金来源" ctype="input"  name="sourceOfFunds"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况可研" ctype="input"  name="feasibilityStudy"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况项目（发改委）批文" ctype="textarea" name="approvalDocumentOfTheProject"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况项目选址意见书" ctype="input" name="proposalForProjectSiteSelection"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况环评" ctype="textarea" name="eia"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况建设用地规划许可证" ctype="input" name="constructionLandPlanningPermit"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况国有土地使用证" ctype="textarea" name="stateOwnedLandUseCertificate"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况建设工程规划许可证" ctype="input" name="constructionProjectPlanningPermit"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况建设工程施工许可证" ctype="input" name="constructionPermit"  ></yu-xform-item>
                <yu-xform-item label="项目基本资料情况其他所需资料" ctype="input" name="otherRequiredInformation"  ></yu-xform-item>
                <yu-xform-item label="工程施工合同" ctype="input" name="projectConstructionContract"  ></yu-xform-item>
                <yu-xform-item label="项目实施进度" ctype="input" name="projectImplementationSchedule"  ></yu-xform-item>
                <yu-xform-item label="已投入资金来源" ctype="input" name="sourcesOfFundsInvested"  ></yu-xform-item>
                <yu-xform-item label="效益测算" ctype="input" name="benefitCalculation"  ></yu-xform-item>
                <yu-xform-item label="还款计划" ctype="textarea" name="repaymentPlan"  ></yu-xform-item>
                <yu-xform-item label="其他需说明事项" ctype="textarea" name="otherExplainedMatters"  ></yu-xform-item>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="op!='VIEW'">保存</yu-button>
      <!--<yu-button type="primary" @click="print">打印</yu-button>-->
    </yu-form-buttons>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      op: ''
    };
  },
  mounted () {
    this.op = this.param.op;
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.param.serno;
      // var op = _this.$route.meta.params.op;
      // _this.type = op;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      this.baseFormdata1.flag = '2';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysgdxmd/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
          });
        }
      });
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      comitData = _this.baseFormdata1;
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptspdanysgdxmd/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    // 取消并返回上一页面
    print: function () {
      this.$xutils.showMsgBox('提示', '开发中！'); // 弹出提示
    }

  }
};
</script>
