/**
 * @Created by  hujun on 2021/6/17下午2:58:08.
 * @updated by
 * @description 档案调阅延期申请新增
 */
<template>
  <div>
    <yu-panel title="请选取需延期的档案调阅申请" v-show="ifShow">
      <yu-xform related-table-name="applyTable" v-model="formdata" form-type="search">
        <yu-xform-group :column="4">
            <yu-xform-item placeholder="调阅流水号" ctype="input" name="draiSerno"></yu-xform-item>
            <yu-xform-item placeholder="调阅原因" ctype="select" name="readReason" data-code="STD_READ_REASON"></yu-xform-item>
            <yu-xform-item placeholder="实际调阅人" name="readId" :colspan="7" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'readId':'readId'}" label-width="110px" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
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
      <div style="text-align:center;">
        <el-button type="primary" @click="selectedDebtFn" size="small">下一步</el-button>
        <el-button @click="clearDebtFn" size="small">取消</el-button>
      </div>
    </yu-panel>
    <yu-tabs v-model="applyActiveName" v-show="!ifShow" @tab-click="handleClick">
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
            <yu-xform-item ctype="datepicker" name="backDate"  label="归还日期" rules="required" value-format="yyyy-MM-dd" ></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrName"  label="调阅申请人"  :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrOrgName"  label="调阅申请机构" :disabled="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrId"  label="调阅申请人"  :disabled="true" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="input" name="readRqstrOrg"  label="调阅申请机构" :disabled="true" :hidden="true"></yu-xform-item>
            <yu-xform-item ctype="select" name="readMode"  label="调阅形式"  data-code="STD_READ_MODE" rules="required"></yu-xform-item>
            <yu-xform-item ctype="select" name="readType"  label="调阅类型"  data-code="STD_READ_TYPE" rules="required"></yu-xform-item>
            <yu-xform-item ctype="select" name="readReason"  label="调阅原因"  data-code="STD_READ_REASON" rules="required"></yu-xform-item>
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
            <yu-xtable-column label="责任人" prop="managerId" width="150" ></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" width="150" ></yu-xtable-column>
            <yu-xtable-column label="入库操作人" prop="optUsr" width="150" ></yu-xtable-column>
            <yu-xtable-column label="入库操作机构" prop="optOrg" width="150"></yu-xtable-column>
            <yu-xtable-column label="入库操作时间" prop="optDate" width="150"></yu-xtable-column>
            <yu-xtable-column label="档案入现金库时间" prop="storageCashDate" width="160"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xform ref="applyDelayForm" label-width="140px" v-model="delayData">
            <yu-xform-group :column="2">
              <yu-xform-item ctype="input" name="drdiSerno" label="延期流水号" :disabled="true" rules="required"></yu-xform-item>
              <yu-xform-item ctype="datepicker" name="delayBackDate" label="延期后归还日期" rules="required" @change="termChange" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></yu-xform-item>
              <yu-xform-item ctype="textarea" name="delayCaseDesc"  row="4" colspan="24" placeholder="2000个字符以内" :rules="rules.delayCaseDesc" label="延期情况说明"></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrName" label="延期申请人" rules="required" :value="userName" :disabled="true"></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrOrgName" label="延期申请机构"  rules="required" :value="orgName" :disabled="true"></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrId" label="延期申请人" :hidden="true" ></yu-xform-item>
              <yu-xform-item ctype="input" name="delayRqstrOrg" label="延期申请机构"  :hidden="true"></yu-xform-item>
              <yu-xform-item ctype="datepicker" name="delayRqstrDate"  label="延期申请日期" value-format="yyyy-MM-dd" :disabled="true" value=""></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button icon="yx-checkmark" type="primary" @click="submitApplyFn" v-show="ifSave">提交</yu-button>
          <yu-button icon="yx-checkmark" type="primary" @click="saveApplyFn" >保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="调阅延期申请审批表" v-if="ifPrint" name="delayApplyTable">
        <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" v-if="ifPrint" name="applyhist">
        <adjustment-judge-his :judge-his-params="childParams"></adjustment-judge-his>
      </yu-tab-pane>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import FineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import AdjustmentJudgeHis from '@/views/zrcbank/biz/creditcardmanage/adjustment/adjustmentjudge/tabs/AdjustmentJudgeHis.vue';
