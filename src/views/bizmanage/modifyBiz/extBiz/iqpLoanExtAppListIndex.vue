<template>
    <div>
    <yu-panel title="展期业务申请" panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button  @click="doAdd" v-if="btnVisiabled">新增</yu-button>
          <yu-button  @click="doUpdate(true)" v-if="btnVisiabled">修改</yu-button>
          <yu-button @click="doDelete" v-if="btnVisiabled">删除</yu-button>
          <yu-button @click="doUpdate(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="post">
        <yu-xtable-column label="展期申请流水号" prop="extSerno"></yu-xtable-column>
        <yu-xtable-column label="原借据编号" prop="oldBillNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="原币种" prop="fountCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="展期金额" prop="extAmt"></yu-xtable-column>
        <yu-xtable-column label="展期终止日期" prop="extEndDate"></yu-xtable-column>
        <yu-xtable-column label="展期执行利率（年）" prop="extRealityIrY"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_CUR_TYP');
export default {
  props: {
    pageParams: Object
  },
  data () {
    return {
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqploanextapp/queryIqpLoanExtAppList',
      baseParams: {condition: {}},
      btnVisiabled: true
    };
  },
  created: function () {
    this.baseParams.condition = {'contNo': this.pageParams.contNo};
  },
  mounted () {
    // 模板工厂查询的时候操作按钮不可见
    if (this.pageParams.opType === 'VIEW') {
      this.btnVisiabled = false;
    }
  },
  methods: {
    /** 借据维度展期申请 操作*/
    // 新增
    doAdd () {
      let params = {};
      params.contNo = this.pageParams.contNo;
      params.contSerno = this.pageParams.contSerno;
      params.opType = 'ADD';
      // this.$dialog.open(
      //   '展期业务申请页面',
      //   'bizmanage/iqpExtBiz/iqpLoanExtApp/iqpLoanExtAppAddIndex',
      //   800,
      //   600,
      //   params,
      //   () => {
      //     this.$refs.refTable.remoteData();
      //   }
      // );
      params.callback = this.refreshTable;
      this.opendTab(params, '展期业务申请页面', params.contNo);
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'bizmanage/iqpExtBiz/iqpLoanExtApp/iqpLoanExtAppAddIndex',
        key: 'custom_view_' + key,
        title: title,
        data: params
      });
    },
    refreshTable: function () {
      this.$refs.refTable.remoteData();
    },
    // 修改
    doUpdate (updateFlag) {
      let params = this.$refs.refTable.selections;

      if (params == null || params.length == 0) {
        this.$message('必须选择一条记录进行操作!');
        return;
      }
      params = yufp.clone(this.$refs.refTable.selections[0], {});
      params['opType'] = updateFlag ? 'EDIT' : 'VIEW';
      params.callback = this.refreshTable;
      this.opendTab(params, '展期业务申请修改', params.contNo);
    },

    // 删除
    doDelete () {
      let params = this.$refs.refTable.selections;
      if (params == null) {
        this.$message('必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      // 调用后端的删除逻辑，删除相关的关系表数据
      this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          // 调用后端的删除逻辑，删除相关的关系表数据
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/iqploanextapp/delete/deleteIqpLoanExtAppByExtSerno',
            data: {'extSerno': params.extSerno},
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                  // 列表刷新
                  this.$refs.refTable.remoteData();
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            }
          });
        }
      });
    },
    refreshBillListData () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
