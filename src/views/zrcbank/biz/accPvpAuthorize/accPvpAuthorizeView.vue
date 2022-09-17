<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账通知明细查看
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata" :disabled="true">
      <yu-panel title="基本信息" id="baseInfo" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
          <yu-xform-item label="出账流水号" name="pvpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="业务流水号" name="tranSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarMode" ctype="input"></yu-xform-item>
          <yu-xform-item label="申请金额" name="applyAmt" ctype="yu-num"  number-formatter="0,000.00"></yu-xform-item>
          <yu-xform-item label="申请汇票数" name="applyPorder" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否电子票据" name="isEDrft" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputId" ctype="input"></yu-xform-item>
          <yu-xform-item label="责任人" name="managerId" ctype="input"></yu-xform-item>
          <yu-xform-item label="责任机构" name="managerBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="出账日期" name="tranDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="出账状态" name="tradeStatus" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_OPER_TYPE,STD_RATE_ADJ_TYPE,STD_ZB_IR_ADJ_MODE3,STD_LPR_RATE_INTVAL');
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: '/trade/example/list',
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
    var _this = this;
    let data = _this.$route.meta.params;
    // let data = _this.pageParams;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/pvpauthorize/showdetialsub',
      data: { tranSerno: data.tranSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.tableFormdata);
      }
    });
  },

  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      this.$router.go(-1);
      yufp.router.removeTab(this.$route.path);
      // this.$dialog.close(this.dialogId);
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
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: '/trade/example/save',
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
      var _this = this;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
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
        arr.push(selections[i].id);
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: '/trade/example/delete',
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
    },

    /**
     * 导出操作
     */
    exportFn: function () {
      var _this = this;
      yufp.util.exportExcelByTable({
        fileName: '导出',
        importType: 'service',
        ref: _this.$refs.refTable,
        url: '/trade/example/list'
      });
    }
  }
};
</script>