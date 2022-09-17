<template>
  <div>
    <yu-panel title="抵质押物信息" panel-type="normal">
        <yu-toolbar>
          <yu-button type="primary" @click="customClick('OnImport')" v-if="type!='VIEW'">引入押品</yu-button>
          <yu-button type="primary" @click="customClick('deleteGuar')" v-if="type!='VIEW'">取消引入</yu-button>
          <yu-button type="primary" @click="customClick('doGuarUpdate')" v-if="type!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="customClick('doGuarView')">查看</yu-button>
        </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition"  request-type="post" selection-type="radio" :base-params="searchData" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="押品编号" prop="guarNo">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewGuar(scope.row.guarNo)">{{ scope.row.guarNo }}</a>
            </template>
        </yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="guarTypeCd" :formatter="guarTypeCdFormatter"></yu-xtable-column>
        <yu-xtable-column label="抵质押品所有人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="我行可用价值" prop="maxMortagageAmt" ></yu-xtable-column>
        <yu-xtable-column label="对应融资金额" prop="correFinAmt" ></yu-xtable-column>
        <yu-xtable-column label="抵/质押率" prop="mortagageRate" >
        <template slot-scope="scope">
        {{ isNaN(formatterNum(scope.row.mortagageRate))? '':formatterNum(scope.row.mortagageRate *100)+'%' }}
      </template>
        </yu-xtable-column>
        <yu-xtable-column label="担保标识" prop="isAddGuar" data-code="STD_GUAR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
     <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GUAR_TYPE');
import mixinList from '@/utils/mixins/mixin-list';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';

export default {
  components: {guarBaseInfoView},
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {
        serno: this.getFactory().contextData.subSerno
      }},
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/querguarinforel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/',
      type: this.getFactory().contextData.op,
      DZDataObject: {}
    };
  },
  methods: {
    viewGuar: function (data) {
      this.$refs.guarBaseInfoView.guarBaseinfoView(data);
    },
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed(2));
    },
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0) {
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
    }
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      data: {
        optType: 'STD_DZY_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data, this.DZData);
        console.log('res.data------------->', res.data);
      }
    });
  }
};
</script>
