<template>
  <div>
    <yu-panel title="关联客户集团申请列表">
      <yu-xform ref="refForm" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onAdd2" @click="customClick('onAdd2')">新增</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="关联成员客户编号" prop="correMemCusNo"></yu-xtable-column>
        <yu-xtable-column label="关联成员客户名称" prop="correMemCusName"></yu-xtable-column>
        <yu-xtable-column label="关联关系类型" prop="correRelaType" data-code="STD_CORRE_RELA_TYPE"></yu-xtable-column>
        <yu-xtable-column label="关联关系说明" prop="correRelaExpl"></yu-xtable-column>
        <yu-xtable-column label="数据来源" prop="dataSour" data-code="STD_ZB_DATA_SOUR"></yu-xtable-column>
        <yu-xtable-column label="变更类型" prop="modifyType" data-code="STD_CUS_MODIFY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="conStatus">
          <template slot-scope="scope">
            <yu-button @click="recovery(scope.row)" type="text" size="small" v-if="scope.row.modifyType == '03'">恢复</yu-button>
            <yu-button @click="bowOut(scope.row)" type="text" size="small" v-if="scope.row.modifyType == '01'">退出</yu-button>
            <yu-button @click="dele(scope.row)" type="text" size="small" v-if="scope.row.modifyType == '02'">删除</yu-button>
          </template>
        </yu-xtable-column>
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
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CORRE_RELA_TYPE,STD_ZB_DATA_SOUR,STD_CUS_MODIFY_TYPE');
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
    // 恢复
    recovery (rowData) {
      this.$request({
        url: this.$backend.cmisCus + '/api/cusrelcusmemapp/updateSelect',
        method: 'POST',
        data: {pkId: rowData.pkId, modifyType: '01'}
      }).then((response) => {
        if (response.code == '0') {
          this.queryDataByCondition({ serno: rowData.serno });
        } else {
          this.$message({message: response.message || '操作失败', type: 'error'});
        }
      });
    },
    // 退出
    bowOut (rowData) {
      this.$request({
        url: this.$backend.cmisCus + '/api/cusrelcusmemapp/updateSelect',
        method: 'POST',
        data: {pkId: rowData.pkId, modifyType: '03'}
      }).then((response) => {
        if (response.code == '0') {
          this.queryDataByCondition({ serno: rowData.serno });
        } else {
          this.$message({message: response.message || '操作失败', type: 'error'});
        }
      });
    },
    // 删除
    dele (rowData) {
      this.$request({
        url: this.$backend.cmisCus + '/api/cusrelcusmemapp/delete/' + rowData.pkId,
        method: 'POST'
      }).then((response) => {
        if (response.code == '0') {
          this.queryDataByCondition({ serno: rowData.serno });
        } else {
          this.$message({message: response.message || '操作失败', type: 'error'});
        }
      });
    }
  }
};
</script>
