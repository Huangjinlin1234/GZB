<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="担保合同">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保合同编号" ctype="input" placeholder="担保合同编号" name="guarContNo"></yu-xform-item>
            <yu-xform-item label="借款人名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="担保合同编号 " prop="guarContNo"></yu-xtable-column>
          <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="guarAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="借款人名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerId" width="100"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrId" width="100"></yu-xtable-column>
          <yu-xtable-column label="合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
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
// yufp.lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
export default {
  name: 'YuXguarCont',
  componentName: 'YuXguarCont',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/grtguarcont/',
      // 表格中传出id数据的key
      queryCode: 'guarContNo',
      // 表格中显示到input框中的字段key
      textCode: 'guarContNo',
      baseParams: {condition: JSON.stringify({ guarContState: '101'}) }
    };
  },
  mounted () {
    this.condition = { guarContState: '101' };
  }
};
</script>
