<template>
  <!--
    @created by
    @updated by  2018-8-16 修改代码规范
    @updated by  2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="破产案件新增向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" >
        <yu-xform-group>
          <yu-xform-item label="破产公司编号"  placeholder="破产公司编号" name="brokeComNo" rules="required" icon="search"  @click.native="openDialog" ></yu-xform-item>
          <yu-xform-item label="破产公司名称" name="brokeComName" ctype="input" rules="required" disabled  placeholder="破产公司名称"></yu-xform-item>
        </yu-xform-group>
        <div style="text-align:center">
          <yu-button  type="primary" @click="doNext">下一步</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </div>
      </yu-xform>
    </yu-panel>

    <yu-dialog title="选择客户" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true" label-width="140px">
            <yu-xform-group :column="2" >
              <yu-xform-item placeholder="破产公司编号" label="破产公司编号"  name="cusId"></yu-xform-item>
              <yu-xform-item placeholder="破产公司名称" label="破产公司名称"  name="cusName"></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" :base-params="params" request-type="POST" style="width: 100%" condition-key="condition">
           <yu-xtable-column prop="cusId" label="破产公司编号"></yu-xtable-column>
           <yu-xtable-column prop="cusName" label="破产公司名称" ></yu-xtable-column>
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
      dialogformdata:{},
      formdata: {},
      dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusBaseList',
      params:{condition:{cusCatalog:'2', roleList: this.$xutils.getLoginUserInfo().roles}}
    };
  },
  methods: {

     /* 弹出框显示： */
    openDialog () {
      this.dialogTableVisible = true;
    },
    /*  选取处理： */
    selectReturn () {
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.formdata.brokeComNo = this.$refs.dialogtable.selections[0].cusId
      this.formdata.brokeComName = this.$refs.dialogtable.selections[0].cusName
      this.dialogTableVisible = false;
    },
    
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 下一步
    doNext () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return _this.$xutils.showMsgBox('提示', '校验未通过，请填写必填项');
      };
      var model = {};
      let brokeCaseNo = '';
      this.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      // this.formdata.brokeCaseNo = this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ');
      yufp.clone(_this.formdata, model);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawbrokecaseinfo/insert',
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.doBack()
            // 主键，查看修改回显的查询主键
            brokeCaseNo = response.data.brokeCaseNo;
            console.log("res", brokeCaseNo)
            _this.$router.addTab({
              name: 'zrcbank/npam/plaLawBroke/plaLawBrokeDetil',
              key: 'plaLawBrokeApp' + new Date().getTime(), // 必传
              title: '破产案件新增',
              data: {
                brokeCaseNo: brokeCaseNo, // 查询主键
                back: _this.doBack,
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
