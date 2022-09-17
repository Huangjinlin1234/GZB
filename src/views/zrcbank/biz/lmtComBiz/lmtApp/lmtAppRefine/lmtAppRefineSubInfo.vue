<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="分项流水号" ctype="input" placeholder="分项流水号" name="subSerno" hidden></yu-xform-item>
          <yu-xform-item label="分项名称" ctype="input" placeholder="分项名称" name="subName" hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarMode" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" :colspan="12"></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
          <yu-xform-item label="预授信品种编号" ctype="input" placeholder="预授信品种编号" name="preLmtBizType" hidden></yu-xform-item>
          <yu-xform-item label="授信金额(元)" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" placeholder="授信金额"></yu-xform-item>
          <yu-xform-item label="授信期限(月)" ctype="input" placeholder="授信期限" name="lmtTerm" hidden></yu-xform-item>
          <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" disabled data-code="STD_ZB_YES_NO" placeholder="是否预授信额度" :colspan="12"></yu-xform-item>
          <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" disabled data-code="STD_ZB_YES_NO" placeholder="是否循环额度" :colspan="12"></yu-xform-item>
          <yu-xform-item label="原额度分项编号" ctype="input" placeholder="原额度分项编号" name="origiLmtAccSubNo" hidden></yu-xform-item>
          <yu-xform-item label="原额度分项金额" ctype="yu-num" number-formatter="0,000.00" placeholder="原额度分项金额" name="origiLmtAccSubAmt" hidden></yu-xform-item>
          <yu-xform-item label="原额度分项期限" ctype="input" placeholder="原额度分项期限" name="origiLmtAccSubTerm" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button v-if="type!='VIEW'"  type="primary" @click="onSave">保存</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
    </div>
    <div>
        <yu-toolbar>
          <yu-button type="primary" v-if="type!='VIEW'" @click="addSubPrdFn">新增</yu-button>
          <yu-button type="primary" v-if="type!='VIEW'" @click="modifySubPrdFn">修改</yu-button>
          <yu-button type="primary" @click="viewSubPrd">查看</yu-button>
          <yu-button type="primary" v-if="type!='VIEW'" @click="deleteSubPrd">删除</yu-button>
        </yu-toolbar>
      <yu-xtable :data="lmtAppSubPrdList" ref="refPrdTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subPrdSerno"></yu-xtable-column>
        <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
        <yu-xtable-column label="分项流水号" prop="subSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY" ></yu-xtable-column>
        <yu-xtable-column label="授信额度（元）" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="额度期限（月）" prop="lmtTerm"></yu-xtable-column>
      </yu-xtable>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      lmtAppSubPrdList: [],
      formDisabled: false,
      dialogVisibleSelected: false,
      formdata: {},
      tempData: {},
      type: this.getFactory().contextData.op,
      disAble: this.getFactory().contextData.disAble,
      lmtAmt: '',
      serno: '',
      lmtTerm: '',
      lmtGraperTerm: ''
      // dataUrl: backend.cmisBiz + '/api/lmtappsubprd/selectbysubserno' + this.getFactory().contextData.serno
    };
  },
  mounted () {
    this.innitFrom(this.getFactory().contextData.subSerno);
    this.innitSubPrdTable(this.getFactory().contextData.subSerno);
    this.getLmtTerm();
  },
  methods: {
    innitFrom: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsub/getbysubserno',
        data: subSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
            _this.lmtAmt = response.data.lmtAmt;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    getLmtTerm: function () {
      var _this = this;
      _this.serno = this.getFactory().contextData.serno;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {serno: _this.serno},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // if (response.data.lmtTerm != '') {
            //   _this.lmtTerm = response.data.lmtTerm;
            // }
            _this.lmtTerm = response.data.lmtTerm;
            _this.lmtGraperTerm = response.data.lmtGraperTerm;
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    /**
     * 更新授信分项信息
     */
    onSave () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var jsoPar = _this.formdata;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsub/updatelmtappsub',
        data: jsoPar,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.rtnData = response.data;
              this.$message('修改成功');
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
              _this.formdata.lmtAmt = _this.lmtAmt;
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 初始化授信适用产品列表
     */
    innitSubPrdTable: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsubprd/selectbysubserno',
        data: _this.formdata.subSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtAppSubPrdList = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 跳转到授信适用产品新增页面
     */
    addSubPrdFn: function () {
      var _this = this;
      var subSerno = _this.getFactory().contextData.subSerno;
      var jsoPar = _this.formdata;
      if (_this.type == 'REFINE') {
        jsoPar['op'] = 'REFINE';
      } else {
        jsoPar['op'] = 'ADD';
      }
      jsoPar['editAble'] = false;
      jsoPar['model_group_no'] = 'CMG000700';
      jsoPar['isPreLmt'] = _this.formdata.isPreLmt;
      jsoPar['lmtTerm'] = _this.lmtTerm;
      jsoPar['lmtGraperTerm'] = _this.lmtGraperTerm;
      this.$dialog.open(
        '单一客户授信申报',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        jsoPar,
        function () {
          _this.innitSubPrdTable(subSerno);
        },
        true
      );
    },

    /**
     * 跳转到授信适用产品修改页面
     */
    modifySubPrdFn: function () {
      var _this = this;
      var subSerno = _this.getFactory().contextData.subSerno;
      var rowData = _this.$refs.refPrdTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      rowData['op'] = 'EDIT';
      rowData['subPrdSerno'] = rowData[0].subPrdSerno;
      rowData['editAble'] = false;
      rowData['model_group_no'] = 'CMG000700';
      rowData['pk_id'] = rowData[0].pkId;
      rowData['isPreLmt'] = rowData[0].isPreLmt;
      rowData['subSerno'] = subSerno;
      this.$dialog.open(
        '单一客户授信申报',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        rowData,
        function () {
          _this.innitSubPrdTable(subSerno);
        },
        true,
        true
      );
    },

    /**
     * 跳转到授信适用产品查看页面
     */
    viewSubPrd: function () {
      var _this = this;
      var rowData = _this.$refs.refPrdTable.selections;
      var subSerno = _this.getFactory().contextData.subSerno;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['op'] = 'VIEW';
      rowData['subPrdSerno'] = rowData[0].subPrdSerno;
      rowData['editAble'] = true;
      rowData['model_group_no'] = 'CMG000700';
      rowData['pk_id'] = rowData[0].pkId;
      rowData['isPreLmt'] = rowData[0].isPreLmt;
      rowData['subSerno'] = subSerno;
      this.$dialog.open(
        '单一客户授信申报',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        rowData,
        null,
        true,
        true
      );
    },

    /**
     * 删除授信适用产品
     */
    deleteSubPrd: function () {
      var _this = this;
      var selections = _this.$refs.refPrdTable.selections;
      var subSerno = _this.getFactory().contextData.subSerno;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtappsubprd/deletelmtappsubprd',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.rtnCode == '20042') {
                    _this.$xutils.showMsgBox('提示', response.rtnMsg);
                  } else {
                    _this.innitSubPrdTable(subSerno);
                    _this.$message('操作成功');
                  }
                }
              }
            });
          }
        }
      });
    },

    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.getFactory().back();
    }
  }
};
</script>
