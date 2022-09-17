<template>
  <div>
    <div>
      <d1-a-billlist ref="d1_A_BillList" :params="params" :node="childParams" v-show="isdyz"></d1-a-billlist>
    </div>
    <div>
      <d1-b-billlist ref="d1_B_BillList" v-show="isbzr" :node="childParams"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABilllist from './grtGuarCont_d1_A_BillList.vue';
import d1BBilllist from './grtGuarCont_d1_B_BillList.vue';
// 保证担保合同
export default {
  components: {d1ABilllist, d1BBilllist},
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String,
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  computed: {
    childParams: function () {
      let params = {
        iqpSerno: this.node.iqpSerno
      };
      return params;
    }
  },
  data () {
    return {
      d1_A_BillList: null,
      d1_B_BillList: null,
      isdyz: false,
      isbzr: false,
      catalogId: null,
      guarWay: null,
      params: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      _this.d1_A_BillList = _this.$refs.d1_A_BillList;
      _this.d1_B_BillList = _this.$refs.d1_B_BillList;
      var iqpSerno = _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno;
      _this.params['iqp_Serno'] = iqpSerno;
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/queryByiqpSernoDetail',
        data: {iqpSerno: iqpSerno},
        callback: function (code, message, response) {
          _this.guarWay = response.data.guarWay;
          if (_this.guarWay == '10') { // 抵押
            _this.params['grtFlag'] = '01';// 抵押
          } else {
            _this.params['grtFlag'] = '02';// 质押
          }
          yufp.service.request({
            async: true,
            method: 'POST',
            url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
            data: response.data.prdId,
            callback: function (code, message, response) {
              _this.catalogId = response.data.catalogId;
              yufp.service.request({
                method: 'POST',
                url: backend.cmisBiz + '/api/iqphouse/querybyiqpserno',
                data: {iqpSerno: iqpSerno},
                callback: function (code, message, response) {
                  if (_this.catalogId == 'C000700020001' && response.data.houseStatus == '01' && _this.guarWay == '30') {
                    _this.isdyz = true;
                    _this.isbzr = true;
                  } else {
                    if (_this.guarWay == '10' || _this.guarWay == '20' || _this.guarWay == '21' || _this.guarWay == '40') {
                      _this.isdyz = true;
                    } else if (_this.guarWay == '30') {
                      _this.isbzr = true;
                    }
                  }
                }
              });
            }
          });
        }
      });
    },

    // 点击引入，进入抵质押引入页面
    OnImport () {
      this.$dialog.open(
        '引入抵质押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCard',
        1100,
        650,
        this.params,
        () => {
          // 列表刷新
          this.d1_A_BillList.queryDataByCondition();
        }
      );
    },

    // 新增保证人
    onAddBZ () {
      const params = {};
      params['serno'] = this.$route.params.iqpSerno;
      params['callMethod'] = 'tGuarExistQry';
      params['grtFlag'] = '03';// 03保证
      params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      const url = this.getGuarSysUrl(params);
      // let date = new Date();
      if (url != '') {
        this.$nextTick(function () {
          window.open(url, '_blank');
        });
      }
    },

    /*
      获取跳转押品系统url
       */
    getGuarSysUrl (params) {
      const rsPars = {};
      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }

          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    },

    // 点击引入，进入保证人引入页面
    OnImportGuar () {
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfo',
        1100,
        650,
        this.params,
        () => {
          // 列表刷新
          this.d1_B_BillList.queryDataByCondition();
        }
      );
    },
    // 保证人删除申请
    delete () {
      const params = this.d1_B_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // var pkId = params.pkId;
      this.$xutils.showConfirmBox(
        '提示',
        '删除操作会删除业务申请主表以及子表信息！是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/guarbizrel/deleteguarinforelGuarantee',
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.d1_B_BillList.queryDataByCondition();
                  });
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },
    // 抵质押删除申请
    deleteGuar () {
      const params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$xutils.showConfirmBox(
        '提示',
        '删除操作会删除业务申请主表以及子表信息！是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/guarbizrel/deleteByPrimaryKey',
              data: {pkId: params.pkId},
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.d1_A_BillList.queryDataByCondition();
                  });
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },
    // 抵押物修改申请
    doUpdate () {
      const params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['biz_type'] = '02';
      this.params['guarNo'] = params.guarNo;
      this.params['serno'] = params.serno;
      this.params['pkId'] = params.pkId;
      this.params['op'] = 'EDIT';
      this.$dialog.open(
        '引入抵押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCardUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.d1_A_BillList.queryDataByCondition();
        }
      );
    },
    // 抵押物查看
    doView () {
      const params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['biz_type'] = '02';
      this.params['guarNo'] = params.guarNo;
      this.params['serno'] = params.serno;
      this.params['pkId'] = params.pkId;
      this.params['op'] = 'VIEW';
      this.$dialog.open(
        '引入抵押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCardUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.d1_A_BillList.queryDataByCondition();
        }
      );
    },
    // 修改申请
    doUpdateGuarantee () {
      const params = this.d1_B_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['biz_type'] = '02';
      this.params['serno'] = params.serno;
      this.params['guarantyId'] = params.guarantyId;
      this.params['pkId'] = params.pkId;
      this.params['cusId'] = params.cusId;
      this.params['op'] = 'EDIT';
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfoUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          // 列表刷新
          this.d1_B_BillList.queryDataByCondition();
        }
      );
    },
    // 查看申请
    doViewGuarantee () {
      const params = this.d1_B_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['biz_type'] = '02';
      this.params['serno'] = params.serno;
      this.params['guarantyId'] = params.guarantyId;
      this.params['pkId'] = params.pkId;
      this.params['cusId'] = params.cusId;
      this.params['op'] = 'VIEW';
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfoUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          // 列表刷新
          this.d1_B_BillList.queryDataByCondition();
        }
      );
    },
    // 返回
    OnCancel () {
      this.$dialog.close(this.dialogId);
    },
     // 刷新列表数据
    freshList () {
      this.d1_B_BillList.queryDataByCondition();
    },
  }
};
</script>
