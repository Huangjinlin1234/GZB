<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="关联方名单信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="关联方类型" ctype="select" data-code="STD_ZB_RELATED_PARTY_TYPE" placeholder="关联方类型" name="relatedPartyType"></yu-xform-item>
            <yu-xform-item label="关联方名称" ctype="input" placeholder="关联方名称" name="relatedPartyName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="关联方类型" prop="relatedPartyType" data-code="STD_ZB_RELATED_PARTY_TYPE"></yu-xtable-column>
          <yu-xtable-column label="关联方名称" prop="relatedPartyName"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="归属组别" prop="belongGroup"  data-code="STD_BELONG_GROUP" ></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
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
  name: 'YuXlstGlf',
  componentName: 'YuXlstGlf',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cuslstglf/',
      // 表格中传出id数据的key
      queryCode: 'relatedPartyType',
      // 表格中显示到input框中的字段key
      textCode: 'relatedPartyName'
    };
  }
};
</script>
