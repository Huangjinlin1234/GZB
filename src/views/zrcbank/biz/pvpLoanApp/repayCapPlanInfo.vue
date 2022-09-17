<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请-还本计划明细查看
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group column="2">
          <yu-xform-item label="流水号" name="serno" rules="required" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="期数" name="terms" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款日期" name="repayDate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="还本金额" name="repayAmt" ctype="yu-num"></yu-xform-item>

          <yu-xform-item label="登记人ID" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构ID" name="inputBrId" hidden ></yu-xform-item>
          <yu-xform-item label="登记时间" name="inputDate" hidden ></yu-xform-item>
          <yu-xform-item label="更新人ID" name="updId" hidden ></yu-xform-item>
          <yu-xform-item label="更新人机构ID" name="updBrId" hidden ></yu-xform-item>
          <yu-xform-item label="更新时间" name="updDate" hidden ></yu-xform-item>
          <yu-xform-item label="登记人名称" name="inputIdName" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构名称" name="inputBrIdName" :disabled="true"></yu-xform-item>
          <yu-xform-item label="修改人名称" name="updIdName" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="更新机构名称" name="updBrIdName" :disabled="true" hidden></yu-xform-item>
        </yu-xform-group>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_OPER_TYPE');
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
      saveBtnShow: true
    };
  },

  mounted () {
    let _this = this;
    console.log(_this.pageParams);
    yufp.clone(_this.pageParams, _this.formdata);
    // 获取当前用户信息
    // const userInfo = this.$xutils.getLoginUserInfo();
    // _this.formdata.updId = userInfo.loginCode;
    // _this.formdata.updIdName = userInfo.loginUserName;
  },

  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      // this.$router.go(-1);
      this.$dialog.close(this.dialogId);
    },

    // 保存
    saveFn: function () {
      var _this = this;
      // model 和后台的对象pvpLoanApp对应
      let model = {};
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/repaycapplan/updaterepaycapplan';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$dialog.close(_this.dialogId);
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
    }
  }
};
</script>
