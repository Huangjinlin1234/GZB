
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="提前还款列表" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="addFn">新增</yu-button>
          <yu-button @click="modifyFn">修改</yu-button>
          <yu-button @click="infoFn">详情</yu-button>
          <yu-button @click="deleteFn">删除</yu-button>
        </yu-button-drop>
      </template>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="借据号" name="billNo" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="交易流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="借据号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="还款模式" prop="repayMode" data-code="STD_REPAY_MODE"></yu-xtable-column>
        <yu-xtable-column label="还款模式明细" prop="repayModeDesc" data-code="STD_ZB_REPAY_MODE_LIST"></yu-xtable-column>
        <yu-xtable-column label="资金来源" prop="amtSource" data-code="STD_AMT_SOURCE"></yu-xtable-column>
        <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="交易流水号" name="iqpSerno" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="借据号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款模式" name="repayMode" ctype="input" data-code="STD_REPAY_MODE"></yu-xform-item>
          <yu-xform-item label="还款模式明细" name="repayModeDesc" ctype="input" data-code="STD_ZB_REPAY_MODE_LIST"></yu-xform-item>
          <yu-xform-item label="资金来源" name="amtSource" ctype="input" data-code="STD_AMT_SOURCE"></yu-xform-item>
          <yu-xform-item label="还款金额" name="repayAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { lookup } from '@/utils';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_REPAY_MODE_LIST,STD_REPAY_MODE,STD_AMT_SOURCE');
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: { },
      dataUrl: backend.cmisBiz + '/api/iqpprepayment/',
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
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  mounted () {
    debugger;
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;

      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      } // 向后台发送保存请求

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpprepayment/update',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message('操作成功');

          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/iqbRepayment/prePayment/prePaymentInfo/prePaymentInfo', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: '1', // 必传
        // 页签名称
        title: '基本信息',
        // 传递的业务数据，可选配置
        data: {
          custId: '1001001'
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.switchStatus('EDIT', true);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;

      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.switchStatus('DETAIL', false);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      let iqpSerno = _this.$refs.refTable.selections[0].iqpSerno;
      var selections = _this.$refs.refTable.selections;

      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var len = selections.length,
        arr = [];

      for (var i = 0; i < len; i++) {
        arr.push(selections[i].iqpSerno);
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqpprepayment/delete/' + arr.join(','),
              data: {
                ids: arr.join(',')
              },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();

                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>
