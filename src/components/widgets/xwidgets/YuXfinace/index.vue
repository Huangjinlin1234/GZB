<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="金融机构">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="金融机构代码" ctype="input" placeholder="金融机构代码" name="instuCde"></yu-xform-item>
            <yu-xform-item label="金融机构名称" ctype="input" placeholder="金融机构名称" name="instuName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="金融机构代码" prop="instuCde"></yu-xtable-column>
          <yu-xtable-column label="金融机构名称" prop="instuName"></yu-xtable-column>
          <yu-xtable-column label="进入日期" prop="joinDt"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="instuSts" data-code="DATA_STS"></yu-xtable-column>
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
  name: 'YuXfinace',
  componentName: 'YuXfinace',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/adminsminstu/',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'cusName'
    };
  }
};
</script>
