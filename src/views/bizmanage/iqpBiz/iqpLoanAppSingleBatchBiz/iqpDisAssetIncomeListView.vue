<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="180px" v-model="formdata">
      <yu-panel title="工资性收入" :hideFilter="false" :collapseHide="false" v-if="panel1">
        <yu-xform-group>
          <yu-xform-item label="月收入主键" :hidden="true" name="incomePk" rules="required" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="申请流水号" :hidden="true" name="iqpSerno" rules="required" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="资产折算收入类型" :hidden="true" prop="discountAssetType" align="center" ctype="select" data-code="STD_ZB_DISCOUNT_ASSET_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="借款人月收入（元）" name="mearn" ctype="yu-num" rules="required" @blur="blur1" :disabled="viewflag"></yu-xform-item>
          <yu-xform-item label="配偶月收入（元）"  name="spouseMearn" ctype="yu-num" rules="required" @blur="blur2" :disabled="viewflag" def></yu-xform-item>
          <yu-xform-item label="所有共同借款人月收入小计（元）" name="commonMearn" rules="required" ctype="yu-num" :disabled="viewflag" @blur="blur3"></yu-xform-item>
          <yu-xform-item label="小计（元）" name="subtotal" ctype="yu-num" rules="required" disabled="true" @change="totalChange"></yu-xform-item>
          <yu-xform-item label="调查情况核实说明（工资性收入、经营性收入、其他收入）" name="indgtExpl" ctype="textarea" rules="required" :colspan="24" :disabled="viewflag"></yu-xform-item>
          <yu-xform-item label="登记人" :hidden="true" name="inputId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" :hidden="true" name="inputBrId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" :hidden="true" name="inputDate" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="最后修改人" :hidden="true" name="updId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="最后修改机构" :hidden="true" name="updBrId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="最后修改日期" :hidden="true" name="updDate" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="创建时间" :hidden="true" name="createTime" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="修改时间" :hidden="true" name="updateTime" ctype="input" disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="经营性收入" panel-type="normal">
        <yu-form-buttons align="left">
          <yu-button @click="incomeAdd" type="primary" round :hidden="viewflag">新增</yu-button>
          <yu-button @click="doView" type="primary" round :hidden="viewflag">查看</yu-button>
          <yu-button @click="incomeUpdate" type="primary" round :hidden="viewflag">修改</yu-button>
          <yu-button @click="incomeDelete" type="primary" round :hidden="viewflag">删除</yu-button>
        </yu-form-buttons>
          <yu-xtable ref="refRepayTable1"  :default-sort="{prop:'dataSource,saleAmt,yearSaleAmt,profitRate,yearProfit,mearn,subtotal',order:'descending'}" row-number :base-params="paramsJY" border :data="repayData" v-model="tabledata" :data-url="dataUrl" selection-type="radio" condition-key="condition"   request-type="POST">
            <yu-xtable-column label="数据来源" prop="dataSource" data-code="STD_INCOME_DATA_SOUR" sortable></yu-xtable-column>
            <yu-xtable-column label="分析时间段" prop="analyTime"></yu-xtable-column>
            <yu-xtable-column label="销售额（元）" prop="saleAmt" sortable></yu-xtable-column>
            <yu-xtable-column label="推算年销售额（元）" prop="yearSaleAmt"  sortable></yu-xtable-column>
            <yu-xtable-column label="利润率" prop="profitRate"  :formatter="rateFormatter" sortable></yu-xtable-column>
            <yu-xtable-column label="年净利润（元）" prop="yearProfit" sortable></yu-xtable-column>
            <yu-xtable-column label="月收入（元）" prop="mearn" sortable></yu-xtable-column>
            <yu-xtable-column label="小计（元）" prop="subtotal" sortable></yu-xtable-column>
            <yu-xtable-column label="调查核实情况说明" prop="indgtExpl" width="400"></yu-xtable-column>
            <yu-xtable-column label="月收入主键" prop="incomePk" hide-column></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="其他收入" :hideFilter="false" :collapseHide="false" :disabled="viewflag" v-if="panel3">
       <yu-form-buttons align="left">
          <yu-button @click="otherIncomeAdd" type="primary" round :hidden="viewflag">新增</yu-button>
          <yu-button @click="doOtherView" type="primary" round :hidden="viewflag">查看</yu-button>
          <yu-button @click="otherIncomeUpdate" type="primary" round :hidden="viewflag">修改</yu-button>
          <yu-button @click="otherIncomeDelete" type="primary" round :hidden="viewflag">删除</yu-button>
        </yu-form-buttons>
        <yu-xtable ref="refRepayTable"   :default-sort="{prop:'discountAssetType,incomeSour,mearn,subtotal,indgtExpl',order:'descending'}" row-number :base-params="paramsOther" border :data="repayDatas" width="800" v-model="tabledatas" :data-url="dataUrl" condition-key="condition"  request-type="POST">
          <yu-xtable-column label="月收入主键" prop="incomePk" align="center"  hide-column></yu-xtable-column>
          <yu-xtable-column label="申请流水号" prop="iqpSerno" align="center"  hide-column></yu-xtable-column>
          <yu-xtable-column label="资产折算收入类型" prop="discountAssetType" align="center" data-code="STD_ZB_DISCOUNT_ASSET_TYPE" hide-column sortable></yu-xtable-column>
          <yu-xtable-column label="收入来源" prop="incomeSour" align="center" data-code="STD_OTHER_INCOME_SOUR" sortable></yu-xtable-column>
          <yu-xtable-column label="收入（元）" prop="mearn" align="center" sortable></yu-xtable-column>
          <yu-xtable-column label="小计（元）" prop="subtotal" align="center"  sortable></yu-xtable-column>
          <yu-xtable-column label="调查核实情况说明" prop="indgtExpl" align="center" sortable></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="还款能力分析" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="家庭合计月收入" name="fearnMearn" rules="required" ctype="input" disabled="true" @change="monthChange"></yu-xform-item>
          <yu-xform-item label="该笔贷款月支出与家庭月收入比为" name="incomePerc1" ctype="yu-num" sign="%" :multiple="100" disabled="true"></yu-xform-item>
          <yu-xform-item label="所有消费贷款月支出与家庭月收入比"  name="incomePerc2"  ctype="yu-num" sign="%" :multiple="100" disabled="true"></yu-xform-item>
          <yu-xform-item label="还款能力" name="repayAbi" rules="required" ctype="select" data-code="STD_REPAY_ABI" :disabled="viewflag"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center" v-if="panel1">
      <yu-button type="primary" @click="tempSave" :hidden="viewflag">暂存</yu-button>

      <yu-button type="primary" @click="save" :hidden="viewflag">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import { lookup } from '@/utils';
