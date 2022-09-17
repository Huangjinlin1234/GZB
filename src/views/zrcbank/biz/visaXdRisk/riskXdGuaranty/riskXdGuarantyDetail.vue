<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 房抵e点贷押品查询查封
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="抵押查封信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="流水号" name="serno" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="抵押品编号" name="dyNo" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewContDataBycontNo">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="不动产证号" name="bdcNo" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="借款人名称" name="jkCusName" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="押品所有人名称" name="ypManagerId" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="押品权证编号" name="ypBookSerno" :rules="rule[0]" ctype="input" ></yu-xform-item>
          <yu-xform-item label="生成时间" name="applyTime" ctype="datepicker" :disabled="true"></yu-xform-item>
          <yu-xform-item label="查询查封结果" name="cxCfResult" ctype="select" data-code="STD_CXCF_RESULT"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submitFormFn" v-if="isButShow">修改</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_CXCF_RESULT');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  mponents: {yufpNwfInit },
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
      ],
      topOutsystemCode: 'SXKDCF;'
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    var serno = '';
    var op = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      op = data.param.op;
      _this.isShowBtn = true;
    } else {
      data = _this.$route.meta.params;
      serno = data.serno;
      op = data.op;
    }
    // 进入初始化
    if (op == 'VIEW') {
      this.isDisabled = true;
      this.isButShow = false;
    } else if (op == 'EDIT') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/riskxdguaranty/showdetial',
      data: { serno: serno },
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
    // 保存后流程提交
    afterSaveCommit: function () {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
        data: {
          contNo: _this.formdata.contNo
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            const loginUser = _this.$xutils.getLoginUserInfo();
            let startdto = {};
            startdto.systemId = 'cmis';
            startdto.orgId = loginUser.orgCode;
            startdto.userId = loginUser.loginCode;
            startdto.bizType = 'YX017';
            startdto.bizId = _this.formdata.serno;// 流水号
            startdto.bizUserName = response.data.ctrLoanCont.cusName;
            startdto.bizUserId = response.data.ctrLoanCont.cusId;
            startdto.param = {
              topOutsystemCode: _this.topOutsystemCode,
              imageParams: {
                docid: _this.formdata.contNo,
                contid: _this.formdata.contNo,
                businessid: _this.formdata.serno
              },
              op: 'VIEW'
            };
            _this.$refs.yufpNwfInit.wfInit(startdto);
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    // 流程回调
    onBack () {
      if (this.isShowBtn) {
        this.$dialog.close(this.dialogId);
      } else {
        yufp.router.removeTab(this.$route.path);
      }
    },
    // 当为3:今日已进行查封查验且无冻结保存，提交流程并发送fb1168(抵押查封结果推送),否则保存并发送fb1168(抵押查封结果推送),不提交流程
    // STD_CXCF_RESULT:1:正在进行查询查封,2:今日已进行查封查验且有冻结,3：今日已进行查封查验且无冻结
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
      var approveStatus = model.approveStatus;
      if (approveStatus == '997' || approveStatus == '111') {
        _this.$message({message: '该笔数据已发起流程无法修改', type: 'warning'});
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/riskxdguaranty/updateRiskXdGuaranty',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
            if (model.cxCfResult == '3') {
              _this.afterSaveCommit();
            }
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
