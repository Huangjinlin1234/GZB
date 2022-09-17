/**
 * @created by hanl 2021-07-25
 * @updated by
 * @description
 */
<template>
  <div class="org-list">
    <yu-panel :collapse-hide="false">
      <yu-panel ref="panel" class="adjust-height" :collapse-hide="false">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="orgTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgCode" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel ref="panel" title="" color="red" class="adjust-height" :collapse-hide="false">
          <yu-xtable ref="orgTable" row-number :data-url="listUrl" :base-params="searchData" requestType="POST" selection-type="checkbox" condition-key="condition" :default-load="false">
            <yu-xtable-column label="机构名称" prop="orgName" ></yu-xtable-column>
            <yu-xtable-column label="机构编号" prop="orgId"></yu-xtable-column>
            <yu-xtable-column label="状态" prop="instuSts" data-code="DATA_STS"> </yu-xtable-column>
          </yu-xtable>
        <div style="text-align:center;">
        <yu-toolBar>
          <yu-button type="primary" @click="confirmFn">确认</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import { mapGetters } from 'vuex';
lookup.reg('DATA_STS');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      applyFormdata: {},
      listUrl: backend.appOcaService + '/api/adminsmorg/querypagebyall',
      preformdata: {},
      viewType: 'DETAIL',
      searchData: { }
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      if(_this.pageParams.isWholeBankSuit == '1'){
        _this.searchData = {
          condition: JSON.stringify({ orgCode: '000000' })
        }
      } else {
        //_this.searchData = { }
        // 获取当前主发起行的机构
        const loginUser = _this.$xutils.getLoginUserInfo();
        const orgCode = loginUser.orgCode;
        let orgCodeParam = orgCode.substring(0, 2) + '%';
        _this.searchData = {
          condition: JSON.stringify({ orgCode: orgCodeParam })
        }
      }
    },
    confirmFn: function () {
      let selections = this.$refs.orgTable.selections;
      if (selections.length === 0) {
        return this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
      var _this = this;
      _this.$route.params.selectedData = selections;
      this.$xutils.getParentPage(
        this
      );
      _this.$dialog.close(this.dialogId);
    },
    // 返回
    returnFn: function () {
      this.$dialog.close(this.dialogId);
    }

  }
};
</script>
<style scoped>
.psp-task-list {
  height: 100%;
}
</style>
