<template>
  <!--
    @created by 屈文
    @description 集团客户授信申报新增
  -->
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata" :disabled="form1Disabled">
      <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" ctype="input" name="grpSerno" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" name="lmtType" :rules="baseFormRules[0]" data-code="STD_SX_LMT_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" :rules="baseFormRules[0]"  disabled="true"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" :rules="baseFormRules[0]"  disabled="true"></yu-xform-item>
          <yu-xform-item label="授信期限" unit="月" ctype="input" name="lmtTerm" :rules="baseFormRules[0]" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refTable" row-number :data="lmtMemberInfo">
          <yu-xtable-column label="单一客户流水号" prop="singleSerno" hidden-column></yu-xtable-column>
          <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="1">
          <yu-xform-item label="成员额度调剂说明" ctype="textarea" name="memLmtAdjustDesc" :rules="baseFormRules[0]" ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="原授信批复信息" :hideFilter="false" :collapseHide="false" v-if="origiReply">
        <yu-xform-group>
          <yu-xform-group>
            <yu-xform-item label="原授信批复编号" ctype="input" name="origiLmtReplySerno" :rules="baseFormRules[0]" disabled></yu-xform-item>
            <yu-button type="primary" @click="viewFn">查看</yu-button>
          </yu-xform-group>
          <yu-xform-item label="原授信期限" unit="月" ctype="input" name="origiLmtTerm" :rules="baseFormRules[0]" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="登记人" ctype="input" name="inputIdName" :rules="baseFormRules[0]" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" :rules="baseFormRules[0]"  disabled></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerIdName" :rules="baseFormRules[0]"  disabled></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" :rules="baseFormRules[0]"  disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" :rules="baseFormRules[1]" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="tempSave">暂存</yu-button>
      <yu-button type="primary" @click="commit">提交 </yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CUS_TYP,STD_SX_LMT_TYPE,EDUCATION_TYPE,IDENT_TYPE');
// import { sessionStore } from 'xy-utils';
export default {
  data: function () {
    return {
      origiReply: true,
      expandCollapseName: ['base'],
      viewType: 'DETAIL',
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
      lmtMemberInfo: []
    };
  },

  mounted () {
    var _this = this;
    let grpSerno = _this.$route.meta.params.data;
    // 客户成员列表信息
    _this.initMemberInfo(grpSerno);
    // 基本信息表单数据
    _this.initLmtBasicInfo(grpSerno);
  },

  methods: {
    // 客户成员列表信息
    initMemberInfo: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpmemrelbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtMemberInfo = response.data;
        }
      });
    },

    // 基本信息表单数据
    initLmtBasicInfo: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/querylmtgrpappbygrpserno',
        data: {grpSerno: grpSerno},
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.baseFormdata);
        }
      });
    },

    /**
     *  本次是否调剂
     */
    isCurtAdjustFn: function (data) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/update',
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

    /*
      暂存
     */
    tempSave: function () {
      var _this = this;
      var data = {};
      yufp.clone(_this.baseFormdata, data);
      // 保存数据(期限)
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('暂存成功');
          } else {
            _this.$message('暂存成功');
            return;
          }
        }
      });
    },

    /**
     *  提交按钮，保存到数据库中
     */
    commit: function () {
      var _this = this;
      if (_this.baseFormdata.lmtTerm == '') {
        _this.$message('授信期限为空!');
        return;
      }
      var grpSerno = _this.baseFormdata.grpSerno;
      var data = {};
      yufp.clone(_this.baseFormdata, data);
      data.memLmtAdjustDesc = _this.baseFormdata.memLmtAdjustDesc;
      // 保存数据(期限)
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('保存成功');
            _this.updateMenberStatus(grpSerno);
          } else {
            _this.$message('保存失败');
            return;
          }
        }
      });
    },

    // 初始化授信关联成员状态
    updateMenberStatus: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/initlmtgrpmemrelstatusbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.back();
          } else {
            _this.$message('提交失败');
            return;
          }
        }
      });
    },

    /**
     *  退回按钮
     */
    back: function () {
      yufp.router.removeTab(this.$route.path);
    },

    // 查看原批复编号内容
    viewFn () {
      var _this = this;
      var grpReplySerno = _this.baseFormdata.origiLmtReplySerno;
      if (grpReplySerno == null || grpReplySerno == '') {
        _this.$message('原批复编号为空！');
        return;
      }
      var params = _this.formdata;
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpfjt';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-JT.cpt&op=view&grpReplySerno=' + grpReplySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '授信批复（集团）',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
