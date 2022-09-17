
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 额度审批-审批意见一
  -->
  <div>
    <yu-panel panel-type="simple" title="审批意见">
      <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="是否上调权限" placeholder="是否上调权限"   :rules="required"  name="changePower" ctype="select" data-code="STD_ZB_YES_NO" :hidden="nodeflag"></yu-xform-item>
          <yu-xform-item label="审批结论 " placeholder="审批结论"  :rules="required" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额" v-model="formdata.approveAmt" v-if="approveAmtShow" :rules="approveAmtRules" name="approveAmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="退回原因" placeholder="退回原因" v-model="formdata.returnReason" :rules="required" v-if="returnReasonShow" name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
          <yu-xform-item label="拒绝原因" placeholder="拒绝原因" v-model="formdata.refuseReason" :rules="required" v-if="refuseReasonShow" name="refuseReason" ctype="select" data-code="STD_CARD_ADJUSTMENT_REFUSE_REASON"></yu-xform-item>
          <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
          <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-panel>
    <yufp-nwf-submit ref="flow" :pagedata="judgeStepOneParams" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// STD_APPROVE_CONCLUSION 审批结论
// STD_ZB_YES_NO 是否发送短信
// STD_CARD_RETURN_REASON 退回原因
// STD_CARD_ADJUSTMENT_REFUSE_REASON 拒绝原因
import {lookup, clone} from '@/utils';
lookup.reg('STD_APPROVE_CONCLUSION,STD_ZB_YES_NO,STD_CARD_RETURN_REASON,STD_CARD_ADJUSTMENT_REFUSE_REASON');
export default {
  name: 'JudgeStepOne',
  props: {
    judgeStepOneParams: Object
  },
  components: {},
  data: function () {
    let _this = this;
    let checkApproveAmt = function (rule, value, callback) {
      if (value) {
        if (Number(value) > _this.newCreditCardLmt) {
          callback(new Error('审批金额不能高于申请额度' + _this.newCreditCardLmt));
        } else {
          callback();
        }
      } else {
        callback(new Error('不能为空'));
      }
    };
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentjudginifo/querymodel',
      updateUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentjudginifo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentjudginifo/save',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentjudginifo/batchdelete/',
      formdata: {},
      required: [
        {required: true, message: '不能为空'}
      ],
      approveAmtRules: [
        {required: true, message: '不能为空'},
        { validator: checkApproveAmt }
      ],
      formDisabled: false,
      approveAmtShow: true,
      returnReasonShow: false,
      refuseReasonShow: false,
      viewType: '',
      saveBtnShow: true,
      submitBtnShow: true,
      nodeflag: false
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    newCreditCardLmt: function () {
      // 申请新的额度
      return this.judgeStepOneParams.flowParam.newCreditCardLmt ? this.judgeStepOneParams.flowParam.newCreditCardLmt : 0;
    },
    queryData: function () {
      // 00 代表额度申请审批一岗
      let data = {serno: this.judgeStepOneParams.instanceInfo.bizId, approvePostFlag: '00'};
      return data;
    },
    approveConclusionOptions: function () {
      let options = this.judgeStepOneParams.optypeOptions, newOptions = [];
      for (let i = 0; i < options.length; i++) {
        let obj = {
          key: options[i].value,
          value: options[i].label
        };
        newOptions.push(obj);
      }
      return newOptions;
    }
  },
  watch: {
    formdata: {
      deep: true,
      handler (oldVal, newVal) {
        // O-12 表示审批结果为同意
        if (newVal.approveConclusion === 'O-12') {
          this.approveAmtShow = true;
          this.returnReasonShow = false;
          this.refuseReasonShow = false;
        }
        // O-2 表示审批结果为退回
        if (newVal.approveConclusion === 'O-2' || newVal.approveConclusion === 'O-1') {
          this.approveAmtShow = false;
          this.returnReasonShow = true;
          this.refuseReasonShow = false;
        }
        // O-8 表示审批结果为拒绝
        if (newVal.approveConclusion === 'O-8') {
          this.approveAmtShow = false;
          this.returnReasonShow = false;
          this.refuseReasonShow = true;
        }
      }
    }
  },
  mounted () {
    var pageType = this.judgeStepOneParams.instanceInfo.pageType;
    if (pageType == 'HIS' || pageType == 'DONE') {
      this.submitBtnShow = false;
      this.saveBtnShow = false;
      this.formDisabled = true;
    }
    this.formdata.changePower = '0';
    let _this = this;
    if (this.judgeStepOneParams.instanceInfo.nodeId == '238_4' || this.judgeStepOneParams.instanceInfo.nodeId == '364_4') {
      this.nodeflag = true;
    }
    clone(_this.queryData, _this.formdata);// formdata克隆赋值
    const queryParams = {
      condition: JSON.stringify(_this.queryData)
    };
    // 第一步获取本级（额度审批一岗）保存数据回显
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: queryParams
    }).then(({code, message, data}) => {
      if (code == '0') {
        if (data && data.length === 1) { // 本级（额度审批一岗）存在数据回显
          // formdata 赋值
          this.viewType = 'EDIT';
          clone(data[0], _this.formdata);
        } else { // 本级不存在数据，查询上一级（额度申请发起）数据回显
          // formdata 初始化
          this.viewType = 'ADD';
          // 'O-12'表示审批通过，'1'表示发送短信
          clone({approveConclusion: 'O-12', isSendMsg: '1', approveAmt: _this.newCreditCardLmt}, _this.formdata);// formdata克隆初始化值
        }
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      this.$router.replace({
        name: this.judgeStepOneParams.instanceInfo.returnBackFuncId
      });
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      this.addSaveFn('SAVE');
    },
    submitFn: function () {
      this.addSaveFn('SUBMIT');
    },
    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.addUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'info'});
          this.viewType = 'EDIT';
          if (actionType === 'SUBMIT') {
            // 发起流程
            this.processExuFn();
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      if (this.formdata.approveConclusion == 'O-12') {
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });

        if (!validate) {
          return;
        }
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.updateUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据更新成功！', type: 'info'});
          if (actionType === 'SUBMIT') {
            // 发起流程
            this.processExuFn();
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error'});
        }
      });
    },
    /**
     * 流程执行函数
     */
    processExuFn: function () {
      var systemFlag = '1';
      var changePower = this.formdata.changePower;
      var approveAmt = this.formdata.approveAmt;
      if (changePower == '1' && parseFloat(approveAmt) <= parseFloat(50000)) {
        systemFlag = '1';
      } else if (changePower == '0' && parseFloat(approveAmt) <= parseFloat(50000)) {
        systemFlag = '2';
      } else if (parseFloat(approveAmt) > parseFloat(50000) && changePower == '1') {
        systemFlag = '3';
      } else {
        systemFlag = '4';
      }
      var reason = '';
      if (this.formdata.approveConclusion == 'O-1') {
        var returnReason = this.formdata.returnReason;
        const datacode1 = this.$lookup.find('STD_CARD_RETURN_REASON');
        var i = 0;
        for (i = 0; i < datacode1.length; i++) {
          if (datacode1[i].key == returnReason) {
            reason = '[打回] 原因:' + datacode1[i].value;
          }
        }
      } else if (this.formdata.approveConclusion == 'O-8') {
        const datacode2 = this.$lookup.find('STD_CARD_ADJUSTMENT_REFUSE_REASON');
        var refuseReason = this.formdata.refuseReason;
        var i = 0;
        for (i = 0; i < datacode2.length; i++) {
          if (datacode2[i].key == refuseReason) {
            reason = '[拒绝] 原因:' + datacode2[i].value;
          }
        }
      }
      let commentInfo = {
        instanceId: this.judgeStepOneParams.instanceInfo.instanceId,
        nodeId: this.judgeStepOneParams.instanceInfo.nodeId,
        userId: this.userCode,
        commentId: '',
        commentSign: this.formdata.approveConclusion,
        userComment: reason,
        ext: this.formdata.judgRemark,
        optType: '',
        optReasTyp: ''
      };
      let paramWF = {};
      let flowParam = this.judgeStepOneParams.flowParam;
      for (let key in flowParam) {
        // 流程中业务参数更新
        paramWF[key] = flowParam[key];
      }
      let param = {
        opType: commentInfo.commentSign, // 审批结论
        param: {systemFlag: systemFlag}, // 业务参数, // 业务参数
        comment: commentInfo, // 提交意见参数
        systemFlag: systemFlag
      };
      // 调用公共组件的提交方法
      this.$refs.flow.submitFn(param);
    },
    // 流程审批执行后的回调方法
    afterSubmit: function (data) {
      this.$router.replace({
        name: this.judgeStepOneParams.instanceInfo.returnBackFuncId
      });
    }
  }
};
</script>
