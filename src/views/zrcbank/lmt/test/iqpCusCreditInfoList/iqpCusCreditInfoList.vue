
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="普通查询" is-collapse>
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="infoFn">详情</yu-button>
        </yu-button-drop>
      </template>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="业务编号" name="bizNo" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="申请流水号" name="serno" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="与借款人关系" name="debitRela" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="证件号码" name="certCode" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="修改时间" name="updateTime" ctype="datepicker"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl">
        <yu-xtable-column label="业务编号" prop="bizNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="申请流水号" prop="serno" width="120"></yu-xtable-column>
        <yu-xtable-column label="与借款人关系" prop="debitRela" width="120"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="120"></yu-xtable-column>
        <yu-xtable-column label="现有消费类融资余额(万元)" prop="consumeFinBal" width="120"></yu-xtable-column>
        <yu-xtable-column label="现有消费类融资月还款额(万元)" prop="consumeMonRepay" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷款当前逾期金额" prop="loanCurtOverdueAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷款单月最高逾期金额(元)" prop="loanHighOverdueAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷款最长逾期月数" prop="loanLgstOverdueMon" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷记卡当前逾期金额" prop="debitCurtOverdueAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷记卡单月最高逾期金额(元)" prop="debitHighOverdueAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷记卡最长逾期月数" prop="debitLgstOverdueMon" width="120"></yu-xtable-column>
        <yu-xtable-column label="两年内逾期次数" prop="inTwoOverdueTimes" width="120"></yu-xtable-column>
        <yu-xtable-column label="两年外逾期次数" prop="outTwoOverdueTimes" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="最后修改日期" prop="updDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" width="120"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="业务编号" :hidden="true" name="bizNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="申请流水号" name="serno" ctype="input"></yu-xform-item>
          <yu-xform-item label="与借款人关系" name="debitRela" ctype="input"></yu-xform-item>
          <yu-xform-item label="证件号码" name="certCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="现有消费类融资余额(万元)" name="consumeFinBal" ctype="input"></yu-xform-item>
          <yu-xform-item label="现有消费类融资月还款额(万元)" name="consumeMonRepay" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款当前逾期金额" name="loanCurtOverdueAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款单月最高逾期金额(元)" name="loanHighOverdueAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款最长逾期月数" name="loanLgstOverdueMon" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷记卡当前逾期金额" name="debitCurtOverdueAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷记卡单月最高逾期金额(元)" name="debitHighOverdueAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷记卡最长逾期月数" name="debitLgstOverdueMon" ctype="input"></yu-xform-item>
          <yu-xform-item label="两年内逾期次数" name="inTwoOverdueTimes" ctype="input"></yu-xform-item>
          <yu-xform-item label="两年外逾期次数" name="outTwoOverdueTimes" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="最后修改日期" name="updDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="创建时间" name="createTime" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker"></yu-xform-item>
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
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';


export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/iqpcuscreditinfo/query/all',
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
     * 详情
     */
    infoFn: function () {
      const _this = this;
      _this.dialogVisible = false;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$nextTick(function () {
        this.$router.addTab({
          // 菜单路径
          name: 'zrcbank/lmt/test/iqpCusCreditInfoList/iqpCusCreditInfoListView', 
          // 必传
          key: 'views', 
          // 页签名称
          title: '详细信息',
          // 传递的业务数据，可选配置
          data: {
            params: selectionsAry[0].serno
          }
        });
      });
    }
  }
};
</script>
