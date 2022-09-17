<template>
  <!--
    @created by
    @updated by  wyh
    @updated by  2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="费用管理新增向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="240px" v-model="formdata" style="text-align: center;">
        <yu-xform-group :column="2">
          <yu-xform-item label="处置阶段" name="dispStage" ctype="select" rules="required" data-code="STD_DISP_STAGE" @change="changeFn"></yu-xform-item>
          <yu-xform-item label="关联业务流水号" name="ptaiSerno"  rules="required"  icon="search" clearable  @click="showPop" :disabled="flag" v-if="isshow"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" rules="required" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doNext">下一步</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
 <!----------------------------------------------------pop框------------------------------------------------------------------>
    <yu-dialog title="关联业务流水号" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="4">
              <yu-xform-item placeholder="业务流水号"   name="serno" ></yu-xform-item>
              <yu-xform-item placeholder="客户号"   name="cusId" ></yu-xform-item>
              <yu-xform-item placeholder="客户名称"   name="cusName" ></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" :base-params="baseParams"  request-type="POST" style="width: 100%" condition-key="condition">
              <yu-xtable-column prop="serno" label="业务流水号"></yu-xtable-column>
              <yu-xtable-column prop="cusId" label="客户号" ></yu-xtable-column>
              <yu-xtable-column prop="cusName" label="客户名称" ></yu-xtable-column>
            </yu-xtable>
        <div class="button-group" style="text-align:center">
            <yu-button type="primary" @click="selectReturn"> 选取</yu-button>
       </div>
    </yu-dialog>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      dialogTableVisible: false,
      dialogformdata: {},
      baseParams: {condition: JSON.stringify({ dispStage: null })},
      dataUrl: backend.cmisNpam + '/api/platakeoverappinfo/selectTakeoverlist',
      flag: true,
      isshow: true,

      formdata: {}
    };
  },
  methods: {
    /* pop框显示 */
    showPop () {
      this.dialogTableVisible = true;
    },
    /* pop数据选取赋值 */
    selectReturn () {
      var _this = this;
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.formdata.ptaiSerno = this.$refs.dialogtable.selections[0].serno;
      this.formdata.cusId = this.$refs.dialogtable.selections[0].cusId;
      this.formdata.cusName = this.$refs.dialogtable.selections[0].cusName;
      this.dialogTableVisible = false;
    },
    /* 上一项未选择时，提示信息 */
    isSelect () {
      if (!this.formdata.dispStage) {
        this.$xutils.showMsgBox('提示', '请先填写完整上一项');
      }
    },


    /** 选择【处置阶段】后续方法 */
    changeFn (value) {
      // 控制后一项表单的状态
      if (value == '06') {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
      this.flag = !value;
      this.baseParams = {condition: JSON.stringify({ dispStage: value })};
    },
    /* 返回 */
    doBack () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    // 下一步
    doNext () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      var model = {};
      var periSerno = '';
      let serno = _this.formdata.ptaiSerno;
      _this.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      yufp.clone(_this.formdata, model);
      model.serno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaexpenseregiinfo/insertReg',
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.doBack();
            periSerno = response.data.periSerno;
            _this.$router.addTab({
              name: 'zrcbank/npam/exepenseManager/expenseRegister',
              key: 'expenseRegister' + periSerno, // 必传
              title: '费用登记新增',
              data: {
                back: _this.doBack,
                periSerno: periSerno,
                viewType: 'ADD'
              }
            });
          }
        }
      });
    }

  }
};
</script>
