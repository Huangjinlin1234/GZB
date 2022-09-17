
<template>
  <div>
    <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false" disabled>
      <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata" :form-type="viewType">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" ctype="input" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" name="cusType" data-code="STD_ZB_CUS_TYP" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="测算最高流动资金贷款(元)" ctype="yu-num" number-formatter="0,000.00" name="evalHighCurfundLmtAmt" disabled  :hidden="evalHighCurfundLmtAmtSign != '8'" :required="evalHighCurfundLmtAmtSign == '8'"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType"  data-code="STD_ZB_CUR_TYP"  disabled></yu-xform-item>
          <yu-xform-item label="敞口额度合计(元)" ctype="yu-num" number-formatter="0,000.00" name="openTotalLmtAmt" disabled></yu-xform-item>
          <yu-xform-item label="低风险额度合计(元)" ctype="yu-num" number-formatter="0,000.00" name="lowRiskTotalLmtAmt" disabled></yu-xform-item>
          <yu-xform-item label="授信期限（月）" ctype="input" name="lmtTerm" disabled></yu-xform-item>
          <yu-xform-item label="宽限期（月）" ctype="input" name="lmtGraperTerm" disabled></yu-xform-item>
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
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="原授信批复信息" :collapseHide="false">
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
      <yu-button type="primary" @click="back" >返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
    <yufpNwfRiskNoFlow ref="yufpNwfRiskNoFlow" ></yufpNwfRiskNoFlow>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
yufp.lookup.reg('GENDER,EDUCATION_TYPE,IDENT_TYPE');
export default {
  components: { yufpNwfRiskNoFlow},
  data: function () {
    return {
      expandCollapseName: ['base'],
      baseFormdata: {},
      familyFormdata: {},
      otherFormdata: {},
      type: '',
      editAbled: '',
      lmtType: {},
      apprStatus: {},
      currentUserId: '',
      currentOrgId: '',
      isShowBtn: false,
      evalHighCurfundLmtAmtSign: '1'
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
  },
  mounted () {
    this.initForm();
    this.getFactory().setButtonVisiable('commit', false);
    this.getFactory().setButtonVisiable('save', false);
    this.getFactory().setButtonVisiable('tempSave', false);
    this.getFactory().setButtonVisiable('back', false);
  },
  methods: {
    /**
     * 根据用户是对公还是个人，来判断测算流动资金测算表的显示、隐藏
     */
    isGrpCus: function (cusId) {
      var _this = this;
      if (cusId.startsWith('8')) {
        _this.evalHighCurfundLmtAmtSign = '8';
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
      obj.pageId = 'dykhysxxhxqym';
      obj.pageName = '单一客户预授信细化详情页面';
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
      var serno = '';
      if (_this.pageParams) {
        serno = _this.pageParams.serno;
        _this.type = _this.pageParams.op;
        _this.editAbled = _this.pageParams.editAbled;
      } else if (_this.getFactory().contextData.serno) {
        serno = _this.getFactory().contextData.serno;
        _this.type = _this.getFactory().contextData.op;
        _this.editAbled = _this.getFactory().contextData.editAbled;
        _this.isShowBtn = true;
      } else if (_this.$route.meta.params) {
        // serno = this.getFactory().contextData.serno;
        serno = _this.$route.meta.params.serno;
        _this.type = _this.$route.meta.params.op;
        _this.editAbled = _this.$route.meta.params.editAbled;
      }
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      var params = {
        'serno': serno
      };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: params,
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.baseFormdata);
          yufp.clone(response.data, _this.originFormdata);
          yufp.clone(response.data, _this.inputFormdata);
          _this.lmtType = response.data.lmtType;
          _this.apprStatus = response.data.approveStatus;
          _this.isGrpCus(response.data.cusId);
          _this.getFactory().triggerAction({
            'lmtType': response.data.lmtType,
            'evalHighCurfundLmtAmtSign': _this.evalHighCurfundLmtAmtSign
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


    submit: function () {
      var _this = this;
      var validate = false;
      _this.$refs.lmtBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
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
                if (_this.lmtType == '07') {
                  if (orgCodeNow.startsWith('80')) {
                    startdto.bizType = 'SGC07';
                  }
                  if (orgCodeNow.startsWith('81')) {
                    startdto.bizType = 'DHC07';
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
                let loginUser = _this.$xutils.getLoginUserInfo();
                var instuCde = loginUser.instu.code;
                var orgCode = loginUser.orgCode;
                // 提交流程
                var startdto = {};
                startdto.systemId = 'cmis';
                startdto.orgId = _this.currentOrgId;
                startdto.userId = _this.currentUserId;
                if (isGrp == '1') { // 如果是集团授信发起则调用集团子流程
                  startdto.bizType = 'SX030'; // 集团成员授信预授信细化
                } else {
                  startdto.bizType = 'SX007'; // 单一客户预授信细化
                  if (orgCode.startsWith('80')) {
                    startdto.bizType = 'SGC07';
                  }
                  if (orgCode.startsWith('81')) {
                    startdto.bizType = 'DHC07';
                  }
                }
                startdto.bizId = _this.baseFormdata.serno;
                startdto.bizUserName = _this.baseFormdata.cusName;
                startdto.bizUserId = _this.baseFormdata.cusId;
                startdto.param = {
                  approveStatus: approveStatus,
                  ogrigiLmtSerno: ogrigiLmtSerno,
                  topOutsystemCode: 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF',
                  imageParams: {
                    docid: _this.baseFormdata.serno,
                    contid: _this.baseFormdata.serno,
                    businessid: ogrigiLmtSerno
                  }
                };
                _this.$refs.yufpNwfInit.wfInit(startdto);
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
      if (_this.isShowBtn) {
        _this.$dialog.open(
          '',
          'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
          1400,
          800,
          {
            replySerno: _this.originFormdata.origiLmtReplySerno
          },
          function () {
            _this.$refs.refTable.remoteData();
          },
          true,
          true
        );
      } else {
        _this.$router.addTab({
        // 路由名称
          name: 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'lmtReplyDetail', // 必传
          // 页签名称
          title: '批复详情',
          data: {
            replySerno: _this.originFormdata.origiLmtReplySerno
          }
        });
      }
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
    }
  }
};
</script>
