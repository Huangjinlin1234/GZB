<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="管户客户经理信息">
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户经理" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="管理类型 std_zb_mgr_" prop="mgrType"></yu-xtable-column>
          <yu-xtable-column label="状态 ia_norm_sts" prop="status"></yu-xtable-column>
          <yu-xtable-column label="主管经理所属机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="起始日期" prop="startDate"></yu-xtable-column>
          <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="更新人" prop="updId"></yu-xtable-column>
          <yu-xtable-column label="更新机构" prop="updBrId"></yu-xtable-column>
          <yu-xtable-column label="更新日期" prop="updDate"></yu-xtable-column>
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
  name: 'YuXcusManager',
  componentName: 'YuXcusManager',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cuspubmanagerinfo/',
      // 表格中传出id数据的key
      queryCode: 'managerId',
      // 表格中显示到input框中的字段key
      textCode: 'managerId'
    };
  }
};
</script>
