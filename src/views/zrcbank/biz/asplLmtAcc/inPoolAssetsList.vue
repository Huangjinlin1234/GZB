
<template>
  <!--
    @created by 屈文
    @description 入池资产清单
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="入池资产清单" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
              <yu-xform-group :column="3">
                <yu-xform-item label-width="160px" label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label-width="160px" label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
                <yu-xform-item label-width="160px" label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo"></yu-xform-item>
                <yu-xform-item label-width="160px" label="资产编号" ctype="input" placeholder="资产编号" name="assetNo" ></yu-xform-item>
                <yu-xform-item label-width="160px" label="统一押品编号" ctype="input" placeholder="统一押品编号" name="guarNo" ></yu-xform-item>
                <yu-xform-item label-width="160px" label="资产类型" ctype="select" placeholder="资产类型" name="assetType" data-code="STD_ASPL_ASSET_TYPE"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yufp-excel-export :export-url="excelExportUrl" title="导出" :export-param="searchFormdata" type="primary"></yufp-excel-export>
          </yu-button-drop>
          <yu-xtable ref="refTable" row-number condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST" :base-params="{condition: {}}">
            <yu-xtable-column label="资产编号" prop="assetNo"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="统一押品编号" prop="guarNo"></yu-xtable-column>
            <yu-xtable-column label="资产类型" prop="assetType" data-code="STD_ASPL_ASSET_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产价值" prop="assetValue"></yu-xtable-column>
            <yu-xtable-column label="入池时间" prop="inpTime"></yu-xtable-column>
            <yu-xtable-column label="资产到期日期" prop="assetEndDate"></yu-xtable-column>
            <yu-xtable-column label="入池状态" prop="isPool" data-code="STD_ZB_YES_NO"   >
              <template slot-scope="scope">
                <yu-tag :type="scope.row.isPledge === '0' ? 'error' : 'success'"  close-transition>{{ scope.row.isPledge=='0' ? '未入池' :'已入池' }}</yu-tag>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="质押状态" prop="isPledge" data-code="STD_ZB_YES_NO"   >
              <template slot-scope="scope">
                <yu-tag :type="scope.row.isPledge === '0' ? 'error' : 'success'"  close-transition>{{ scope.row.isPledge=='0' ? '未质押' :'已质押' }}</yu-tag>
              </template>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ASPL_ASSET_TYPE');
import mixinList from '@/utils/mixins/mixin-list';
import mixinForm from '@/utils/mixins/mixin-form';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixinForm, mixinList],
  components: {YufpDemoSelector, YufpExcelExport, YufpExcelImport},
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      dataUrl: backend.cmisBiz + '/api/asplassetslist/inpoolassetslistall',
      excelExportUrl: backend.cmisBiz + '/api/aspliopooldetails/exportinpoolassetlist'
    };
  },
  methods: {
  }
};
</script>