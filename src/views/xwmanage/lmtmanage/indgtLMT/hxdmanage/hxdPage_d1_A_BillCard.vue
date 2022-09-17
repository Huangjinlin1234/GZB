<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isDetails">
        <yu-panel title="借款人" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled ></yu-xform-item>
            <yu-button autofocus icon="search" @click="lookCus" >查看</yu-button>
            </yu-xform-group>
              <yu-xform-group :column="2">
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="电话号码" ctype="input" placeholder="电话号码" name="phone" rules="required"></yu-xform-item>
            <yu-xform-item label="学历" ctype="select" name="edu" rules="required" data-code="STD_ZB_EDU" placeholder="学历"></yu-xform-item>
            <yu-xform-item label="居住年限" ctype="input" placeholder="居住年限" name="resiYears" rules="required"></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" @change="remotePo" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况"></yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId"  disabled :hidden="marStatusFlag" key="spouseCusId">  </yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" @change="spouserNameChange" placeholder="配偶姓名" name="spouseName"  :hidden="marStatusFlag"></yu-xform-item>
            <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone"  :hidden="marStatusFlag"></yu-xform-item>
            <yu-xform-item label="配偶证件号码" ctype="input" placeholder="配偶证件号码" name="spouseCertCode"  :hidden="marStatusFlag"> </yu-xform-item>
            <yu-button autofocus icon="search" @click="customClick('doselectCob')" :hidden="marStatusFlag" v-if="lookPage">查询</yu-button>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="调查模式" ctype="select" placeholder="调查模式" name="surveyMode" data-code="STD_SURVEY_MODE" @change="surveyChange" :disabled="isdsr" hidden></yu-xform-item>
            <yu-xform-item label="单人调查流水号" ctype="input" placeholder="单人调查流水号" disabled name="singleSurveySerno" icon="search" :on-icon-click="openDialog" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="livingAddr" disabled hidden></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="livingAddr" disabled hidden></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="isHaveChildren" disabled hidden ></yu-xform-item>
            <yu-xform-item label="是否线上抵押" ctype="input" placeholder="是否线上抵押" name="isOnlinePld" disabled hidden ></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="input" placeholder="担保方式" name="guarMode" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型建议金额" ctype="input" placeholder="模型建议金额" name="modelAdviceAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型建议利率" ctype="input" placeholder="模型建议利率" name="modelAdviceRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="input" placeholder="参考利率" name="refRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议金额" ctype="input" placeholder="建议金额" name="adviceAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="input" placeholder="建议利率" name="adviceRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="input" placeholder="还款方式" name="repayMode" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="input" placeholder="贷款用途" name="loanUse" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否新员工" ctype="select" name="isNewEmployee" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否新员工" @change="isNewEmployeeChange"></yu-xform-item>
            <yu-xform-item label="新员工名称" ctype="input" placeholder="新员工名称" name="newEmployeeName" rules="required" v-if="formdata.isNewEmployee=='1'"></yu-xform-item>
            <yu-xform-item label="新员工电话" ctype="input" placeholder="新员工电话" name="newEmployeePhone" rules="required" v-if="formdata.isNewEmployee=='1'"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-dialog title="单人调查流水号选取" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-xtable index selection-type="radio" ref="dialogtable" :data-url="dataUrl" request-type="POST" style="width: 100%" :base-params="formdata">
        <yu-xtable-column prop="singNo" label="单人调查流水号" width="180px"></yu-xtable-column>
        <yu-xtable-column prop="singDate" label="登记日期"></yu-xtable-column>
      </yu-xtable>
      <div class="button-group" style="text-align:center">
        <yu-button type="primary" @click="selectReturn">选取</yu-button>
      </div>
      </yu-dialog>
    </div>

  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
yufp.lookup.reg('STD_SURVEY_MODE,STD_PRC_ADVICE,STD_ZB_SELFPER_REL_TYP');
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/',
      dataUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/selectSing',
      formdata: {},
      isDetails: true,
      // formType: 'details',
      formRules: { phone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}], resiYears: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}], newEmployeePhone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      dialogTableVisible: false,
      moreFields: [],
      marStatusFlag: true,
      lookPage: false,
      requiredFlg: '',
      hiddenFlg: false,
      isdsr: true
    };
  },
  mounted () {

  },
  methods: {
    remotePo (marStatus) {
      if (marStatus == '20') {
        this.marStatusFlag = false;
      } else {
        this.marStatusFlag = true;
        this.formdata.spouseCusId = null;
        this.formdata.spouseName = null;
        this.formdata.spousePhone = null;
        this.formdata.spouseCertCode = null;
      }
    },
    spouserNameChange (name) {
      if (name != null && name != '') {
        // this.$message({ message: name, type: 'warning' });
      }
    },
    isNewEmployeeChange (isNewEmployee) {
      if (isNewEmployee == '0') {
        this.formdata.newEmployeeName = null;
        this.formdata.newEmployeePhone = null;
      }
    },
    openDialog () {
      this.dialogTableVisible = true;
    },
    selectReturn () {
      var _this = this;

      if (_this.$refs.dialogtable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.formdata.singleSurveySerno = _this.$refs.dialogtable.selections[0].singNo;
      this.dialogTableVisible = false;
    },
    /** 调查模式字段变化检测
     */
    surveyChange (surveyMode) {
      var _this = this;
      if (surveyMode == '01') { // 单人调查模式
        _this.requiredFlg = 'required';
        _this.hiddenFlg = false;
      } else if (surveyMode == '02') { // 双人调查模式
        _this.requiredFlg = '';
        _this.hiddenFlg = true;
      }
    },
    lookCus () {
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = this.formdata.cusId;
      // 个人正式客户创建 B01
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: new Date().getTime(),
        // 页签名称
        title: '个人客户查看',
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
