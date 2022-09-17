/**
 * @Created by  hujun on 2021/6/9下午2:58:08.
 * @updated by  youhongs
 * @description 信用卡核销台账列表
 */
<template>
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="applyTable" form-type="search" label-width="150px" ref="searchForm" v-model="searchFormdata">
          <yu-xform-group :column="2">
            <yu-xform-item placeholder="请输入客户名称"  label="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item placeholder="请输入信用卡卡号"  label="信用卡卡号" name="cardNo"></yu-xform-item>
            <yu-xform-item placeholder="请输入身份证号码"  label="身份证号码" name="certCode"></yu-xform-item>
            <yu-xform-item placeholder="请输入登记人" label="登记人" name="inputIdName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item  ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>

       <yu-panel title="信用卡核销台账列表" :hideFilter="false" :collapseHide="false">
        <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}"  v-if="checkCtrl('export')"></yufp-excel-export>
        <yu-xtable ref="applyTable" row-number :data-url="dataApplyListUrl" request-type="POST" :base-params="baseApplyParams" condition-key="condition">
          <yu-xtable-column label="账户编号" prop="accno" width="180"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
          <yu-xtable-column label="身份证号码" prop="certCode" width="200" ></yu-xtable-column>
          <yu-xtable-column label="信用卡卡号" prop="cardNo" width="200" ></yu-xtable-column>
          <yu-xtable-column label="授信额度" prop="lmtAmt" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="账龄" prop="overdueDay" width="150" ></yu-xtable-column>
          <yu-xtable-column label="逾期本金金额" prop="writeoffCap" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="核销利息" prop="writeoffInt" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="核销费用" prop="writeoffCost" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="核销总金额" prop="totalWriteoffAmt" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" width="150" ></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="150" ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixin],
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      dataApplyListUrl: this.$backend.cmisNpam + '/api/placardinforel/queryPlaCardInfoRelList',
      excelExportUrl: backend.cmisNpam + '/api/placardinforel/exportPlaCardInfoRel',
      overdueDayStart: '',
      overdueDayEnd: '',
      baseApplyParams: {condition: JSON.stringify({ approveStatus: '997' })},
      searchFormdata: {}
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
  methods: {

  }
};
</script>
