<template>
  <div>
    <yu-panel title="保证人信息台账" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable"  :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="保证人编号" ctype="input" placeholder="保证人编号" fuzzy-query="both" name="guarantyId"></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarantyIdNew"></yu-xform-item>
          <yu-xform-item label="保证人名称" ctype="input" placeholder="保证人名称" fuzzy-query="both" name="assureName"></yu-xform-item>
          <yu-xform-item label="保证人证件类型" ctype="select" placeholder="保证人证件类型" name="cerType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="保证方式 " ctype="select" placeholder="保证方式" name="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_viewDetail" @click="add">新增</yu-button>
          <yu-button ref="btn_viewDetail" @click="edit">修改</yu-button>
          <yu-button ref="btn_viewDetail" @click="deleteFn">删除</yu-button>
          <yu-button ref="btn_viewDetail" @click="info">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="searchData" request-type="POST" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="保证人编号" prop="guarantyId" width="200"></yu-xtable-column>
        <yu-xtable-column label="押品统一编号" prop="guarantyIdNew"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证方式 " prop="guaranteeType"  data-code="STD_ZB_GUARANTEE_TY" width="120"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型 " prop="cerType" data-code="STD_ZB_CERT_TYP" width="140"></yu-xtable-column>
        <yu-xtable-column label="保证人类型" prop="cusTyp" data-code="STD_ASSURE_CUS_TYPE" width="120"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode" width="140"></yu-xtable-column>
        <!--<yu-xtable-column label="保证开始日期" prop="grtStartDate" width="140"></yu-xtable-column>-->
        <yu-xtable-column label="担保金额" prop="guarAmt" :formatter="Currency" width="140"></yu-xtable-column>
        <!--<yu-xtable-column label="押品所在业务阶段" prop="guarBusistate"></yu-xtable-column>
        <yu-xtable-column label="保证结束日期" prop="grtEndDate"></yu-xtable-column>-->
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ASSURE_CUS_TYPE,STD_ZB_GUARANTEE_TY');
// import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
export default{
  name: 'D1BillList',
  mixins: [mixin],
  data: function () {
    return {
      searchData: {condition: {
        // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        // approveStatus: '000,992',
        oprType: '01'
      }},
      searchFormdata: {},
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/queryList',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/',
      serno: ''
    };
  },
  created () {
    this.serno = this.$xutils.getDefaultformulaData('SEQ:YPSEQ');
  },
  methods: {
    add () {
      // 获取登入信息
    //   const loginUserInfo = this.$xutils.getLoginUserInfo();
      const dataParams = {
        op: 'ADD',
        serno: this.serno,
        oprType: '01',
        GuarWay: 'BZ',
        grtFlag: '03',
        callMethod: 'tGuarExistQry',
        managerBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode'),
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        SystemNo: '01'
      };
      const url = this.getGuarSysUrl(dataParams);
      window.open(url, '_black');
    },
    edit () {
      let params = this.$refs.refTable.selections;
      if (!params || params.length === 0) {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      // if (!params.approveStatus || params.approveStatus != '000') {
      //   this.$xutils.showMsgBox('提示', '只有待发起状态的才能修改!', 350, 150);
      //   return;
      // }
      const dataParams = {
        op: 'edit',
        grtFlag: '03',
        GuarWay: 'BZ',
        callMethod: 'tGuarUpdate',
        managerBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode'),
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        SystemNo: '01'
      };
      this.$utils.clone(params[0], dataParams);
      dataParams['guarNo'] = dataParams.guarantyId;
      const url = this.getGuarSysUrl(dataParams);
      window.open(url, '_black');
    },
    deleteFn () {

    },
    info () {
      let params = this.$refs.refTable.selections;
      if (!params || params.length === 0) {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      const dataParams = {
        op: 'view',
        grtFlag: '03',
        GuarWay: 'BZ',
        callMethod: 'tGuarDetailInfo',
        managerBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode'),
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        SystemNo: '01'
      };
      this.$utils.clone(params[0], dataParams);
      dataParams['guarNo'] = dataParams.guarantyId;
      const url = this.getGuarSysUrl(dataParams);
      window.open(url, '_black');
    },
    /*
      获取跳转押品系统url
       */
    getGuarSysUrl (params) {
      const rsPars = {};
      this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    }
  }
};
</script>