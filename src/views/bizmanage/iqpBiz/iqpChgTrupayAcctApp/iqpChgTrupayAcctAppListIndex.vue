<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="修改受托账号申请列表">
  <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="修改受托账号申请历史列表">
  <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './iqpChgTrupayAcctAppList_d1_1_BillList.vue';
import d12Billlist from './iqpChgTrupayAcctAppList_d1_2_BillList.vue';
export default {
  components: {d11Billlist, d12Billlist},
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
    // 修改委托账号申请列表
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;

      // 过滤申请状态，移除【取消、拿回、再议、自行退出、通过、否决】数据字典
      this.d1_1_BillList.setSelectOptions('approveStatus', 'hidden', '990,991,993,996,997,998');

      // 过滤申请状态，移除【取消、打回、再议、拿回、代发起、审批中】数据字典
      this.d1_2_BillList.setSelectOptions('approveStatus', 'hidden', '990,992,993,991,000,111');
    },

    // 新增
    doAdd () {
      this.$dialog.open(
        '修改受托账号申请向导',
        'bizmanage/iqpBiz/iqpChgTrupayAcctApp/iqpChgTrupayAcctAppGuideIndex',
        1500,
        700,
        null,
        null
      );
    },

    // // 删除
    // doDelete () {
    //   let rtnData = {};
    //   let jsoPar = this.d1_1_BillList.getSelectedRowData();

    //   if (jsoPar == null || jsoPar == '') {
    //     this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
    //     return;
    //   }

    //   if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
    //     this.$xutils.showMsgBox('提示', '仅允许删除【待发起】【打回】的数据', 350, 150);
    //     return;
    //   }

    //   // 状态为待发起（000）则物理删除
    //   if (jsoPar.approveStatus == '000') {
    //     // 进行逻辑删除
    //     this.d1_1_BillList.onBillListLogicDelete();
    //   }

    //   // 状态为打回（992）则更新审批状态为自行退回（996）
    //   if (jsoPar.approveStatus == '992') {
    //     jsoPar['approveStatus'] = '996';

    //     this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
    //       if (isOK) {
    //         this.$xutils.request({
    //           // 同步请求
    //           async: false,
    //           type: 'POST',
    //           url: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/update',
    //           data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

    //           success: (response, status, xhr) => {
    //             if (response.code == '0') {
    //               this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
    //               rtnData = response.data;
    //             } else {
    //               this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
    //             }
    //           },

    //           error: (result, b) => {
    //             this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
    //           }
    //         });
    //       }
    //     });
    //   }
    // },

    // 删除
    doDelete () {
      let rtnData = {};
      let jsoPar = this.d1_1_BillList.getSelectedRowData();
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!', 350, 150);
        return;
      }
      if (jsoPar.approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的申请记录才能进行删除操作！', 350, 150);
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          let row = this.d1_1_BillList.getSelectedRowData();

          if (row == null) {
            this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
            return;
          }
          // get要换成post
          this.$xutils.request({
            // 同步请求
            async: false,

            type: 'POST',
            url: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/deleteiqpchgtrupayacctapp',
            data: { serno: jsoPar.serno },
            success: (response, status, xhr) => {
              if (response.code == '0') {
                rtnData = response.data;
                this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            },

            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    },

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 修改
    doUpdate () {
      // let param = this.pageParams;
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (_jsoPar == null || _jsoPar == '') {
        this.$xutils.showMsgBox('提示:', '必须选择一条记录进行操作!');
        return;
      }

      // 获取当前流程状态，仅“待发起”“打回”可以进行修改操作
      var approveStatus = _jsoPar.approveStatus;
      if (approveStatus !== '000' && approveStatus !== '992') {
        this.$message({
          message: '只有待发起和打回的信息才可以修改！！',
          type: 'warning'
        });
        return;
      }

      // 获取当前流程状态，仅“待发起”“打回”可以进行修改操作
      // if (jsoPar.approve_status == null || jsoPar.approve_status == '' || (jsoPar.approve_status != '000' && jsoPar.approve_status != '992' && jsoPar.approve_status != '991')) {
      //   YuXP.showMsgBox('提示', '仅允许修改【待发起】【打回】【拿回】的数据');
      //   return;
      // }
      jsoPar.opType = 'edit';

      jsoPar['biz_serno'] = _jsoPar.serno;
      jsoPar.op = 'EDIT';
      this.goToDetailFn(jsoPar);
    },

    // 跳转修改列表详情界面
    goToDetailFn (jsoPar) {
      this.$dialog.open(
        '修改受托账号申请详情',
        'bizmanage/iqpBiz/iqpChgTrupayAcctApp/iqpChgTrupayAcctAppDetailsIndex',
        -1,
        -1,
        jsoPar,
        null
      );
      this.d1_1_BillList.queryDataByCondition();
    },

    // // 修改后列表回调函数，实现列表数据自动刷新
    // function refreshBillListData () {
    //   d1_1_BillList.queryDataByCondition();
    // };

    // 查看
    doView () {
      let row = this.d1_1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      row.opType = 'view';
      row.op = 'VIEW';
      this.goToDetailFn(row);
    },

    // 查看历史
    doViewHis () {
      let row = this.d1_2_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      row.opType = 'view';
      row.op = 'VIEW';
      this.goToDetailFn(row);
    }
  }
};
</script>
