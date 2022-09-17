<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 房抵e点贷受托信息审核
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="客户号" name="cusId" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" :rules="rule[0]" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewContDataBycontNo">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="中文合同编号" name="contCnNo" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户经理号" name="managerId" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户经理名" name="managerName" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="借据编号" name="billNo" :disabled="true" :rules="rule[0]" ctype="input" ></yu-xform-item>
          <yu-xform-item label="借据金额" name="billAmt" ctype="yu-currency" :min="0" :rules="rule[0]" :disabled="true"></yu-xform-item>
          <yu-xform-item label="借据期限（月份）" name="loanTerm" :rules="rule[0]" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="审批利率" name="apprRate" ctype="yu-interest-rate" :rules="rule[0]" :disabled="true" :multiple="100" unit="%"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="受托支付信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="受托支付账户户名" name="tradePartnerAcc" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="受托支付账户账号" name="tradePartnerName" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="受托支付开户行号" name="acctbNo" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="受托支付开户行名" name="acctbNm" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款/还款卡号" name="disbRepayCard" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="审核时间" name="auditDate" :rules="rule[0]" ctype="datepicker" ></yu-xform-item>
          <yu-xform-item label="审核结果" name="auditRst" ctype="select" :rules="rule[0]" data-code="STD_ZB_AUDIT"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="受托支付信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否调整利率" name="isAdjRate" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO" @change="onchageRate"></yu-xform-item>
          <yu-xform-item label="调整后利率" name="adjExecRate" ctype="yu-interest-rate" :multiple="100" unit="%" :disabled="isReadOnly"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submitFormFn" v-if="isButShow">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_CXCF_RESULT');
export default {
  data: function () {
    return {
      isDisabled: false,
      isButShow: false,
      isReadOnly: false,
      op: 'VIEW',
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
      url: backend.cmisBiz + '/api/loanedcheck/showdetial',
      data: { serno: data.serno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },

  methods: {
    // 表格金额字段处理
    formatNumber: function (format, sort) {
      let _this = this;
      sort = sort === undefined ? 2 : sort;
      return function (r, c, v) {
        var val;
        switch (sort) {
        case 0:
          val = r;
          break;
        case 1:
          val = c;
          break;
        case 2:
          val = v;
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('未找到分类');
          break;
        }

        if (val == undefined) {
          return '';
        }
        if (val != 0 && !parseFloat(val)) {
          return val;
        }
        return _this.number(val, format);
      };
    },
    /**
   * Formats the number according to the format string.
   * examples (123456.789):
   * 0 - (123456) show only digits, no precision<br>
   * 0.00 - (123456.78) show only digits, 2 precision<br>
   * 0.0000 - (123456.7890) show only digits, 4 precision<br>
   * 0,000 - (123,456) show comma and digits, no precision<br>
   * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
   * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
   * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
   * For example: 0.000,00/i
   * @param {Number} v The number to format.
   * @param {String} format The way you would like to format this text.
   * @return {String} The formatted number.
   */
    number: function (v, format) {
      if (!format) {
        return v;
      }
      if (isNaN(v)) {
        return '';
      }
      var comma = ',',
        dec = '.',
        i18n = false,
        neg = v < 0;

      v = Math.abs(v);
      if (format.substr(format.length - 2) == '/i') {
        format = format.substr(0, format.length - 2);
        i18n = true;
        comma = '.';
        dec = ',';
      }

      var hasComma = format.indexOf(comma) != -1,
        psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
      } else {
        v = v.toFixed(0);
      }

      var fnum = v.toString();

      psplit = fnum.split('.');

      if (hasComma) {
        let cnum = psplit[0],
          parr = [],
          j = cnum.length,
          // m = Math.floor(j / 3),
          n = cnum.length % 3 || 3,
          i;

        for (i = 0; i < j; i += n) {
          if (i != 0) {
            n = 3;
          }

          parr[parr.length] = cnum.substr(i, n);
          // m -= 1;
        }
        fnum = parr.join(comma);
        if (psplit[1]) {
          fnum += dec + psplit[1];
        }
      } else {
        if (psplit[1]) {
          fnum = psplit[0] + dec + psplit[1];
        }
      }

      return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
    },
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
    viewContDataBycontNo () {
      if (this.formdata.contNo == null || this.formdata.contNo == '') {
        this.$xutils.showMsgBox('提示', '合同号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['contNo'] = this.formdata.contNo;
      json['model_group_no'] = 'CMG000015';
      json['viewType'] = 'VIEW';
      json['bizOp'] = 'VIEW';
      json['opType'] = 'view';
      json['nodeFlag'] = '1';
      json['contType'] = '1';
      json['iqpSerno'] = '1';
      json['op'] = 'VIEW';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        json
      );
    },
    // 取消
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 控制调账后利率是否只读
    onchageRate () {
      var _this = this;
      // 1是 0否
      let isAdjRate = _this.formdata.isAdjRate;
      if (isAdjRate == '1' && _this.op == 'EDIT') {
        _this.isReadOnly = false;
      } else {
        _this.isReadOnly = true;
      }
    },
    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/loanedcheck/updateLoanedcheck',
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
    },
    // 提交
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
      if (_this.formdata.isAdjRate == '1') {
        if (_this.formdata.adjExecRate >= _this.formdata.apprRate) {
          _this.saveFn();
        } else if (_this.formdata.adjExecRate < _this.formdata.apprRate) {
          this.$xutils.showMsgBox('提示', '调整后利率必须大于审批利率，请重新填写!');
          return;
        }
      } else if (_this.formdata.isAdjRate == '0') {
        _this.saveFn();
      }
    }
  }
};
</script>
