<!--
<template>
    <div >
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="资产情况" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled v-if="show"></yu-xform-item>
            <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveySerno" disabled ></yu-xform-item>
            <yu-xform-item label="资产性质" ctype="select" name="assetCha" rules="required" data-code="STD_XD_YQD_ASSET_TYPE" placeholder="资产性质"></yu-xform-item>
            <yu-xform-item label="资产说明" ctype="input" placeholder="资产说明" name="assetExpl" rules="required"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>

    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
-->
<script>

// export default {
//   components: {},
//   props: {
//     pageParams: Object,
//     dialogId: String
//   },
//   data () {
//     return {
//       updateUrl: this.$backend.cmisBiz + '/api/lmtdebitassetmemo/update',
//       addUrl: this.$backend.cmisBiz + '/api/lmtdebitassetmemo/',
//       formdata: {},
//       formType: 'edit',
//       formRules: {},
//       imageUrls: {},
//       File: {}
//     };
//   },
//   mounted () {
//     this.afterInit();
//   },
//   methods: {
//     /* 新增界面 下一步/取消按钮*/
//     afterInit () {
//       this.formdata.surveySerno = this.pageParams.surveySerno;
//     },

//     /* 保存按钮*/
//     doNextStep () {
//       // 先进行校验
//       // const validateFlag = this.d1_BillCard.validateBillCardValue();
//       // if (!validateFlag) {
//       //   return;
//       // }
//       this.$request({
//         method: 'POST',
//         url: backend.cmisBiz + '/api/lmtdebitassetmemo/saveorupdate',
//         data: this.formdata
//       }).then((res) => {
//         // 请求成功
//         if (res.data == 1) {
//           // 操作成功
//           this.$message({ message: '保存成功', type: 'success' });
//           this.$refs.refTable.remoteData();
//         } else {
//           // 操作失败
//           this.$message({ message: '保存失败', type: 'warning' });
//         }
//       });


//       // this.$dialog.close(this.dialogId);
//       // 弹出提示
//       // YuXP.closeDialog();
//     },

//     cancel () {
//       this.$dialog.close(this.dialogId);
//     }
//   }
// };
</script>
