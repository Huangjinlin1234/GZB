<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width">
      <yu-panel title="客户额度选取" panel-type="simple">
        <yu-tabs v-model="tabName">
          <yu-tab-pane label="法人额度" name="corp">
            <yu-xform form-type="search" v-model="searchFormdataCorp" label-width="100px" related-table-name="refTableCorp">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-xtable ref="refTableCorp" :row-number="true" selection-type="radio" :pageable="true" :data-url="corpdataUrl" condition-key="condition" :base-params="baseParamsCorp" request-type="POST">
              <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="授信总额" prop="totalAmt"></yu-xtable-column>
              <yu-xtable-column label="授信已用额度" prop="totalUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口已用额度" prop="totalSpacUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt"></yu-xtable-column>
            </yu-xtable>
            <div style="text-align:center;">
              <el-button type="primary" @click="backToAddCorp" size="small">确认</el-button>
              <el-button @click="cancel" size="small">取消</el-button>
            </div>
          </yu-tab-pane>
          <yu-tab-pane label="个人额度" name="pers">
            <yu-xform form-type="search" v-model="searchFormdataPers" label-width="100px" related-table-name="refTablePers">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-xtable ref="refTablePers" :row-number="true" selection-type="radio" :pageable="true" :data-url="persdataUrl" condition-key="condition" :base-params="baseParamsPers" request-type="POST">
              <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="授信总额" prop="totalAmt"></yu-xtable-column>
              <yu-xtable-column label="授信已用额度" prop="totalUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口已用额度" prop="totalSpacUseAmt"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt"></yu-xtable-column>
            </yu-xtable>
            <div style="text-align:center;">
              <el-button type="primary" @click="backToAddPers" size="small">确认</el-button>
              <el-button @click="cancel" size="small">取消</el-button>
            </div>
          </yu-tab-pane>
        </yu-tabs>
      </yu-panel>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" request-type="post" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import * as xutil from '@/utils/xutils';
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YufpLmtcusSelector',
  componentName: 'YufpLmtcusSelector',
  mixins: [popList],
  data: function () {
    return {
      tabName: 'corp',
      baseParamsCorp: {condition: JSON.stringify({ cusType: '2', oprType: '01' })},
      baseParamsPers: {condition: JSON.stringify({ cusType: '1', oprType: '01' })},
      corpdataUrl: backend.cmisLmt + '/api/apprstrmtableinfo/selectStrInfoByList',
      persdataUrl: backend.cmisLmt + '/api/apprstrmtableinfo/selectStrInfoByList',
      baseParams: {},
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusName'
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
     * 法人选取返回
     */
    backToAddCorp () {
      debugger;
      var _this = this;
      if (_this.$refs.refTableCorp.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTableCorp.selections[0];
      this.$emit('select-fn', params);
      this.visiable = false;
    },
    /**
     * 个人选取返回
     */
    backToAddPers () {
      var _this = this;
      if (_this.$refs.refTablePers.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTablePers.selections[0];
      this.$emit('select-fn', params);
      this.visiable = false;
    },
    /**
     * 取消
     */
    cancel () {
      this.visiable = false;
    }
  }
};
</script>
