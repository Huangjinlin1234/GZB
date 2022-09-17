<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 房抵e点贷无还本续贷审核
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="流水号" name="serno" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户号" name="cusId" :disabled="true" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" :rules="rule[0]" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewContDataBycontNo">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="中文合同编号" name="cnContNo" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户经理号" name="managerId" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户经理名称" name="managerName" :disabled="true" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="旧借据信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="旧借据编号" ctype="input" placeholder="旧借据编号" name="oldBillNo" disabled :colspan="10">
             <!--<yu-input v-model="customTitle"></yu-input>  -->
          </yu-xform-item>
           <!--<yu-xform-item label="" ctype="custom" name="getBillnoInfo" colspan="2">
            <yu-button type="primary" @click="viewContDataBycontNo">查看</yu-button>
          </yu-xform-item>  -->
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="新借据信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="新借据编号" name="newBillNo" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="新借据金额" name="newLoanAmount" :disabled="true" ctype="yu-currency" :min="0"></yu-xform-item>
          <yu-xform-item label="新借据期限（月份）" name="newBillTime" :disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="新借据起始日" name="newStartDate" :disabled="true" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="新借据到期日" name="newEndDate" :disabled="true" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="新借据审批利率" name="newBillChackRate" :multiple="100" unit="%" :disabled="true" ctype="yu-interest-rate"></yu-xform-item>
          <yu-xform-item label="新借据放款/还款卡号" name="newBillCardNum" :disabled="true" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="是否需要调整利率" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否调整利率" name="adjustOrNot" ctype="select" data-code="STD_ZB_YES_NO" @change="onchageRate"></yu-xform-item>
          <yu-xform-item label="调整后利率" name="adjustInterestRate" :multiple="100" unit="%" ctype="yu-interest-rate" :disabled="isReadOnly"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="审核结果" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="审批时间" name="approveDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="审核结果" name="approveResult" ctype="select" data-code="STD_ZB_AUDIT"></yu-xform-item>
          <yu-xform-item label="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS" v-show="false"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveFn" v-if="isButShow">保存</yu-button>
      <yu-button type="primary" @click="submitFn" v-if="isButShow">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
       <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_AUDIT,STD_ZB_APPR_STATUS');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  mponents: {yufpNwfInit },
  data: function () {
    return {
      isDisabled: false,
      isButShow: false,
      isReadOnly: false,
      formdata: {},
      op: 'VIEW',
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
    var serno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      _this.op = data.param.op;
      _this.isShowBtn = true;
    } else {
      data = _this.$route.meta.params;
      serno = data.serno;
      _this.op = data.op;
    }
    // 进入初始化
    if (_this.op == 'VIEW') {
      this.isDisabled = true;
      this.isButShow = false;
    } else if (_this.op == 'EDIT') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/fdyddwhbxdapproval/showdetial',
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
    // 控制调账后利率是否只读
    onchageRate () {
      var _this = this;
      // 1是 0否
      let adjustOrNot = _this.formdata.adjustOrNot;
      if (adjustOrNot == '1' && _this.op == 'EDIT') {
        _this.isReadOnly = false;
      } else {
        _this.isReadOnly = true;
      }
    },
    // 保存
    saveFn: function () {
      return new Promise((resolve, reject) => {
        var validate = false,
          _this = this;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        // 若调整利率，则调整后利率不得小于新借据审批利率
        if (_this.formdata.adjustOrNot == '1') {
          if (_this.formdata.newBillChackRate > _this.formdata.adjustInterestRate) {
            this.$xutils.showMsgBox('提示', '调整后利率必须大于新借据审批利率，请重新填写!');
            return;
          }
        }
        var model = {};
        yufp.clone(_this.formdata, model);
        // 向后台发送保存请求
        var updateurl =
          backend.cmisBiz + '/api/fdyddwhbxdapproval/update';
        _this
          .$request({
            method: 'POST',
            url: updateurl,
            data: model
          })
          .then((data) => {
            if (data.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              resolve();
            } else {
              _this.$message({ message: '保存失败', type: 'error' });
            }
          });
      });
    },
    // 保存后流程提交
    submitFn () {
      let _this = this;
      _this.saveFn().then(res => {
        var obj = _this.formdata;
        //  若审核结果为通过，则提交流程调用接口fb1146
        // 1:同意 0：不同意
        debugger;
        if (obj.approveResult == '1') {
          const loginUser = _this.$xutils.getLoginUserInfo();
          let startdto = {};
          startdto.systemId = 'cmis';
          startdto.orgId = loginUser.orgCode;
          startdto.userId = loginUser.loginCode;
          startdto.bizType = 'YX018';
          startdto.bizId = obj.serno;
          startdto.bizUserName = this.formdata.cusName;
          startdto.bizUserId = this.formdata.cusId;
          startdto.bizPkId = obj.pkId;
          startdto.param = {orgType: loginUser.org.orgType, approveStatus: _this.formdata.approveStatus};
          _this.$refs.yufpNwfInit.wfInit(startdto);
        } else if (obj.approveResult == '0') {
          // 若审核结果不通过，则后台发送fb1146受托信息审核 客户经理否决提交
          let model = {};
          yufp.clone(_this.formdata, model);
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/fdyddwhbxdapproval/managerVetoSubmit',
            data: model,
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$message.success('否决成功');
              } else {
                _this.$message({
                  message: response.message,
                  type: 'error'
                });
              }
            }
          });
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
    }
  }
};
</script>