yufp.lookup.reg('YESNO,STD_DOC_CLASS,STD_DOC_TYPE,STD_READ_REASON,STD_READ_MODE,STD_DOC_STAUTS');
export default {
  mixins: [mixin],
  components: { yufpNwfInit, FineReport, AdjustmentJudgeHis },
  data: function () {
    return {
      viewType: '',
      dialogVisible: false,
      dialogVisibleDebt: false,
      applyBaseData: null,
      baseParams: null,
      delayData: null,
      baseBussParams: {condition: JSON.stringify({ draiSerno: '999999', ifNeedDelay: 'true'}) },
      baseApplyParams: {condition: JSON.stringify({ ifDelayQuery: 'true', approveStatus: '997'}) },
      ifSave: false, // 是否已保存
      isShow: true,
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
      fineReportParam: {},
      ifPrint: false
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
        serno: '999999'
      };
      return params;
    }
  },
  created () {
    var _this = this;
    _this.fineReportParam = {
      'top_outsystem_code': 'dagl-dadyyqspb.cpt',
      'index': '&drdiSerno='
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {

    termChange (value) { // 校验合同期限
      let date = this.applyBaseData.backDate;
      let delayBackDate = this.get2YearTime(this.applyBaseData.backDate);
      if (value == 'undefined' || value == null || value == '') {
        return;
      }
      if (delayBackDate == 'undefined' || delayBackDate == null || delayBackDate == '') {
        return;
      }
      if (value <= date) {
        this.$xutils.showMsgBox('延迟归还不得提前于归还日期'); // 弹出提示
        this.delayData.delayBackDate = '';
        return;
      }
      if (value > delayBackDate) {
        this.$xutils.showMsgBox('延迟归还不得超过2年'); // 弹出提示
        this.delayData.delayBackDate = '';
        return;
      }
    },
    get2YearTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear() + 2;
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },

    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'readId') {
            this.formdata[mapping[item]] = data.loginCode;
          }
        }
      }
    },


    /* 页面初始化 */
    afterInit () {
      this.ifShow = this.$route.meta.params.ifShow;
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
      let url = this.$backend.cmisBiz + '/api/docreaddelayinfo/save';
      model.draiSerno = _this.applyBaseData.draiSerno;
      if (_this.ifSave) {
        url = this.$backend.cmisBiz + '/api/docreaddelayinfo/update';
      }
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.ifSave = true;
            _this.$message('操作成功');
            _this.fineReportParam = {
              'top_outsystem_code': 'dagl-dadyyqspb.cpt',
              'index': '&drdiSerno=' + response.data.drdiSerno
            };
            _this.ifPrint = true;
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
      var validate = false;
      var bizType = '';
      _this.$refs.applyDelayForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let dutyType = '01';// 发起人岗位 01客户经理 02档案岗
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      const dutysList = loginUser.dutys;
      let zcbqFlag = '0';// 是否资产保全客户经理
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          bizType = 'SGJ03';// 档案调阅审批流程（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          bizType = 'DHJ03';// 档案调阅审批流程（东海）
        }
        if (dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'DHH21' || item.code === 'SGH21') { // 资产保全客户经理（东海）DHH21；资产保全客户经理（寿光）SGH21
              zcbqFlag = '1';
              break;
            }
          };
        }
      } else {
        bizType = 'DA004'; // 档案调阅审批流程-分支机构
        if (dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 集中作业中心-档案岗
              bizType = 'DA005';
              break;
            } else if (item.code === 'XWB13') { // 小微内勤岗
              bizType = 'DA006';
              break;
            } else if (item.code === 'FZH16') { // 分支机构档案岗
              bizType = 'DA004';
              dutyType = '02';
              break;
            }
          };
        }
        if (bizType == 'DA004' && _this.applyBaseData.readType == '04') {
          _this.$message({
            message: '调阅类型与流程不匹配!',
            type: 'warning'
          });
          return false;
        } else if (bizType == 'DA005' && _this.applyBaseData.readType == '04') {
          _this.$message({
            message: '调阅类型与流程不匹配!',
            type: 'warning'
          });
          return false;
        } else if (bizType == 'DA006' && (_this.applyBaseData.readType == '01' || _this.applyBaseData.readType == '02')) {
          _this.$message({
            message: '调阅类型与流程不匹配!',
            type: 'warning'
          });
          return false;
        }
      }
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.code;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = _this.delayData.drdiSerno;
      startdto.bizUserName = _this.applyBaseData.readName;
      startdto.bizUserId = _this.applyBaseData.readId;
      startdto.param = {readType: _this.applyBaseData.readType, dutyType: dutyType, zcbqFlag: zcbqFlag};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 选择调阅申请记录后处理逻辑,下一步 */
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
      _this.delayData.drdiSerno = _this.$xutils.getSEQWithParamFromServer('DOC_SERNO');
      _this.delayData.delayRqstrDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.delayData.delayRqstrId = _this.loginCode;
      _this.delayData.delayRqstrName = _this.userName;
      _this.delayData.delayRqstrOrg = _this.orgCode;
      _this.delayData.delayRqstrOrgName = _this.orgName;
      _this.ifShow = false;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/docreadappinfo/detail',
        data: {'draiSerno': model.draiSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.applyBaseData);
          }
        }
      });
    },
    handleClick () {},
    /** 关闭调阅申请选择窗口 */
    clearDebtFn () {
      this.cancelFn();
    }
  }
};
</script>
