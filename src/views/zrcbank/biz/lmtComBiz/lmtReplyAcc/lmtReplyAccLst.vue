
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——查询+表格（主从表）
  -->
  <div>
    <yu-panel title="输入查询条件" panel-type="normal">
      <yu-xform related-table-name="refTable" ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replySerno"></yu-xform-item>
          <yu-xform-item label="审批模式" ctype="select" placeholder="审批模式" name="apprMode" data-code="STD_APPR_MODE"></yu-xform-item>
          <yu-xform-item label="审批结论" ctype="select" placeholder="审批结论" name="apprResult" data-code="STD_ZB_APPR_STATUS" exclude-key="000"></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="select" placeholder="批复状态" name="accStatus" data-code="STD_XD_REPLY_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="单一客户授信批复台账列表" panel-type="normal">
        <yu-toolbar>
          <yu-button type="primary" ref="btn_replyDetail" @click="replyDetail" v-if="checkCtrl('replyDetail')">查看批复详情</yu-button>
          <yu-button type="primary" ref="btn_replyReport" @click="replyReport" v-if="checkCtrl('replyReport')">查看批复报告</yu-button>
        </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" request-type="POST" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="批复台账编号" prop="accNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="180">
        <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
        </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="180">
        <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
        </template>
        </yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
        <yu-xtable-column label="终审机构类型" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="inureDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerBrId" width="180" hide-column></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" width="180"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="accStatus" data-code="STD_XD_REPLY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_ST,STD_APPR_MODE,STD_ZB_APPR_STATUS,STD_XD_REPLY_STATUS,STD_FINAL_APPR_BR_TYPE');
export default {
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/lmtreplyacc/replyaccformanager',
      formdata: {}
    };
  },
  methods: {
    replyDetail: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyAccDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyAccDetail', // 必传
        // 页签名称
        title: '批复详情',
        data: {
          replySerno: selectionAry[0].replySerno,
          accNo: selectionAry[0].accNo
        }
      });
    },

    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      const params = data;
      var _this = this;
      let json = {};
      let cusCatalog = '';
      let name = '';
      let title = '';
      // 判断客户属于个人还是公司（1.对私;2.对公）
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: params.cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            cusCatalog = response.data.cusCatalog;
          }
        }
      });
      if (cusCatalog == '1') {
        name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
        title = '个人客户查看';
      } else if (cusCatalog == '2') {
        name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        title = '公司客户查看';
      } else {
        _this.$xutils.showMsgBox('提示', '当前客户大类未识别,请确认客户信息是否完整!');
      }
      let key = '';
      json['op'] = 'VIEW';
      json['viewType'] = 'VIEW';
      json['cusId'] = params.cusId;
      // 个人正式客户创建 B01
      key = params.cusId + new Date().getTime();
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    },

    // 查看批复报告
    replyReport: function () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpf';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-DY.cpt&op=view&replySerno=' + params.replySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '授信批复（单一）',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
