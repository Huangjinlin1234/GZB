<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDis" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="serno" rules="required"  disabled></yu-xform-item>
          <yu-xform-item label="申请类型" ctype="select" hidden data-code="STD_ZB_APP_TYPE" placeholder="申请类型" name="appType"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="集团名称" ctype="input" placeholder="集团名称" name="grpName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="集团性质" ctype="select" placeholder="集团性质" name="grpNature" rules="required" disabled data-code="STD_GRP_NATUR"></yu-xform-item>
          <yu-xform-item label="核心客户编号" ctype="input" placeholder="核心客户编号" name="coreCusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="核心客户中征码" ctype="input" placeholder="核心客户中征码" name="coreCusLoanCardId" disabled></yu-xform-item>
          <yu-xform-item label="核心客户名称" ctype="input" placeholder="核心客户名称" name="coreCusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="核心客户证件号码" ctype="input" placeholder="核心客户证件号码" name="coreCusCertNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="更新办公地址日期" ctype="datepicker" placeholder="更新办公地址日期" name="updateOfficeAddrDate"></yu-xform-item>
          <yu-xform-item label="办公地址" ctype="input" placeholder="办公地址" name="officeAddr" rules="required" ></yu-xform-item>
          <yu-xform-item label="统一社会信用代码" ctype="input" placeholder="统一社会信用代码" name="sociCredCode"></yu-xform-item>
          <yu-xform-item label="工商登记注册号" ctype="input" placeholder="工商登记注册号" name="businessCirclesRegiNo" disabled></yu-xform-item>
          <yu-xform-item label="办公地址行政区划" ctype="yu-xdic-tree-addr" rules="required" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" placeholder="办公地址行政区划" name="officeAddrAdminDiv"></yu-xform-item>
          <yu-xform-item label="集团紧密程度" ctype="select" rules="required" data-code="STD_ZB_CLOSELY_DEGREE" placeholder="集团紧密程度" @change="change" name="grpCloselyDegree"></yu-xform-item>
          <yu-xform-item label="集团客户情况说明" ctype="textarea" rules="required" placeholder="集团客户情况说明" name="grpCaseMemo" :hidden="formdata.appType == '03' || formdata.appType == '02'"></yu-xform-item>
        </yu-xform-group>  
        <yu-xform-group :column="1">
          <yu-xform-item label="申请原因" ctype="textarea" :rules="appResnRequired" placeholder="申请原因" name="appResn"></yu-xform-item>
        </yu-xform-group>  
        <yu-xform-group :column="2">
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required"  hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrId" rules="required"  hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" rules="required"  data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" disabled></yu-xform-item>
          <yu-xform-item label="主申请关联(集团)客户号" ctype="input" placeholder="主申请关联(集团)客户号" name="parentCusId" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          <yu-xform-item label="集团融资类型" ctype="input" placeholder="集团融资类型" name="grpFinanceType" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType"  hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="showBtn" ref="btn_tempSave" @click="customClick('doTempSave')">暂存</yu-button>
      <yu-button type="primary" v-if="showBtn" ref="btn_commit" @click="customClick('doSubmit')">提交</yu-button>
      <yu-button type="primary" v-if="showBtn" ref="btn_doCancel" @click="customClick('doCancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GRP_NATUR');
import mixinForm from '@/utils/mixins/mixin-form';
import {validator} from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusgrpapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusgrpapp/',
      formdata: {},
      formType: 'edit',
      formRules: {
        sociCredCode:[
        { required: true, message: '必输项不能为空' },
        { validator: validator.numberAndLetter }
      ]
      },
      imageUrls: {},
      File: {},
      op: this.getFactory().contextData ? this.getFactory().contextData.op : 'view',
      showBtn: true
    };
  },
  computed: {
    formDis: function () {
      // if (this.formdata.appType == '03') { //解散
      //   return this.op != 'view';
      // }
      return this.op == 'view';
    },
    appResnRequired: function () {
      return this.appresnDis === true ? '' : 'required';
    },
    appresnDis: function () {
      if (this.getFactory().contextData) {
        return (this.formdata.appType == '02');
      } else {
        return true;
      }
      // return this.formdata.appType == '03' && !this.getFactory().contextData.op;
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    },
    // 属性监听事件
    change () {
      // 集团紧密程度:01实体集团02一般关联
      // this.getFactory().contextData.grpCloselyDegree = this.d1_BillCard.getBillCardItemValue('grpCloselyDegree');
      // 调用暂存方法
      // thisCard.tempUpdateBillCardData();
      // 调用后台代码，根据主表中的信息，更新成员中的关联关系
      const param = this.formdata;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisCus + '/api/cusgrpmemberapp/updatecusgrpmemcorretype',
        data: param,
        success: (response, status, xhr) => {
          // const data = response.data;
        },
        error: (result, b) => {}
      });
    }
  },
  created(){
    if ((this.getFactory().contextData.appTypeOp != 'add' && this.getFactory().contextData.op == 'view') || (this.getFactory().contextData.flowParam && this.getFactory().contextData.flowParam.op == 'view')) {
        this.showBtn = false;
      }
  }
};
</script>
