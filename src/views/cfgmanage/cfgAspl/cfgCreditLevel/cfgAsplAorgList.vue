<template>
  <div>
    <yu-panel title="承兑行名单配置">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" related-table-name="refTable">
        <yu-xform-group :column="2">
          <yu-xform-item label="总行行号" ctype="input" placeholder="总行行号" name="headBankNo"></yu-xform-item>
          <yu-xform-item label="同业名称" ctype="input" placeholder="同业名称" name="intbankName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-form-buttons align="left" :show-length="7">
          <yu-button @click="onAdd" type="primary">新增</yu-button>
          <yu-button @click="onUpdate" type="primary">修改</yu-button>
          <yu-button @click="onDetail" type="primary">详情</yu-button>
          <yufp-excel-export :export-url="exportTemplateUrl" title="模板下载" type="primary"></yufp-excel-export>
          <yufp-excel-export :export-url="excelExportUrl" title="导出" :export-param="searchFormdata" type="primary"></yufp-excel-export>
          <yufp-excel-import :import-url="excelImportUrl" title="上传" max-file-size="10" @import-success="doAutoQuery" type="primary"></yufp-excel-import>
        </yu-form-buttons>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true"
        :utrace="utrace"
        u-pk-value="asplaorglist_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="pkId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save" >
        <yu-xtable-column label="主键" prop="pkId" hide-column utrace></yu-xtable-column>
        <yu-xtable-column label="承兑行行号（总行）" prop="headBankNo" utrace></yu-xtable-column>
        <yu-xtable-column label="ECIF编号" prop="ecifNo" hide-column utrace></yu-xtable-column>
        <yu-xtable-column label="承兑行名称（同业名称）" prop="intbankName" utrace></yu-xtable-column>
        <yu-xtable-column label="信用等级" prop="creditLevel" data-code="STD_ACC_BANK_CREDIT_LEVEL" utrace></yu-xtable-column>
        <yu-xtable-column label="抵质押率" prop="pldimnRate" sign="%" :multiple="100" hide-column utrace></yu-xtable-column>
        <!--<yu-xtable-column label="生效状态" prop="status" data-code="STD_ZB_YES_NO"></yu-xtable-column>-->

        <yu-xtable-column label="操作类型" prop="oprType" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
        <yu-xtable-column label="最近修改人" prop="updId" hide-column utrace></yu-xtable-column>
        <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column utrace></yu-xtable-column>
        <yu-xtable-column label="最近修改日期" prop="updDate"  utrace></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId" hide-column></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
        <yu-xtable-column prop="status" data-code="STD_ZB_YES_NO" label="生效状态"  filter-placement="bottom-end">
          <template slot-scope="scope">
            <yu-tag :type="scope.row.status === '0' ? 'error' : 'success'"  close-transition>{{ scope.row.status=='0' ? '未生效' :'生效' }}</yu-tag>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import { sessionStore } from 'xy-utils';
yufp.lookup.reg('STD_ACC_BANK_CREDIT_LEVEL,STD_ZB_YES_NO');
export default {
  components: {YufpDemoSelector, YufpExcelExport, YufpExcelImport},
  mixins: [mixinList],
  props: {

  },
  data () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      // formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'asplaorglisttable',
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/asplaorglist/asplaorglistdata',
      baseParams: {sort: 'inputDate desc', condition: {oprType: '01'}},
      exportTemplateUrl: backend.cmisBiz + '/api/asplaorglist/exportasplaorglistmodel',
      excelImportUrl: backend.cmisBiz + '/api/asplaorglist/importasplaorglist',
      excelExportUrl: backend.cmisBiz + '/api/asplaorglist/exportasplaorglist'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 初始化信息
    AfterInit () {
      // 初始化
    },


    // 新增申请
    onAdd () {
      this.$dialog.open(
        '承兑行名单新增界面',
        'cfgmanage/cfgAspl/cfgCreditLevel/cfgAsplAorgAddIndex',
        1000,
        400,
        null,
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },
    // 修改
    onUpdate () {
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      selections[0].op = 'EDIT';
      this.$dialog.open(
        '承兑行名单修改界面',
        'cfgmanage/cfgAspl/cfgCreditLevel/cfgAsplAorgUpdateIndex',
        1000,
        400,
        selections[0],
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },

    // 查看
    onDetail () {
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      selections[0].op = 'VIEW';
      this.$dialog.open(
        '承兑行名单详情界面',
        'cfgmanage/cfgAspl/cfgCreditLevel/cfgAsplAorgUpdateIndex',
        1000,
        400,
        selections[0],
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    }
  }
};
</script>
