<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 财务情况————低风险版的修改
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="tableFormdata" :disabled="true">
      <yu-panel title="" panel-type="simple" >
        <yu-xform ref="situBsSmallBusiForm4" label-width="240px" v-model="formdataSituBsSmallBusi5" >
          <yu-panel title="申请企业" panel-type="simple" >
            <yu-xform-group :column="1">
              <yu-xform-item label="企业名称" name="companyName" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="销售" panel-type="simple" >
            <yu-xform-group :column="6">
              <yu-xform-item label="主键" name="pkId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="流水号" name="serno" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="采集年月" name="acquisitionDate" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="最近第二年销售自制报表" name="lastTwoYearSaleSr" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="最近第一年销售自制报表" name="lastYearSaleSr" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="当前年月销售自制报表" name="curYmSaleSr" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="销售自制报表资产总额" name="saleSrTotalAssets" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="销售自制报表净资产" name="saleSrNetAssets" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="销售自制报表资产负债率" name="saleSrDebt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="最近第二年销售开票销售" name="lastTwoYearInvoiceSales" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="最近第一年销售开票销售" name="lastYearInvoiceSales" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="当前年月销售开票销售" name="curYmInvoiceSales" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="销售开票销售资产总额" name="invoiceSalesTotalAssets" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="销售开票销售净资产" name="invoiceSalesNetAssets" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="销售开票销售资产负债率" name="invoiceSalesDebt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="利润总和" panel-type="simple" >
            <yu-xform-group :column="6">
              <yu-xform-item label="最近第二年利润总额自制报表" name="lastTwoYearTotalProfitSr" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="最近第一年利润总额自制报表" name="lastYearTotalProfitSr" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="当前年月利润总额自制报表" name="curYmTotalProfitSr" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="利润总额自制报表资产总额" name="totalProfitSrTotalAssets" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="利润总额自制报表净资产" name="totalProfitSrNetAssets" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="利润总额自制报表资产负债率" name="totalProfitSrDebt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </yu-panel>
    </yu-xform>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: '/trade/example/list',
      formdata: {},
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  mounted () {
    var _this = this;
    // let data = _this.$route.meta.params;
    let data = _this.pageParams;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/rptfncsitubslowrisk/showdetialsub',
      data: { pkId: data.pkId },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdataSituBsSmallBusi5);
      }
    });
  },

  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      // this.$router.go(-1);
      this.$dialog.close(this.dialogId);
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      // model 和后台的对象pvpLoanApp对应
      yufp.clone(_this.formdataSituBsSmallBusi5, model);
      var url = backend.cmisBiz + '/api/rptfncsitubslowrisk/commonupdaterptfncsitubslowrisk';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$dialog.close(_this.dialogId);
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
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
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
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

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/toppacctsub/delete/' + selections[0].pkId,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '删除成功', type: 'success' });
                } else {
                  _this.$message({ message: '删除失败', type: 'error' });
                }
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
    }
  }
};
</script>
