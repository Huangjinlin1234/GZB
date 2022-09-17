/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by
 * @description 档案调阅归还
 */
<template>
  <div>
    <yu-panel title="查询条件" panel-type="normal">
      <template slot="filter">
        <yu-xform related-table-name="applyTable" form-type="search" v-model="searchFormdata">
          <yu-xform-group :column="3">
            <yu-xform-item label="调阅流水号" placeholder="请输入调阅流水号" ctype="input" name="draiSerno"></yu-xform-item>
            <yu-xform-item label="调阅原因" placeholder="请选择调阅原因" ctype="select" name="readReason" data-code="STD_READ_REASON"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="请输入客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="请输入客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="档案编号" ctype="input" placeholder="请输入档案编号" name="docNo"></yu-xform-item>
            <yu-xform-item label="档案类型" ctype="select" placeholder="请选择档案类型" name="docType" data-code="STD_DOC_TYPE"></yu-xform-item>
            <yu-xform-item label="归还日期" ctype="datepicker" placeholder="请选择归还日期" name="backDate" value-format="yyyy-MM-dd"></yu-xform-item>
            <yu-xform-item label="档案状态" ctype="select" placeholder="请选择档案状态" name="docStauts" data-code="STD_DOC_STAUTS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>


      </yu-panel>
      <yu-panel title="档案调阅归还列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <div class="yu-toolBar">
            <yu-button type="primary" @click="docBackFn" v-if="checkCtrl('docBackFn')">归还</yu-button>
            <yu-button type="primary" @click="detailApplyFn" v-if="checkCtrl('detailApplyFn')">查看</yu-button>
        </div>
      <yu-xtable ref="applyTable" selection-type="radio" row-number :data-url="dataApplyListUrl" request-type="POST" condition-key="condition" :base-params="baseApplyParams">
        <yu-xtable-column label="调阅流水号" prop="draiSerno" width="180"></yu-xtable-column>
        <yu-xtable-column label="调阅形式" prop="readMode" width="130" data-code="STD_READ_MODE"></yu-xtable-column>
        <yu-xtable-column label="调阅类型" prop="readType" width="100" data-code="STD_READ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="调阅原因" prop="readReason" width="130" data-code="STD_READ_REASON"></yu-xtable-column>
        <yu-xtable-column label="归还日期" prop="backDate" width="140" ></yu-xtable-column>
        <yu-xtable-column label="档案编号" prop="docNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="档案分类" prop="docClass" width="150" data-code="STD_DOC_CLASS"></yu-xtable-column>
        <yu-xtable-column label="档案类型" prop="docType" width="150" data-code="STD_DOC_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="200" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
        <yu-xtable-column label="关联业务编号" prop="bizSerno" width="150" ></yu-xtable-column>
        <yu-xtable-column label="档案状态" prop="docStauts" data-code="STD_DOC_STAUTS"></yu-xtable-column>
        <yu-xtable-column label="调阅申请人" prop="readRqstrName" width="130"></yu-xtable-column>
        <yu-xtable-column label="调阅申请人机构" prop="readRqstrOrgName" width="200"></yu-xtable-column>
        <yu-xtable-column label="调阅申请日期" prop="readRqstrDate" width="150"></yu-xtable-column>

      </yu-xtable>
    </yu-panel>
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
      searchFormdata: {},
      dataApplyListUrl: this.$backend.cmisBiz + '/api/docreadappinfo/querydocreceiveinfo',
      // eslint-disable-next-line no-undef
      baseApplyParams: {condition: JSON.stringify({ queryFlag: 'backIng' }) },
      viewType: 'DETAIL'
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

    /** *归还申请调阅的档案*/
    docBackFn () {
      var _this = this;
      if (_this.$refs.applyTable.selections.length < 1) {
        _this.$message({
          message: '请先选择至少一条记录',
          type: 'warning'
        });
        return;
      }
      var rowData = _this.$refs.applyTable.selections;
      var drdiSerno = rowData[0].drdiSerno;
      var docNos = [];
      let stautsFlag = true;
      rowData.forEach(function (item) {
        docNos.push(item.docNo);
        let docStauts = item.docStauts;
        if (docStauts !== '09' && docStauts !== '10') {
          stautsFlag = false;
        }
      });
      if (!stautsFlag) {
        _this.$message.warning('只有已出库和逾期未归还状态的数据可以进行归还');
        return;
      }
      _this.$confirm('是否确认归还?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: drdiSerno,
              // url: _this.$backend.cmisBiz + '/api/docreadappinfo/updatedocstsbyback',
              url: _this.$backend.cmisBiz + '/api/docreaddetailinfo/updateDocStsBack',
              callback: function (code, message, response) {
                if (response.code === '0') {
                  _this.$refs.applyTable.remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message({
                    message: response.message,
                    type: 'error'
                  });
                }
              }
            });
          }
        }
      });
    },
    /**
    * 查看详情
     */
    detailApplyFn () {
      var _this = this;
      if (_this.$refs.applyTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentReceive/documentReceiveDetail',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案调阅申请详情',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          draiSerno: _this.$refs.applyTable.selections[0].draiSerno
        }
      });
    }
  }
};
</script>
