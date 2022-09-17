<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="企业经营详细信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="企业名称" ctype="input" placeholder="企业名称" name="companyName"></yu-xform-item>
            <yu-xform-item label="统一社会信用代码" ctype="input" placeholder="统一社会信用代码" name="unifyCreditCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="企业名称" prop="companyName" width="200"></yu-xtable-column>
          <yu-xtable-column label="统一社会信用代码" prop="unifyCreditCode" width="200"></yu-xtable-column>
          <yu-xtable-column label="企业性质" prop="companyType" width="200" data-code="STD_ZB_CORP_QLTY"></yu-xtable-column>
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
  name: 'YuXapptMgr',
  componentName: 'YuXapptMgr',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.cmisChnl + '/api/lcapptselfmgr/',
      // 表格中传出id数据的key
      queryCode: 'companyName',
      // 表格中显示到input框中的字段key
      textCode: 'companyName'
    };
  }
};
</script>
