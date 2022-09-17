<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="授信额度台账">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtLimitNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="授信额度编号" prop="lmtLimitNo"></yu-xtable-column>
          <yu-xtable-column label="额度类型" prop="limitType" data-code="STD_ZB_LMT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
          <yu-xtable-column label="授信期限类型" prop="lmtTermType" data-code="STD_ZB_TERM_TYP"></yu-xtable-column>
          <yu-xtable-column label="授信期限" prop="lmtTerm"></yu-xtable-column>
          <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_ZB_LMT_APP_TYPE"></yu-xtable-column>
          <yu-xtable-column label="授信起始日期" prop="lmtStarDate"></yu-xtable-column>
          <yu-xtable-column label="授信到期日期" prop="lmtEndDate"></yu-xtable-column>
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
  name: 'YuXcreditBook',
  componentName: 'YuXcreditBook',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisLmt + '/api/lmtacc/',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusName'
    };
  }
};
</script>
