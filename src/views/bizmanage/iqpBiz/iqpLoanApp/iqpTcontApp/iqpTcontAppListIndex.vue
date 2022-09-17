<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="贸易融资合同申请">
  <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="贸易融资合同申请历史">
  <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './iqpTcontAppList_d1_1_BillList.vue';
import d12Billlist from './iqpTcontAppList_d1_2_BillList.vue';
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
    // 贸易融资合同申请列表
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 新增
    doAdd () {
      this.$dialog.open(
        '贸易融资合同申请向导',
        'bizmanage/iqpBiz/iqpLoanApp/iqpTcontApp/iqpTcontAppGuideIndex',
        800,
        700,
        null,
        null
      );
    },

    // 删除
    doDelete () {
      let rtnData = {};
      let jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '仅允许删除【待发起】【打回】的数据', 350, 150);
        return;
      }

      // 状态为待发起（000）则物理删除
      if (jsoPar.approveStatus == '000') {
        // 进行逻辑删除
        // d1_1_BillList.onBillListLogicDelete();
        jsoPar['oprType'] = '02';

        this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
          if (isOK) {
            this.$xutils.request({
              // 同步请求
              async: false,

              url: this.$backend.cmisBiz + '/api/iqploanapp/logicdelete',
              data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
                  rtnData = response.data;
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
      }

      // 状态为打回（992）则更新审批状态为自行退回（996）
      if (jsoPar.approveStatus == '992') {
        jsoPar['approveStatus'] = '996';

        this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
          if (isOK) {
            this.$xutils.request({
              // 同步请求
              async: false,

              url: this.$backend.cmisBiz + '/api/iqploanapp/logicdelete',
              data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
                  rtnData = response.data;
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
      }
    },

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 修改
    doUpdate () {
      let param = this.pageParams;
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (_jsoPar == null || _jsoPar == '') {
        this.$xutils.showMsgBox('提示:', '必须选择一条记录进行操作!');
        return;
      }
      if (jsoPar.approveStatus == '111') {
        this.$xutils.showMsgBox('提示:', '审批中的申请不可修改!\r\n请重新操作!', 350, 150);
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
    goToDetailFn (row) {
      let _this = this;
      row.model_group_no = 'CMG000407';

      // alert(row.iqp_serno);
      row.biz_serno = row.iqpSerno;

      row.biz_op = row.op;

      row.period = '02';
      // row.bizType = 'lmt';
      row.busiType = '04';
      row.bizLine = '03';
      if (row.guarWay == '21') {
        row['isAddGuar'] = '0';
      }
      row.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWMYRZ;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      row.imageParams = {
        contid: row.contNo,
        businessid: row.iqpSerno,
        docid: row.iqpSerno
      };
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: row.biz_serno + row.op,
        title: '贸易融资合同申请详情',
        data: row
      });
      _this.refreshBillListData();
    },

    // 修改后列表回调函数，实现列表数据自动刷新
    refreshBillListData () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 查看
    doView () {
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      let jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
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
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    }
  }
};
</script>
