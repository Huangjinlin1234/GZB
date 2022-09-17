<template>
  <!--
    @created by ywl
    @updated by
    @description 集团客户额度冻结/解冻/终止申请修改页面
  -->
  <div class="blank_template">
        <yu-panel title="申请基本信息">
          <yu-xform related-table-name="refForm" label-width="60px" v-model="baseFormdata">
            <yu-xform-group :column="4">
              <yu-xform-item label="业务流水号" ctype="input" name="grpSerno" disabled="true"></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" name="lmtAccOperType" disabled="true" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
              <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" disabled="true"></yu-xform-item>
              <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" disabled="true"></yu-xform-item>
              <yu-xform-item label="申请原因说明" ctype="input" name="resn" collapse="24" :disabled="disabled"></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputId" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="授信成员信息">
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" request-type="post" :base-params="queryParams">
            <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="成员客户名称" prop="cusName" width="200"></yu-xtable-column>
            <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="敞口额度" prop="openLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险额度" prop="lowRiskLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="管护客户经理" prop="managerId" ></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrId" ></yu-xtable-column>
            <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="额度分项品种列表">
          <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :pageable="false">
            <yu-xtable-column label="所属成员名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信分项额度编号" prop="subSerno" width="200"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="bizTypeName"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarWay" width="100" data-code="STD_ZB_ASSURE_MEANS"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="lmtAmt" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度期限" prop="lmtTerm" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="原额度状态" prop="origiLmtStatus" width="100"  data-code="STD_ZB_LMT_STATUS"></yu-xtable-column>
            <yu-xtable-column label="修改后额度状态" prop="afterLmtStatus" width="100" data-code="STD_ZB_LMT_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <div class="yu-toolBar" style="text-align:center">
          <yu-button-group>
            <yu-button type="primary" @click="commitFn" :hidden="disabled">提交</yu-button>
          </yu-button-group>
        </div>
    <yufp-nwf-init ref="yufpNwfInit"></yufp-nwf-init>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_LMT_ACC_OPER_TYPE,STD_ZB_APPR_STATUS,STD_ZB_ASSURE_MEANS,STD_ZB_YES_NO,STD_ZB_CUS_TYP');
export default {
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      tabName: 'base',
      disabled: false,
      lmtAppSubList: [],
      dataUrl: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/showdetial',
      queryParams: {},
      lmtReplyAccOperApp: {}
    };
  },
  created () {
    // this.getSubAndPrd(this.$route.params.selectionArys[0].grpSerno);
    // 给基本信息赋值
    // yufp.clone(this.$route.params.selectionArys[0], this.baseFormdata);
    let _this = this;
    let data = {};
    var grpSerno = '';
    // 待办流程进入
    if (_this.bizPageData) {
      data = _this.bizPageData.instanceInfo;
      grpSerno = data.bizId;
      _this.disabled = true;
      _this.queryParams = {serno: grpSerno};
    } else {
      data = _this.$route.params;
      grpSerno = data.grpSerno;
      _this.queryParams = {serno: grpSerno};
      if (data.viewType == 'VIEW') {
        _this.disabled = true;
      }
    }
    _this.getFormdata(grpSerno);
    _this.getSubAndPrd(grpSerno);
  },
  methods: {
    getSubAndPrd: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperappsub/getsubandprdbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.lmtReplyAccOperAppSubDtoList;
        }
      });
    },
    // 给基本信息赋值
    getFormdata: function (grpSerno) {
      var _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/selectlmtgrpreplyaccoperappbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.baseFormdata);
          } else {
            return;
          }
        }
      });
    },
    // 返回按钮
    cancelFn: function () {
      yufp.router.removeTab('/zrcbank/biz/lmtGrpReplyAccOperApp/lmtGrpReplyAccOper/lmtGrpReplyOperDetai');
    },
    // 暂存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      var url = backend.cmisBiz + '/api/lmtGrpReplyAccOperApp/updateoperapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              // _this.$refs.refTable.remoteData();
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },
    // 提交
    commitFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = model.managerBrId;
      startdto.userId = model.managerId;
      startdto.bizType = 'WFI_GRP_REPLY_OPER';
      startdto.bizId = model.grpSerno;
      startdto.bizUserName = model.grpCusName;
      startdto.bizUserId = model.grpCusId;
      startdto.param = {
        startOrgId: model.managerBrId
      };
      startdto.bizParam4 = model.serno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    }
  }
};
</script>
