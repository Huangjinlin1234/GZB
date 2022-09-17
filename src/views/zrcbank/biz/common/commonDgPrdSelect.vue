
<template>
  <div>
    <yu-panel title="适用产品" panel-type="simple">
      <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" :data-url="urls.dataUrl" :default-load="true" condition-key="condition" :base-params="Param" height="500px">
        <yu-xtable-column label="产品编号" prop="prdId" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="目录层级" prop="catalogLevelName" show-overflow-tooltip="true"></yu-xtable-column>
        <yu-xtable-column label="产品版本号" prop="prdVersion"></yu-xtable-column>
        <yu-xtable-column label="生效日期" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="失效日期" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="产品状态" prop="prdStatus" width="100" data-code="DATA_STS"></yu-xtable-column>
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
        dataUrl: ''
      },
      formdata: {},
      saveBtnShow: true,
      Param: {}
    };
  },
  created () {
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
      _this.prdType = this.data.prdType;
      _this.cusCatalog = this.data.cusCatalog;
      _this.urls.dataUrl = this.$backend.cmisCfg + '/api/cfgprdbasicinfo/selectcfgprdbasicinfodata';
      _this.Param = {condition: { prdStatus: 'A', prdBelgLine: '03', cusCatalog: _this.cusCatalog, prdType: _this.prdType}};
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