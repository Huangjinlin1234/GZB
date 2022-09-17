<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './creditReportQryRecordListRHQY_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillList = this.$refs.d1_BillList;
    },

    doInsect () {
      var _this = this;
      // this.$router.addTab({
      //   // 路由名称
      //   name: 'creditmanage/creditRH/creditReportQryRecordListRHQYInsectIndex',
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: 'creditReportQryRecordListRHQYInsectIndex' + Date.now(),
      //   // 页签名称
      //   title: '新增（人行企业征信查询）',
      //   // 传递的业务数据，可选配置
      //   data: null  v-if="checkCtrl('report')"
      // });
      this.$dialog.open(
        '新增（人行企业征信查询）',
        'creditmanage/creditRH/creditReportQryRecordListRHQYInsectIndex',
        -1,
        -1,
        null,
        (rtData) => {
          if (rtData == 'success') {
            _this.d1BillList.queryDataByCondition();
          }
        }
      );
    },
    goZXReportView (params) {
      let _this = this;
      let url = _this.$backend.jumpZXReportService + '?viewlet=实时数据平台大屏/征信分析简表.cpt' + '&ref_t=design' + '&ref_c=aed8606f-7c40-4699-bedd-9cc882f98eaf' + '&report_id=' + params.reportNo;
      window.open(url, '');
    },
    // printFn: function () {
    //   // 人行征信查询申请
    //   var _this = this;
    //   const params = _this.d1BillList.getSelectedRowData();
    //   if (params == null) {
    //     _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
    //     return;
    //   }
    //   let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
    //   let keydemo = 'frptdemorhzxcxsq';
    //   params.src = _this.$backend.frptRptService + 'xiaowei0918.cpt&reportNo=' + params.reportNo;
    //   _this.$router.addTab({
    //     // 路由名称
    //     name: name,
    //     key: keydemo, // 必传
    //     // 页签名称
    //     title: '人行企业征信简版报告',
    //     // 传递的业务数据，可选配置
    //     data: params
    //   });
    // },
    doCreditReportView () {
      let params = this.d1BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus == '997' && (params.creditUrl == null || params.creditUrl == '')) {
        this.$xutils.showMsgBox('提示', '征信中心无信用信息');
        return;
      }

      if (params.creditUrl == null || params.creditUrl == '') {
        this.$xutils.showMsgBox('提示', '暂未生成征信报告');
        return;
      }

      var _this = this;
      var model = {};
      model['userNo'] = this.$xutils.getLoginUserInfo().loginCode;
      // 检查是否小微部门派遣员工
      yufp.service.request({
        method: 'GET',
        url: _this.$backend.cmisBiz + '/api/areaadminuser/',
        data: {condition: { 'userNo': model.userNo}},
        callback (code, message, response) {
          if (response.code == '0' && response.data[0] == null) {
            yufp.service.request({
              method: 'POST',
              // 同步请求
              async: false,
              url: _this.$backend.cmisBiz + '/api/creditreportqrylst/checkoutreport',
              data: JSON.stringify(params),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data) {
                    _this.reportView(params);
                  } else {
                    _this.$xutils.showMsgBox('提示', '征信报告超过配置有效期，无法查看');
                  }
                } else {
                  _this.$message({ message: response.erortx, type: 'error' });
                }
              }
            });
          } else if (response.data[0].isDispatchEmployee == '1') {
            _this.goZXReportView(params);
          } else {
            yufp.service.request({
              method: 'POST',
              // 同步请求
              async: false,
              url: _this.$backend.cmisBiz + '/api/creditreportqrylst/checkoutreport',
              data: JSON.stringify(params),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data) {
                    _this.reportView(params);
                  } else {
                    _this.$xutils.showMsgBox('提示', '征信报告超过配置有效期，无法查看');
                  }
                } else {
                  _this.$message({ message: response.erortx, type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    reportView (params) {
      var _this = this;
      // 保存征信查看记录
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportqryrecord/createCreditReport',
        data: JSON.stringify(params),
        callback: function (code, message, response) {
          if (response.code == '0') {
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });

      this.$router.addTab({
        // 路由名称
        name: 'creditmanage/creditRH/creditReportAllView',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'creditReportView', // 必传
        // 页签名称
        title: '征信报告',
        // 传递的业务数据，可选配置
        data: {
          url: params.creditUrl
        }
      });
    },

    doUpdate () {
      let params = this.d1BillList.getSelectedRowData();
      var _this = this;

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus != '000' && params.approveStatus != '992') {
        _this.$xutils.showMsgBox('提示', '非待发起、打回状态不允许修改。');
        return;
      }
      // this.$router.addTab({
      //   // 路由名称
      //   name: 'creditmanage/creditRH/creditReportQryRecordListRHQYUpdateIndex',
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: 'creditReportQryRecordListRHQYUpdateIndex' + Date.now(), // 必传
      //   // 页签名称
      //   title: '修改（人行企业征信查询）',
      //   // 传递的业务数据，可选配置
      //   data: params
      // });
      this.$dialog.open(
        '修改（人行企业征信查询）',
        'creditmanage/creditRH/creditReportQryRecordListRHQYUpdateIndex',
        -1,
        -1,
        params,
        (rtData) => {
          if (rtData == 'success') {
            _this.d1BillList.queryDataByCondition();
          }
        }
      );
    },

    doView () {
      // let params = this.d1BillList.getSelectedRowData();

      // if (params == null) {
      //   this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
      //   return;
      // }
      // this.$dialog.open(
      //   '查看（人行企业征信查询）',
      //   'creditmanage/creditRH/creditReportQryRecordListRHQYViewIndex',
      //   '880',
      //   '500',
      //   params,
      //   () => {}
      // );
      let params = this.d1BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      params.view = true;
      // this.$router.addTab({
      //   // 路由名称
      //   name: 'creditmanage/creditRH/creditReportQryRecordListRHQYUpdateIndex',
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: 'creditReportQryRecordListRHQYUpdateIndex' + Date.now(), // 必传
      //   // 页签名称
      //   title: '查看（人行企业征信查询）',
      //   // 传递的业务数据，可选配置
      //   data: params
      // });
      this.$dialog.open(
        '查看（人行企业征信查询）',
        'creditmanage/creditRH/creditReportQryRecordListRHQYViewIndex',
        -1,
        -1,
        params,
        () => {}
      );
    }
  }
};
</script>
