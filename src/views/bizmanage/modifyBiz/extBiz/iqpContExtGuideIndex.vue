<template>
   <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="原合同编号" ctype="yu-xloan-ext" name="contNo" rules="required" placeholder="原合同编号" @select-fn="commonSelectFn" :mapping="{'contAmt':'contAmt','contStartDate':'contStartDate','cusId':'cusId','contEndDate':'contEndDate','contNo':'contNo'}" width="800" height="480" :selectionType="radio" colspan="24"></yu-xform-item>
          <yu-xform-item label="客户号" ctype="input" placeholder="客户号" name="cusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同起始日" ctype="input" placeholder="合同起始日" name="contStartDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同到期日" ctype="input" placeholder="合同到期日" name="contEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="贷款合同类型" ctype="input" placeholder="贷款合同类型" name="contType" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否使用授信额度" ctype="input" placeholder="是否使用授信额度" name="isUtilLmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="contSerno" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNext">下一步</yu-button>
      <yu-button type="primary" @click="doBack">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpcontext/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpcontext/',
      formdata: {},
      formType: 'edit'
    };
  },
  mounted: function () {
    this.formdata.contSerno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');
  },
  methods: {
    // 下一步
    doNext () {
      const json = yufp.clone(this.formdata, {});
      // 校验必输项
      let saveFlag = false;
      this.$refs.refForm.validate(function (valid) {
        saveFlag = valid;
      });
      if (!saveFlag) {
        return;
      }
      // 自动插入借据下的合同数据
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqpcontext/saveIqpContExtBycontNo',
        data: yufp.clone(this.formdata, {}),
        success: (response, status, xhr) => {
        }
      });
      json['op'] = 'VIEW';
      json['opType'] = 'add';
      json['model_group_no'] = 'CMG000417';
      this.$dialog.open(
        '展期申请新增',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        json,
        () => {
          this.$dialog.close(this.dialogId);
        }
      );
    },

    // 返回
    doBack () {
      this.$dialog.close(this.dialogId);
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
