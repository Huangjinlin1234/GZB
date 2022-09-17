
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 额度审批-审批意见二
  -->
  <div>
    <yu-panel panel-type="simple" title="审批意见">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="审批结论 " placeholder="审批结论" :rules="required" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额"  v-model="formdata.approveAmt" v-if="approveAmtShow" :rules="approveAmtRules" name="approveAmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="退回原因" placeholder="退回原因"  v-model="formdata.returnReason" :rules="required" v-if="returnReasonShow"  name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
          <yu-xform-item label="拒绝原因" placeholder="拒绝原因"  v-model="formdata.refuseReason" :rules="required" v-if="refuseReasonShow" name="refuseReason" ctype="select" data-code="STD_CARD_ADJUSTMENT_REFUSE_REASON"></yu-xform-item>
          <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="stepOneInfoFn">调额审批一岗审批意见详情</yu-button>
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
          <yu-button icon="yx-undo2" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-panel>
    <yu-xdialog title="请再次输入审批金额" :visible.sync="againInputAmtDialogShow" width="40%">
      <yu-xform ref="againInputAmtForm" label-width="150px" v-model="againInputAmtFormData" :disabled="false">
        <yu-xform-group>
          <yu-xform-item colspan="24" label="审批金额" placeholder="再次输入审批金额" :rules="againApproveAmtRules" name="approveAmt" ctype="num"></yu-xform-item>
         </yu-xform-group>
         <div class="yu-grpButton">
            <yu-button v-show="submitBtnShow" type="primary" @click="submitAgainFn">确定</yu-button>
            <yu-button icon="yx-undo2" @click="cancelAgainFn">返回</yu-button>
          </div>
      </yu-xform>
    </yu-xdialog>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogShow" width="80%">
      <yu-xform ref="stepOneRefForm" label-width="150px" v-model="stepOneFormData" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="审批结论 " placeholder="审批结论"  name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额" name="approveAmt" ctype="num"></yu-xform-item>
          <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" ctype="textarea"></yu-xform-item>
         </yu-xform-group>
      </yu-xform>
    </yu-xdialog>
    <yufp-nwf-submit ref="flow" :pagedata="judgeStepTwoParams" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// STD_APPROVE_CONCLUSION 审批结论
