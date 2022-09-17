<template>
<div>
  <yu-tabs type="card" v-model="tabPanelName" >
    <yu-tab-pane label="授信调查待办" name="01">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="授信调查历史" name="02">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
    <yufpNwfRisk ref="yufpNwfRisk"></yufpNwfRisk>
</div>
</template>
<script>
import d11Billlist from './indgtLMTList_d1_1_BillList.vue';
import d12Billlist from './indgtLMTList_d1_2_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRisk from '@/components/widgets/YufpNwfRisk';
import { lookup } from '@/utils';
lookup.reg('STD_XD_DCBG_TYPE,STD_DATA_SOUR,STD_ZB_YES_NO,BELG_TEAM,STD_REPLY_STATUS,STD_XD_REPLY_STATUS,STD_TEAM_TYPE');


export default {
  components: {d11Billlist, d12Billlist, yufpNwfInit, yufpNwfRisk},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      daiban: null,
      lishi: null,
      tabPanelName: '01'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 增加了一行注释
    afterInit () {
      this.daiban = this.$refs.d1_1_BillList;
      this.lishi = this.$refs.d1_2_BillList;
    },

    /* 提交审批*/
    Submit () {
      let rowData;
      var _this = this;
      if (this.tabPanelName == '01') {
        rowData = this.daiban.getSelectedRowData();
      }
      if (rowData == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      if (rowData.approveStatus != '000' && rowData.approveStatus != '992') {
        this.$message({message: '只能提交审批状态为待发起或退回的授信单'});
        return;
      }
      if (rowData.surveyType == '10') {
        // 增享贷查询有无30天内征信报告
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/submitzxd',
          data: {surveySerno: rowData.surveySerno, certCode: rowData.certCode}
        }).then((res) => {
        // 请求成功
          if (res.data == 0) {
            // 操作成功
            this.startAndSubmit(rowData);
          } else {
          // 操作失败
            this.$message({ message: res.message, type: 'warning' });
          }
        });
      } else if (rowData.surveyType == '9' || rowData.surveyType == '15') {
        // 优抵贷
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/submitydd',
          data: {surveySerno: rowData.surveySerno}
        }).then((res) => {
        // 请求成功
          if (res.data == 0) {
          // 操作成功
            this.startAndSubmit(rowData);
          } else {
          // 操作失败
            this.$message({ message: res.message, type: 'warning' });
          }
        });
      } else if (rowData.surveyType == '12') {
        // 优企贷
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/submityqd',
          data: rowData
        }).then((res) => {
          // 请求成功
          // 修改bug ---wzy
          if (res.data) {
          // 操作成功
            this.startAndSubmit(rowData);
          } else {
          // 操作失败
            this.$message({ message: res.message, type: 'warning' });
            this.daiban.$refs.refTable.remoteData();
            this.lishi.$refs.refTable.remoteData();
          }
        });
      } else if (rowData.surveyType == '7' || rowData.surveyType == '14') {
        // 无还本
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/submitwhb',
          data: {surveySerno: rowData.surveySerno}
        }).then((res) => {
        // 请求成功
          if (res.data) {
          // 操作成功
            this.startAndSubmit(rowData);
          } else {
          // 操作失败
            this.$message({ message: res.message, type: 'warning' });
          }
        });
      } else {
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/submit',
          data: {surveySerno: rowData.surveySerno}
        }).then((res) => {
        // 请求成功
          if (res.data) {
          // 操作成功
            this.startAndSubmit(rowData);
          } else {
          // 操作失败
            this.$message({ message: res.message, type: 'warning' });
          }
        });
      }
    },

    /**
     */
    saveData () {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/zxdsubmit',
        data: {surveySerno: this.daiban.getSelectedRowData().surveySerno},
        callback: function (code, message, response) {
          if (response.code == '0000') {
            _this.$message({message: '提交成功！', type: 'success'});
            this.submitSuccess();
          } else {
            _this.$message({message: response.message, type: 'danger'});
          }
        }
      });
    },
    /**
     * 流程提交节点选择框
     */
    startAndSubmit (rowData) {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      // startdto.bizType = 'XWYW01';
      startdto.bizType = this.getBizType(rowData);
      // startdto.bizType = 'XD_PERFER_RATE_APPLY_TEST';
      startdto.bizId = rowData.surveySerno;
      startdto.bizUserName = rowData.cusName;
      startdto.bizUserId = rowData.cusId;
      startdto.param = {
        surveyType: rowData.surveyType
      };
      if (startdto.bizType === 'XW009') {
        let param = {
          nodeId: '294_5'
        };
        _this.$refs.yufpNwfRisk.riskFn(param, startdto);
      } else {
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },

    /**
     * 通过调查编号来判断 bizType
     */

    getBizType (rowData) {
      let surveyType = rowData.surveyType;
      let bizType = '';
      if (surveyType == '11') { // 惠享贷
        bizType = 'XW001';
      } else if (surveyType == '9') { // 优抵贷尽职调查报告
        bizType = 'XW004';
      } else if (surveyType == '15') { // 优抵贷税务调查报告
        bizType = 'XW005';
      } else if (surveyType == '7') { // 无还本普转调查报告
        bizType = 'XW006';
      } else if (surveyType == '14') { // 无还本优转调查报告
        bizType = 'XW007';
      } else if (surveyType == '12') { // 优企贷
        bizType = 'XW008';
      } else if (surveyType == '10') { // 增享贷
        bizType = 'XW009';
      } else {
        bizType = 'XW001';
      }
      return bizType;
    },
    submitSuccess () {
      this.daiban.$refs.refTable.remoteData();
    },


    /* 打印优惠利率审批表*/
    printTable () {
      var _this = this;
      let params = {};
      let rowData;
      if (this.tabPanelName == '01') {
        rowData = this.daiban.getSelectedRowData();
      }
      if (rowData == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      // 本地调试
      // params.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwsx-yhlv.cpt&surveySerno=' + rowData.surveySerno;
      params.src = _this.$backend.frptRptService + 'xwsx-yhlv.cpt&surveySerno=' + rowData.surveySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '优惠利率申报审批表',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    /* 打印调查报告*/
    printReport () {
      var _this = this;
      let params = {};
      let rowData;
      if (this.tabPanelName == '01') {
        rowData = this.daiban.getSelectedRowData();
      }
      if (rowData == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      // 本地调试
      // params.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwsx-hxd-bg.cpt&surveySerno=' + rowData.surveySerno;
      params.src = _this.$backend.frptRptService + 'xwsx-hxd-bg.cpt&surveySerno=' + rowData.surveySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '调查报告',
        // 传递的业务数据，可选配置
        data: params
      });
    },


    /* 新增按钮*/
    doAdd () {
      this.$dialog.open(
        '授信调查新增',
        'xwmanage/lmtmanage/indgtLMT/addIndgtLMTIndex',
        750,
        350,
        {},
        () => {
          this.daiban.queryDataByCondition();
        },
        () => {
          this.daiban.queryDataByCondition();
        }
      );
    },

    // 重新办理
    handle () {
      const rowData = this.lishi.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据!'});
        return;
      }
      if (!rowData.replyStatus) {
        this.$message({message: '批复状态为空，禁止重新办理!'});
        return;
      }


      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/handlebyserno',
        data: rowData
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data == 1) {
            // 操作成功
            this.$message({ message: '重新办理成功', type: 'success' });
            this.lishi.$refs.refTable.remoteData();
          } else {
            // 操作失败
            this.$message({ message: message, type: 'warning' });
            // this.d1_1_BillList.$refs.refTable.remoteData();
          }
        }
      });
    },
    // 删除
    delete () {
      const rowData = this.daiban.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据!'});
        return;
      }

      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/delectdata',
          data: rowData
        }).then(({code, message, data}) => {
          if (code == 0) {
          // 请求成功
            if (data == 1) {
            // 操作成功
              this.$message({ message: message, type: 'success' });
              this.daiban.$refs.refTable.remoteData();
            } else {
            // 操作失败
              this.$message({ message: message, type: 'warning' });
            // this.d1_1_BillList.$refs.refTable.remoteData();
            }
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    viewWfi () {
      var _this = this;
      const rowData = this.lishi.getSelectedRowData();
      let params = {};
      if (rowData == null) {
        this.$message({message: '请选择一条数据!'});
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      // 本地调试
      // params.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwsx-pf2.cpt&surveySerno=' + rowData.surveySerno;
      params.src = _this.$backend.frptRptService + 'xwsx-pf2.cpt&surveySerno=' + rowData.surveySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '授信业务审批表',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
