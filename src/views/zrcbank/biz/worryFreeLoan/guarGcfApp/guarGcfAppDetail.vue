<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 省心贷押品查询查封
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="抵押查封信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同号" rules="required" ctype="input" name="contNo" disabled colspan="12"></yu-xform-item>
          <!-- <yu-xform-item label="" ctype="custom" name="contNo" colspan="2">
             <yu-button type="primary" @click="selectContNo" v-if="isButShow">选择</yu-button>
           </yu-xform-item>-->
          <yu-xform-item label="中文合同号" ctype="input" name="contNoCn" disabled ></yu-xform-item>
          <yu-xform-item label="客户号" ctype="input" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" :min="0" disabled></yu-xform-item>
          <yu-xform-item label="合同余额" ctype="yu-currency" name="contBalance" :min="0" disabled></yu-xform-item>
          <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate" disabled ></yu-xform-item>
          <yu-xform-item label="客户经理号" ctype="input" name="managerId" disabled ></yu-xform-item>
          <yu-xform-item label="管户机构" ctype="input" name="managerBrId" disabled ></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" name="pkId" v-show="false" ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveFn" v-if="isButShow">保存</yu-button>
      <yu-button type="primary" @click="submitFn" v-if="isButShow">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog title="省心快贷合同信息" ref="contDialog" :visible.sync="showDialog" width="1500px" height="800px">
      <yu-xtable ref="contTable" condition-key="condition" row-number :data-url="dataContList" :base-params="contParams" :default-load="true" requestType="POST" size="full">
        <yu-xtable-column label="合同号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="中文合同号" prop="contCnNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="可放款金额" prop="contBalance" hidden-column></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" prop="contEndDate" ></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons align="center">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="back">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
     <yufp-nwf-init ref="yufpNwfInit" @success-click="submitSuccess"></yufp-nwf-init>
  </div>
</template>
<script>
// 注册字典项

import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {yufpNwfInit},
  data: function () {
    return {
      dataContList: backend.cmisBiz + '/api/ctrloancont/selectWorryFreeLoanContinfo',
      isDisabled: false,
      isButShow: false,
      showDialog: false,
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
      url: backend.cmisBiz + '/api/guargcfapp/showdetial',
      data: { pkId: serno },
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
    /**
     * 省心快贷合同信息选择页面显现
     */
    selectContNo: function () {
      var _this = this;
      _this.showDialog = true;
    },

    /**
     * 选取返回
     */
    backToAdd: function () {
      var _this = this;
      var selections = _this.$refs.contTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.showDialog = false;
      _this.formdata.contNo = selections[0].contNo;
      _this.formdata.contNoCn = selections[0].contCnNo;
      _this.formdata.cusName = selections[0].cusName;
      _this.formdata.contAmt = selections[0].contAmt;
      _this.formdata.contBalance = selections[0].contBalance;
      _this.formdata.contStartDate = selections[0].contStartDate;
      _this.formdata.contEndDate = selections[0].contEndDate;
      // yufp.clone(selections[0], _this.formdata);
    },

    /**
     * 省心快贷合同信息返回
     */
    back: function () {
      var _this = this;
      _this.showDialog = false;
    },
    // 取消
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
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
        var model = {};
        yufp.clone(_this.formdata, model);
        // 向后台发送保存请求
        var updateurl =
          backend.cmisBiz + '/api/guargcfapp/update';
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
    submitFn: function () {
      let _this = this;
      _this.saveFn().then(res => {
        var obj = _this.formdata;
        const loginUser = _this.$xutils.getLoginUserInfo();
        let startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.orgCode;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX019';
        startdto.bizId = obj.pkId;
        startdto.bizUserName = loginUser.userName;
        startdto.bizUserId = loginUser.loginCode;
        startdto.param = {
          topOutsystemCode: _this.topOutsystemCode,
          imageParams: {
            docid: obj.contNo,
            contid: obj.contNo,
            businessid: obj.pkId
          },
          op: 'VIEW'
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
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
