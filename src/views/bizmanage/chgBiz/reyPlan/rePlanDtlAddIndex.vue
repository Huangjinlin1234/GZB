<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata">
        <yu-xform-group :column="4">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno"></yu-xform-item>
          <yu-xform-item label="期数" ctype="yu-num" name="times" placeholder="期数" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="计划还款日期" ctype="datepicker" name="planRepayDate" value-format="yyyy-MM-dd" placeholder="计划还款日期"></yu-xform-item>
          <yu-xform-item label="计划应还款本金" ctype="yu-currency" name="planAmt" placeholder="计划应还款本金" :min="0" ></yu-xform-item>
          <yu-xform-item label="操作类型 " ctype="input" placeholder="操作类型 " name="oprType" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
/** 还款计划变更新增页面**/
let par = {};
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqprepayplandtl/update',
      addUrl: this.$backend.cmisBiz + '/api/iqprepayplandtl/',
      formdata: {},
      formType: 'edit',
      formRules: { }
    };
  },
  mounted () {
    yufp.clone(this.pageParams, this.formdata);
  },
  methods: {
    // 下一步操作
    // 保存+跳转修改页面
    save () {
      const selPars = this.formdata;
      const pk = this.$xutils.getSEQWithParamFromServer('PK_VALUE');

      const iqpRepayPlanDtl = {
        'pk_id': pk,
        'iqpSerno': selPars.iqpSerno,
        'times': selPars.times,
        'planRepayDate': selPars.planRepayDate,
        'planAmt': selPars.planAmt,
        'oprType': '01'
      };

      this.$xutils.request({
        // 同步请求insertIqpRepayWayChgByBillNo
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/iqprepayplandtl/saveReyPlanDtl',
        data: JSON.stringify(iqpRepayPlanDtl),
        success: (response, status, xhr) => {
          if (response.data != null && response.data > 0) {
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
              // 刷新父级页面数据
              this.$xutils.getParentPage(
                this,
                'd1_B_A_BillList',
                'queryDataByCondition',
                {iqpSerno: par.iqpSerno}
              );
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        }
      });
    },

    // 返回操作
    cancel () {
      // 刷新父级页面数据
      this.$xutils.getParentPage(this, null, 'refreshBillListData');
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
