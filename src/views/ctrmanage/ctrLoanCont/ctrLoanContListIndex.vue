<template>
  <yu-tabs type="card">
    <yu-tab-pane label="待签合同">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="历史合同">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './ctrLoanContList_d1_1_BillList.vue';
import d12Billlist from './ctrLoanContList_d1_2_BillList.vue';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY');
export default {
  components: { d11Billlist, d12Billlist },
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
    // 用信管理/开证待签协议/开证历史协议
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 打印
    onPrint () {
      const params = this.d1_1_BillList.getSelectedRowData();
      // var contPrintNum = params.cont_print_num;
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var contPageType = '';// 合同版面标识
      var isESeal = params.isESeal;// 是否电子用印
      if (isESeal !== '0') {
        let managerId = params.managerId;
        const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
        let loginCode = userInfo.loginCode;
        if (managerId == loginCode) {
          contPageType = '2';
        } else {
          contPageType = '3';
        }
      } else {
        contPageType = '1';
      }
      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: params.contNo, // 合同编号
        serno: params.iqpSerno, // 流水号
        contType: '1',
        suitContType: params.contType, // 适用合同类型
        suitPrd: params.prdId, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: '' // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
      var contList = [];
      contList.push(params.contNo);
      // 担保合同
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByContNohtdy',
        data: JSON.stringify(contList),
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            let guarData = response.data;
            for (let i = 0; i < guarData.length; i++) {
              let param2 = {};
              param2.contNo = params.contNo; // 借款合同号
              param2.serno = params.iqpSerno; // 借款合同流水号
              param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
              param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
              param2.contType = '2';
              param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
              param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
              param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
              param2.pldContType = guarData[i].pldContType; // 质押合同类型
              param2.isESeal = isESeal; // 是否电子用印
              param2.contPageType = contPageType; // 合同版面标识
              param2.matchFlag = ''; // 特定匹配标识
              paramList.push(param2);
            }
          }
        }
      });
      this.$dialog.open(
        '合同打印',
        'printManage/index',
        800,
        500,
        paramList,
        null,
        true,
        true
      );
      // this.$xutils.showMsgBox('提示', '开发中!', 350, 150);
      // let _this = this;
      // let name = 'ctrmanage/ctrLoanCont/frptdemo';
      // let key = 'frptdemo';
      // params.src = 'http://10.85.10.38:8080/dscms/frpt/decision/view/report?viewlet=WorkBook16.cpt';
      // _this.$router.addTab({
      //   // 路由名称
      //   name: name,
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: key, // 必传
      //   // 页签名称
      //   title: '帆软打印',
      //   // 传递的业务数据，可选配置
      //   data: params
      // });
    },

    // 签订
    onSign () {
      const params = this.d1_1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (params.contStatus != '100') {
        this.$xutils.showMsgBox('提示', '请选择一条合同状态为“未生效”的记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$dialog.open('普通贷款合同签订', 'ctrmanage/ctrLoanCont/ctrLoanContAddIndex', 900, 800, params, () => {
        this.d1_1_BillList.$refs.refTable.remoteData(); // 刷新页面
        this.d1_2_BillList.$refs.refTable.remoteData(); // 刷新页面
      });
    },

    // 查看
    onView () {
      let params = this.d1_1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      params.opType = 'view';
      params.op = 'VIEW';
      this.goToDetailFn(params);
    },

    // 调用模板工厂配置的详情界面
    goToDetailFn (row) {
      // row.model_group_no = 'CMG000243';
      row.bizOp = row.op;
      row['model_group_no'] = 'CMG000015';
      // this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   -1,
      //   -1,
      //   row,
      //   true,
      //   true
      // );
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: row.contNo + row.bizOp,
        title: '普通贷款合同详情',
        data: row
      });
    },

    // 注销
    onLogout () {
      const params = this.d1_1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      // params['contStatus'] = '600';
      this.$xutils.showConfirmBox('提示', '是否确认注销?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/ctrloancont/onlogout',
            data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                if (response.data.rtnCode == '000000') {
                  this.$xutils.showMsgBox('提示', '注销成功!', 350, 150, this.getRefreshList);
                } else {
                  this.$xutils.showMsgBox(response.data.rtnMsg);
                }
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
              }
            },
            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    },

    // 合同历史的注销
    onLogoutHis () {
      var _this = this;
      const params = this.d1_2_BillList.getSelectedRowData();
      if (params == null || params == '') {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      // params['contStatus'] = '600';
      this.$xutils.showConfirmBox('提示', '是否确认注销?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          _this.$xutils.request({
            // 同步请求
            async: false,
            url: _this.$backend.cmisBiz + '/api/ctrloancont/onlogout',
            data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                if (response.data.rtnCode == '000000') {
                  _this.$xutils.showMsgBox('提示', '注销成功!', 350, 150, _this.getRefreshList);
                } else {
                  _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                }
              } else {
                _this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
              }
            },
            error: (result, b) => {
              _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    },

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
      this.d1_2_BillList.queryDataByCondition();
    },

    // 打印
    onPrintHis () {
      const params = this.d1_2_BillList.getSelectedRowData();
      const contPrintNum = params.contPrintNum;

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      var contPageType = '';// 合同版面标识
      var isESeal = params.isESeal;// 是否电子用印
      if (isESeal !== '0') {
        let managerId = params.managerId;
        const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
        let loginCode = userInfo.loginCode;
        if (managerId == loginCode) {
          contPageType = '2';
        } else {
          contPageType = '3';
        }
      } else {
        contPageType = '1';
      }
      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: params.contNo, // 合同编号
        serno: params.iqpSerno, // 流水号
        contType: '1',
        suitContType: params.contType, // 适用合同类型
        suitPrd: params.prdId, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: '' // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
      var contList = [];
      contList.push(params.contNo);
      // 担保合同
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByContNohtdy',
        data: JSON.stringify(contList),
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            let guarData = response.data;
            for (let i = 0; i < guarData.length; i++) {
              let param2 = {};
              param2.contNo = params.contNo; // 借款合同号
              param2.serno = params.iqpSerno; // 借款合同流水号
              param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
              param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
              param2.contType = '2';
              param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
              param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
              param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
              param2.pldContType = guarData[i].pldContType; // 质押合同类型
              param2.isESeal = isESeal; // 是否电子用印
              param2.contPageType = contPageType; // 合同版面标识
              param2.matchFlag = ''; // 特定匹配标识
              paramList.push(param2);
            }
          }
        }
      });
      this.$dialog.open(
        '合同打印',
        'printManage/index',
        800,
        500,
        paramList,
        null,
        true,
        true
      );
    },

    // 查看
    onViewHis () {
      const params = this.d1_2_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      params.opType = 'view';
      params.op = 'VIEW';
      this.goToDetailFn(params);
    },

    // 重签
    onReSign () {
      const params = this.d1_2_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (params.contStatus != '200') {
        this.$xutils.showMsgBox('提示', '请选择一条合同状态为“生效”的记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      // params['contStatus'] = '100';
      // params[''];
      this.$xutils.showConfirmBox('提示', '是否确认重签?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/ctrloancont/contReSign',
            data: JSON.stringify(params),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                if (response.data.rtnCode == '000000') {
                  this.$xutils.showMsgBox('提示', '重签成功!', 350, 150, this.getRefreshList);
                } else {
                  this.$xutils.showMsgBox(response.data.rtnMsg);
                }
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
              }
            },
            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    }
  }
};
</script>
