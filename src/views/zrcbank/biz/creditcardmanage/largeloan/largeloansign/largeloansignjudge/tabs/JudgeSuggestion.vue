
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 合同审批-合同审核
  -->
  <div>
    <yu-panel panel-type="simple" title="合同审核">
      <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="审批结论 " placeholder="审批结论" :rules="required" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
          <yu-xform-item colspan="24" label="放款审批备注" :rules="required" placeholder="放款审批备注" name="judgRemark" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="退回原因" :rules="required" v-model="formdata.returnReason" v-if="returnReasonShow" placeholder="退回原因"  name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
          <yu-xform-item label="拒绝原因" :rules="required" v-model="formdata.refuseReason" v-if="refuseReasonShow" placeholder="拒绝原因" name="refuseReason" ctype="select" data-code="STD_CARD_ADJUSTMENT_REFUSE_REASON"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
          <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-panel>
    <yufp-nwf-submit ref="flow" :pagedata="judgeSuggestionParams" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// STD_CARD_RETURN_REASON 退回原因
// STD_CARD_ADJUSTMENT_REFUSE_REASON 拒绝原因
import {lookup, clone} from '@/utils';
lookup.reg('STD_CARD_RETURN_REASON,STD_CARD_ADJUSTMENT_REFUSE_REASON');
export default {
  name: 'JudgeSuggestion',
  props: {
    judgeSuggestionParams: Object
  },
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditlargeloanjudginifo/queryModel', // 获取大额分期放款审批url
      updateUrl: this.$backend.cmisBiz + '/api/creditlargeloanjudginifo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditlargeloanjudginifo/save',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditlargeloanjudginifo/batchdelete/',
      formdata: {},
      required: [
        {required: true, message: '不能为空'}
      ],
      formDisabled: false,
      viewType: '',
      returnReasonShow: false,
      refuseReasonShow: false,
      saveBtnShow: true,
      submitBtnShow: true
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    queryData: function () {
      let data = {serno: this.judgeSuggestionParams.flowParam.serno};
      return data;
    },
    approveConclusionOptions: function () {
      let options = this.judgeSuggestionParams.optypeOptions, newOptions = [];
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
        }
        // O-2 表示审批结果为退回
        if (newVal.approveConclusion === 'O-2') {
          this.returnReasonShow = true;
          this.refuseReasonShow = false;
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
    let _this = this;
    if (this.judgeSuggestionParams.instanceInfo.pageType != 'TODO') {
      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
    }

    clone(_this.queryData, _this.formdata);// formdata克隆赋值
    const queryParams = {
      condition: JSON.stringify(_this.queryData)
    };
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: queryParams
    }).then(({code, message, data}) => {
      if (code == '0') {
        if (data && data.length === 1) {
          // formdata 赋值
          this.viewType = 'EDIT';
          clone(data[0], _this.formdata);
        } else {
          // formdata 初始化
          this.viewType = 'ADD';
          // 'O-12'表示审批通过
          clone({approveConclusion: 'O-12'}, _this.formdata);// formdata克隆初始化值
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
        name: this.judgeSuggestionParams.instanceInfo.returnBackFuncId
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
          if (actionType === 'SUBMIT') {
            // 触发流程
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

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
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
            // 触发流程
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
      let commentInfo = {
        instanceId: this.judgeSuggestionParams.instanceInfo.instanceId,
        nodeId: this.judgeSuggestionParams.instanceInfo.nodeId,
        userId: this.userCode,
        commentId: '',
        commentSign: this.formdata.approveConclusion,
        userComment: '',
        ext: '无',
        optType: '',
        optReasTyp: ''
      };
      let paramWF = {};
      let flowParam = this.judgeSuggestionParams.flowParam;
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
        name: this.judgeSuggestionParams.instanceInfo.returnBackFuncId
      });
    }
  }
};
</script>
