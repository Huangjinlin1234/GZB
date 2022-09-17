
<template>
  <!--
    @created by
  -->
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" ref="searchForm" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item name="managerBrIdList" :colspan="8" ctype="input" label="责任机构" hidden></yu-xform-item>
            <yu-xform-item name="managerBrIdListName" :colspan="8" ctype="input" icon="search" @click="selectArry" label="责任机构" ></yu-xform-item>
            <yu-xform-item label="五级分类" placeholder="五级分类" ctype="checkbox" value-type="string" name="fiveClassList" data-code="STD_FIVE_CLASS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFna()">查询</yu-button>
            <yu-button type="primary" @click="resetFn()">重置</yu-button>
        </div>
      </template>
    </yu-panel>
    <yu-panel title="对私贷款实时报表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yufp-excel-export type="primary" v-show="excelExport" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" style="float:right"></yufp-excel-export>
         <yu-button v-show="!excelExport" type="primary" @click="excelExportfake">导出</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" :parse-response="requestSuccess" :row-number="true" request-type="POST"
        :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" >
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="loanStartDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" prop="loanEndDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="科目编号" prop="subjectNo"></yu-xtable-column>
        <yu-xtable-column label="科目名称" prop="subjectNoName"></yu-xtable-column>
        <yu-xtable-column label="客户经理员工号" prop="managerId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户经理姓名" prop="managerIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="责任机构号" prop="managerBrId" width="120"></yu-xtable-column>
        <yu-xtable-column label="责任机构名称" prop="managerBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="账户机构号" prop="finaBrId" width="120"></yu-xtable-column>
        <yu-xtable-column label="账务机构名称" prop="finaBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
        <yu-xtable-column label="十级分类" prop="tenClass" data-code="STD_TEN_CLASS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 责任机构 -->
    <yu-xdialog :visible.sync="visiable" :width="width" title="机构查询" >
        <yu-xform form-type="search" v-model="searchFormdata1" label-width="100px" related-table-name="refTable1">
          <yu-xform-group :column="3">
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgCode" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable1" :row-number="true" selection-type="checkbox" :pageable="true" request-type="POST" :data-url="dataUrl1" :default-load="true" :base-params="baseParams" condition-key="condition">
          <yu-xtable-column label="机构名称" prop="orgName" width="300px"></yu-xtable-column>
          <yu-xtable-column label="机构编号" prop="orgCode" width="150px"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="orgSts" data-code="DATA_STS"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';

// 获取仓库数据
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_FIVE_CLASS,STD_TEN_CLASS');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixin],
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      baseParams: {condition: { oprType: '01', belgLineList: '01,02' }},
      searchFormdata: {},
      visiable: false,
      dataUrl: this.$backend.cmisBiz + '/api/accloan/',
      excelExportUrl: backend.cmisBiz + '/api/accloan/exportaccloancus',
      dataUrl1: backend.appOcaService + '/api/adminsmorg/querypagebyall',
      excelExport: true,
      totalData: '',
      viewType: ''

    };
  },
  watch: {
    // 监听totalData变化
    totalData: function (val) {
      if (val > 5000) {
        this.excelExport = false;
      } else {
        this.excelExport = true;
      }
    }
  },
  methods: {
    // 责任机构选择
    selectArry () {
      this.visiable = true;
    },
    // 确认
    confirmFn () {
      var arrId = [];
      var arrName = [];
      var selections = this.$refs.refTable1.selections;
      selections.forEach(item => {
        arrId.push(item.orgId);
        arrName.push(item.orgName);
      });
      this.searchFormdata.managerBrIdList = arrId.toString();
      this.searchFormdata.managerBrIdListName = arrName.toString();
      this.visiable = false;
    },
    // 取消
    clearFn () {
      this.visiable = false;
    },
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      this.totalData = response.total;
    },
    excelExportfake: function () {
      this.$xutils.showMsgBox('提示', '导出数据过多');
    },
    // 条件查询
    searchFna: function () {
      this.$refs.refTable.remoteData({
        condition: JSON.stringify(this.searchFormdata)
      });
    },

    // 重置
    resetFn: function () {
      // 清空条件
      this.$refs.searchForm.resetFields();
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    }


  }
};
</script>
