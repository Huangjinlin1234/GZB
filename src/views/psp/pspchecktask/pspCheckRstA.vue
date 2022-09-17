<template>
  <div>
    <yu-xform ref="refForm" label-width="205px" :disabled="formType != 'edit' ? true : false" v-model="rstData" :rules="formRules" :form-change="triggerEditChangeEvent">
      <yu-panel title="检查结果及意见（管户客户经理）" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="1">
          <yu-xform-item name="pkId" label="主键" hidden></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="input" placeholder="任务编号" name="taskNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="总体评价" ctype="textarea" name="checkComment" id="checkComment" :rules="checkCommentRules"></yu-xform-item>
          <yu-xform-item label="后续授信建议" ctype="select" name="checkAdviceType" rules="required" data-code="STD_ZB_CHECK_ADVICE" @change="checkAdviceType"></yu-xform-item>
          <yu-xform-item label="说明理由" ctype="textarea" name="checkAdviceReason" id="checkAdviceReason" placeholder="说明理由，选择“压降”或“退出”时需提出计划"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_CHECK_ADVICE');
export default{
  mixins: [mixinForm],

  props: {
    formType: String
  },

  data: function () {
    return {
      checkCommentRules: [
        {required: true, message: '此选项必填', trigger: 'blur'},
        {min: 20, message: '总体评价应不少于20个字', trigger: 'blur'}
      ],
      updateUrl: this.$backend.cmisPsp + '/api/pspcheckrst/updateSelective',
      rstData: {},
      updateFlag: false, // 是否更新
      formRules: { checkAdviceReason: [{ required: true, message: '请输入说明理由'}]
      }
    };
  },

  // watch: {
  //   formData: function () {
  //     for (var item in this.formData) {
  //       this.rstData[item] = this.formData[item];
  //     }
  //   }
  // },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      const data = _this.$route.params;
      // if (_this.bizPageData) {
      //   _this.viewFlag = true;
      // } else {
      _this.viewFlag = data.opType === 'view';
      // }
      _this.autoFlag = data.pspTask.taskType == '2';
      const taskNo = data.pspTask == undefined ? data.taskNo : data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取贷后检查结果
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcheckrst/querySingle',
        method: 'post',
        data: params,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.rstData);
              console.log('_this.rstData', _this.rstData);
              _this.updateFlag = data.isSaved != 0;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    checkAdviceType (value) {
      if (value == '3' || value == '4') {
        this.setBillCardItemRequired('checkAdviceReason', true);
      } else {
        this.setBillCardItemRequired('checkAdviceReason', false);
      }
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      const _this = this;
      return this.$request({
        url: _this.updateUrl,
        method: 'post',
        data: _this.rstData
      });
    }

  }
};
</script>