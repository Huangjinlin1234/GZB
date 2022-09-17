
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="账号选择" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="ctrLoanTable" row-number row-key="pkId" condition-key="condition" :data-url="urls.ctrLoanInfoUrl" :base-params="Param" request-type="POST" :default-load="false" :pageable="false">
        <yu-xtable-column label="保证金账号" prop="bailAccNo" width="110px"></yu-xtable-column>
        <yu-xtable-column label="保证金币种" prop="bailCurType" data-code="STD_ZB_CUR_TYP" width="110px"></yu-xtable-column>
        <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub" width="140px"></yu-xtable-column>
        <yu-xtable-column label="保证金账户名称" prop="bailAccName" width="120px"></yu-xtable-column>
        <yu-xtable-column label="保证金开户行号" prop="acctsvcrNo" width="120px"></yu-xtable-column>
        <yu-xtable-column label="保证金开户行名称" prop="acctsvcrName" width="140px"></yu-xtable-column>
        <yu-xtable-column label="母户序号" prop="firstAccount" width="80px" ></yu-xtable-column>
        <yu-xtable-column label="保证金账户金额" prop="accountAmount" width="120px"></yu-xtable-column>
        <yu-xtable-column label="待清算账号" prop="clearAccno" width="120px"></yu-xtable-column>
        <yu-xtable-column label="待清算账户名" prop="clearAccname" width="120px" ></yu-xtable-column>
        <yu-xtable-column label="账户类型" prop="accountType" width="80px" ></yu-xtable-column>
        <yu-xtable-column label="支付方式" prop="zhfutojn" width="100px"></yu-xtable-column>
        <yu-xtable-column label="母户序号" prop="firstAccount" width="100px"></yu-xtable-column>

    </yu-xtable>
    <div class="yu-grpButton">
        <yu-button type="primary" v-show="saveBtnShow" @click="backToAdd">选取返回</yu-button>
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
        ctrLoanInfoUrl: ''
      },
      formdata: {},
      saveBtnShow: true
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
      _this.data = this.pageParams;
      _this.bailAccNo = this.data.bailAccNo;
      _this.bailCurType = this.data.bailCurType;

      // 关联个人客户授信额度明细
      _this.urls.ctrLoanInfoUrl =
        backend.cmisBiz + '/api/bailaccinfo/sendcoreforbail';
      _this.Param = { condition: JSON.stringify({ bailAccNo: _this.bailAccNo, bailCurType: _this.bailCurType}) };
    },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.ctrLoanTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.ctrLoanTable.selections[0];
      this.$dialog.close(this.dialogId, params);
    },
    /**
     * 取消
     */
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
