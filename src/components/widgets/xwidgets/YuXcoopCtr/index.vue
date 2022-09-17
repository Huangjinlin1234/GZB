<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="合作方额度协议">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="合作方客户名称" ctype="input" placeholder="合作方客户名称" name="coopCusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="授信协议编号" prop="lmtCtrNo" width="100"></yu-xtable-column>
          <yu-xtable-column label="合作方客户编号" prop="coopCusId" width="100"></yu-xtable-column>
          <yu-xtable-column label="合作方客户名称" prop="coopCusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="合作方类型" prop="coopType" width="100" data-code="STD_ZB_COOP_TYP"></yu-xtable-column>
          <yu-xtable-column label="共享范围" prop="sharedScope" width="100.00px" data-code="STD_ZB_SHR_SCOPE"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="授信额度" prop="lmtAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="单户限额" prop="sigAmt" width="100"></yu-xtable-column>
          <yu-xtable-column label="授信起始日期" prop="lmtStarDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="授信到期日" prop="lmtEndDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="协议状态" prop="agrStatus" width="100" data-code="STD_ZB_CTR_ST"></yu-xtable-column>
          <yu-xtable-column label="合作方授信协议名称" prop="lmtCtrName" width="100"></yu-xtable-column>
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
  name: 'YuXcoopCtr',
  componentName: 'YuXcoopCtr',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.yuxpservice + '/api/cusbase/',
      // 表格中传出id数据的key
      queryCode: 'coopCusId',
      // 表格中显示到input框中的字段key
      textCode: 'coopCusName'
    };
  }
};
</script>
