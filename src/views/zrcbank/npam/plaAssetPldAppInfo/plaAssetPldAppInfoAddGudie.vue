<template>
  <!--
    @created by
    @updated by  2018-8-16 修改代码规范
    @updated by  2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="抵债资产处置向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="240px" v-model="formdata" style="text-align: center;">
        <yu-xform-group :column="2">
          <yu-xform-item label="抵债资产编号" name="pldimnNo" rules="required" ctype="input" disabled hidden></yu-xform-item>
          <yu-xform-item label="抵债资产名称" name="pldimnName" ctype="input" rules="required" disabled hidden></yu-xform-item> 
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doNext">下一步</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      formdata: {},
      cusParms: {
        title: '关联业务流水号',
        // queryFields: [{ placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        queryFields: [
          { placeholder: '业务流水号', field: 'ptaiSerno', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, 
          { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }
        ],

        dataUrl: backend.cmisNpam + '/api/platakeoverappinfo/selectTakeoverlist',
        // tableColumns: [{ label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }]
        // tableColumns: [{ label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '业务流水号', prop: 'ptaiSerno' }]
        tableColumns: [{ label: '业务流水号', prop: 'ptaiSerno' }, { label: '客户名称', prop: 'cusName' }, { label: '客户号', prop: 'cusId' }]
      }
    };
  },
  methods: {
    /**
     * 选择客户方法
     */
    selectCus: function (arr) {
      this.formdata.cusId = arr[0].cusId;
      this.formdata.cusName = arr[0].cusName;
      this.formdata.ptaiSerno = arr[0].ptaiSerno;
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 下一步
    doNext () {
      var _this = this;
      var model = {};
      var periSerno = '';
      this.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      yufp.clone(_this.formdata, model);
      yufp.service.request({
        method: 'POST',
        // url: backend.cmisNpam + '/api/plalawarbitratecaseinfo/insert',
        url: backend.cmisNpam + '/api/plaexpenseregiinfo/insertReg',
        data: model,
        callback: function (code, message, response) {
          console.log(response)
          if (response.code == 0) {
            // debugger;
            periSerno = response.data.periSerno;
            // dispStage = response.data.dispStage;
            _this.$router.addTab({
              name: 'zrcbank/npam/exepenseManager/expenseRegister',
              key: 'expenseRegister' + periSerno, // 必传
              title: '费用登记新增',
              data: {
                periSerno: periSerno,
                // dispStage: dispStage,
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
