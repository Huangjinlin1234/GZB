<template>
  <div>
    <yu-panel title="客户评级表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yu-button  @click="viewDetail1">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable1" row-number selection-type="radio" :pageable="false" :data-url="dataUrl1" :default-load="false" :base-params="baseParams1"  request-type="post">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="信用等级" prop="finalRank" data-code="STD_ZB_GRADE_RANK"></yu-xtable-column>
        <yu-xtable-column label="评级生效日期" prop="effDt"></yu-xtable-column>
        <yu-xtable-column label="评级到期日期" prop="dueDt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="债项评级表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yu-button @click="viewDetail2">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio" :pageable="false" :data-url="dataUrl2" :default-load="false" :base-params="baseParams2"  request-type="post">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="债项等级" prop="debtLevel" data-code="STD_DEBT_GRADE"></yu-xtable-column>
        <yu-xtable-column label="违约损失率LGD" prop="lgd"></yu-xtable-column>
        <yu-xtable-column label="违约风险暴露EAD" prop="ead"></yu-xtable-column>
        <yu-xtable-column label="评级生效日期" prop="evalInureDate"></yu-xtable-column>
        <yu-xtable-column label="评级到期日期" prop="evalEndDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="专业贷款评级" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yu-button @click="viewDetail3">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable3" row-number condition-key="condition" selection-type="radio" :pageable="false" :data-url="dataUrl3" :default-load="false" :base-params="baseParams3"  request-type="post">
        <yu-xtable-column label="授信申请流水号" prop="lmtSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="评级年度" prop="gradeYear"></yu-xtable-column>
        <yu-xtable-column label="评级发生类型" prop="gradeHappenType"></yu-xtable-column>
        <yu-xtable-column label="评级模型" prop="gradeMode"></yu-xtable-column>
        <yu-xtable-column label="专业贷款调整后等级" prop="afterGrade"></yu-xtable-column>
        <yu-xtable-column label="专业贷款最终认定等级" prop="finalGrade"></yu-xtable-column>
        <yu-xtable-column label="专业贷款预期损失率" prop="expectedLossRate"></yu-xtable-column>
        <yu-xtable-column label="风险大类" prop="bigriskclass"></yu-xtable-column>
        <yu-xtable-column label="风险种类" prop="midriskclass"></yu-xtable-column>
        <yu-xtable-column label="风险小类" prop="fewriskclass"></yu-xtable-column>
        <yu-xtable-column label="风险划分日期" prop="riskdividedate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl1: this.$backend.cmisCus + '/api/cuscomgrade/querygradeinfobycusid',
      baseParams1: {},
      dataUrl2: this.$backend.cmisBiz + '/api/lmtladeval/selectbyserno/',
      baseParams2: {},
      dataUrl3: this.$backend.cmisBiz + '/api/majorgradeinfo/selectbylmtserno',
      baseParams3: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let _this = this;
      let grpSerno = _this.$route.meta.params.grpSerno;
      if (!grpSerno || grpSerno === '') {
        grpSerno = _this.getFactory().contextData.instanceInfo.bizId;
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querycusbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.baseParams1 = {
              condition: JSON.stringify({
                cusId: response.data
              })
            };
            // _this.$refs.refTable1.remoteData();
          }
        }
      });
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querysinglesernobygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.baseParams2 = {
              condition: JSON.stringify({
                serno: response.data
              })
            };
            // _this.$refs.refTable2.remoteData();
            _this.baseParams3 = {
              condition: JSON.stringify({
                lmtSerno: response.data
              })
            };
            // _this.$refs.refTable3.remoteData();
            // _this.$refs.refTable3.remoteData();
          }
        }
      });
    },

    viewDetail1 () {
      let params = this.$refs.refTable1.selections;
      if (params.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$dialog.open(
        '客户评级详情',
        'bizmanage/lmtBiz/lmtLadEvalBiz/lmtCusComGradelDetailIndex',
        900,
        600,
        params[0],
        null
      );
    },

    viewDetail2 () {
      let params = this.$refs.refTable2.selections;
      if (params.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var model = {
        op: 'VIEW'
      };
      yufp.clone(params[0], model);
      this.$dialog.open(
        '债项评级详情',
        'bizmanage/lmtBiz/lmtLadEvalBiz/lmtCusDebtMajorGrade',
        900,
        600,
        model,
        null
      );
    },

    viewDetail3 () {
      let params = this.$refs.refTable3.selections;
      if (params.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params[0].op = 'VIEW';
      this.$dialog.open(
        '专业评级详情',
        'bizmanage/lmtBiz/lmtLadEvalBiz/lmtDebtEvalDetailIndex',
        900,
        600,
        params[0],
        null
      );
    }

  }
};
</script>
