/**
 * @Created by  hujun on 2021/6/17下午2:58:08.
 * @updated by
 * @description 档案调阅延期申请详情
 */
<template>
  <div>
    <yu-tabs v-model="applyActiveName" @tab-click="handleClick">
      <yu-tab-pane label="档案延期申请信息" name="applyBase">
        <yu-panel title="原档案调阅申请信息" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData" disabled>
            <yu-xform-group :column="2">
            <yu-xform-item ctype="input" name="draiSerno" label="调阅流水号" rules="required" :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="datepicker" name="readRqstrDate" label="调阅申请日期" rules="required" :disabled="true" value-format="yyyy-MM-dd"></yu-xform-item>
            <yu-xform-item ctype="input"  name="readName"  label="实际调阅人" rules="required"></yu-xform-item>
            <yu-xform-item ctype="input" name="readOrgName"  label="实际调阅人机构" :disabled="true" rules="required"></yu-xform-item>
            <yu-xform-item ctype="input"  name="readId"  label="实际调阅人" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readOrg"  label="实际调阅人机构" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="select" name="readMode"  label="调阅形式"  data-code="STD_READ_MODE" rules="required"></yu-xform-item>
            <yu-xform-item ctype="select" name="readType"  label="调阅类型"  data-code="STD_READ_TYPE" rules="required"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrName"  label="调阅申请人"  :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrOrgName"  label="调阅申请机构" :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrId"  label="调阅申请人"  :disabled="true" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrOrg"  label="调阅申请机构" :disabled="true" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="select" name="readReason"  label="调阅原因"  data-code="STD_READ_REASON" rules="required"></yu-xform-item>
            <yu-xform-item ctype="datepicker" name="backDate"  label="归还日期" rules="required" value-format="yyyy-MM-dd" ></yu-xform-item>
            <yu-xform-item ctype="textarea" name="reasonMome"  label="原因描述" row="4"  colspan="24" placeholder="2000个字符以内" :rules="rules.reasonMome"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="原档案调阅明细" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" request-type="POST" :base-params="baseBussParams">
            <yu-xtable-column label="档案编号" prop="docNo" width="180"></yu-xtable-column>
            <yu-xtable-column label="档案分类" prop="docClass" width="150" data-code="STD_DOC_CLASS"></yu-xtable-column>
            <yu-xtable-column label="档案类型" prop="docType" width="150" data-code="STD_DOC_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="200" ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
            <yu-xtable-column label="关联业务编号" prop="bizSerno" width="150" ></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width="150" ></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150" ></yu-xtable-column>
            <yu-xtable-column label="入库操作人" prop="optUsrName" width="150" ></yu-xtable-column>
            <yu-xtable-column label="入库操作机构" prop="optOrgName" width="150"></yu-xtable-column>
            <yu-xtable-column label="入库操作时间" prop="optDate" width="150"></yu-xtable-column>
            <yu-xtable-column label="档案入现金库时间" prop="storageCashDate" width="160"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xform ref="applyDelayForm" label-width="140px" v-model="delayData" disabled>
            <yu-xform-group :column="2">
              <yu-xform-item ctype="input" name="drdiSerno" label="延期流水号" :disabled="true" rules="required"></yu-xform-item>
              <yu-xform-item ctype="datepicker" name="delayBackDate" label="延期后归还日期" rules="required"  value-format="yyyy-MM-dd" :picker-options="pickerOptions"></yu-xform-item>
              <yu-xform-item ctype="textarea" name="delayCaseDesc"  row="4" colspan="24" placeholder="2000个字符以内" :rules="rules.delayCaseDesc" label="延期情况说明"></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrName" label="延期申请人" rules="required" :value="userName"></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrOrgName" label="延期申请机构"  rules="required" :value="orgName"></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrId" label="延期申请人" :hidden="true" ></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrOrg" label="延期申请机构"  :hidden="true"></yu-xform-item>
              <yu-xform-item ctype="datepicker" name="delayRqstrDate"  label="延期申请日期" value-format="yyyy-MM-dd" :disabled="true" value=""></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="调阅延期申请审批表" name="delayApplyTable">
        <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="applyhist">
        <coop-approval :params="childParams"></coop-approval>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import FineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
