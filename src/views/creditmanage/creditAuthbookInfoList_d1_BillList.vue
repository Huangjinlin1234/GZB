<template>
  <div>
    <yu-panel title="征信授权书信息列表" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="征信查询类别" ctype="select" :options="dicOptions.qryClsOptions" placeholder="征信查询类别" name="qryCls" ></yu-xform-item>
          <yu-xform-item label="授权书日期" ctype="datepicker" placeholder="授权书日期" name="authbookDate" ></yu-xform-item>
          <yu-xform-item label="授权方式" ctype="select" :options="dicOptions.authModeOptions" placeholder="授权方式" name="authMode" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doView"  v-if="checkCtrl('view')" @click="customClick('doView')" style="margin-left:10px">查看</yu-button>
        <yufp-excel-export type="primary" v-show="excelExport" v-if="checkCtrl('export')" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}"></yufp-excel-export>
        <yu-button type="primary" v-show="!excelExport"  @click="excelExportfake">导出</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" :parse-response="requestSuccess" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="授权书编号" prop="authbookNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="征信查询类别" prop="qryCls" :options="dicOptions.qryClsOptions"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" :options="dicOptions.certTypeOptions"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="授权书日期" prop="authbookDate"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" :formatter="Formatter"></yu-xtable-column>
        <yu-xtable-column label="授权方式" prop="authMode" :options="dicOptions.authModeOptions"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
yufp.lookup.reg('STD_ZB_CERT_TYP');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  components: { YufpExcelExport },
  data: function () {
    return {
      pkField: 'caiSerno',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}], authModeOptions: [{key: '01', value: '线上'}, {key: '02', value: '线下'}], certTypeOptions: [{key: 'C', value: '户口簿'}, {key: 'A', value: '居民身份证'}, {key: 'B', value: '护照'}, {key: '11', value: '军人身份证件'}, {key: 'D', value: '港澳居民来往内地通行证'}, {key: 'E', value: '台湾同胞来往内地通行证'}, {key: '12', value: '外国人居留证'}, {key: 'Y', value: '警官证'}, {key: '13', value: '香港身份证'}, {key: '14', value: '澳门身份证'}, {key: '15', value: '台湾身份证'}, {key: '16', value: '其他证件'}, {key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditauthbookinfo/query',
      baseParams: {},
      searchFormdata: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditauthbookinfo/delete/',
      excelExportUrl: this.$backend.cmisBiz + '/api/creditauthbookinfo/asyncexportcreditauthbook',
      excelExport: true,
      totalData: ''
    };
  },
  watch: {
    // 监听totalData变化
    totalData: function (val) {
      if (val > 200) {
        this.excelExport = false;
      } else {
        this.excelExport = true;
      }
    }
  },
  methods: {
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      this.totalData = response.total;
    },
    excelExportfake () {
      this.$xutils.showMsgBox('提示', '导出数据过多,请缩小查询范围');
    },
    Formatter (row, column, cellValue) {
      var dt = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(row.createTime));
      return dt;
    }
  }
};
</script>
