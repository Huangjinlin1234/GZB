<template>
  <d1-billlist :page-params="pageParams" ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './grtCont_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      rowData: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       *
       担保合同列表
       *  @author 刘权
       */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // this.$route.meta.params 零售和小微取值 this.getFactory().contextData 对公
      if (this.$route.meta.params) {
        this.rowData = this.$route.meta.params;
        this.rowData['bizLine'] = this.rowData.belgLine;
        this.rowData['isOnlinePld'] = this.rowData.isOlPld;
      } else if (this.getFactory().contextData) {
        this.rowData = this.getFactory().contextData;
        this.rowData['bizLine'] = this.rowData.belgLine;
      }
      this.rowData['serno'] = this.rowData.iqpSerno ? this.rowData.iqpSerno : this.rowData.biz_serno;
      // contType 合同类型 1 一般 2 最高额  guarContType担保合同类型 B最高额 A 一般
      this.rowData['guarContType'] = this.rowData.contType && this.rowData.contType == '1' ? 'A' : 'B';
      this.rowData['guarWay'] = this.rowData.guarWay ? this.rowData.guarWay : '10';
      this.d1_BillList.setHidden(this.rowData.guarContType === 'B');
    },

    // 查询
    d1Query () {
      this.d1_BillList.queryDataByCondition({ guarContNo: this.rowData.serno});
    },

    // 新增担保合同向导页面
    insert () {
      var params = {};
      yufp.clone(this.rowData, params);
      params['type'] = 'ADD';
      if (this.getFactory().contextData) {
        params['guarStartDate'] = this.getFactory().contextData.startDate;
        params['guarEndDate'] = this.getFactory().contextData.endDate;
        if (this.getFactory().contextData.contNo) {
          params['contNo'] = this.getFactory().contextData.contNo;
        }
      } else {
        params['guarStartDate'] = this.pageParams.startDate;
        params['guarEndDate'] = this.pageParams.endDate;
        params['isOnlinePld'] = this.pageParams.isOnlinePld;
      }
      this.$dialog.open(
        '新增担保合同向导页面',
        'grtmanage/smallCreditManage/grtContListInsertIndex',
        900,
        650,
        params,
        () => {
          this.refreshBillListData();
        });
    },

    // 修改
    update () {
      let data = this.d1_BillList.getSelectedRowData();
      if (data == null || data == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      if (data.guarContState == 101) {
        this.$xutils.showMsgBox('提示', '只能修改未生效的合同!', 350, 150);
        return;
      }
      var params = {};
      yufp.clone(data, params);
      yufp.clone(this.rowData, params);
      let guarWay = '';
      params['guarContNo'] = data.guarContNo;
      params['type'] = 'EDIT';
      if (params.guarMode) {
        guarWay = params.guarMode;
      } else if (params.guarWay) {
        guarWay = params.guarWay;
      }
      var title = guarWay == '30' || guarWay == '40' ? '保证担保合同' : '抵质押担保合同';
      this.$dialog.open(
        title,
        'grtmanage/smallCreditManage/grtPldContIndex',
        1600,
        650,
        params,
        () => {
          this.refreshBillListData();
        });
    },

    // 签订
    sign () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      if (params.guarContState == '101') {
        this.$xutils.showMsgBox('提示', '只能签订未生效的合同!', 350, 150);
        return;
      }

      // 合同状态赋值已生效
      params.guarContState = '101';

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/grtguarcont/update',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        type: 'post',

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '签订成功', 350, 150, () => {
              // 列表刷新
              this.d1_BillList.queryDataByCondition();
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    },

    refreshBillListData () {
      this.d1_BillList.queryDataByCondition();
    },

    // 查看合同详情
    check () {
      let data = this.d1_BillList.getSelectedRowData();
      if (data == null || data == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      var params = {};
      yufp.clone(this.rowData, params);
      params['guarContNo'] = data.guarContNo;
      params['guarStartDate'] = data.guarStartDate;
      params['guarEndDate'] = data.guarEndDate;
      params['type'] = 'VIEW';
      var title = params.guarWay == '30' ? '保证担保合同' : '抵质押担保合同';
      this.$dialog.open(
        title,
        'grtmanage/smallCreditManage/grtPldContIndex',
        1600,
        650,
        params,
        null,
        true,
        true
      );
    },

    // 显示最高额担保合同按钮
    rowClick (rowData, rowId, rowNm, colNm, event) {
      if (rowData.guarContType != '01') {
        this.d1_BillList.max = false;
        // btnDom.style.display = 'none';
      } else {
        this.d1_BillList.max = true;
        // btnDom.style.display = '';
      }
    },

    // 引入最高额担保合同
    // var appLoanType = '01';     //最高额合同申请贷款类型  需要修改
    OnImport () {
      this.$dialog.open(
        '最高额担保合同引入页面',
        'grtmanage/smallCreditManage/maxGrtContImportIndex',
        900,
        650,
        this.rowData,
        data => {
          this.d1Query();
        }
      );
    },

    // 删除
    Ondelete () {
      let params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      if (params.guarContState == 101) {
        this.$xutils.showMsgBox('提示', '只能删除未生效的担保合同!', 350, 150);
        return;
      }

      params['serno'] = this.rowData.serno;
      this.$confirm('该操作将删除该记录，是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: this.$backend.cmisBiz + '/api/grtguarcont/deleteOnLogic',
          data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
          type: 'post',

          success: (response, status, xhr) => {
            if (response.code == '0') {
              this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                // 列表刷新
                this.d1_BillList.queryDataByCondition();
              });
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            }
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 取消引入
    offImport () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      // 字典项数值为
      if (!(params.guarContState == 101 && params.guarContType == 'B')) {
        this.$xutils.showMsgBox('提示', '只能取消已签订的最高额担保合同!', 350, 150);
        return;
      }

      params['serno'] = this.rowData.serno;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/grtguarcont/maxContCancelImport',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        type: 'post',

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '取消引入成功', 350, 150, () => {
              // 列表刷新
              this.d1_BillList.queryDataByCondition();
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    }
  },
  // 返回列表
  OnCancel () {
    this.$dialog.close(this.dialogId);
  }
};
</script>
