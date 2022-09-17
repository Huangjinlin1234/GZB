<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="押品基本信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
          <yu-xform-group :column="2">
            <yu-xform-item label="抵押人" ctype="input" placeholder="抵押人" name="guarCusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="押品名称" ctype="input" placeholder="押品名称" name="pldimnMemo" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" requestType="POST">
          <yu-xtable-column label="押品统一编号" prop="guarNo" width="120"></yu-xtable-column>
          <yu-xtable-column label="抵质押标识" prop="grtFlag" width="120" data-code="STD_GRT_FLAG" ></yu-xtable-column>
          <yu-xtable-column label="担保分类名称" prop="newlabel" width="120"></yu-xtable-column>
          <yu-xtable-column label="抵押人" prop="guarCusName" ></yu-xtable-column>
          <yu-xtable-column label="押品名称" prop="pldimnMemo" width="120"></yu-xtable-column>
          <yu-xtable-column label="押品评估价值" prop="evalAmt" width="120"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
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
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'YuXcltrlBase1',
  componentName: 'YuXcltrlBase1',
  mixins: [popList, mixinForm],
  data: function () {
    return {
      dataParamsDic: {root: '', optType: 'STD_DZY_TYPE'},
      dataUrl: backend.cmisBiz + '/api/guarbaseinfo/allGuar',
      // 表格中传出id数据的key
      queryCode: 'guarNo',
      // 表格中显示到input框中的字段key
      textCode: 'guarNo',
      codeToText: false
    };
  },
  method: {
    commonSelectFn (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
      this.formdata.pldimnMemo = data.label;
    }
  }
};
</script>
