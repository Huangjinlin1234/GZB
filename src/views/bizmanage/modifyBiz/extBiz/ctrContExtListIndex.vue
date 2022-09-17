<template>
   <div>
    <yu-panel title="展期协议信息" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="oldContNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="" placeholder="合同金额" name="contAmt" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doSign" @click="doSign">签订</yu-button>
          <yu-button ref="btn_doInvalid" @click="doInvalid">作废</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="展期协议编号" prop="extCtrNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="oldContNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="贷款合同类型" prop="contType" data-code="STD_ZB_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="授信额度编号" prop="lmtNo"></yu-xtable-column>
        <yu-xtable-column label="纸质合同签订日期" prop="signDate"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="展期协议状态" prop="extCtrStatus" data-code="STD_ZB_CT"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CONT_TYPE,STD_ZB_CT');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      pkField: 'extCtrNo',
      searchFormdata: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/ctrcontext/queryCtrContExt',
      baseParams: {},
      logicDeleteUrl: this.$backend.cmisBiz + '/api/ctrcontext/update'
    };
  },
  mounted () {
  },
  methods: {

    // 签订/doSign;作废/doInvalid;查看/doView;
    doSign () {
      const json = [];
      json['op'] = 'VIEW';
      json['opType'] = 'view';
      json['model_group_no'] = 'CMG000426';

      this.$dialog.open(
        '展期协议签订',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1200,
        450,
        json,
        () => {}
      );
    },

    // 作废
    doInvalid () {
      var row = this.$refs.refTable.selections;
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      row = this.$refs.refTable.selections[0];
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.logicDeleteUrl;
            let keyValue = row[this.pkField];
            let data = {'oprType': '02'};
            data[this.pkField] = keyValue;
            _this.$request({
              url: url,
              method: 'post',
              data: data
            }).then((response) => {
              if (response.code == '0') {
                _this.$refs.refTable.remoteData();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    },

    // 查看
    doView () {
    }
  }
};
</script>
