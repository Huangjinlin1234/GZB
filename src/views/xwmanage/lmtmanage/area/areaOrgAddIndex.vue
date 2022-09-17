<template>
  <div>
    <yu-panel title="">
       <yu-xform ref="refForm" v-model="searchFormdata" :base-params="tableParams" related-table-name="refTable" form-type="search"  :remove-empty="true" >
        <yu-xform-group :column="4">
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName"></yu-xform-item>
          <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="机构名称" prop="orgName" width="300"></yu-xtable-column>
        <yu-xtable-column label="机构编号" prop="orgCode" width="150"></yu-xtable-column>
        <yu-xtable-column label="上级机构码" prop="upOrgId"></yu-xtable-column>
        <yu-xtable-column label="金融代码" prop="instuId"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="orgSts" data-code="DATA_STS"></yu-xtable-column>
      </yu-xtable>
      <div class="button-group" style="text-align:center">
        <yu-button type="primary" @click="doInsert"> 选取</yu-button>
        <yu-button type="primary" @click="cancel"> 取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
let jsoPar = '';

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl: backend.appOcaService + '/api/adminsmorg/querypagebyall',
      baseParams: {condition: {whData: ''}},
      parm: '',
      searchFormdata: {} // 查询表单数据
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      var tableData = this.pageParams.tableData;
      this.parm = this.pageParams.areaNo;
      var a = '';

      if (tableData.length > 0) {
        // 循环遍历
        for (var i = 0; i < tableData.length; i++) {
          if (i < tableData.length - 1) {
            a = a + tableData[i].orgNo + ',';
          } else {
            a = a + tableData[i].orgNo;
          }
        }
      }
      this.baseParams.condition.whData = a;
      this.$refs.refTable.remoteData();
    },
    /* 选取返回按钮  */
    doInsert () {
      jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 插入数据
      jsoPar['areaNo'] = this.parm;
      jsoPar['orgNo'] = this.$refs.refTable.selections[0].orgCode;
      this.$request({
        method: 'POST',
        url: this.$backend.cmisBiz + '/api/areaorg/insert',
        data: jsoPar
      }).then(({code, message, data}) => {
        if (data != null) {
          this.$dialog.close(this.dialogId);
          this.$xutils.showMsgBox('提示', '操作成功');
        } else {
          this.$xutils.showMsgBox('提示', '操作失败');
        }
      });
    },
    doSelect () {
      // this.$refs.refTable.remoteData(this.searchFormdata);
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
