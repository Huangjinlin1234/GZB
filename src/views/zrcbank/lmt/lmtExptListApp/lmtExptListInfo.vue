
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="额度管控白名单">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
        <yu-xform-group :column="4">
          <yu-xform-item placeholder="管控业务编号" name="bussNo" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button @click="infoFn" v-if="checkCtrl('view')" type="primary">详情</yu-button>
        <yu-button @click="deleteFn" v-if="checkCtrl('delete')" type="primary">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" request-type="POST">
        <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="管控业务编号" prop="bussNo"></yu-xtable-column>
        <yu-xtable-column label="源系统" prop="sysId" data-code="STD_PERIPHERAL_SYS"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="例外类型" prop="exptType" data-code="STD_ZB_EXPT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="申请流水号" name="serno" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-button-drop type="button">
            <yu-button type="primary" @click="openMovie">影像</yu-button>
          </yu-button-drop>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="管控业务编号" name="bussNo" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="源系统" name="sysId" :rules="rule[0]" ctype="select" data-code="STD_PERIPHERAL_SYS"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="例外类型" name="exptType" :rules="rule[0]" ctype="checkbox" data-code="STD_ZB_EXPT_TYPE"></yu-xform-item>
          <yu-xform-item label="例外原因" name="exptResn" :rules="rule[0]" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { imageSystem } from '@/utils/unitchange';

yufp.lookup.reg('STD_ZB_EXPT_TYPE,STD_ZB_APPR_STATUS,STD_PERIPHERAL_SYS');

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/lmtexptlistinfo/selectByModel',
      Param: { condition: JSON.stringify({ oprType: '01'}) },
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
      dialogVisibleMovie: false
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
     * 影像
     */
    openMovie () {
      var _this = this;
      let params = _this.formdata;
      let imageBizParam = [
        {
          // TODO 根据实际业务场景修正
           top_outsystem_code: 'XXD_TYED',
            index: {
              businessid: params.serno,
              custtype: params.curType,
              custconductid: params.inputId,
              custconductname: params.inputIdName,
              orgid: params.inputBrId,
              orgname: params.inputBrIdName,
              opername: params.updIdName,
              custid: params.cusId,
              custname: params.cusName,
              custconduct: '',
              operid: '',
              maintaindate: '',
              contid: "",
              billno: ""
          }
        }
      ];
      imageSystem (imageBizParam, "1", "import;download").then(res => {
        window.open(res);
      })
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
              url: backend.cmisLmt + '/api/lmtexptlistinfo/logicaldelete',
              data: selections[0],
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
