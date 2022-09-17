<template>
  <d1-billlist ref="d1_BillList" :page-params="pageParams"></d1-billlist>
</template>
<script>
import d1Billlist from './accLoanList_d1_BillListForXd.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /* 小微贷款台账列表*/
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      if (this.$route.query && this.$route.query.accStatus) {
        this.d1_BillList.baseParams.condition.accStatus = this.$route.query.accStatus;
      }
      this.d1_BillList.queryDataByCondition();
    },

    // 查看
    doView () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 贷款台账模块
      params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
      params['op'] = 'VIEW';
      params['bill_no'] = params.billNo;
      params['accLoan'] = true;
      params['prd_type_prop'] = params.prdTypeProp;
      this.$dialog.open(
        '贷款台账',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
    },
    // 打印台账
    doPrint () {
      var _this = this;
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (params.pvpSerno == null || params.pvpSerno == '') {
        _this.$xutils.showMsgBox('提示', '台账编号号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      // let name = 'ctrmanage/ctrLoanCont/frptdemo';
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件 'iqpManage/accloan/frptdemo';
      let keydemo = 'frptdemo';
      // 本地调试 params.src = 'http://10.87.3.24:8080/dscms/frpt/decision/view/report?viewlet=pvpLoanApp.cpt&PVP_SERNO=' + params[0].pvpSerno;
      params.src = _this.$backend.frptRptService + 'printAccLoan.cpt&PVP_SERNO=' + params.pvpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    // 打印结清证明
    doPrintJq () {
      var _this = this;
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (params.pvpSerno == null || params.pvpSerno == '') {
        _this.$xutils.showMsgBox('提示', '台账编号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      // // let name = 'ctrmanage/ctrLoanCont/frptdemo';
      // let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件 'iqpManage/accloan/frptdemo';
      // let keydemo = 'frptdemo';
      // // 本地调试 params.src = 'http://10.87.3.24:8080/dscms/frpt/decision/view/report?viewlet=pvpLoanApp.cpt&PVP_SERNO=' + params[0].pvpSerno;
      // params.src = _this.$backend.frptRptService + 'printLoanOff.cpt&PVP_SERNO=' + params.pvpSerno;
      // _this.$router.addTab({
      //   // 路由名称
      //   name: name,
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: keydemo, // 必传
      //   // 页签名称
      //   title: '帆软打印',
      //   // 传递的业务数据，可选配置
      //   data: params
      // });
      this.viewCfca(params);
    },
    // 打开有章的PDF文件
    viewCfca (row) {
      var _this = this;
      row.contPageType = '3';
      // 对传入参数进行重新拼装
      var map = {};
      map.PVP_SERNO = row.pvpSerno;
      // 获取当前登录人信息
      const userInfo = _this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let loginCode = userInfo.loginCode;
      let orgCode = userInfo.orgCode;
      // 构建cfcaDto对象
      var model = {
        pdfFileName: row.pvpSerno + '_printLoanOff.pdf', // 生成的PDF文件名称
        managerId: loginCode,
        managerBrId: orgCode,
        sealserno: row.pvpSerno, // 印章流水号
        crossSealFlag: row.contPageType == '2', // 骑缝章标识(true/false)
        keySealFlag: row.contPageType == '3', // 专用章标识(true/false)
        keyWord: '银行盖章', // 盖章关键字，仅用于专用章标识为true,在此字段周围盖章
        templateId: 'printLoanOff.cpt', // 报表英文名称
        map: map, // 帆软报表参数
        contType: '1' // 合同标识 01--借款合同 02--抵押登记
      };
      yufp.service.request({
        method: 'POST',
        data: model,
        url: backend.cmisFrpt + '/dscms/frpt/api/frpt/addElectronicSeal',
        callback: function (code, message, response) {
          if (code == '0') {
            // 下载PDF文件
            yufp.service.request({
              method: 'POST',
              data: {'path': response.data},
              url: backend.cmisFrpt + '/dscms/frpt/api/frpt/downloadPdf',
              responseType: 'blob',
              callback: function (code, message, response) {
                if (response != null && response != '') {
                  // 1、在线打开方法，目前在谷歌与EDGE浏览器验证过
                  window.open(URL.createObjectURL(response));

                  // 2、下载方法
                  // var fileName = this.$xutils.getDefaultformulaData("UUID");
                  // if(window.navigator && window.navigator.msSaveOrOpenBlob){ //打开tab页签下载,IE11可能会报错（未验证）
                  //   window.navigator.msSaveOrOpenBlob(response, fileName);
                  // }else{ //模拟a标签下载
                  //   let link = document.createElement("a");
                  //   link.download = fileName;
                  //   link.style.display = "none";
                  //   link.href = URL.createObjectURL(response);
                  //   document.body.appendChild(link);
                  //   link.click();
                  //   URL.revokeObjectURL(link.href);
                  //   document.body.removeChild(link);
                  // }
                } else {
                  _this.$message({message: '下载PDF文件失败', type: 'warning'});
                }
              }
            });
          } else {
            _this.$message({message: message, type: 'warning'});
          }
        }
      });
    },
    /** 标识贷款 **/
    doFlagLoan () {
      var _this = this;
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      _this.$router.addTab({
        // 路由名称
        // name: 'zrcbank/biz/fileManage/documentArchive/documentArchiveApplyDetail',
        name: 'xwmanage/iqpManage/accLoan/accLoanFlagEdit',
        // 自定义唯一页签key
        key: '1' + new Date().getTime(), // 必传
        // 页签名称
        title: '贷款标识修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          josnData: params
        }
      });
    },
    /** 根据借据号去核心同步台账状态和贷款余额 **/
    doSynchronize () {
      var _this = this;
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$confirm('确定要同步核心台账状态和贷款余额？', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: params.billNo,
              url: backend.cmisBiz + '/api/accloan/synchronizeAccLoan',
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({message: response.message, type: 'success'});
                } else {
                  _this.$message({message: response.message, type: 'warning'});
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
