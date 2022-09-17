
<template>
  <div>
    <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata" :form-type="viewType">
        <yu-xform-group column="2">
          <yu-xform-item label="业务流水号" ctype="input" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" name="cusType" data-code="STD_ZB_CUS_TYP" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled colspan="12"></yu-xform-item>

          <yu-xform-item label="测算最高流动资金贷款(元)"  ctype="input" name="evalHighCurfundLmtAmt" disabled colspan="11"
            :hidden="evalHighCurfundLmtAmtSign != '8'"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="cusId" colspan="1" :hidden="evalHighCurfundLmtAmtSign != '8'">
            <yu-button type="primary" :disabled="type=='VIEW'||(apprStatus!='000'&&apprStatus!='992')" @click="getAmt">测算</yu-button>
          </yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" :value="CNY" disabled></yu-xform-item>
          <yu-xform-item label="敞口额度合计(元)" ctype="yu-num" number-formatter="0,000.00" name="openTotalLmtAmt" disabled></yu-xform-item>
          <yu-xform-item label="低风险额度合计(元)" ctype="yu-num" number-formatter="0,000.00" name="lowRiskTotalLmtAmt" disabled></yu-xform-item>
          <yu-xform-item label="授信期限（月）" ctype="input" rules="required" name="lmtTerm" :disabled="editAble"></yu-xform-item>
          <yu-xform-item label="宽限期（月）" ctype="input" rules="required" name="lmtGraperTerm" :disabled="editAble"></yu-xform-item>
          <yu-xform-item label="是否提交自动化审批" ctype="select" :rules="{ required: isSubAutoApprRequired, message: '字段不能为空' }" name="isSubAutoAppr" data-code="STD_ZB_YES_NO" :disabled="evalHighCurfundLmtAmtSign !='8' || editAble" :hidden="isSubAutoApprShowOrhid != '0'"></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" name="pkId" hidden="true"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" name="oprType" hidden="true"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="input" name="approveStatus" hidden="true"></yu-xform-item>
          <yu-xform-item label="修改人" ctype="input" name="updId" hidden="true"></yu-xform-item>
          <yu-xform-item label="修改机构" ctype="input" name="updBrId" hidden="true"></yu-xform-item>
          <yu-xform-item label="修改日期" ctype="input" name="updDate" hidden="true"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" name="createTime" hidden="true"></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" name="updateTime" hidden="true"></yu-xform-item>
          <yu-xform-item label="是否集团" ctype="input" name="isGrp" hidden="true"></yu-xform-item>
          <yu-xform-item label="原授信流水号" ctype="input" name="ogrigiLmtSerno" hidden="true"></yu-xform-item>
          <yu-xform-item label="调查报告类型" ctype="select"  data-code="STD_RPT_TYPE" name="rptType" hidden="true"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="原授信批复信息" :collapseHide="false" v-if="lmtType=='03' || lmtType=='04'|| lmtType=='05'|| lmtType=='08'">
      <yu-xform ref="lmtOriginForm" label-width="160px" v-model="originFormdata">
        <yu-xform-group>
          <yu-xform-item label="原授信批复编号" ctype="input" name="origiLmtReplySerno" disabled colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="cusId" disabled colspan="2">
            <yu-button type="primary" @click="viewReply">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="原授信期限（月）" ctype="input" name="origiLmtTerm" disabled></yu-xform-item>
          <yu-xform-item label="原宽限期（月）" ctype="input" name="origiLmtGraperTerm" disabled></yu-xform-item>
          <yu-xform-item label="原敞口额度合计（元）" ctype="yu-num" number-formatter="0,000.00" name="origiOpenTotalLmtAmt" disabled></yu-xform-item>
          <yu-xform-item label="原低风险额度合计（元）" ctype="yu-num" number-formatter="0,000.00" name="origiLowRiskTotalLmtAmt" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="登记信息" :collapseHide="false">
      <yu-xform ref="inputForm" label-width="160px" v-model="inputFormdata">
        <yu-xform-group>
          <yu-xform-item label="登记人" ctype="input" name="inputId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="tempSave">暂存</yu-button>
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="submitFormFn">保存</yu-button>
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="submit">提交</yu-button>
      <yu-button v-if="type!='VIEW'&&(apprStatus=='000'||apprStatus=='992')" type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
    <yufpNwfRiskNoFlow ref="yufpNwfRiskNoFlow" ></yufpNwfRiskNoFlow>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
