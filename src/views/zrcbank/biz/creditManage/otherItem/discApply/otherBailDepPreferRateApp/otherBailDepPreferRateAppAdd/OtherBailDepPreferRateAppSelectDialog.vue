<template>
  <div id="select">
    <div id="selectContent">
     <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules">
      <yu-xform-item label="是否保证金超过1000万" ctype="select" placeholder="请选择" data-code="STD_ZB_YES_NO" name="isOverAmt" rules="required" ></yu-xform-item>
     </yu-xform>  
    </div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
       <yu-button type="primary" @click="onSave">保存</yu-button>
       <yu-button type="primary" @click="onCancel">返回</yu-button>
      </yu-form-buttons>
    </div>
</template>
<script>

yufp.lookup.reg('STD_ZB_YES_NO');
export default {
   props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      refForm: null
    };
  },
  methods: {
    // 保存
    onSave () {
       var _this = this;
       let selection = this.formdata.isOverAmt;
       if(selection == null || selection == undefined || selection == ""){
         _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
          });
          return;
       }else{
         _this.$dialog.close(_this.dialogId, selection);
       }
      
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },
  }
};
</script>
