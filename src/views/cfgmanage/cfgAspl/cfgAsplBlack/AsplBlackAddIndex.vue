<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" name="pkId" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label-width="120px" label="业务流水号" name="serno" ctype="input"  :column="12" hidden disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="客户编号" name="cusId" ctype="input" placeholder="客户编号" :column="12" disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="客户名称" name="cusName" ctype="input"  :column="12" disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="业务类型" ctype="select" name="bizType"  data-code="STD_ZB_ASPL_BALCKS_TYPE" disabled></yu-xform-item>
            <yu-xform-item label-width="120px" label="生效状态" name="inureStatus" ctype="select" data-code="STD_ZB_YES_NO" :column="12" required></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label-width="120px" label="拦截原因" name="resn" ctype="textarea" :column="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item  label-width="120px" label="登记人编号" ctype="input" placeholder="登记人编号" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记机构编号" ctype="input" placeholder="登记机构编号" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="120px" label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doAdd">确定</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_ZB_ASPL_BALCKS_TYPE');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      // 登录信息
      let userInfo = this.$xutils.getLoginUserInfo();
      debugger
      this.formdata.cusId = this.pageParams.cusId;
      this.formdata.cusName = this.pageParams.cusName;
      this.formdata.bizType = this.pageParams.bizType;
      this.formdata.cusName = this.pageParams.cusName;
      this.formdata.updateTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      this.formdata.inputId = userInfo.userId;
      this.formdata.inputBrId = userInfo.orgCode;
      this.formdata.inputIdName = userInfo.userName;
      this.formdata.inputBrIdName = userInfo.org.name;
      this.formdata.inputDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      this.formdata.inureStatus = '0'; // 生效状态
      this.formdata.approveStatus = '000';// 审批状态
    },
    // 新增
    doAdd () {
      let _this = this;
      let jsoPar = this.formdata;
      // 登录信息
      let userInfo = this.$xutils.getLoginUserInfo();
      jsoPar.updId = userInfo.loginCode;
      jsoPar.updBrId = userInfo.orgCode;
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.oprType = '01';
      // 请求参数
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/asplblacks/add',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          if(response.data.recode == '0000'){
            _this.$message({ message: response.data.msg, type: 'success' });
            _this.cancel();
          }else{
            _this.$message({ message: response.data.msg, type: 'warning' });
            _this.cancel();
          }
        },
        error: (result, b) => {
          _this.$message({ message: result.data.msg, type: 'warning' });      
        }
      });
    },
    // 返回
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
