/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel v-if="mainFlag" title="企业在我行存量业务情况" panel-type="simple">
      <h1><span style="font-size:16px">A.资金业务存量授信情况</span></h1>
      <yu-xtable ref="refTable"  row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo,'prdCatalog':'1'}}"  :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subLmtNo"></yu-xtable-column>
        <yu-xtable-column label="授信分项额度名称" prop="subLmtName"></yu-xtable-column>
        <yu-xtable-column label="授信额度(万元)" prop="lmtAmt" :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column label="已用额度(万元)" prop="outstndAmt" :formatter="formatterOutstndAmt"></yu-xtable-column>
        <yu-xtable-column label="可用额度(万元)" prop="avlLmtAmt" :formatter="formatterAvlLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="是否循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
      </yu-xtable>
      <h1><span style="font-size:16px"><br/><br/>B、债券池用信业务情况</span></h1>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}"  :data-url="dataUrl1" :default-load="true">
        <yu-xtable-column label="投资资产名称" prop="investAssetName"></yu-xtable-column>
        <yu-xtable-column label="投资金额(万元)" prop="investAmt" :formatter="formatterInvestAmt"></yu-xtable-column>
        <yu-xtable-column label="交易日期" prop="tranDate"></yu-xtable-column>
        <yu-xtable-column label="投资部门/分支机构名称" prop="investBrId"></yu-xtable-column>
      </yu-xtable>
      <h1><span style="font-size:16px"><br/><br/>C、信贷业务存量授信情况</span></h1>
      <h1><span style="font-size:15px"><br/>C1、敞口存量授信情况</span></h1>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo,'busiType':'1','prdCatalog':'2'}}"  :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subLmtNo"></yu-xtable-column>
        <yu-xtable-column label="授信分项额度名称" prop="subLmtName"></yu-xtable-column>
        <yu-xtable-column label="授信额度(万元)" prop="lmtAmt" :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column label="已用额度(万元)" prop="outstndAmt" :formatter="formatterOutstndAmt"></yu-xtable-column>
        <yu-xtable-column label="可用额度(万元)" prop="avlLmtAmt" :formatter="formatterAvlLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="是否循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
      </yu-xtable>
      <h1><span style="font-size:15px"><br/>C2、低风险存量授信情况</span></h1>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo,'busiType':'2','prdCatalog':'2'}}"  :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subLmtNo"></yu-xtable-column>
        <yu-xtable-column label="授信分项额度名称" prop="subLmtName"></yu-xtable-column>
        <yu-xtable-column label="授信额度(万元)" prop="lmtAmt" :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column label="已用额度(万元)" prop="outstndAmt" :formatter="formatterOutstndAmt"></yu-xtable-column>
        <yu-xtable-column label="可用额度(万元)" prop="avlLmtAmt" :formatter="formatterAvlLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="是否循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel v-if="!mainFlag" title="机构在我行存量业务情况" panel-type="simple">
      <h1><span style="font-size:16px">A、综合授信存量授信情况</span></h1>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo,'busiType':'1','prdCatalog':'2'}}"  :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subLmtNo"></yu-xtable-column>
        <yu-xtable-column label="授信分项额度名称" prop="subLmtName"></yu-xtable-column>
        <yu-xtable-column label="授信额度(万元)" prop="lmtAmt" :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column label="已用额度(万元)" prop="outstndAmt" :formatter="formatterOutstndAmt"></yu-xtable-column>
        <yu-xtable-column label="可用额度(万元)" prop="avlLmtAmt" :formatter="formatterAvlLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="是否循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
      </yu-xtable>
      <h1><span style="font-size:16px"><br/><br/>B、资金业务存量授信情况</span></h1>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo,'prdCatalog':'1'}}"  :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subLmtNo"></yu-xtable-column>
        <yu-xtable-column label="授信分项额度名称" prop="subLmtName"></yu-xtable-column>
        <yu-xtable-column label="授信额度(万元)" prop="lmtAmt" :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column label="已用额度(万元)" prop="outstndAmt" :formatter="formatterOutstndAmt"></yu-xtable-column>
        <yu-xtable-column label="可用额度(万元)" prop="avlLmtAmt" :formatter="formatterAvlLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="是否循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
      </yu-xtable>
      <h1><span style="font-size:16px"><br/><br/>C、债券池用信业务情况</span></h1>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}"  :data-url="dataUrl1" :default-load="true">
        <yu-xtable-column label="投资资产名称" prop="investAssetName"></yu-xtable-column>
        <yu-xtable-column label="投资金额(万元)" prop="investAmt" :formatter="formatterInvestAmt"></yu-xtable-column>
        <yu-xtable-column label="交易日期" prop="tranDate"></yu-xtable-column>
        <yu-xtable-column label="投资部门/分支机构名称" prop="investBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_FIVE_CLASS,STD_ZB_CUR_TYP,STD_ZB_YES_NO');

export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/psplmtsitu/queryList',
      dataUrl1: this.$backend.cmisPsp + '/api/pspbondsitu/queryList',
      // baseParams: {},
      taskNo: '',
      mainFlag: false // 是否主体授信
    };
  },
  created () {
    this.init();
  },
  methods: {
    // 授信额度
    formatter (row) {
      return this.formater(row.lmtAmt, 0);
    },
    // 已用额度(万元)
    formatterOutstndAmt (row) {
      return this.formater(row.outstndAmt, 0);
    },
    // 可用额度(万元)
    formatterAvlLmtAmt (row) {
      return this.formater(row.avlLmtAmt, 0);
    },
    // 投资金额(万元)
    formatterInvestAmt (row) {
      return this.formater(row.investAmt, 0);
    },
    // 金额格式化
    formater: function (money, num) {
      // var num1 = num && num > 0 && num <= 20 ? num : 2;
      var money2 = money / 10000;
      var money1 = parseFloat((money2 + '').replace(/[^\d\.-]/g, '')).toFixed(num);
      var l = money1.split('.')[0].split('').reverse();
      // var r = money1.split('.')[1];
      var t = '';
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
      }

      return t.split('').reverse().join('');
    },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.mainFlag = data.pspTask.checkType === '27' || data.pspTask.checkType === '37';
      _this.taskNo = data.pspTask.taskNo;
    }
  }
};
</script>
