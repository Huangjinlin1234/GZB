
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="额度管控白名单申请">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
        <yu-xform-group :column="4">
          <yu-xform-item placeholder="管控业务编号" name="bussNo" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button @click="addFn" v-if="checkCtrl('add')" type="primary">新增</yu-button>
        <yu-button @click="modifyFn" v-if="checkCtrl('edit')" type="primary">修改</yu-button>
        <yu-button @click="infoFn" v-if="checkCtrl('view')" type="primary">详情</yu-button>
        <yu-button @click="deleteFn" v-if="checkCtrl('delete')" type="primary">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" request-type="POST">
        <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务编号" prop="bussNo"></yu-xtable-column>
        <yu-xtable-column label="源系统" prop="sysId" data-code="STD_PERIPHERAL_SYS"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="例外类型" prop="exptType" data-code="STD_ZB_EXPT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
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
          <yu-xform-item label="业务编号" name="bussNo" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="源系统" name="sysId" :rules="rule[0]" ctype="select" data-code="STD_PERIPHERAL_SYS"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" :rules="rule[0]" ctype="input" icon="search" @click="onChange"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户类型" name="cusType" :rules="rule[0]" ctype="select" disabled data-code="STD_ZB_CUS_TYP"></yu-xform-item>
          <yu-xform-item label="例外类型" name="exptType" :rules="rule[0]" ctype="checkbox" data-code="STD_ZB_EXPT_TYPE"></yu-xform-item>
          <yu-xform-item label="例外原因" name="exptResn" :rules="rule[0]" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="saveBtnShow"  type="primary" @click="onSubmit">提交</yu-button>
          <yu-button   type="primary" @click="cancelFn">返回</yu-button>
        </div>
        <yufp-nwf-init ref="yufpNwfInit" @success-click="cancelFn"></yufp-nwf-init>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { imageSystem } from '@/utils/unitchange';
yufp.lookup.reg(
  'STD_ZB_EXPT_TYPE,STD_ZB_APPR_STATUS,STD_PERIPHERAL_SYS,STD_ZB_CUS_TYP'
);

export default {
  components: { YufpDemoSelector, yufpNwfInit },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/lmtexptlistapp/selectByModel',
      Param: { condition: JSON.stringify({ oprType: '01' }) },
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
      dialogVisibleMovie: false,
      movieOp: false
    };
  },
  mounted: function () {
    yufp.lookup.bind('STD_ZB_CUS_TYP', function (data) {
      console.log('============>>>', data);
    });
  },
  methods: {
    /**
     * 提交
     */
    onSubmit: function () {
      this.saveFn('SUBMIT');
    },
    /**
     * 流程提交节点选择框
     */
    submitFn: function () {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.formdata.inputBrId;
      startdto.userId = _this.formdata.inputId;
      startdto.bizType = 'ED002'; // 额度管控白名单申请流程
      startdto.bizId = _this.formdata.serno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        money: _this.formdata.lmtAmt,
        startOrgId: _this.$xutils.getDefaultformulaData('$LoginOrgCode')
      };
      startdto.bizParam4 = _this.formdata.serno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    /**
     * 选择
     */
    onChange () {
      var _this = this;
      if (_this.viewType == 'DETAIL') {
        return;
      }
      var data = {};
      this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        data,
        (params) => {
          console.log('==============>>', params);
          this.formdata.cusId = params.cusId;
          this.formdata.cusName = params.cusName;
          this.formdata.aorgNo = params.largeBankNo;
          this.formdata.cusType = params.cusType;
        }
      );
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
            contid: '',
            billno: ''
          }
        }
      ];
      let s;
      if (_this.movieOp) {
        s = '1';
      } else {
        s = '2';
      }
      imageSystem(imageBizParam, s, 'import;insert;download;scan;delImg').then(res => {
        window.open(res);
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
     * 保存
     */
    saveFn: function (actionType) {
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
      model.exptType = model.exptType.toString();
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var strurl = backend.cmisLmt + '/api/lmtexptlistapp/update';
      if (_this.viewType == 'ADD') {
        model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        strurl = backend.cmisLmt + '/api/lmtexptlistapp/';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message('保存成功');
            if (actionType !== 'SUBMIT') {
              _this.dialogVisible = false;
            } else {
              _this.submitFn();
            }
          } else {
            _this.$message('保存失败');
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
      _this.movieOp = true;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.formdata.oprType = '01';
        _this.formdata.approveStatus = '000';
        _this.formdata.serno = this.$xutils.getSEQWithParamFromServer(
          'LMT_SERNO'
        );
        _this.formdata.instuCde = this.$xutils.getDefaultformulaData(
          '$LoginInstuCode'
        );
        _this.formdata.inputId = this.$xutils.getDefaultformulaData(
          '$LoginLoginCode'
        );
        _this.formdata.inputDate = this.$xutils.getDefaultformulaData(
          '$CURRDATE'
        );
        _this.formdata.inputBrId = this.$xutils.getDefaultformulaData(
          '$LoginOrgCode'
        );
        _this.formdata.inputIdName = this.$xutils.getDefaultformulaData(
          '$LoginUserName'
        );
        _this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData(
          '$LoginOrgName'
        );
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
      _this.movieOp = true;
      var obj = _this.$refs.refTable.selections[0];
      if (!(obj.approveStatus == '000' || obj.approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
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
      _this.movieOp = false;
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
      if (
        !(
          selections[0].approveStatus == '000' ||
          selections[0].approveStatus == '992'
        )
      ) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
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
              url: backend.cmisLmt + '/api/lmtexptlistapp/logicaldelete',
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
