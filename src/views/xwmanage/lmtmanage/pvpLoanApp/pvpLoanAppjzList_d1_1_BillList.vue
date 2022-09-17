<template>
  <div>
    <yu-panel title="核心出账列表" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusCatalog':'cusCatalog','cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xproduct" placeholder="产品编号" name="prdId" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="交易日期" ctype="datepicker" placeholder="交易日期" name="tranDate"></yu-xform-item>
          <yu-xform-item label="授权状态 " ctype="select" data-code="STD_AUTH_STATUS" placeholder="授权状态 " name="authStatus" :datacode-filter="datacodeFilterFn"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>

          <yu-button ref="btn_doView" @click="customClick('todoView')" type="primary" v-if="checkCtrl('todoView')">查看</yu-button>
          <yu-button ref="btn_doNotifyFn" @click="customClick('doNotifyFn')" type="primary" v-if="checkCtrl('doNotifyFn')">通知核心出账</yu-button>
          <yu-button ref="btn_doNotifyFn" @click="customClick('cxfs')" type="primary" v-if="checkCtrl('cxfs')">重新发送</yu-button>
          <yu-button ref="btn_prtDisbOut" @click="customClick('prtDisbOut')" type="primary" v-if="checkCtrl('prtDisbOut')">打印放款通知书</yu-button>
          <!-- <yu-button ref="btn_doRevApp" @click="customClick('doRevApp')">交易冲正申请</yu-button> -->
          <yu-button ref="btn_doPrc" @click="customClick('doPrc')" type="primary" v-if="checkCtrl('doPrc')">冲正处理</yu-button>
          <yu-button ref="btn_doEndPvp" @click="customClick('doEndPvp')" type="primary" v-if="checkCtrl('doEndPvp')">撤销放款授权</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="baseParams" request-type="POST" selection-type="radio"  :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="出账编号" prop="tranSerno" width="180"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="pvpSerno" width="100" hide-column></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同号" prop="contNo" width="200"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="出账金额" prop="tranAmt"></yu-xtable-column>
        <yu-xtable-column label="出账日期" prop="tranDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId" hide-column></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="授权状态 " prop="authStatus" data-code="STD_AUTH_STATUS"></yu-xtable-column>
        <yu-xtable-column label="出账状态" prop="tradeStatus" width="100" data-code="STD_ACC_STATUS" hide-column></yu-xtable-column>
        <yu-xtable-column label="应答信息" prop="returnDesc" width="100">
         <template slot-scope="scope">
        <yu-popover trigger="hover" placement="top">
          <p> {{ scope.row.returnDesc }}</p>
          <div slot="reference" class="name-wrapper" v-if="returnDescFlag(scope.row)">
            <yu-tag  type="danger">查看</yu-tag>
          </div>
        </yu-popover>
      </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'tranSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/pvpauthorize/selectbymodel',
      baseParams: {condition: {oprType: '01', belgLine: '01', authStatusFlg: '0,1,3,4,5,6,7,8,9,A'}, sort: 'updateTime desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/pvpauthorize/delete/'
    };
  },
  mounted () {

  },
  methods: {
    returnDescFlag (data) {
      if (data.returnDesc == '' || data.returnDesc == null) { return false }
      return true;
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '2') {
          return false;
        }
        return true;
      });
    }

  }
};
</script>
