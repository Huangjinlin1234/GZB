<template>
  <yu-tabs type="card">
    <yu-tab-pane label="待签协议">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="历史协议">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './ctrDiscContList_d1_1_BillList.vue';
import d12Billlist from './ctrDiscContList_d1_2_BillList.vue';
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
    // 用信管理/贴现待签协议/贴现历史协议
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // // 打印
    // onPrint () {
    //   var _this = this;
    //   const params = this.d1_1_BillList.getSelectedRowData();
    //   if (params == null || params == '') {
    //     this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
    //     return;
    //   }
    //   let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
    //   let keydemo = 'frptdemo';
    //   params.src = _this.$backend.frptRptService + '银行承兑汇票贴现协议.cpt&SERNO=' + params.serno;
    //   _this.$router.addTab({
    //     // 路由名称
    //     name: name,
    //     // 自定义唯一页签key,请统一使用custom_前缀开头
    //     key: keydemo, // 必传
    //     // 页签名称
    //     title: '帆软打印',
    //     // 传递的业务数据，可选配置
    //     data: params
    //   });
    // },
    // 打印
    onPrint () {
      const params = this.d1_1_BillList.getSelectedRowData();
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
      // 贴现协议需要转为适用合同类型
      var suitContType = '';
      if (params.discContType == '01') {
        suitContType = '1';
      } else if (params.discContType == '02') {
        suitContType = '2';
      }
      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.serno
      };
      // 借款合同
      var params1 = {
        contNo: params.contNo, // 合同编号
        serno: params.serno, // 流水号
        contType: '1',
        suitContType: suitContType, // 适用合同类型
        suitPrd: params.prdId, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: params.isEDrft, // 是否电子票据
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
              param2.serno = params.serno; // 借款合同流水号
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

    // // 打印
    // onPrintHis () {
    //   var _this = this;
    //   const params = this.d1_2_BillList.getSelectedRowData();
    //   if (params == null || params == '') {
    //     this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
    //     return;
    //   }
    //   let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
    //   let keydemo = 'frptdemo';
    //   params.src = _this.$backend.frptRptService + '银行承兑汇票贴现协议.cpt&SERNO=' + params.serno;
    //   _this.$router.addTab({
    //     // 路由名称
    //     name: name,
    //     // 自定义唯一页签key,请统一使用custom_前缀开头
    //     key: keydemo, // 必传
    //     // 页签名称
    //     title: '帆软打印',
    //     // 传递的业务数据，可选配置
    //     data: params
    //   });
    // },

    // 打印
    onPrintHis () {
      const params = this.d1_2_BillList.getSelectedRowData();
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
      // 贴现协议需要转为适用合同类型
      var suitContType = '';
      if (params.discContType == '01') {
        suitContType = '1';
      } else if (params.discContType == '02') {
        suitContType = '2';
      }
      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.serno
      };
      // 借款合同
      var params1 = {
        contNo: params.contNo, // 合同编号
        serno: params.serno, // 流水号
        contType: '1',
        suitContType: suitContType, // 适用合同类型
        suitPrd: params.prdId, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: params.isEDrft, // 是否电子票据
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
              param2.serno = params.serno; // 借款合同流水号
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

    // 签订
    onSign () {
      let params = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(params, jsoPar);
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$dialog.open('贴现协议签订', 'ctrmanage/ctrDiscCont/ctrDiscContAddIndex', 800, 700, jsoPar, () => {
        this.d1_1_BillList.queryDataByCondition(); // 刷新页面
        this.d1_2_BillList.queryDataByCondition(); // 刷新页面
      });
    },

    // 查看
    onView () {
      // const params = this.d1_1_BillList.getSelectedRowData();
      let params = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(params, jsoPar);
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    },

    // 调用模板工厂配置的详情界面
    goToDetailFn (row) {
      row.model_group_no = 'CMG000359';
      row.bizSerno = row.serno;
      row.bizOp = row.op;

      // this.$dialog.open('贴现协议', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, row, () => {
      //   // 模板工厂页面关闭时，判断是否存在额度分项录入担保信息的tab页面，若是存在则一同关闭
      //   const opentTitle = '贴现申请';

      //   const openMenuTab = this.getOpenMenuTab(opentTitle);

      //   if (openMenuTab.length == 1) {
      //     // 关闭子页面的弹窗
      //     this.$xutils.removeMenuTab(opentTitle);
      //   }
      // });
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: row.bizSerno + row.bizOp,
        title: '贴现协议详情',
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

      this.$xutils.showConfirmBox('提示', '是否确认注销?\r\n请谨慎操作!', 350, 150, isOK => {
        // params['contStatus'] = '300';
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,

            url: this.$backend.cmisBiz + '/api/ctrdisccont/onlogout',
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

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
      this.d1_2_BillList.queryDataByCondition();
    },

    // // 打印
    // onPrintHis () {
    //   const params = this.d1_2_BillList.getSelectedRowData();
    //   const contPrintNum = params.contPrintNum;

    //   if (params == null || params == '') {
    //     this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
    //     return;
    //   }
    // },

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
      this.$xutils.showConfirmBox('提示', '是否确认重签?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/ctrdisccont/contReSign',
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

    // 合同历史的注销
    onLogoutHis () {
      const params = this.d1_2_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (params.contStatus != '200') {
        this.$xutils.showMsgBox('提示', '请选择一条合同状态为“生效”的记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否确认注销?\r\n请谨慎操作!', 350, 150, isOK => {
        // params['contStatus'] = '300';
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,

            url: this.$backend.cmisBiz + '/api/ctrdisccont/onlogout',
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
    }
  }
};
</script>
