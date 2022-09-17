<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" >
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="yu-guar" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','guarAmt':'guarAmt','assureName':'assureName','cerType':'cerType','assureCertCode':'assureCertCode','cusTyp':'cusTyp','guarantyId':'guarantyId','guaranteeType':'guaranteeType','ensureLegalValidity':'ensureLegalValidity','relationLender':'relationLender'}" idField="cusId" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="assureName" disabled></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="cerType"  placeholder="证件类型" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="场景" name="assureCertCode" disabled></yu-xform-item>
          <yu-xform-item label="担保金额" ctype="input" name="guarAmt" placeholder="担保金额" :rules="baseFormRules[0]" disabled ></yu-xform-item>
          <yu-xform-item label="保证人类型" ctype="select" name="cusTyp" placeholder="保证人类型" data-code="STD_ASSURE_CUS_TYPE" :rules="baseFormRules[0]" disabled ></yu-xform-item>
          <yu-xform-item label="保证担保形式" ctype="select" placeholder="保证担保形式" data-code="STD_ZB_GUARANTY_TYPE" name="guarantyType" :rules="baseFormRules[0]"></yu-xform-item>
          <yu-xform-item label="保证方式" ctype="select" placeholder="保证方式" data-code="STD_ZB_GUARANTEE_TY" name="guaranteeType" :rules="baseFormRules[0]" disabled></yu-xform-item>
          <yu-xform-item label="保证法律有效性" ctype="select" placeholder="保证法律有效性" name="ensureLegalValidity" data-code="STD_ZB_BZFLYXX" :rules="baseFormRules[0]" disabled></yu-xform-item>
          <yu-xform-item label="保证人与借款人关联关系" ctype="select" placeholder="保证人与借款人关联关系" name="relationLender" data-code="STD_ZB_BZRYJKRGLGX" :rules="baseFormRules[0]" disabled></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="担保编号" ctype="input" placeholder="担保编号" name="guarantyId" hidden ></yu-xform-item>
          <yu-xform-item label="征信关联业务流水号" ctype="input" name="bizSerno" placeholder="征信关联业务流水号" hidden></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="saveGuarGuaratee">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GUAR_TYPE,STD_ASSURE_CUS_TYPE,STD_ZB_GUARANTY_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D13ABillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpriskchkdebtcfrm/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpriskchkdebtcfrm/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'number',
          required: true,
          message: '请输入数字',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ]
    };
  },
  methods: {
    // 保证人保存
    saveGuarGuaratee () {
      var _this = this;
      var model = {};
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.clone(_this.formdata, model);
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbizrel/saveguarinforelGuarantee',
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              // window.parent.d1_A_BillCard.queryDataByCondition();
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }

      });
    }
  },
  mounted () {
    var _this = this;
    _this.formdata.serno = _this.pageParams.iqp_Serno;
    _this.formdata.iqpSerno = _this.pageParams.iqp_Serno;
    _this.formdata.pkId = _this.pageParams.pkId;
    _this.formdata.guarantyId = _this.pageParams.guarantyId;
    _this.formdata.bizSerno = _this.pageParams.bizSerno;
    _this.formdata.cusId = this.pageParams.cusId;
  }
};
</script>