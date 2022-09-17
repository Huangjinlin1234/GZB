<template>
  <div>
    <yu-panel title="保证担保信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_insert" @click="add" v-if="pageParams.isUnderLmt === '0'">新增</yu-button>
          <yu-button ref="btn_importGuarantee" @click="customClick('importGuarantee')" v-if="pageParams.isUnderLmt === '1'">引入</yu-button>
          <yu-button ref="btn_update" @click="edit">修改</yu-button>
          <yu-button ref="btn_check" @click="info">查看</yu-button>
          <yu-button @click="freshList">刷新</yu-button>
          <yu-button ref="btn_offImport" @click="customClick('offImport')">取消引入</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" :pageable="true" :data-url="dataUrl" default-load="fasle">
        <yu-xtable-column label="保证流水号" prop="guarantyId" hide-column></yu-xtable-column>
        <yu-xtable-column label="押品统一编号" prop="guarantyIdNew"></yu-xtable-column>
        <yu-xtable-column label="保证担保形式" prop="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xtable-column>
        <yu-xtable-column label="保证人客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型" prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="担保金额(元)" prop="guarAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUARANTEE_TY,STD_ZB_CERT_TYP');
export default{
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String,
    guarContNo: String
  },
  data: function () {
    return {
      pkField: 'guarantyId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/selectGuarGuaranteeByGuarContNo',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/'
    };
  },

  created () {
    var _this = this;
    if (_this.getFactory().contextData) {
      this.guarContNo = _this.getFactory().contextData.guarContNo;
    } else if (_this.pageParams) {
      this.guarContNo = _this.pageParams.guarContNo;
    }
    _this.baseParams = {
      condition: { serno: this.guarContNo }
    };
  },

  methods: {
    add () {
      var serno = '';
      if (this.contNoSerno) {
        serno = this.contNoSerno;
      } else {
        serno = this.pageParams.guarContNo;
      }

      const dataParams = {
        op: 'ADD',
        serno: serno,
        oprType: '01',
        guarWay: 'BZ',
        grtFlag: '03',
        callMethod: 'tGuarExistQry',
        managerBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode'),
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        systemNo: '01',
        borrowNo: this.pageParams.cusId
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
        GuarWay: 'BZ',
        callMethod: 'tGuarUpdate',
        SystemNo: '01'
      };
      this.$utils.clone(params[0], dataParams);
      dataParams['guarNo'] = dataParams.guarantyIdNew;

      var serno = '';
      if (this.contNoSerno) {
        serno = this.contNoSerno;
      } else if (this.baseParams.condition) {
        serno = this.baseParams.condition.serno;     
      } else {
        serno = this.pageParams.guarContNo;
      }

      dataParams['serno'] = serno;
      dataParams['managerBrId'] = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      dataParams['managerId'] = this.$xutils.getDefaultformulaData('$LoginLoginCode');
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
        op: 'edit',
        grtFlag: '03',
        GuarWay: 'BZ',
        callMethod: 'tGuarDetailInfo',
        SystemNo: '01'
      };
      this.$utils.clone(params[0], dataParams);
      dataParams['guarNo'] = dataParams.guarantyIdNew;
      var serno = '';
      if (this.contNoSerno) {
        serno = this.contNoSerno;
      } else if (this.baseParams.condition) {
        serno = this.baseParams.condition.guarContNo;     
      } else {
        serno = this.guarContNo;
      }

      dataParams['serno'] = serno;
      dataParams['managerBrId'] = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      dataParams['managerId'] = this.$xutils.getDefaultformulaData('$LoginLoginCode');
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
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl',
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
          this.$xutils.showMsgBox('提示', '错误代码：' + status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    },
    // 刷新列表数据
    freshList () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
