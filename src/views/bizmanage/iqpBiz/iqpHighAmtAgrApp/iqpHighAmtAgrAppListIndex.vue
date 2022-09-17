<template>
  <yu-tabs type="card">
    <yu-tab-pane label="最高额授信协议申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="最高额授信协议申请历史">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './iqpHighAmtAgrAppList_d1_1_BillList.vue';
import d12Billlist from './iqpHighAmtAgrAppList_d1_2_BillList.vue';
export default {
  components: { d11Billlist, d12Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 最高额授信协议申请列表
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 新增
    doAdd () {
      this.$dialog.open('最高额授信协议申请向导', 'bizmanage/iqpBiz/iqpHighAmtAgrApp/iqpHighAmtAgrAppGuideIndex', 800, 700, null, null);
    },

    // 删除
    doDelete () {
      let _this = this;
      let _jsoPar = _this.d1_1_BillList.getSelectedRowData();
      const jsoPar = _this.$utils.clone(_jsoPar, jsoPar);

      if (_jsoPar == null || _jsoPar == '') {
        // _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        _this.$message({ message: '必须选择一条记录进行操作!\r\n请重新操作!', type: 'warning' });
        return;
      }

      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        // _this.$xutils.showMsgBox('提示', '仅允许删除【待发起】【打回】的数据', 350, 150);
        _this.$message({ message: '仅允许删除【待发起】【打回】的数据!', type: 'warning' });
        return;
      }
      // 进行逻辑删除
      // d1_1_BillList.onBillListLogicDelete();
      _this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqphighamtagrapp/logicdelete',
              dataType: 'json',
              data: JSON.stringify(jsoPar),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data.rtnCode == '000000') {
                    // _this.$xutils.showMsgBox('提示', '删除成功!', 350, 150);
                    _this.$message({ message: '删除成功!', type: 'success' });
                    _this.d1_1_BillList.$refs.refTable.remoteData();
                  } else {
                    // _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                    _this.$message({ message: response.data.rtnMsg, type: 'error' });
                  }
                } else {
                  // _this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
                  _this.$message({ message: '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg, type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    // 刷新列表
    getRefreshList () {
      let _this = this;
      _this.d1_1_BillList.queryDataByCondition();
      _this.d1_2_BillList.queryDataByCondition();
    },

    // 修改
    doUpdate () {
      // let param = this.pageParams;
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      let jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (_jsoPar == null || _jsoPar == '') {
        // this.$xutils.showMsgBox('提示:', '必须选择一条记录进行操作!');
        this.$message({ message: '必须选择一条记录进行操作!', type: 'warning' });
        return;
      }

      if (jsoPar.approveStatus == '111') {
        // this.$xutils.showMsgBox('提示:', '审批中的申请不可修改!\r\n请重新操作!', 350, 150);
        this.$message({ message: '审批中的申请不可修改!\r\n请重新操作!', type: 'warning' });
        return;
      }

      // 获取当前流程状态，仅“待发起”“打回”可以进行修改操作
      // if (jsoPar.approve_status == null || jsoPar.approve_status == '' || (jsoPar.approve_status != '000' && jsoPar.approve_status != '992' && jsoPar.approve_status != '991')) {
      //   YuXP.showMsgBox('提示', '仅允许修改【待发起】【打回】【拿回】的数据');
      //   return;
      // }
      jsoPar.opType = 'edit';
      jsoPar.op = 'EDIT';
      jsoPar.imageType = '2';
      this.goToDetailFn(jsoPar);
    },

    // 调用模板工厂配置的详情界面
    goToDetailFn (jsoPar) {
      jsoPar.model_group_no = 'CMG000334';
      jsoPar.biz_serno = jsoPar.serno;
      jsoPar.biz_op = jsoPar.op;
      jsoPar.period = '02';
      jsoPar.bizLine = '03';
      jsoPar.busiType = '01';
      jsoPar.guarWay = jsoPar.guarMode;
      if (jsoPar.guarWay == '21') {
        jsoPar['isAddGuar'] = '0';
      }
      jsoPar['topOutsystemCode'] = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.serno,
        docid: jsoPar.serno
      };
      // var _this = this;
      // this.$dialog.open('最高额授信协议申请', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, () => {
      //   _this.refreshBillListData();
      // }
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.serno + jsoPar.op,
        title: '最高额授信协议详情',
        data: jsoPar
      });
    },

    // 修改后列表回调函数，实现列表数据自动刷新
    refreshBillListData () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 查看
    doView () {
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      let jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (_jsoPar == null) {
        // this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        this.$message({ message: '必须选择一条记录进行操作!', type: 'warning' });
        return;
      }
      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    },

    // 查看历史
    doViewHis () {
      let _jsoPar = this.d1_2_BillList.getSelectedRowData();
      let jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (_jsoPar == null) {
        // this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        this.$message({ message: '必须选择一条记录进行操作!', type: 'warning' });
        return;
      }

      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    }
  }
};
</script>
