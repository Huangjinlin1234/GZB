<template>
  <div>
 <yu-panel title="" :hideFilter="true" :collapseHide="true">
    <yu-xform ref="form" label-width="150px" v-model="form" :form-type="formType">
      <yu-xform-group>
          <yu-xform-item placeholder="勘验流水号" label="勘验流水号" ctype="input" name="inspectSerno" disabled ></yu-xform-item>
          <yu-xform-item placeholder="勘验人" label="勘验人" ctype="input" name="inspector"  rules="required"></yu-xform-item>
          <yu-xform-item placeholder="勘验人证件类型" label="勘验人证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" name="inspectorCertType"  rules="required"></yu-xform-item>
          <yu-xform-item placeholder="勘验人证件号码" label="勘验人证件号码" ctype="input" name="inspectorCertCode"  rules="required"></yu-xform-item>
          <yu-xform-item placeholder="抵押物编号" label="抵押物编号" ctype="input" name="cloudEvalNo" icon="search" :on-icon-click="openDialog"   rules="required"></yu-xform-item>
          <yu-xform-item placeholder="小区名称" label="小区名称" ctype="input" name="buildingName" disabled rules="required"></yu-xform-item>
          <yu-xform-item placeholder="楼栋" label="楼栋" ctype="input"  name="building" disabled rules="required"></yu-xform-item>
          <yu-xform-item placeholder="面积(㎡)" label="面积(㎡)" ctype="input" name="squ" disabled rules="required"></yu-xform-item>
          <yu-xform-item placeholder="勘验状态" label="勘验状态" ctype="input" name="oprType" disabled v-if="show" rules="required" data-code="STD_INQUEST_STATUS"></yu-xform-item>
          <yu-xform-item placeholder="操作类型" label="操作类型" ctype="input" name="inspectStatus" disabled v-if="show" rules="required"></yu-xform-item>
          <yu-xform-item placeholder="地址" label="地址" ctype="input" name="addr" disabled rules="required"></yu-xform-item>
          <yu-xform-item placeholder="所有人" label="所有人" ctype="input" name="pawnOwner" rules="required"></yu-xform-item>
          <yu-xform-item placeholder="视频流水号" label="视频流水号" ctype="input" name="videoSerno"></yu-xform-item>

      </yu-xform-group>
    </yu-xform>
</yu-panel>
    <!--  弹窗部分 选取合同使用-->
    <!-- Table -->
  <div class="button-group" style="text-align:center">
        <yu-button type="primary" @click="onSubmit"  v-if="saveButton">保存</yu-button>
        <yu-button @click="backtrack">返回</yu-button>
  </div>


    <yu-dialog title="云评估数据选取" :visible.sync="dialogTableVisible" :min-height="800" center="true">

      <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true">
        <yu-xform-group :column="2">
          <yu-xform-item placeholder="楼盘名称" label="楼盘名称" ctype="input" name="buildingName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>

      <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" request-type="POST" style="width: 100%" condition-key="condition">
      <yu-xtable-column prop="pkId" label="主键" v-if="show"></yu-xtable-column>
        <yu-xtable-column prop="buildingName" label="楼盘名称"></yu-xtable-column>
        <yu-xtable-column prop="building" label="楼栋" ></yu-xtable-column>
        <yu-xtable-column prop="floor" label="楼层"></yu-xtable-column>
        <yu-xtable-column prop="roomNo" label="房间号"></yu-xtable-column>
        <yu-xtable-column prop="assEvaAmt" label="估价"></yu-xtable-column>
        <yu-xtable-column prop="totalAmt" label="总价"></yu-xtable-column>
        <yu-xtable-column prop="squ" label="面积"></yu-xtable-column>
        <yu-xtable-column prop="addr" label="地址"></yu-xtable-column>
      </yu-xtable>
       <div class="button-group" style="text-align:center">
      <yu-button type="primary" @click="selectReturn" > 选取</yu-button>
       </div>

    </yu-dialog>

  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_ZB_CERT_TYP,STD_INQUEST_STATUS');
export default {
  // name: "standardForm",
  data: function () {
    return {
      pages: 10,
      dataUrl: backend.cmisBiz + '/api/lmtguarecloestinfo/selectbymodel',
      form: [],
      dialogTableVisible: false,
      dialogData: [],
      dialogformdata: [],
      saveButton: false,
      formType: 'details'
    };
  },
  mounted () {
    if (this.$route.meta.params.pageType == 0) {
      this.formType = 'details';
      yufp.clone(this.$route.meta.params.params, this.form);
    } else {
      // 等于1的时候新增 直接过
      this.formType = 'edit';
      this.saveButton = true;
      if (this.$route.meta.params.pageType == 2) {
        yufp.clone(this.$route.meta.params.params, this.form);
      }
      // 修改
    }

    ;
  },
  methods: {
    // execBillCardDefaultValueFormula: function () {
    //   this.formdata.inspectSerno = this.$xutils.getDefaultformulaData('UUID');
    // },
    onSubmit () {
      var _this = this;
      let postData = {};
      if (this.form == null || this.form.cloudEvalNo == null) {
        this.$message({ message: '请选择云评估信息', type: 'warning' });
        return;
      }

      // var validate = false;
      // _this.$refs['form'].validate(function (valid) {
      //   validate = valid;
      //   valid ? console.log('校验通过') : _this.$message({message: '验证失败', type: 'error'});
      // });
      // if (!validate) {
      //   return;
      // }
      var validate = false;
      _this.$refs.form.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息补充完整！');
        return;
      }


      if (this.form.oprType == '' || this.form.oprType == null) {
        this.form.oprType = '01';
      }
      if (this.form.inspectStatus == null || this.form.inspectStatus == '') {
        this.form.inspectStatus = '01';
      }
      yufp.clone(_this.form, postData);

      this.$request({
        data: postData,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtinspectinfo/saveandupdate'
      }).then(({code, message, data}) => {
        if (data == 1) {
          this.$message({message: '保存成功', type: 'success'});
          _this.$refs.form.resetFields();
          yufp.router.removeTab(_this.$route.path);
        }
      });
    },

    openDialog () {
      this.dialogTableVisible = true;
    },
    selectReturn () {
      var _this = this;
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.clone(this.$refs.dialogtable.selections[0], this.form);
      yufp.clone({ cloudEvalNo: this.$refs.dialogtable.selections[0].pkId }, _this.form);
      this.dialogTableVisible = false;
    },
    // 返回
    backtrack () {
      var _this = this;
      _this.$refs.form.resetFields();
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>
