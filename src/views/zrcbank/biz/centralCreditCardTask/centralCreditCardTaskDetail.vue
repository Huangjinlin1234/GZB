<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-panel ref="simplePanel" title="业务信息" panel-type="simple">
      <yu-xform ref="refForm" label-width="160px" v-model="formdata.busi" :disabled="true" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" ctype="input"></yu-xform-item>
          <yu-xform-item label="业务类型" name="bizType" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel ref="simplePanel" title="信用卡信息" panel-type="simple">
      <yu-xform ref="refForm2" label-width="160px" v-model="formdata.file" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="申请卡产品" name="creditCardType" ctype="select" data-code=""  disabled></yu-xform-item>
          <yu-xform-item label="申请渠道" name="appChnl" ctype="select" data-code="" disabled ></yu-xform-item>
          <yu-xform-item label="任务生成时间" name="taskStartTime" ctype="input" ></yu-xform-item>
          <yu-xform-item label="任务加急标识" name="taskUrgentFlag" disabled ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="接收人" name="receiverIdName" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrgName" disabled ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel ref="simplePanel" title="登记信息" panel-type="simple">
      <yu-xform ref="refForm3" label-width="160px" v-model="formdata.input" :disabled="true" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="操作人" name="updIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作机构" name="updBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作时间" name="updDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="作废原因" :hidden="taskStatus != '03'" name="cancelResn" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      formdata: {},
      taskStatus: ''
    };
  },
  props: {
    bizPageData: Object
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    cancelFn () {
      yufp.router.removeTab(this.$route.path);
    },
    afterInit () {
      var _this = this;
      var taskNo = '';
      if (_this.$route.meta.params) {
        taskNo = _this.$route.meta.params.taskNo;
      } else {
        taskNo = _this.bizPageData.taskNo;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/centralcreditcardtask/' + taskNo,
        callback: function (code, message, response) {
          _this.taskStatus = response.data.taskStatus;
          yufp.clone(response.data, _this.formdata.busi);
          yufp.clone(response.data, _this.formdata.file);
          yufp.clone(response.data, _this.formdata.input);
        }
      });
    }
  }
};
</script>
<style>
.yu-base-panel-content {
  padding-bottom: 0px !important;
}
</style>
