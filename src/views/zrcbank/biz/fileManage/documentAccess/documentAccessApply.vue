/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by
 * @description 档案调阅申请
 */
<template>
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="档案调阅申请" name="readOffApply">

      <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="applyTable"  ref="searchForm" form-type="search"  v-model="searchFormdata">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="调阅流水号" ctype="input" name="draiSerno" label-width="20px"></yu-xform-item>
            <yu-xform-item placeholder="调阅原因" ctype="select" name="readReason" data-code="STD_READ_REASON" label-width="20px"></yu-xform-item>
            <yu-xform-item placeholder="实际调阅人" name="readId" :colspan="7" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'readId':'readId'}"   label-width="20px"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      </yu-panel>
      <yu-panel title="档案调阅申请列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
        <div class="yu-toolBar">
            <yu-button type="primary" @click="addApplyFn" v-if="checkCtrl('addApplyFn')">新增</yu-button>
            <yu-button type="primary" @click="editApplyFn" v-if="checkCtrl('editApplyFn')">修改</yu-button>
            <yu-button type="primary" @click="deleteApplyFn" v-if="checkCtrl('deleteApplyFn')">删除</yu-button>
            <yu-button type="primary" @click="detailApplyFn('apply')" v-if="checkCtrl('detailApplyFn')">查看</yu-button>
        </div>

        <yu-xtable ref="applyTable" selection-type="radio" row-number :data-url="dataApplyListUrl" request-type="POST" :base-params="baseApplyParams" condition-key="condition">
          <yu-xtable-column label="调阅流水号" prop="draiSerno" width="180"></yu-xtable-column>
          <yu-xtable-column label="调阅形式" prop="readMode" width="130" data-code="STD_READ_MODE"></yu-xtable-column>
          <yu-xtable-column label="调阅类型" prop="readType" width="130" data-code="STD_READ_TYPE"></yu-xtable-column>
          <yu-xtable-column label="调阅原因" prop="readReason" width="130" data-code="STD_READ_REASON"></yu-xtable-column>
          <yu-xtable-column label="归还日期" prop="backDate" width="140" ></yu-xtable-column>
          <yu-xtable-column label="实际调阅人" prop="readName" width="130" ></yu-xtable-column>
          <yu-xtable-column label="实际调阅人机构" prop="readOrgName" width="200" ></yu-xtable-column>
          <yu-xtable-column label="调阅申请人" prop="readRqstrName" width="130"></yu-xtable-column>
          <yu-xtable-column label="调阅申请人机构" prop="readRqstrOrgName" width="200"></yu-xtable-column>
          <yu-xtable-column label="调阅申请日期" prop="readRqstrDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="档案调阅申请历史" name="readApplyHist">
      <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
         <yu-xform related-table-name="applyHistTable" ref="searchForma" form-type="search" v-model="searchFormdata1">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="调阅流水号" ctype="input" name="draiSerno" label-width="20px"></yu-xform-item>
            <yu-xform-item placeholder="调阅原因" ctype="select" name="readReason" data-code="STD_READ_REASON" label-width="20px"></yu-xform-item>
            <yu-xform-item placeholder="实际调阅人" ctype="input" name="readId" hidden="true"></yu-xform-item>
            <yu-xform-item name="readId"  ctype="YuXuser" @select-fn="commonSelect"  :mapping="{'readId':'readId','inputIdName':'managerIdName'}"  placeholder="实际调阅人" label-width="20px"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        </yu-panel>
        <yu-panel title="档案调阅申请历史列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
        <div class="yu-toolBar">
          <yu-button-group>
            <yu-button type="primary" @click="detailApplyFn('hist')" v-if="checkCtrl('detailApplyFn')">查看</yu-button>
          </yu-button-group>
        </div>
        <yu-xtable ref="applyHistTable" selection-type="radio" row-number :data-url="dataApplyListUrl" request-type="POST" :base-params="baseHistParams" condition-key="condition">
          <yu-xtable-column label="调阅流水号" prop="draiSerno" width="180"></yu-xtable-column>
          <yu-xtable-column label="调阅形式" prop="readMode" width="130" data-code="STD_READ_MODE"></yu-xtable-column>
          <yu-xtable-column label="调阅类型" prop="readType" width="130" data-code="STD_READ_TYPE"></yu-xtable-column>
          <yu-xtable-column label="调阅原因" prop="readReason" width="130" data-code="STD_READ_REASON"></yu-xtable-column>
          <yu-xtable-column label="归还日期" prop="backDate" width="140" ></yu-xtable-column>
          <yu-xtable-column label="实际调阅人" prop="readName" width="130" ></yu-xtable-column>
          <yu-xtable-column label="实际调阅人机构" prop="readOrgName" width="200" ></yu-xtable-column>
          <yu-xtable-column label="调阅申请人" prop="readRqstrName" width="130"></yu-xtable-column>
          <yu-xtable-column label="调阅申请人机构" prop="readRqstrOrgName" width="200"></yu-xtable-column>
          <yu-xtable-column label="调阅申请日期" prop="readRqstrDate" width="150"></yu-xtable-column>
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
yufp.lookup.reg('YESNO,STD_DOC_CLASS,STD_DOC_TYPE,STD_READ_REASON,STD_READ_MODE,STD_DOC_STAUTS,STD_ZB_APPR_STATUS,STD_READ_TYPE');
export default {
  mixins: [mixin],
  data: function () {
    return {
      dataApplyListUrl: this.$backend.cmisBiz + '/api/docreadappinfo/query',
      // eslint-disable-next-line no-undef
      baseApplyParams: {condition: JSON.stringify({ queryFlag: 'applyTable' }) },
      baseHistParams: {condition: JSON.stringify({ queryFlag: 'applyTableHis' }) },
      viewType: 'DETAIL',
      dialogVisible: false,
      ifShow: false,
      applyBaseData: null,
      formdata: null,
      activeName: 'readOffApply',
      searchFormdata: '',
      form: '',
      tabel: '',
      searchFormdata1: ''
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

    // // 条件查询
    // searchFn: function (tabel) {
    //   if (tabel == '1') {
    //     this.$refs.applyTable.remoteData({
    //       condition: JSON.stringify(this.searchFormdata)
    //     });
    //   } else {
    //     console.log(this.searchFormdata1);
    //     this.$refs.applyHistTable.remoteData({
    //       condition: JSON.stringify(this.searchFormdata1)
    //     });
    //   }
    // },

    // // 重置
    // resetFn: function (form) {
    //   // 清空条件
    //   if (form == '1') {
    //     this.$refs.searchForm.resetFields();
    //   } else {
    //     this.$refs.searchForma.resetFields();
    //   }
    // },

    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'readId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          }
        }
      }
    },

    commonSelect: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'readId') {
            this.searchFormdata1[mapping[item]] = data.loginCode;
          }
        }
      }
    },


    /*
    *新增档案调阅申请
    */
    addApplyFn () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentAccess/documentAccessApplyAdd',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案调阅申请新增',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'ADD'
        }
      });
    },
    /*
    *档案调阅申请
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
        name: 'zrcbank/biz/fileManage/documentAccess/documentAccessApplyEdit',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案调阅申请修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          jsonData: data
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
              data: rowData,
              url: _this.$backend.cmisBiz + '/api/docreadappinfo/delete',
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
      var selectData = null;
      if (info === 'apply') {
        if (_this.$refs.applyTable.selections.length !== 1) {
          _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
          });
          return;
        }
        selectData = _this.$refs.applyTable.selections[0];
      } else {
        if (_this.$refs.applyHistTable.selections.length !== 1) {
          _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
          });
          return;
        }
        selectData = _this.$refs.applyHistTable.selections[0];
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentAccess/documentAccessApplyDetail',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案调阅申请详情',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          jsonData: selectData
        }
      });
    }
  }
};
</script>
