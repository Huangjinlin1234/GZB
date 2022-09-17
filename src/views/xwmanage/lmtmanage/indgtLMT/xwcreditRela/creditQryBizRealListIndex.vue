<template>
<!--小微征信报告模板-->
  <div>
    <yu-tabs  type="card">
      <yu-tab-pane label="人行征信查询">
        <d1-1-billlist ref="d1_1_BillList" :biz-page-data="bizData"></d1-1-billlist>
      </yu-tab-pane>
      <yu-tab-pane label="苏州地方征信查询" v-if="isShow">
        <d1-2-billlist ref="d1_2_BillList" :biz-page-data="bizData"></d1-2-billlist>
      </yu-tab-pane>
    </yu-tabs>

  </div>
</template>
<script>
import d11Billlist from './creditQryBizRealList_d1_1_BillList.vue';
import d12Billlist from './creditQryBizRealList_d1_2_BillList.vue';
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      d11BillList: null,
      d12BillList: null,
      paramsData: {},
      bizData: {},
      isShow: true
    };
  },
  created () {
    yufp.clone(this.bizPageData, this.bizData);
    if (this.getFactory().contextData) {
      this.getFactory().setButtonVisiable('commit', false);
      this.getFactory().setButtonVisiable('save', false);
      this.getFactory().setButtonVisiable('tempSave', false);
      this.getFactory().setButtonVisiable('back', false);
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      // 判断是否是东海机构
      if (this.$xutils.getLoginUserInfo().org.code.substring(0, 2) == '81') {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      this.d11BillList = this.$refs.d1_1_BillList;
      this.d12BillList = this.$refs.d1_2_BillList;
      if (this.getFactory().contextData) {
        // 业务流水号
        if (this.getFactory().contextData.biz_serno) {
          this.paramsData.bizSerno = this.getFactory().contextData.biz_serno;
          this.paramsData.period = this.getFactory().contextData.period;
          if (this.getFactory().contextData[0]) {
            this.paramsData.borrowerCusId = this.getFactory().contextData[0].cusId;
            this.paramsData.borrowerCusName = this.getFactory().contextData[0].cusName;
            this.paramsData.borrowerCertCode = this.getFactory().contextData[0].certCode;
          } else {
            this.paramsData.borrowerCusId = this.getFactory().contextData.cusId;
            this.paramsData.borrowerCusName = this.getFactory().contextData.cusName;
            this.paramsData.borrowerCertCode = this.getFactory().contextData.certCode;
          }
        } else if (this.getFactory().contextData.iqpSerno) { // 申请流水号
          this.paramsData.bizSerno = this.getFactory().contextData.iqpSerno;
          this.paramsData.period = this.getFactory().contextData.period;
          this.paramsData.bizType = this.getFactory().contextData.bizType;
          this.paramsData.borrowerCusId = this.getFactory().contextData.borrowerCusId;
          this.paramsData.borrowerCusName = this.getFactory().contextData.borrowerCusName;
          this.paramsData.borrowerCertCode = this.getFactory().contextData.borrowerCertCode;
        } else if (this.getFactory().contextData.grpSerno) { // 集团流水号
          this.paramsData.bizSerno = this.getFactory().contextData.grpSerno;
          this.paramsData.period = '01';
          this.paramsData.bizType = this.getFactory().contextData.bizType;
          this.paramsData.borrowerCusId = this.getFactory().contextData.borrowerCusId;
          this.paramsData.borrowerCusName = this.getFactory().contextData.borrowerCusName;
          this.paramsData.borrowerCertCode = this.getFactory().contextData.borrowerCertCode;
        } else if (this.getFactory().contextData.pvpSerno) { // 出账流水号（）
          this.paramsData.bizSerno = this.getFactory().contextData.pvpSerno;
          this.paramsData.period = '01';
          this.paramsData.bizType = this.getFactory().contextData.bizType;
          this.paramsData.borrowerCusId = this.getFactory().contextData.borrowerCusId;
          this.paramsData.borrowerCusName = this.getFactory().contextData.borrowerCusName;
          this.paramsData.borrowerCertCode = this.getFactory().contextData.borrowerCertCode;
        }
      }
      if (this.$route.meta.params) {
        //  业务流水号
        if (this.$route.meta.params.biz_serno) {
          this.paramsData.bizSerno = this.$route.meta.params.biz_serno;
          this.paramsData.period = this.$route.meta.params.period;
          this.paramsData.bizType = this.$route.meta.params.bizType;
          this.paramsData.borrowerCusId = this.$route.meta.params.borrowerCusId;
          this.paramsData.borrowerCusName = this.$route.meta.params.borrowerCusName;
          this.paramsData.borrowerCertCode = this.$route.meta.params.certCode;
        } else if (this.$route.meta.params.grpSerno) {
          this.paramsData.bizSerno = this.$route.meta.params.grpSerno;
          this.paramsData.period = '01';
          this.paramsData.bizType = this.$route.meta.params.bizType;
          this.paramsData.borrowerCusId = this.$route.meta.params.borrowerCusId;
          this.paramsData.borrowerCusName = this.$route.meta.params.borrowerCusName;
        } else if (this.$route.meta.params.biz_serno) {
          this.paramsData.bizSerno = this.$route.meta.params.biz_serno;
          this.paramsData.period = this.$route.meta.params.period;
          this.paramsData.bizType = this.$route.meta.params.bizType;
          this.paramsData.borrowerCusId = this.$route.meta.params.borrowerCusId;
          this.paramsData.borrowerCusName = this.$route.meta.params.borrowerCusName;
          this.paramsData.borrowerCertCode = this.$route.meta.params.certCode;
        } else if (this.$route.meta.params.iqpSerno) {
          this.paramsData.bizSerno = this.$route.meta.params.iqpSerno;
          this.paramsData.period = this.$route.meta.params.period;
          this.paramsData.bizType = this.$route.meta.params.bizType;
          this.paramsData.borrowerCusId = this.$route.meta.params.borrowerCusId;
          this.paramsData.borrowerCusName = this.$route.meta.params.borrowerCusName;
          this.paramsData.borrowerCertCode = this.$route.meta.params.borrowerCertCode;
        } else if (this.$route.meta.params.pvpSerno) { // 出账流水号（）
          const params = this.$route.meta.params;
          this.paramsData.bizSerno = params.pvpSerno;
          this.paramsData.period = '01';
          this.paramsData.bizType = params.bizType;
          this.paramsData.borrowerCusId = params.borrowerCusId;
          this.paramsData.borrowerCusName = params.borrowerCusName;
          this.paramsData.borrowerCertCode = params.borrowerCertCode;
        } else if (this.$route.meta.params.serno) { // 合作方调用参数设置
          const params = this.$route.meta.params;
          this.paramsData.bizSerno = params.serno;
          this.paramsData.period = '01';
          this.paramsData.flag = params.flag ? params.flag : null;
          this.paramsData.borrowerCusId = params.partnerNo;
          this.paramsData.borrowerCusName = params.partnerName;
          this.paramsData.borrowerCertCode = params.certCode;
        } else if (this.$route.meta.params.coopAgrSerno) { // 贷后投资调用参数设置
          const params = this.$route.meta.params;
          this.paramsData.bizSerno = params.coopAgrSerno;
          this.paramsData.period = '04';
          this.paramsData.borrowerCusId = params.partnerNo;
          this.paramsData.borrowerCusName = params.partnerName;
          this.paramsData.borrowerCertCode = params.certCode;
        } else if (this.$route.meta.params.taskNo) { // 投贷后征信查询
          const params = this.$route.meta.params;
          this.paramsData.bizSerno = params.taskNo;
          this.paramsData.period = '04';
          this.paramsData.flag = params.flag ? params.flag : '投贷后';
          this.paramsData.borrowerCusId = params.cusId;
          this.paramsData.borrowerCusName = params.cusName;
          this.paramsData.borrowerCertCode = params.certCode;
        }
        // 判断是否是集团客户进入
        if (this.$route.meta.params.model_group_no) {
          // 集团授信进入 模板工厂编号 处理
          if (this.$route.meta.params.model_group_no == 'CMG000536' || this.$route.meta.params.model_group_no == 'CMG000537' || this.$route.meta.params.model_group_no == 'CMG000153') {
            // this.paramsData.bizSerno = '';
            // this.paramsData.bizGrpSerno = this.$route.meta.params.grpSerno;
            this.paramsData.bizSerno = this.$route.meta.params.grpSerno;
            this.paramsData.period = '01';
          }
        }
      }
      if (this.bizPageData && this.bizPageData.iqpSerno) {
        this.paramsData.bizSerno = this.bizPageData.iqpSerno;
        this.paramsData.period = '01';
        this.paramsData.borrowerCusId = this.bizPageData.borrowerCusId;
        this.paramsData.borrowerCusName = this.bizPageData.borrowerCusName;
        this.paramsData.borrowerCertCode = this.bizPageData.certCode;
      }

      // 业务方不传值，默认是01，授权阶段
      this.paramsData.period = this.paramsData.period ? this.paramsData.period : '01';
    },
    applySubmit (_rowObject) {

    },

    // doInsect () {
    //   var _this = this;
    //   this.$dialog.open(
    //     '添加查询用户',
    //     'xwmanage/lmtmanage/indgtLMT/xwcreditRela/creditQryBizRealListInsectIndex',
    //     '880',
    //     '300',
    //     _this.paramsData,
    //     (rtData) => {
    //       if (rtData == 'success') {
    //         _this.d11BillList.queryDataByCondition();
    //       }
    //     }
    //   );
    // },

    doInsectSZ () {
      var _this = this;
      this.$dialog.open(
        '添加查询用户',
        'xwmanage/lmtmanage/indgtLMT/xwcreditRela/creditQryBizRealListSZInsectIndex',
        '880',
        '300',
        _this.paramsData,
        (rtData) => {
          if (rtData == 'success') {
            _this.d12BillList.queryDataByCondition();
          }
        }
      );
    },

    doUpdate () {
      let params = this.d11BillList.getSelectedRowData();
      var _this = this;

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus != '000' && params.approveStatus != '992') {
        _this.$xutils.showMsgBox('提示', '非待发起、打回状态不允许修改。', 350, 200);
        return;
      }
      params.bizSerno = _this.paramsData.bizSerno;
      params.period = _this.paramsData.period;
      params.flag = _this.paramsData.flag;

      this.$dialog.open(
        '修改',
        'xwmanage/lmtmanage/indgtLMT/xwcreditRela/creditQryBizRealListUpdateIndex',
        '880',
        '300',
        params,
        (rtData) => {
          if (rtData == 'success') {
            _this.d11BillList.queryDataByCondition();
          }
        }
      );
    },

    doUpdateSZ () {
      let params = this.d12BillList.getSelectedRowData();
      var _this = this;

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus != '000' && params.approveStatus != '992') {
        _this.$xutils.showMsgBox('提示', '非待发起、打回状态不允许修改。', 350, 200);
        return;
      }
      params.bizSerno = _this.paramsData.bizSerno;

      this.$dialog.open(
        '修改',
        'xwmanage/lmtmanage/indgtLMT/xwcreditRela/creditQryBizRealListSZUpdateIndex',
        '880',
        '300',
        params,
        (rtData) => {
          if (rtData == 'success') {
            _this.d11BillList.queryDataByCondition();
          }
        }
      );
    },

    doView () {
      let params = this.d11BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$dialog.open(
        '查看',
        'xwmanage/lmtmanage/indgtLMT/xwcreditRela/creditQryBizRealListViewIndex',
        -1,
        -1,
        params,
        () => {}
      );
    },

    doDelete () {
      var _this = this;
      let params = this.d11BillList.getSelectedRowData();
      let model = {};

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      // if (params.approveStatus != '000') {
      //   _this.$xutils.showMsgBox('提示', '非待发起状态不允许删除。', 350, 200);
      //   return;
      // }

      model.crqlSerno = params.crqlSerno;
      model.cqbrSerno = params.cqbrSerno;

      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            if (params.approveStatus == '992') {
              params.bizSerno = _this.paramsData.bizSerno;
              params.period = _this.paramsData.period;
              params.flag = _this.paramsData.flag;
              // 更新审批状态 -> 自行退出
              params.approveStatus = '996';
              yufp.service.request({
                method: 'POST',
                url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/updateCreditAndRel`,
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
              // 删除征信信息数据
              yufp.service.request({
                // 同步请求
                async: false,
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/creditreportqrylst/deleteCreditAndRel',
                data: JSON.stringify(model),
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
    },

    doDeleteSZ () {
      var _this = this;
      let params = this.d12BillList.getSelectedRowData();
      let model = {};

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus != '000') {
        _this.$xutils.showMsgBox('提示', '非待发起状态不允许删除。', 350, 200);
        return;
      }

      model.crqlSerno = params.crqlSerno;
      model.cqbrSerno = params.cqbrSerno;

      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            if (params.approveStatus == '992') {
              params.bizSerno = _this.paramsData.bizSerno;
              params.period = _this.paramsData.period;
              params.flag = _this.paramsData.flag;
              // 更新审批状态 -> 自行退出
              params.approveStatus = '996';
              yufp.service.request({
                method: 'POST',
                url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/updateCreditAndRel`,
                data: JSON.stringify(params),
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$xutils.showMsgBox('提示', '自行退出成功!', 500, 300, function () {
                      _this.d12BillList.$refs.refTable.remoteData();
                    });
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                  }
                }
              });
            } else {
              // 删除征信信息数据
              yufp.service.request({
                // 同步请求
                async: false,
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/creditreportqrylst/deleteCreditAndRel',
                data: JSON.stringify(model),
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$xutils.showMsgBox('提示', '删除成功!', 500, 300, function () {
                      _this.d12BillList.$refs.refTable.remoteData();
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
    },

    deleteCreditQryBiz (params) {
      // 删除征信关联信息数据
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditqrybizreal/delete/' + params.cqbrSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '删除成功!', 500, 300, function () {
              _this.d11BillList.$refs.refTable.remoteData();
              _this.d12BillList.$refs.refTable.remoteData();
            });
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    doViewSZ () {
      let params = this.d12BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$dialog.open(
        '查看',
        'xwmanage/lmtmanage/indgtLMT/xwcreditRela/creditQryBizRealListSZViewIndex',
        880,
        350,
        params,
        () => {}
      );
    },

    doReportViewRecord () {
      const params = this.d11BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$dialog.open(
        '征信报告查看记录',
        'creditmanage/creditReportQryRecordListIndex',
        '880',
        '300',
        params,
        () => {}
      );
    },

    doReportViewRecordSZ () {
      const params = this.d12BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$dialog.open(
        '征信报告查看记录',
        'creditmanage/creditReportQryRecordListIndex',
        '880',
        '300',
        params,
        () => {}
      );
    }
  }
};
</script>
