<template>
  <div>
    <yu-panel title="抵押物列表">
      <yu-xform v-if="false" ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4"> </yu-xform-group>
      </yu-xform>
      <template slot="right"> </template>
      <yu-xtable ref="refTable" request-type="post" row-number condition-key="condition" :base-params="baseParams"  selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @loaded="loadedFn" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="押品统一编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column label="抵质押标识" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="guarTypeCd" :formatter="guarTypeCdFormatter"></yu-xtable-column>
        <yu-xtable-column label="抵质押物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="押品评估价值" prop="evalAmt"></yu-xtable-column>
        <!--<yu-xtable-column label="认定价值" prop="confirmAmt"></yu-xtable-column>-->
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_GRT_FLAG');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/selectGuarBaseInfoByGuarContNo/',
      baseParams: {},
      DZDataObject: {} 
      // deleteUrl: this.$backend.cmisBiz + "/api//delete/"
    };
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      async: false,
      data: {
        optType: 'STD_DZY_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data.data, this.DZData);
        this.$refs.refTable.remoteData();
      }
    });
  },

  methods: {
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0 && (cellValue.indexOf('D') > -1 || cellValue.indexOf('Z') > -1)) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    },
    // 默认全选
    loadedFn () {
      this.$refs.refTable.selectAll();
    }
  }
};
</script>
