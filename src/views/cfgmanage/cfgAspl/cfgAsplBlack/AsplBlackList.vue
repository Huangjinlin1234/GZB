<template>
  <yu-tabs type="card" v-model="activeName" @tab-click="handleClick">
  <yu-tab-pane label="超短贷拦截名单" name="accLoanBlacks">
    <div>
      <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="accLoanForm" form-type="search" related-table-name="accLoanTable" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="yu-xpersonal-info" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo"></yu-xform-item>
            <yu-xform-item label="客户经理编号" ctype="input" placeholder="客户经理编号" name="managerId"></yu-xform-item>
            <yu-xform-item label="生效状态" ctype="select" placeholder="生效状态" name="inureStatus" data-code="STD_ZB_YES_NO"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel :hideFilter="false" :collapseHide="false">
        <yu-xdialog  title="名单选择向导" :visible.sync="dialogVisibleGuide" width="650px">
          <yu-xform ref="refForm" label-width="140px" v-model="formdata">
            <yu-xform-group column="1">
              <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" idField="cusId"
                width="800" height="900" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="拦截业务类型" ctype="select" placeholder="拦截业务类型" name="bizType" v-model="addbizType" rules="required" data-code="STD_ZB_ASPL_BALCKS_TYPE" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="nextFn">下一步</yu-button>
              <yu-button @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
        <yu-form-buttons align="left">
          <!-- 超短贷新增-->
          <yu-button @click="accLoanAdd" type="primary">新增</yu-button>
          <yu-button @click="onLoanUpdate" type="primary">修改</yu-button>
          <yu-button @click="onLoanDetail" type="primary">查看</yu-button>
          <yu-button @click="onLoanDelete" type="primary">删除</yu-button>
          <!--<yufp-excel-import :import-url="excelImportUrl" title="上传" max-file-size="10" @import-success="doAutoQuery" type="primary"></yufp-excel-import>
          <yufp-excel-export :export-url="excelExportUrl" title="导出" :export-param="searchFormdata" type="primary"></yufp-excel-export>
          <yufp-excel-export :export-url="exportTemplateUrl" title="模板下载" type="primary"></yufp-excel-export>-->
        </yu-form-buttons>
        <yu-xtable ref="accLoanTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition: {'bizType':'1'}}" request-type="post" :default-load="true"
          :utrace="utrace"
          u-pk-value="asplwhtls_form"
          trace-server-name="/yusp-app-oca"
          ukey-field="pkId"
          :utrace-usr-id="userId"
          :utrace-org-id="orgId"
          :utrace-menu-id="menuId"
          trace-get-interface="/api/utrace/listByPk"
          trace-get-list-interface="/api/utrace/listPage"
          trace-save-interface="/api/utrace/save">
          <yu-xtable-column label="主键" prop="pkId" hide-column utrace></yu-xtable-column>
          <yu-xtable-column label="业务流水号" prop="serno" ></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" utrace></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" utrace></yu-xtable-column>
          <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_ASPL_BALCKS_TYPE" utrace></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" utrace></yu-xtable-column>
          <yu-xtable-column label="客户经理编号" prop="managerId"  utrace></yu-xtable-column>
          <yu-xtable-column label="客户经理名称" prop="managerIdName"  utrace></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="生效状态" prop="inureStatus" data-code="STD_ZB_YES_NO" utrace></yu-xtable-column>
          <yu-xtable-column label="原因描述" prop="resn" utrace hide-column></yu-xtable-column>
          <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
          <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
          <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
          <yu-xtable-column label="主管客户经理" prop="managerId" hide-column></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        </yu-xtable>
    </div>
  </yu-tab-pane>
  <yu-tab-pane label="银票拦截名单" name="accAccpBlacks">
    <div>
      <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="accAccpForm" form-type="search" related-table-name="accAccpTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="yu-xpersonal-info" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo"></yu-xform-item>
            <yu-xform-item label="客户经理编号" ctype="input" placeholder="客户经理编号" name="managerId"></yu-xform-item>
            <yu-xform-item label="生效状态" ctype="select" placeholder="生效状态" name="inureStatus" data-code="STD_ZB_YES_NO"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
        <yu-form-buttons align="left">
          <!-- 银票新增-->
          <yu-button @click="accAccpAdd" type="primary">新增</yu-button>
          <yu-button @click="onAccpUpdate" type="primary">修改</yu-button>
          <yu-button @click="onAccpDetail" type="primary">查看</yu-button>
          <yu-button @click="onAccpDelete" type="primary">删除</yu-button>
          <!--<yufp-excel-import :import-url="excelImportUrl" title="上传" max-file-size="10" @import-success="doAutoQuery" type="primary"></yufp-excel-import>
          <yufp-excel-export :export-url="excelExportUrl" title="导出" :export-param="searchFormdata" type="primary"></yufp-excel-export>
          <yufp-excel-export :export-url="exportTemplateUrl" title="模板下载" type="primary"></yufp-excel-export>-->
        </yu-form-buttons>
        <yu-xtable ref="accAccpTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{condition: {'bizType':'0'}}" request-type="post" :default-load="true"
          :utrace="utrace"
          u-pk-value="asplwhtls_form"
          trace-server-name="/yusp-app-oca"
          ukey-field="pkId"
          :utrace-usr-id="userId"
          :utrace-org-id="orgId"
          :utrace-menu-id="menuId"
          trace-get-interface="/api/utrace/listByPk"
          trace-get-list-interface="/api/utrace/listPage"
          trace-save-interface="/api/utrace/save">
          <yu-xtable-column label="主键" prop="pkId" hide-column utrace></yu-xtable-column>
          <yu-xtable-column label="业务流水号" prop="serno" ></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" utrace></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" utrace></yu-xtable-column>
          <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_ASPL_BALCKS_TYPE" utrace></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" utrace></yu-xtable-column>
          <yu-xtable-column label="客户经理编号" prop="managerId"  utrace></yu-xtable-column>
          <yu-xtable-column label="客户经理名称" prop="managerIdName"  utrace></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="生效状态" prop="inureStatus" data-code="STD_ZB_YES_NO" utrace></yu-xtable-column>
          <yu-xtable-column label="原因描述" prop="resn" utrace hide-column></yu-xtable-column>
          <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
          <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
          <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
          <yu-xtable-column label="主管客户经理" prop="managerId" hide-column></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrId" hide-column></yu-xtable-column>
          <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        </yu-xtable>
    </div>
  </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import { sessionStore } from 'xy-utils';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_ZB_ASPL_BALCKS_TYPE');
