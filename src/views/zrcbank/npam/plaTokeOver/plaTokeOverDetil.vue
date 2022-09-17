<template>
  <!--
    @created by
    @updated by 2018-8-16 修改代码规范
    @updated by 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
  <yu-tabs v-model="activeName" @tab-click="handleClick">
   <yu-tab-pane label="单户转让申请" name="base">
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="170px" v-model="formdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="ptaiSerno" disabled></yu-xform-item>
          <yu-xform-item label="转让类型" name="transferType" data-code="STD_TRANSFER_TYPE" ctype="select" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId"  disabled></yu-xform-item>

          <yu-xform-item label="客户名称" name="cusName"  disabled></yu-xform-item>
          <yu-xform-item label="贷款余额合计" name="loanBalance"  disabled number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="欠息金额合计" name="totalTqlxAmt"  disabled number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="是否转代理资产" name="takeoverCount" ctype="select" data-code="STD_ZB_YES_NO" rules="required" @change="changeFn"></yu-xform-item>
          <yu-xform-item label="" name="" ctype="custom"></yu-xform-item>
          <yu-xform-item label="转让方式" name="takeoverMode" rules="required" ctype="select" data-code="STD_TAKEOVER_MODE" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="" name="" ctype="custom"></yu-xform-item>
          <yu-xform-item label="转让协议编号" name="takeoverAgrNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="转让协议签订日" name="takeoverAgrSignDate" rules="required" ctype="datepicker" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="交易基准日" name="tranBaseDate" ctype="datepicker" :disabled="viewType == 'DETAIL'" rules="required"></yu-xform-item>
          <yu-xform-item label="资产交割日" name="assetPayDate" rules="required" ctype="datepicker" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="币种" name="curType" rules="required" ctype="select" data-code="STD_ZB_CUR_TYP" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="资产转让金额" name="takeoverTotlAmt" rules="required" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
          <yu-xform-item label="评估公司" name="evalCprt" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="评估价格" name="evalAmt" ctype="yu-num" number-formatter="0,000.00" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="转让总对价" name="takeoverTotalPrice" rules="required" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>

          <yu-xform-item label="封包日期" name="packageDate" rules="required" ctype="datepicker" :disabled="viewType == 'DETAIL'"></yu-xform-item>

          <yu-xform-item label="交易对手类型" name="toppType" rules="required" ctype="select" data-code="STD_TOPP_TYPE" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="交易对手名称" name="toppName" rules="required" :disabled="viewType == 'DETAIL'"></yu-xform-item>

          <yu-xform-item :hidden="!showByTakeoverCount" label="交易对手账号"  placeholder="交易对手账号" name="toppAcctNo" colspan="10" :disabled="viewType == 'DETAIL'"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="get" colspan="2" :hidden="!showByTakeoverCount">
              <yu-button type="primary" @click="getAccNo(1)">获取</yu-button>
            </yu-xform-item>
         <yu-xform-item :hidden="!showByTakeoverCount" label="交易对手账号户名称"  placeholder="交易对手账户名称" name="toppAcctName" rules="required" disabled></yu-xform-item>
         <yu-xform-item :hidden="!showByTakeoverCount" label="交易对手账号子序号"  placeholder="交易对手账号子序号" name="toppAcctChildNo" rules="required" :disabled="viewType == 'DETAIL'"></yu-xform-item>

          <yu-xform-item :hidden="!showByTakeoverCount" label="资金划转账户开户行行号"  placeholder="账户开户行行号" name="transferAcctAcctb"  :disabled="viewType == 'DETAIL'" rules="required"></yu-xform-item>
          <!--  <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="getAccNo(2)">获取</yu-button>
            </yu-xform-item>-->
          <yu-xform-item :hidden="!showByTakeoverCount" label="资金划转账户开户行行名" name="transferAcctAcctbName" placeholder="账户开户行行名" :disabled="viewType == 'DETAIL'" rules="required"></yu-xform-item>

          <yu-xform-item label="资产转让款支付方式" name="takeoverDefrayMode"  rules="required" ctype="select" data-code="STD_TAKEOVER_DEFRAY_MODE" :disabled="viewType == 'DETAIL'"></yu-xform-item>
           <yu-xform-item label="资产转让款入账日期" name="takeoverPyeeDate" rules="required" ctype="datepicker" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="资金融通方式" name="financingMode" rules="required" ctype="select" data-code="STD_FINANCING_MODE" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="资金融通比例" name="financingPerc" rules="required" :disabled="viewType == 'DETAIL'"></yu-xform-item>

          <yu-xform-item :hidden="!showByTakeoverCount" label="资金来源账号"  placeholder="资金来源账号" name="transferAcct" colspan="10" :disabled="viewType == 'DETAIL'" rules="required"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2"  :hidden="!showByTakeoverCount">
              <yu-button type="primary" @click="getAccNo(3)" >获取</yu-button>
            </yu-xform-item>
          <yu-xform-item :hidden="!showByTakeoverCount" label="资金来源账号子序号" name="transferAcctChildNo" rules="required" :disabled="viewType == 'DETAIL'" ></yu-xform-item>
          <yu-xform-item :hidden="!showByTakeoverCount" label="资金来源账户名称" name="transferAcctName" rules="required" disabled></yu-xform-item>

          <yu-xform-item :hidden="!showByTakeoverCount" label="对外付款账号"  placeholder="对外付款账号" name="outsideAcctNo" colspan="10" :disabled="viewType == 'DETAIL'" rules="required"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2" :hidden="!showByTakeoverCount" :key="2">
              <yu-button type="primary" @click="getAccNo(4)" >获取</yu-button>
            </yu-xform-item>
          <yu-xform-item :hidden="!showByTakeoverCount" label="对外付款账户名称" name="outsideAcctName" rules="required" disabled></yu-xform-item>
          <yu-xform-item :hidden="!showByTakeoverCount" label="对外付款账号子序号" name="outsideAcctChildNo" rules="required" :disabled="viewType == 'DETAIL'"></yu-xform-item>


          <yu-xform-item :hidden="!showByTakeoverCount" label="付款周期" ctype="select" name="payCycle" data-code="STD_PAY_CYCLE" :disabled="viewType == 'DETAIL'" rules="required"></yu-xform-item>

          <yu-xform-item label="备注" name="memo" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" rules="required" disabled :key="3"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName"  rules="required" disabled :key="4"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" rules="required" disabled :key="5"></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doSave" :hidden="viewType == 'DETAIL'">保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
  </yu-tab-pane>

    <yu-tab-pane label="关联借据信息" name="first">
        <yu-button-drop>
          <yu-button type="primary" @click="addDebtFn" :hidden="viewType == 'DETAIL'">引入</yu-button>
          <yu-button type="primary" @click="deleteFn" :hidden="viewType == 'DETAIL'">删除</yu-button>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
          <yu-button type="primary" @click="save" :hidden="viewType == 'DETAIL'">保存</yu-button>
        </yu-button-drop>
        <yu-xtable @loaded="loadFn" ref="refTableCont" condition-key="condition"  style="margin-top:10px" row-number :data-url="url.dataContNoUrl" :base-params="baseContParams" selection-type="radio" requestType="POST">
          <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="起始日期" prop="loanStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
          <yu-xtable-column align="center" label="到期日期" prop="loanEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
          <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
          <yu-xtable-column align="center" label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column align="center" label="转让对价金额" prop="takeoverPrice" :formatter="Currency"   ctype="num" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="是否转让代理" prop="isTransAgcyAsset" data-code="STD_ZB_YES_NO"  ctype="select" disabled></yu-xtable-column>
        </yu-xtable>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="forth">
      <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
  <yu-xdialog :visible.sync="dialogVisibleDebt" width="1200px" title="借据列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refDebtTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号"  placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="合同编号"  placeholder="合同编号" name="contNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refDebtTable" :row-number="true" selection-type="radio" request-type="POST" :pageable="true" :data-url="url.dataDebtUrl" :default-load="true" condition-key="condition"
        :base-params="baseParams">
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="contCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="起始日期" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
          <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column label="主办人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="selectedDebtFn" size="small">确认</el-button>
          <el-button @click="clearDebtFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
 </yu-tabs>

  </div>
