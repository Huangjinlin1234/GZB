
<template>
  <!--
    @created by quwen
    @description 机构选择pop
  -->
  <div>
    <yu-panel title="机构选择" :hideFilter="false" :collapseHide="false">
      <yu-xform form-type="search" v-model="searchFormdata" label-width="80px" related-table-name="bankTable">
          <yu-xform-group :column="4">
            <yu-xform-item label="机构码" ctype="input" placeholder="机构码" name="bankNo"></yu-xform-item>
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="bankName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="bankTable" row-number row-key="pkId" condition-key="condition" :data-url="urls.ctrLoanInfoUrl" :base-params="Param" request-type="POST" :default-load="false" :pageable="true">
        <yu-xtable-column label="机构码" prop="bankNo"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="bankName"></yu-xtable-column>
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
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
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
      _this.aorgNo = this.data.aorgNo;
      if (_this.aorgNo == null || _this.aorgNo == '') {
        _this.urls.ctrLoanInfoUrl = backend.cmisCfg + '/api/cfgbankinfo/selectbymodel';
        _this.Param = {
          condition: JSON.stringify({
            bankNo: _this.aorgNo
          })
        };
      } else {
        _this.urls.ctrLoanInfoUrl = backend.cmisCfg + '/api/cfgbankinfo/querycfgbankinfodatabyparams';
        _this.Param = {bankNo: _this.aorgNo};
      }
    },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.bankTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.bankTable.selections[0];
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
