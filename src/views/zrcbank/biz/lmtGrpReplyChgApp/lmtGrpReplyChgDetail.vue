<template>
  <!--
    @created by ywl
    @time  2021/5/3
    @description 批复变更修改
  -->
  <div>
  <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata">
    <yu-panel title="批复基本信息" is-collapse>
        <yu-xform-group>
          <yu-xform-item label="批复编号" ctype="input" name="grpReplySerno" disabled="true"></yu-xform-item>
          <yu-xform-item label="批复生效日期" ctype="datepicker" name="replyInureDate" disabled="true"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" disabled="true"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" disabled="true"></yu-xform-item>
          <yu-xform-item label="审批模式" ctype="select" name="apprMode" disabled="true" data-code="STD_APPR_MODE"></yu-xform-item>
          <yu-xform-item label="终审机构" ctype="input" name="finalApprBrId" disabled="true"></yu-xform-item>
          <yu-xform-item label="审批结论" ctype="select" name="replyResult" disabled="true" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="select" name="replyStatus" disabled="true" data-code="STD_XD_REPLY_STATUS"></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerId" disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrId" disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled="true"></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" disabled="true"></yu-xform-item>
        </yu-xform-group>
    </yu-panel>
    <yu-panel title="集团授信额度情况" is-collapse>
        <yu-xform-group>
          <yu-xform-item label="用信审核方式" ctype="select" name="loanApprMode" data-code="STD_LOAN_APPR_MODE" disabled="true"></yu-xform-item>
          <yu-xform-item label="授信期限(月)" ctype="input" name="lmtTerm" disabled="true"></yu-xform-item>
        </yu-xform-group>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" :base-params="queryParams"  request-type="post" show-summary :pageable="false" :summary-method="getSummaries">
        <yu-xtable-column label="成员客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType"  data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="敞口额度(元)" prop="openLmtAmt" ></yu-xtable-column>
        <yu-xtable-column label="低风险额度(元)" prop="lowRiskLmtAmt" ></yu-xtable-column>
        <yu-xtable-column label="管护客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" data-code="STD_ZB_YES_NO"> </yu-xtable-column>
        <!--<yu-xtable-column label="操作" prop="operate">
          <template slot-scope="drawScope">
            <yu-button type="primary" size="small" @click="detailFn(drawScope.row)">修改</yu-button>
          </template>
        </yu-xtable-column>-->
      </yu-xtable>
    </yu-panel>
    <yu-panel title="集团贷后管理要求" is-collapse>
        <yu-xform-group>
          <yu-xform-item label="贷后管理要求" colspan="24" :disabled="type=='view'" ctype="textarea" name="pspManaNeed" rules="required"></yu-xform-item>
        </yu-xform-group>
    </yu-panel>
    <yu-panel title="变更情况说明" is-collapse>
        <yu-xform-group>
          <yu-xform-item label="变更事项说明" colspan="24" ctype="textarea" name="replyChgContentMemo" rules="required" :disabled="type=='view'"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputId" disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled="true"></yu-xform-item>
          <yu-xform-item label="变更流水号" ctype="input" name="grpSerno" disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled="true"></yu-xform-item>
        </yu-xform-group>
    </yu-panel>
  </yu-xform>
  <yu-form-buttons align="center">
    <yu-button type="primary" v-if="type!='view'"  @click="saveFn">暂存</yu-button>
    <yu-button type="primary" v-if="type!='view'"  @click="saveFn1">保存</yu-button>
    <yu-button type="primary" v-if="type!='view'"  @click="commitFn">提交</yu-button>
    <yu-button type="primary" @click="cancelFn">返回</yu-button>
  </yu-form-buttons>
     <yufp-nwf-init ref="yufpNwfInit"></yufp-nwf-init>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_APPR_MODE,STD_ZB_APPR_STATUS,STD_XD_REPLY_STATUS,STD_ZB_CUS_TYP,STD_ZB_YES_NO,STD_LOAN_APPR_MODE');
export default {
  props: {
    bizPageData: Object,
    dialogId: String
  },
  data: function () {
    return {
      type: '',
      baseFormdata: {},
      grpSerno: '',
      dataUrl: backend.cmisBiz + '/api/lmtgrpmemrel/selectbygrpreplyserno',
      queryParams: {},
      formDisabled: false
    };
  },
  created () {
    // 给批复基本信息赋值
    var _this = this;
    // 待办流程进入
    if (_this.bizPageData) {
      _this.grpSerno = _this.bizPageData.instanceInfo.bizId;
      _this.type = 'view';
    } else {
      _this.grpSerno = _this.$route.meta.params.grpSerno;
      _this.type = _this.$route.meta.params.viewType;
    }
    _this.queryParams = {grpSerno: _this.grpSerno};
    // 初始化表单数据
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrpreplychg/queryLmtgrpreplychgdatabygrpserno',
      data: _this.grpSerno,
      callback: function (code, message, response) {
        if (response.code == '0') {
          yufp.clone(response.data, _this.baseFormdata);
        } else {
          _this.$message(response.message);
          return;
        }
      }
    });
  },
  methods: {
    // 暂存按钮
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      var url = backend.cmisBiz + '/api/lmtgrpreplychg/update';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message('暂存成功');
          } else {
            _this.$message('暂存失败');
          }
        }
      });
    },
    // 保存按钮
    saveFn1: function () {
      var _this = this;
      var model = {};
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.clone(_this.baseFormdata, model);
      var url = backend.cmisBiz + '/api/lmtgrpreplychg/update'; // 新增
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message('保存成功');
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },
    // 修改按钮
    detailFn: function (row) {
      var _this = this;
      // debugger;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyChg/lmtReplyCHg',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyChg', // 必传
        // 页签名称
        title: '集团成员批复变更',
        // 传递的业务数据
        data: {
          serno: row.singleSerno
        }
      });
    },

    // 提交按钮
    commitFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      var url = backend.cmisBiz + '/api/lmtgrpreplychg/update'; // xiugai
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            let startdto = {};
            const loginUser = _this.$xutils.getLoginUserInfo();
            var instuCde = loginUser.instu.code;
            var orgCode = loginUser.orgCode;
            startdto.systemId = 'cmis';
            startdto.orgId = loginUser.org.id;
            startdto.userId = loginUser.loginCode;
            startdto.bizType = 'SX023';
            if (orgCode.startsWith('80')) {
              startdto.bizType = 'SGC16';
            }
            if (orgCode.startsWith('81')) {
              startdto.bizType = 'DHC16';
            }
            startdto.bizId = model.grpSerno;
            startdto.bizUserName = model.cusName;
            startdto.bizUserId = model.cusId;
            startdto.param = {
              startOrgId: model.managerBrId
            };
            startdto.bizParam4 = model.serno;
            _this.$refs.yufpNwfInit.wfInit(startdto);
          } else {
            _this.$message('暂存失败');
          }
        }
      });
    },

    // 返回按钮
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 自定义 合计方法
    getSummaries: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) { return Number(item[column.property]) });
        if (!values.every(function (value) { return isNaN(value) })) {
          if (index === 4 || index === 5) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '元';
          }
        }
      });
      return sums;
    }
  }
};
</script>
