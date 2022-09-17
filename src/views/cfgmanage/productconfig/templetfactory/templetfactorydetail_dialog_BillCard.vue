<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="模版组编号" ctype="input" placeholder="模版组编号" name="modelGroupNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="关联类型" ctype="select" name="relType" rules="required" data-code="STD_ZB_REL_TYPE" placeholder="关联类型"></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="页面" ctype="yu-xfunc" name="funcId" v-if="formdata.relType !== '02'" placeholder="页面" @select-fn="commonSelectFn" :mapping="{ funcName: 'funcName', funcUrl: 'funcUrl', funcId: 'funcId' }"></yu-xform-item>
          <yu-xform-item label="模板" ctype="yu-xmodel-factory" name="funcId" v-if="formdata.relType !== '01'" placeholder="模板" @select-fn="commonSelectFn" :mapping="{ modelGroupName: 'funcName', modelGroupNo: 'funcId' }"></yu-xform-item>
          <yu-xform-item label="页面/模板名称" ctype="input" placeholder="页面/模板名称" name="funcName" rules="required"></yu-xform-item>
          <yu-xform-item label="URL" ctype="input" name="funcUrl" v-if="formdata.relType !== '02'" disabled placeholder="URL" :colspan="24"></yu-xform-item>
          <yu-xform-item label="是否主页面" ctype="select" name="isMainFunc" rules="required" data-code="STD_ZB_Y_N" placeholder="是否主页面"></yu-xform-item>
          <yu-xform-item label="页面显示顺序" ctype="yu-num" name="seqNo" rules="required" placeholder="页面显示顺序" :precision="0" :min="0"></yu-xform-item>
          <yu-xform-item label="从页面显示条件" ctype="textarea" name="showCond" rules="required" placeholder="从页面显示条件" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="从页面过滤条件" ctype="textarea" name="filterCond" rules="required" placeholder="从页面过滤条件" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="更新日期"></yu-xform-item>
          <yu-xform-item label="主页面路径虚拟字段" ctype="input" placeholder="主页面路径虚拟字段" name="mainPageJspath" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import mixinForm from '@/utils/mixins/mixin-form';

export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],

  props: {
    modelGroupNo: String
  },

  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgmodelgroupdetail/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgmodelgroupdetail/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },

  computed: {
    ...mapGetters(['loginCode'])
  },

  watch: {
    modelGroupNo: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.formdata.modelGroupNo = val;
        }
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.execBillCardDefaultValueFormula();
    });
  },

  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.relType = this.$xutils.getDefaultformulaData('01');
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
