<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="分段计息" :hideFilter="false" :collapseHide="false">
      <yu-xform related-table-name="refTable" form-type="search">
        <yu-xform-group :column="4">
          <yu-xform-item placeholder="贷款出账流水号" ctype="input" name="loanPvpSeq"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-toolbar>
        <yu-button type="primary" @click="addFn">新增</yu-button>
        <yu-button type="primary" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="infoFn">详情</yu-button>
        <yu-button type="primary" @click="deleteFn">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" selection-type="radio">
        <yu-xtable-column label="主键" prop="pkId" hidden="true" width="120"></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="seqNo" hidden="true" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷款出账流水号" prop="loanPvpSeq" width="120"></yu-xtable-column>
        <yu-xtable-column label="分段起始日" prop="segStartdate" width="120"></yu-xtable-column>
        <yu-xtable-column label="分段到期日" prop="segEnddate" width="120"></yu-xtable-column>
        <yu-xtable-column label="利率调整方式" prop="rateAdjMode" width="120"></yu-xtable-column>
        <yu-xtable-column label="LPR授信利率区间" prop="lprRateIntval" width="120"></yu-xtable-column>
        <yu-xtable-column label="当前LPR利率" prop="curtLprRate" width="120"></yu-xtable-column>
        <yu-xtable-column label="浮动点数" prop="rateFloatPoint" width="120"></yu-xtable-column>
        <yu-xtable-column label="执行利率（年）" prop="execRateYear" width="120"></yu-xtable-column>
        <yu-xtable-column label="利率调整选项" prop="rateAdjType" width="120"></yu-xtable-column>
        <yu-xtable-column label="下一次利率调整间隔" prop="nextRateAdjInterval" width="120"></yu-xtable-column>
        <yu-xtable-column label="下一次调整间隔单位" prop="nextRateAdjUnit" width="120"></yu-xtable-column>
        <yu-xtable-column label="第一次调整日" prop="firstAdjDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="结息间隔周期" prop="eiIntervalCycle" width="120"></yu-xtable-column>
        <yu-xtable-column label="结息间隔周期单位" prop="eiIntervalUnit" width="120"></yu-xtable-column>
        <yu-xtable-column label="扣款日" prop="deductDay"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="主键" hidden="true" name="pkId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="流水号" hidden="true" name="seqNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款出账流水号" hidden="true" name="loanPvpSeq" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="分段起始日" name="segStartdate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="分段到期日" name="segEnddate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="利率调整方式" name="rateAdjMode" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="当前LPR利率" name="curtLprRate" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" rules="required" ctype="num"></yu-xform-item>
          <yu-xform-item label="执行利率（年）" name="execRateYear" ctype="yu-num" :formatter="toPercent"></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="input"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" ctype="num"></yu-xform-item>
          <yu-xform-item label="下一次调整间隔单位" name="nextRateAdjUnit" ctype="input"></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" ctype="num"></yu-xform-item>
          <yu-xform-item label="结息间隔周期单位" name="eiIntervalUnit" ctype="input"></yu-xform-item>
          <yu-xform-item label="扣款日" name="deductDay" ctype="num"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
lookup.reg('DATA_STS');
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      dataUrl: backend.zjgCmisBizWebService + '/api/pvploanappseginterstsub/',
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
      required: false,
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

    /*
       * 参数说明：
       * money：要格式化的数字
       * num：保留几位小数
       * */
    toPercent: function (money) {
      // num = num > 0 && num <= 20 ? num : 2;
      money = parseFloat(money + '') + '%';
      return money;
    },

    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.$refs.refForm.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = '';
      if (_this.viewType == 'ADD') {
        url = backend.zjgCmisBizWebService + '/api/pvploanappseginterstsub/saveSegInterstSub';
      } else {
        url = backend.zjgCmisBizWebService + '/api/pvploanappseginterstsub/commonupdateseginterstsubinfo';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          console.log(code);
          console.log(response.data.rtnCode);
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({
                message: response.data.rtnMsg,
                type: 'success'
              });
              _this.$refs.refTable.remoteData();
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
        _this.$refs.refForm.formdata.createTime = this.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        _this.required = true;
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.required = true;
        var obj = _this.$refs.refTable.selections[0];
        yufp.extend(_this.$refs.refForm.formdata, obj);
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.required = false;
        // 查询详细信息
        yufp.service.request({
          method: 'GET',
          url: backend.zjgCmisBizWebService + '/api/pvploanappseginterstsub/showdetial',
          data: { pkId: selectionsAry[0].pkId },
          callback: function (code, message, response) {
            if (code == 200) {
              _this.$message({ message: response.message, type: 'success' });
              yufp.clone(response.data, _this.formdata);
            }
          }
        });
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
              url: backend.zjgCmisBizWebService + '/api/pvploanappseginterstsub/delete/' + selections[0].pkId,
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
