<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="业务规则方案">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务规则方案编号" ctype="input" placeholder="业务规则方案编号" name="planId"></yu-xform-item>
            <yu-xform-item label="业务规则方案名称" ctype="input" placeholder="业务规则方案名称" name="planName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="业务规则方案编号" prop="planId"></yu-xtable-column>
          <yu-xtable-column label="业务规则方案名称" prop="planName"></yu-xtable-column>
          <yu-xtable-column label="方案分类" prop="planType" data-code="STD_ZB_PLAN_TYPE"></yu-xtable-column>
          <yu-xtable-column label="拦截类型" prop="notiType" data-code="STD_ZB_NOTI_TYPE"></yu-xtable-column>
          <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="是否适用流程" prop="usedFlow" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="是否自动规则" prop="usedAuto" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXbinsRule1',
  componentName: 'YuXbinsRule1',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/cfgbizruleplan/',
      // 表格中传出id数据的key
      queryCode: 'planId',
      // 表格中显示到input框中的字段key
      textCode: 'planName'
    };
  }
};
</script>