</template>
<script>
import mixin from '@/utils/mixin';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_REGI_STATUS,STD_TAKEOVER_MODE,STD_ZB_CUR_TYP,STD_TRANSFER_TYPE,STD_FIVE_CLASS,STD_ZB_YES_NO,STD_PAY_CYCLE,STD_ACC_STATUS');
// 获取仓库数据
import { mapState } from 'vuex';
export default {
  mixins: [mixin],
  components: { imageSystem },
  data: function () {
    return {
      baseParams: '',
      baseBillParams: null,
      url: {
        dataContNoUrl: backend.cmisNpam + '/api/platakeoverbillrel/queryAll',
        dataDebtUrl: this.$backend.cmisBiz + '/api/accloan/queryAccLoanByCusId'
      },
      baseContParams: {condition: JSON.stringify({ ptaiSerno: this.$route.meta.params.ptaiSerno})},
      formdata: {},
      activeName: 'base',
      dialogVisibleDebt: false,
      viewType: '',
      image: '1',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ03',
          'index': {
            'businessid': this.$route.meta.params.ptaiSerno,
            /** 客户名称 */
            custname: this.$route.meta.params.cusName,
            /** 客户号 */
            custid: this.$route.meta.params.cusId,
            /** 机构名称 */
            orgname: this.$route.meta.params.inputBrIdName
          }
        }
      ],
      flag: ''
    };
  },
  // vuex中存储数据获取：
  computed: {
   
    showByTakeoverCount: function () {
      return this.formdata.takeoverCount == '1';
    }
  },
  created () {
    if (this.$route.meta.params.viewType == 'DETAIL') {
      this.image = '2';
    }
  },
  mounted () {
    var _this = this;
    // _this.formdata.ptaiSerno = _this.$route.meta.params.ptaiSerno;
    _this.viewType = _this.$route.meta.params.viewType;
    _this.afterInfo();
  },
  methods: {
    handleClick (tab) {
      if (tab.name == 'forth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    /* 同步控制关联借据表 是否转代理*/
    changeFn (value) {
      var dataAll = this.$refs.refTableCont.tabledata;
      dataAll.forEach(item => {
        item.isTransAgcyAsset = value;
      });
    },
    loadFn (data) {
      //转让总对价
      var takeoverPriceSum = 0;
      data.forEach(item => {
        item.isTransAgcyAsset = this.formdata.takeoverCount;
        takeoverPriceSum = takeoverPriceSum + item.takeoverPrice
      });
      this.formdata.takeoverTotalPrice = takeoverPriceSum
    },
    /** *初始化 */
    afterInfo () {
      let _this = this;
      let ptaiSerno = _this.$route.meta.params.ptaiSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/platakeoverappinfo/showByPtaiSerno',
        data: ptaiSerno,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$nextTick(function () {
              yufp.clone(response.data, _this.formdata);
            });
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    /** 保存关联借据信息 */
    save () {
      var _this = this;
      let data = _this.$refs.refTableCont.selections[0];
      var newArray = [];
      data.ptaiSerno = _this.$route.meta.params.ptaiSerno;
      newArray.push(data);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/platakeoverbillrel/updateBatchContNo',
        data: newArray,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.afterInfo();
            _this.$refs.refTableCont.remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /* 查看 */
    infoFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableCont.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      // var params = {};
      var selectData = _this.$refs.refTableCont.selections[0];
      // params.bill_no = selectData.billNo;
      var billNo = selectData.billNo;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
        key: new Date().getTime(),
        title: '贷款台账页面',
        data: {
          billNo: billNo, // 借据编号
          viewType: 'DETAIL'
        }
      });
    },
    /** 引入借据 */
    addDebtFn () {
      var _this = this;
      _this.baseParams = {condition: {cusId: _this.formdata.cusId, accStatus: 'accStatus', fiveClass: '30,40,50'}};
      _this.dialogVisibleDebt = true;
    },
    /** 选择借据后添加到数据库，并刷新列表 */
    selectedDebtFn () {
      var _this = this;
      if (_this.$refs.refDebtTable.selections.length < 1) {
        _this.$message({
          message: '请先选择至少一条记录',
          type: 'warning'
        });
        return;
      }
      var model = _this.$refs.refDebtTable.selections;
      var newArray = [];
      model.forEach(function (item) {
        item.ptaiSerno = _this.$route.meta.params.ptaiSerno;
        item.totalTqlxAmt = item.debitInt + item.penalInt + item.compoundInt;
        item.curType = item.contCurType;
        item.isTransAgcyAsset = '0';
        newArray.push(item);
      });
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(newArray),
        url: this.$backend.cmisNpam + '/api/platakeoverbillrel/saveContNo',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.dialogVisibleDebt = false;
            _this.afterInfo();
            _this.$refs.refTableCont.remoteData();
            _this.$message('操作成功');
          }
        }
      });
    },
    /** 关闭借据选择窗口 */
    clearDebtFn () {
      this.dialogVisibleDebt = false;
    },

    /**
    *借据删除
     */
    deleteFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableCont.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let model = selectionsAry[0];
      model.ptaiSerno = _this.$route.meta.params.ptaiSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action == 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/platakeoverbillrel/delete',
              data: model,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.$message('操作成功');
                  _this.afterInfo();
                  _this.$refs.refTableCont.remoteData();
                } else {
                  _this.$message({
                    message: response.message,
                    type: 'error'
                  });
                }
              }
            });
          }
        }
      });
    },


    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      var _this = this;
      _this.viewType = _this.$route.meta.params.viewType;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          return;
        };
        let model = {};
        model = _this.formdata;
        // model.transferType = '01';
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/platakeoverappinfo/update',
          async: false,
          data: model,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$message.success('操作成功');
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
      });
    },
    /**
    *根据账号回显名称
     */
    getAccNo (a) {
      let jsoPar = this.formdata;
      let toppAcctNo = '';
      if (a == 1) {
        toppAcctNo = jsoPar.toppAcctNo;
      };
      if (a == 2) {
        toppAcctNo = jsoPar.transferAcctAcctb;
      };
      if (a == 3) {
        toppAcctNo = jsoPar.transferAcct;
      };
      if (a == 4) {
        toppAcctNo = jsoPar.outsideAcctNo;
      };

      this.$request({
        method: 'post',
        url: this.$backend.cmisNpam + '/api/platakeoverappinfo/sendToIb1253',
        data: { toppAcctNo: toppAcctNo }
      })
        .then((response) => {
          // 处理请求成功的情况
          if (response.code == '0') {
            // this.$refs.refForm.setItemValue('toppAcctName', data.zhhuzwmc);
            if (a == 1) {
              this.formdata.toppAcctName = response.data.zhhuzwmc;
              this.formdata.toppAcctChildNo = response.data.zhaoxhao;
            };
            if (a == 2) {
              this.formdata.transferAcctAcctbName = response.data.zhhuzwmc;
            };
            if (a == 3) {
              this.formdata.transferAcctChildNo = response.data.zhaoxhao;
              this.formdata.transferAcctName = response.data.zhhuzwmc;
            };
            if (a == 4) {
              this.formdata.outsideAcctName = response.data.zhhuzwmc;
              this.formdata.outsideAcctChildNo = response.data.zhaoxhao;
            };
          } else {
            this.$message({ message: response.message, type: 'error' });
          }
        });
    }
  }
};
</script>
