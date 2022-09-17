<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="集团客户成员关系">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="集团编号" ctype="input" placeholder="集团编号" name="grpNo"></yu-xform-item>
            <yu-xform-item label="集团名称" ctype="input" placeholder="集团名称" name="grpName"></yu-xform-item>
            <yu-xform-item label="关联(集团)客户编号" ctype="input" placeholder="关联(集团)客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="关联(集团)客户名称" ctype="input" placeholder="关联(集团)客户名称" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="集团编号" prop="grpNo" width="200px"></yu-xtable-column>
          <yu-xtable-column label="集团名称" prop="grpName" width="200px"></yu-xtable-column>
          <yu-xtable-column label="关联(集团)客户编号" prop="cusId" width="200px"></yu-xtable-column>
          <yu-xtable-column label="关联(集团)客户名称" prop="cusName" width="200px"></yu-xtable-column>
          <yu-xtable-column label="是否有效" prop="availableInd" width="140px" data-code="STD_ZB_DATA_STS"></yu-xtable-column>
          <yu-xtable-column label="集团紧密程度" prop="grpCloselyDegree" width="100" data-code="STD_ZB_CLOSELY_DEGREE"></yu-xtable-column>
          <yu-xtable-column label="主管客户经理" prop="mainName" width="200px"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="mainBrName" width="200px"></yu-xtable-column>
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
  name: 'YuXgrpMember',
  componentName: 'YuXgrpMember',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cusgrpmember/',
      // 表格中传出id数据的key
      queryCode: 'grpNo',
      // 表格中显示到input框中的字段key
      textCode: 'grpName'
    };
  }
};
</script>
