
<template>
  <!--
    @created by hubp
    @updated by
    @description
  -->
  <div class="blank_template">
     <!-- 担保合同页面 -->
    <yu-tab-pane label="担保合同" name="two">
        <yu-form-buttons align="left">
          <yu-button @click="dialogFormVisibleAdd = true" type="primary" size="small">添加担保合同</yu-button>
          <yu-button @click="repayAdd" type="primary" size="small">引入担保合同</yu-button>
          <yu-button @click="repayAdd" type="primary" size="small">修改</yu-button>
          <yu-button @click="repayAdd" type="primary" size="small">删除</yu-button>
          <yu-button @click="repayAdd" type="primary" size="small">查看</yu-button>
        </yu-form-buttons>
        <yu-xtable ref="refRepayTable" row-number border :data="repayData" width="800">
          <yu-xtable-column prop="repayDate" width="300" align="center" ctype="index"></yu-xtable-column>
          <yu-xtable-column label="担保合同编号" prop="repayDate" width="300" align="center"></yu-xtable-column>
          <yu-xtable-column label="担保合同类别" prop="repayDate" width="300" align="center"></yu-xtable-column>
          <yu-xtable-column label="担保人名称" prop="repayAmt" width="300" align="center"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="repayDate" width="300" align="center"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="repayDate" width="300" align="center"></yu-xtable-column>
          <yu-xtable-column label="本次占用担保金额（元）" prop="repayAmt" width="300" align="center"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="repayDate" width="300" align="center"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="担保合同(添加)" :visible.sync="dialogFormVisibleAdd">
          <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="担保合同类型" ctype="select" name="contNo"></yu-xform-item>
              <yu-xform-item label="担保方式" ctype="select" name="prdId"></yu-xform-item>
              <yu-xform-item label="担保合同编号" ctype="input" name="contAmt"></yu-xform-item>
              <yu-xform-item label="主合同编号" ctype="input" name="prdName"></yu-xform-item>
              <yu-xform-item label="主合同类型" ctype="input" name="loanUse"></yu-xform-item>
              <yu-xform-item label="是否浮动抵押" ctype="select" name="curType"></yu-xform-item>
              <yu-xform-item label="担保币种" ctype="input" name="contMode"></yu-xform-item>
              <yu-xform-item label="抵押顺位" ctype="input" name="onlinePldFlag"></yu-xform-item>
              <yu-xform-item label="担保起始日" ctype="input" name="contTerm"></yu-xform-item>
              <yu-xform-item label="担保终止日" ctype="input" name="endDate0"></yu-xform-item>
              <yu-xform-item label="担保合同金额" ctype="select" name="contMode"></yu-xform-item>
              <yu-xform-item label="担保合同状态" ctype="select" name="onlinePldFlag"></yu-xform-item>
              <yu-xform-item label="签订日期" ctype="input" name="contTerm"></yu-xform-item>
              <yu-xform-item label="其他约定" ctype="input" name="endDate0"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="其他信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="登记人" ctype="input" name="inputId" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled></yu-xform-item>
              <yu-xform-item label="登记人电话" ctype="input" name="inputIdPhone" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerBrId" disabled></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerId" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <div slot="footer" class="dialog-footer">
            <yu-button @click="dialogFormVisible = false">取 消</yu-button>
            <yu-button type="primary" @click="dialogFormVisible = false">确 定</yu-button>
          </div>
        </yu-xdialog>
      </yu-tab-pane>
  </div>
</template>
<script>
export default {
  data: function () {
    return {};
  }
};
</script>
