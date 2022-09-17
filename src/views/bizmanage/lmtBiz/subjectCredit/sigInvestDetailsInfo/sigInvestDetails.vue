<template>
  <div>
    <yu-panel title="底层资产清单(大额风险暴露）" panel-type="simple">
      <yu-panel title="查询条件" panel-type="simple" v-model="searchFormdata">
      <yu-xform related-table-name="refTable" form-type="search"  label-width="120px" >
        <yu-xform-group :column="2">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="basicAssetCusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" fuzzy-query="both" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号"  name="basicAssetCusId"></yu-xform-item>
          <yu-xform-item label="申请时间" ctype="datepicker" placeholder="申请时间" name="inputDate"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
      <yu-panel title="底层资产清单(大额风险暴露）" panel-type="simple">
      <yu-button-drop :show-length="8">
        <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
        <yu-button type="primary" v-if="checkCtrl('edit')" @click="updateFn">修改</yu-button>
        <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" v-if="checkCtrl('view')" @click="detailFn">查看</yu-button>
        <yufp-excel-export type="primary" v-if="checkCtrl('download')" :export-url="exportTemplateUrl" title="模板下载"></yufp-excel-export>
        <yufp-excel-import type="primary" v-if="checkCtrl('import')" :import-url="excelImportUrl" title="导入" max-file-size="10" @import-success="doAutoQuery"></yufp-excel-import>
        <yufp-excel-export type="primary" v-if="checkCtrl('export')" :export-url="excelExportUrl" title="导出" :export-param="searchFormdata" style="margin-right: 10px;"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable"  condition-key="condition"  requestType="POST"  :pageable="true" :data-url="dataUrl" :base-params="Param" default-load="true" style="margin-top:5px">
        <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
        <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
        <yu-xtable-column label="资产编号" prop="assetNo"></yu-xtable-column>
        <yu-xtable-column label="项目当前总市值" prop="proCurtMarketValue"></yu-xtable-column>
        <yu-xtable-column label="我行投资当前市值" prop="investCurtMarketValue"></yu-xtable-column>
        <yu-xtable-column label="底层资产编号" prop="basicAssetNo" ></yu-xtable-column>
        <yu-xtable-column label="底层资产名称" prop="basicAssetName"></yu-xtable-column>
        <yu-xtable-column label="底层资产类型" prop="basicAssetType" data-code="STD_ZB_BOTT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate" ></yu-xtable-column>
      </yu-xtable>
      </yu-panel>
    </yu-panel>

  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_BOTT_TYPE');
export default{
  components: {mixinList, YufpDemoSelector, YufpExcelExport, YufpExcelImport},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/siginvestdetailsinfo/selectByModel',
      Param: { condition: JSON.stringify({ oprType: '01', status: '01' })},
      excelImportUrl: this.$backend.cmisBiz + '/api/siginvestdetailsinfo/importsiginvestdetailsinfo',
      excelExportUrl: this.$backend.cmisBiz + '/api/siginvestdetailsinfo/asyncexportsiginvestdetailsinfo',
      searchFormdata: {},
      exportTemplateUrl: this.$backend.cmisBiz + '/api/siginvestdetailsinfo/exportsiginvestdetailstemplate'
    };
  },
  methods: {

    detailFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      model.formdata = obj;
      model.viewType = 'DETAIL';
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/subjectCredit/sigInvestDetailsInfo/sigInvestDetailsList',
          key: 'detail',
          // 页签名称
          title: '底层资产清单(大额风险暴露)',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },
    /**
      新增
     */
    addFn: function () {
      var _this = this;
      var model = {};
      model.formdata = {};
      model.formdata.pkId = _this.$xutils.getSEQWithParamFromServer('LMT_SERNO');
      model.formdata.inputDate = _this.$xutils.getDefaultformulaData('$CURRDATE');
      model.formdata.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.formdata.inputIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
      model.formdata.inputBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
      model.formdata.inputId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.viewType = 'ADD';
      if (_this.type != undefined && _this.type != null) {
        model.type = _this.type;
        model.formdata.proNo = _this.proNo;
        model.formdata.proName = _this.proName;
        model.formdata.assetNo = _this.assetNo;
        model.formdata.basicAssetCusId = _this.basicAssetCusId;
        model.formdata.basicAssetCusName = _this.basicAssetCusName;
        model.formdata.basicAssetGuarCusId = _this.basicAssetGuarCusId;
        model.formdata.basicAssetGuarCusName = _this.basicAssetGuarCusName;
      }
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/subjectCredit/sigInvestDetailsInfo/sigInvestDetailsList',
          key: 'add',
          // 页签名称
          title: '新增底层资产清单(大额风险暴露)',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },
    /**
      修改
      */
    updateFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      model.formdata = obj;
      model.viewType = 'EDIT';
      console.log(obj);
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/subjectCredit/sigInvestDetailsInfo/sigInvestDetailsList',
          key: 'edit',
          // 页签名称
          title: '底层资产清单修改(大额风险暴露)',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },
    /**
        删除
       */
    deleteFn: function () {
      var _this = this;
      // 获取选中的数据
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/siginvestdetailsinfo/deleteSigInvestDetail',
              data: {
                pkId: selectionsAry[0].pkId
              },
              callback: function (code, message, response) {
                if (response.data == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({
                    message: '删除失败，请联系管理员',
                    type: 'warning'
                  });
                } else {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                }
              }
            });
          }
        }
      });
    },
    doAutoQuery: function () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }

  }

};
</script>