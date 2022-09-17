
<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="searchForm"  form-type="search" related-table-name="refTable1"  v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" placeholder="模糊查询" ctype="input" name="billNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="合同编号" placeholder="模糊查询" name="contNo" ctype="input" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户类型" placeholder="——请选择——" name="cusType" ctype="select" data-code="STD_ZB_CUS_CATALOG"></yu-xform-item>
            <yu-xform-item label="客户编号" placeholder="模糊查询"   name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询"   name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="台账状态" placeholder="——请选择——" name="accStatus" ctype="select" data-code="STD_ACC_STATUS"></yu-xform-item>
            <yu-xform-item label="贷款余额从(元)" ctype="custom" name="loanAmt" colspan="8">
              <yu-col :sm="11" :xs="24">
                  <el-input type="input"  v-model="loanBalance1" show-word-limit clearable placeholder="最小金额"></el-input>
              </yu-col>
              <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
              <yu-col :sm="11" :xs="24">
                  <el-input type="input"  v-model="loanBalance2" show-word-limit clearable placeholder="最大金额"></el-input>
              </yu-col>
            </yu-xform-item>
            <yu-xform-item label="贷款起始日从" ctype="custom" name="loanStartDate">
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="起始日期" v-model="startdate1" style="width: 100%;" @change="Fn('startdate1')"></yu-date-picker>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="结束日期" v-model="startdate2" style="width: 100%;" @change="Fn('startdate2')"></yu-date-picker>
                </yu-col>
            </yu-xform-item>
            <yu-xform-item label="贷款到期日从" ctype="custom" name="loanEndDate">
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="起始日期" v-model="enddate1" style="width: 100%;" @change="Fn('enddate1')"></yu-date-picker>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="结束日期" v-model="enddate2" style="width: 100%;" @change="Fn('enddate2')"></yu-date-picker>
                </yu-col>
            </yu-xform-item>
            <yu-xform-item label="担保方式" placeholder="——请选择——" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            <yu-xform-item label="五级分类：" placeholder="——请选择——" name="fiveClass" ctype="select" data-code="STD_FIVE_CLASS"></yu-xform-item>
            <yu-xform-item label="十级分类" placeholder="——请选择——" name="tenClass" ctype="select" data-code="STD_TEN_CLASS"></yu-xform-item>
        </yu-xform-group>
        </yu-xform>
    </yu-panel>
    <yu-panel title="委托贷款台账列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yu-button type="primary" @click="doView" v-if="checkCtrl('doView')">查看</yu-button>
         <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" style="float:right"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable1" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" align="center" requestType="POST"  :base-params="baseParams" selection-type="radio">
        <yu-xtable-column align="center" label="合同编号"   prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号"   prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号"   prop="cusId" ></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称"   prop="cusName"  ></yu-xtable-column>
        <yu-xtable-column align="center" label="担保方式"   prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额"   prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额"   prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate" ></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate" ></yu-xtable-column>
        <yu-xtable-column align="center" label="执行年利率" prop="execRateYear" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人"     prop="managerIdName"  ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构"   prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column align="center" label="台账状态"   prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
 <!-------------------------------------pop------------------------------------------>
     <yu-xdialog :visible.sync="visiable"  title="借据台账">
        <yu-xform form-type="search"  label-width="140px" related-table-name="refTable2">
          <yu-xform-group :column="2">
           <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
           <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
           <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
           <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable2" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition"  request-type="post">
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
          <yu-xtable-column label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button type="primary" @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';

// 获取仓库数据
yufp.lookup.reg('STD_ACC_STATUS,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_FIVE_CLASS,STD_TEN_CLASS,STD_ZB_CUS_CATALOG');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixin],
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      visiable: false,
      baseParams: {sort: 'loanStartDate desc'},
      params: {},
      // 金额
      loanBalance1: '',
      loanBalance2: '',
      // 贷款起始日从
      startdate1: '',
      startdate2: '',
      // 贷款到期日从
      enddate1: '',
      enddate2: '',
      dataUrl: backend.cmisBiz + '/api/accentrustloan/querymodelByCondition',
      excelExportUrl: backend.cmisBiz + '/api/accentrustloan/exportAccEntrustLoan',
      viewType: ''
    };
  },

  methods: {
    /* 时间先后顺序处理 */
    Fn (type) {
      // console.log("res", this.startdate1)

      if (type === 'startdate1') {
        if (+new Date(this.startdate1) > +new Date(this.startdate2)) {
          this.startdate1 = '';
        }
      };
      if (type === 'startdate2') {
        if (+new Date(this.startdate2) < +new Date(this.startdate1)) {
          this.startdate2 = '';
        }
      };
      if (type === 'enddate1') {
        if (+new Date(this.enddate1) > +new Date(this.enddate2)) {
          this.enddate1 = '';
        }
      };
      if (type === 'enddate2') {
        if (+new Date(this.enddate2) < +new Date(this.enddate1)) {
          this.enddate2 = '';
        }
      };
    },

    selectFn () {
      this.visiable = true;
    },
    confirmFn () {
      this.searchFormdata.contNo = this.$refs.refTable2.selections[0].contNo;
      this.visiable = false;
    },
    clearFn () {
      this.visiable = false;
    },
    /* 查看详情 */
    doView () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable1.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 传递的主键
      var billNo = selectionsAry[0].billNo;
      var pvpSerno = selectionsAry[0].pvpSerno;
      _this.$router.addTab({
        name: 'cusmanage/indivCus/accEntrustLoanQuery/accEntrustLoaInfo',
        key: 'accEntrustLoaInfo' + new Date().getTime(), // 必传
        title: '委托贷款台账详情',
        data: {
          billNo: billNo,
          pvpSerno: pvpSerno
        }
      });
    }
  }
};
</script>