yufp.lookup.reg('YESNO,STD_DOC_CLASS,STD_DOC_TYPE,STD_READ_REASON,STD_READ_MODE,STD_DOC_STAUTS,STD_READ_TYPE');
export default {
  mixins: [mixin],
  components: {FineReport, coopApproval},
  data: function () {
    return {
      viewType: '',
      dialogVisible: false,
      dialogVisibleDebt: false,
      applyBaseData: null,
      baseParams: null,
      delayData: null,
      baseBussParams: {condition: JSON.stringify({ draiSerno: this.bizPageData != undefined ? '99999999' : this.$route.meta.params.josnData.draiSerno, ifNeedDelay: 'true'}) },
      baseApplyParams: {condition: JSON.stringify({ ifDelayQuery: 'true'}) },
      applyActiveName: 'applyBase',
      dataApplyListUrl: this.$backend.cmisBiz + '/api/docreadappinfo/query',
      applyBussDataUrl: this.$backend.cmisBiz + '/api/docreaddetailinfo/query',
      formdata: null,
      collapseTitle: ['收起', '展开'],
      pickerOptions: {
        disabledDate: function (time) {
          return time.getTime() < Date.now() - 8.64e7;
        } // 用户有效期禁用当前之前的日期
      },
      rules: {
        delayCaseDesc: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ]
      },
      fineReportParam: {}
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      loginCode: state => state.oauth.loginCode,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    }),
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.josnData.drdiSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  props: {
    bizPageData: Object
  },
  created () {
    var _this = this;
    let drdiSerno = '';
    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      drdiSerno = _this.bizPageData.instanceInfo.bizId;
    } else {
      drdiSerno = _this.$route.meta.params.josnData.drdiSerno;
    }
    _this.fineReportParam = {
      'top_outsystem_code': 'dagl-dadyyqspb.cpt',
      'index': '&drdiSerno=' + drdiSerno
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      let _this = this;
      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/docreaddelayinfo/detail',
          data: {'drdiSerno': _this.bizPageData.instanceInfo.bizId},
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.delayData);
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/docreadappinfo/detail',
                data: {'draiSerno': _this.delayData.draiSerno},
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    yufp.clone(response.data, _this.applyBaseData);
                    _this.baseBussParams = {condition: JSON.stringify({ draiSerno: _this.applyBaseData.draiSerno, ifNeedDelay: 'true'}) };
                  }
                }
              });
            }
          }
        });
      } else {
        yufp.clone(_this.$route.meta.params.josnData, _this.delayData);
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/docreadappinfo/detail',
          data: {'draiSerno': _this.$route.meta.params.josnData.draiSerno},
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.applyBaseData);
              yufp.clone(_this.$route.meta.params.josnData, _this.delayData);
            }
          }
        });
      }
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    /**
     *保存
     */
    saveApplyFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.delayData, model);
      var validate = false;
      _this.$refs.applyDelayForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/docreaddelayinfo/update',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('操作成功');
          }
        }
      });
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.cancelFn();
    },
    /**
     *提交
     */
    submitApplyFn () {
      var _this = this;
      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys;
      // eslint-disable-next-line no-inner-declarations
      var bizType = 'DAGL01'; // 档案调阅审批流程-分支机构
      for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
        let item = dutysList[i];
        if (item.code === 'ZYB16') { // 集中作业中心-档案岗
          bizType = 'DAGL02';
          break;
        } else if (item.code === 'XWB13') { // 小微内勤岗
          bizType = 'DAGL03';
          break;
        }
      };
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = _this.delayData.drdiSerno;
      startdto.bizUserName = loginUser.userName;
      startdto.bizUserId = loginUser.loginCode;
      // startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 选择调阅申请记录后处理逻辑 */
    selectedDebtFn () {
      var _this = this;
      if (_this.$refs.applyTable.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = _this.$refs.applyTable.selections[0];
      _this.baseBussParams = {condition: JSON.stringify({ draiSerno: model.draiSerno, ifNeedDelay: 'true'}) };
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/docreadappinfo/detail',
        data: {'draiSerno': model.draiSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.applyBaseData);
            _this.delayData.drdiSerno = _this.$xutils.getSEQWithParamFromServer('IQP_WRITEOFF_APP_SERNO');
            _this.delayData.delayRqstrDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
            _this.delayData.delayRqstrId = this.loginCode;
            _this.delayData.delayRqstrName = this.userName;
            _this.delayData.delayRqstrOrg = this.orgCode;
            _this.delayData.delayRqstrOrgName = this.orgName;
            _this.ifShow = true;
          }
        }
      });
    },
    /** 关闭调阅申请选择窗口 */
    clearDebtFn () {
      this.cancelFn();
    }
  }
};
</script>
