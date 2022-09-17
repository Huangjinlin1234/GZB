<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="额度结构配置">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="额度结构名称" name="limitStrName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="是否启用" name="isBegin" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item placeholder="结构主体类型" name="strMbodyType" ctype="select" data-code="STD_ZB_CUS_CATALOG"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button v-if="checkCtrl('add')" @click="addFn" type="primary">新增</yu-button>
        <yu-button v-if="checkCtrl('edit')" @click="modifyFn" type="primary">修改</yu-button>
        <yu-button v-if="checkCtrl('view')" @click="infoFn" type="primary">详情</yu-button>
        <yu-button v-if="checkCtrl('delete')" @click="deleteFn" type="primary">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" :default-load="false" request-type="POST">
        <yu-xtable-column label="额度配置流水号" prop="lmtCfgSerno"></yu-xtable-column>
        <yu-xtable-column label="额度结构编号" prop="limitStrNo"></yu-xtable-column>
        <yu-xtable-column label="额度结构名称" prop="limitStrName"></yu-xtable-column>
        <yu-xtable-column label="结构主体类型" prop="strMbodyType" data-code="STD_ZB_CUS_CATALOG"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="isBegin" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="额度配置流水号" :hidden="true" name="lmtCfgSerno" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="额度结构编号" name="limitStrNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否启用" name="isBegin" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="结构主体类型" name="strMbodyType" ctype="select" data-code="STD_ZB_CUS_CATALOG"></yu-xform-item>
          <yu-xform-item label="操作类型" name="oprType" ctype="select" data-code="STD_ZB_OPR_TYPE"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="额度结构名称" name="limitStrName" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button  type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-xdialog title="数据调整新增向导" :visible.sync="dialogVisibleadd" width="600px">
      <yu-xform ref="refAddForm" label-width="100px" v-model="addformdata" :disabled="formDisabled">
        <yu-xform-group :column="1">
          <yu-xform-item label="额度结构编号" name="limitStrNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="额度结构名称" name="limitStrName" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="结构主体类型" name="strMbodyType" rules="required" ctype="select" data-code="STD_ZB_CUS_CATALOG"></yu-xform-item>
          <yu-xform-item label="是否启用" name="isBegin" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button   type="primary" @click="nextFn">下一步</yu-button>
          <yu-button  type="primary" @click="backFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';

yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CUS_CATALOG,STD_ZB_OPR_TYPE');

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/lmtstrmtableconf/selectByModel',
      formdata: {},
      addformdata: {},
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
      dialogVisibleadd: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      loginCode: state => state.oauth.loginCode
    })
  },
  mounted () {
    var _this = this;
    var timeDt = new Date();
    _this.updDate = dateFormat(timeDt, '{y}-{m}-{d}');
    _this.updateTime = dateFormat(timeDt, '{y}-{m}-{d} {h}:{i}:{s}');
    this.Param = { condition: JSON.stringify({ oprType: '01' }) };
  },
  methods: {
    /**
     * 下一步
     */
    nextFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.addformdata, model);
      var validate = false;
      _this.$refs.refAddForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      } // 向后台发送保存请求
      var strurl = backend.cmisLmt + '/api/lmtstrmtableconf/addLmtStrMtableConf';
      model.updId = _this.loginCode;
      model.updBrId = _this.org.code;
      model.updDate = _this.updDate;
      model.updateTime = _this.updateTime;
      model.oprType = '01';
      model.inputId = _this.loginCode;
      model.inputBrId = _this.org.code;
      model.inputDate = _this.updDate;
      model.createTime = _this.updateTime;
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          if (typeof response.data == 'string') {
            _this.$message({
              message: response.data,
              type: 'warning'
            });
            return;
          } else {
            _this.openTab(response.data && response.data.limitStrNo, '新增', 'ADD');
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            _this.dialogVisibleadd = false;
          }
        }
      });
    },
    /**
     * 返回
     */
    backFn: function () {
      var _this = this;
      _this.dialogVisibleadd = false;
    },

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
      model.updId = _this.loginCode;
      model.updBrId = _this.org.code;
      model.updDate = _this.updDate;
      model.updateTime = _this.updateTime;
      var strurl = backend.cmisLmt + '/api/lmtstrmtableconf/update';
      if (_this.viewType == 'ADD') {
        model.oprType = '01';
        model.inputId = _this.loginCode;
        model.inputBrId = _this.org.code;
        model.inputDate = _this.updDate;
        model.createTime = _this.updateTime;
        strurl = backend.cmisLmt + '/api/lmtstrmtableconf/';
      }
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
      _this.dialogVisibleadd = true;
      _this.formDisabled = false;
      _this.viewType = 'ADD';
      _this.$nextTick(function () {
        _this.$refs.refAddForm.resetFields();
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
      _this.openTab(_this.$refs.refTable.selections[0].limitStrNo, '修改', 'EDIT');
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
      _this.openTab(_this.$refs.refTable.selections[0].limitStrNo, '详情', 'DETAIL');

      // _this.switchStatus('DETAIL', false);

      // _this.$nextTick(function () {
      //   _this.$refs.refForm.resetFields();

      //   yufp.clone(selectionsAry[0], _this.formdata);
      // });
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
              url: backend.cmisLmt + '/api/lmtstrmtableconf/deleteConfByLimitStrNo',
              data: selections[0].limitStrNo,
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
     * 额度结构配置维护
     */
    openTab: function (limitStrNo, title, viewType) {
      this.$router.addTab({
        name: 'zrcbank/lmt/lmtStrMtableConf/lmtSubBasicConfUpdate',
        title: title,
        key: limitStrNo + viewType,
        data: {
          limitStrNo: limitStrNo,
          viewType: viewType
        }
      });
    }
  }
};
</script>
