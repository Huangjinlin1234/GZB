<template>
  <div class="credit-apply">
    <yu-panel title="批复信息" :collapse-hide="false">
      <yu-tabs v-model="activeName">
        <yu-tab-pane label="待处理申请" name="todo"></yu-tab-pane>
      </yu-tabs>
      <yu-xform v-model="applyFormdata" related-table-name="yutable" form-type="search" :remove-empty="true">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户姓名" placeholder="客户姓名" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件类型" placeholder="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" name="certType"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" ctype="input" name="certCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-toolbar>
        <yu-button type="primary" @click="addFn"  v-if="checkCtrl('addFn')">批复变更</yu-button>
        <yu-button type="primary" @click="viewFn" v-if="checkCtrl('viewFn')">查看</yu-button>
      </yu-toolbar>
      <yu-xtable index selection-type="radio" ref="yutable" :data-url="urls.listUrl" style="width: 100%"
          condition-key="condition" request-type="POST" :base-params="searchData">
        <yu-xtable-column label="批复流水号" prop="replySerno" ></yu-xtable-column>
        <yu-xtable-column label="调查编号" prop="surveySerno" ></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="批复金额" prop="replyAmt"></yu-xtable-column>
        <yu-xtable-column label="期限类型" prop="termType" data-code="STD_ZB_TERM_TYPE"></yu-xtable-column>
        <yu-xtable-column label="期限" prop="appTerm" ></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" data-code="STD_CRAD_BUSINESS_STAGE"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yufpNwfInit ref="yufpNwfInit" @success-click="successCbFn"></yufpNwfInit>
  </div>
</template>
<script>
import { lookup } from '@/utils';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
lookup.reg('STD_ZB_CERT_TYP,STD_ZB_GUAR_WAY,STD_ZB_TERM_TYPE');
lookup.reg('STD_CARD_APP_CHNL,STD_ZB_APPR_STATUS,STD_CRAD_BUSINESS_STAGE');
export default {
  data () {
    return {
      activeName: 'todo',
      activeName2: 'preIn',
      applyFormdata: {},
      urls: {
        listUrl: this.$backend.cmisBiz + '/api/lmtcrdreplyinfo/selectbymodel',
        deleteUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/delete/', // /api/creditcardappinfo/delete/{serno}
        reconsiderUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/reconsider'
      },
      preformdata: {},
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false), // ADD EDIT DETAIL
      dialogVisible: false,
      searchData: {
        condition: {
          applyExistsStatus: '000,992',
          oprType: '01',
          belgLine: '02'
        }
      }
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.yutable.remoteData();
    }
  },
  methods: {
    // 新增
    addFn () {
      let selections = this.$refs.yutable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      const route = 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/lmtCardReplyInfoCard';
      this.$router.addRoute(route, '批复变更', {}, '/' + route);
      this.$router.push({ path: '/' + route, query: {name: this.$route.name, type: 'add', replySerno: selections[0].replySerno}});
    },
    // 查看
    viewFn (row) {
      let selections = this.$refs.yutable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      const route = 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/lmtCardReplyInfoCard';
      this.$router.addRoute(route, '查看', {}, '/' + route);
      this.$router.push({ path: '/' + route, query: {name: this.$route.name, type: 'view', replySerno: selections[0].replySerno}});
    }

  }
};
</script>
<style scoped>
.credit-apply {
  height: 100%;
}
</style>
