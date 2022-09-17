<template>
  <div>
    <yu-panel title="产品适用合同模版列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="文档模板编号" ctype="yu-xcont-tpl" placeholder="文档模板编号" name="fileTplNo" @select-fn="commonSelectFn" :mapping="{ contTplName: 'fileName', contTplCode: 'fileTplNo' }" width="680" height="480" :parms="{ '(contTplCode not in (select fileTplNo from cfgPrdFileTplRel where prdId': '${prdId}))', tplStatus: 'a' }"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="tab5AddFn">新增</yu-button>
          <yu-button ref="btn_$delete" @click="tab5DeleteFn">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01', fileTplClass: '02' }" :default-load="false">
        <yu-xtable-column label="文档模板分类" prop="fileTplClass" data-code="STD_ZB_FILE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="文档模板编号" prop="fileTplNo"></yu-xtable-column>
        <yu-xtable-column label="文档模板名称" prop="fileName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard-tab5 ref="dialog_BillCard" :prdId="pageParams.prdId"></dialog-billcard-tab5>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcardTab5 from './cfgPrdBasicinfoDetail_dialog_BillCard_tab5';
export default {
  name: 'D15BillList',
  components: { dialogBillcardTab5 },
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      searchFormdata: {},
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgprdfiletplrel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgprdfiletplrel/delete/'
    };
  },
  mounted () {
  //  this.searchFormdata = { prdId: this.pageParams.prdId };
    this.$lookup.reg('DATA_STS', 'STD_ZB_YES_NO', 'STD_ZB_PUTOUT_TYP', 'STD_ZB_OPR_TYPE', 'STD_ZB_APPLY_RANGE', 'STD_ZB_APPLY_TYP', 'STD_ZB_CHNL_SOUR', 'STD_ZB_FILE_TYPE');
  },
  methods: {
    // 新增
    tab5AddFn () {
      this.dialogTitle = '新增';
      this.dialogVisible = true;
      // this.prdId = this.pageParams.prdId;
      this.formType = 'ADD';
      this.$nextTick(() => {
        this.$refs['dialog_BillCard'].formType = 'edit';
        this.$refs['dialog_BillCard'].$refs.refForm.resetFields();
        this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula && this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula();
        this.$refs['dialog_BillCard'].initFormData && this.$refs['dialog_BillCard'].initFormData();
      });
    },
    // 删除
    tab5DeleteFn () {
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
