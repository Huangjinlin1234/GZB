
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform v-model="searchFormdata"  label-width="170px" ref="refForm">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" name="periSerno" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="处置阶段" name="dispStage" ctype="select" data-code="STD_DISP_STAGE" disabled></yu-xform-item>
            <yu-xform-item label="关联业务流水号" name="serno" disabled></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
                <yu-button type="primary" @click="checkInfo">查看详情</yu-button>
            </yu-xform-item>
            <yu-xform-item label="费用总额" name="expenseTotalAmt" disabled></yu-xform-item>
            <yu-xform-item label="垫支总额" name="advanceExpenAmt" disabled></yu-xform-item>
            <yu-xform-item label="列支总额" name="rankAmt" disabled></yu-xform-item>
            <yu-xform-item label="备注" name="memo" ctype="textarea" colspan="24" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>
    <yu-panel title="费用明细信息" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <template slot="right">
        <div>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="addFn" >新增</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="deleteFn">删除</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="save">保存</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="dzwhFn()">垫支维护</yu-button>
          <yu-button type="primary" v-show="viewType == 'DETAIL'" @click="dzwhFn('detail')">查看垫支维护详情</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :pageable="false" request-type="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center" :rules="expenseHppType" ctype="select" label="费用发生类型" prop="expenseHppType" data-code="STD_EXPENSE_HPP_TYPE" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" :rules="expenseHppPhase" ctype="input" label="费用发生阶段" prop="expenseHppPhase" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" :rules="expenseAmt" ctype="input" label="费用金额" prop="expenseAmt"  :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" :rules="expenseHppDate" ctype="datepicker" value-format="yyyy-MM-dd" label="费用发生日期" prop="expenseHppDate"  :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" :rules="expenseType" ctype="select" label="费用类型" prop="expenseType" data-code="STD_EXPENSE_TYPE" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <div style="height:30px"></div>
      <yu-xform v-model="baseTable" label-width="400px" ref="refBaseTable">
        <yu-xform-group :column="2">
          <yu-xform-item  label="登记人"   name="inputIdName"   disabled></yu-xform-item>
          <yu-xform-item  label="登记日期" name="inputDate" disabled></yu-xform-item>
          <yu-xform-item  label="登记机构" name="inputBrIdName" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div style="text-align:center">
         <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="doSave">保存</yu-button>
         <yu-button type="primary" @click="doBack">返回</yu-button>
      </div>
    </yu-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