import { isNull } from '../../lmtBiz/common/bizUtils';
lookup.reg('STD_ZB_DISCOUNT_ASSET_TYPE,STD_ZB_INC_SOUR,STD_ZB_INCOME_SOUR,STD_INCOME_DATA_SOUR,STD_OTHER_INCOME_SOUR');
export default {
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
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
      discountAssetType: '',
      panel1: true,
      panel2: true,
      panel3: true,
      tabledata: [],
      tabledatas: [],
      repayData: [],
      viewflag: false,
      repayDatas: [],
      dataUrl: this.$backend.cmisBiz + '/api/iqpdisassetincome/querybycondition',
      paramsJY: {condition: {iqpSerno: this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno, discountAssetType: '2'} },
      paramsOther: {condition: {iqpSerno: this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno, discountAssetType: '5'} }
    };
  },
  mounted () {
    var _this = this;
    var op = this.$route.params.hasOwnProperty('op') ? this.$route.params.op : 'VIEW';
    if (op != 'EDIT') {
      this.viewflag = true;
    }
    this.formdata.iqpSerno = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno;
    // 进入初始化
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpdisassetincome/selectmorereplaybyiqpserno',
      data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno},
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
        if (_this.formdata.spouseMearn == null) {
          _this.formdata.spouseMearn = 0;
        }
        if (_this.formdata.commonMearn == null) {
          _this.formdata.commonMearn = 0;
        }

        // 折算收入类型 1、工资性收入 2、经营性收入
        if (response.data != null) {
          _this.repayData = response.data.list1;
          _this.repayDatas = response.data.list2;
        }
      }
    });

    // 还款能力分析
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpdisassetconinfo/selectByPrimaryKey',
      data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno},
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    rateFormatter: function (row, column, cellValue) {
      debugger;
      var rate = parseFloat(cellValue) * parseFloat(100);
      return rate + '%';
    },
    blur1: function (value) {
      var _this = this;
      var mearn = _this.formdata.mearn;
      if (mearn == null) {
        mearn = '0';
      }
      var spouseMearn = _this.formdata.spouseMearn;
      if (spouseMearn == null) {
        spouseMearn = '0';
      }
      var commonMearn = _this.formdata.commonMearn;
      if (commonMearn == null) {
        commonMearn = '0';
      }
      let sum = parseFloat(mearn) + parseFloat(spouseMearn) + parseFloat(commonMearn);
      _this.formdata.subtotal = sum;
    },

    blur2: function (value) {
      var _this = this;
      if (_this.formdata.mearn != null && _this.formdata.spouseMearn != null && _this.formdata.commonMearn != null) {
        var mearn = _this.formdata.mearn;
        var spouseMearn = _this.formdata.spouseMearn;
        var commonMearn = _this.formdata.commonMearn;
        let sum = parseFloat(mearn) + parseFloat(spouseMearn) + parseFloat(commonMearn);
        _this.formdata.subtotal = sum;
      }
    },

    blur3: function (value) {
      var _this = this;
      if (_this.formdata.mearn != null && _this.formdata.spouseMearn != null && _this.formdata.commonMearn != null) {
        var mearn = _this.formdata.mearn;
        var spouseMearn = _this.formdata.spouseMearn;
        var commonMearn = _this.formdata.commonMearn;
        let sum = parseFloat(mearn) + parseFloat(spouseMearn) + parseFloat(commonMearn);
        _this.formdata.subtotal = sum;
      }
    },
    totalChange: function () {
      var _this = this;
      var subtotal = this.formdata.subtotal;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetincome/selectSubtotalSumByAssetType',
        data: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno,
        callback: function (code, message, response) {
          if (code == '0') {
            if (response.data == null) {
              _this.formdata.fearnMearn = parseFloat(subtotal);
            } else {
              _this.formdata.fearnMearn = parseFloat(subtotal) + parseFloat(response.data);
            }
          }
        }
      });
    },
    monthChange: function () {
      var _this = this;
      var iqpSerno = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno;
      // 家庭月收入合计
      var fearnMearn = this.formdata.fearnMearn;
      yufp.service.request({
        method: 'GET',
        url: backend.cmisBiz + '/api/iqploanapp/' + iqpSerno,

        callback: function (code, message, response) {
          if (code == '0') {
            // 本比月还款额
            var monthRepayAmt = response.data.monthRepayAmt;
            // 本笔公积金贷款月还款额
            var pundLoanMonRepayAmt = response.data.pundLoanMonRepayAmt;
            // 本笔月还款额合计
            var monthRepaySum = parseFloat(monthRepayAmt) + parseFloat(pundLoanMonRepayAmt);
            // 其他消费贷款月还款额
            var otherComsumeRepayAmt = response.data.otherComsumeRepayAmt;
            // 该笔贷款月支出与家庭月收入比为本笔月还款额合计/家庭合计月收入
            var num = parseFloat(monthRepaySum) / parseFloat(fearnMearn);

            _this.formdata.incomePerc1 = num;
            // 所有消费贷款月支出与家庭月收入比=合计月还款额/家庭合计月收入
            var monthSum = parseFloat(monthRepaySum) + parseFloat(otherComsumeRepayAmt);
            var num2 = parseFloat(monthSum) / parseFloat(fearnMearn);
            _this.formdata.incomePerc2 = num2;
          } else {
            _this.$message('获取业务数据异常！');
          }
        }
      });
    },
    // 保存
    save: function () {
      var _this = this;

      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }

      let postData = {};
      yufp.clone(_this.formdata, postData);
      postData.iqpSerno = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno;

      // 还款能力分析保存
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetconinfo/updateiqpDisAssetConInfo',
        data: postData,
        callback: function (code, message, response) {
          if (response.data != 0) {
            _this.$message('还款能力分析保存失败');
          }
        }
      });

      // 工资性收入
      // 发送请求修改数据;
      this.$request({
        data: postData,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetincome/createone'
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            yufp.clone(data, _this.formdata);
            this.$message({ message: '保存成功', type: 'success' });
          } else {
            this.$message({ message: '保存失败,请重试', type: 'warning' });
          }
        }
      });
    },

    // 暂存
    tempSave: function () {
      var _this = this;
      let postData = {};
      yufp.clone(_this.formdata, postData);
      postData.iqpSerno = _this.$route.meta.params.iqpSerno;

      // 还款能力分析保存
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetconinfo/updateiqpDisAssetConInfo',
        data: postData,
        callback: function (code, message, response) {
          if (response.data != 0) {
            _this.$message('还款能力分析暂存失败');
          }
        }
      });

      // 工资性收入
      // 发送请求修改数据;
      this.$request({
        data: postData,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetincome/createone'
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            yufp.clone(data, _this.formdata);
            this.$message({ message: '暂存成功', type: 'success' });
          } else {
            this.$message({ message: '暂存失败,请重试', type: 'warning' });
          }
        }
      });
    },

    /**
     * 经营性收入删除
     */
    incomeDelete: function () {
      var _this = this;
      const params = _this.$refs.refRepayTable1.selections.length;
      if (params == '0') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      _this.$confirm('您确定要删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        yufp.service.request({
          method: 'POST',
          data: {incomePk: _this.$refs.refRepayTable1.selections[0].incomePk},
          url: backend.cmisBiz + '/api/iqpdisassetincome/deleteByPrimaryKey',
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.$message('删除成功');
              _this.$refs.refRepayTable1.remoteData();
              _this.totalChange();
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }).catch(e => {});
    },
    /**
     * 经营性收入删除
     */
    otherIncomeDelete: function () {
      var _this = this;
      const params = _this.$refs.refRepayTable.selections.length;
      if (params == '0') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      _this.$confirm('您确定要删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        yufp.service.request({
          method: 'POST',
          data: {incomePk: _this.$refs.refRepayTable.selections[0].incomePk},
          url: backend.cmisBiz + '/api/iqpdisassetincome/deleteByPrimaryKey',
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.$message('删除成功');
              _this.$refs.refRepayTable.remoteData();
              _this.totalChange();
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }).catch(e => {});
    },
    /**
     * 其他收入新增
     */
    repayAdd: function () {
      var _this = this;
      var iqpSerno = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno;
      if (this.repayDatas == null) {
        this.repayDatas = [{
          incomePk: '',
          iqpSerno: iqpSerno,
          discountAssetType: '5',
          incomeSour: '',
          indgtExpl: ''
        }];
      } else {
        this.repayDatas.push({
          incomePk: '',
          iqpSerno: iqpSerno,
          discountAssetType: '5',
          incomeSour: '',
          indgtExpl: ''
        });
      }
    },
    /**
     * 其他收入保存
     */
    repaySave: function (index, row) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetincome/create',
        data: row,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqpdisassetincome/selectmoreother',
              data: row,
              callback: function (code, message, response) {
                if (response.data != null) {
                  _this.repayDatas = response.data;
                  _this.totalChange();
                }
              }
            });
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },
    /**
     * 其他收入删除
     */
    repayDelete: function (index, row) {
      var _this = this;
      if (!row.incomePk) {
        _this.repayDatas.splice(index, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/iqpdisassetincome/deleteByPrimaryKey',
          data: {incomePk: row.incomePk},
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.$message('删除成功');
              _this.repayDatas.splice(index, 1);
              _this.totalChange();
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    },
    // 查看
    doView () {
      var _this = this;
      const params = _this.$refs.refRepayTable1.selections.length;
      if (params == '0') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let row = _this.$refs.refRepayTable1.selections[0];
      row['op'] = 'VIEW';
      this.$dialog.open('经营性收入查看', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpDisAssetIncomeRepayCardView', 1000, 600, row, null);
    },
    // 查看
    doOtherView () {
      var _this = this;
      const params = _this.$refs.refRepayTable.selections.length;
      if (params == '0') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let row = _this.$refs.refRepayTable.selections[0];
      row['op'] = 'VIEW';
      this.$dialog.open('经营性收入查看', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpDisAssetOtherIncomeView', 1000, 600, row, null);
    },
    // 新增
    incomeAdd () {
      let row = {};
      row['iqpSerno'] = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno;
      row['discountAssetType'] = '2';
      row['op'] = 'ADD';
      this.$dialog.open('经营性收入新增', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpDisAssetIncomeRepayCardView', 1000, 600, row, () => {
        // 列表刷新
        this.$refs.refRepayTable1.remoteData();
        this.totalChange();
      });
    },
    // 新增
    otherIncomeAdd () {
      let row = {};
      row['iqpSerno'] = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno;
      row['discountAssetType'] = '5';
      row['op'] = 'ADD';
      this.$dialog.open('其他收入新增', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpDisAssetOtherIncomeView', 1000, 600, row, () => {
        // 列表刷新
        this.$refs.refRepayTable.remoteData();
        this.totalChange();
      });
    },
    // 修改
    incomeUpdate () {
      var _this = this;
      const params = _this.$refs.refRepayTable1.selections.length;
      if (params == '0') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let row = _this.$refs.refRepayTable1.selections[0];
      row['op'] = 'UPDATE';
      this.$dialog.open('经营性收入修改', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpDisAssetIncomeRepayCardView', 1000, 600, row, () => {
        // 列表刷新
        this.$refs.refRepayTable1.remoteData();
        this.totalChange();
      });
    },
    // 修改
    otherIncomeUpdate () {
      var _this = this;
      const params = _this.$refs.refRepayTable.selections.length;
      if (params == '0') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let row = _this.$refs.refRepayTable.selections[0];
      row['op'] = 'UPDATE';
      this.$dialog.open('经营性收入修改', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpDisAssetOtherIncomeView', 1000, 600, row, () => {
        // 列表刷新
        this.$refs.refRepayTable.remoteData();
        this.totalChange();
      });
    }

  }
};
</script>
