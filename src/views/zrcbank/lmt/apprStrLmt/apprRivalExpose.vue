
<template>
  <!--
    @created by 陈杰 2021-09-7
    @description 交易对手风险暴露
  -->
  <div>
    <yu-panel title="交易对手风险暴露" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" :remove-empty="true" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" placeholder="产品名称" name="prdName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop class="excel-btn" style="margin-bottom:10px;">
        <yufp-excel-export :export-url="exportTemplateUrl" v-if="checkCtrl('download')" title="模板下载"  type="primary"></yufp-excel-export>
        <yufp-excel-import :import-url="excelImportUrl" v-if="checkCtrl('import')" title="批量导入" max-file-size="200" :async="false" @import-success="doAutoQuery"  type="primary"></yufp-excel-import>
        <yufp-excel-export :export-url="excelExportUrl" v-if="checkCtrl('export')" title="批量导出" :export-param="searchFormdata"  type="primary"></yufp-excel-export>
        <yu-button @click="doDelete" v-if="checkCtrl('delete')" type="primary">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" ctype="input" prop="prdName" @blur="doSave"></yu-xtable-column>
        <yu-xtable-column label="本金金额" ctype="input" prop="holdPosition" @blur="doSave"></yu-xtable-column>
        <yu-xtable-column label="不考虑缓释的风险暴露" ctype="input" prop="riskExposeNoslowRelease" @blur="doSave"></yu-xtable-column>
        <yu-xtable-column label="不可豁免的风险暴露" ctype="input" prop="riskExposeNoexampt" @blur="doSave"></yu-xtable-column>
        <yu-xtable-column label="可豁免的风险暴露" ctype="input" prop="riskExposeExampt" @blur="doSave"></yu-xtable-column>
        <yu-xtable-column label="风险缓释金额" ctype="select" prop="riskExposeAmt" @blur="doSave"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_BUSS_FLAG,STD_SPAC_TYPE');

export default {
  components: { YufpDemoSelector, YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      exportTemplateUrl: backend.cmisLmt + '/api/tradeopporiskexpose/exporttradeopporiskexposetemp',
      excelImportUrl: backend.cmisLmt + '/api/tradeopporiskexpose/importtradeopporiskexpose',
      excelExportUrl: backend.cmisLmt + '/api/tradeopporiskexpose/exporttradeopporiskexpose',
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/tradeopporiskexpose/selectbymodel',
      formdata: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.oauth.userName,
      userId: (state) => state.oauth.userId,
      org: (state) => state.oauth.org,
      instu: (state) => state.oauth.instu, // 金融机构Object
      loginCode: (state) => state.oauth.loginCode
    })
  },
  mounted () {
    this.Param = {
      condition: JSON.stringify({ oprType: '01' })
    };
  },
  methods: {
    // 删除
    doDelete: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      // 如果未选中表格数据，则弹出提示
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 获得选中的表格数据
      yufp.clone(selectionsAry[0], model);
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            // 操作类型，01--可展示   02--不可展示
            model.oprType = '02';
            // 向后台发送删除请求
            // method: 请求方式
            // url: 接口路径
            // data: 向后端传递的数据
            // callback: 服务请求后执行的回调函数
            // 逻辑删除，修改状态OPR_TYPE 01变为02
            yufp.service.request({
              method: 'POST',
              data: model,
              url: backend.cmisLmt + '/api/tradeopporiskexpose/update',
              callback: function (code, message, response) {
                // 删除后刷新表格数据
                _this.$refs.refTable.remoteData();
                // 弹出提示
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    doSave () {
      console.log('===============');
      // 获取选中的数据
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisLmt + '/api/tradeopporiskexpose/update',
        data: selectionsAry,
        callback: function (code, message, response) {
          if (response.data == 0) {
            _this.$refs.refTable.remoteData();
          } else {
            _this.$refs.refTable.remoteData();
            _this.$message({
              message: '保存失败',
              type: 'warning'
            });
          }
        }
      });
    },
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
<style>
.excel-btn .excel-export{
  margin-right:10px;
  margin-left:0;
}
.excel-btn .excel-import{
  margin-right:10px;
  margin-left:0;
}
</style>
