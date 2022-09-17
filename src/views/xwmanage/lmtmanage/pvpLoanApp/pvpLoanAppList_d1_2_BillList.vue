<template>
  <div>
    <yu-panel title="放款申请列表信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="pvpSerno" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="审批状态 " ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态 " name="approveStatus" ></yu-xform-item>
           <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" fuzzy-query="both" v-if="show"></yu-xform-item>
               <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both" v-if="show"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>

        </yu-button-drop>
      </template>
         <yu-button ref="btn_doViews" @click="lookdate" type="primary" v-if="checkCtrl('lookdate1')">查看</yu-button>
         <yu-button ref="btn_doRevApp" @click="doRevApp" type="primary" v-if="checkCtrl('doRevApp')">冲正申请</yu-button>
         <yu-button ref="btn_doRevApp" @click="prtDisbOut" type="primary" v-if="checkCtrl('prtDisbOut')">打印放款通知书</yu-button>
         <yu-button ref="btn_doAnnulApp" @click="doAnnulApp" type="primary" v-if="checkCtrl('doAnnulApp')">撤销放款授权</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="baseParams" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
         <yu-xtable-column label="业务编号" prop="pvpSerno" width="180"></yu-xtable-column>
         <yu-xtable-column label="借据编号" prop="billNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="200"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="本次出账金额" prop="pvpAmt"></yu-xtable-column>
        <yu-xtable-column label="借据起始日期" prop="loanStartDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="借据到期日期" prop="loanEndDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="借据签订日期" prop="" v-if="show" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请期限" prop="approveTerm" v-if="show"></yu-xtable-column>
         <yu-xtable-column label="登记人" prop="updIdName" v-if="show"></yu-xtable-column>
         <yu-xtable-column label="责任人" prop="managerId" v-if="show"></yu-xtable-column>
         <yu-xtable-column label="责任人" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="inputIdName" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="审批状态 " prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
         <yu-xtable-column label="进件渠道" prop="chnlSour" data-code="STD_APP_CHNL"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D12BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pvpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/pvploanapp/selectDataByModel',
      baseParams: {condition: {whData: '111,997,996,998', belgLine: '01', managerId: this.$store.state.oauth.loginCode}, sort: 'createTime desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/pvploanapp/delete/'
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  mounted () {
    // this.afterInit();
  },
  methods: {
    doRevApp () {
      var _this = this;
      let rowData = _this.$refs.refTable.selections;
      if (rowData.length != 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      var authStatus;
      this.$request({
        url: backend.cmisBiz + '/api/pvpauthorize/getAuthStatus/' + rowData[0].pvpSerno,
        method: 'GET',
        async: false
      }).then(({code, message, data}) => {
        authStatus = data.data;
      });
      if (authStatus != '2') {
        _this.$message({
          message: '该项数据不满足冲正申请条件，请核实业务状态！',
          type: 'warning'
        });
        return;
      }
      // 出账授权
      this.$request({
        url: backend.cmisBiz + '/api/pvpauthorize/czsq',
        method: 'post',
        data: rowData[0]
      }).then(({code, message, data}) => {
        if (data != null) {
          this.$message({
            message: message,
            type: 'success'
          });
          this.$refs.refTable.remoteData();
        } else {
          // 失败
          this.$message({
            message: message,
            type: 'warning'
          });
        }
      });
    },

    /** 2021年9月4日14:35:56  hubp 新增 撤销放款授权按钮
     */
    doAnnulApp () {
      var _this = this;
      let rowData = _this.$refs.refTable.selections;
      if (rowData.length != 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      this.$request({
        url: backend.cmisBiz + '/api/pvploanapp/annulpvploanapp',
        method: 'POST',
        async: false,
        data: rowData[0]
      }).then(({code, message, data}) => {
        debugger;
        if (data.code == '000000') {
          _this.$notify({
            title: '提示',
            message: '撤销放款授权成功',
            special: true,
            type: 'success'
          });
        } else {
          _this.$notify({
            title: '提示',
            message: data.erortx,
            special: true,
            type: 'warning'
          });
        }
      });
    },
    lookdate () {
      if (!this.$refs.refTable.selections.length == 1) {
        this.$message({message: '请选择一条数据'});
      }
      var data = this.$refs.refTable.selections[0];
      data.PageType = 'LOOK';
      this.nextPage(data);
    },

    nextPage (data) {
      data['op'] = 'VIEW';
      data['model_group_no'] = 'CMG000418';
      data['serno'] = data.pvpSerno;
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: 'ckfksq' + new Date().getTime(),
        title: data.pvpSerno,
        data: data
      });
    },
    // 打印放款通知书
    prtDisbOut () {
      var _this = this;
      let rowData = {};
      if (_this.$refs.refTable.selections.length != 0) {
        rowData = _this.$refs.refTable.selections[0];
        var authStatus;
        this.$request({
          url: backend.cmisBiz + '/api/pvpauthorize/getAuthStatus/' + rowData.pvpSerno,
          method: 'GET',
          async: false
        }).then(({code, message, data}) => {
          authStatus = data.data;
        });
        if (authStatus != '2') {
          _this.$message({
            message: '该项数据不满足打印放款通知书条件，请核实业务状态！',
            type: 'warning'
          });
          return;
        }

        this.$request({
          url: backend.cmisBiz + '/api/pvpauthorize/getTranSerno/' + rowData.pvpSerno,
          method: 'POST',
          async: false
        }).then(({code, message, data}) => {
          rowData.tranSerno = data.data;
        });
        if (rowData.tranSerno == null || rowData.tranSerno == '') {
          _this.$message({
            message: '该项数据不满足打印放款通知书条件，暂未生成交易流水号',
            type: 'warning'
          });
          return;
        }
        // 打印
        let name = 'xwmanage/iqpManage/contManage/frptdemo';
        let keydemo = 'frptdemo';
        // rowData.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwyx-fk.cpt&tranSerno=' + rowData.tranSerno;
        rowData.src = _this.$backend.frptRptService + 'xwyx-fk.cpt&tranSerno=' + rowData.tranSerno;
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: keydemo + new Date().getTime(), // 必传
          // 页签名称
          title: '额度支用申请书打印',
          // 传递的业务数据，可选配置
          data: rowData
        });
      } else {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
    }
  }
};
</script>
