<template>
  <div>
    <yu-panel title="关联客户集团申请列表" panel-type="simple">
      <yu-xform ref="refForm" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onAdd2" @click="customClick('onAdd2')">新增</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$delete" @click="doDelete">删除</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="关联成员客户编号" prop="correMemCusNo"></yu-xtable-column>
        <yu-xtable-column label="关联成员客户名称" prop="correMemCusName"></yu-xtable-column>
        <yu-xtable-column label="关联关系类型" prop="correRelaType" data-code="STD_CORRE_RELA_TYPE"></yu-xtable-column>
        <yu-xtable-column label="关联关系说明" prop="correRelaExpl"></yu-xtable-column>
        <yu-xtable-column label="数据来源" prop="dataSour" data-code="STD_ZB_DATA_SOUR"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="850px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusGuideApp2_dialog_BillCard';
import * as xutils from '@/utils/xutils.js';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CORRE_RELA_TYPE,STD_ZB_DATA_SOUR');
export default{
  name: 'D1BBillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusrelcusmemapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusrelcusmemapp/delete/'
    };
  },
  methods: {
    doDelete () {
      var _this = this;
      let params = _this.$refs.refTable.selections[0];

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.dataSour == '01') {
        _this.$xutils.showMsgBox('提示', '“数据来源=知识图谱”的关联成员，不允许删除');
        return;
      }

      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 删除数据
            yufp.service.request({
              method: 'POST',
              url: `${_this.$backend.cmisCus}/api/cusrelcusmemapp/delete/${params.pkId}`,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$xutils.showMsgBox('提示', '删除成功!', 500, 300, function () {
                    _this.$refs.refTable.remoteData();
                  });
                } else {
                  _this.$message({ message: response.message, type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    onBillListUpdate: function (event, onlyview) {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      if (row.dataSour == '01' && !onlyview) {
        this.$xutils.showMsgBox('提示', '“数据来源=知识图谱”的关联成员，不允许修改');
        return;
      }
      this.dialogTitle = onlyview === true ? '查看' : '修改';
      if (onlyview === true) {
        this.formType = 'VIEW';
      } else {
        this.formType = 'EDIT';
      }
      this.dialogVisible = true;
      this.$nextTick(function () {
        this['dialog_BillCard'] = this.$refs['dialog_BillCard'];
        this['dialog_BillCard'].$refs.refForm.resetFields();
        this.$nextTick(function () {
          if (this.formType == 'EDIT') {
            this['dialog_BillCard'].formType = 'edit';
          }
          xutils.clone(row, this['dialog_BillCard'].formdata);
          if (this['dialog_BillCard'].formdatautrace) {
            xutils.clone(row, this['dialog_BillCard'].formdatautrace);
            if (this['dialog_BillCard'].utrace === false) { this['dialog_BillCard'].utrace = true }
          }
          if (this.formType == 'VIEW') {
            this['dialog_BillCard'].formType = 'details';
          }
        });
      });
    }
  }
};
</script>
