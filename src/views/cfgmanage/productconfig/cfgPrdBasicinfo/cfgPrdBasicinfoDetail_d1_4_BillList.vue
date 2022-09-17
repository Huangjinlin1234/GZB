<template>
  <div>
    <yu-panel title="产品适用数据流列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="数据流编号" ctype="yu-xdata-flow" placeholder="数据流编号" name="dataFlowId" @select-fn="commonSelectFn" :mapping="{ dataFlowName: 'dataFlowName', dataFlowId: 'dataFlowId' }" width="680" height="480" :parms="{ 'dataFlowId not in (select dataFlowId from cfgPrdDataFlowRel where prdId': '${prdId})' }"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="tab4AddFn">新增</yu-button>
          <yu-button ref="btn_$delete" @click="tab4DeleteFn">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
        <yu-xtable-column label="数据流编号" prop="dataFlowId"></yu-xtable-column>
        <yu-xtable-column label="数据流名称" prop="dataFlowName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard-tab4 ref="dialog_BillCard" :prdId="prdId"></dialog-billcard-tab4>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcardTab4 from './cfgPrdBasicinfoDetail_dialog_BillCard_tab4';
export default {
  name: 'D14BillList',
  components: { dialogBillcardTab4 },
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      searchFormdata: {},
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgprddataflowrel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgprddataflowrel/delete/',
      prdId: ''
    };
  },
  mounted () {
  //  this.searchFormdata = { prdId: this.pageParams.prdId };
    this.$lookup.reg('DATA_STS', 'STD_ZB_YES_NO', 'STD_ZB_PUTOUT_TYP', 'STD_ZB_OPR_TYPE', 'STD_ZB_APPLY_RANGE', 'STD_ZB_APPLY_TYP', 'STD_ZB_CHNL_SOUR', 'STD_ZB_FILE_TYPE');
  },
  methods: {
    // 新增
    tab4AddFn () {
      this.dialogTitle = '新增';
      this.dialogVisible = true;

      this.prdId = this.pageParams.prdId;
      this.formType = 'ADD';
      this.$nextTick(() => {
        this.$refs['dialog_BillCard'].formType = 'edit';
        this.$refs['dialog_BillCard'].$refs.refForm.resetFields();
        this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula && this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula();
        this.$refs['dialog_BillCard'].initFormData && this.$refs['dialog_BillCard'].initFormData();
      });
    },
    // 删除
    tab4DeleteFn () {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: function (action) {
          if (action === 'confirm') {
            _this
              .$request({
                url: _this.deleteUrl + '/' + row[_this.pkField],
                method: 'post'
              })
              .then(response => {
                if (response.code == '0') {
                  _this.doAutoQuery();
                  _this.$message('删除成功!');
                }
              })
              .catch(() => {
                // 处理请求失败的情况
                _this.$message({ message: '删除失败!', type: 'error' });
              });
          }
        }
      });
    }
  }
};
</script>
