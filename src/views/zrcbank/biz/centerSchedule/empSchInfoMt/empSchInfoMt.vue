
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="普通查询" :hideFilter="false" :collapseHide="false">
      <template>
        <div style="margin-bottom:10px;">
          <yu-button type="primary" @click="addFn" style="margin-left:10px">新增</yu-button>
          <yu-button type="primary" @click="deleteFn">删除</yu-button>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
          <yu-button type="primary" @click="maintain">上班区间维护</yu-button>
          <yufp-excel-export  type="primary" :export-url="downloadUrl" title="排班导入模板下载"></yufp-excel-export>
        </div>
      </template>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="70px">
          <yu-xform-group :column="4">
            <yu-xform-item label="月份" placeholder="月份" name="month" ctype="datepicker" type="month"  format="yyyy-MM" value-format="yyyy-MM"></yu-xform-item>
            <yu-xform-item label="登记人" placeholder="登记人" name="inputId" ctype="input" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" selection-type="radio"  condition-key="condition" row-number :base-params="params" :default-load="false" :data-url="dataUrl" request-type="POST">
        <yu-xtable-column label="排班月份" prop="month"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="排班计划新增向导" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="90px" v-model="monthPop" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="排班月份" placeholder="请输入月份:01-12" name="month" rules="required" ctype="datepicker" type="month"  format="yyyy-MM" value-format="yyyy-MM"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="doNext">下一步</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import { dateFormat } from '@/utils';
yufp.lookup.reg('STD_OPR_TYPE');

export default {
  components: { YufpDemoSelector, YufpExcelExport },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: `${backend.appOcaService}/api/empscheduleinfomtable/queryModel`,
      downloadUrl: `${backend.appOcaService}/api/empscheduleinfo/exportEmpScheduleInfoTemplate`,
      formdata: {},
      params: {},
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
      saveBtnShow: true
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  mounted () {
    this.params = {};
  },
  methods: {
    // 逻辑删除字典项过滤
    datacodeOprType: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '01') {
          return true;
        }
        return false;
      });
    },
    // 下一步
    doNext: function () {
      const _this = this;
      // 必填项校验
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      _this.dialogVisible = false;
      _this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: 'zrcbank/biz/centerSchedule/empSchInfo/empSchInfo', // 菜单路径
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'empSchInfoNext' + new Date().getTime(), // 必传
          // 页签名称
          title: '排班表',
          // 传递的业务数据，可选配置
          data: {
            month: this.monthPop.month,
            op: 'add'
          }
        });
      });
    },

    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;

      _this.dialogVisible = false;
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
     * 查看
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

      _this.$nextTick(function () {
        this.$router.addTab({
          name: 'zrcbank/biz/centerSchedule/empSchInfo/empSchInfo', // 菜单路径
          key: 'empSchInfoView' + selectionsAry[0].serno,
          title: '排班表',
          data: {
            serno: selectionsAry[0].serno,
            op: 'view'
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
      // 选择一条数据
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      // 只能删除排班月份大于当前月份的数据
      var timeDt = new Date();
      var nowMonth = dateFormat(timeDt, '{m}');
      if (selections[0].month <= nowMonth) {
        _this.$message({
          message: '只能删除排班月份大于当前月份的数据!',
          type: 'warning'
        });

        return;
      }
      var serno = selections[0].serno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: `${backend.appOcaService}/api/empscheduleinfomtable/deleteOnLogic/` + serno,
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
      *上班区间维护
      */
    maintain: function () {
      // var _this = this;
      this.$router.addTab({
        name: 'zrcbank/biz/centerSchedule/cfgSchInfo/cfgSchInfo', // 菜单路径
        key: 'cfgSchInfo',
        title: '上班时间维护'
      });
    }
  }
};
</script>
