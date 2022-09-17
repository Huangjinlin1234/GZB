<template>
  <!--
    @created by ywl
    @updated by
    @description 单一客户额度冻结/解冻/终止申请详情页面
  -->
  <div class="blank_template">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="申请信息" name="base">
        <yu-panel title="申请基本信息">
          <yu-xform related-table-name="refForm" label-width="60px" v-model="baseFormdata">
            <yu-xform-group :column="4">
              <yu-xform-item label="业务流水号" ctype="input" name="serno" disabled="true"></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" name="lmtAccOperType" disabled="true" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled="true"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputId" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled="true"></yu-xform-item>
              <yu-xform-item label="主管客户经理" ctype="input" name="manageId" hidden="true"></yu-xform-item>
              <yu-xform-item label="主管客户机构" ctype="input" name="manageBrId" hidden="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="额度分项品种列表">
          <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :pageable="false">
            <yu-xtable-column label="授信分项额度编号" prop="accSubNo" width="200"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="lmtAmt" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度期限" prop="lmtTerm" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="原额度状态" prop="origiLmtStatus" width="100" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="修改后额度状态" prop="afterLmtStatus" width="200" ctype="select" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <yufp-nwf-init ref="yufpNwfInit"></yufp-nwf-init>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_LMT_ACC_OPER_TYPE,STD_ZB_APPR_STATUS,STD_ZB_ASSURE_MEANS,STD_ZB_YES_NO,STD_CUS_TYPE,STD_ZB_GUAR_WAY');
export default {
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      tabName: 'base',
      disabled: false,
      lmtAppSubList: [],
      lmtReplyAccOperApp: {},
      baseFormdata: {}
    };
  },
  mounted () {
    var _this = this;
    // var serno = this.$route.params.serno;
    var serno = _this.bizPageData.instanceInfo.bizId;
    _this.getFormdata(serno);
    _this.getSubAndPrd(serno);
  },

  methods: {
    getSubAndPrd: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperappsub/getsubandprd',
        data: serno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.lmtReplyAccOperAppSubDtoList;
        }
      });
    },

    // 给基本信息赋值
    getFormdata: function (serno) {
      var _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperapp/selectlmtreplyaccoperappbyserno',
        data: serno,
        callback: function (code, message, response) {
          debugger;
          if (code == 0) {
            yufp.clone(response.data, _this.baseFormdata);
            // _this.baseFormdata = response.data;
          } else {
            _this.$message('保存失败');
            return;
          }
        }
      });
    },
    // 提交
    commitFn () {
      debugger;
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      var startdto = {};
      if (_this.baseFormdata.lmtAccOperType == '01') {
        startdto.bizType = 'SX016';
      } else if (_this.baseFormdata.lmtAccOperType == '02') {
        startdto.bizType = 'SX017';
      } else if (_this.baseFormdata.lmtAccOperType == '03') {
        startdto.bizType = 'SX018';
      }
      startdto.systemId = 'cmis';
      startdto.orgId = model.managerBrId;
      startdto.userId = model.managerId;
      startdto.bizId = model.serno;
      startdto.bizUserName = model.cusName;
      startdto.bizUserId = model.cusId;
      // 流程传入参数  isXDGLBHCG 是否信贷管理部核查岗
      let loginUser = _this.$xutils.getLoginUserInfo();
      var isXDGLBHCG = '0';
      var dutysArr = loginUser.dutys;
      if (dutysArr != null && dutysArr.length > 0) {
        dutysArr.forEach(function (item) {
          if (item.id == 'XDB13') {
            isXDGLBHCG = '1';
          }
        });
      }
      startdto.param = {
        startOrgId: model.managerBrId,
        isXDGLBHCG: isXDGLBHCG,
        orgType: loginUser.org.orgType
      };
      startdto.bizParam4 = model.serno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    }
  }
};
</script>
