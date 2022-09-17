<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="授信基本信息" panel-type="simple">
      <yu-xform ref="refForm" label-width="100px" v-model="formReport">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" name="appType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>

<!--        <yu-panel title="机构准入信息" panel-type="simple">-->
<!--          <yu-xform-group :column="2">-->
<!--            <yu-xform-item label="准入期限" name="endDate" ctype="datepicker" rules="required"></yu-xform-item>-->
<!--          </yu-xform-group>-->
<!--        </yu-panel>-->
      </yu-xform>
    </yu-panel>
    <yu-panel title="审批意见" panel-type="simple">
      <yu-panel title="其他要求" panel-type="simple">
        <yu-button-drop v-if="saveBtnShow" :show-length="8">
          <yu-button @click="addLoanCond" type="primary">添加</yu-button>
          <yu-button @click="deleteLoanCond" type="primary">删除</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable1" condition-key="condition" row-number :pageable="false" :data-url="apprLoanUrl" :base-params="apprLoanParam" request-type="POST">
          <yu-xtable-column label="具体内容" prop="condDesc" align="left"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-panel>
    <yu-xdialog title="其他要求" :visible.sync="dialogLoanCond" width="1000px">
      <yu-xform ref="refFormLoanCond" label-width="100px" v-model="formdataLoanCond">
        <yu-xform-group>
          <yu-xform-item label="具体内容" name="condDesc" rules="required" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveLoanBtn">保存</yu-button>
          <yu-button  type="primary" @click="canclLoanFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <div class="yu-grpButton">
      <yu-button v-if="saveBtnShow" type="primary" @click="saveBtn">保存</yu-button>
      <yu-button type="primary" @click="doPrint">查看批复报告</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="goBackFn">返回</yu-button>
    </div>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_SX_LMT_TYPE,STD_ZB_YES_NO');
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      dataUrl: '',
      dataParam: {},
      apprLoanUrl: '',
      apprLoanParam: {},
      formReport: {},
      dialogVisible: false,
      formdataDialog: {},
      formDisabled: false,
      saveBtnShow: false,
      dialogLoanCond: false
    };
  },
  mounted () {
    let op = this.pageParams.op;
    op == 'EDIT' ? this.saveBtnShow = true : this.saveBtnShow = false;
    this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/intbankorgadmitappr/selectByModel',
        data: {
          condition: JSON.stringify({
            serno: _this.pageParams.serno,
            oprType: '01',
            issueReportType: '03'
          }),
          sort: 'createTime desc'
        },
        callback: function (code, message, response) {
          if (code == 0) {
            console.log('===============>>>>', response);
            // 反显字段
            yufp.clone(response.data[0], _this.formReport);
            _this.approveSerno = response.data[0].approveSerno;

            _this.apprLoanUrl =
              _this.$backend.cmisBiz +
              '/api/lmtapprloancond/selectByQueryModel';
            _this.apprLoanParam = {
              condition: JSON.stringify({
                approveSerno: _this.approveSerno,
                condType: '01'
              })
            };
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },

    /**
      其他要求返回按钮
      */
    canclLoanFn: function () {
      var _this = this;
      _this.$refs.refFormLoanCond.resetFields();
      _this.dialogLoanCond = false;
    },
    /**
      添加要求按钮
     */
    addLoanCond: function () {
      var _this = this;
      _this.dialogLoanCond = true;
    },
    /**
      其他要求保存按钮
      */
    saveLoanBtn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refFormLoanCond.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtapprloancond/insertLoanCond',
        data: {
          condition: JSON.stringify({
            condDesc: _this.formdataLoanCond.condDesc,
            approveSerno: _this.approveSerno,
            condType: '01'
          })
        },
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message('操作成功');
            _this.dialogLoanCond = false;
            _this.$refs.refFormLoanCond.resetFields();
            _this.init();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    /**
      删除按钮
     */
    deleteLoanCond: function () {
      var _this = this;
      var selections = _this.$refs.refTable1.selections;
      var obj = _this.$refs.refTable1.selections[0];
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
              url: backend.cmisBiz + '/api/lmtapprloancond/deleteByPkId',
              data: obj,
              callback: function (code, message, response) {
                _this.$refs.refTable1.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 打印
    doPrint: function () {
      var _this = this;
      const params = {};
      params.serno = _this.formReport.serno;
      params.cusId = _this.formReport.cusId;
      params.src =
        _this.$backend.frptRptService +
        'zjty-npf11.cpt&serno=' +
        params.serno;
      this.$emit('doPrint', params);
    },
    // 保存
    saveBtn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/intbankorgadmitappr/updateAppr',
        data: _this.formReport,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message('操作成功');
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }
  }
};
</script>
