<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 省心快贷查封登记簿
  -->
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="refTable" form-type="search">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户号" placeholder="客户号" ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="合同号" placeholder="合同号" ctype="input" name="contNo"></yu-xform-item>
            <yu-xform-item label="客户经理号" placeholder="客户经理号" ctype="input" name="managerId"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      <yu-button-drop>
        <yu-button @click="viewForm"  type="primary" v-if="checkCtrl('view')">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable"  row-number :data-url="dataUrl"  request-type="POST" style="margin-top: 10px" condition-key="condition" :base-params="baseParams">
        <yu-xtable-column label="主键" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="合同号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="审批日期" prop="auditDate"></yu-xtable-column>
        <yu-xtable-column label="操作人" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="审批人" prop="apprId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="省心快贷查封登记簿" :visible.sync="dialogVisible" width="1500px" height="800px">
      <yu-xform ref="refForm" label-width="80px" v-model="infoFormdata" :disabled="true">
        <yu-panel title="押品查封登记簿" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="主键" name="serno" ctype="input"></yu-xform-item>
            <yu-xform-item label="客户号" name="cusId" ctype="input"></yu-xform-item>
            <yu-xform-item label="合同号" name="contNo"  ctype="input"></yu-xform-item>
            <yu-xform-item label="审批日期" name="auditDate" ctype="input"></yu-xform-item>
            <yu-xform-item label="操作人" name="managerId" ctype="input"></yu-xform-item>
            <yu-xform-item label="审批人" name="apprId" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </yu-tabs>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/guargcfbook/queryGuarGcfBookList',
      baseParams: {condition: {}, sort: 'serno desc'},
      activeName: 'messageTip',
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      viewType: 'DETAIL'
    };
  },
  methods: {
    // 查看
    viewForm: function () {
      var _this = this;
      debugger;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.dialogVisible = true;
      var jsoPar = _this.$refs.refTable.selections[0];
      let serno = jsoPar.serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/guargcfbook/showdetial',
        data: {serno: serno},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.infoFormdata);
          } else {
            return;
          }
        }
      });
    },
    // POP取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    }
  }
};
</script>
