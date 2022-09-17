
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="分项品种选择" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" row-number row-key="pkId" condition-key="condition" :data-url="urls.repayPlanInfoUrl" :base-params="Param" request-type="POST" :default-load="false">
        <yu-xtable-column label="分项品种编号" prop="apprSubPrdSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="授信品种分项品种编号" prop="subPrdSerno" ></yu-xtable-column>
        <yu-xtable-column label="分项编号" prop="approveSubSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="授信品种类型名称" prop="lmtBizTypeName"></yu-xtable-column>
        <yu-xtable-column label="授信品种类型" prop="lmtBizType" hide-column></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="额度期限" prop="lmtTerm"></yu-xtable-column>

    </yu-xtable>
    <div class="yu-grpButton">
        <yu-button icon="check" type="primary" @click="backToAdd">选取返回</yu-button>
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
        repayPlanInfoUrl: ''
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
      _this.urls.repayPlanInfoUrl = backend.cmisBiz + '/api/lmtappr/queryLmtApprSubDataBySerno';// backend.cmisBiz + '/api/lmtappsubprd/selectAppSubPrdBySerno';
      _this.Param = {serno: serno, repayPlanDesc: '01'};
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
      debugger;
      const params = _this.$refs.refTable.selections[0];
      _this.$dialog.close(_this.dialogId, params);
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
