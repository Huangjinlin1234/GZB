<template>
  <div>
    <yu-panel title="贴现汇票明细" :hideFilter="false" :collapseHide="false" :disabled="isDisabledFlg">
      <yu-toolbar>
        <yu-button ref="btn_doAdd" @click="customClick('doAdd')" v-if="isHidden">新增</yu-button>
        <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')" v-if="isHidden">修改</yu-button>
        <yu-button ref="btn_doDel" @click="customClick('doDel')" v-if="isHidden">删除</yu-button>
        <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        <yufp-excel-export :export-url="exportTemplateUrl" title="模板下载" v-if="isHidden"></yufp-excel-export>
        <yufp-excel-import :import-url="excelImportUrl" title="批量导入" max-file-size="10" @import-success="doAutoQuery" :biz-data-params="bizDataParams" v-if="isHidden"></yufp-excel-import>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="票据号码" prop="drftNo"></yu-xtable-column>
        <yu-xtable-column label="票面金额" prop="drftAmt"></yu-xtable-column>
        <yu-xtable-column label="到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="出票人" prop="drwr"></yu-xtable-column>
        <yu-xtable-column label="收款人" prop="pyee"></yu-xtable-column>
        <yu-xtable-column label="承兑人" prop="accptr"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitleForm" :visible.sync="dialogVisibleForm" width="650px">
      <yu-xform ref="refForm" label-width="120px" form-type="details" v-model="formdata">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="票据号码" ctype="input" placeholder="票据号码" name="drftNo"></yu-xform-item>
          <yu-xform-item label="票面金额" ctype="" name="drftAmt" placeholder="票面金额"></yu-xform-item>
          <yu-xform-item label="到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" placeholder="到期日"></yu-xform-item>
          <yu-xform-item label="出票人" ctype="input" placeholder="出票人" name="drwr"></yu-xform-item>
          <yu-xform-item label="收款人" ctype="input" placeholder="收款人" name="pyee"></yu-xform-item>
          <yu-xform-item label="承兑人" ctype="input" placeholder="承兑人" name="accptr"></yu-xform-item>
          <yu-xform-item label="操作类型   std_zb_op" ctype="input" placeholder="操作类型   std_zb_op" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  components: { YufpDemoSelector, YufpExcelExport, YufpExcelImport },
  mixins: [mixinList],
  data: function () {
    return {
      dialogTitleForm: '查看',
      dialogVisibleForm: false,
      formdata: {},
      isHidden: true,
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: '',
      baseParams: {},
      bizDataParams: {},
      exportTemplateUrl: backend.cmisBiz + '/api/iqpdiscapppordersub/exportIqpDiscAppPorderSubTemp',
      excelImportUrl: backend.cmisBiz + '/api/iqpdiscapppordersub/importIqpDiscAppPorderSub',
      deleteUrl: this.$backend.cmisBiz + '/api/iqpdiscapppordersub/delete/',
      isDisabledFlg: false
    };
  },
  created () {
    var _this = this;
    var selfPars = {};
    var op = '';
    if (_this.getFactory().contextData.instanceInfo) {
      selfPars = _this.getFactory().contextData.instanceInfo;
      op = 'VIEW';
    } else if (_this.$route.meta.params) {
      selfPars = _this.$route.meta.params;
      op = selfPars.op;
    } else {
      selfPars = _this.getFactory().contextData;
      op = selfPars.op;
    }
    _this.dataUrl = this.$backend.cmisBiz + '/api/iqpdiscapppordersub/selectlist';
    _this.bizDataParams = {condition: JSON.stringify({serno: selfPars.biz_serno || selfPars.bizId})};
    _this.baseParams = {condition: JSON.stringify({serno: selfPars.biz_serno || selfPars.bizId})};
  },
  methods: {
    onBillListView () {
      let rowData = this.$refs.refTable.selections;
      if (rowData.length === 0) {
        this.$msgbox({
          message: '请先选择一条记录!',
          type: 'warning',
          showConfirmButton: true
        });
        return;
      }
      this.dialogVisibleForm = true;
      this.$nextTick(() => {
        this.$refs.refForm.resetFields();
        this.$utils.clone(rowData[0], this.formdata);
      });
    }
  }
};
</script>
