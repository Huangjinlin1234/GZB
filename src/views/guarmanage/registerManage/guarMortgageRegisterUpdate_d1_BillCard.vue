<template>
  <div>
    <div id="d1_BillCard">
      <div id="d1_BillCardContent">
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
          <yu-panel title="基本信息"  :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="申请流水号"  placeholder="申请流水号" rules="required" name="serno" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="抵押办理类型"  placeholder="请选择" rules="required" name="regType" data-code="STD_REG_TYPE" ctype="select" disabled></yu-xform-item>
              <yu-xform-item label="担保合同编号"  placeholder="担保合同编号" rules="required" name="guarContNo" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="担保合同类型"  placeholder="请选择" rules="required" name="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE" ctype="select" disabled></yu-xform-item>
              <yu-xform-item label="担保方式"  placeholder="请选择" rules="required" name="guarWay" data-code="STD_ZB_GUAR_WAY" ctype="select" disabled></yu-xform-item>
              <yu-xform-item label="担保金额"  placeholder="担保金额" rules="required" name="guarAmt" ctype="num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="是否在线办理"  placeholder="请选择" rules="required" name="isRegOnline" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
              <yu-xform-item label="是否先放款后抵押"  placeholder="请选择" rules="required" name="beforehandInd" data-code="STD_ZB_YES_NO"  ctype="select"></yu-xform-item>
              <yu-xform-item label="抵押注销类型"  placeholder="请选择" rules="required" name="regSubType" data-code="STD_REG_SUB_TYPE" ctype="select" hidden></yu-xform-item>
              <yu-xform-item label="客户编号"  placeholder="客户编号" rules="required" name="cusId"  ctype="input" disabled hidden></yu-xform-item>
              <yu-xform-item label="客户名称"  placeholder="客户名称" rules="required" name="cusName"  ctype="input" disabled hidden></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="主合同编号"  placeholder="主合同编号" rules="required" name="mainContNo" ctype="input" :on-icon-click="onIconClickFn" icon="search"></yu-xform-item>
              <yu-xform-item label="核心担保编号"  placeholder="核心担保编号" name="coreGuarantyNo" ctype="input" disabled v-if="coreGuarantyNoVisable"></yu-xform-item>
              <yu-xform-item label="是否还款即解押" ctype="select" rules="required" placeholder="请选择" name="isRepayRemoveGuar" data-code="STD_ZB_YES_NO" v-if="isRepayRemoveGuarVisable"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="1">
              <yu-xform-item label="申请原因"  placeholder="申请原因" name="regReason" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="押品信息" :hideFilter="false" :collapseHide="false">
            <yu-xtable ref="refTable" :data="tableData" request-type="POST" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :default-load="false">
              <yu-xtable-column label="押品统一编号" prop="guarNo"></yu-xtable-column>
              <yu-xtable-column label="权证编号" prop="warrantNo"></yu-xtable-column>
              <yu-xtable-column label="核心担保编号" prop="coreGuarantyNo"></yu-xtable-column>
              <yu-xtable-column label="抵质押标识" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
              <yu-xtable-column label="担保分类名称" prop="guarTypeCdName"></yu-xtable-column>
              <yu-xtable-column label="抵质押物名称" prop="pldimnMemo"></yu-xtable-column>
              <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
              <yu-xtable-column label="押品评估价值" prop="evalAmt"></yu-xtable-column>
              <yu-xtable-column label="担保分类代码" prop="guarTypeCd" hide-column></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item  label="登记人"  placeholder="登记人" rules="required" name="inputId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="登记人"  placeholder="登记人" rules="required" name="inputIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="登记机构"  placeholder="登记机构" rules="required" name="inputBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="登记机构"  placeholder="登记机构" rules="required" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="登记日期"  placeholder="登记日期" rules="required" name="inputDate" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="最近修改人"  placeholder="最近修改人" rules="required" name="updId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="最近修改机构"  placeholder="最近修改机构" rules="required" name="updBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="最后修改日期"  placeholder="最后修改日期" rules="required" name="updDate" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="操作类型"  placeholder="操作类型" rules="required" name="oprType" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="创建时间"  placeholder="创建时间" rules="required" name="createTime" ctype="datepicker" hidden></yu-xform-item>
              <yu-xform-item  label="主管客户经理"  placeholder="主管客户经理" rules="required" name="managerId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="主管客户经理"  placeholder="主管客户经理" rules="required" name="managerIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="主管机构"  placeholder="主管机构" rules="required" name="managerBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="主管机构"  placeholder="主管机构" rules="required" name="managerBrIdName" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </div>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_REG_TYPE,STD_GRT_TYPE,STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_GUAR_TYPE,STD_ZB_GUAR_CONT_TYPE,STD_GRT_FLAG');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      isRepayRemoveGuarVisable: false,
      coreGuarantyNoVisable: false,
      formdata: { },
      tableData: [],
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      pkField: 'serno',
      baseParams: {},
      baseDYParams: {},
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
  methods: {
    execBillCardDefaultValueFormula: function () {
      if (!(this.formdata.hasOwnProperty('serno') && this.formdata.serno != '' && this.formdata.serno != null)) {
        this.formdata.serno = this.$xutils.getSEQWithParamFromServer('COOP_SERNO');
      }
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.managerIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
    },
    //setGuarTypeCdName: function(row,column){
    //  return 
    //}
    onIconClickFn: function () {
      this.$parent.selectMainCont();
    }  
  },
  created () {
    var _this = this; 
    var guarContNo = '';
    var regType = this.$parent.params && this.$parent.params.regType;

    if (!regType) {
      regType = this.$parent.wfData.flowParam && this.$parent.wfData.flowParam.regType;
      guarContNo = this.$parent.wfData.flowParam.guarContNo;
    }

    if (regType === '02'){
      if (!guarContNo || guarContNo == '') {

        if (this.$parent.params.guarCont) {
          guarContNo = this.$parent.params.guarCont.guarContNo;
        } else {
          guarContNo = this.$parent.params.guarContNo;
        }
  
        if(!guarContNo || guarContNo == ''){
          this.$request({
            url: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/queryGuarMBySerno',
            method: 'post',
            data: this.$parent.params.serno
          }).then((response) => {
            if (response.code === '0') {
              guarContNo = response.data.guarContNo;
              // 抵押注销新增、修改、查看页面要增加是否还款即解押字段
              _this.isRepayRemoveGuarVisable = true;
              _this.coreGuarantyNoVisable = true;
              this.$request({
                url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/selectcoreguarantynobyguarcontno',
                method: 'post',
                data: guarContNo
              }).then((response) => {
                if (response.code === '0') {
                  this.formdata.coreGuarantyNo = response.data;
                } else {
                  this.$xutils.showMsgBox('提示', response.message, 350, 150);
                }
              });
              } else {
                this.$xutils.showMsgBox('提示', response.message, 350, 150);
              }
            });
        } else {
          // 抵押注销新增、修改、查看页面要增加是否还款即解押字段
          _this.isRepayRemoveGuarVisable = true;
          _this.coreGuarantyNoVisable = true;
          this.$request({
            url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/selectcoreguarantynobyguarcontno',
            method: 'post',
            data: guarContNo
          }).then((response) => {
            if (response.code === '0') {
              this.formdata.coreGuarantyNo = response.data;
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          });
        }
      } else {
         // 抵押注销新增、修改、查看页面要增加是否还款即解押字段
          _this.isRepayRemoveGuarVisable = true;
          _this.coreGuarantyNoVisable = true;
          this.$request({
            url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/selectcoreguarantynobyguarcontno',
            method: 'post',
            data: guarContNo
          }).then((response) => {
            if (response.code === '0') {
              this.formdata.coreGuarantyNo = response.data;
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          });
      } 
    }
  }
};
</script>
