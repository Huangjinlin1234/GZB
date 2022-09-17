<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="承兑行白名单管理">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
        <yu-xform-group :column="2">
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop :show-length="8">
        <yufp-excel-export :export-url="exportTemplateUrl" title="模板下载" v-if="checkCtrl('download')" type="primary"></yufp-excel-export>
        <yufp-excel-import :import-url="excelImportUrl" title="批量导入" v-if="checkCtrl('import')" max-file-size="200" :async="false" @import-success="doAutoQuery"  type="primary"></yufp-excel-import>
        <yufp-excel-export :export-url="excelExportUrl" title="批量导出" v-if="checkCtrl('export')" :export-param="searchFormdata"  type="primary" style="margin-right: 10px;"></yufp-excel-export>
        <yu-button @click="addFn" v-if="checkCtrl('add')" type="primary">新增</yu-button>
        <yu-button @click="modifyFn" v-if="checkCtrl('edit')" type="primary">修改</yu-button>
        <yu-button @click="infoFn" v-if="checkCtrl('view')" type="primary">详情</yu-button>
        <yu-button @click="deleteFn" v-if="checkCtrl('delete')" type="primary">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" requestType="POST" selection-type="radio" style="margin-top:5px">
        <yu-xtable-column label="金融机构代码" prop="instuCde" width="120" data-code="STD_ZB_INSTU_CDE"></yu-xtable-column>
        <yu-xtable-column label="额度分项编号" prop="subAccNo" width=""></yu-xtable-column>
        <yu-xtable-column label="白名单额度类型" prop="lmtWhiteType" width="" data-code="STD_ZB_LMT_WHITE_TYPE" hidden="true"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width=""></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
        <yu-xtable-column label="总行行号" prop="aorgNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="机构类型" prop="cusType" width="120" :formatter="intbankTypeCdFormatter"></yu-xtable-column>
        <yu-xtable-column label="限额（万元）" prop="sigAmt" width="120px">
          <template slot-scope="scope">
            <span>{{ div(scope.row.sigAmt , 10000) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="到期日" prop="endDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="金融机构代码" name="instuCde" ctype="select" data-code="STD_ZB_INSTU_CDE" disabled></yu-xform-item>
          <yu-xform-item label="额度分项编号" name="subAccNo" :hidden="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="白名单额度类型" name="lmtWhiteType" :hidden="true" ctype="select" data-code="STD_ZB_LMT_WHITE_TYPE"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" :rules="rule[0]" icon="search" @click="onChange" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="总行行号" name="aorgNo" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          <!-- <yu-xform-item label="机构类型" name="cusType" ctype="select" data-code="STD_ZB_INTBANK_TYPE"></yu-xform-item> -->
          <yu-xform-item label="机构类型" ctype="yu-xdic-tree" placeholder="机构类型" name="cusType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" :selectionType="radio" disabled></yu-xform-item>
          <yu-xform-item label="限额（万元）" name="sigAmt" :formatter="formatter" :digit="6" type="num" unit="万" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="已用限额（万元）" name="sigUseAmt" :hidden="hiddenflag" ctype="" unit="万" disabled></yu-xform-item>
          <yu-xform-item label="生效日期" name="startDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="到期日期" name="endDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button  type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import mixinForm from '@/utils/mixins/mixin-form';

yufp.lookup.reg('STD_ZB_LMT_WHITE_TYPE,STD_ZB_INTBANK_TYPE,STD_ZB_OPR_TYPE,STD_ZB_INSTU_CDE');


export default {
  components: { YufpDemoSelector, YufpExcelExport, YufpExcelImport },
  mixins: [mixinForm],
  data: function () {
    return {
      DZDataObject: {},
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/lmtwhiteinfo/querymodel',
      exportTemplateUrl: backend.cmisLmt + '/api/lmtwhiteinfo/exportwhiteinfo01',
      excelImportUrl: backend.cmisLmt + '/api/lmtwhiteinfo/importwhiteinfo01',
      excelExportUrl: backend.cmisLmt + '/api/lmtwhiteinfo/exportlmtwhiteinfo01',
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
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      data: {
        optType: 'STD_ZB_INTBANK_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data, this.DZData);
        console.log("res.data------------->", res.data);
        this.$refs.refTable.remoteData();
      }
    });
  },
  mounted () {
    yufp.lookup.bind('STD_ZB_INTBANK_TYPE', function (data) {
      console.log('============>>>>>>', data);
    });
  },
  methods: {
    /**
     * 选择
     */
    onChange () {
      var _this = this;
      if (_this.viewType == 'DETAIL' || _this.viewType == 'EDIT') {
        return;
      }
      var dialogData = {};
      this.$dialog.open(
        '',
        'zrcbank/lmt/lmtcusIntbankQuery/lmtcusIntbankQuery',
        -1,
        -1,
        dialogData,
        params => {
          // 向后台发送请求
          yufp.service.request({
            method: 'POST',
            url: backend.cmisLmt + '/api/lmtwhiteinfo/checkSameOrgCusIdIsExist',
            data: { condition: JSON.stringify({ cusId: params.cusId}) },
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.data == 0) {
                  // 传字段
                  _this.formdata.cusId = params.cusId;
                  _this.formdata.cusName = params.cusName;
                  _this.formdata.aorgNo = params.largeBankNo;
                  _this.formdata.cusType = params.intbankType;
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '客户已存在，不允许新增！',
                    type: 'warning'
                  });
                }
              }
            }
          });
        }
      );
    },

    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    },

    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },

    // 乘法
    mul: function (num1, num2) {
      return parseFloat(parseFloat(num1 * num2).toFixed(6));
    },

    // 除法
    div: function (num1, num2) {
      return parseFloat(parseFloat(num1 / num2).toFixed(6));
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
      }
      let startDate = this.getTime(model.startDate);
      let endDate = this.getTime(model.endDate);
      if (startDate > endDate) {
        _this.$message({
          message: '生效日期不能大于到期日期',
          type: 'warning'
        });
        return;
      }
      model.sigAmt = this.mul(_this.formdata.sigAmt, 10000);
      model.sigUseAmt = this.mul(_this.formdata.sigUseAmt, 10000);
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var strurl = backend.cmisLmt + '/api/lmtwhiteinfo/update';
      if (_this.viewType == 'ADD') {
        model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        strurl = backend.cmisLmt + '/api/lmtwhiteinfo/';
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
      _this.hiddenflag = true;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.formdata.oprType = '01';
        _this.formdata.lmtWhiteType = '01';
        _this.formdata.instuCde = this.$xutils.getDefaultformulaData('$LoginInstuCode');
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
      _this.hiddenflag = false;
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
        _this.formdata.sigAmt = _this.div(_this.formdata.sigAmt, 10000);
        _this.formdata.sigUseAmt = _this.div(_this.formdata.sigUseAmt, 10000);
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
      _this.hiddenflag = false;
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        yufp.clone(selectionsAry[0], _this.formdata);
        _this.formdata.sigAmt = _this.div(_this.formdata.sigAmt, 10000);
        _this.formdata.sigUseAmt = _this.div(_this.formdata.sigUseAmt, 10000);
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

      if (selections[0].sigUseAmt != null && selections[0].sigUseAmt != 'null' && selections[0].sigUseAmt != 0) {
        _this.$message({
          message: '已用限额不为0的数据不允许删除',
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
              url: backend.cmisLmt + '/api/lmtwhiteinfo/logicalDelete/' + selections[0].pkId,
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
    },
    intbankTypeCdFormatter (row, column, cellValue) {
           console.log(this.DZDataObject);
      if (cellValue && this.DZData.length > 0) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    }
  }
};
</script>
