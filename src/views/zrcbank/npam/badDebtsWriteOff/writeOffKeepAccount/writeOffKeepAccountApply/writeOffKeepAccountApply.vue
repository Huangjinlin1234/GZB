/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by  youhong
 * @description 呆账核销记账申请
 */
<template>
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="呆账核销记账申请" name="writeOffApply">
      <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="applyTable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item label="业务流水号" ctype="input" name="pbdwraSerno"></yu-xform-item>
            <yu-xform-item  ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd"></yu-xform-item>
            <yu-xform-item  ctype="select" name="approveStatus"  label="审批状态"  :options="approveStatusType"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="呆账核销记账申请列表" :hideFilter="false" :collapseHide="false">
        <div style="margin-bottom:10px">
            <yu-button  type="primary"  @click="addApplyFn" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button  type="primary"  @click="editApplyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button  type="primary"  @click="deleteApplyFn" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button  type="primary"  @click="detailApplyFn('apply')" v-if="checkCtrl('view')">查看</yu-button>
        </div>
        <yu-xtable ref="applyTable" selection-type="radio" row-number :data-url="dataApplyListUrl" request-type="POST" :base-params="baseApplyParams" condition-key="condition">
          <yu-xtable-column label="业务流水号" prop="pbdwraSerno" width="180"></yu-xtable-column>
          <yu-xtable-column label="核销总笔数" prop="writeoffCount" width="200" ></yu-xtable-column>
          <yu-xtable-column label="核销总金额" prop="totalWriteoffAmt" width="200" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="核销总本金" prop="totalWriteoffCap" width="200" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="核销总利息" prop="totalWriteoffInt" width="200" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="150"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName" width="150"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      </yu-tab-pane>

      <yu-tab-pane label="呆账核销记账申请历史" name="writeoffapplyHist">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
         <yu-xform related-table-name="applyHistTable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item label="业务流水号" ctype="input" name="pbdwraSerno"></yu-xform-item>
            <yu-xform-item  ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd"></yu-xform-item>
            <yu-xform-item  ctype="select" name="approveStatus"  label="审批状态"  :options="approveStatusTypeHis"></yu-xform-item>
          </yu-xform-group>
         </yu-xform>
        </yu-panel>
        <yu-panel title="呆账核销记账申请历史列表" :hideFilter="false" :collapseHide="false">
        <div style="margin-bottom:10px">
          <yu-button type="primary" @click="detailApplyFn('hist')" v-if="checkCtrl('view')">查看</yu-button>
        </div>
        <yu-xtable ref="applyHistTable" row-number :data-url="dataApplyHistListUrl" request-type="POST" :base-params="baseHistParams" condition-key="condition">
          <yu-xtable-column label="业务流水号" prop="pbdwraSerno" width="180"></yu-xtable-column>
          <yu-xtable-column label="核销总笔数" prop="writeoffCount" width="200" ></yu-xtable-column>
          <yu-xtable-column label="核销总金额" prop="totalWriteoffAmt" width="200" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="核销总本金" prop="totalWriteoffCap" width="200" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="核销总利息" prop="totalWriteoffInt" width="200" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="150"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName" width="150"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        </yu-xtable>
       </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
yufp.lookup.reg('NATIONALITY,STD_ZB_APPR_STATUS');
export default {
  mixins: [mixin],
  data: function () {
    return {
      approveStatusType:[
        {"key":"000", "value":"待发起"},
        {"key":"111", "value":"审批中"},
        {"key":"992", "value":"退回"}
      ],
      approveStatusTypeHis:[
       {"key":"997", "value":"通过"},
       {"key":"998", "value":"否决"}
      ],
      dataApplyListUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/PlaBadDebtWriteoffRecordApp',
      dataApplyHistListUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/PlaBadDebtWriteoffRecordApp',
      baseApplyParams: {condition: JSON.stringify({ queryFlag: 'applyTable' }), sort: 'createTime desc'},
      baseHistParams: {condition: JSON.stringify({ queryFlag: 'applyTableHis'}), sort: 'createTime desc'},
      viewType: 'DETAIL',
      dialogVisible: false,
      ifShow: false,
      applyBaseData: null,
      formdata: null,
      activeName: 'writeOffApply',
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
  /* 列表数据更改后刷新 */
  watch: {
    '$route.path': function () {
      this.$refs.applyTable.remoteData();
      this.$refs.applyHistTable.remoteData();
    }
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
          pbdwraSerno: _this.$xutils.getSEQWithParamFromServer('IQP_WRITEOFF_APP_SERNO'),
          viewType: 'ADD',
          ifShow: false
        }
      });
    },
    /*
    *修改呆账核销申请
    */
    editApplyFn () {
      var _this = this;
      if (_this.$refs.applyTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.applyTable.selections[0];
      if (data.approveStatus != '000' && data.approveStatus != '992') {
        _this.$message({
          message: '只能选择[待发起]、[打回]的记录',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/badDebtsWriteOff/writeOffKeepAccount/writeOffKeepAccountApply/writeOffKeepAccountApplyEdit',
        // 自定义唯一页签key
        key: 'writeOffKeepAccountApplyEdi' + new Date().getTime(), // 必传
        // 页签名称
        title: '呆账核销记账申请修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          josnData: data,
          ifShow: false
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
              data: JSON.stringify({
                'pbdwraSerno': rowData.pbdwraSerno
              }),
              url: _this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/delete',
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
      if (info === 'apply') {
        if (_this.$refs.applyTable.selections.length !== 1) {
          _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
          });
          return;
        }
        _this.$router.addTab({
          // 路由名称
          name: 'zrcbank/npam/badDebtsWriteOff/writeOffKeepAccount/writeOffKeepAccountApply/writeOffKeepAccountApplyDetail',
          // 自定义唯一页签key
          key: new Date().getTime(), // 必传
          // 页签名称
          title: '呆账核销记账申请详情',
          // 传递的业务数据，可选配置
          data: {
            viewType: 'DETAIL',
            josnData: _this.$refs.applyTable.selections[0],
            ifShow: false
          }
        });
      } else {
        if (_this.$refs.applyHistTable.selections.length !== 1) {
          _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
          });
          return;
        }
        _this.$router.addTab({
          // 路由名称
          name: 'zrcbank/npam/badDebtsWriteOff/writeOffKeepAccount/writeOffKeepAccountApply/writeOffKeepAccountApplyDetail',
          // 自定义唯一页签key
          key: 1 + new Date().getTime(), // 必传
          // 页签名称
          title: '呆账核销记账申请详情',
          // 传递的业务数据，可选配置
          data: {
            viewType: 'DETAIL',
            josnData: _this.$refs.applyHistTable.selections[0],
            ifShow: false
          }
        });
      }
    }
  }
};
</script>
