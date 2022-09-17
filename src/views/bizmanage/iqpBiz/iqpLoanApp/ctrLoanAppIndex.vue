<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="普通贷款合同申请">
  <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="普通贷款合同申请历史">
  <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './ctrLoanApp_d1_1_BillList.vue';
import d12Billlist from './ctrLoanApp_d1_2_BillList.vue';
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null,
      topOutsystemCode: 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 新增申请
    onAdd () {
      this.$dialog.open('', 'bizmanage/iqpBiz/iqpLoanApp/ctrGuideAppIndex', 800, 600, { 'prdType': '01'}, () => {
        this.d1_1_BillList.queryDataByCondition();
      });
    },

    // 修改
    onUpdate () {
      let params = this.d1_1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      if (params.approveStatus == '111') {
        this.$xutils.showMsgBox('提示', '当前审批状态不可进行当前操作,请重试!');
        return;
      }

      if (params.guarWay == '21') {
        params['isAddGuar'] = '0';
      }
      params['op'] = 'EDIT';
      params['period'] = '02';
      params['bizLine'] = '03';
      params['busiType'] = '02';
      // 申请信息 CMG000240
      params['model_group_no'] = 'CMG000243';
      params['topOutsystemCode'] = this.topOutsystemCode;
      params['imageParams'] = {
        contid: params.contNo,
        businessid: params.iqpSerno,
        docid: params.iqpSerno
      };
      params['imageType'] = '2';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: params.iqpSerno + params.op,
        title: '普通贷款合同申请',
        data: params
      });
      this.refreshBillListData();
    },

    // 修改后列表回调函数，实现列表数据自动刷新
    refreshBillListData () {
      this.d1_1_BillList.queryDataByCondition();
    },

    onDelete () {
      let params = this.d1_1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (params.approveStatus == '111') {
        this.$xutils.showMsgBox('提示', '当前审批状态不可进行当前操作,请重试!');
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          // 调用后端的删除逻辑，删除相关的关系表数据
          const _this = this;
          let url = backend.cmisBiz + '/api/iqploanapp/updateDelete';
          yufp.service.request({
            method: 'POST',
            url: url,
            data: JSON.stringify(params),
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$message({ message: '刪除成功', type: 'success' });
                _this.d1_1_BillList.queryDataByCondition();
              } else {
                _this.$message({ showClose: true, message: response.data.rtnMsg, type: 'error' });
              }
            }
          });
        }
      });
    },
    // 查看
    onCheck () {
      let jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (jsoPar.guarWay == '21') {
        jsoPar['isAddGuar'] = '0';
      }
      jsoPar['op'] = 'VIEW';
      jsoPar['period'] = '02';
      jsoPar['bizLine'] = '03';
      jsoPar['busiType'] = '02';
      jsoPar['model_group_no'] = 'CMG000243';
      jsoPar['topOutsystemCode'] = this.topOutsystemCode;
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.iqpSerno,
        docid: jsoPar.iqpSerno
      };
      jsoPar['imageType'] = '2';
      // this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1500,
      //   800,
      //   jsoPar,
      //   this.close,
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.iqpSerno + jsoPar.op,
        title: '普通贷款合同申请',
        data: jsoPar
      });
    },

    termChange (value) { // 校验合同期限
      let startDate = this.getTime(this.formdata.startDate);
      let endDate = this.getTime(this.formdata.endDate);

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate <= startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.contTerm = '';
        return;
      }
      // 计算月份
      let date1 = startDate.split('-');// 例：将2020-12-21 的-去掉
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);// 将字符串转换为数字格式
      let date2 = endDate.split('-');
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      this.formdata.contTerm = date2 - date1 <= 0 ? 1 : date2 - date1;
    },

    onCheck2 () {
      let jsoPar = this.d1_2_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (jsoPar.guarWay == '21') {
        jsoPar['isAddGuar'] = '0';
      }
      jsoPar['op'] = 'VIEW';
      jsoPar['model_group_no'] = 'CMG000243';
      jsoPar['topOutsystemCode'] = this.topOutsystemCode;
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.iqpSerno,
        docid: jsoPar.iqpSerno
      };

      // this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1500,
      //   800,
      //   // params,
      //   jsoPar,
      //   this.close,
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.iqpSerno + jsoPar.op,
        title: '普通贷款合同申请',
        data: jsoPar
      });
    }
  }
};
</script>
