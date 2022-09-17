<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" v-model="formdata" :rules="formRules" >
        <yu-xform-group :column="3">
          <yu-xform-item label="评价任务ID" ctype="input" placeholder="评价任务ID" name="evalTaskId" disabled></yu-xform-item>
          <yu-xform-item label="押品统一编号 " ctype="input" placeholder="押品统一编号 " name="guarNo" disabled></yu-xform-item>
          <yu-xform-item label="押品分类代码" ctype="input" placeholder="押品分类代码" name="guarClassCode" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="yu-xcustom-ref" name="guarClassName"  placeholder="押品分类名称" @select-fn="commonSelectFn" :mapping="{'guarTypeCdCnname':'guarClassName','guarTypeCd':'guarClassCode'}" width="80%" height="550" :parms="{'guarTypeState':'0'}" :selectionType="radio" pagePath="guarmanage/collateralInfo/guarRef/guarClassRefDialogIndex" title="自定义参照Title" disabled></yu-xform-item>
          <yu-xform-item label="外部评估机构" ctype="input" placeholder="外部评估机构" name="evalOutOrgName" disabled></yu-xform-item>
          <yu-xform-item label="任务发起行" ctype="input" placeholder="任务发起行" name="evalTaskStartOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="任务发起日期" ctype="input" placeholder="任务发起日期" name="taskStartDate" disabled></yu-xform-item>
          <yu-xform-item label="任务结束日期" ctype="input" placeholder="任务结束日期" name="tastEndDate" disabled></yu-xform-item>
          <yu-xform-item label="任务发起人" ctype="input" placeholder="任务发起人" name="evalTaskStartName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="评估任务完成行" ctype="input" placeholder="评估任务完成行" name="evalTaskEndOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="评分" ctype="yu-num" name="evalScore" placeholder="评分" :precision="2" :min="0" rules="required"></yu-xform-item>
          <yu-xform-item label="评价状态" ctype="select" name="evalStatus" data-code="STD_ZB_EVAL_STATUS" placeholder="评价状态"  hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSave()" v-norepeat.loading>保存</yu-button>
      <yu-button type="primary" @click="onClose()">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_EVAL_STATUS")
import mixinUtils from "@/utils/mixins/mixin-utils"
export default {
  components:{},
  mixins:[mixinUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevaloutorgscore/update",
      addUrl: this.$backend.cmisEval + "/api/guarevaloutorgscore/",
      formdata : {},
      formType : 'edit',
      formRules: { },
    }
  },

  mounted() {
    const _this = this;
    _this.$xutils.clone(_this.pageParams, _this.formdata);

    let userInfo = _this.$store.state.oauth;
    _this.formdata.tastEndDate = _this.$xutils.dateFormat("yyyy-MM-dd", new Date())
    _this.formdata.evalTaskEndOrg = userInfo.org.code;
    _this.formdata.evalTaskEndOrgName = userInfo.org.name;

  },
  methods:{
    //保存
    onSave() {
      const _this = this ;
      _this.formdata.evalStatus = '02'
      console.log(_this.formdata)
      _this.doSaveBillCardData("refForm", _this.$backend.cmisEval + '/api/guarevaloutorgscore/updateEvalScore', null, () => {
        _this.$dialog.close(_this.dialogId);
      });
    },

    // 直接关闭
    onClose() {
      const _this = this ;
      _this.$dialog.close(_this.dialogId)
    },

    sendConfirm() {
      const _this = this ;
      let rsPars = {};

      _this.$request({
        // 同步请求
        async: false,

        url: _this.$backend.cmisEval + '/api/guarevaloutorgscore/updateEvalScore',
        data: JSON.stringify(_this.$xutils.toUpperCase(_this.getBillCardValue(), true)),

        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['data'] = response.data;
          }

          rsPars['handleFlag'] = true;

          if (response.code != '0') {
           // _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            _this.$message.error('错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },

        error: (result, status, errorThrown) => {
         // _this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + errorThrown); // 弹出提示
          _this.$message.error(result);

          rsPars['handleFlag'] = false;
        }
      });

      return rsPars;
    }
  }
};
</script>
