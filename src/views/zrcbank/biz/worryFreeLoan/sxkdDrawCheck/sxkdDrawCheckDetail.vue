<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 省心快贷提款审核详情
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="提款信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="主键" name="serno" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户号" name="cusId" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同号" name="contNo" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="中文合同号" name="contCnNo" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="借据号" name="billNo" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款金额" name="pvpAmt" :disabled="true" ctype="input" ></yu-xform-item>
          <yu-xform-item label="放款时间" name="pvpDate" :disabled="true" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="借据到期日" name="billEndDate" :disabled="true" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="客户经理号" name="managerId" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="管户机构" name="managerBrId" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="审核意见" name="auditStatus" rules="required" ctype="select" data-code="STD_ZB_AUDIT"></yu-xform-item>
          <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" rules="required" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :colspan="24"></yu-xform-item>
          <yu-xform-item label="贷款投向码值" name="loanTer" ctype="input" :colspan="24" rules="required" disabled></yu-xform-item>
          <!--<yu-xform-item label="贷款投向" ctype="input" placeholder="贷款投向" name="loanTer"></yu-xform-item>
          <yu-xform-item label="贷款投向" ctype="" name="loanTerName" placeholder="贷款投向" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'loanTerName', enName: 'loanTer' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>-->
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
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_AUDIT');
export default {
  mixins: [mixinForm],
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
    } else if (_this.op == 'view') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/sxkddrawcheck/showdetial',
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
    // 取消
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },

    // 提交
    submitFormFn: function () {
      var _this = this;
      var model = _this.$refs.refForm.formdata;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 审核意见:1通过 0不通过
      if (model.auditStatus == '0') {
        this.$xutils.showMsgBox('提示', '审核状态为不通过，无法提交!');
        return;
      }

      // 向后台发送保存请求
      this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/sxkddrawcheck/sxkdDrawChecksubmit',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$xutils.showMsgBox('提示', '提交成功!', 350, 150);
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
            }
          } else {
            //  rtnFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
