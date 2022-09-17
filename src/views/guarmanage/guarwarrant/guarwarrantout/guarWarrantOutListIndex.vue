<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="权证出库申请">
  <d1-billlist ref="d1_BillList"></d1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="权证出库历史">
  <d2-billlist ref="d2_BillList"></d2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d1Billlist from './guarWarrantOutList_d1_BillList.vue';
import d2Billlist from './guarWarrantOutList_d2_BillList.vue';
/** 权证出库申请列表**/
let params;

export default {
  components: { d1Billlist, d2Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      d2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 权证出库列表页面
     * 日期：2021-04-14
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d2_BillList = this.$refs.d2_BillList;
    },

    doAdd () {
      var _this = this;
      var opJso = {};
      opJso['type'] = 'ADD';
      opJso['warrantAppType'] = '02';
      _this.$dialog.open('权证出库', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppAddIndex', 800, 400, opJso, function () {
        _this.d1_BillList.queryDataByCondition();
      });
    },

    doUpdate () {
      let jsoPar = this.d1_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (jsoPar_.approveStatus !== '000' && jsoPar.approveStatus !== '992' && jsoPar_.approveStatus !== '') {
        this.$xutils.showMsgBox('提示', '只有"待发起"或"退回"状态的权证出库申请记录才能进行修改操作！', 350, 150);
        return;
      }
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['guarNo'] = jsoPar.guarNo;
      opJso['warrantNo'] = jsoPar.warrantNo;
      opJso['type'] = 'EDIT';
      opJso['certiState'] = '04';
      opJso['coreGuarantyNo'] = jsoPar.coreGuarantyNo;
      this.$dialog.open('权证出库修改', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, opJso, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    doRighting () {
      let jsoPar = this.d2_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (jsoPar.approveStatus !== '997') {
      //  this.$xutils.showMsgBox('提示', '只有"通过"状态的权证出库申请记录才能进行冲正操作！', 350, 150);
      //  return;
      }

      if (jsoPar.warrantOutTypeSub == '04' || jsoPar.warrantOutTypeSub == '05'){
      //  this.$xutils.showMsgBox('提示', '权证借阅无法进行冲正操作！', 350, 150);
      //  return;
      }
      this.$xutils.showMsgBox('提示', '冲正成功!', 350, 150);
      /*
      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarwarrantmanageapp/warrantoutrighting/' +
          jsoPar.serno,

        success: (response, status, xhr) => {
          if (response.data == 'success') {
              this.$xutils.showMsgBox('提示', '冲正成功!', 350, 150);
          } else {
            this.$xutils.showMsgBox('提示', response.data, 350, 150);
          }
        }
      });
      */
    },
    // 删除
    doDelete () {
      let selectRow = this.d1_BillList.getSelectedRowData();

      if (selectRow == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      // 删除‘打回’状态的数据(将数据状态改成‘自行退出’)
      if (selectRow.approveStatus == '992') {
        var _this = this;
        _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
          type: 'warning',
          center: false,
          callback: action => {
            if (action === 'confirm') {
              var url = this.$backend.cmisBiz + '/api/guarwarrantmanageapp/deleteOnlogic';
              var keyValue = selectRow[_this.d1_BillList.pkField];
              var data = {'approveStatus': '996'};
              data[_this.d1_BillList.pkField] = keyValue;
              _this.$request({
                url: url,
                method: 'post',
                data: data
              }).then((response) => {
                if (response.code == '0') {
                  _this.$message('删除成功!');
                  _this.d1_BillList.queryDataByCondition();
                  _this.d2_BillList.queryDataByCondition();
                }
              }).catch(() => {
                // 处理请求失败的情况
                _this.$message({ message: '删除失败!', type: 'error' });
              });
            }
          }
        });
        return;
      }

      if (selectRow.approveStatus !== '000' && selectRow.approveStatus !== '') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的权证出库申请记录才能进行删除操作！', 350, 150);
        return;
      }

      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    },

    // 查看
    doView () {
      let jsoPar = this.d1_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['guarNo'] = jsoPar.guarNo;
      opJso['warrantNo'] = jsoPar.warrantNo;
      opJso['type'] = 'VIEW';
      opJso['certiState'] = '04';
      opJso['coreGuarantyNo'] = jsoPar.coreGuarantyNo;
      this.$dialog.open('权证出库详情', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, opJso);
    },

    // 历史查看
    doViewHistory () {
      let jsoPar = this.d2_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['guarNo'] = jsoPar.guarNo;
      opJso['warrantNo'] = jsoPar.warrantNo;
      opJso['type'] = 'VIEW';
      opJso['coreGuarantyNo'] = jsoPar.coreGuarantyNo;
      this.$dialog.open('权证出库详情', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, opJso);
    },

    printFn: function () {
      var _this = this;
      const params = _this.d2_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemohzfbzjtqspb';
      params.src = _this.$backend.frptRptService + 'qzcrkspb.cpt&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '权证出库审批表',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
