<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 房抵e点贷面签基本信息
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="房抵e点贷面签信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="流水号" name="serno" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="11">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="1">
            <yu-button type="primary" @click="viewCusDataByCusId" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="证件类型" name="certType" :disabled="true" ctype="select" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="证件号码" name="certCode" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户手机号码" name="mobileNo" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="面签时间" name="signatureTime" :rules="rule[0]" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="面签地址" name="signatureAddr" :rules="rule[0]" ctype="textarea" placeholder="面签地址" :autosize="{minRows:2,maxRows:3}" maxlength="80" :colspan="20"></yu-xform-item>
          <yu-xform-item label="管户经理编号" name="managerId" :rules="rule[0]" :disabled="true"></yu-xform-item>
          <yu-xform-item label="管户经理名称" name="managerName" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submitFormFn" v-if="isButShow">保存</yu-button>
      <yu-button type="primary" @click="cancelFn" >返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_CERT_TYP');
export default {
  data: function () {
    return {
      isDisabled: false,
      isButShow: false,
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ]
    };
  },
  mounted () {
    var _this = this;
    let data = _this.$route.meta.params;
    // 进入初始化
    _this.op = data.op;
    if (_this.op == 'VIEW') {
      this.isDisabled = true;
      this.isButShow = false;
    } else if (_this.op == 'EDIT') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/visaxdrisk/showdetial',
      data: { serno: data.serno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },

  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
    // 对公客户查看
    viewCusDataByCusId () {
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },
    // 取消
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    submitFormFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/visaxdrisk/updateVisaXdRise',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    }
  }
};
</script>
