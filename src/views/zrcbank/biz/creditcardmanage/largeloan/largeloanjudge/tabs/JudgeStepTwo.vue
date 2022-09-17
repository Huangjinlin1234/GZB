
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 大额分期审批-二岗审批意见
  -->
  <div>
    <yu-panel panel-type="simple" title="审批意见">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="审批结论 " placeholder="审批结论"  :rules="required" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额" :rules="approveAmtRules" :hidden="amtHideFlag" name="approveAmt"  @change="changShisuan" ctype="num"></yu-xform-item>
          <yu-xform-item label="分期期数" placeholder="分期期数" name="loanTerm" ctype="select" data-code="STD_LARGE_LOAN_TERM" rules="required"  @change="changShisuan" :hidden="amtHideFlag" ></yu-xform-item>
          <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多六位小数)" :hidden="amtHideFlag" name="loanFeeRate" ctype="input"  @change="changShisuan" :rules="loanFeeRateRules"></yu-xform-item>
          <yu-xform-item label="分期折算近似年化利率"  name="yearInterestRate" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item colspan="24" label="审核意见" placeholder="审核意见" name="judgRemark" :rules="required" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="退回原因" placeholder="退回原因" v-model="formdata.returnReason" :rules="required" v-if="returnReasonShow"  name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
          <yu-xform-item label="拒绝原因" placeholder="拒绝原因" v-model="formdata.refuseReason" :rules="required" v-if="refuseReasonShow" name="refuseReason" ctype="select" data-code="STD_CARD_LARGELOAN_REFUSE_REASON"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="stepOneInfoFn">大额分期审批一岗意见详情</yu-button>
          <yu-button v-show="saveBtnShow"  type="primary" @click="shisuan">试算</yu-button>
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
          <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
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
      <yu-xform ref="refForm" label-width="150px" v-model="stepOneFormData" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="审批结论 " placeholder="审批结论" name="approveConclusion" ctype="select" data-code="OP_TYPE"></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额" name="approveAmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="分期期数" placeholder="分期期数（非0整数）" name="loanTerm" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多四位小数)" name="loanFeeRate" ctype="input" ></yu-xform-item>
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
// STD_ZB_YES_NO 是否发送短信
// STD_CARD_RETURN_REASON 退回原因
// STD_CARD_ADJUSTMENT_REFUSE_REASON 拒绝原因
import {lookup, clone} from '@/utils';
lookup.reg('STD_APPROVE_CONCLUSION,STD_ZB_YES_NO,STD_CARD_RETURN_REASON,STD_CARD_ADJUSTMENT_REFUSE_REASON,STD_LARGE_LOAN_TERM', 'OP_TYPE', 'STD_CARD_LARGELOAN_REFUSE_REASON');
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
      largeLoanApplyDataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/querymodel', // 获取大额分期申请url
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/querymodel',
      updateUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/save',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/batchdelete/',
      shisuanUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/shisuanstep',
      formdata: {
        isIncrease: '否'
      },
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
      loanFeeRateRules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^\+?[0]\.\d{1,6}$/,
          message: '请输入小于1，至多六位小数',
          trigger: 'blur'
        }
      ],
      formDisabled: false,
      returnReasonShow: false,
      refuseReasonShow: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      submitBtnShow: true,
      stepOneFormData: {},
      dialogTitle: '大额分期审批一岗意见详情',
      dialogShow: false,
      againInputAmtFormData: {},
      againInputAmtDialogShow: false,
      amtHideFlag: false,
      shisuanflag: false
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    newCreditCardLmt: function () {
      // 申请的大额分期金额
      return this.judgeStepTwoParams.flowParam.loanAmount ? this.judgeStepTwoParams.flowParam.loanAmount : 0;
    },
    queryData: function () {
      // 01 代表额度申请审批二岗
      let data = {serno: this.judgeStepTwoParams.instanceInfo.bizId, certCode: this.judgeStepTwoParams.flowParam.certCode, cardNo: this.judgeStepTwoParams.flowParam.cardNo, approvePostFlag: '01'};
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
          this.returnReasonShow = false;
          this.refuseReasonShow = false;
          this.amtHideFlag = false;
        }
        // O-2 表示审批结果为退回
        if (newVal.approveConclusion === 'O-2' || newVal.approveConclusion === 'O-1') {
          this.returnReasonShow = true;
          this.refuseReasonShow = false;
          this.amtHideFlag = true;
        }
        // O-8 表示审批结果为拒绝
        if (newVal.approveConclusion === 'O-8') {
          this.returnReasonShow = false;
          this.refuseReasonShow = true;
        }
      }
    }
  },
  mounted () {
    if (this.judgeStepTwoParams.instanceInfo.pageType != 'TODO') {
      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
    }
    let _this = this;
    clone(_this.queryData, _this.formdata);// formdata克隆赋值
    const queryParams = {
      condition: JSON.stringify(_this.queryData)
    };
    // 查询获取大额审批二岗数据
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: queryParams
    }).then(({code, message, data}) => {
      if (code == '0') {
        if (data && data.length === 1) { // 大额审批二岗数据存在
          // formdata 赋值
          this.viewType = 'EDIT';
          clone(data[0], _this.formdata);
        } else { // 大额审批二岗数据不存在
          // formdata 初始化
          this.viewType = 'ADD';
          // 'O-12'表示审批通过
          clone({approveConclusion: 'O-12'}, _this.formdata);// formdata克隆初始化值
          // 获取大额分期审批一岗信息
          let reqData = {
            condition: JSON.stringify({serno: this.judgeStepTwoParams.instanceInfo.bizId, certCode: this.judgeStepTwoParams.flowParam.certCode, cardNo: this.judgeStepTwoParams.flowParam.cardNo, approvePostFlag: '00'})
          };
          this.$request({
            url: _this.dataUrl,
            method: 'POST',
            data: reqData
          }).then(({code, message, data}) => {
            if (code == '0') {
              let initData = {
                approveAmt: data[0].approveAmt,
                loanTerm: data[0].loanTerm,
                loanFeeRate: data[0].loanFeeRate,
                yearInterestRate: data[0].yearInterestRate
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
    changShisuan: function () {
      // 参数改变，需重新试算
      this.shisuanflag = false;
    },
    /**
     * 调额审批一岗审批意见详情
     */
    stepOneInfoFn: function () {
      let _this = this;
      // 00 代表额度申请审批一岗
      let reqData = {serno: this.judgeStepTwoParams.instanceInfo.bizId, certCode: this.judgeStepTwoParams.flowParam.certCode, cardNo: this.judgeStepTwoParams.flowParam.cardNo, approvePostFlag: '00'};
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

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate && this.formdata.approveConclusion == 'O-12') {
        return;
      }
      if (this.shisuanflag == false && this.formdata.approveConclusion == 'O-12') {
        this.$message({ message: '请先进行试算！', type: 'warning'});
        return;
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
      this.againInputAmtDialogShow = false;
    },
    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
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
        url: this.addUrl,
        data: this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'info'});
          this.viewType = 'EDIT';
          if (actionType === 'SUBMIT') {
            //  发起流程
            this.processExuFn();
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },
    shisuan: function () {
      let _this = this;
      // 向后台发送进行试算
      this.$request({
        method: 'POST',
        url: _this.shisuanUrl,
        data: {
          loanAmount: _this.formdata.approveAmt,
          loanTerm: _this.formdata.loanTerm,
          serno: _this.judgeStepTwoParams.instanceInfo.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '试算成功！', type: 'success'});
          _this.formdata.yearInterestRate = data.anrate;
          _this.shisuanflag = true;
        } else {
          _this.$message({ message: message, type: 'error'});
        }
      });
    },
    /**
     * 流程执行函数
     */
    processExuFn: function () {
      let commentInfo = {
        instanceId: this.judgeStepTwoParams.instanceInfo.instanceId,
        nodeId: this.judgeStepTwoParams.instanceInfo.nodeId,
        userId: this.userCode,
        commentId: '',
        commentSign: this.formdata.approveConclusion,
        userComment: '',
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
