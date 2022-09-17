<template>
  <!--
    @created by
    @updated by 2018-8-16 修改代码规范
    @updated by 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
  <yu-tabs v-model="activeName" @tab-click="handleClick">
   <yu-tab-pane label="仲裁案件信息详情" name="base">
    <yu-panel title="仲裁案件信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="220px" :disabled="viewType == 'DETAIL'" v-model="formdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="仲裁案件编号" name="caseNo" rules="required"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="仲裁标的（元）" disabled name="arbitrateSubjectAmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="本金总额（元）" disabled name="arbitrateCapAmt"  ctype="num"></yu-xform-item>
          <yu-xform-item label="拖欠利息总额（元）" disabled name="totalTqlxAmt"  ctype="num"></yu-xform-item>
          <yu-xform-item label="欠息（元）" name="debitInt"  ctype="num" hidden></yu-xform-item>
          <yu-xform-item label="罚息（元）" name="penalInt"  ctype="num" hidden></yu-xform-item>
          <yu-xform-item label="复息（元）" name="compoundInt"  ctype="num" hidden></yu-xform-item>
          <yu-xform-item label="仲裁机构" name="arbitrateOrg" rules="required"></yu-xform-item>
          <yu-xform-item label="是否有仲裁协议（或条款）" name="isHaveArbitrateAgr" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="仲裁协议（或条款）是否有效" name="isArbitrateAgrVld" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="受理日期" name="acceptDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="案件进程" name="caseProcess" ctype="select" data-code="STD_ARBITRATE_CASE_PROCESS" rules="required"></yu-xform-item>
          <yu-xform-item label="仲裁事由" name="arbitrateResn" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doSave">保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>

    <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refBaseForm" v-model="baseFormdata">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
   </yu-tab-pane>

   <yu-tab-pane label="仲裁借据信息" name="second">
      <yu-button-drop>
        <yu-button type="primary" @click="importFn" :hidden="viewType == 'DETAIL'">引入</yu-button>
        <yu-button type="primary" @click="deleteFn" :hidden="viewType == 'DETAIL'">取消引入</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTableCont" condition-key="condition" style="margin-top:10px" row-number :data-url="url.dataContNoUrl" :base-params="baseContParams" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
   </yu-tab-pane>

   <yu-tab-pane label="影像资料" name="thired">
      <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
   </yu-tab-pane>

  <yu-xdialog :visible.sync="dialogVisibleDebt" width="1200px" title="借据列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refDebtTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refDebtTable" :row-number="true" selection-type="radio" request-type="POST" :pageable="true" :data-url="url.dataDebtUrl" :default-load="true" condition-key="condition" :base-params="baseBillParams">
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
          <el-button type="primary" @click="saveBillFn" size="small">确认</el-button>
          <el-button @click="clearDebtFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </yu-tabs>


  </div>
</template>
<script>
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ARBITRATE_CASE_PROCESS,STD_ZB_CUR_TYP,STD_ACC_STATUS,STD_FIVE_CLASS');
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  mixins: [mixin],
  components: {
    imageSystem
  },
  data: function () {
    return {
      url: {
        dataContNoUrl: backend.cmisNpam + '/api/plalawarbitrtebillrel/queryplaLawArbitrteBillRelList',
        dataDebtUrl: this.$backend.cmisBiz + '/api/accloan/queryAccLoanByCusId'
      },
      baseContParams: {
        condition: {arbitrateCaseNo: this.$route.meta.params.arbitrateCaseNo}
      },
      baseBillParams: '',
      formdata: {},
      baseFormdata: {},
      activeName: 'base',
      image: '1',
      dialogVisibleDebt: false,
      viewType: '',
      imageBizParam: []
    };
  },

  created () {
    var _this = this;
    var cusId = _this.$route.meta.params.cusId;
    var cusName = _this.$route.meta.params.cusName;
    var arbitrateCaseNo = _this.$route.meta.params.arbitrateCaseNo;
    _this.imageBizParam = [
      {
        'top_outsystem_code': 'XXD_ZCBQ',
        'outsystem_code': 'XXD_ZCBQ01',
        'index': {
          'businessid': arbitrateCaseNo,
          /** 客户名称 */
          custname: cusName,
          /** 客户号 */
          custid: cusId
        }
      }
    ];
    if (_this.$route.meta.params.viewType == 'DETAIL') {
      this.image = '2';
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    handleClick (tab) {
      if (tab.name == 'thired') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    afterInit () {
      var _this = this;
      var arbitrateCaseNo = _this.$route.meta.params.arbitrateCaseNo;


      _this.viewType = _this.$route.meta.params.viewType;
      let data = {};
      data.arbitrateCaseNo = arbitrateCaseNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawarbitratecaseinfo/queryPlaLawArbitrateCaseInfo',
        data: data,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$nextTick(function () {
              yufp.clone(response.data, _this.formdata);
              yufp.clone(response.data, _this.baseFormdata);
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
    /**
    引入
    */
    importFn () {
      var _this = this;
      _this.baseBillParams = { condition: JSON.stringify({cusId: _this.formdata.cusId, accStatus: 'accStatus' }) }; ;
      _this.dialogVisibleDebt = true;
    },
    /**
    合同借据。。引入保存
     */
    saveBillFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refDebtTable.selections;
      if (!selectionsAry.length) {
        _this.$message({
          message: '请先选择至少一条记录',
          type: 'warning'
        });
        return;
      }
      var lawBillRels = [];
      let arbitrateCaseNo = _this.$route.meta.params.arbitrateCaseNo;
      selectionsAry.forEach(function (item) {
        item.totalTqlxAmt = item.debitInt + item.penalInt + item.compoundInt;
        item.arbitrateCaseNo = arbitrateCaseNo;
        item.curType = item.contCurType;
        lawBillRels.push(item);
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawarbitrtebillrel/saveContNo',
        data: JSON.stringify(lawBillRels),
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.authDialogVisible = false;
            _this.$refs.refTableCont.remoteData();
            _this.afterInit();
            _this.$message.success('保存成功');
            _this.dialogVisibleDebt = false;
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /*
    取消引入
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
      var model = {};
      model.serno = selectionsAry[0].serno;
      this.$confirm('是否取消引入?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning',
       callback: function (action) {
         if (action === 'confirm') {
           yufp.service.request({
             method: 'POST',
             url: backend.cmisNpam + '/api/plalawarbitrtebillrel/delete',
             data: JSON.stringify(selectionsAry[0]),
             callback: function (code, message, response) {
               if (response.code == 0) {
                 _this.$message.success('取消成功');
                 _this.$refs.refTableCont.remoteData();
               } else {
                 _this.$message.error(response.message);
               }
             }
           });
         } else {
           console.log('取消引入')
         }
       }
      })

    },
    /*
    添加
     */
    addFn () {
      this.$refs.refTable.clearValidateMessage();
      this.pushRefTableRow();
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /** 关闭借据选择窗口 */
    clearDebtFn () {
      this.dialogVisibleDebt = false;
    },
    // 保存
    doSave () {
      var _this = this;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          return;
        };
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawarbitratecaseinfo/update',
          async: false,
          data: _this.formdata,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$message('操作成功');
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
      });
    }
  }
};
</script>
