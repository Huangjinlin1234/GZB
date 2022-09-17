<template>
  <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
</template>
<script>
import d11Billlist from './creditSZReportQryInfoList_d1_1_BillList.vue';
export default {
  components: {d11Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d11BillList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d11BillList = this.$refs.d1_1_BillList;
    },

    doInsect () {
      var _this = this;
      this.$dialog.open(
        '新增（苏州地方企业征信查询）',
        'creditmanage/creditSZ/creditSZReportQryInfoInsectIndex',
        1080,
        380,
        null,
        (rtData) => {
          if (rtData == 'success') {
            _this.d11BillList.queryDataByCondition();
          }
        }
      );
    },

    doCreditReportView () {
      let params = this.d11BillList.getSelectedRowData();

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
      // 校验是否可查看征信报告
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
      var _this = this;
      let params = this.d11BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus != '000' && params.approveStatus != '992') {
        _this.$xutils.showMsgBox('提示', '非待发起、打回状态不允许修改。');
        return;
      }

      this.$dialog.open(
        '修改（苏州地方企业征信查询）',
        'creditmanage/creditSZ/creditSZReportQryInfoUpdateIndex',
        1080,
        380,
        params,
        (rtData) => {
          if (rtData == 'success') {
            _this.d11BillList.queryDataByCondition();
          }
        }
      );
    },

    doView () {
      var _this = this;
      let params = this.d11BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$dialog.open(
        '查看苏州地方企业征信',
        'creditmanage/creditSZ/creditSZReportQryInfoViewIndex',
        1080,
        380,
        params,
        (rtData) => {
          if (rtData == 'success') {
            _this.d11BillList.queryDataByCondition();
          }
        }
      );
    },

    doDelete () {
      var _this = this;
      let params = this.d11BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus != '000') {
        _this.$xutils.showMsgBox('提示', '非待发起状态不允许删除。');
        return;
      }

      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            if (params.approveStatus == '992') {
              // 更新审批状态 -> 自行退出
              params.approveStatus = '996';
              yufp.service.request({
                method: 'POST',
                url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/update`,
                data: JSON.stringify(params),
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$xutils.showMsgBox('提示', '自行退出成功!', 500, 300, function () {
                      _this.d11BillList.$refs.refTable.remoteData();
                    });
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                  }
                }
              });
            } else {
              // 删除数据
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/creditreportqrylst/delete/' + params.crqlSerno,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$xutils.showMsgBox('提示', '删除成功!', 500, 300, function () {
                      _this.d11BillList.$refs.refTable.remoteData();
                    });
                  } else {
                    _this.$message({ message: response.erortx, type: 'error' });
                  }
                }
              });
            }
          }
        }
      });
    }
  }
};
</script>
