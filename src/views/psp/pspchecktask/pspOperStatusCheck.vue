<template>
  <div>
    <yu-xform ref="refForm" label-width="205px" :disabled="formType != 'edit' ? true : false" v-model="formdata" :form-change="triggerEditChangeEvent">
      <yu-panel title="经营状况检查" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="2">
          <yu-xform-item label="任务编号" ctype="input" placeholder="任务编号" name="taskNo" disabled hidden></yu-xform-item>
          <yu-xform-item   colspan="24" label="是否对经营场所现场检查并拍照确认" ctype="radio" name="isPhotograph" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" colspan="24" ctype="textarea" name="notPhotographRemark" id="notPhotographRemark" placeholder="生产型企业至少要对厂牌、主要生产车间和仓库拍照，贸易型公司至少要对门牌、经营场所拍照。房地产开发贷和项目贷款需要对现场拍照。如因特殊原因无法拍照的，请说明合理理由。" :rules="{required: isPhotograph, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="目前借款人经营是否正常" colspan="24" ctype="radio"  name="isOperNormal" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" colspan="24" ctype="textarea" name="notOperNormalRemark" id="notOperNormalRemark" placeholder="如选择否，客户经理说明" :rules="{required: isOperNormal, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="是否有其他重要风险事项" colspan="24" ctype="radio"  name="isOtherRemark" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="说明" colspan="24" ctype="textarea" name="otherRemark" placeholder="如选择是，客户经理说明"  id="otherRemark" :rules="{required: isOtherRemark, message: '必输项不允许为空'}"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_ENVI_EVLU');
export default{

  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + '/api/pspoperstatuscheck/update',
      formdata: {}
    };
  },

  props: {
    taskNo: String,
    formType: String
  },

  created: function () {
    var _this = this;
    yufp.service.request({
      method: 'GET',
      url: this.$backend.cmisPsp + '/api/pspoperstatuscheck/',
      data: {condition: {taskNo: this.taskNo}},
      callback: function (code, message, response) {
        yufp.clone(response.data[0], _this.formdata);
        if (response.data.length <= 0) {
          _this.formdata.pkId = _this.$xutils.getUUID();
          _this.formdata.taskNo = _this.taskNo;
        }
      }
    });
  },

  computed: {
    isPhotograph: function () {
      return this.formdata.isPhotograph == '0';
    },

    isOperNormal: function () {
      return this.formdata.isOperNormal == '0';
    },

    isOtherRemark: function () {
      return this.formdata.isOtherRemark == '1';
    },

    curtEvluRst: function () {
      var curtEvluRst = this.formdata.curtEvluRst;
      return !!(curtEvluRst == '3' || curtEvluRst == '4' || curtEvluRst == '5');
    }
  },

  methods: {

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.formdata
      });
    }

  }
};
</script>