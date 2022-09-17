/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by
 * @description 待核销呆账清单
 */
<template>
  <div>
   <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="billTable" form-type="search" ref="searchForm"  v-model="formdata">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户号" placeholder="客户号" ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>
    <yu-panel title="待核销呆账清单" :hideFilter="false" :collapseHide="false">
        <div style="margin-bottom:10px">
            <yu-button type="primary"  @click="detailApplyFn('debt')" v-if="checkCtrl('debt')">查看借据详情</yu-button>
            <yu-button type="primary"  @click="detailApplyFn('apply')" v-if="checkCtrl('view')">查看申请详情</yu-button>
        </div>
        <yu-xtable ref="billTable" row-number selection-type="radio" :data-url="dataBillListUrl" request-type="POST" :base-params="baseApplyParams" condition-key="condition">
          <yu-xtable-column label="合同编号" prop="contNo" width="180"></yu-xtable-column>
          <yu-xtable-column label="借据编号" prop="billNo" width="200"></yu-xtable-column>
          <yu-xtable-column label="客户号" prop="cusId" width="200" ></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="200" ></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance" width="150" :formatter="Currency" ></yu-xtable-column>
          <yu-xtable-column label="拖欠利息总额" prop="totalTqlxAmt" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="贷款起始日" prop="loanStartDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="贷款到期日" prop="loanEndDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="执行年利率" prop="execRateYear" width="150"></yu-xtable-column>
          <yu-xtable-column label="五级分类" prop="fiveClass" width="150" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName" width="150"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_FIVE_CLASS,STD_ZB_CUR_TYP');
export default {
  mixins: [mixin],
  data: function () {
    return {
      dataBillListUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/queryplabaddebtwriteoffbill',
      formdata: null,
      baseApplyParams: {condition: JSON.stringify({ queryFlag: 'applyTable'})}
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  methods: {
    // 自定义查询功能
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          // eslint-disable-next-line no-inner-declarations
          var param = {
            condition: JSON.stringify(_this.formdata)
          };
          debugger;
          _this.$refs.billTable.remoteData(param);
        } else {
          return;
        }
      });
    },

    /**
    * 查看详情
     */
    detailApplyFn (info) {
      var _this = this;
      if (info === 'apply') {
        if (_this.$refs.billTable.selections.length !== 1) {
          _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
          });
          return;
        }
        _this.$router.addTab({
          // 路由名称
          name: 'zrcbank/npam/badDebtsWriteOff/writeOffBill/singleWriteOffBillDetail',
          // 自定义唯一页签key
          key: 1 + new Date().getTime(), // 必传
          // 页签名称
          title: '呆账核销申请详情',
          // 传递的业务数据，可选配置
          data: {
            viewType: 'DETAIL',
            pbdwasSerno: _this.$refs.billTable.selections[0].serno,
            ifShow: false
          }
        });
      } else {
        if (_this.$refs.billTable.selections.length !== 1) {
          _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
          });
          return;
        }
        var selectData = _this.$refs.billTable.selections[0];
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
      }
    }

  }
};
</script>
