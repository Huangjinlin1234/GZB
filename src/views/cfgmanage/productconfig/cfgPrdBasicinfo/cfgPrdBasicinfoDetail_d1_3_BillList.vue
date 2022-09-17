<template>
  <div>
    <yu-panel title="产品适用渠道列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="渠道编号" ctype="yu-xchnl-mrg" placeholder="渠道编号" name="chnlId" @select-fn="commonSelectFn" :mapping="{ chnlCode: 'chnlId', chnlName: 'chnlName' }" width="680" height="480" :parms="{ 'chnlCode not in (select chnlId from cfgPrdChnlRel where prdId': '${prdId})' }"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="tab3AddFn">新增</yu-button>
          <yu-button ref="btn_$update" @click="tab3UpdateFn">修改</yu-button>
          <yu-button ref="btn_$delete" @click="tab3DeleteFn">删除</yu-button>
          <yu-button ref="btn_$query" @click="tab3ViewFn">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
        <yu-xtable-column label="渠道编号" prop="chnlId"></yu-xtable-column>
        <yu-xtable-column label="渠道名称" prop="chnlName"></yu-xtable-column>
        <yu-xtable-column label="渠道标识" prop="chnlFlag" data-code="STD_ZB_CHNL_SOUR"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="isBegin" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard-tab3 ref="dialog_BillCard" :prdId="prdId"></dialog-billcard-tab3>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcardTab3 from './cfgPrdBasicinfoDetail_dialog_BillCard_tab3';
export default {
  name: 'D13BillList',
  components: { dialogBillcardTab3 },
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
      dataUrl: this.$backend.cmisCfg + '/api/cfgprdchnlrel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgprdchnlrel/delete/',
      prdId: ''
    };
  },
  mounted () {
  //  this.searchFormdata = { prdId: this.pageParams.prdId };
    this.$lookup.reg('DATA_STS', 'STD_ZB_YES_NO', 'STD_ZB_PUTOUT_TYP', 'STD_ZB_OPR_TYPE', 'STD_ZB_APPLY_RANGE', 'STD_ZB_APPLY_TYP', 'STD_ZB_CHNL_SOUR', 'STD_ZB_FILE_TYPE');
  },
  methods: {
    // 新增
    tab3AddFn () {
      this.dialogTitle = '新增';
      this.dialogVisible = true;

      this.prdId = this.pageParams.prdId;
      this.searchFormdata = { prdId: this.pageParams.prdId };
      this.formType = 'ADD';
      this.$nextTick(() => {
        this.$refs['dialog_BillCard'].formType = 'edit';
        this.$refs['dialog_BillCard'].$refs.refForm.resetFields();
        this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula && this.$refs['dialog_BillCard'].execBillCardDefaultValueFormula();
        this.$refs['dialog_BillCard'].initFormData && this.$refs['dialog_BillCard'].initFormData();
      });
    },

    // 修改
    tab3UpdateFn () {
      debugger;
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }

      this.dialogTitle = '修改';

      this.formType = 'EDIT';

      this.dialogVisible = true;
      this.$nextTick(function () {
        this['dialog_BillCard'] = this.$refs['dialog_BillCard'];
        this['dialog_BillCard'].$refs.refForm.resetFields();
        this.$nextTick(function () {
          if (this.formType == 'EDIT') {
            this['dialog_BillCard'].formType = 'edit';
          }
          this.$xutils.clone(row, this['dialog_BillCard'].formdata);
          if (this.formType == 'VIEW') {
            this['dialog_BillCard'].formType = 'details';
          }
        });
      });
    },

    // 删除
    tab3DeleteFn () {
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
    },

    // 查看
    tab3ViewFn () {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      this.dialogTitle = '查看';

      this.formType = 'VIEW';

      this.dialogVisible = true;
      this.$nextTick(function () {
        this['dialog_BillCard'] = this.$refs['dialog_BillCard'];
        this['dialog_BillCard'].$refs.refForm.resetFields();
        this.$nextTick(function () {
          if (this.formType == 'EDIT') {
            this['dialog_BillCard'].formType = 'edit';
          }
          this.$xutils.clone(row, this['dialog_BillCard'].formdata);
          if (this.formType == 'VIEW') {
            this['dialog_BillCard'].formType = 'details';
          }
        });
      });
    }
  }
};
</script>
