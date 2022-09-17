<template>
  <div>
    <yu-panel title="关联押品信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <!-- <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button> -->
          <yu-button type="primary" ref="btn_checkInfo" @click="checkInfoFn">查看押品信息</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" request-type="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="押品统一编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column label="抵质押标识" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="guarTypeCd" :formatter="guarTypeCdFormatter"></yu-xtable-column>
        <yu-xtable-column label="抵质押物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="押品评估价值" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="担保分类代码" prop="guarTypeCd" hide-column></yu-xtable-column>
        <yu-xtable-column label="分项类型" prop="subType" hide-column></yu-xtable-column>
        <yu-xtable-column label="额度类型" prop="limitType" hide-column></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" hide-column></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" hide-column></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt" hide-column></yu-xtable-column>
        <yu-xtable-column label="授信起始日" prop="lmtStarDate" hide-column></yu-xtable-column>
        <yu-xtable-column label="授信到期日期" prop="lmtEndDate" hide-column></yu-xtable-column>
        <yu-xtable-column label="申请流水号" prop="serno" hide-column></yu-xtable-column>
       </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>  
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './ctrLmtRelGrtList_dialog_BillCard';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';
export default{
  name: 'D1ABillList',
  components: { dialogBillcard, guarBaseInfoView },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/queryguarbaseinfodatabyguarcontno',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/ctrlmtrel/delete/',
      DZDataObject: {}
    };
  },

  mounted () {
    var _this = this;
    var data = {};
    var guarContNo = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      guarContNo = data.param.guarContNo;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      guarContNo = data.guarContNo;
    }
    _this.baseParams = {condition: {guarContNo: guarContNo}};
  },
  methods: {
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
    },
    checkInfoFn () {
      let selections = this.$refs.refTable.selections;
      let params;
      if (selections == null || selections.length < 1) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      params = selections[0];    
     // this.$refs.guarBaseInfoView.guarBaseinfoView(params.guarNo);
    }
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
        console.log("res.data------------->", res.data);
        this.$refs.refTable.remoteData();
      }
    });
  } 
};
</script>
