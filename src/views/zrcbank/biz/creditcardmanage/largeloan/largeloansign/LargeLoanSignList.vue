
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息-列表
  -->
  <div>
    <yu-panel panel-type="simple">
      <yu-xform related-table-name="largeLoanSignListTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="卡号" placeholder="卡号 " name="cardNo" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary"  v-if="checkCtrl('print')"  @click="printContFn">打印合同</yu-button>
        <yu-button type="primary"  v-if="checkCtrl('sign')" @click="signContFn">签订</yu-button>
        <yu-button type="primary"  v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
        <!--<yu-button type="primary"  v-if="checkCtrl('add')" @click="addFn">新增</yu-button>-->
      </yu-button-drop>
      <yu-xtable ref="largeLoanSignListTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno">
        <template slot-scope="scope">
            <a class="underline" @click="showFuncDetail(scope.row)">{{ scope.row.serno }}</a>
          </template></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="卡号" prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="分期金额" prop="loanAmount"></yu-xtable-column>
        <yu-xtable-column label="分期期数" prop="loanTerm"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_CONT_STATUS,STD_ZB_APPR_STATUS');
export default {
  name: 'LargeLoanSignList',
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditctrloancont/query',
      searchFormdata: {
        cusName: '',
        cardNo: '',
        certCode: '',
        applyExistsStatus: '000,992'
      },
      baseParams: {
        condition: {applyExistsStatus: '000,992'
        }
      }
    };
  },
  mounted: function () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshLargeLoanSignListTable', this.refreshLargeLoanSignListTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshLargeLoanSignListTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshLargeLoanSignListTable: function () {
      let _this = this;
      _this.$refs.largeLoanSignListTable.remoteData();
    },
    /**
     * 打印合同
     */
    printContFn: function () {
      var _this = this;
      if (_this.$refs.largeLoanSignListTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var params = _this.$refs.largeLoanSignListTable.selections[0];
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemoxykzxxffqht';
      params.src = _this.$backend.frptRptService + 'xykzxxffqht.cpt&contNo=' + params.contNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        key: keydemo, // 必传
        // 页签名称
        title: '打印合同',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    /**
     * 签订合同
     */
    signContFn: function () {
      let _this = this;
      let selData = _this.$refs.largeLoanSignListTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selData[0].contStatus !== '100' && selData[0].approveStatus !== '000') {
        _this.$message({
          message: '请选择合同状态为未生效且未审批的数据',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloansign/largeloansigncont/LargeLoanSignContIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '大额分期合同签订',
        data: {
          name: this.$route.name,
          actionType: 'SIGN', // 操作类型
          data: selData[0]
        }
      });
    },
    /**
     * 查看
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.largeLoanSignListTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloansign/largeloansigncont/LargeLoanSignContIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看大额分期申请',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    },
    /**
     * 查看
     */
    showFuncDetail: function (row) {
      let _this = this;
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloansign/largeloansigncont/LargeLoanSignContIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看大额分期申请',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: row,
          name: this.$route.name
        }
      });
    }
  }
};
</script>
