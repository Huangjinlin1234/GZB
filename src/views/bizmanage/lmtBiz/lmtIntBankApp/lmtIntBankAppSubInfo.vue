<template>
  <div>
    <yu-panel title="授信分项信息" panel-type="simple">
      <yu-button-drop>
        <yu-button v-show="saveBtnShow" type="primary" @click="addFn">新增</yu-button>
        <yu-button v-show="saveBtnShow" type="primary" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="infoFn">查看</yu-button>
        <yu-button v-show="saveBtnShow" type="primary" @click="deleteFn">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" selection-type="radio" request-type="POST" style="width: 100%;margin-top:10px;">
        <yu-xtable-column prop="subSerno" label="授信分项流水号"> </yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeName" label="授信分项额度名称"> </yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="授信额度（万元）">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.lmtAmt) }}</span>
          </template>
        </yu-xtable-column>
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
          <yu-xform-item label="是否循环额度" ctype="select" name="isRevolv" :rules="rule[0]" data-code="STD_ZB_YES_NO" placeholder="是否循环额度"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" :rules="rule[0]" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="授信额度(万元)" ctype="input" placeholder="授信额度(万元)" number-formatter="0,000.00" name="lmtAmt" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="额度期限(月)" ctype="input" placeholder="额度期限(月)" name="term" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item :hidden="isIvlMfShowStatus" label="是否涉及货币基金" ctype="select" name="isIvlMf" :rules="rule[0]" data-code="STD_ZB_YES_NO" placeholder="是否涉及货币基金" @change="isIvlMfChanges"></yu-xform-item>
          <yu-xform-item :hidden="showStatus" label="货币基金总授信额度(万元)" ctype="input" name="lmtMfAmt" :rules="rule[0]" number-formatter="0,000.00" placeholder="货币基金总授信额度"></yu-xform-item>
          <yu-xform-item :hidden="showStatus" label="单只货币基金授信额度(万元)" ctype="input" name="lmtSingleMfAmt" :rules="rule[0]" number-formatter="0,000.00" placeholder="单只货币基金授信额度"></yu-xform-item>
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
import {numFn, numDM} from "@/utils/unitchange";
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CUR_TYP');
export default {
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  components: { YufpDemoSelector },
  data: function () {
    return {
      formdata: {},
      dataParam: {},
      dataUrl: backend.cmisBiz + '/api/lmtintbankappsub/selectByModel',
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
      saveBtnShow: false,
      formDisabled: true,
      editDisabled: true,
      dialogBtnShow: true,
      showStatus: true,
      isIvlMfShowStatus: true,
      numFn,
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {

    /**
     *
     */
    isIvlMfChanges: function (item) {
      if (item != null && item == 1) {
        this.showStatus = false;
        return;
      }
      this.showStatus = true;
    },

    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.apprSerno;
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
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
      if (this.formdata.lmtBizType == '3006') {
        this.isIvlMfShowStatus = false;
      }
    },

    /**
     * 保存
     */
    doSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      model.lmtAmt = parseFloat(model.lmtAmt * 10000).toFixed();
      model.lmtMfAmt = model.lmtMfAmt == undefined ? 0 : parseFloat(model.lmtMfAmt * 10000).toFixed();
      model.lmtSingleMfAmt = model.lmtSingleMfAmt == undefined ? 0 : parseFloat(model.lmtSingleMfAmt * 10000).toFixed();
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.viewType == 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtintbankappsub/checksublimitprdid',
          data: model,
          callback: function (code, message, response) {
            console.log('=====>', response);
            if (response.data) {
              saveData();
            } else {
              _this.$message({
                message: '该授信品种已存在，不允许新增',
                type: 'warning'
              });
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtintbankappsub/getbiztotalbalamtcny',
          data: {
            condition: JSON.stringify({
              subSerno: model.origiLmtAccSubNo,
              serno: model.serno
            })
          },
          callback: function (code, message, response) {
            console.log('=====>', response);
            var bal = response.data;
            if (bal == null) { bal = 0 }
            var lmtAmt = model.lmtAmt;
            console.log('=====>', bal, lmtAmt);
            if (parseFloat(lmtAmt) >= parseFloat(bal)) {
              saveData();
            } else {
              _this.$message({
                message: '授信金额不可以小于分项向下占用总余额' + bal,
                type: 'warning'
              });
            }
          }
        });
      }
      // 保存
      function saveData () {
        model.updId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
        model.updBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
        model.updDate = _this.$xutils.getDefaultformulaData('$CURRDATE');
        model.updateTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
        var strurl = backend.cmisBiz + '/api/lmtintbankappsub/update';
        if (_this.viewType == 'ADD') {
          model.createTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
          strurl = backend.cmisBiz + '/api/lmtintbankappsub/';
        }
        // 向后台发送保存请求
        yufp.service.request({
          method: 'POST',
          url: strurl,
          data: model,
          callback: function (code, message, response) {
            _this.$refs.refTable.remoteData();
            _this.$emit("init");
            _this.$message('操作成功');
            _this.dialogVisible = false;
          }
        });
      }
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
        _this.isIvlMfShowStatus = true;
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
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
        _this.isIvlMfShowStatus = true;
        let obj = Object.assign({}, _this.$refs.refTable.selections[0]);
        obj = numDM(obj, "D");
        yufp.clone(obj, _this.formdata);
        if(obj.lmtAmt){
          _this.formdata.lmtAmt = parseFloat(obj.lmtAmt / 10000).toFixed()
        }
        if (obj.lmtBizType == '3006') {
          _this.isIvlMfShowStatus = false;
        }
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
        _this.isIvlMfShowStatus = true;
        let obj = Object.assign({}, selectionsAry[0]);
        obj = numDM(obj, "D");
        yufp.clone(obj, _this.formdata);

        if (_this.formdata.lmtBizType == '3006') {
          _this.isIvlMfShowStatus = false;
        }
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
              url:
                backend.cmisBiz + '/api/lmtintbankappsub/getbiztotalbalamtcny',
              data: {
                condition: JSON.stringify({
                  subSerno: selections[0].origiLmtAccSubNo,
                  serno: selections[0].serno
                })
              },
              callback: function (code, message, response) {
                var bal = response.data;
                if (parseFloat(bal) > 0) {
                  _this.$message('该分项存在未结清业务，不允许删除');
                } else {
                  deleteMethod(selections);
                  _this.getLmtAmtTerm(); // 更新
                }
              }
            });
          }
        }
      });
      // 删除方法
      function deleteMethod (selections) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtintbankappsub/logicalDelete',
          data: {
            condition: JSON.stringify({
              pkId: selections[0].pkId,
              serno: selections[0].serno
            })
          },
          callback: function (code, message, response) {
            _this.$emit("init");
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
          }
        });
      }
    }
  }
};
</script>
