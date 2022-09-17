<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="社会关系信息">
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="与客户关系" prop="indivCusRel"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certNo"></yu-xtable-column>
          <yu-xtable-column label="姓名" prop="name"></yu-xtable-column>
          <yu-xtable-column label="性别" prop="sex"></yu-xtable-column>
          <yu-xtable-column label="年收入（元）" prop="yearn"></yu-xtable-column>
          <yu-xtable-column label="职业" prop="occu"></yu-xtable-column>
          <yu-xtable-column label="职务" prop="duty"></yu-xtable-column>
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
  name: 'YuXsocialRelate',
  componentName: 'YuXsocialRelate',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisCus + '/api/cusindivsocial/',
      // 表格中传出id数据的key
      queryCode: 'indivCusRel',
      // 表格中显示到input框中的字段key
      textCode: 'indivCusRel'
    };
  }
};
</script>
