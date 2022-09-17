<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="承兑行白名单历史管理">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
        <yu-xform-group :column="2">
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop :show-length="8">
        <yu-button @click="infoFn">详情</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" requestType="POST">
        <yu-xtable-column label="金融机构代码" prop="instuCde" width="120" data-code="STD_ZB_INSTU_CDE"></yu-xtable-column>
        <yu-xtable-column label="额度分项编号" prop="subAccNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="白名单额度类型" prop="lmtWhiteType" width="" data-code="STD_ZB_LMT_WHITE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户号" prop="cusId" width=""></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="总行行号" prop="aorgNo" width=""></yu-xtable-column>
        <yu-xtable-column label="机构类型" prop="cusType" width="120" data-code="STD_ZB_INTBANK_TYPE"></yu-xtable-column>
        <yu-xtable-column label="限额（万元）" prop="sigAmt" width="120px">
          <template slot-scope="scope">
            <span>{{ div(scope.row.sigAmt , 10000) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" width="120">
          <template slot-scope="scope">
            <span>{{ formatterTime(scope.row.createTime) }}</span>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="700px">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="金融机构代码" name="instuCde" ctype="select" data-code="STD_ZB_INSTU_CDE" disabled></yu-xform-item>
          <yu-xform-item label="额度分项编号" name="subAccNo" :hidden="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="白名单额度类型" name="lmtWhiteType" :hidden="true" ctype="select" data-code="STD_ZB_LMT_WHITE_TYPE"></yu-xform-item>
          <yu-xform-item label="承兑行行名" name="cusName" ctype="input" :rules="rule[0]" icon="search" disabled></yu-xform-item>
          <yu-xform-item label="承兑行行号" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="总行行号" name="aorgNo" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="机构类型" name="cusType" ctype="select" data-code="STD_ZB_INTBANK_TYPE"></yu-xform-item>
          <yu-xform-item label="限额（万元）" name="sigAmt" :formatter="formatter" :digit="6" type="num" unit="万"></yu-xform-item>
          <yu-xform-item label="已用限额（万元）" name="sigUseAmt" :hidden="hiddenflag" ctype="" unit="万" disabled></yu-xform-item>
          <yu-xform-item label="起始日期" name="startDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="到期日期" name="endDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinForm from '@/utils/mixins/mixin-form';

yufp.lookup.reg('STD_ZB_LMT_WHITE_TYPE,STD_ZB_INTBANK_TYPE,STD_ZB_OPR_TYPE,STD_ZB_INSTU_CDE');


export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/lmtwhiteinfohistory/querymodel',
      Param: { condition: JSON.stringify({ oprType: '01', lmtWhiteType: '01'}) },
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
      hiddenflag: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      formatter: function (money, num) {
        var num = num && num > 0 && num <= 20 ? num : 2;
        var money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        var l = money.split('.')[0].split('').reverse();
        var r = money.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      }
    };
  },
  computed: {
    createTime1: function (dateTime) {
      console.log('============================', dateTime);
      return this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', dateTime);
    }
  },
  methods: {
    formatterTime: function (createTime) {
      return this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(createTime));
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

    // 除法
    div: function (num1, num2) {
      return parseFloat(parseFloat(num1 / num2).toFixed(6));
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
      _this.hiddenflag = false;
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        yufp.clone(selectionsAry[0], _this.formdata);
        _this.formdata.sigAmt = _this.div(_this.formdata.sigAmt, 10000);
        _this.formdata.sigUseAmt = _this.div(_this.formdata.sigUseAmt, 10000);
      });
    }


  }
};
</script>
