<template>
  <div>
   <yu-xform ref="refForm" label-width="120px" form-type="edit" v-model="formdata" :rules="formRules" >
        <yu-xform-group :column="1">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="surveySerno" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="检验信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="勘察原因" ctype="checkbox" value-type="string" rules="required" name="toinvResn" data-code="STD_TOINV_RESN" placeholder="勘察原因" disabled></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {

  props: {
    pageParams: Object,
    dialogId: String
  },
  mixins: [mixinForm],
  data () {
    return {
      formdata: {},
      formType: 'edit',
      formRules: {},
      surveySerno: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {

    afterInit () {
      var _this = this;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        _this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        _this.surveySerno = _this.getFactory().bizPageData.instanceInfo.bizId;
      }
      if (_this.surveySerno == null || _this.surveySerno == '') {
        return;
      }
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtverifinfo/selectbysurveyserno',
        data: {surveySerno: _this.surveySerno}
      }).then(({data, code, message}) => {
        if (data != null) {
          yufp.clone(data, this.formdata);
        }
      });
    },

    showAction () {}

  }
};
</script>