// STD_CARD_RETURN_REASON 退回原因
// STD_CARD_ADJUSTMENT_REFUSE_REASON 拒绝原因
import {lookup, clone} from '@/utils';
lookup.reg('STD_APPROVE_CONCLUSION,STD_CARD_RETURN_REASON,STD_CARD_ADJUSTMENT_REFUSE_REASON');
export default {
  name: 'JudgeStepTwo',
  props: {
    judgeStepTwoParams: Object
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
    let checkAgainApproveAmt = function (rule, value, callback) {
      debugger;
      if (value) {
        if (Number(value) !== _this.formdata.approveAmt) {
          callback(new Error('输入审批金额不一致'));
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
      againApproveAmtRules: [
        {required: true, message: '不能为空'},
        { validator: checkAgainApproveAmt }
      ],
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      approveAmtShow: true,
      returnReasonShow: false,
      refuseReasonShow: false,
      saveBtnShow: true,
      submitBtnShow: true,
      stepOneFormData: {},
      dialogTitle: '调额申请审批一岗意见详情',
      dialogShow: false,
      againInputAmtFormData: {},
      againInputAmtDialogShow: false
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    newCreditCardLmt: function () {
      // 申请新的额度
      return this.judgeStepTwoParams.flowParam.newCreditCardLmt;
    },
    queryData: function () {
      // 00 代表额度申请审批一岗,01 代表额度申请审批二岗
      let data = {serno: this.judgeStepTwoParams.instanceInfo.bizId, approvePostFlag: '01'};
      return data;
    },
    approveConclusionOptions: function () {
      let options = this.judgeStepTwoParams.optypeOptions, newOptions = [];
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
    var pageType = this.judgeStepTwoParams.instanceInfo.pageType;
    if (pageType == 'HIS' || pageType == 'DONE') {
      this.submitBtnShow = false;
      this.saveBtnShow = false;
      this.formDisabled = true;
    }
    let _this = this;
    clone(_this.queryData, _this.formdata);// formdata克隆赋值
    const queryParams = {
      condition: JSON.stringify(_this.queryData)
    };
    // 第一步获取本级（额度审批二岗）保存数据回显
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: queryParams
    }).then(({code, message, data}) => {
      if (code == '0') {
        if (data && data.length === 1) { // 本级（额度审批二岗）存在数据回显
          // formdata 赋值
          this.viewType = 'DETAIL';
          clone(data[0], _this.formdata);
        } else { // 本级不存在数据，查询上一级（额度审批一岗）数据回显
          // formdata 初始化
          this.viewType = 'ADD';
          // 'O-12'表示审批通过
          clone({approveConclusion: 'O-12'}, _this.formdata);// formdata克隆初始化值
          // 查询上一级（额度审批一岗）数据
          this.$request({
            url: _this.dataUrl,
            method: 'POST',
            // judgeStepTwoParams: '00' 额度审批一岗标识
            data: {condition: JSON.stringify({serno: _this.queryData.serno, approvePostFlag: '00'})}
          }).then(({code, message, data}) => {
            if (code == '0') {
              let initData = {
                approveAmt: data[0].approveAmt
              };
              clone(initData, _this.formdata);
            } else {
              this.$message({message: message || '操作失败', type: 'error'});
            }
          });
        }
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  },
  methods: {
    /**
     * 调额审批一岗审批意见详情
     */
    stepOneInfoFn: function () {
      let _this = this;
      // 00 代表额度申请审批一岗
      let reqData = {serno: this.judgeStepTwoParams.instanceInfo.bizId, certCode: this.judgeStepTwoParams.flowParam.certCode, approvePostFlag: '00'};
      let queryParams = {
        condition: JSON.stringify(reqData)
      };
      _this.$request({
        url: _this.dataUrl,
        method: 'POST',
        data: queryParams
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.dialogShow = true;
          this.$nextTick(() => {
            clone(data[0], _this.stepOneFormData);
          });
        } else {
          _this.$message({message: message || '操作失败', type: 'error'});
        }
      });
    },

    /**
     * 取消
     */
    cancelFn: function () {
      this.$router.replace({
        name: this.judgeStepTwoParams.instanceInfo.returnBackFuncId
      });
    },
    cancelAgainFn: function () {
      this.againInputAmtDialogShow = false;
      this.$refs.againInputAmtForm.resetFields();
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      this.addSaveFn('SAVE');
    },
    submitFn: function () {
      let _this = this;
      let validate = false;

      // 同意才校验必输项
      if (this.formdata.approveConclusion == 'O-12') {
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          return;
        }
      }
      // 同意弹窗再次输入审批金额
      if (this.formdata.approveConclusion === 'O-12') {
        this.againInputAmtDialogShow = true;
      } else {
        this.addSaveFn('SUBMIT');
      }
    },
    submitAgainFn: function () {
      let _this = this;
      let againValidate = false;
      _this.$refs.againInputAmtForm.validate(function (valid) {
        againValidate = valid;
      });
      if (!againValidate) {
        return;
      }
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
      // 同意才校验金额
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
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.formDisabled = !editable;
    },

    /**
     * 流程执行函数
     */
    processExuFn: function () {
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
        instanceId: this.judgeStepTwoParams.instanceInfo.instanceId,
        nodeId: this.judgeStepTwoParams.instanceInfo.nodeId,
        userId: this.userCode,
        commentId: '',
        commentSign: this.formdata.approveConclusion,
        userComment: reason,
        ext: this.formdata.judgRemark,
        optType: '',
        optReasTyp: ''
      };
      let paramWF = {};
      let flowParam = this.judgeStepTwoParams.flowParam;
      for (let key in flowParam) {
        // 流程中业务参数更新
        paramWF[key] = flowParam[key];
      }
      let param = {
        opType: commentInfo.commentSign, // 审批结论
        param: paramWF, // 业务参数
        comment: commentInfo // 提交意见参数
      };
      // 调用公共组件的提交方法
      this.$refs.flow.submitFn(param);
    },
    // 流程审批执行后的回调方法
    afterSubmit: function (data) {
      this.$router.replace({
        name: this.judgeStepTwoParams.instanceInfo.returnBackFuncId
      });
    }
  }
};
</script>
