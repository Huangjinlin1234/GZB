<template>
  <div>
    <yu-panel title="交易对手信息" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable1" request-type="POST"  :base-params="baseParams" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务主键号" prop="bizSerno" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="是否线上" prop="isOnline" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="交易对手账号" prop="toppAcctNo"></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
        <yu-xtable-column label="交易对手金额" prop="toppAmt"></yu-xtable-column>
        <yu-xtable-column label="是否本行账户" prop="isBankAcct" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="开户行行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog title="提示"  size="tiny" :visible.sync="dialogVisible">

    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="业务主键号" ctype="input" placeholder="业务主键号" name="bizSerno" rules="required" disabled :colspan="24" hidden></yu-xform-item>
          <yu-xform-item label="业务场景" ctype="input" placeholder="业务场景" name="bizSence" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="是否本行账户" ctype="select" name="isBankAcct" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否本行账户" :colspan="24" @change="isBankAcctOnChange" ></yu-xform-item>
          <yu-xform-item label="是否线上" ctype="select" name="isOnline" data-code="STD_ZB_YES_NO" placeholder="是否线上" :colspan="24" disabled></yu-xform-item>
          <yu-xform-item label="交易对手账号" ctype="input" placeholder="交易对手账号" name="toppAcctNo" rules="required" :colspan="24" :hidden="isOnlineFlg"></yu-xform-item>
            <yu-xform-item label="交易对手账号" rules="required" placeholder="交易对手账号" name="toppAcctNo" ctype="input" :hidden="!isOnlineFlg"  suffix-icon="el-icon-search" :colspan="24"  @suffix-click="searchToppAcctNo" > </yu-xform-item>
          <yu-xform-item label="交易对手名称" ctype="input" placeholder="交易对手名称" name="toppName" rules="required" :disabled="isOnlineFlg" :colspan="24"></yu-xform-item>
          <yu-xform-item label="交易对手金额" ctype="input" placeholder="交易对手金额" name="toppAmt" rules="required" :colspan="24"></yu-xform-item>

          <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="acctsvcrNo" :rules="formdata.isBankAcct == 1 ? rule[1] : rule[0]" :hidden="formdata.isBankAcct == 1" :colspan="24" :on-icon-click="openBankDialog" icon="search"></yu-xform-item>
          <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName" :rules="formdata.isBankAcct == 1 ? rule[1] : rule[0]" :hidden="formdata.isBankAcct == 1" :colspan="24"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="savedata">确定</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>

</yu-xdialog>


<yu-xdialog title="选择开户行行号行名" :width="2000" :visible.sync="bankDialogVisible">
  <div>
    <yu-xform ref="refBankForm" form-type="search" v-model="searchFormdata" related-table-name="dialogtable" label-width="120px">
      <yu-xform-group :column="2">
        <yu-xform-item label="行名" ctype="input" placeholder="行名" name="bankName"  fuzzy-query="both"></yu-xform-item>
        <yu-xform-item label="地区代码" ctype="input" placeholder="地区代码" name="areaCode"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <div class="button-group" style="text-align:left">
        <yu-button type="primary" @click="selectReturn">选取返回</yu-button>
      </div>
    <yu-xtable ref="dialogtable" row-number condition-key="condition" selection-type="radio" @cell-click="onCellClick" :pageable="true" :data-url="bankDataUrl" :base-params="{ condition: { oprType: '01' } }" :default-load="true">
      <yu-xtable-column label="行号" prop="bankNo"></yu-xtable-column>
      <yu-xtable-column label="行名" prop="bankName"></yu-xtable-column>
      <yu-xtable-column label="行政地区" prop="areaName" width="100"></yu-xtable-column>
      <yu-xtable-column label="地区代码" prop="areaCode"></yu-xtable-column>
      <yu-xtable-column label="联系电话" prop="phone"></yu-xtable-column>
      <yu-xtable-column label="邮政编码" prop="postcode"></yu-xtable-column>
      <yu-xtable-column label="地址" prop="addr"></yu-xtable-column>
      <yu-xtable-column label="上级行" prop="superBankNo" width="100"></yu-xtable-column>
      <yu-xtable-column label="责任人" prop="userName"></yu-xtable-column>
      <yu-xtable-column label="责任机构" prop="orgName"></yu-xtable-column>
    </yu-xtable>
  </div>
</yu-xdialog>

  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      rule: [
        {required: true, message: '请输入'},
        {required: false}
      ],
      formdata: {},
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/toppacctsub/selectbymodel',
      baseParams: {condition: {bizSerno: this.pageParams.contNo, oprType: '01'}},
      deleteUrl: this.$backend.cmisBiz + '/api/toppacctsub/delete/',
      lookPage: false,
      isOnlineFlg: false,
      // 开户行行号行名
      bankDialogVisible: false,
      bankDataUrl: this.$backend.cmisCfg + '/api/cfgbankinfo/',
      searchFormdata: {}
    };
  }
};
</script>