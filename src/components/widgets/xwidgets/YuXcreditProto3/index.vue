<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="授信协议">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="授信协议编号" ctype="input" placeholder="授信协议编号" name="lmtCtrNo"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="授信协议编号" prop="lmtCtrNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="授信类型" prop="lmtType"></yu-xtable-column>
          <yu-xtable-column label="授信总额度" prop="lmtTotlAmt"></yu-xtable-column>
          <yu-xtable-column label="低风险业务类型" prop="lowRiskType" data-code="STD_ZB_LOW_RISK_TYP"></yu-xtable-column>
          <yu-xtable-column label="授信起始日期" prop="lmtStarDate"></yu-xtable-column>
          <yu-xtable-column label="授信到期日期" prop="lmtEndDate"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="协议状态" prop="agrStatus" data-code="STD_ZB_CTR_ST"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrName" width="100"></yu-xtable-column>
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
  name: 'YuXcreditProto3',
  componentName: 'YuXcreditProto3',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisLmt + '/api/lmtctr/',
      // 表格中传出id数据的key
      queryCode: 'lmtCtrNo',
      // 表格中显示到input框中的字段key
      textCode: 'lmtCtrNo'
    };
  }
};
</script>
