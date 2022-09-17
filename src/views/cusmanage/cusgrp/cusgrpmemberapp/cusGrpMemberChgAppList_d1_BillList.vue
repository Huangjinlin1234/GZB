<template>
  <div>
    <yu-panel title="集团成员列表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="customClick('doAdd')">新增成员</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改成员</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除成员</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看成员</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" request-type="post" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition:{'oprType':'01'}}" :default-load="false">
        <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="集团关联关系类型" prop="grpCorreType" data-code="STD_ZB_GRP_CORRE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="主管经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管部门" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="变更类型" prop="modifyType" data-code="STD_CUS_MODIFY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="conStatus" v-if="!onlyView">
          <template slot-scope="scope">
            <yu-button @click="recovery(scope.row)" type="text" size="small" v-if="scope.row.modifyType == '03'">恢复</yu-button>
            <yu-button @click="bowOut(scope.row)" type="text" size="small" v-if="scope.row.modifyType == '01'">退出</yu-button>
            <yu-button @click="dele(scope.row)" type="text" size="small" v-if="scope.row.modifyType == '02'">删除</yu-button>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="是否保留集团额度" prop="reserveGrpLimitInd" v-if="!onlyView" >
          <template slot-scope="scope">
            <yu-xradio @change="reserveGrpLimit($event,scope.row)" v-model="scope.row.reserveGrpLimitInd" data-code="STD_ZB_YES_NO" size="small" v-if="scope.row.modifyType == '03'"></yu-xradio>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_CUS_MODIFY_TYPE,STD_ZB_GRP_CORRE_TYPE,STD_ZB_YES_NO');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusgrpmemberapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusgrpmemberapp/delete/',
      onlyView : false
    };
  },
  created () {
    this.onlyView = this.getFactory().contextData.op == 'view' || (this.getFactory().contextData.flowParam && this.getFactory().contextData.flowParam.op == 'view');
  },
  methods: {
    // 恢复
    recovery (rowData) {
      this.$request({
        url: this.$backend.cmisCus + '/api/cusgrpmemberapp/update',
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
      var length = this.$refs.refTable.$children[0].data.length;
      if(length == '2'){
        this.$xutils.showMsgBox('提示', '集团客户必须保留至少两个客户!');
        return;
      }
      if (rowData.grpCorreType == '3') {
        this.$xutils.showMsgBox('提示', '核心成员不允许退出!');
        return;
      }
      this.$request({
        url: this.$backend.cmisCus + '/api/cusgrpmemberapp/update',
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
        url: this.$backend.cmisCus + '/api/cusgrpmemberapp/delete',
        method: 'POST',
        data: rowData.pkId
      }).then((response) => {
        if (response.code == '0') {
          this.queryDataByCondition({ serno: rowData.serno });
        } else {
          this.$message({message: response.message || '操作失败', type: 'error'});
        }
      });
    },
    //是否保留集团额度
    reserveGrpLimit (val, rowData) {
      console.info(rowData);
      console.info(val);
      this.$request({
        url: this.$backend.cmisCus + '/api/cusgrpmemberapp/update',
          method: 'POST',
          data: {pkId: rowData.pkId, reserveGrpLimitInd: val}
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
