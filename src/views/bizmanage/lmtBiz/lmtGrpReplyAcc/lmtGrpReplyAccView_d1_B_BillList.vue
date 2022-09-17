<template>
  <div>
    <yu-panel title="授信批复明细">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="replySerno"></yu-xtable-column>
        <yu-xtable-column label="分项流水号" prop="subSerno"></yu-xtable-column>
        <yu-xtable-column label="分项名称" prop="subName"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType"></yu-xtable-column>
        <yu-xtable-column label="预授信品种编号" prop="preLmtBizType"></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="授信期限" prop="lmtTerm"></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt"></yu-xtable-column>
        <yu-xtable-column label="原额度分项编号" prop="origiLmtAccSubNo"></yu-xtable-column>
        <yu-xtable-column label="原额度分项金额" prop="origiLmtAccSubAmt"></yu-xtable-column>
        <yu-xtable-column label="原额度分项期限" prop="origiLmtAccSubTerm"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" hidden></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" hidden></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="最近修改人" prop="updId" hidden></yu-xtable-column>
        <yu-xtable-column label="最近修改机构" prop="updBrId" hidden></yu-xtable-column>
        <yu-xtable-column label="最近修改日期" prop="updDate"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtreplysub/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtreplysub/delete/'
    };
  }
};
</script>