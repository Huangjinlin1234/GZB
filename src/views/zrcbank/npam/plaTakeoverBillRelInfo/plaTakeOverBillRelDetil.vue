<template>
  <div>
    <yu-pane label="借据信息" :hideFilter="false" :collapseHide="false">
        <yu-button-drop>
          <yu-button type="primary" @click="change">变更代理</yu-button>
          <yu-button type="primary" @click="changeHis">变更历史</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTableCont" condition-key="condition" style="margin-top:10px" row-number :data-url="url.dataContNoUrl" :base-params="baseContParams" selection-type="checkbox" requestType="POST">
          <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="起始日期" prop="loanStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
          <yu-xtable-column align="center" label="到期日期" prop="loanEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
          <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
          <yu-xtable-column align="center" label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column align="center" label="责任人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="责任机构" prop="inputBrIdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="是否转让代理" prop="isTransAgcyAsset" data-code="STD_ZB_YES_NO" ctype="select" :disabled="isDisabled"></yu-xtable-column>
          <yu-xtable-column align="center" label="变更日期" prop="modifyDate"></yu-xtable-column>
          <yu-xtable-column align="center" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
          <!--<yu-xtable-column align="center" label="变更状态" prop="changeStatus" data-code="STD_CHANGE_STATUS"></yu-xtable-column> -->
        </yu-xtable>
    </yu-pane>
    <div style="text-align:center">
      <yu-button type="primary" @click="doBack">返回</yu-button>
    </div>
  <yu-xdialog title="变更历史列表" :visible.sync="dialogVisible" width="1450px">
    <yu-xtable ref="refTableContHis" condition-key="condition" row-number :data-url="url.dataContNoUrlHis" :base-params="baseContParamsHis"  requestType="POST">
       <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
       <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
       <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
       <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
       <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
       <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
       <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
       <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
       <yu-xtable-column align="center" label="起始日期" prop="loanStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
       <yu-xtable-column align="center" label="到期日期" prop="loanEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
       <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
       <yu-xtable-column align="center" label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
       <yu-xtable-column align="center" label="责任人" prop="inputIdName"></yu-xtable-column>
       <yu-xtable-column align="center" label="责任机构" prop="inputBrIdName"></yu-xtable-column>
       <yu-xtable-column align="center" label="是否转让代理" prop="isTransAgcyAsset" data-code="STD_ZB_YES_NO" ctype="select"></yu-xtable-column>
       <yu-xtable-column align="center" label="变更日期" prop="modifyDate"></yu-xtable-column>
       <yu-xtable-column align="center" label="变更状态" prop="changeStatus" data-code="STD_CHANGE_STATUS"></yu-xtable-column>
    </yu-xtable>
    <div style="text-align:center">
     <yu-button type="primary" @click="back" >返回</yu-button>
    </div>
  </yu-xdialog>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
// 获取仓库数据
yufp.lookup.reg('STD_FIVE_CLASS,STD_CHANGE_STATUS,STD_ZB_YES_NO,STD_RECORD_STATUS');
import { mapState } from 'vuex';
export default {
  mixins: [mixin],
  data: function () {
    return {
      isDisabled: false, // 判断是否是单户转让类型
      baseParams: {condition: JSON.stringify({ ptaiSerno: this.$route.meta.params.ptaiSerno})},
      url: {
        dataContNoUrl: backend.cmisNpam + '/api/platakeoverbillrel/queryAll',
        dataContNoUrlHis: backend.cmisNpam + '/api/platakeoverbillrelhis/queryPlaTakeoverBillelHis'
      },
      baseContParams: {
        condition: {ptaiSerno: this.$route.meta.params.ptaiSerno, isTransAgcyAsset: '1'}
      },
      baseContParamsHis: {},
      activeName: 'base',
      dialogVisible: false,
      viewType: ''
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  created () {
    if (this.$route.meta.params.transferType == '01') {
      this.isDisabled = true;
    }
  },
  methods: {
    /*
    变更历史
    */
    changeHis () {
      var _this = this;
      if (!_this.$refs.refTableCont.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      if (_this.$refs.refTableCont.selections.length > 1) {
        _this.$message({message: '一次只能选择一条数据', type: 'warning'});
        return;
      }
      var selects = _this.$refs.refTableCont.selections;
      this.baseContParamsHis = {
        condition: {ptaiSerno: this.$route.meta.params.ptaiSerno, billNo: this.$refs.refTableCont.selections[0].billNo}
      };
      this.dialogVisible = true;
    },
    back () {
      this.dialogVisible = false;
    },
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
     * 变更代理
     */
    change: function () {
      var _this = this;
      if (!_this.$refs.refTableCont.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 选中的数据
      var arr = [];
      var selects = _this.$refs.refTableCont.selections;
      // if(selects.length && selects[0].isTransAgcyAsset == '0'){
      //   return this.$message.warning('转让类型为单户转让的，不允许变更代理')
      // }
      if (this.$route.meta.params.transferType == '01') {
        return this.$message.warning('转让类型为单户转让的，不允许变更代理');
      }
      selects.forEach(item => {
        item = {
          contNo: item.contNo,
          billNo: item.billNo,
          cusId: item.cusId,
          cusName: item.cusName,
          prdName: item.prdName,
          curType: item.curType,
          guarMode: item.guarMode,
          packageAmt: item.packageAmt,
          takeoverPrice: item.takeoverPrice,
          loanAmt: item.loanAmt,
          loanBalance: item.loanBalance,
          totalTqlxAmt: item.totalTqlxAmt,
          loanStartDate: item.loanStartDate,
          loanEndDate: item.loanEndDate,
          execRateYear: item.execRateYear,
          changeStatus: item.changeStatus,
          isTransAgcyAsset: item.isTransAgcyAsset,
          fiveClass: item.fiveClass,
          ptaiSerno: this.$route.meta.params.ptaiSerno,
          regiStatus: item.regiStatus,
          recordStatus: item.recordStatus,
          ptbrSerno: item.ptbrSerno
        };
        arr.push(item);
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/platakeoverbillrel/sendtohxbgdl',
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTableCont.remoteData();
            _this.$message.success('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    }
  }
};
</script>
