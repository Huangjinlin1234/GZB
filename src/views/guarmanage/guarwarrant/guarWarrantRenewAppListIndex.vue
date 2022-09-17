<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="权证续借申请">
  <d1-billlist ref="d1_BillList"></d1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="权证续借历史">
  <d2-billlist ref="d2_BillList"></d2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d1Billlist from './guarWarrantRenewAppList_d1_BillList.vue';
import d2Billlist from './guarWarrantRenewAppList_d2_BillList.vue';
/** 权证续借申请列表**/
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
     * 权证续借列表页面
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
      opJso['warrantAppType'] = '03';
      _this.$dialog.open('权证续借', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppAddIndex', 800, 400, opJso, function () {
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
      if (jsoPar.approveStatus !== '000' && jsoPar.approveStatus !== '992' && jsoPar.approveStatus !== '') {
        this.$xutils.showMsgBox('提示', '只有"待发起"或"退回"状态的权证续借申请记录才能进行修改操作！', 350, 150);
        return;
      }
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['warrantAppType'] = '03';
      opJso['guarNo'] = jsoPar.guarNo;
      opJso['type'] = 'EDIT';
      opJso['warrantNo'] = jsoPar.warrantNo;
      opJso['certiState'] = '07';
      opJso['coreGuarantyNo'] = jsoPar.coreGuarantyNo;
      this.$dialog.open('权证续借修改', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, opJso);
    },

    // 删除
    doDelete () {
      let selectRow = this.d1_BillList.getSelectedRowData();

      if (selectRow == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (selectRow.approveStatus === '000') {
        // 进行逻辑删除
        this.d1_BillList.onBillListLogicDelete();
      } else if (selectRow.approveStatus === '992') { // 退回
        this.$request({
          url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/deleteOnlogic',
          method: 'post',
          data: {serno: selectRow.serno, approveStatus: '996'}
        }).then((response) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '操作成功！', 350, 150);
            this.d1_BillList.doAutoQuery();
          }
        });
      } else {
        this.$xutils.showMsgBox('提示', '只有"待发起或退回"状态的权证续借申请记录才能进行删除操作！', 350, 150);
      }
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
      opJso['warrantAppType'] = '03';
      opJso['guarNo'] = jsoPar.guarNo;
      opJso['warrantNo'] = jsoPar.warrantNo;
      opJso['type'] = 'VIEW';
      opJso['certiState'] = '07';
      opJso['coreGuarantyNo'] = jsoPar.coreGuarantyNo;
      this.$dialog.open('权证续借详情', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, opJso);
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
      this.$dialog.open('权证续借详情', 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, opJso);
    }
  }
};
</script>
