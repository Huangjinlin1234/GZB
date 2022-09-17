<template>
  <!--
    @created by wcx
    @updated by  2021-6-17 修改代码规范
    @updated by  2021-6-17 更新组件内容及标签
    @description 模板示例——档案台账查询
  -->
  <div>
        <yu-panel title=" 档案台账查询" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" ref="searchForm" form-type="search" v-model="formdata" label-width="110px">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户名称" placeholder="" name="cusName"></yu-xform-item>
                 <yu-xform-item label="档案编号" placeholder="" name="docNo"></yu-xform-item>
                 <yu-xform-item label="责任人" name="searchManagerId" :colspan="8" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'managerId':'searchManagerId'}"  ></yu-xform-item>
                 <yu-xform-item label="客户编号" placeholder="" name="cusId"></yu-xform-item>
                 <yu-xform-item label="档案状态" ctype="select" placeholder="" name="docStauts"  data-code="STD_DOC_STAUTS"></yu-xform-item>
                 <yu-xform-item label="责任机构" name="searchManagerBrId" :colspan="8" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'managerBrId':'searchManagerBrId'}"  ></yu-xform-item>
                <yu-xform-item label="关联业务编号" placeholder="" name="bizSerno"></yu-xform-item>
                <yu-xform-item label="档案分类" ctype="select" placeholder="" name="docClass" data-code="STD_DOC_CLASS" ></yu-xform-item>
                <yu-xform-item label="档案类型" ctype="select" placeholder="" name="docType" data-code="STD_DOC_TYPE" ></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
        </yu-panel>
        <yu-panel title="档案台账列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop>
      <yu-button style="float:left;margin-left:10px" type="primary" @click="infoFn" v-if="checkCtrl('infoFn')">查看</yu-button>
        <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(formdata)}" v-if="checkCtrl('export')"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="档案流水号" prop="docSerno" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案编号" prop="docNo" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="归档模式" prop="archiveMode" data-code="STD_ARCHIVE_MODE" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案分类" prop="docClass" data-code="STD_DOC_CLASS" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案类型" prop="docType" data-code="STD_DOC_TYPE" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="关联业务编号" prop="bizSerno" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同编号" prop="contNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="金额" prop="loanAmt" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="起始时间" prop="startDate" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="到期时间" prop="endDate" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="入库操作人" prop="optUsrName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="入库操作机构" prop="optOrgName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="入库操作时间" prop="storageOptDate" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案入现金库时间" prop="storageCashDate" width="140"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案状态" prop="docStauts" data-code="STD_DOC_STAUTS" width="80"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>

<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
// 注册字典项
yufp.lookup.reg('STD_DOC_STAUTS,STD_DOC_CLASS,STD_DOC_TYPE,STD_ARCHIVE_MODE');
export default {
  data: function () {
    return {
      formdata: {},
      activeName: 'base',
      dataUrl: backend.cmisBiz + '/api/docAccList/query/pageList',
      excelExportUrl: backend.cmisBiz + '/api/docAccList/exportDocAccList'
    };
  },
  components: { YufpDemoSelector, YufpExcelExport, YufpExcelImport },
  methods: {
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.formdata[mapping[item]] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.formdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.formdata[item] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.formdata[item] = data.orgCode;
          }
        }
      }
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let data = selectionsAry[0];
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentArchive/documentArchiveApplyDetail',
        // 自定义唯一页签key
        key: 'cfgAssistant' + new Date().getTime(), // 必传
        // 页签名称
        title: '档案台账详细信息',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          jsonData: data,
          serno: data.bizSerno
        }
      });
    }

  }
};
</script>
