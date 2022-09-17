<template>
  <!--
    @created by 张亮 2021/08/02
    @description 房抵e点贷尽调结果录入
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="业务基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" :disabled="true" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="核心客户号" ctype="input" name="cusId" :rules="rule[0]" :disabled="true"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :disabled="true" ctype="input" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="证件类型" name="certType" :disabled="true" ctype="select" data-code="STD_ZB_CERT_TYP" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="证件号码" name="certCode" :rules="rule[0]" :disabled="true" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="调查结果" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="手机银行录入信息是否准确" name="isMobileBankInfo" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]" :colspan="11" @change="onChange"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="isMobileBankInfoView" colspan="1" :hidden="MobileView">
            <yu-button type="primary" @click="viewEntlQyInfoBySerno">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="isMobileBankInfoUpdate" colspan="1" :hidden="MobileUpdate">
            <yu-button type="primary" @click="viewEntlQyInfoBySerno">修改</yu-button>
          </yu-xform-item>

          <yu-xform-item label="信息修改状态" name="crpStatus" ctype="select" data-code="STD_OUT_STATUS" :disabled="true"></yu-xform-item>
          <yu-xform-item label="是否收集现场照片" name="isScenePhoto" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="是否完成抵押物勘验表" name="isPldimnInspect" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="房产抵押物情况" name="housePldCase" ctype="select" data-code="STD_CREDIT_STATUS" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="是否完成经营场所勘验表" name="isOperInspect" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="企业经营情况" name="operCase" ctype="select" data-code="STD_CREDIT_STATUS" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="征信情况" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="经营企业近2年无逾期贷款" name="isCorpOverdueLoan" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="经营企业无风险分类后三类贷款" name="isCorpThreeLoan" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="借款人是否有配偶" name="isCusSpouse" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]" @change="isCusSpouseOnChange"></yu-xform-item>
          <yu-xform-item label="配偶近2年无逾期经营性贷款" name="isSpouseOperLoan" ctype="select" data-code="STD_ZB_YES_NO" :hidden="isHidOrShow" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="配偶近2年房贷、消费贷逾期不超过5次" name="isSpouseOverdueTimes" ctype="select" data-code="STD_ZB_YES_NO" :hidden="isHidOrShow" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="配偶无风险分类后三类贷款" name="isSpouseThreeLoan" ctype="select" data-code="STD_ZB_YES_NO" :hidden="isHidOrShow" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="业务意见" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否予以业务准入" name="isAdmit" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="提交时间" name="submitDate" ctype="datepicker" hidden></yu-xform-item>
          <yu-xform-item label="流程状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS" hidden></yu-xform-item>
          <yu-xform-item label="处理人" name="managerId" ctype="input" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveFn" v-if="isButShow">保存</yu-button>
      <yu-button type="primary" @click="submitFn" v-if="isButShow">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
        <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CREDIT_STATUS,STD_ZB_YES_NO');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {yufpNwfInit},
  data: function () {
    return {
      isDisabled: false,
      isButShow: false,
      MobileView: false,
      MobileUpdate: true,
      isHidOrShow: false,
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ]
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    var serno = '';
    var op = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      op = data.param.op;
      _this.isShowBtn = true;
    } else {
      data = _this.$route.meta.params;
      serno = data.serno;
      op = data.op;
    }
    // 进入初始化
    if (op == 'VIEW') {
      this.isDisabled = true;
      this.isButShow = false;
    } else if (op == 'UPDATE') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/sfresultinfo/showdetial',
      data: { serno: serno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },

  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 借款人是否有配偶做控制 :“借款人是否有配偶”字段选择否，则需要隐藏“配偶近两年无逾期经营性贷款”、“配偶近2年房贷、消费贷逾期不超过5次”、“配偶无风险分类后三类贷款”三个字段，默认该三个字段值为是
    isCusSpouseOnChange (isCusSpouse) {
      let _this = this;
      if (isCusSpouse == '1') {
        _this.isHidOrShow = false;
      } else if (isCusSpouse == '0') {
        _this.isHidOrShow = true;
        _this.formdata.isSpouseOperLoan = '1';
        _this.formdata.isSpouseOverdueTimes = '1';
        _this.formdata.isSpouseThreeLoan = '1';
      }
    },
    onChange () {
      var _this = this;
      let isMobileBankInfo = _this.formdata.isMobileBankInfo;
      if (isMobileBankInfo == '1') {
        _this.MobileView = false;
        _this.MobileUpdate = true;
      } else if (isMobileBankInfo == '0') {
        _this.MobileView = true;
        _this.MobileUpdate = false;
      }
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },

    // 手机银行录入的房产或企业信息查看
    viewEntlQyInfoBySerno () {
      let isMobileBankInfo = this.formdata.isMobileBankInfo;
      let json = {};
      json['serno'] = this.formdata.serno;
      json['model_group_no'] = 'CMG000722';
      if (isMobileBankInfo == '1') { // 1：查看
        json['op'] = 'VIEW';
      } else {
        json['op'] = 'UPDATE';
      }
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        json,
        // 列表刷新
        () => {
          this.$refs.refTable.remoteData();
        },
        true,
        true
      );
    },
    // 取消
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 提交
    submitFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let userInfo = this.$xutils.getLoginUserInfo();
      model.managerId = userInfo.loginCode;
      model.managerBrId = userInfo.orgCode;
      // 向后台发送保存请求
      this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/sfresultinfo/submitSfResultInfo',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000' && model.isAdmit == '1') {
              _this.$xutils.showMsgBox('提示', '提交成功!', 350, 150);
              _this.afterSaveCommit();
            } else if (rtnData.rtnCode == '0000' && model.isAdmit == '0') {
              _this.$xutils.showMsgBox('提示', '提交成功!', 350, 150);
            } else if (rtnData.rtnCode == '20026' && model.isAdmit == '1') {
              _this.$confirm('该客户业务存在异常情况，请确认是否予以业务准入?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: function (action) {
                  if (action === 'confirm') {
                    _this.afterSaveCommit();
                  }
                }
              });
            } else if (rtnData.rtnCode == '20026' && model.isAdmit == '0') {
              _this.$xutils.showMsgBox('提示', '提交成功!', 350, 150);
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 保存后流程提交
    afterSaveCommit: function () {
      let _this = this;
      const loginUser = _this.$xutils.getLoginUserInfo();
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'YX015';
      startdto.bizId = _this.formdata.serno; // 流水号
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;
      startdto.param = {orgType: loginUser.org.orgType, approveStatus: _this.formdata.approveStatus};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 流程回调
    onBack () {
      if (this.isShowBtn) {
        this.$dialog.close(this.dialogId);
      } else {
        yufp.router.removeTab(this.$route.path);
      }
    },
    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let userInfo = this.$xutils.getLoginUserInfo();
      model.managerId = userInfo.loginCode;
      model.managerBrId = userInfo.orgCode;
      model.isSaveOrsubmit = 'save';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/sfresultinfo/update',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
          } else {
            _this.$message.success('保存失败');
          }
        }
      });
    }
  }
};
</script>
