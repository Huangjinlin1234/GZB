
<template>
  <!--
    @created by
    @description 交易对手选择公共组件
  -->
  <div>
    <yu-panel title="交易对手选择" :hideFilter="false" :collapseHide="false">
      <yu-xform form-type="search" v-model="searchFormdata" label-width="80px" related-table-name="toppAcctTab">
          <yu-xform-group :column="4">
            <yu-xform-item label="交易对手账号" ctype="input" placeholder="机构码" name="toppAcctNo"></yu-xform-item>
            <yu-xform-item label="交易对手名称" ctype="input" placeholder="机构名称" name="toppName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="toppAcctTab" row-number row-key="pkId" condition-key="condition" :data-url="urls.toppAcctInfoUrl" :base-params="Param" request-type="POST" :default-load="false">
        <yu-xtable-column label="交易对手账号" prop="toppAcctNo"></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
        <yu-xtable-column label="开户行行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
    </yu-xtable>
    <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE');
import mixinList from '@/utils/mixins/mixin-list';
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinList, mixinForm],
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      urls: {
        toppAcctInfoUrl: ''
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
      // 查询交易对手信息
      _this.urls.toppAcctInfoUrl = backend.cmisBiz + '/api/toppacctsub/selectdistinctacctbymodel';
      _this.Param = { condition: JSON.stringify({ oprType: '01'}) };
    },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.toppAcctTab.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.toppAcctTab.selections[0];
      this.$dialog.close(this.dialogId, params);
    },
    // 取消
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
