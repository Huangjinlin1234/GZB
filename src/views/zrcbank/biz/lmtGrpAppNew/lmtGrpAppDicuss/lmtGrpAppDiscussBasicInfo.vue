<template>
  <!--
    @created by 屈文
    @description 集团客户授信基本信息
  -->
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata" disabled>
      <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata" :disabled="form1Disabled">
          <yu-xform-group>
            <yu-xform-item label="业务流水号" ctype="input" name="grpSerno" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="lmtType" :rules="baseFormRules[0]" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" :rules="baseFormRules[0]" data-code="EDUCATION_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" :rules="baseFormRules[0]" data-code="IDENT_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" :rules="baseFormRules[0]" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
            <yu-xform-column label="敞口额度合计（元）"  ctype="input"  :rules="baseFormRules[0]" name="openTotalLmtAmt" disabled></yu-xform-column>
            <yu-xform-column label="低风险额度合计（元）"  ctype="input"  :rules="baseFormRules[0]" name="lowRiskTotalLmtAmt" disabled></yu-xform-column>
            <yu-xform-item label="授信期限" unit="月" ctype="input" name="lmtTerm" :rules="baseFormRules[0]" disabled></yu-xform-item>
            <yu-xform-item label="原授信流水号" ctype="input" name="origiLmtSerno" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="registerRefForm" label-width="100px" v-model="registerFormdata" :disabled="form3Disabled">
          <yu-xform-group>
            <yu-xform-item label="登记人" ctype="input" name="inputIdName" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" :rules="baseFormRules[0]"  disabled="true"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" :rules="baseFormRules[1]" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="tempSave" :hidden="isShowBtn">暂存</yu-button>
      <yu-button type="primary" @click="save" :hidden="isShowBtn">保存</yu-button>
      <yu-button type="primary" @click="submit" :hidden="isShowBtn">提交</yu-button>
      <yu-button type="primary" @click="back" :hidden="isShowBtn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('NATIONALITY,PUBLISH_STATUS,STD_SX_LMT_TYPE,EDUCATION_TYPE,IDENT_TYPE,STD_ZB_CUR_TYP');
export default {
  data: function () {
    return {
      expandCollapseName: ['base'],
      viewType: 'DETAIL',
      form1Disabled: false,
      form3Disabled: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      baseFormdata: {},
      registerFormdata: {},
      isShowBtn: false
    };
  },

  mounted () {
    var _this = this;
    _this.getFactory().setButtonVisiable('tempSave', false);
    _this.getFactory().setButtonVisiable('save', false);
    _this.getFactory().setButtonVisiable('commit', false);
    _this.getFactory().setButtonVisiable('back', false);
    let data = {};
    var grpSerno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      grpSerno = data.bizId;
      _this.isShowBtn = true;
    } else {
      data = _this.$route.meta.params;
      grpSerno = data.grpSerno;
    }
    if (data.op == 'VIEW') {
      _this.form1Disabled = true;
      _this.isShowBtn = true;
      _this.form3Disabled = true;
    }
    // 初始化表单数据
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrpapp/querylmtgrpappbygrpserno',
      data: {grpSerno: grpSerno},
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.baseFormdata);
        yufp.clone(response.data, _this.registerFormdata);
        // 审查报告 批复报告 显示条件
        // let isShowReport = false;
        if (response.data.approveStatus == '993' ||
              response.data.approveStatus == '996' ||
              response.data.approveStatus == '997' ||
              response.data.approveStatus == '998') {
          // isShowReport = true;
          _this.isShowBtn = true;
        }
        _this.getFactory().triggerAction({
          isShowReport: response.data.approveStatus,
          lmtType: response.data.lmtType
        });
      }
    });
  },

  methods: {
    // 返回上一页面
    back: function () {
      yufp.router.removeTab(this.$route.path);
    },

    save () {
      var _this = this;
      var data = {};
      yufp.clone(_this.baseFormdata, data);
      yufp.clone(_this.registerFormdata, data);
      // 保存数据(期限)
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('保存成功');
          } else {
            _this.$message('保存失败');
            return;
          }
        }
      });
    },

    // 暂存
    tempSave () {
      let _this = this;
      var data = {};
      // yufp.clone(_this.registerFormdata, data);
      yufp.clone(_this.baseFormdata, data);
      yufp.clone(_this.registerFormdata, data);
      // 保存数据(期限)
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('暂存成功');
          } else {
            _this.$message('暂存失败');
            return;
          }
        }
      });
    },

    /**
     *  提交流程
     */
    submit: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      yufp.clone(_this.registerFormdata, model);
      var loginUserNow = _this.$xutils.getLoginUserInfo();
      var orgCodeNow = loginUserNow.orgCode;
      if (orgCodeNow.startsWith('80') || orgCodeNow.startsWith('81')) {
        // 校验成功不做处理
        let loginUser = _this.$xutils.getLoginUserInfo();
        var instuCde = loginUser.instu.code;
        var orgCode = loginUser.orgCode;
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'SX012'; // 需要判断不同的授信类型，然后biz_type不同传参
        if (orgCode.startsWith('80')) {
          startdto.bizType = 'SGC12';
        }
        if (orgCode.startsWith('81')) {
          startdto.bizType = 'DHC12';
        }
        startdto.bizId = model.grpSerno;
        startdto.bizUserName = model.grpCusName;
        startdto.bizUserId = model.grpCusId;
        startdto.param = {
          approveStatus: model.approveStatus,
          origiLmtSerno: model.origiLmtSerno,
          topOutsystemCode: 'JTSXJBZL',
          imageParams: {
            docid: startdto.bizId,
            contid: startdto.bizId,
            businessid: model.origiLmtSerno
          }
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
      } else {
        yufp.service.request({
          async: true,
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtgrpapp/checkIsApproveSuccess',
          data: model.grpSerno,
          callback: function (code, message, response) {
            if (code == '0') {
            // 校验成功不做处理
              let loginUser = _this.$xutils.getLoginUserInfo();
              var instuCde = loginUser.instu.code;
              var orgCode = loginUser.orgCode;
              var startdto = {};
              startdto.systemId = 'cmis';
              startdto.orgId = loginUser.org.id;
              startdto.userId = loginUser.loginCode;
              startdto.bizType = 'SX012'; // 需要判断不同的授信类型，然后biz_type不同传参
              if (orgCode.startsWith('80')) {
                startdto.bizType = 'SGC12';
              }
              if (orgCode.startsWith('81')) {
                startdto.bizType = 'DHC12';
              }
              startdto.bizId = model.grpSerno;
              startdto.bizUserName = model.grpCusName;
              startdto.bizUserId = model.grpCusId;
              startdto.param = {approveStatus: model.approveStatus, origiLmtSerno: model.origiLmtSerno};
              _this.$refs.yufpNwfInit.wfInit(startdto);
            } else {
            // 校验失败 提示报错
              _this.$message(response.message);
              return;
            }
          }
        });
      }
    }
  }
};
</script>
