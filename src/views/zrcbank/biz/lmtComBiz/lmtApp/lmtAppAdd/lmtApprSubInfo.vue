<template>
  <div>
    <div>
    <yu-panel title="授信分项信息" :hideFilter="false" :collapseHide="false">
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
          <yu-xform-item label="授信金额" ctype="yu-num" name="lmtAmt" placeholder="授信金额" :disabled="disAble"></yu-xform-item>
          <yu-xform-item label="授信期限" ctype="input" placeholder="授信期限" name="lmtTerm" hidden></yu-xform-item>
          <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" disabled data-code="STD_ZB_YES_NO" placeholder="是否预授信额度" :colspan="12"></yu-xform-item>
          <yu-xform-item label="原额度分项编号" ctype="input" placeholder="原额度分项编号" name="origiLmtAccSubNo" hidden></yu-xform-item>
          <yu-xform-item label="原额度分项金额" ctype="input" placeholder="原额度分项金额" name="origiLmtAccSubAmt" hidden></yu-xform-item>
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
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button v-if="type!='VIEW'"  type="primary" @click="onSave">保存</yu-button>
    </yu-form-buttons>
    </div>
    <div>
        <yu-toolbar>
          <yu-button v-if="type!='VIEW'" @click="addSubPrdFn">新增</yu-button>
          <yu-button v-if="type!='VIEW'" @click="modifySubPrdFn">修改</yu-button>
          <yu-button @click="viewSubPrd">查看</yu-button>
          <yu-button v-if="type!='VIEW'" @click="deleteSubPrd">删除</yu-button>
        </yu-toolbar>
      <yu-xtable :data="lmtApprSubPrdList" ref="refPrdTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subPrdSerno"></yu-xtable-column>
         <yu-xtable-column label="授信审批分项适用品种流水号" prop="apprSubPrdSerno" hidden></yu-xtable-column>
        <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="授信额度（元）" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="额度期限（月）" prop="lmtTerm"></yu-xtable-column>
      </yu-xtable>
    </div>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_WAY');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      lmtApprSubPrdList: [],
      formDisabled: false,
      dialogVisibleSelected: false,
      formdata: {},
      tempData: {}
    };
  },
  mounted () {
    this.innitFrom(this.$route.params.approveSubSerno);
    this.innitSubPrdTable(this.$route.params.approveSubSerno);
  },
  methods: {
    innitFrom: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtapprsub/getbysubserno',
        data: {'subSerno': subSerno},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
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
      var jsoPar = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisBiz + '/api/lmtapprsub/updatelmtapprsub',
        data: jsoPar,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.rtnData = response.data;
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(_this.rtnData) == '{}') {
        return;
      }
      if (_this.rtnData.rtnCode != '0000') {
        _this.$xutils.showMsgBox('提示', '错误代码：' + _this.rtnData.rtnCode + '；错误信息：' + _this.rtnData.rtnMsg); // 弹出提示
        return;
      }
      _this.$message('修改成功');
    },

    /**
     * 初始化授信适用产品列表
     */
    innitSubPrdTable: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtapprsubprd/selectbysubserno',
        data: {'subSerno': subSerno},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtApprSubPrdList = response.data;
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
      var subSerno = _this.$route.params.approveSubSerno;
      var jsoPar = _this.formdata;
      jsoPar['op'] = 'ADD';
      this.$dialog.open(
        '授信批复新增',
        'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtApprChgSubPrdInfo',
        1000,
        600,
        jsoPar,
        function () {
          _this.innitSubPrdTable(subSerno);
          _this.innitFrom(subSerno);
        },
        true
      );
    },

    /**
     * 跳转到授信适用产品修改页面
     */
    modifySubPrdFn: function () {
      var _this = this;
      var jsoPar = _this.$refs.refPrdTable.selections;
      var subSerno = _this.$route.params.approveSubSerno;
      if (jsoPar.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      jsoPar['op'] = 'EDIT';
      this.$dialog.open(
        '授信批复修改',
        'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtApprChgSubPrdInfo',
        1000,
        600,
        jsoPar,
        function () {
          _this.innitSubPrdTable(subSerno);
          _this.innitFrom(subSerno);
        },
        true
      );
    },

    /**
     * 跳转到授信适用产品查看页面
     */
    viewSubPrd: function () {
      var _this = this;
      var jsoPar = _this.$refs.refPrdTable.selections;
      var subSerno = _this.$route.params.approveSubSerno;
      if (jsoPar.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      jsoPar['op'] = 'VIEW';
      this.$dialog.open(
        '授信批复查看',
        'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtApprChgSubPrdInfo',
        1000,
        600,
        jsoPar,
        function () {
          _this.innitSubPrdTable(subSerno);
        },
        true
      );
    },

    /**
     * 删除授信适用产品
     */
    deleteSubPrd: function () {
      var _this = this;
      var selections = _this.$refs.refPrdTable.selections;
      var subSerno = _this.$route.params.approveSubSerno;
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
              url: backend.cmisBiz + '/api/lmtapprsubprd/deletelmtapprsubprd',
              data: selections[0],
              callback: function (code, message, response) {
                _this.innitSubPrdTable(subSerno);
                _this.$message('操作成功');
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
      this.$router.go(-1);
    }
  }

};

</script>