// 注册字典项
yufp.lookup.reg('STD_EXPENSE_HPP_TYPE,STD_EXPENSE_TYPE,STD_DISP_STAGE');
export default {
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {condition: { periSerno: this.$route.meta.params.periSerno}},
      dataUrl: backend.cmisNpam + '/api/plaexpensedetail/selectByCondition',
      viewType: 'EDIT',
      // viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseTable: {},
      expenseHppType: [
        { required: true, message: '必填' }
      ],
      expenseHppPhase: [
        { required: true, message: '必填' }
      ],
      expenseAmt: [
        { required: true, message: '必填' }
      ],
      expenseHppDate: [
        { required: true, message: '必填' }
      ],
      expenseType: [
        { required: true, message: '必填' }
      ]
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  mounted () {
    this.afterInit();
  },

  methods: {

    /*
    页面初始化
     */
    afterInit () {
      var _this = this;
      var periSerno = _this.$route.meta.params.periSerno;
      this.viewType = _this.$route.meta.params.viewType;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaexpenseregiinfo/queryPlaExpenseRegiInfo',
        data: periSerno,
        callback: function (code, message, response) {
          if (code == '0') {
            yufp.clone(response.data, _this.searchFormdata);
            yufp.clone(response.data, _this.baseTable);
            //  _this.$refs.refTable.remoteData()
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },

    /*
    添加
     */
    addFn: function () {
      var flag = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) {
          flag = true;
        }
      });
      if (flag) {
        let serno = this.$xutils.getUUID();
        let row = {serno: serno, expenseHppType: '', expenseHppPhase: '', expenseAmt: '', expenseHppDate: '', expenseType: ''};
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
      }
    },
    /*
    保存
     */
    save () {
      var _this = this;
      var modal = {};
      var flag = false;
      _this.$refs.refTable.validate(function (fields) {
        if (!fields) {
          flag = true;
        }
      });
      if (!flag) {
        return _this.$message.error('请填写完必填项');
      }
      yufp.clone(_this.baseTable, modal);
      yufp.clone(_this.searchFormdata, modal);
      modal.plaExpenseDetail = this.$refs.refTable.tabledata;
      modal.plaExpenseDetail[0].cusId = _this.searchFormdata.cusId;
      modal.plaExpenseDetail[0].cusName = _this.searchFormdata.cusName;
      // 催收参数校验
      // 规则状态校验

      // 校验都通过时，发送保存请求
      // 新增保存
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaexpenseregiinfo/updateReplyReg',
        data: modal,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('操作成功');
            _this.$refs.refTable.remoteData();
            _this.afterInit();
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /* 清除校验规则 */
    clearValidate: function () {
      this.$refs.refTable.clearValidateMessage();
    },
    /**
    *删除
    */
    deleteFn: function () {
      var _this = this;
      _this.clearValidate();
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        return _this.$message({ message: '请先选择一条记录', type: 'warning'});
      }
      var pedSerno = _this.$refs.refTable.selections[0];
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plaexpensedetail/deleteExpenseDetail',
              data: pedSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                  _this.afterInit();
                } else {
                  _this.$message({ message: response.message, type: 'error'});
                }
              }
            });
          }
        }
      });
    },

    /*
    垫支维护
     */
    dzwhFn: function (info) {
      var _this = this;
      var viewType = info == 'detail' ? 'DETAIL' : '';
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        return _this.$message({message: '请先选择一条记录', type: 'warning'});
      }
      let pedSerno = selectionsAry[0].pedSerno;
      if (selectionsAry[0].expenseType == '01') {
        _this.$router.addTab({
          name: 'zrcbank/npam/exepenseManager/exepenseDetails',
          key: 'exepenseDetails', // 必传
          title: '垫支回收明细',
          data: {
            expenseAmt:selectionsAry[0].expenseAmt,
            pedSerno: pedSerno,
            viewType: viewType
          }
        });
      } else {
        _this.$message({
          message: '仅垫支数据可以维护',
          type: 'warning'
        });
        return;
      }
    },

    /*
    保存
     */
    doSave () {
      var _this = this;
      var flag = false;
      _this.$refs.refTable.validate(function (fields) {
        if (!fields) {
          flag = true;
        }
      });
      if (!flag) {
        return _this.$message.error('请填写完必填项');
      }
      var modal = {};
      yufp.clone(_this.baseTable, modal);
      yufp.clone(_this.searchFormdata, modal);
      modal.plaExpenseDetail = this.$refs.refTable.tabledata;
      _this.$refs.refForm.validate(volid => {
        // 催收参数校验
        if (volid) {
          _this.$refs.refBaseTable.validate(volid => {
            // 规则状态校验
            if (volid) {
              // 校验都通过时，发送保存请求
              // 新增保存
              yufp.service.request({
                method: 'POST',
                url: backend.cmisNpam + '/api/plaexpenseregiinfo/updateReplyReg',
                data: modal,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$message.success('操作成功');
                    _this.afterInit();
                    _this.$refs.refTable.remoteData();
                  } else {
                    _this.$message.error(response.message);
                  }
                }
              });
            }
          });
        }
      });
    },

    /*
     返回上级页面
     */
    doBack () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    },
    /** 查看详情 */
    checkInfo () {
      if (this.searchFormdata.dispStage == '01') { // 诉讼阶段
        var caseSerno = this.searchFormdata.serno;
        this.$router.addTab({
          name: 'zrcbank/npam/plaLawCase/plaLawCaseBase',
          key: 'plaLawCaseBase' + new Date().getTime(), // 必传
          title: '查看进展登记',
          data: {
            caseSerno: caseSerno, // 业务流水号
            viewType: 'DETAIL'
          }
        });
      }
      if (this.searchFormdata.dispStage == '02') { // 以物抵债登记阶段
        var pdraiSerno = this.searchFormdata.serno;
        this.$router.addTab({
          name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppInfoDetail',
          key: 'plaLawArbitrateDetil' + new Date().getTime(),
          title: '以物抵债台账详情',
          data: {
            pdraiSerno: pdraiSerno, // 业务流水号
            viewType: 'DETAIL'
          }
        });
      }
      if (this.searchFormdata.dispStage == '03') { // 抵债资产处置阶段
        var papaiSerno = this.searchFormdata.serno;
        this.$router.addTab({
          name: 'zrcbank/npam/plaAssetPldAppInfo/thingAssetDisposalManagementDetail/plaAssetPldAppInfoDetail',
          key: 'plaAssetPldAppInfoDetail' + new Date().getTime(),
          title: '抵债资产处置详情',
          data: {
            papaiSerno: papaiSerno, // 业务流水号
            viewType: 'DETAIL'
          }
        });
      }
      if (this.searchFormdata.dispStage == '04') { // 债权转让-单户
        var ptaiSerno = this.searchFormdata.serno;
        this.$router.addTab({
          name: 'zrcbank/npam/plaTokeOver/plaTokeOverDetil',
          key: 'detailplaLawBroke' + new Date().getTime(),
          title: '单户转让详情',
          data: {
            ptaiSerno: ptaiSerno, // 业务流水号
            viewType: 'DETAIL'
          }
        });
      }
      if (this.searchFormdata.dispStage == '05') { // "债权转让-批量
        var ptaiSerno = this.searchFormdata.serno;
        this.$router.addTab({
          name: 'zrcbank/npam/plaTokeOvers/plaTokeOversDetil',
          key: new Date().getTime(), // 必传
          title: '批量转让详情',
          data: {
            ptaiSerno: ptaiSerno, // 业务流水号
            viewType: 'DETAIL'
            // getReturn: _this.getReturn
          }
        });
      }
      if (this.searchFormdata.dispStage == '06') {
        this.$message.error('此阶段无详情页面');
      }
    }
  }
};
</script>
