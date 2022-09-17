<template>
  <div>
    <div id="d1_BillCard">
      <div id="d1_BillCardContent">
        <yu-panel title="基本信息"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm1" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
            <yu-xform-group :column="2">
              <yu-xform-item label="业务流水号"  rules="required" name="serno" ctype="input"  disabled></yu-xform-item>
              <yu-xform-item label="权证出入库申请类型" rules="required" placeholder="请选择" name="warrantAppType" ctype="select" data-code="STD_WARRANT_APP_TYPE" disabled></yu-xform-item>
              <!-- <yu-xform-item label="押品编号"  rules="required" name="guarNo" ctype="input" disabled></yu-xform-item> -->
              <yu-xform-item label="抵质押分类" rules="required" placeholder="请选择" name="grtFlag" ctype="select" data-code="STD_GRT_FLAG" disabled ></yu-xform-item>
              <!-- <yu-xform-item label="押品所有权人编号" rules="required" name="guarCusId"  ctype="input" disabled></yu-xform-item> -->
              <!-- <yu-xform-item label="押品所有权人名称"  rules="required" name="guarCusName"  ctype="input" disabled></yu-xform-item> -->
              <yu-xform-item label="核心担保编号"  rules="required" name="coreGuarantyNo"  ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="权证出库原因大类" rules="required" placeholder="请选择" name="warrantOutType" data-code="STD_ZB_EXWA_TYP" ctype="select" disabled></yu-xform-item>
              <yu-xform-item label="权证出库原因细类" :rules="{ required: requiredFlag1}" placeholder="请选择" name="warrantOutTypeSub" data-code="STD_WARRANT_OUT_TYPE_SUB" ctype="select" disabled></yu-xform-item>
              <yu-xform-item label="抵质押物类型" ctype="select" :rules="{ required: requiredFlag5}" placeholder="请选择" name="gagTyp" data-code="STD_ZB_GUAR_TYPE_CD" disabled></yu-xform-item>
              <yu-xform-item label="是否出库到集中作业" rules="required" placeholder="请选择" name="isZhblzx" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
              <yu-xform-item label="权证预计归还时间" :rules="{ required: requiredFlag3}" name="preBackDate" ctype="datepicker" value-format="yyyy-MM-dd" :hidden="!(formdata.warrantOutTypeSub == '04' || formdata.warrantOutTypeSub == '05')"></yu-xform-item>
              <yu-xform-item label="权证入库模式" rules="required" placeholder="请选择" ctype="select"  name="warrantInType"  data-code="STD_WARRANT_IN_TYPE" hidden></yu-xform-item>
              <yu-xform-item label="权证编号"  rules="required" name="warrantNo" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="审批状态" rules="required" placeholder="请选择" name="approveStatus"  data-code="STD_ZB_APPR_STATUS" ctype="select" hidden></yu-xform-item>
              <yu-xform-item label="核心抵质押品出入库返回交易流水" rules="required" name="hxSerno" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="核心抵质押品出入库返回交易日期" rules="required" name="hxDate" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="核心担保品序号"  rules="required" name="coreGuarantySeq"  ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="是否还款即解押"  ctype="select" :rules="{ required: requiredFlag4}" placeholder="请选择" name="isRepayRemoveGuar" data-code="STD_ZB_YES_NO"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="1">
              <yu-xform-item label="备注" placeholder="备注" name="remark" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="押品信息" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refTable" :data="tableData" request-type="POST" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :default-load="false">
            <yu-xtable-column label="押品统一编号" prop="guarNo"></yu-xtable-column>
            <yu-xtable-column label="抵质押标识" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
            <yu-xtable-column label="担保分类名称" prop="guarTypeCd" :formatter="guarTypeCdFormatter"></yu-xtable-column>
            <yu-xtable-column label="抵质押物名称" prop="pldimnMemo"></yu-xtable-column>
            <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
            <yu-xtable-column label="押品评估价值" prop="evalAmt"></yu-xtable-column>
            <yu-xtable-column label="担保分类代码" prop="guarTypeCd" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="权证信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm2" label-width="120px" :form-type="formType" v-model="formdata2">
            <yu-xform-group :column="2">
              <yu-xform-item label="权证编号"  name="warrantNo" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="权证名称"  name="warrantName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="权证类别"  name="certiCatalog" ctype="select" data-code="STD_ZB_CERTI_CATALOG" disabled></yu-xform-item>
              <yu-xform-item label="权证类型"  name="certiTypeCd" ctype="select" data-code="STD_ZB_CERTI_TYPE_CD" disabled></yu-xform-item>
              <yu-xform-item label="权证发证机关"  name="certiOrgName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="权证登记日期"  name="warrantInputDate" ctype="datepicker" value-format="yyyy-MM-dd" disabled></yu-xform-item>
              <yu-xform-item label="权证发证日期"  name="certiStartDate" ctype="datepicker" value-format="yyyy-MM-dd" disabled></yu-xform-item>
              <yu-xform-item label="权证到期日期"  name="certiEndDate" ctype="datepicker" value-format="yyyy-MM-dd" disabled></yu-xform-item>
              <yu-xform-item label="权利价值"  name="certiAmt" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="权利凭证号"  name="certiRecordId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="账务机构"  name="finaBrId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="是否电子权证"  name="isEWarrant" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm3" label-width="120px" :form-type="formType" v-model="formdata3">
            <yu-xform-group :column="2">
              <yu-xform-item  label="登记人"  placeholder="登记人" name="inputId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="登记人"  placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="登记机构"  placeholder="登记机构" name="inputBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="登记机构"  placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="登记日期"  placeholder="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="最近修改人"  placeholder="最近修改人" name="updId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="最近修改机构"  placeholder="最近修改机构" name="updBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="最后修改日期"  placeholder="最后修改日期" name="updDate" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="操作类型"  placeholder="操作类型" name="oprType" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="创建时间"  placeholder="创建时间" name="createTime" ctype="datepicker" hidden></yu-xform-item>
              <yu-xform-item  label="主管客户经理"  placeholder="主管客户经理" name="managerId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="主管客户经理"  placeholder="主管客户经理" name="managerIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="主管机构"  placeholder="主管机构" name="managerBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="主管机构"  placeholder="主管机构" name="managerBrIdName" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </div>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_WARRANT_IN_TYPE,STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_ZB_GUAR_TYPE_CD');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      formdata: {},
      formdata2: {},
      formdata3: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      pkField: 'serno',
      baseParams: {},
      requiredFlag1: true,
      requiredFlag3: true,
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
      ],
      DZDataObject: {}      
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      if (!(this.formdata.hasOwnProperty('serno') && this.formdata.serno != '' && this.formdata.serno != null)) {
        this.formdata.serno = this.$xutils.getSEQWithParamFromServer('COOP_SERNO');
      }
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata3.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata3.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata3.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata3.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata3.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata3.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata3.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata3.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata3.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata3.managerIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata3.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');

      // 获取登入信息
      let loginUserInfo = this.$xutils.getLoginUserInfo();
      let _this = this;
      let isSmallManager = false;
      loginUserInfo.roles.every(function (_item, _index) {
        _this.roleCode = _item.code;
        // code 角色标识 R0010-小微客户经理
        if (_item.code == 'R0010') {
          isSmallManager = true;
        } else {
          isSmallManager = false;
        }
      });
      if (this.formdata.isEWarrant === '1' && !isSmallManager) {
        this.formdata.isZhblzx = '1';
        this.$refs.refForm1.setItemDisabled('isZhblzx', true);
      }
    },
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    }
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      async: false,
      data: {
        optType: 'STD_DZY_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data.data, this.DZData);
        console.log("res.data------------->", res.data);
      }
    });
  }
};
</script>