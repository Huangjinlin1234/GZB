<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="功能点">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="90px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item name="modId" label="菜单模块" ctype="select" placeholder="请选择" :options="funcModels"></yu-xform-item>
            <yu-xform-item name="keyWord" label="功能点名称" ctype="input" placeholder="功能点名称"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams" height="520">
          <yu-xtable-column label="功能点ID" prop="funcId" width="200px"></yu-xtable-column>
          <yu-xtable-column label="功能点名称" prop="funcName" width="150px"></yu-xtable-column>
          <yu-xtable-column label="url链接" prop="funcUrl" min-width="200px"></yu-xtable-column>
        </yu-xtable>
        <div style="margin-top: 20px; text-align:center;">
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
  name: 'YuXfunc',
  componentName: 'YuXfunc',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/adminsmbusifunc/queryfunc',
      // 表格中传出id数据的key
      queryCode: 'funcId',
      // 表格中显示到input框中的字段key
      textCode: 'funcName',
      funcModels: [],
      requestType: 'GET'
    };
  },

  created () {
    this.getFuncModels();
  },

  methods: {
    getFuncModels () {
      this.$request({
        method: 'GET',
        url: backend.appOcaService + '/api/adminsmfuncmod/querymod',
        data: { page: 1, size: 1000 }
      }).then(({ code, message, data }) => {
        if (code === '0') {
          this.funcModels = data.map(function (item) {
            item.key = item.modId;
            item.value = item.modName;
            return item;
          });
        }
      });
    }
  }
};
</script>
