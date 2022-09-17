
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="refTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" name="papaiSerno" placeholder="精确查询" ctype="input"></yu-xform-item>
          <yu-xform-item label="处置方式" placeholder="——请选择——" name="dispMode" ctype="select" data-code="STD_DISP_MODE"></yu-xform-item>
          <yu-xform-item label="抵债资产编号" name="pldimnNo" placeholder="精确查询" ctype="input"></yu-xform-item>
          <yu-xform-item label="抵债资产名称" name="pldimnName" placeholder="模糊查询" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="记账状态" placeholder="——请选择——" name="recordStatus" ctype="select" :options="dicOptions.typeOptions" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>
    <yu-panel title="抵债资产台账列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop>
        <yu-button style="float:left" type="primary" @click="sendtoHXFn" v-if="checkCtrl('coreCharge')">核心记账</yu-button>
        <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')"></yufp-excel-export>
        <yu-button style="float:left;margin-left:10px" type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
         <yu-button type="primary" @click="rectFn" v-if="checkCtrl('rush')">记账冲正</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="业务流水号" prop="papaiSerno"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵债资产编号" prop="pldimnNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵债资产名称" prop="pldimnName"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="处置方式" prop="dispMode" data-code="STD_DISP_MODE"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="记账日期" prop="recordDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
// 注册字典项
yufp.lookup.reg('STD_DISP_MODE,STD_RECORD_STATUS');
export default {
  components: { YufpExcelExport },
  data: function () {
    return {
      searchFormdata: {},
      dicOptions: {typeOptions: [{key: '01', value: '待记账'}, {key: '03', value: '记账成功'}, {key: '04', value: '记账失败'}]},
      dataUrl: backend.cmisNpam + '/api/plaassetpldappinfo/getassetpldacclist',
      viewType: '',
      excelExportUrl: backend.cmisNpam + '/api/plaassetpldappinfo/exportPlaAssetPldAppInfo'
    };
  },

  methods: {
    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      let selData = _this.$refs.refTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let papaiSerno = selData[0].papaiSerno;
      let path = 'zrcbank/npam/plaAssetPldAppInfo/thingAssetDisposalManagementDetail/plaAssetPldAppInfoDetail';
      _this.$router.addTab({
        name: path,
        key: 'plaAssetPldAppInfoDetail' + new Date().getTime(),
        title: '抵债资产处置详情',
        data: {
          viewType: 'DETAIL', // 操作类型
          papaiSerno: papaiSerno
        }
      });
    },
    /*
     * 核心记账
     */
    sendtoHXFn () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 选中的数据
      var select = _this.$refs.refTable.selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaassetpldappinfo/sendtohxjz',
        data: select,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message.success('操作成功');
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
    *记账冲正
     */
    rectFn () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var data = _this.$refs.refTable.selections[0];
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/plaassetpldappinfo/czcl',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    }

  }
};
</script>
