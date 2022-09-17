<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请—————交易对手账号
  -->
  <div>
    <yu-panel title="交易对手账号" :hideFilter="false" :collapseHide="false"  :disabled="op=='VIEW'||op=='view'">
        <yu-toolbar>
          <yu-button type="primary" @click="addFn" :hidden="op=='VIEW'||op=='view'">新增</yu-button>
          <yu-button type="primary" @click="modifyFn" :hidden="op=='VIEW'||op=='view'">修改</yu-button>
          <yu-button type="primary" @click="deleteFn" :hidden="op=='VIEW'||op=='view'">删除</yu-button>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
        </yu-toolbar>
      <!--<template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item label="流水号" name="bizSerno" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>-->
      <yu-xtable ref="refTable"  row-number :data-url="dataUrl"  request-type="POST" style="margin-top: 10px" condition-key="condition" :base-params="baseParams"  >
        <yu-xtable-column label="流水号" prop="bizSerno" width=""></yu-xtable-column>
        <yu-xtable-column label="是否线上" prop="isOnline" width="" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否本行账户" prop="isBankAcct" width="" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="交易对手账号" prop="toppAcctNo" width=""></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName" width=""></yu-xtable-column>
        <yu-xtable-column label="交易对手金额" prop="toppAmt" width=""></yu-xtable-column>
        <yu-xtable-column label="开户行号" prop="acctsvcrNo" width=""></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="acctsvcrName" width=""></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group column="1">
          <yu-xform-item label="流水号" name="bizSerno" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="业务场景" name="bizSence" ctype="select" rules="required" data-code="STD_BIZ_SENCE"></yu-xform-item>
          <yu-xform-item label="是否线上" name="isOnline" rules="required" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="是否本行账户" name="isBankAcct" rules="required" ctype="select" data-code="STD_ZB_YES_NO" @change="isBankAcctChange"></yu-xform-item>
          <yu-xform-item label="交易对手账号" name="toppAcctNo" ctype="input" rules="required" icon="search" :triger-click="false" :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="交易对手名称" name="toppName" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="交易对手金额" name="toppAmt" ctype="yu-num" rules="required"></yu-xform-item>
          <yu-xform-item label="开户行号" ctype="input" placeholder="开户行号" name="acctsvcrNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }" :hidden="!isHidden" :colspan="22">
            <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get"  :colspan="2"  :hidden="!isHidden">
                <yu-button type="primary" @click="getAcctsvcrNo">选择</yu-button>
              </yu-xform-item>
          <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName" rules="required" :colspan="24"  :hidden="!isHidden"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO,STD_BIZ_SENCE');
