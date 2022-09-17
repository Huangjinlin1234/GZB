/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by
 * @description 档案调阅延期申请
 */
<template>
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="档案调阅延期申请" name="delayOffApply">
      <yu-panel panel-type="normal" title="查询条件">
      <template slot="filter">
        <yu-xform related-table-name="applyTable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item label="延期流水号" placeholder="请输入延期流水号" ctype="input" name="drdiSerno"></yu-xform-item>
            <yu-xform-item label="调阅流水号" placeholder="请输入调阅流水号" ctype="input" name="draiSerno"></yu-xform-item>
            <yu-xform-item label="延期原因" placeholder="请输入延期原因" ctype="input" name="delayCaseDesc" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      </yu-panel>
      <yu-panel panel-type="normal" title="档案调阅延期申请列表">
        <div class="yu-toolBar">
            <yu-button type="primary" @click="addApplyFn" v-if="checkCtrl('addApplyFn')">新增</yu-button>
            <yu-button type="primary" @click="editApplyFn" v-if="checkCtrl('editApplyFn')">修改</yu-button>
            <yu-button type="primary" @click="deleteApplyFn" v-if="checkCtrl('deleteApplyFn')">删除</yu-button>
            <yu-button type="primary" @click="detailApplyFn('apply')" v-if="checkCtrl('detailApplyFn')">查看</yu-button>
        </div>
        <yu-xtable ref="applyTable" selection-type="radio" row-number :data-url="dataApplyListUrl" request-type="POST" :base-params="baseApplyParams" condition-key="condition">
          <yu-xtable-column label="延期流水号" prop="drdiSerno" width="200"></yu-xtable-column>
          <yu-xtable-column label="调阅流水号" prop="draiSerno" width="200"></yu-xtable-column>
          <yu-xtable-column label="调阅类型" prop="readType" width="130" data-code="STD_READ_TYPE"></yu-xtable-column>
          <yu-xtable-column label="延期原因" prop="delayCaseDesc" width="150" data-code="STD_READ_REASON"></yu-xtable-column>
          <yu-xtable-column label="归还日期" prop="backDate" width="150" ></yu-xtable-column>
          <yu-xtable-column label="延期后归还日期" prop="delayBackDate" width="180" ></yu-xtable-column>
          <yu-xtable-column label="延期申请人" prop="delayRqstrName" width="150" ></yu-xtable-column>
          <yu-xtable-column label="延期申请人机构" prop="delayRqstrOrgName" width="200"></yu-xtable-column>
          <yu-xtable-column label="延期申请日期" prop="delayRqstrDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      </yu-tab-pane>
      <yu-tab-pane label="档案调阅延期申请历史" name="delayApplyHist">
      <yu-panel panel-type="normal" title="查询条件">
         <yu-xform related-table-name="applyHistTable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item label="延期流水号" placeholder="请输入延期流水号" ctype="input" name="drdiSerno"></yu-xform-item>
            <yu-xform-item label="调阅流水号" placeholder="请输入调阅流水号" ctype="input" name="draiSerno"></yu-xform-item>
            <yu-xform-item label="延期原因" placeholder="请输入延期原因" ctype="input" name="delayCaseDesc" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        </yu-panel>
        <yu-panel panel-type="normal" title="档案调阅延期申请历史列表">
        <div class="yu-toolBar">
            <yu-button type="primary" @click="detailApplyFn('hist')" v-if="checkCtrl('detailApplyFn')">查看</yu-button>
        </div>
        <yu-xtable ref="applyHistTable" selection-type="radio" row-number :data-url="dataApplyListUrl" request-type="POST" :base-params="baseHistParams" condition-key="condition">
          <yu-xtable-column label="延期流水号" prop="drdiSerno" width="200"></yu-xtable-column>
          <yu-xtable-column label="调阅流水号" prop="draiSerno" width="200"></yu-xtable-column>
          <yu-xtable-column label="调阅类型" prop="readType" width="130" data-code="STD_READ_TYPE"></yu-xtable-column>
          <yu-xtable-column label="延期原因" prop="delayCaseDesc" width="150" data-code="STD_READ_REASON"></yu-xtable-column>
          <yu-xtable-column label="归还日期" prop="backDate" width="150" ></yu-xtable-column>
          <yu-xtable-column label="延期后归还日期" prop="delayBackDate" width="180" ></yu-xtable-column>
          <yu-xtable-column label="延期申请人" prop="delayRqstrName" width="150" ></yu-xtable-column>
          <yu-xtable-column label="延期申请人机构" prop="delayRqstrOrgName" width="200"></yu-xtable-column>
          <yu-xtable-column label="延期申请日期" prop="delayRqstrDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="80"></yu-xtable-column>
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
      dataApplyListUrl: this.$backend.cmisBiz + '/api/docreaddelayinfo/query',
      // eslint-disable-next-line no-undef
      baseApplyParams: {condition: JSON.stringify({ queryFlag: 'applyTable' }) },
      baseHistParams: {condition: JSON.stringify({ queryFlag: 'applyTableHis' }) },
      viewType: 'DETAIL',
      dialogVisible: false,
      ifShow: false,
      applyBaseData: null,
      formdata: null,
      activeName: 'delayOffApply'
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
    *新增档案调阅延期申请
    */
    addApplyFn () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentDelay/documentDelayApplyAdd',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案调阅延期申请新增',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'ADD',
          ifShow: true
        }
      });
    },
    /*
    *档案调阅延期申请
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
      if (data.approveStatus != '000' && data.approveStatus != '992' && data.approveStatus != '991') {
        _this.$message({
          message: '只能选择[待发起]、[拿回]、[打回]的记录',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentDelay/documentDelayApplyEdit',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案调阅延期申请修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          josnData: data
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
      if (rowData.approveStatus !== '000' && rowData.approveStatus !== '992') {
        _this.$message({
          message: '请先选择[待发起]、[退回]的数据',
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
                'drdiSerno': rowData.drdiSerno
              }),
              url: _this.$backend.cmisBiz + '/api/docreaddelayinfo/delete',
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
    detailApplyFn (type) {
      var _this = this;
      var model = {};
      if (type == 'apply') {
        model = _this.$refs.applyTable.selections;
      } else if (type == 'hist') {
        model = _this.$refs.applyHistTable.selections;
      }
      if (model.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentDelay/documentDelayApplyDetail',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案调阅延期申请详情',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          josnData: model[0]
        }
      });
    }
  }
};
</script>
