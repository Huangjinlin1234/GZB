<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="权证编号" ctype="input" rules="required" name="warrantNo" :on-icon-click="onIconClickFn" icon="search"></yu-xform-item>
          <yu-xform-item label="权证名称" ctype="input" rules="required" name="warrantName" disabled></yu-xform-item>
          <yu-xform-item label="权证类别" ctype="select" rules="required" placeholder="请选择" name="certiCatalog" data-code="STD_ZB_CERTI_CATALOG"></yu-xform-item>
          <yu-xform-item label="权证类型" ctype="select" rules="required" placeholder="请选择" name="certiTypeCd" data-code="STD_ZB_CERTI_TYPE_CD"></yu-xform-item>
          <yu-xform-item label="权证出库原因大类" ctype="select" rules="required" placeholder="请选择" name="warrantOutType" @change="change" data-code="STD_ZB_EXWA_TYP" ></yu-xform-item>
          <yu-xform-item label="权证出库原因细类" ctype="select" rules="required" placeholder="请选择" name="warrantOutTypeSub" @change="change" data-code="STD_WARRANT_OUT_TYPE_SUB"></yu-xform-item>
          <yu-xform-item label="权证预计归还时间(续借后)"  rules="required" name="preBackDate" ctype="datepicker" value-format="yyyy-MM-dd"></yu-xform-item>
          <!-- <yu-xform-item label="押品编号" ctype="input" rules="required" name="guarNo"  disabled></yu-xform-item> -->
          <yu-xform-item label="抵质押分类" ctype="select" rules="required" placeholder="请选择" name="grtFlag" data-code="STD_GRT_FLAG" disabled ></yu-xform-item>
          <!-- <yu-xform-item label="押品所有权人"  ctype="input" rules="required" placeholder="押品所有权人" name="guarCusName"  disabled></yu-xform-item> -->
          <yu-xform-item label="抵质押物类型" ctype="select" :rules="{ required: requiredFlag}" placeholder="请选择" name="gagTyp" data-code="STD_ZB_GUAR_TYPE_CD"></yu-xform-item>
          <yu-xform-item label="核心担保编号" ctype="input" rules="required" name="coreGuarantyNo" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onClose')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_CERTI_CATALOG,STD_ZB_CERTI_TYPE_CD,STD_ZB_EXWA_TYP,STD_WARRANT_OUT_TYPE_SUB,STD_ZB_GUAR_TYPE_CD');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      addUrl: this.$backend.cmisBiz + '/api/guarwarrantinapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    onIconClickFn () {
      this.$parent.selectGuar();
    },

    change () {
      var warrantOutType = this.$refs.refForm.formdata.warrantOutType;
      var warrantOutTypeSub = this.$refs.refForm.formdata.warrantOutTypeSub;
      // 结清出库隐藏出库原因细类、预计归还时间
      if (warrantOutType === '01') {
        this.$refs.refForm.setItemHidden('warrantOutTypeSub', true);
        this.$refs.refForm.setItemHidden('preBackDate', true);
      } else if (warrantOutType === '02') {
        this.$refs.refForm.setItemHidden('warrantOutTypeSub', false);
        this.$refs.refForm.setItemHidden('preBackDate', false);
      }
      // 非结清出库{"key":"04","value":"权证借阅（诉讼）"},{"key":"05","value":"权证借阅（非诉讼）"}，显示预计归还时间
      if (warrantOutTypeSub === '04' || warrantOutTypeSub === '05') {
        this.$refs.refForm.setItemHidden('preBackDate', false);
      } else {
        this.$refs.refForm.setItemHidden('preBackDate', true);
      }
    }
  }
};
</script>
