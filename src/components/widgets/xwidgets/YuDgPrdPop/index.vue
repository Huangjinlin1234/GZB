<!--对公专用产品Pop 严禁修改 WH -->
<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width">
      <yu-panel title="适用产品" panel-type="simple">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" height="500px">
          <yu-xtable-column label="产品编号" prop="prdId" width="100"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="目录层级" prop="catalogLevelName" show-overflow-tooltip="true"></yu-xtable-column>
          <yu-xtable-column label="产品版本号" prop="prdVersion"></yu-xtable-column>
          <yu-xtable-column label="生效日期" prop="startDate"></yu-xtable-column>
          <yu-xtable-column label="失效日期" prop="endDate"></yu-xtable-column>
          <yu-xtable-column label="产品状态" prop="prdStatus" width="100" data-code="DATA_STS"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
      </yu-panel>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search"
      @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import * as xutil from '@/utils/xutils';
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';

export default {
  name: 'YuDgPrdPop',
  componentName: 'YuDgPrdPop',
  mixins: [popList],
  props: {
    param: Object
  },
  data: function () {
    return {
      baseParams: {},
      dataUrl: backend.cmisCfg + '/api/cfgprdbasicinfo/selectbymodel',
      // 表格中传出id数据的key
      queryCode: 'prdId',
      // 表格中显示到input框中的字段key
      textCode: 'prdId',
      codeToText: false
    };
  },
  created: function () {
    var _this = this;
    if (_this.param) {
      _this.baseParams = {
        condition: { prdStatus: 'A', prdType: _this.param.prdType, prdBelgLine: '03', cusCatalog: _this.param.cusCatalog}
      };
    } else {
      _this.baseParams = { condition: { prdStatus: 'A' } };
    }
  }
};
</script>
