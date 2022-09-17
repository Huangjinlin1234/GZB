<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请----交易对手账户修改
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata" :disabled="true">
      <yu-xform-group column="1">
        <yu-xform-item label="流水号" name="bizSerno" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="业务场景" name="bizSence" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="是否线上" name="isOnline" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
        <yu-xform-item label="是否本行账户" name="isBankAcct" ctype="select" data-code="STD_ZB_YES_NO" rules="required" @change="isBankAcctChange"></yu-xform-item>
        <yu-xform-item label="交易对手账号" name="toppAcctNo" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="交易对手名称" name="toppName" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="交易对手金额" name="toppAmt" ctype="yu-num" rules="required"></yu-xform-item>
        <yu-xform-item label="开户行行号" name="acctsvcrNo" ctype="input" rules="required" :hidden="isHidden"></yu-xform-item>
        <yu-xform-item label="开户行名称" name="acctsvcrName" ctype="input" rules="required" :hidden="isHidden"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-xform-item label=" " label-suffix=" " ctype="custom" name="content" :rows="6" class="custom-button" alion="center">
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </yu-xform-item>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO');
let obj = {};
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
      saveBtnShow: true,
      isHidden: false
    };
  },

  mounted () {
    var _this = this;
    // let data = _this.$route.meta.params;
    let data = _this.pageParams;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/toppacctsub/showdetialsub',
      data: { pkId: data.pkId },
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
      // this.$router.go(-1);
      this.$dialog.close(this.dialogId);
    },

    // 是否本行用户
    isBankAcctChange () {
      var _this = this;
      var isBankAcct = _this.tableFormdata.isBankAcct;
      if (isBankAcct == '1') {
        _this.isHidden = true;
      } else {
        _this.isHidden = false;
      }
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      // model 和后台的对象pvpLoanApp对应
      yufp.clone(_this.tableFormdata, model);
      var url = backend.cmisBiz + '/api/toppacctsub/commonupdatetoppacctsub';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
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
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/toppacctsub/delete/' + selections[0].pkId,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '删除成功', type: 'success' });
                } else {
                  _this.$message({ message: '删除失败', type: 'error' });
                }
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
