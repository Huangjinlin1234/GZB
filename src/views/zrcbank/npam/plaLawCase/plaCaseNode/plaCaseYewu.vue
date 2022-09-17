<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-panel title="涉诉业务情况" :collapseHide="false">
        <yu-button-drop>
          <yu-button type="primary"  @click="infoFn(3)">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable3" row-number :data-url="urls.lawcasebillrel" condition-key="condition" selection-type="radio" :base-params="params.caseSernoParam" requestType="POST">
          <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
          <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
          <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="涉诉业务担保情况" :collapseHide="false" :hideFilter="false">
        <yu-button-drop>
          <yu-button type="primary" @click="infoFn(4)">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable4" row-number :data-url="urls.lawcasegrtrel" condition-key="condition" selection-type="radio" :base-params="params.caseYwParam" requestType="POST">
          <yu-xtable-column align="center" label="主合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="担保合同编号" prop="guarContNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
          <yu-xtable-column align="center" label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column align="center" label="担保合同金额" prop="guarAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="担保起始日" prop="guarStartDate"></yu-xtable-column>
          <yu-xtable-column align="center" label="担保到期日" prop="guarEndDate"></yu-xtable-column>
          <yu-xtable-column align="center" label="担保状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_ZB_GUAR_CONT_TYPE,STD_GUAR_CONT_STATE');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm, mixin],
  props: {
    viewType: String,
    cusCorp: Object,
    dialogId: String
  },
  data: function () {
    return {
      urls: {
        lawcasebillrel: backend.cmisNpam + '/api/plalawcasebillrel/queryByPlaLawCaseBillRel',
        lawcasegrtrel: backend.cmisNpam + '/api/plalawcasegrtrel/queryByPlaLawCaseGrtRel'
      },
      params: {
        caseSernoParam: {},
        caseYwParam: {}
      }
    };
  },
  created () {
    this.rInit();
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.rInit();
    }
  },

  methods: {
    /* 初始化页面 */
    rInit () {
      var _this = this;
      if (_this.cusCorp) {
        _this.params.caseSernoParam = { condition: JSON.stringify({ caseSerno: _this.$route.meta.params.caseSerno}) };
        _this.params.caseYwParam = { condition: JSON.stringify({ caseSerno: _this.$route.meta.params.caseSerno}) };
      }
    },
    /* 查看按钮 */
    infoFn (index) {
      var _this = this;
      if (index == 3) {
        var selectionsAry = _this.$refs.refTable3.selections;
        if (selectionsAry.length !== 1) {
          return _this.$message({message: '请先选择一条记录', type: 'warning'});
        };
        var selectData = selectionsAry[0];
        var billNo = selectData.billNo;
        _this.$router.addTab({
          name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
          key: new Date().getTime(),
          title: '贷款台账页面',
          data: {
            billNo: billNo, // 借据编号
            viewType: 'DETAIL'
          }
        });
      };
      if (index == 4) {
        let contNo = _this.$refs.refTable4.selections[0].guarContNo;
        _this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.$backend.cmisBiz + '/api/grtguarcont/queryList',
          data: { condition: JSON.stringify({ oprType: '01', 'guarContNo': contNo }) },
          success: (response, status, xhr) => {
            if (response.code == '0') {
              let jsoPar = response.data[0];
              //  console.log('jsoPar', jsoPar);
              if (jsoPar == null || jsoPar == '') {
                _this.$xutils.showMsgBox(
                  '提示',
                  '无该合同信息',
                  350,
                  150
                );
                return;
              }
              if (!jsoPar) {
                _this.$xutils.showMsgBox(
                  '提示',
                  '必须选择一条记录进行操作!\r\n请重新操作!',
                  350,
                  150
                );
                return;
              }
              jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
              jsoPar['op'] = 'VIEW';
              _this.$dialog.open(
                '',
                'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                -1,
                -1,
                jsoPar,
                _this.getDialogDataFunc,
                true,
                true
              );
            }
          }
        });
      };
    }
  }
};
</script>
