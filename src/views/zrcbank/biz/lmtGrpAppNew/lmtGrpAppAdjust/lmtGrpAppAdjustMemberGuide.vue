<template>
  <!--
    @created by 屈文
    @description 成员客户授信申报新增
  -->
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata" disabled>
      <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata">
          <yu-xform-group>
            <yu-xform-item label="业务流水号" ctype="input" name="grpSerno" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="lmtType" :rules="baseFormRules[0]" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" :rules="baseFormRules[0]" data-code="EDUCATION_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" :rules="baseFormRules[0]" data-code="IDENT_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="授信期限" unit="月" ctype="input" name="lmtTerm" :rules="baseFormRules[0]" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refTable" row-number :data="lmtMemberInfo" selection-type="radio" request-type="POST">
        <yu-xtable-column label="单一客户申请流水号" prop="singleSerno" hide-column></yu-xtable-column>
            <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="调剂前敞口额度（元）" prop="origiOpenLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="调剂后敞口额度（元）" prop="openLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="调剂前低风险额度（元）" prop="origiLowRiskLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="调剂后低风险额度（元）" prop="lowRiskLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="授信额度是否可调剂">
          <template slot-scope="scope">
          <yu-xform-item ctype="select" data-code="STD_ZB_YES_NO" v-model="isAdjustFlag[scope.$index]" :disabled="!isInFlow(scope.row)" ></yu-xform-item>
          </template>
          </yu-xtable-column>
            <yu-xtable-column label="本次是否调剂" prop="isCurtAdjust" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
            <yu-xtable-column label="操作" width="120">
              <template slot-scope="scope">
                <a class="underline" @click="isChange(scope.row,scope.$index)">保存</a>
                <a class="underline" @click="editSub(scope.row,scope.$index)" >调剂</a>
                <a class="underline" @click="viewSub(scope.row)">查看</a>
              </template>
            </yu-xtable-column>

        </yu-xtable>
      </yu-panel>
      <yu-panel title="" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="lmtAdjustForm" label-width="100px" v-model="LmtAdjustFormData">
          <yu-xform-group :column="1">
            <yu-xform-item label="成员额度调剂说明" ctype="textarea" name="memLmtAdjustDesc" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="原授信批复信息" :hideFilter="false" :collapseHide="false" v-if="origiReply">
        <yu-xform ref="origiReplyForm" label-width="100px" v-model="origiReplyFormdata">
          <yu-xform-group>
            <yu-xform-group>
              <yu-xform-item label="原授信批复编号" ctype="input" name="origiLmtReplySerno" :rules="baseFormRules[0]" disabled></yu-xform-item>
              <yu-button type="primary" @click="viewFn">查看</yu-button>
            </yu-xform-group>
            <yu-xform-item label="原授信期限" ctype="input" name="origiLmtTerm" :rules="baseFormRules[0]" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="registerRefForm" label-width="100px" v-model="registerFormdata" :disabled="form3Disabled">
          <yu-xform-group>
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerId" disabled hidden rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrId"  disabled hidden rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <!--<yu-button type="primary" @click="commit">提交 </yu-button>-->
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('NATIONALITY,PUBLISH_STATUS,STD_SX_LMT_TYPE,EDUCATION_TYPE,IDENT_TYPE，STD_ZB_YES_NO,STD_ZB_CUS_TYP');
// import { sessionStore } from 'xy-utils';
export default {
  data: function () {
    return {
      expandCollapseName: ['base'],
      viewType: 'DETAIL',
      adjustHidden: 'true',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      isAdjustFlag: [],
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
      LmtAdjustFormData: {},
      registerFormdata: {},
      origiReplyFormdata: {},
      lmtMemberInfo: []
    };
  },

  mounted () {
    var _this = this;
    let grpSerno = _this.$route.meta.params.grpSerno;
    // let data = _this.$route.meta.params;
    // let grpSerno = data.grpSerno;
    // 客户成员列表信息
    _this.initMemberInfo(grpSerno);
    // 基本信息表单数据
    _this.initLmtBasicInfo(grpSerno);
  },

  methods: {
    // 成员客户列表信息
    initMemberInfo: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpmemrelbygrpsernoandmgr',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtMemberInfo = response.data;
          response.data.forEach(function (item, index) {
            _this.isAdjustFlag[index] = item.isAdjustFlag;
          });
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
          yufp.clone(response.data, _this.LmtAdjustFormData);
          yufp.clone(response.data, _this.origiReplyFormdata);
          yufp.clone(response.data, _this.registerFormdata);
        }
      });
    },

    /**
     *  提交按钮，保存到数据库中
     */
    commit: function (viewType, editable) {
      var _this = this;
      var grpSerno = _this.baseFormdata.grpSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/finishlmtgrpmemrelstatusbygrpsernoandmgr',
        data: grpSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('提交成功');
          } else {
            _this.$message('提交失败');
            return;
          }
        }
      });
    },

    /** d
     *  调剂
     */
    editSub: function (data, index) {
      var _this = this;
      // TODO   后台处理走一遍后放开一下逻辑
      if (_this.isAdjustFlag[index] == '0') {
        _this.$message('当前状态不允许填报!');
        return;
      }
      if (!_this.isInFlow(data)) {
        _this.$message('当前成员客户授信申报已进入流程审批，请不要重复填报!');
        return;
      }
      var op = 'EDIT';
      _this.jumpFactoryBySerno(data, op);
    },

    /**
     *  查看
     */
    viewSub: function (data) {
      var _this = this;
      var op = 'VIEW';
      _this.jumpFactoryBySerno(data, op);
    },

    jumpFactoryBySerno: function (data, op) {
      var ogrigiLmtSerno = '';
      var topOutsystemCode = '';
      var params = {
        serno: data.singleSerno
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: params,
        callback: function (code, message, response) {
          ogrigiLmtSerno = response.data.ogrigiLmtSerno;
          if (response.data.lmtType == '05') {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXFYSQZL;SXFYDBZL;XD_FZHYXCL;ZHSXPF';
          } else if (response.data.lmtType == '02') {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXBGJBZL;XD_FZHYXCL;ZHSXPF';
          } else {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF';
          }
        }
      });
      var _this = this;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: data.pkId,
        title: '成员客户授信申报',
        data: {
          model_group_no: 'CMG000702',
          pk_id: data.pkId,
          scene: '01',
          op: op,
          serno: data.singleSerno,
          period: '01',
          biz_serno: data.singleSerno,
          cusId: data.cusId,
          borrowerCusId: data.cusId,
          borrowerCusName: data.cusName,
          ogrigiLmtSerno: ogrigiLmtSerno,
          topOutsystemCode: topOutsystemCode
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
      var params = _this.formdata;

      var grpReplySerno = _this.origiReplyFormdata.origiLmtReplySerno;
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
    },

    // 本次是否调剂
    isChange: function (data, index) {
      var _this = this;
      if (!_this.isInFlow(data)) {
        _this.$message('当前成员客户授信申报已进入流程审批,请不要随意修改!');
        return;
      }
      data.isAdjustFlag = _this.isAdjustFlag[index];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/update',
        // /api/lmtgrpmemrel/finishlmtgrpmemrelstatusbygrpsernoandmgr
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

    // 校验当前授信申报是否已进入流程
    isInFlow (data) {
      let _this = this;
      let isInFlowFlg = true;
      if (data.singleSerno != '' && data.singleSerno != null) {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtgrpmemrel/isinflow',
          data: {'serno': data.singleSerno},
          callback: function (code, message, response) {
            if (response.code == '0') {
              if (response.data > 0) {
                isInFlowFlg = false;
              }
            }
          }
        });
      }
      return isInFlowFlg;
    }
  }
};
</script>
