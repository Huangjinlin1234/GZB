/**
 * @created by hanl 2021-07-25
 * @updated by
 * @description
 */
<template>
  <div class="org-list">
    <yu-panel :collapse-hide="false">
      <yu-panel ref="panel" class="adjust-height" :collapse-hide="false">
          <yu-xform ref="searchForm" related-table-name="orgTable" v-model="searchFormdata" >
            <yu-xform-group :column="2">
              <yu-xform-item name="coopPrdId" label="合作产品编号" placeholder="合作产品编号"></yu-xform-item>
              <yu-xform-item name="coopPrdName" label="合作产品名称" placeholder="合作产品名称"></yu-xform-item>
            </yu-xform-group>
              <div class="button-group" align="center">
                <yu-button type="primary" @click="searchFn()" >查询</yu-button>
                <yu-button type="primary" @click="resetFn()">重置</yu-button>
              </div>
          </yu-xform>
      </yu-panel>
      <yu-panel ref="panel" title="" color="red" class="adjust-height" :collapse-hide="false">
        <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="get" :pageable="false" :data-url="dataUrl" :default-load="false" :base-params="baseParams">
          <yu-xtable-column label="产品名称" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP_COOP"></yu-xtable-column>
          <yu-xtable-column label="单个产品合作额度(元)" prop="singlePrdCoopLmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="单笔最低缴存金额(元)" prop="sigLowDepositAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="保证金比例(%)" prop="bailPerc"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
        <yu-toolBar>
          <yu-button type="primary" @click="nextFn">下一步</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import mixin from '@/utils/mixin';
import { mapGetters } from 'vuex';
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_PRD_TYPE_PROP_COOP');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  mixins: [mixinList, mixin],
  data () {
    return {
      applyFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/coopreplyaccsub/',
      addUrl: this.$backend.cmisBiz + '/api/coopreplyaccsub/',
      preformdata: {},
      viewType: 'DETAIL',
      searchData: {},
      baseParams: {
        condition: {}
      }
    };
  },
  mounted () {
    this.baseParams.condition.serno = this.pageParams.coopPlanSerno;
    this.$refs.refTable.remoteData();
  },
  methods: {
    confirmFn: function () {
      let selections = this.$refs.refTable.selections;
      if (selections.length === 0) {
        return this.$message({ message: '必须选择至少一条记录进行操作!', type: 'warning' });
      }
      var _this = this;
      let serno = this.$route.params.serno;
      let coopPlanNo = this.$route.params.coopPlanNo;
      selections.forEach(row => {
        row.pkId = null;
        row.serno = serno;
        row.coopPlanNo = coopPlanNo;
        _this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.addUrl,
          data: row,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      });
      _this.$dialog.close(this.dialogId);
    },
    // 条件查询
    searchFn: function () {
      this.searchFormdata.serno = this.$route.params.coopPlanSerno;
      this.$refs.refTable.remoteData({
        condition: JSON.stringify(this.searchFormdata)
      });
    },
    // 重置
    resetFn: function () {
      // 清空条件
      this.$refs.searchForm.resetFields();
    },
    // 返回
    returnFn: function () {
      this.$dialog.close(this.dialogId);
    },
    // 下一步到表单信息
    nextFn: function () {

    }

  }
};
</script>
<style scoped>
.psp-task-list {
  height: 100%;
}
</style>
