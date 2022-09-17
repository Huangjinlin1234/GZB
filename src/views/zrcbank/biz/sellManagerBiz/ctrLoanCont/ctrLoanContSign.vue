
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
    <!-- 借款合同签订 -->
        <yu-xform ref="refBaseForm" label-width="100px" v-model="baseFormdata">
          <yu-panel title="借款合同信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="申请流水号" ctype="input" name="iqpSerno" disabled hidden></yu-xform-item>
              <yu-xform-item label="合同编号" ctype="input" name="contNo" disabled></yu-xform-item>
              <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled></yu-xform-item>
              <yu-xform-item label="合同金额" ctype="input" name="contAmt" disabled></yu-xform-item>
              <yu-xform-item label="最高可用金额" ctype="input" name="highAvlAmt" disabled></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled></yu-xform-item>
              <yu-xform-item label="用途" ctype="input" name="loanPurp" disabled></yu-xform-item>
              <yu-xform-item label="币种" ctype="input" name="curType" disabled :rules="baseFormRules[0]" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
              <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" :rules="baseFormRules[0]" :disabled="disabledflg"></yu-xform-item>
              <yu-xform-item label="合同起始时间" ctype="datepicker" name="contStartDate" :rules="baseFormRules[0]" disabled  colspan="12" ></yu-xform-item>
              <yu-xform-item label="合同到期时间" ctype="input" name="contEndDate" disabled colspan="12"></yu-xform-item>
              <yu-xform-item label="期限" ctype="input" name="appTerm" colspan="12" disabled></yu-xform-item>

            </yu-xform-group>
          <yu-panel title="担保合同信息" :hideFilter="false" :collapseHide="false">
            <yu-xtable ref="refguarContTable" row-number :base-params="searchFormdata" border :data="guarContTableData" width="800">
              <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
              <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
              <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
              <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
              <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
              <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
              <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
              <yu-xtable-column label="双录编号" ctype="input" prop="guarIserchNo"></yu-xtable-column>
              <yu-xtable-column label="纸质合同签订日期" :rules="baseFormRules[0]" prop="signDate" ctype="datepicker"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
        </yu-panel></yu-xform>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="sign" :hidden="hiddenFlg">签订</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
export default {
  data: function () {
    return {
      activeName: 'first',
      expandCollapseName: ['base'],
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
      ],
      familyFormRules: [
        {
          validator: yufp.validator.number
        }
      ],
      numberRules: [
        {required: true, message: '必填项', trigger: 'blur'},
        {type: 'number', message: '请输入数字', trigger: 'blur'}
      ],
      phoneRules: [
        {required: true, message: '必填项', trigger: 'blur'},
        {type: 'phone', message: '请输入正确的号码', trigger: 'blur'}
      ],
      emailRules: [
        {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
      ],
      baseFormdata: {},
      familyFormdata: {},
      otherFormdata: {},
      drawData: [],
      repayData: [],
      dialogFormVisibleAdd: false,
      hiddenFlg: false,
      pageParams: {},
      guarContTableData: {},
      disabledflg: false,
      isguarCont: false

    };
  },
  mounted () {
    var _this = this;
    var contNo = _this.$route.meta.params.contNo;
    var contStatus = _this.$route.meta.params.contStatus;

    var oprType = _this.$route.meta.params.oprType;
    var iqpSerno = _this.$route.meta.params.iqpSerno;

    if (oprType == '03' || contStatus == '200') {
      _this.disabledflg = true;
      _this.hiddenFlg = true;
    };
    _this.pageParams = {
      'iqp_serno': iqpSerno
    };
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/retail/queryContInfo',
      data: {
        'contNo': contNo
      },
      callback: function (code, message, response) {
        yufp.clone(response.data.CtrLoanCont, _this.baseFormdata);
        if (response.data.GrtGuarContList.length > 0) {
          _this.guarContTableData = response.data.GrtGuarContList;
          _this.isguarCont = true;
        };
      }
    });
  },
  methods: {
    /**
     * 签订
     */
    sign: function () {
      var _this = this;

      var validate = false;
      _this.$refs.refBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({ message: '尚有必输项未录入！', type: 'warning' });
        return;
      }


      var baseData = {};
      var TableData = {};
      yufp.clone(_this.baseFormdata, baseData);
      if (_this.isguarCont) {
        TableData = _this.guarContTableData;
      } else {
        TableData = null;
      }

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/retail/signCtrLoanCont',
        data: {'CtrLoanCont': baseData, 'GrtGuarContList': TableData},
        callback: function (code, message, response) {
          if (response.data.code == '0000') {
            _this.$message(response.data.msg);
            _this.back();
          } else {
            _this.$message(response.data.msg);
          }
        }
      });
    },
    /**
       * 时间字符串格式化-该方法仅适用与操作时间类型为STD_ZB_CHAGE_TYP
       * date为时间字符串
       * operType为操作时间类型 001-年，002-月，003-日
       * operNum为时间加减天数
       **/
    getTimeOperator (date, operType, operNum) {
      // 将时间字符串转化为时间对象
      if (String(operNum).indexOf('.') != -1) {
        this.$xutils.showMsgBox('提示', '不支持小数部分的日期运算！');
        return;
      }

      let formatDate = date;

      if (operType == '001') {
        // 年份计算
        formatDate = formatDate.setYear(formatDate.getFullYear() + operNum * 1);
      } else if (operType == '002') {
        // 月份计算
        formatDate = formatDate.setMonth(formatDate.getMonth() + operNum * 1);
      } else if (operType == '003') {
        // 日期计算
        formatDate = formatDate.setDate(formatDate.getDate() + operNum * 1);
      }

      const newFormatDate = new Date(formatDate);
      const newDateYear = newFormatDate.getFullYear();
      let newDateMonth = newFormatDate.getMonth() + 1;

      if (newFormatDate.length == 1) {
        newDateMonth = '0' + newDateMonth;
      }

      let newDateDay = newFormatDate.getDate();

      if (newDateDay.length == 1) {
        newDateDay = '0' + newDateDay;
      }

      return this.$xutils.formatDate(new Date(newDateYear + '-' + newDateMonth + '-' + newDateDay));
    },

    /**
     * 返回按钮
     */
    back: function () {
      var _this = this;
      var data = {};
      yufp.clone(_this.baseFormdata, data);
      _this.$xutils.getParentPage(_this, null, 'refresh');
      yufp.router.removeTab('/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContSign/' + data.contNo);
    }
  }
};
</script>
