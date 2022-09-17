<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="业务合同">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
            <yu-xform-item label="一级行业名称" ctype="input" placeholder="一级行业名称" name="oneLevelTradeName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
          <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
          <yu-xtable-column label="一级行业名称" prop="oneLevelTradeName"></yu-xtable-column>
          <yu-xtable-column label="细分行业名称" prop="detailsTradeName"></yu-xtable-column>
          <yu-xtable-column label="经营规模" prop="operScale"></yu-xtable-column>
          <yu-xtable-column label="经营规模单位" prop="operScaleUnit"></yu-xtable-column>
          <yu-xtable-column label="年销售收入" prop="yearSaleIncome"></yu-xtable-column>
          <yu-xtable-column label=" 年利润" prop="yearProfit"></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="最后修改人" prop="updId"></yu-xtable-column>
          <yu-xtable-column label="最后修改机构" prop="updBrId"></yu-xtable-column>
          <yu-xtable-column label="最后修改日期" prop="updDate"></yu-xtable-column>
          <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
          <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
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
  name: 'YuXlstYnd',
  componentName: 'YuXlstYnd',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cuslstyndjyxxapp/',
      // 表格中传出id数据的key
      queryCode: 'serno',
      // 表格中显示到input框中的字段key
      textCode: 'serno'
    };
  }
};
</script>
