<template>
  <div>
    <yu-panel title="授信分项信息" panel-type="simple">
      <yu-button-drop>
        <yu-button v-show="saveBtnShow" type="primary" @click="addFn">新增</yu-button>
        <yu-button v-show="saveBtnShow" type="primary" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="infoFn">查看</yu-button>
        <yu-button v-show="saveBtnShow" type="primary" @click="deleteFn">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" request-type="POST" style="width: 100%">
        <yu-xtable-column prop="subSerno" label="授信分项流水号"> </yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeName" label="授信分项额度名称"> </yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="授信额度"> </yu-xtable-column>
        <yu-xtable-column prop="curType" label="币种" data-code="STD_ZB_CUR_TYP"> </yu-xtable-column>
        <yu-xtable-column prop="isRevolv" label="是否循环" data-code="STD_ZB_YES_NO"> </yu-xtable-column>
        <yu-xtable-column prop="term" label="期限"> </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 新增弹层 -->
    <yu-xdialog :title="'适用授信品种' + viewTitle[viewType]" :visible.sync="dialogVisible" width="800px" height="400px">
      <yu-xform label-width="120px" ref="refForm" :disabled="formDisabled" :form-type="formType" v-model="formdata">
        <yu-xform-group :column="1">
          <yu-xform-item label="分项申请流水号" ctype="input" name="subSerno" placeholder="分项申请流水号" disabled>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="授信品种编号" ctype="yu-xlmtsub-tree" rules="required" name="lmtBizType" :disabled="editDisabled" width="480" height="480" :parms="{limitStrNo:'03'}" @select-fn="commonSelectFn" :show-text="false" :mapping="{'id':'lmtBizType','label':'lmtBizTypeName'}"></yu-xform-item>
          <yu-xform-item label="授信品种名称" ctype="input" name="lmtBizTypeName" rules="required" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="是否循环额度" ctype="select" name="isRevolv" :rules="rule[0]" disabled data-code="STD_ZB_YES_NO" placeholder="是否循环额度"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" :rules="rule[0]" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="授信额度(元)" ctype="input" placeholder="授信额度(元)" number-formatter="0,000" name="lmtAmt" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="额度期限(月)" ctype="input" placeholder="额度期限(月)" name="term" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-show="dialogBtnShow" type="primary" @click="doSave">保存</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CUR_TYP');
export default {
  props: {
    children: Object
  },
  components: { YufpDemoSelector },
  data: function () {
    return {
      formdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtintbankapprsub/selectByModel',
      Param: { condition: { oprType: '01', serno: this.children.serno } },
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
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      formDisabled: true,
      editDisabled: true,
      dialogBtnShow: true
    };
  },
  mounted: function () {
    debugger;
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.$route.meta.params;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.apprSerno;
      _this.saveBtnShow = true;
      if (_this.op == 'DETAIL') {
        _this.saveBtnShow = false;
      }
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.dialogBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },

    /**
     * 保存
     */
    doSave: function () {
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
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var strurl = backend.cmisBiz + '/api/lmtintbankapprsub/update';
      if (_this.viewType == 'ADD') {
        model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        strurl = backend.cmisBiz + '/api/lmtintbankapprsub/';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.switchStatus('ADD', true);
      _this.editDisabled = false;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.formdata.oprType = '01';
        _this.formdata.isRevolv = '1';
        _this.formdata.curType = 'CNY';
        _this.formdata.term = '12';
        _this.formdata.serno = this.$route.meta.params.serno;
        _this.formdata.subSerno = this.$xutils.getSEQWithParamFromServer('LMT_SUB_SERNO');
        _this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        _this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
        _this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        _this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
        _this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
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
      _this.editDisabled = true;
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

    // 取消
    doCancel () {
      this.dialogVisible = false;
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
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtintbankapprsub/logicalDelete',
              data: { condition: JSON.stringify({ pkId: selections[0].pkId, serno: selections[0].serno }) },
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