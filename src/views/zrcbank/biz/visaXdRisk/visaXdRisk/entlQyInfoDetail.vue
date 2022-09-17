<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 房抵e点贷企业信息核对修改
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="企业信息核对修改" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="流水号" name="serno" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="关联的个人编号" name="cusId" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="企业名称" name="cusName" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="企业所在区域" name="cusArea" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="营业执照号" name="regCde" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="经营范围" name="operRange" ctype="textarea" placeholder="经营范围" :autosize="{minRows:2,maxRows:3}" maxlength="80" :colspan="20"></yu-xform-item>
          <yu-xform-item label="年销售收入" name="yearSaleIncome" :rules="rule[0]" :formatter="formatNumber('0,000.00',2)"></yu-xform-item>
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
    let data = {};
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo.param;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
    }

    // 进入初始化
    _this.op = data.op;
    if (_this.op == 'VIEW') {
      this.isDisabled = true;
      this.isButShow = false;
    } else if (_this.op == 'UPDATE') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/entlqyinfo/showdetial',
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
      this.getFactory().back();
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
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/entlqyinfo/updateEntlQyInfo',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('提交成功');
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
