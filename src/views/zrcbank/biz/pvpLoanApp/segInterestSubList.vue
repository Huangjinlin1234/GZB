<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请-分段计息明细
  -->
  <div>
    <yu-panel title="分段计息" :hideFilter="false" :collapseHide="false" :disabled="isDisabledFlg">
      <yu-toolbar>
        <yu-button type="primary" @click="addFn" :hidden="isShowButton">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" :hidden="isShowButton">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" :hidden="isShowButton">删除</yu-button>
        <yu-button type="primary" @click="infoFn" >查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" style="margin-top: 10px"  :base-params="baseParams">
        <yu-xtable-column label="流水号" prop="serno" width=""></yu-xtable-column>
        <yu-xtable-column label="分段起始日" prop="segStartdate" width=""></yu-xtable-column>
        <yu-xtable-column label="分段到期日" prop="segEnddate" width=""></yu-xtable-column>
        <yu-xtable-column label="执行利率（年）" prop="execRateYear" width=""></yu-xtable-column>
        <yu-xtable-column label="利率调整方式" prop="rateAdjMode" data-code="STD_IR_ADJUST_TYPE" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 新增，弹出框，贷款出账申请分段计息明细新增 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="800px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="分段起始日" name="segStartdate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="分段到期日" name="segEnddate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="利率调整方式" name="rateAdjMode" ctype="select" data-code="STD_IR_ADJUST_TYPE" rules="required"></yu-xform-item>
          <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" rules="required"></yu-xform-item>
          <yu-xform-item label="当前LPR利率" name="curtLprRate" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="执行利率（年）" name="execRateYear" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select" data-code="STD_RATE_ADJ_TYPE" rules="required"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" ctype="input"></yu-xform-item>
          <yu-xform-item label="下一次调整间隔单位" name="nextRateAdjUnit" ctype="select" data-code="STD_ZB_TERM_TYPE" ></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="结息间隔周期单位" name="eiIntervalUnit" ctype="select" data-code="STD_ZB_TERM_TYPE"></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="扣款日" name="deductDay" ctype="datepicker" rules="required"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_RATE_ADJ_TYPE,STD_RATE_ADJ_TYPE,STD_LPR_RATE_INTVAL,STD_ZB_TERM_TYPE,STD_IR_ADJUST_TYPE');
let obj = {};
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/pvploanappseginterstsub/querySegInterstSub',
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
      isDisabledFlg: false,
      isShowButton: false,
      op: ''
    };
  },
  created () {
    var _this = this;
    if (_this.getFactory().contextData.instanceInfo) {
      obj = _this.getFactory().contextData.instanceInfo;
      _this.op = 'VIEW';
    } else if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
      _this.op = obj.op;
    } else {
      obj = _this.getFactory().contextData;
      _this.op = obj.op;
    }
    if (_this.op == 'VIEW') {
      _this.isDisabledFlg = true;
      _this.isShowButton = true;
    }
    _this.baseParams = {condition: JSON.stringify({ serno: obj.pvpSerno || obj.bizId })};
  },
  mounted () {
  },
  methods: {
    /**
     * 返回
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
      model['oprType'] = '01';
      yufp.clone(_this.formdata, model);
      model['serno'] = obj.pvpSerno;
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
        url: backend.cmisBiz + '/api/pvploanappseginterstsub/saveSegInterstSub',
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

    // 修改
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$dialog.open('分段计息', 'zrcbank/biz/pvpLoanApp/segInterestSubInfo', 900, 400, {
          pkId: _this.$refs.refTable.selections[0].pkId
        });
        // this.$router.addTab({
        //   // 路由名称,菜单路径
        //   name: 'zrcbank/biz/pvpLoanApp/segInterestSubInfo',
        //   // 自定义唯一页签key,请统一使用custom_前缀开头。必传
        //   key: '1',
        //   // 页签名称
        //   title: '分段计息',
        //   // 传递的业务数据，可选配置
        //   data: {
        //     pkId: _this.$refs.refTable.selections[0].pkId
        //   }
        // });
      });
    },

    // 查看
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$dialog.open('分段计息', 'zrcbank/biz/pvpLoanApp/segInterestSubView', 900, 400, {
          pkId: _this.$refs.refTable.selections[0].pkId
        });
        // this.$router.addTab({
        //   // 路由名称,菜单路径
        //   name: 'zrcbank/biz/pvpLoanApp/segInterestSubView',
        //   // 自定义唯一页签key,必传，请统一使用custom_前缀开头
        //   key: '1',
        //   // 页签名称
        //   title: '分段计息',
        //   // 传递的业务数据，可选配置
        //   data: {
        //     viewType: 'EDIT',
        //     pkId: _this.$refs.refTable.selections[0].pkId
        //   }
        // });
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
              url: backend.cmisBiz + '/api/pvploanappseginterstsub/delete/' + selections[0].pkId,
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
    }
  }
};
</script>
