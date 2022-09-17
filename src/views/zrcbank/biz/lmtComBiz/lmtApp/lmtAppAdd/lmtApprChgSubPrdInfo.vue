<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata"  :disabled="type=='VIEW'">
        <yu-panel title="授信品种信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="分项适用产品流水号" ctype="input" name="subPrdSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信分项流水号" ctype="input" name="subSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信品种编号" ctype="yu-xlmtsub-tree" rules="required" name="lmtBizType" :disabled="type!='ADD'" width="480" height="480" :parms="{limitStrNo:'01'}" @select-fn="commonSelectFn" :show-text="false" :mapping="{'id':'lmtBizType','label':'lmtBizTypeName'}"></yu-xform-item>
            <yu-xform-item label="授信品种名称" ctype="input" name="lmtBizTypeName" rules="required"  @change="getLmtPrdNo(formdata.lmtBizType)"  disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" rules="required" data-code="STD_ZB_YES_NO" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" :colspan="12"></yu-xform-item>
            <yu-xform-item label="币种" ctype="input" name="curType" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信额度" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="额度期限" ctype="input" name="lmtTerm" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信起始日" ctype="input" name="startDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信到期日" ctype="input" name="endDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="input" name="bailPreRate"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="宽限期" ctype="input" name="lmtGraperTerm"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="原额度分项编号" ctype="input" name="origiLmtAccSubPrdNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项金额" ctype="yu-num" number-formatter="0,000.00" name="origiLmtAccSubPrdAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项期限" ctype="input" name="origiLmtAccSubPrdTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="变更标志" ctype="input" name="chgFlag" disabled hidden></yu-xform-item>
            <yu-xform-item label="调剂标志" ctype="input" name="adjustFlag" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否本次细化" ctype="input" name="isCurtRefine" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否存量授信标志" ctype="input" name="isSfcaLmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="年利率" ctype="input" name="rateYear" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" :datacode-filter="datacodeFilterFn" v-if="isPre=='0'" @change="repayModeChg(formdata.lmtBizType)" :colspan="12"></yu-xform-item>
            <yu-xform-item label="结息方式" ctype="select" data-code="STD_EI_MODE" name="eiMode" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否借新还旧" ctype="select"  name="isRefinance" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否无还本续贷" ctype="select"  name="isRwrop" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="手续费率" ctype="input" name="chrgRate" v-if="isPre=='0'&&lmtPrd" :colspan="12"></yu-xform-item>
            <yu-xform-item label="手续费收取方式" ctype="select" v-if="isPre=='0'&&lmtPrd" name="chrgCollectMode" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" rules="required" data-code="STD_ZB_YES_NO" disabled v-if="isPre=='1'" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false" v-if="isPre=='0'&&lmtPrd">
          <yu-xform-group :column="2">
            <yu-xform-item label="委托人名称" ctype="input" name="consignorName" :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人类型" ctype="input" name="consignorType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="input" name="consignorCertType" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人证件号码" ctype="input" name="consignorCertCode" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人客户号" ctype="input" name="consignorCusId" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="还款计划描述" ctype="input" name="repayPlanDesc" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" v-if="type=='ADD'"  @click="onSave">确定新增</yu-button>
        <yu-button type="primary" v-if="type=='EDIT'" @click="onUpdate">保存</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      dialogVisibleSelected: false,
      formDataPlan: {},
      triggerEditChangeEvent: {},
      formType: {},
      isPre: {},
      type: this.pageParams.op,
      lmtPrd: false,
      repayModel: false,
      lmtRepayPlanList: []
    };
  },
  mounted () {
    let parentData = this.pageParams;
    this.initForm(parentData);
  },
  methods: {
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
    },
    /**
     * 新增授信适用产品
     */
    onSave: function () {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtapprsubprd/addlmtapprsubprd',
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$message('新增成功');
              _this.onBack();
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
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
    },
    onUpdate: function () {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtapprsubprd/updatelmtapprsubprd',
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.$message('修改成功');
            } else {
              _this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    deletePlan: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      var subPrdSerno = this.getFactory().contextData.subPrdSerno;
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
              url: backend.cmisBiz + '/api/repaycapplan/deletelmtrepaycapplan',
              data: selections[0],
              callback: function (code, message, response) {
                // TODO  判断返回内容
                _this.$message('操作成功');
                _this.innitRepayPlanTable(subPrdSerno);
              }
            });
          }
        }
      });
    },

    /**
     * 新增还本计划按钮
     */
    addPlan: function () {
      var _this = this;
      var subPrdSerno = _this.formdata.subPrdSerno;
      if (subPrdSerno == null || subPrdSerno == '') {
        _this.$xutils.showMsgBox('提示', '当前适用产品信息未保存'); // 弹出提示
        return;
      }
      _this.dialogVisibleSelected = true;
      this.$nextTick(function () {
        _this.formDataPlan.serno = subPrdSerno;
      });
    },

    /**
    * 取消新增
    */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = false;
    },
    /**
     * 新增还本计划
     */
    nextFn: function () {
      var _this = this;
      _this.formDataPlan.serno = this.getFactory().contextData.subPrdSerno;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/repaycapplan/saverepayplan',
        data: _this.formDataPlan,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              this.$message('新增成功');
              _this.dialogVisibleSelected = false;
              _this.innitRepayPlanTable(this.getFactory().contextData.subPrdSerno);
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
    },
    initForm: function (data) {
      var _this = this;
      var op = data.op;
      if (op == 'ADD') {
        yufp.clone(data, _this.formdata);
        var isPreLmt = data.isPreLmt;
        if (isPreLmt == '1') {
          _this.formdata.isPreLmt = isPreLmt;
          _this.isPre = '1';
        } else {
          _this.formdata.isPreLmt = isPreLmt;
          _this.isPre = '0';
        }
      } else if (op == 'EDIT' || op == 'VIEW') {
        var subPrdSerno = data[0].apprSubPrdSerno;
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprsubprd/selectbysubprdserno',
          data: {subPrdSerno: subPrdSerno},
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.formdata);
            _this.isPre = _this.formdata.isPreLmt;
            _this.innitRepayPlanTable(subPrdSerno);
          }
        });
      }
    },

    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.$dialog.close(this.dialogId);
    },
    getLmtPrdNo: function (data) {
      var _this = this;
      if (data == '22') {
        _this.lmtPrd = true;
      } else {
        _this.lmtPrd = false;
      }
    },
    repayModeChg: function (data) {
      var _this = this;
      if (data == '22') {
        _this.repayModel = true;
      } else {
        _this.repayModel = false;
      }
    },

    /**
     * 还款方式 字典项过滤
     */
    datacodeFilterFn (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == 'A001' || op.key == 'A002' || op.key == 'A003' || op.key == 'A009' || op.key == 'A040') {
          return true;
        }
        return false;
      });
    },

    /**
     * 初始化还本计划表
     */
    innitRepayPlanTable: function (subPrdSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/repaycapplan/selectbyserno',
        data: subPrdSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtRepayPlanList = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>