yufp.lookup.reg('STD_ZB_CUS_TYP,GENDER,EDUCATION_TYPE,IDENT_TYPE,STD_RPT_TYPE');
export default {
  components: { yufpNwfRiskNoFlow},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      expandCollapseName: ['base'],
      baseFormdata: {},
      familyFormdata: {},
      otherFormdata: {},
      type: '',
      editAbled: '',
      lmtType: '',
      apprStatus: '',
      lmtTerm: '',
      currentUserId: '',
      currentOrgId: '',
      isShowBtn: true,
      evalHighCurfundLmtAmtSign: '0',
      ruled: '',
      rptTypeList: '',
      cusCatalog: '',
      isSmconCus: '',
      isSubAutoApprShowOrhid: '0',
      isSubAutoApprRequired: true // 是否自动化审批，必输属性
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    viewType () {
      return this.$route.params.viewType;
    }
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
    this.initForm();
  },
  mounted () {
  },
  methods: {
    /**
     * 根据用户是对公还是个人，来判断测算流动资金测算表的显示、隐藏
     */
    isGrpCus: function (cusId) {
      var _this = this;
      if (cusId.startsWith('8')) {
        _this.evalHighCurfundLmtAmtSign = '8';
        _this.ruled = [
          {
            required: true,
            message: '字段不能为空'
          }
        ];
      } else {
        _this.baseFormdata.isSubAutoAppr = '0';
        _this.isSubAutoApprRequired = false;
      }
    },
    /**
     *  根据用户是否为集团、来判断是否提交自动化审批的显示与隐藏
     */
    isGrpShowAndHid: function (isGrp) {
      var _this = this;
      // 1 是 0 否
      if (isGrp == '1') {
        _this.isSubAutoApprShowOrhid = '1';
        _this.baseFormdata.isSubAutoAppr = '0';
        _this.isSubAutoApprRequired = false;
      } else {
        _this.isSubAutoApprShowOrhid = '0';
      }
    },
    /**
     * 暂存表单信息
     */
    tempSave: function () {
      var _this = this;
      var baseFlag = true;
      var familyFlag = true;
      var otherFlag = true;
      if (baseFlag && familyFlag && otherFlag) {
        var comitData = {};
        yufp.clone(_this.baseFormdata, comitData);
        yufp.clone(_this.familyFormdata, comitData);
        yufp.clone(_this.otherFormdata, comitData);
        _this.$confirm('是否确认暂存修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisBiz + '/api/lmtapp/updatelmtapp',
                data: comitData,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    var rtnData = response.data;
                    if (rtnData.rtnCode == '0000') {
                      _this.$message('暂存成功');
                    } else {
                      _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
                    }
                  } else {
                    _this.$message('暂存失败!');
                  }
                }
              });
            }
          }
        });
      }
    },

    /**
     * 提交表单信息
     */
    submitFormFn: function () {
      var _this = this;
      var baseFlag = true;
      var familyFlag = true;
      var otherFlag = true;
      var validate = false;
      _this.$refs.lmtBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.lmtType == '04' && _this.originFormdata.origiLmtTerm != '' && _this.originFormdata.origiLmtTerm != null) {
        var origiLmtTerm = _this.originFormdata.origiLmtTerm - 0;
        var lmtTerm = _this.originFormdata.lmtTerm - 0;
        if (origiLmtTerm < lmtTerm) {
          _this.baseFormdata.lmtTerm = _this.lmtTerm;
          _this.$xutils.showMsgBox('提示', '当前授信期限不允许延长');
          return;
        }
      }
      if (baseFlag && familyFlag && otherFlag) {
        var comitData = {};
        yufp.clone(_this.baseFormdata, comitData);
        yufp.clone(_this.familyFormdata, comitData);
        yufp.clone(_this.otherFormdata, comitData);
        _this.$confirm('是否确认修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisBiz + '/api/lmtapp/updatelmtapp',
                data: comitData,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    var rtnData = response.data;
                    if (rtnData.rtnCode == '0000') {
                      _this.doMustCheck();
                      _this.$message('保存成功');
                    } else {
                      _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
                    }
                  } else {
                    _this.$message('保存失败!');
                  }
                }
              });
            }
          }
        });
      }
    },
    doMustCheck: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.baseFormdata.serno;
      obj.pageId = 'sxsbjbxx';
      obj.pageName = '授信申报基本信息';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    /**
     * 重置所有表单内容
     */
    resetFormFn: function () {
      var _this = this;
      _this.$refs.refBaseForm.resetFields();
      _this.$refs.refFamilyForm.resetFields();
      _this.$refs.refOtherForm.resetFields();
    },

    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var loginUser = _this.$xutils.getLoginUserInfo();
      console.log(loginUser);
      var serno = '';
      if (_this.$route.meta.params) {
        // serno = this.getFactory().contextData.serno;
        serno = _this.$route.meta.params.serno;
        _this.type = _this.$route.meta.params.op;
        _this.editAble = _this.$route.meta.params.editAble;
        _this.isShowBtn = false;
      } else if (_this.pageParams) {
        serno = _this.pageParams.serno;
        _this.type = _this.pageParams.op;
        _this.editAble = _this.pageParams.editAble;
      } else if (_this.getFactory().contextData.serno) {
        serno = _this.getFactory().contextData.serno;
        _this.type = _this.getFactory().contextData.op;
        _this.editAble = _this.getFactory().contextData.editAble;
        _this.isShowBtn = true;
      }
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
        _this.type = 'VIEW';
        _this.editAble = true;
      }
      var params = {
        serno: serno
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: params,
        callback: function (code, message, response) {
          _this.lmtType = response.data.lmtType;
          _this.lmtTerm = response.data.lmtTerm;
          _this.apprStatus = response.data.approveStatus;
          _this.baseFormdata.isSubAutoAppr = '0';
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata);
            yufp.clone(response.data, _this.originFormdata);
            yufp.clone(response.data, _this.inputFormdata);

            // 根据用户是对公还是个人，来判断测算流动资金测算表的显示、隐藏
            _this.isGrpCus(response.data.cusId);

            // 根据用户是否为集团、来判断是否提交自动化审批的显示与隐藏
            _this.isGrpShowAndHid(response.data.isGrp);

            let isAdjustShowTab = false;
            // 单一分项页面 排除 变更,调剂 页面
            // 判断是否集团成员客户调剂
            if (
              response.data.lmtType == '01' ||
              response.data.lmtType == '02' ||
              response.data.lmtType == '03' ||
              response.data.lmtType == '05' ||
              response.data.lmtType == '06' ||
              response.data.lmtType == '07'
            ) {
              isAdjustShowTab = true;
            }
            debugger;
            // 审查报告 批复报告 显示条件
            // let isShowReport = response.data.approveStatus;

            _this.getFactory().triggerAction({
              lmtType: response.data.lmtType,
              isAdjustShowTab: isAdjustShowTab,
              evalHighCurfundLmtAmtSign: _this.evalHighCurfundLmtAmtSign,
              isShowReport: response.data.approveStatus
            });
            if (response.data.lmtType == '08') {
              _this.editAbled = true;
            }
          });
        }
      });
    },

    // 返回上一页面
    back: function () {
      // this.$router.go(-1);
      if (this.isShowBtn) {
        this.getFactory().back();
      } else {
        yufp.router.removeTab(this.$route.path);
      }
    },

    /**
     * 测算最高额流动资金
     */
    getAmt: function () {
      let _this = this;
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/lmtHighCurfundEvalBiz/LmtHighCurfundEvalAddIndex',
        1400,
        800,
        _this.baseFormdata,
        function (data) {
          _this.baseFormdata.evalHighCurfundLmtAmt = data;
        }
      );
    },

    submitNotFlow () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/passforsganddh',
        data: _this.baseFormdata.serno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$message('保存成功');
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
            }
          } else {
            _this.$message('保存失败!');
          }
        }
      });
    },


    submit: function () {
      var _this = this;
      var validate = false;
      _this.$refs.lmtBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.lmtType == '04' && _this.originFormdata.origiLmtTerm != '' && _this.originFormdata.origiLmtTerm != null) {
        if (_this.originFormdata.origiLmtTerm < _this.baseFormdata.lmtTerm) {
          _this.baseFormdata.lmtTerm = _this.lmtTerm;
          _this.$xutils.showMsgBox('提示', '当前授信期限不允许延长');
          return;
        }
      }
      var comitData = {};
      yufp.clone(_this.baseFormdata, comitData);
      yufp.clone(_this.familyFormdata, comitData);
      yufp.clone(_this.otherFormdata, comitData);
      var isGrpNow = _this.baseFormdata.isGrp;
      let loginUserNow = _this.$xutils.getLoginUserInfo();
      var orgCodeNow = loginUserNow.orgCode;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/updatelmtapp',
        data: comitData,
        callback: function (code, message, response) {
          if (response.code == '0') {
            var rtnData = response.data;
            _this.doMustCheck();
            if (rtnData.rtnCode == '0000') {
              if (isGrpNow == '1' && (orgCodeNow.startsWith('80') || orgCodeNow.startsWith('81'))) {
                var startdto = {};
                startdto.preventId = 'E53B40CDD00D41D48EA111B65D60A3C2'; // 风险拦截方案
                startdto.systemId = 'cmis';
                startdto.bizId = _this.baseFormdata.serno;
                startdto.bizUserName = _this.baseFormdata.cusName;
                startdto.bizUserId = _this.baseFormdata.cusId;
                startdto.cusId = _this.baseFormdata.cusId;
                if (_this.lmtType == '01') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC01';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC01';
                  }
                } else if (_this.lmtType == '02') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC06';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC06';
                  }
                } else if (_this.lmtType == '03') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC02';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC02';
                  }
                } else if (_this.lmtType == '04') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC03';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC03';
                  }
                } else if (_this.lmtType == '05') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC04';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC04';
                  }
                } else if (_this.lmtType == '06') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC05';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC05';
                  }
                } else if (_this.lmtType == '07') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC07';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC07';
                  }
                } else if (_this.lmtType == '08') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC06';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC06';
                  }
                } else {
                  _this.$message('授信类型错误');
                  return;
                }
                _this.$refs.yufpNwfRiskNoFlow.riskFn(startdto);
              } else {
                // 是否集团授信标志
                var isGrp = _this.baseFormdata.isGrp;
                // 流程状态
                var approveStatus = _this.baseFormdata.approveStatus;
                var ogrigiLmtSerno = _this.baseFormdata.ogrigiLmtSerno;
                var topOutsystemCode = '';
                if (_this.lmtType == '05') {
                  topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXFYSQZL;SXFYDBZL;XD_FZHYXCL;ZHSXPF';
                } else {
                  topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF';
                }
                // 提交流程
                var startdto = {};
                startdto.systemId = 'cmis';
                startdto.orgId = _this.currentOrgId;
                startdto.userId = _this.currentUserId;
                if (isGrp == '1') {
                  // 如果是集团授信发起则调用集团子流程
                  if (_this.lmtType == '01') {
                    // 集团成员授信新增
                    startdto.bizType = 'SX024';
                  } else if (_this.lmtType == '02') {
                    // 集团成员授信变更
                    startdto.bizType = 'SX025';
                  } else if (_this.lmtType == '03') {
                    // 集团成员授信续作
                    startdto.bizType = 'SX025';
                  } else if (_this.lmtType == '04') {
                    // 集团成员授信复审
                    startdto.bizType = 'SX026';
                  } else if (_this.lmtType == '05') {
                    // 集团成员授信复议
                    startdto.bizType = 'SX027';
                  } else if (_this.lmtType == '06') {
                    // 集团成员授信再议
                    startdto.bizType = 'SX028';
                  } else if (_this.lmtType == '07') {
                    // 集团成员授信再议
                    startdto.bizType = 'SX030';
                  } else if (_this.lmtType == '08') {
                    // 集团成员授信调剂
                    startdto.bizType = 'SX031';
                  } else {
                    _this.$message('集团授信类型错误');
                    return;
                  }
                } else {
                  let loginUser = _this.$xutils.getLoginUserInfo();
                  var isXwFlag = true;
                  var dutysArr = loginUser.dutys;
                  if (dutysArr != null && dutysArr.length > 0) {
                    dutysArr.forEach(function (item) {
                      if (item.code == 'XWB01') {
                        isXwFlag = true;
                      }
                    });
                  }
                  var orgCode = loginUser.orgCode;
                  if (_this.lmtType == '01') {
                    startdto.bizType = 'SX001'; // 需要判断不同的授信类型，然后biz_type不同传参
                    if (orgCode.startsWith('80')) {
                      startdto.bizType = 'SGC01';
                    }
                    if (orgCode.startsWith('81')) {
                      startdto.bizType = 'DHC01';
                    }
                    if (isXwFlag) {
                      startdto.bizType = 'SX001';
                    }
                  } else if (_this.lmtType == '03') {
                    startdto.bizType = 'SX002';
                    if (orgCode.startsWith('80')) {
                      startdto.bizType = 'SGC02';
                    }
                    if (orgCode.startsWith('81')) {
                      startdto.bizType = 'DHC02';
                    }
                    if (isXwFlag) {
                      startdto.bizType = 'SX001';
                    }
                  } else if (_this.lmtType == '04') {
                    startdto.bizType = 'SX003';
                    if (orgCode.startsWith('80')) {
                      startdto.bizType = 'SGC03';
                    }
                    if (orgCode.startsWith('81')) {
                      startdto.bizType = 'DHC03';
                    }
                    if (isXwFlag) {
                      startdto.bizType = 'SX001';
                    }
                  } else if (_this.lmtType == '05') {
                    startdto.bizType = 'SX004';
                    if (orgCode.startsWith('80')) {
                      startdto.bizType = 'SGC04';
                    }
                    if (orgCode.startsWith('81')) {
                      startdto.bizType = 'DHC04';
                    }
                    if (isXwFlag) {
                      startdto.bizType = 'SX001';
                    }
                  } else if (_this.lmtType == '06') {
                    startdto.bizType = 'SX005';
                    if (orgCode.startsWith('80')) {
                      startdto.bizType = 'SGC05';
                    }
                    if (orgCode.startsWith('81')) {
                      startdto.bizType = 'DHC05';
                    }
                    if (isXwFlag) {
                      startdto.bizType = 'SX001';
                    }
                  } else {
                    _this.$message('授信类型错误');
                    return;
                  }
                }
                startdto.bizId = _this.baseFormdata.serno;
                startdto.bizUserName = _this.baseFormdata.cusName;
                startdto.bizUserId = _this.baseFormdata.cusId;
                startdto.cusId = _this.baseFormdata.cusId;
                var loginUser1 = _this.$xutils.getLoginUserInfo();
                var isZCBQB = '0';
                var dutysArr = loginUser1.dutys;
                if (dutysArr != null && dutysArr.length > 0) {
                  dutysArr.forEach(function (item) {
                    if (item.id == 'SGH21' || item.id == 'DHH21') {
                      isZCBQB = '1';
                    }
                  });
                }
                // 子流程处理
                //  获取授信抵质押物价值认定申请流水号
                var lmtOtherAppSerno = '';
                _this.$request({
                  method: 'POST',
                  async: false,
                  url: backend.cmisBiz + '/api/lmtotherapprel/querybylmtserno',
                  data: {condition: JSON.stringify({lmtSerno: _this.baseFormdata.serno}) }
                }).then(({ code, message, data }) => {
                  console.log('授信抵质押查询返回数据2-->', data);
                  if (code == '0' && data[0]) {
                    lmtOtherAppSerno = data[0].lmtOtherAppSerno;
                    if (lmtOtherAppSerno != '') {
                      console.log('子流程开始2-->');
                      const loginUser = _this.$xutils.getLoginUserInfo();
                      var subParams = [
                        {
                          orgId: loginUser.orgCode,
                          bizId: lmtOtherAppSerno,
                          bizUserId: loginUser.loginCode,
                          bizUserName: loginUser.userName,
                          param: {
                            orgType: loginUser.org.orgType,
                            orgId: loginUser.orgCode
                          }
                        }
                      ];
                      startdto.param = {
                        approveStatus: approveStatus,
                        subStartParams: subParams,
                        ogrigiLmtSerno: ogrigiLmtSerno,
                        imageParams: {
                          docid: lmtOtherAppSerno,
                          contid: lmtOtherAppSerno,
                          businessid: ogrigiLmtSerno
                        },
                        topOutsystemCode: topOutsystemCode,
                        isZCBQB: isZCBQB };
                    } else {
                      startdto.param = {
                        approveStatus: approveStatus,
                        ogrigiLmtSerno: ogrigiLmtSerno,
                        imageParams: {
                          docid: ogrigiLmtSerno,
                          contid: ogrigiLmtSerno,
                          businessid: ogrigiLmtSerno
                        },
                        topOutsystemCode: topOutsystemCode,
                        isZCBQB: isZCBQB
                      };
                    }
                  } else {
                    startdto.param = {
                      approveStatus: approveStatus,
                      ogrigiLmtSerno: ogrigiLmtSerno,
                      imageParams: {
                        docid: ogrigiLmtSerno,
                        contid: ogrigiLmtSerno,
                        businessid: ogrigiLmtSerno
                      },
                      topOutsystemCode: topOutsystemCode,
                      isZCBQB: isZCBQB
                    };
                  }
                  var serno = comitData.serno;
                  if (isXwFlag) {
                    yufp.service.request({
                      method: 'POST',
                      async: false,
                      url: backend.cmisBiz + '/api/lmtappsubprd/getGuarModeDetail',
                      data: serno,
                      callback: function (code, message, response) {
                        if (response.data && response.data != null) {
                          startdto.param = {
                            xyLmtAmt: response.data.xyLmtAmt,
                            bzLmtAmt: response.data.bzLmtAmt,
                            cdlcLmtAmt: response.data.cdlcLmtAmt,
                            pldLmtAmt: response.data.pldLmtAmt
                          };
                        }
                      }});
                  }
                  console.log('流程参数2----->', startdto.param);
                  _this.$refs.yufpNwfInit.wfInit(startdto);
                });
              }
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
              return;
            }
          } else {
            _this.$message('保存失败!');
            return;
          }
        }
      });
    },
    // 流程回调
    onBack () {
      if (this.isShowBtn) {
        this.$dialog.close(this.dialogId);
      } else {
        yufp.router.removeTab(this.$route.path);
      }
    },
    viewReply: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyacc/queryAll',
        data: {
          condition: JSON.stringify({
            replySerno: _this.originFormdata.origiLmtReplySerno
          })
        },
        callback: function (code, message, response) {
          debugger;
          var accNo = '';
          if (response.data != null && response.data.length > 0) {
            accNo = response.data[0].accNo;
            let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
            let keydemo = 'frptdemosxpf';
            let params = response.data;
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
      });
    }
  }
};
</script>
