/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by  youhong
 * @description 呆账核销记账通知
 */
<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="呆账核销待记账" name="writeOffApply">
      <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="applyTable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item label="业务流水号" ctype="input" name="pbdwraSerno"></yu-xform-item>
            <yu-xform-item  ctype="select" name="writeoffStatus"  label="核销状态"  data-code="STD_WRITEOFF_STATUS" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="呆账核销待记账列表" :hideFilter="false" :collapseHide="false">
        <div style="margin-bottom:10px">
            <yu-button type="primary" @click="writeoffKeepAccountFn" v-if="checkCtrl('coreCharge')">核销记账</yu-button>
           <!-- <yu-button type="primary" @click="editApplyFn">同步核销记账</yu-button> -->
            <yu-button type="primary" @click="detailApplyFn('applyTable')" v-if="checkCtrl('view')">查看</yu-button>
        </div>
        <yu-xtable ref="applyTable" selection-type="radio" row-number :data-url="dataApplyListUrl" request-type="POST" :base-params="baseApplyParams" condition-key="condition">
          <yu-xtable-column align="center" label="业务流水号" prop="pbdwraSerno" width="180"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总笔数" prop="writeoffCount" width="180" ></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总金额" prop="totalWriteoffAmt" width="190" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总本金" prop="totalWriteoffCap" width="190" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总利息" prop="totalWriteoffInt" width="190" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="登记日期" prop="inputDate" width="150"></yu-xtable-column>
          <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="150"></yu-xtable-column>
          <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" width="200"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销状态" prop="writeoffStatus" data-code="STD_WRITEOFF_STATUS" width="150"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="呆账核销已记账" name="writeoffapplyHist">
       <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
         <yu-xform related-table-name="applyHistTable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item label="业务流水号" ctype="input"  name="pbdwraSerno"></yu-xform-item>
           <!-- <yu-xform-item  ctype="select" name="writeoffStatus"  label="核销状态"  data-code="STD_WRITEOFF_STATUS"></yu-xform-item> -->
          </yu-xform-group>
        </yu-xform>
       </yu-panel>
       <yu-panel title="呆账核销已记账列表" :hideFilter="false" :collapseHide="false">
        <div style="margin-bottom:10px">
          <yu-button type="primary" @click="detailApplyFn('applyHistTable')" v-if="checkCtrl('view')">查看</yu-button>
        </div>
        <yu-xtable ref="applyHistTable" selection-type="radio" row-number :data-url="dataApplyHistListUrl" request-type="POST" :base-params="baseHistParams" condition-key="condition">
          <yu-xtable-column align="center" label="业务流水号" prop="pbdwraSerno" width="200"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总笔数" prop="writeoffCount" width="180" ></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总金额" prop="totalWriteoffAmt" width="190" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总本金" prop="totalWriteoffCap" width="190" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销总利息" prop="totalWriteoffInt" width="190" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="登记日期" prop="inputDate" width="180"></yu-xtable-column>
          <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="150"></yu-xtable-column>
          <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" width="180"></yu-xtable-column>
          <yu-xtable-column align="center" label="核销状态" prop="writeoffStatus" data-code="STD_WRITEOFF_STATUS"></yu-xtable-column>
        </yu-xtable>
       </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
yufp.lookup.reg('NATIONALITY,STD_WRITEOFF_STATUS');
export default {
  mixins: [mixin],
  data: function () {
    return {
      dataApplyListUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/PlaBadDebtWriteoffRecordApp',
      dataApplyHistListUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/PlaBadDebtWriteoffRecordApp',
      baseApplyParams: {condition: { writeoffStatus: '01,02,04', queryFlag: 'applyTableHis'} },
      baseHistParams: {condition: { writeoffStatus: '03'} },
      viewType: 'DETAIL',
      dialogVisible: false,
      ifShow: false,
      applyBaseData: null,
      formdata: null,
      activeName: 'writeOffApply',
      collapseTitle: ['收起', '展开'],
      applyActiveName: 'applyBase'
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  methods: {
    /*
    *新增呆账核销申请
    */
    addApplyFn () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/badDebtsWriteOff/writeOffKeepAccount/writeOffKeepAccountApply/writeOffKeepAccountApplyAdd',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '呆账核销记账申请新增',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'ADD',
          ifShow: false
        }
      });
    },
    // 标签页面切换刷新
    handleClick (e) {
      if (e.name === 'writeOffApply') {
        this.$refs.applyTable.remoteData();
      } else if (e.name === 'writeoffapplyHist') {
        this.$refs.applyHistTable.remoteData();
      }
    },
    /*
     核销记账
    */
    writeoffKeepAccountFn () {
      var _this = this;
      if (!_this.$refs.applyTable.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 选中的数据
      var data = _this.$refs.applyTable.selections[0];

      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/sendToHXRecord',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.applyTable.remoteData();
            _this.$message.success('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /*
    *同步核销记账(暂时不用)
    */
    editApplyFn () {
      var _this = this;
      if (!_this.$refs.applyTable.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 选中的数据
      var data = _this.$refs.applyTable.selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/sendtotbxhjz',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.applyTable.remoteData();
            _this.$message.success('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /** *删除申请信息*/
    deleteApplyFn () {
      var _this = this;
      if (_this.$refs.applyTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var rowData = _this.$refs.applyTable.selections[0];
      if (rowData.approveStatus !== '000') {
        _this.$message({
          message: '请先选择待发起的数据',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: {
                'pbdwasSerno': rowData.pbdwasSerno
              },
              url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffappsig/delete',
              callback: function (code, message, response) {
                _this.$refs.applyTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /**
    * 查看详情
     */
    detailApplyFn (info) {
      var _this = this;
      var applyTable = false;
      if (_this.$refs[`${info}`].selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (info == 'applyTable') {
        applyTable = true;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/badDebtsWriteOff/writeOffKeepAccount/writeOfffKeepAccountNotice/writeOffKeepAccountNoticeDetail',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '呆账核销记账申请详情',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          josnData: _this.$refs[`${info}`].selections[0],
          ifShow: false,
          applyTable: applyTable
        }
      });
    },
    datacodeFilterFn(opts, datacode, name){
      return opts.filter(function(op){
        if (op.key === '01' || op.key === '02' || op.key === '04') return true;
        return false;
      });
    }
  }
};
</script>