export default {
  components: {YufpDemoSelector, YufpExcelExport, YufpExcelImport},
  mixins: [mixinList],
  props: {

  },
  data () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      activeName: 'accLoanBlacks',
      utrace: true,
      // formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'asplwhtlslisttable',
      dataUrl: this.$backend.cmisBiz + '/api/asplblacks/selectbymodel',
      baseParams: {sort: 'inputDate desc', condition: {oprType: '01'}},
      exportTemplateUrl: backend.cmisBiz + '/api/asplwhtls/exportasplwhtlsmodel',
      excelImportUrl: backend.cmisBiz + '/api/asplwhtls/importasplwhtls',
      excelExportUrl: backend.cmisBiz + '/api/asplwhtls/exportasplwhtls',
      dialogVisibleGuide: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      formdata:{},
      addbizType:''
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
    accLoanAdd () {
      let _this = this;
      _this.addbizType = '1';
      _this.dialogVisibleGuide = true;
      // _this.$refs.refForm.resetFields();
    },
    // 新增申请
    accAccpAdd () {
      let _this = this;
      _this.addbizType = '0';
      _this.dialogVisibleGuide = true;
      // _this.$refs.refForm.resetFields();
    },
    /**
     * 取消按钮
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },
    nextFn () {
      let _this = this;
      let validate;
      // 校验必输
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      } 
      let jsoPar = {};
      yufp.clone(_this.formdata, jsoPar);
      // 校验拦截名单是否已经存在
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/asplblacks/checkBlacks',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          if(response.data.recode == '0000'){
            // _this.$message({ message: response.data.msg, type: 'success' });
            _this.cancelFn();
            _this.$dialog.open(
            '资产池客户拦截名单新增界面',
            'cfgmanage/cfgAspl/cfgAsplBlack/AsplBlackAddIndex',
            1000,
            650,
            jsoPar,
            () => {
              this.$refs.accAccpTable.remoteData();
              this.$refs.accLoanTable.remoteData();
            });
          }else{
            _this.$message({ message: response.data.msg, type: 'warning' });
          }
        },
        error: (result, b) => {
          _this.$message({ message: result.data.msg, type: 'warning' });      
        }
      });         
    },
    // 修改
    onLoanUpdate () {
      let _this = this;
      debugger
      let selections = _this.$refs.accLoanTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      selections[0].op = 'EDIT';
      _this.$dialog.open(
        '资产池客户拦截名单修改界面',
        'cfgmanage/cfgAspl/cfgAsplBlack/AsplBlackUpdateIndex',
        1000,
        650,
        selections[0],
        () => {
          _this.$refs.accLoanTable.remoteData();
        }
      );
    },
    // 修改
    onAccpUpdate () {
      let _this = this;
      let selections = _this.$refs.accAccpTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      selections[0].op = 'EDIT';
      _this.$dialog.open(
        '资产池客户拦截名单修改界面',
        'cfgmanage/cfgAspl/cfgAsplBlack/AsplBlackUpdateIndex',
        1000,
        650,
        selections[0],
        () => {
          _this.$refs.accAccpTable.remoteData();
        }
      );
    },
    // 查看
    onLoanDetail () {
      let _this = this;
      let selections = _this.$refs.accLoanTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      selections[0].op = 'VIEW';
      _this.$dialog.open(
        '承兑行名单详情界面',
        'cfgmanage/cfgAspl/cfgAsplBlack/AsplBlackUpdateIndex',
        1000,
        650,
        selections[0],
        () => {
          _this.$refs.accLoanTable.remoteData();
        }
      );
    },
    // 查看
    onAccpDetail () {
      let _this = this;
      let selections = _this.$refs.accAccpTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      selections[0].op = 'VIEW';
      _this.$dialog.open(
        '承兑行名单详情界面',
        'cfgmanage/cfgAspl/cfgAsplBlack/AsplBlackUpdateIndex',
        1000,
        650,
        selections[0],
        () => {
          _this.$refs.accAccpTable.remoteData();
        }
      );
    },
    // 删除
    onAccpDelete () {
      let _this = this;
      let selections = _this.$refs.accAccpTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let serno = selections[0].serno;
      // 请求参数
      _this.deleteBySerno(serno);
    },
    // 删除
    onLoanDelete () {
      let _this = this;
      let selections = _this.$refs.accLoanTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let serno = selections[0].serno;
      _this.deleteBySerno(serno);
    },
    deleteBySerno (serno) {
      let _this = this;
      // 请求参数
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/asplblacks/deleteBySerno' + serno,
        data: {},
        success: (response, status, xhr) => {
          if(response.data.recode == '0000'){
            _this.$message({ message: response.data.msg, type: 'success' });
            _this.cancel();
          }else{
            _this.$message({ message: response.data.msg, type: 'warning' });
            _this.cancel();
          }
        },
        error: (result, b) => {
          _this.$message({ message: result.data.msg, type: 'warning' });      
        }
      });
    },
    /**
     * 参照公共的确认事件
    */
    commonSelectFn (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
  },
  
};
</script>
