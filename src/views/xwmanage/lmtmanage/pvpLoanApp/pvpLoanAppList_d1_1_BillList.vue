<template>
  <div>
    <yu-panel title="放款申请列表信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="pvpSerno" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="审批状态 " ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态 " name="approveStatus" value="000" ></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" fuzzy-query="both" v-if="show"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both" v-if="show"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>

        </yu-button-drop>
      </template>
       <yu-button ref="btn_doAdd" @click="customClick('doAdd')" type="primary" v-if="checkCtrl('doAdd')">新增</yu-button>
        <!--  <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>  -->
          <yu-button ref="btn_update" @click="update" type="primary" v-if="checkCtrl('update')">修改</yu-button>

          <yu-button ref="btn_doDelete" @click="customClick('doDelete')" type="primary" v-if="checkCtrl('doDelete')">删除</yu-button>
            <yu-button ref="btn_lookdate" @click="lookdate" type="primary" v-if="checkCtrl('lookdate')">查看</yu-button>
        <!--   <yu-button ref="btn_doViews" @click="customClick('doViews')">查看</yu-button>  -->
          <yu-button ref="btn_loanAppOut" @click="customClick('loanAppOut')" type="primary" v-if="checkCtrl('loanAppOut')">借据打印</yu-button>
              <yu-button ref="btn_loanAppPrintOut" @click="loanAppPrintOutDg" type="primary" v-if="checkCtrl('loanAppPrintOutDg')">额度支用申请书打印</yu-button>
      <yu-xtable ref="refTable"  row-number condition-key="condition" :base-params="baseParams" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务编号" prop="pvpSerno" width="180"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="200"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="本次出账金额" prop="pvpAmt"></yu-xtable-column>
        <yu-xtable-column label="借据起始日期" prop="loanStartDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="借据到期日期" prop="loanEndDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="借据签订日期" prop="" v-if="show" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请期限" prop="approveTerm" v-if="show"></yu-xtable-column>
         <yu-xtable-column label="登记人" prop="updIdName" v-if="show"></yu-xtable-column>
         <yu-xtable-column label="责任人" prop="managerId" v-if="show"></yu-xtable-column>
         <yu-xtable-column label="责任人" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="inputIdName" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="审批状态 " prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
         <yu-xtable-column label="进件渠道" prop="chnlSour" data-code="STD_APP_CHNL"></yu-xtable-column>
         <yu-xtable-column label="贷款形式" prop="loanModal"  data-code="STD_LOAN_MODAL"></yu-xtable-column>
      </yu-xtable>
      <yu-dialog title="额度支用申请书打印方式选取" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-button-drop show-length="3">
          <yu-button :hidden="role" @click="customClick('loanAppPrintOut')">不带电子章</yu-button>
          <yu-button @click="customClick('loanAppPrintOut')">电子骑缝章</yu-button>
          <yu-button @click="customClick('loanAppPrintOut')">银行电子公章</yu-button>
        </yu-button-drop>
      </yu-dialog>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './pvpLoanAppList_dialog_BillCard';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_ZB_APPR_STATUS,STD_DATA_SOUR,BELG_TEAM,STD_CONT_STATUS,STD_APP_CHNL,STD_LOAN_MODAL');
export default{
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    let roleyc = true;
    let userInfo = this.$xutils.getLoginUserInfo();
    let dutylist = userInfo.dutys;
    for (let i = 0; i < dutylist.length; i++) {
      if (dutylist[i].code == 'XWB13') {
        roleyc = false;
      }
    }
    return {
      pkField: 'pvpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      dialogTableVisible: false,
      formType: 'ADD',
      role: roleyc,
      dataUrl: this.$backend.cmisBiz + '/api/pvploanapp/selectDataByModel',
      baseParams: {condition: {whData: '000,992', oprType: '01', belgLine: '01'}, sort: 'createTime desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/pvploanapp/delete/'
    };
  },
  //
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  mounted () {
    // this.afterInit();
  },
  methods: {
    /** 额度支用申请书打印窗口显示
     */
    loanAppPrintOutDg () {
      var _this = this;
      if (!this.$refs.refTable.selections.length == 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      } else {
        _this.dialogTableVisible = true;
      }
    },
    update () {
      if (!this.$refs.refTable.selections.length == 1) {
        this.$message({message: '请选择一条数据'});
      }
      var userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      var data = this.$refs.refTable.selections[0];
      let flg = this.getRole(userInfo.roles);
      if ((data.approveStatus != '000' && data.approveStatus != '992') || (data.managerId != this.$store.state.oauth.loginCode && !flg)) {
        this.$message({message: '只能修改审批状态为待发起或退回且责任人是自己的放款'});
        return;
      }
      data.PageType = 'UPDATE';
      data.imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ';
      data.docid = '';
      var docid = '';
      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + data.contNo,
        callback: function (code, message, response) {
          docid = response.data;
          if (docid != null) {
            data.imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ;CMSYPYX';
            data.docid = docid;
          }
        }
      });
      this.nextPage(data);
    },

    // 遍历岗位
    getRole (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].code == 'R1016' || list[i].code == 'R1062') {
          return true;
        }
      }
      return false;
    },
    lookdate () {
      if (!this.$refs.refTable.selections.length == 1) {
        this.$message({message: '请选择一条数据'});
      }
      var data = this.$refs.refTable.selections[0];
      data.PageType = 'LOOK';
      data.imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ';
      data.docid = '';
      var docid = '';

      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + data.contNo,
        callback: function (code, message, response) {
          docid = response.data;
          if (docid != null) {
            data.imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ;CMSYPYX';
          }
        }
      });
      this.nextPage(data);
    },

    nextPage (data) {
      data['op'] = 'VIEW';
      data['model_group_no'] = 'CMG000418';
      data['serno'] = data.pvpSerno;
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: 'fksq' + new Date().getTime(),
        title: data.pvpSerno,
        data: data
      });
    }
  }
};
</script>
