<template>
  <div>
  <div v-if="guarModel=='10' || guarModel=='20'">
    <yu-panel title="抵质押物信息" >
      <template slot="right">
        <yu-toolbar>
          <yu-button type="primary"  @click="imPort">引入押品</yu-button>
          <yu-button type="primary"  @click="canclImport">取消引入</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="post"  @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType !':'02'}" :default-load="false">
        <yu-xtable-column label="抵质押类别" prop="grtType" width="100"></yu-xtable-column>
        <yu-xtable-column label="认定价值" prop="identValue" width="100"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="evalValue" width="100"></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="collName" width="100"></yu-xtable-column>
        <yu-xtable-column label="所有权人" prop="ownerId" width="100"></yu-xtable-column>
        <yu-xtable-column label="押品类型" prop="collType" width="100"></yu-xtable-column>
        <yu-xtable-column label="授信业务流水号" prop="lmtSerno"></yu-xtable-column>
        <yu-xtable-column label="担保主键" prop="guarNo"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="保证人新增" :visible.sync="dialogVisibleSelected" width="650px">
        <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
          <yu-xform-group column="1">
            <yu-xform-item label="保证编号" ctype="input" name="guarNo" colspan="22" rules="required"></yu-xform-item>
            <yu-xform-item label="客户编号" rules="required" ctype="input" name="cusId" disabled colspan="22"></yu-xform-item>
            <yu-xform-item label="客户名称" rules="required" ctype="input" name="cusName" disabled colspan="22"></yu-xform-item>
            <yu-xform-item label="客户类型" rules="required" ctype="select" data-code="STD_CUS_TYPE" name="cusType" disabled colspan="22" value="211"></yu-xform-item>
            <yu-xform-item label="业务类型" rules="required" ctype="select" data-code="STD_SX_LMT_TYPE" name="lmtType" disabled colspan="22"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="nextFn">下一步</yu-button>
            <yu-button type="primary" @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
    </div>
    <div v-if="guarModel=='30'">
      <yu-panel title="保证担保信息">
      <template slot="right">
        <yu-toolbar>
          <yu-button type="primary"  @click="addGuar">新增</yu-button>
          <yu-button type="primary"  @click="canclImport">删除</yu-button>
          <yu-button type="primary"  @click="editGuaree">修改</yu-button>
          <yu-button type="primary"  @click="viewGuar">查看</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable ref="refGuaraneeTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataGuaraneeUrl" :default-load="false">
        <yu-xtable-column label="保证方式" prop="guarType" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证人客户名称" prop="guarCusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证金额" prop="guarAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证人客户编号" prop="guarCusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="授信业务流水号" prop="lmtSerno"></yu-xtable-column>
        <yu-xtable-column label="担保主键" prop="guarNo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/querguarinforel/',
      dataGuaraneeUrl: this.$backend.cmisBiz + '/api/guarguarantee/querguaranteerel/',
      selectShow: {},
      guarModel: this.getFactory().contextData.guarMode,
      subSerno: this.getFactory().contextData.subSerno
    };
  },
  mounted () {
  },
  methods: {
    innit: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsub/getbysubserno',
        data: subSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.guarMode = response.data.guarMode;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 点击引入，进入抵质押引入页面
    imPort () {
      this.$dialog.open(
        '引入抵质押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCard',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.d1_A_BillList.queryDataByCondition();
        }
      );
    },
    // 点击引入，进入保证人引入页面
    OnImportGuar () {
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfo',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.innit(this.subSerno);
        }
      );
    },
    // 保证人删除申请
    delete () {
      // const params = this.$refs.d1_B_BillList.selections;
      var _this = this;
      const params = _this.$refs.refGuaraneeTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var pkId = params.pkId;
      this.$xutils.showConfirmBox(
        '提示',
        '是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/guarbizrel/delete/' + pkId,
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.d1_B_BillList.queryDataByCondition();
                  });
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },
              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },
    // 抵质押删除申请
    canclImport () {
      var _this = this;
      const params = _this.$refs.refTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var pkId = params.pkId;
      this.$xutils.showConfirmBox(
        '提示',
        '是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/guarbizrel/delete/' + pkId,
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.d1_A_BillList.queryDataByCondition();
                  });
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },
    // 修改保证人
    editGuaree () {
      var _this = this;
      const params = _this.$refs.refGuaraneeTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['biz_type'] = '02';
      this.params['serno'] = params.serno;
      this.params['guarantyId'] = params.guarantyId;
      this.params['pkId'] = params.pkId;
      this.params['cusId'] = params.cusId;
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfoUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.$xutils.getParentPage(this, 'd1_B_BillList', 'queryDataByCondition');
        }
      );
    },
    // 返回
    OnCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};

</script>