let obj = {};
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/toppacctsub/querytoppacctsub',
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
      isHidden: true,
      op: '',
      pvpSerno: '',
      data: {}
      // isHighCont: true
    };
  },
  // condition: JSON.stringify({ guarContState: '101'})
  created () {
    var _this = this;
    var pvpSerno = '';
    if (this.getFactory().contextData.instanceInfo) {
      obj = this.getFactory().contextData.instanceInfo;
      pvpSerno = obj.bizId;
      this.op = obj.param.op;
    } else if (this.$route.meta.params) {
      obj = this.$route.meta.params;
      pvpSerno = obj.pvpSerno;
      this.op = obj.op;
    } else {
      obj = this.getFactory().contextData;
      pvpSerno = obj.pvpSerno;
      this.op = obj.op;
    }
    // if (obj.contType == '2' || obj.contType == '3') {
    //   _this.isHighCont = true;
    // } else {
    //   _this.isHighCont = false;
    // }
    // 如果有出账流水号就根据出账流水号查询
    _this.pvpSerno = pvpSerno;
    _this.data = obj;
    if (_this.pvpSerno != null && _this.pvpSerno != '') {
      _this.baseParams = {condition: JSON.stringify({ bizSerno: _this.pvpSerno, oprType: '01'})};
    }
  },
  mounted () {
    var _this = this;
    _this.formdata.isOnline = '1';
  },
  methods: {
    AfterInit () {

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
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/toppacctsub/saveToppAcctSub',
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
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.formdata.bizSerno = obj.pvpSerno;
        _this.formdata.bizSence = '3';
      });
    },

    // 修改
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$dialog.open('交易对手账户', 'zrcbank/biz/pvpLoanApp/toppAcctSubInfo', 1000, 600, {
          pkId: _this.$refs.refTable.selections[0].pkId
        }, () => {
          _this.$refs.refTable.remoteData();
        });
      });
    },
    // 查看
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$dialog.open('交易对手账户', 'zrcbank/biz/pvpLoanApp/toppAcctSubView', 1000, 600, {
          pkId: _this.$refs.refTable.selections[0].pkId
        });
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
    },

    // 是否本行用户
    isBankAcctChange () {
      var _this = this;
      _this.formdata.toppAcctNo = '';
      _this.formdata.toppName = '';
      var isBankAcct = _this.formdata.isBankAcct;
      if (isBankAcct == '1') {
        _this.isHidden = false;
      } else {
        _this.isHidden = true;
      }
    },

    // 选择开户行
    getAcctsvcrNo () {
      var _this = this;
      var jsoPar = _this.formdata;
      // if (!jsoPar.acctsvcrNo) {
      //   _this.$message({
      //     message: '请先输入开户行行号！',
      //     type: 'warning'
      //   });
      //   return;
      // }
      var data = { aorgNo: jsoPar.acctsvcrNo };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.acctsvcrNo = params.bankNo;
        this.$refs.refForm.formdata.acctsvcrName = params.bankName;
      });
    },

    // 选择交易对手账户
    handleIconClick: function () {
      var _this = this;
      if (!_this.formdata.isBankAcct || _this.formdata.isBankAcct == null || _this.formdata.isBankAcct == '') {
        _this.$message({ message: '请先选择是否本行账户！', type: 'warning' });
        return;
      }
      if (_this.formdata.isBankAcct == '1') {
        let toppAcctNo = _this.formdata.toppAcctNo;
        if (toppAcctNo == null || toppAcctNo == '') {
          _this.$message({ message: '交易对手账号不能为空!\r\n请重新操作!', type: 'warning' });
          // _this.$xutils.showMsgBox('提示', '交易对手账号不能为空!\r\n请重新操作!', 350, 150);
          return;
        }

        let data = { loanPayoutAccno: toppAcctNo };
        this.$dialog.open('', 'zrcbank/biz/common/commonAccountSelect.vue', 1000, 800, data, params => {
          if (params.kehuhaoo == _this.data.cusId) {
            _this.$message({ message: '交易对手客户号与借款人客户号不能相同,请重新选择！', type: 'warning' });
            this.$refs.refForm.formdata.toppAcctNo = '';
            this.$refs.refForm.formdata.toppName = '';
            return;
          } else {
            if (params.kzhuztai != '正常') {
              _this.$message({
                showClose: true,
                message: '已选账户状态不正常，请重新选择！',
                type: 'warning'
              });
              this.$refs.refForm.formdata.toppAcctNo = '';
              this.$refs.refForm.formdata.toppName = '';
              this.$refs.refForm.formdata.acctsvcrNo = '';
              return;
            }
            this.$refs.refForm.formdata.toppAcctNo = params.kehuzhao;
            this.$refs.refForm.formdata.toppName = params.zhhuzwmc;
            this.$refs.refForm.formdata.acctsvcrNo = params.kaihjigo;
          }
        });
      } else {
        let data = { oprType: '01'};
        this.$dialog.open('', 'zrcbank/biz/common/commonToppAcctSelect.vue', -1, -1, data, params => {
          this.formdata.toppAcctNo = params.toppAcctNo;
          this.formdata.toppName = params.toppName;
          this.formdata.acctsvcrNo = params.acctsvcrNo;
          this.formdata.acctsvcrName = params.acctsvcrName;
        });
      }
    }
  }
};
</script>
