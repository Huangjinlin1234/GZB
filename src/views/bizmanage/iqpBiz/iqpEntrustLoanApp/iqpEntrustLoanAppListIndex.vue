<template>
  <yu-tabs type="card">
    <yu-tab-pane label="委托贷款合同申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="委托贷款合同申请历史">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './iqpEntrustLoanAppList_d1_1_BillList.vue';
import d12Billlist from './iqpEntrustLoanAppList_d1_2_BillList.vue';
export default {
  components: { d11Billlist, d12Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null,
      topOutsystemCode: 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ;'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;

      // 过滤申请状态，移除【取消、拿回、再议、自行退出、通过、否决】数据字典
      this.d1_1_BillList.setSelectOptions('apprStatus', 'hidden', '990,991,993,996,997,998');

      // 过滤申请状态，移除【取消、打回、再议、拿回、代发起、审批中】数据字典
      this.d1_2_BillList.setSelectOptions('apprStatus', 'hidden', '990,992,993,991,000,111');
    },

    // 新增
    doAdd () {
      this.$dialog.open('委托贷款合同申请', 'bizmanage/iqpBiz/iqpEntrustLoanApp/iqpEntrustLoanAppAddIndex', 800, 700, null, null);
    },

    // // 字典项过滤
    // datacodeFilterFn: function (opts, datacode, name) {
    //   return opts.filter(function (op) {
    //     if (op.key === '000') {
    //       return true;
    //     }
    //     return false;
    //   });
    // },

    // 删除
    doDelete () {
      let rtnData = {};
      let jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '只有"待发起或打回"状态的申请记录才能进行删除操作！', 350, 150);
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          let row = this.d1_1_BillList.getSelectedRowData();

          if (row == null) {
            this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
            return;
          }

          this.$xutils.request({
            // 同步请求
            async: false,

            type: 'POST',
            url: this.$backend.cmisBiz + '/api/iqpentrustloanapp/deleteIqpEntrustLoanAppinfo',
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
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (_jsoPar == null || _jsoPar == '') {
        this.$xutils.showMsgBox('提示:', '必须选择一条记录进行操作!');
        return;
      }
      if (_jsoPar.approveStatus != '000' && _jsoPar.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '只有"待发起或打回"状态的申请记录才能进行修改操作！', 350, 150);
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
      row.model_group_no = 'CMG000383';
      // row.biz_serno = row.serno;
      row.biz_serno = row.serno;

      row.biz_op = row.op;

      row.period = '02';
      row['guarWay'] = row.guarMode;
      if (row.guarMode == '21') {
        row['isAddGuar'] = '0';
      }
      row.bizLine = '03';
      row.busiType = '09';
      row.topOutsystemCode = this.topOutsystemCode;
      row.imageParams = {
        contid: row.contNo,
        businessid: row.serno,
        docid: row.serno
      };

      var _this = this;
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: row.biz_serno + row.op,
        title: '委托贷款合同申请详情',
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
      let row = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(row, jsoPar);
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      jsoPar.imageType = '2';
      this.goToDetailFn(jsoPar);
    },

    // 查看历史
    doViewHis () {
      let row = this.d1_2_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(row, jsoPar);
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar.imageType = '2';
      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    }
  }
};
</script>
