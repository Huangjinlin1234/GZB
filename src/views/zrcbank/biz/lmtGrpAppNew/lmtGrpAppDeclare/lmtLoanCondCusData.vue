
<template>
  <!--
    成员客户选择
  -->
  <div>
    <yu-panel title="成员客户选择" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" row-number condition-key="condition" :data-url="urls.loanCondInfoUrl" :base-params="Param" request-type="POST" :default-load="false" :pageable="false">
        <yu-xtable-column label="审批流水号" prop="approveSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="授信敞口额度合计（元）" prop="openLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="授信低风险额度合计（元）" prop="lowRiskLmtAmt" ></yu-xtable-column>
    </yu-xtable>
    <div class="yu-grpButton">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE');

export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      urls: {
        loanCondInfoUrl: ''
      },
      formdata: {},
      saveBtnShow: true,
      Param: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      instu: state => state.oauth.instu, // 金融机构Object
      loginCode: state => state.oauth.loginCode
    })
  },
  mounted () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      let serno = _this.pageParams.serno;
      _this.urls.loanCondInfoUrl = backend.cmisBiz + '/api/lmtgrpmemrel/selectsingleapprloanconddatabygrpserno';// backend.cmisBiz + '/api/lmtappsubprd/selectAppSubPrdBySerno';
      _this.Param = {grpSerno: serno};
    },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTable.selections[0];
      _this.$dialog.close(_this.dialogId, params);
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
