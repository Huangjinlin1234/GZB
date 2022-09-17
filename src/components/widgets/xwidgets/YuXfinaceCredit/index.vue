<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="融资性担保公司授信协议">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="融资协议编号" prop="finCtrNo" width="100"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" width="100"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="授信类型" prop="lmtType" width="100" data-code="STD_ZB_LMT_TYP"></yu-xtable-column>
          <yu-xtable-column label="担保类别" prop="guarType" width="100" data-code="STD_ZB_GUAR_TYP"></yu-xtable-column>
          <yu-xtable-column label="评级结果" prop="evalResult" width="100" data-code="STD_ZB_CREDIT_GRADE"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="担保金额" prop="guarAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="单户限额" prop="singleAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="授信起始日期" prop="lmtStarDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="授信到期日期" prop="lmtEndDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="协议状态" prop="agrStatus" width="100" data-code="STD_ZB_CTR_ST"></yu-xtable-column>
          <yu-xtable-column label="融资协议名称" prop="finCtrName" width="100"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
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
  name: 'YuXfinaceCredit',
  componentName: 'YuXfinaceCredit',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusName'
    };
  }
};
</script>
