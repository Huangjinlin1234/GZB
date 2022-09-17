<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="viewType == 'DETAIL'" v-model="formdata" style="text-align: center;">
        <yu-xform-group :column="2">
          <yu-xform-item label="案件编号"  name="caseNo"  rules="required"></yu-xform-item>
          <yu-xform-item label="受理日期"  name="acceptDate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="受理法院"  name="acceptCourt"  rules="required"></yu-xform-item>
          <yu-xform-item label=""  name=""  ctype="custom"></yu-xform-item>
          <yu-xform-item label="申请金额(元)"  name="appAmt" ctype="yu-num" number-formatter="0,000.00" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="裁定金额(元)"  name="awardAmt" ctype="yu-num" number-formatter="0,000.00" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="文书落款日期"  name="dcmntsInscribeDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label=""  name=""  ctype="custom"></yu-xform-item>
          <yu-xform-item label="裁定文书生效日期"  name="dcmntsInureDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="案件进程状态"  name="caseProcessStatus" ctype="select" rules="required" data-code="STD_CASE_PROCESS_STATUS"></yu-xform-item>
          <yu-xform-item label="登记日期"  name="inputDate" ctype="datepicker" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button type="primary" @click="doSave" :hidden="viewType == 'DETAIL'">保存</yu-button>
          <yu-button type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
// 注册字典项
yufp.lookup.reg('STD_ISUPPORT_TYPE,STD_AGT_MODE,STD_CLOSE_CASE_TYPE');
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      formdata: {},
      viewType: 'EDIT'
    };
  },
  props: {
    cusCorp: Object,
    dialogId: String
  },
  created () {
    // this.$emit("liuquan")
    var _this = this;
    if (_this.cusCorp) {
      _this.formdata.caseSerno = _this.cusCorp.caseSerno;
      _this.viewType = _this.cusCorp.viewType;
    }
    var caseSerno = _this.formdata.caseSerno;

    yufp.service.request({
      method: 'POST',
      url: `${backend.cmisNpam}/api/plalawguar/`,
      data: { condition: JSON.stringify({ caseSerno: caseSerno }) },
      callback: function (code, message, response) {
        yufp.clone(response.data[0], _this.formdata);
      }
    });
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit;
    }
  },

  methods: {
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      var _this = this;
      let jsoRt = null;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          this.$message.error('校验未通过');
          return;
        }
        var model = _this.formdata;
        model.caseSerno = _this.cusCorp.caseSerno;
        if (_this.formdata.inputDate || _this.formdata.inputDate == '') {
          _this.formdata['inputDate'] = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
          model.inputDate = _this.formdata.inputDate;
        }
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawguar/update',
          async: false,
          data: model,
          callback: function (code, message, response) {
            if (response.code == 0) {
              jsoRt = response;
              _this.$message('操作成功');
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
      });
      return jsoRt;
    }
  }
};
</script>
