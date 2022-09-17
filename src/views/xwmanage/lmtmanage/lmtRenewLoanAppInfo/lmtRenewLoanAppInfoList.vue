/* eslint-disable no-tabs */
<!--
  @Created by zhuly8@yusys.com.cn 2021-01-11
  @updated by
  @description 客户续贷申请列表
-->
<template>
  <div id="lmtRenewLoanAppInfoList">
    <!-- 查询条件 fuzzy-query 模糊查询 left,right,both -->
    <yu-xform ref="refForm" form-type="search" related-table-name="refTable" label-width="120px">
      <yu-xform-group :column="2">
        <yu-xform-item label="申请人姓名" ctype="input" placeholder="申请人姓名" name="cusName" fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="客户号" ctype="input" placeholder="客户号" name="cusId" fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="申请人证件号" ctype="input" placeholder="申请人证件号" name="certCode" fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="oldContNo" fuzzy-query="both"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <!--操作按钮-->
    <yu-toolBar>
      <yu-button ref="btn_doAdd" @click="doAdd" type="primary" v-if="checkCtrl('doAdd')">新增</yu-button>
      <yu-button ref="btn_doDelect" @click="doDelect" type="primary" v-if="checkCtrl('doDelect')">删除</yu-button>
      <yu-button ref="btn_doView" @click="doView" type="primary" v-if="checkCtrl('doView')">查看</yu-button>
    </yu-toolBar>
    <!--列表-->
    <yu-xtable ref="refTable" row-number :data-url="tableUrl" selection-type="radio" condition-key="condition" @row-dblclick="doView" :base-params="params">
      <yu-xtable-column label="客户号" prop="cusId" width="110"></yu-xtable-column>
      <yu-xtable-column label="申请人姓名" prop="cusName"></yu-xtable-column>
      <yu-xtable-column label="申请人证件号" prop="certCode" width="180"></yu-xtable-column>
      <yu-xtable-column label="原合同编号" prop="oldContNo" width="180"></yu-xtable-column>
      <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
      <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
      <yu-xtable-column label="借据余额" prop="billBalance"></yu-xtable-column>
      <yu-xtable-column label="申请人手机号" prop="appPhone" width="120"></yu-xtable-column>
      <yu-xtable-column label="企业名称" prop="conName"></yu-xtable-column>
      <yu-xtable-column label="统一社会信用代码" prop="unifyCreditCode" width="180"></yu-xtable-column>
      <yu-xtable-column label="名单生成日期" prop="createTime" width="140"></yu-xtable-column>
      <yu-xtable-column label="续贷申请日期" prop="appDate"></yu-xtable-column>
      <yu-xtable-column label="名单处理状态" prop="status" data-code="STD_XD_LIST_STATUS"></yu-xtable-column>
      <yu-xtable-column label="客户经理" prop="managerIdName"></yu-xtable-column>
    </yu-xtable>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_CONT_TYPE,STD_XD_LIST_STATUS');
export default {
  data: function () {
    return {
      searchFormdata: {}, // 查询表单
      params: {
        condition: {
          managerId: this.$store.state.oauth.loginCode
        },
        sort: 'createTime desc'
      },
      tableUrl: backend.cmisBiz + '/api/lmtrenewloanappinfo/' // 列表查询地址
    };
  },
  watch: {
    '$routh.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
     * 新增
     */
    doAdd: function () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'xwmanage/lmtmanage/lmtRenewLoanAppInfo/lmtRenewLoanAppInfoAdd', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_Add_lmtRenewLoanAppInfoAdd', // 必传
        // 页签名称
        title: '新增续贷申请',
        // 传递的业务数据，可选配置
        data: {name: this.$route.name}
      });
    },
    // 删除
    doDelect: function () {
      var _this = this;
      var selectionArr = _this.$refs.refTable.selections;
      if (selectionArr.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      if (selectionArr[0].status != '000') {
        _this.$message({message: '名单处理状态非待发起状态不可删除！', type: 'warning'});
        return;
      }
      if (selectionArr[0].managerId != yufp.session.userId) {
        _this.$message({message: '非本人管护记录不可删除！', type: 'warning'});
        return;
      }
      _this.$confirm('该操作将删除该记录，是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        _this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtrenewloanappinfo/delete/' + selectionArr[0].serno
        }).then(({code, message, data}) => {
          if (data == '1') {
            _this.$refs.refTable.remoteData();
          } else {
            // 操作失败
            _this.$message({ message: message, type: 'warning' });
            _this.$refs.refTable.remoteData();
          }
        });
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 查看
    doView: function () {
      var _this = this;
      var selectionArr = _this.$refs.refTable.selections;
      if (selectionArr.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'xwmanage/lmtmanage/lmtRenewLoanAppInfo/lmtRenewLoanAppInfoDetail', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_Detail' + selectionArr[0].serno, // 必传
        // 页签名称
        title: '查看续贷申请',
        // 传递的业务数据，可选配置
        data: {
          serno: selectionArr[0].serno
        }
      });
    }
  }
};
</script>
