<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="base" >
        <yu-panel title="减免记账借据列表" :collapseHide="false" :hideFilter="false">
          <yu-button-drop>
            <yu-button type="primary" @click="addDebtFn" v-if="!flage">记账补发</yu-button>
            <yu-button type="primary" @click="deleteDebtFn">记账冲正</yu-button>
            <yu-button type="primary" @click="infoFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" row-number :data-url="urls.index" :base-params="params.baseBillParams" selection-type="radio" condition-key="condition" style="margin-top:10px" requestType="POST">
            <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免本金" prop="reducCapAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免欠息" prop="reducDebitInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免罚息" prop="reducPenalInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免复息" prop="reducCompoundInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免费用" prop="reducCostAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="减免记账申请信息" :collapseHide="false" :hideFilter="false">
          <yu-xform ref="refForm" v-model="formdata" label-width="150px">
            <yu-xform-group>
              <yu-xform-item label="业务编号" colspan="11" name="pdcrraiSerno" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" colspan="11" name="cusId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" colspan="11" name="cusName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="贷款总金额" colspan="11" name="loanAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="贷款总余额" colspan="11" name="loanBalance" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="拖欠总利息" colspan="11" name="totalTqlxAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免总额" colspan="11" name="reducTotlAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免本金合计" colspan="11" name="reducCapAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免欠息合计" colspan="11" name="reducDebitInt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免罚息合计" colspan="11" name="reducPenalInt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免复息合计" colspan="11" name="reducCompoundInt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免费用合计" colspan="11" name="reducCostAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="备注" colspan="22" name="memo" ctype="textarea" placeholder="备注" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="登记信息" :collapseHide="false" :hideFilter="false">
          <yu-xform ref="refForm1" v-model="basedata">
            <yu-xform-group>
              <yu-xform-item label="登记人" name="inputId" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <div style="text-align: center;">
          <yu-button-drop>
            <yu-button type="primary" @click="goBack">返回</yu-button>
          </yu-button-drop>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="forth">
          <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_RECORD_STATUS');
export default {
  components: { imageSystem },
  data: function () {
    return {
      formdata: {},
      basedata: {},
      pdcrraiSerno: '',
      activeName: 'base',
      image: '1',
      flage: false, // 是否展示记账补发
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ05',
          'index': {
            'businessid': this.$route.meta.params.pdcraiSerno,
            /** 客户名称 */
            custname: this.$route.meta.params.cusName,
            /** 客户号 */
            custid: this.$route.meta.params.cusId,
            /** 机构名称 */
            orgname: this.$route.meta.params.inputBrIdName
          }
        }
      ],
      urls: {
        index: backend.cmisNpam + '/api/pladebtclaimreducrecordbillrel/queryAll'
      },
      params: {
        baseBillParams: {condition: {pdcrraiSerno: this.$route.meta.params.pdcrraiSerno, recordStatus: '01,04'}}
      }
    };
  },
  created: function () {
    var _this = this;
    _this.flage = this.$route.meta.params.flage;
    if (_this.$route.meta.params.viewType == 'VIEW') {
      _this.image = '2';
    }
    _this.pdcrraiSerno = _this.$route.meta.params.pdcrraiSerno;
    let data = {};
    data.pdcrraiSerno = _this.pdcrraiSerno;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/showByPdcrraiSerno',
      data: data,
      callback: function (code, message, response) {
        if (response.code == 0) {
          yufp.clone(response.data, _this.formdata);
          yufp.clone(response.data, _this.basedata);
        } else {
          // _this.$message({ message: '操作失败：', type: 'error' });
          _this.$message.error(response.message);
        }
      }
    });
  },
  methods: {
    /* 借据修改成功后自动刷新的回调 */
    // returnFn(){
    //   this.$refs.refTable.remoteData()
    // },
    handleClick (tab) {
      if (tab.name == 'forth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    /* 查看 */
    infoFn (info) {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var params = selectionsAry[0];
      // params.returnFn = _this.returnFn;
      params.viewType = 'DETAIL';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/pladebtclaimreducbillrel/queryHXBill',
        data: params.billNo,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data) {
              _this.$dialog.open(
                '借据信息查看',
                'zrcbank/npam/plaDebtClaim/plaDebtClaimApp/plaDebtLoanDetail',
                900,
                850,
                params
              );
            } else {
              _this.$message.error(response.message);
            }
          }
        }
      });
    },
    /**
    记账补发
     */
    addDebtFn () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.refTable.selections[0];
      if (data.recordStatus != '04') {
        _this.$message({
          message: '记账失败的件才允许补发',
          type: 'warning'
        });
        return;
      }
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/sendtojzbf',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message.success('操作成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message.error('记账补发失败,原因:' + message);
          }
        }
      });
    },
    /**
    *记账冲正
     */
    deleteDebtFn () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.refTable.selections[0];
      if (data.recordStatus != '03') {
        _this.$message({
          message: '记账成功的件才允许冲正',
          type: 'warning'
        });
        return;
      }
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/pladebtclaimreducrecordbillrel/czcl',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message.success('操作成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    },
    /**
    * 返回
    */
    goBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
