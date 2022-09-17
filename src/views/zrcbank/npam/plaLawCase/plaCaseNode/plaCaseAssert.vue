<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-button-drop v-if="viewPage">
        <yu-button type="primary" @click="importFn" v-if="viewType == 'EDIT'">引入</yu-button>
        <yu-button type="primary" @click="saveAssertFn" v-if="viewType == 'EDIT'">保存</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="viewType == 'EDIT'">删除</yu-button>
        <yu-button type="primary" @click="infoFn">查看（押品系统）</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" selection-type="radio" condition-key="condition" :base-params="baseParam" requestType="POST">
        <yu-xtable-column align="center" label="押品编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="押品类型" prop="guarType" data-code="STD_GRT_FLAG"></yu-xtable-column>
        <yu-xtable-column align="center" label="权属人" prop="autho"></yu-xtable-column>
        <yu-xtable-column align="center" label="评估价值" prop="evalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全起始日期" prop="presStartDate" ctype="datepicker"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全到期日期" prop="presEndDate" ctype="datepicker"></yu-xtable-column>
        <yu-xtable-column align="center" label="我行保全情况" prop="bankPresCase" ctype="select" data-code="STD_BANK_PRES_CASE"></yu-xtable-column>
        <yu-xtable-column align="center" label="其他保全情况" prop="otherPresCase" ctype="input"></yu-xtable-column>
      </yu-xtable>

      <yu-xdialog title="抵（质）押物信息登记" :visible.sync="authDialogVisible" class="control-dialog">
        <yu-xtable :data-url="assertUrl" selection-type="radio" ref="refTableAssert" :base-params="assertParam" requestType="POST" :row-number="true" :pageable="true" :default-load="true" condition-key="condition">
          <yu-xtable-column label="押品统一编号" prop="guarNo" width="150"></yu-xtable-column>
          <yu-xtable-column label="担保分类名称" prop="guarTypeCd" width="200"></yu-xtable-column>
          <yu-xtable-column label="押品所有人编号" prop="guarCusId" width="120"></yu-xtable-column>
          <yu-xtable-column label="押品所有人名称" prop="guarCusName"></yu-xtable-column>
          <yu-xtable-column label="押品所有人证件类型" prop="guarCertType" width="150" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="押品所有人证件号码" prop="guarCertCode" width="150"></yu-xtable-column>
          <yu-xtable-column label="我行认定价值" prop="evalAmt" width="150"></yu-xtable-column>
          <yu-xtable-column label="确认价值币种" prop="evalCurrency" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="押品所在业务阶段" prop="guarBusistate" data-code="STD_ZB_GUAR_BUSISTATE"></yu-xtable-column>
        </yu-xtable>
        <div slot="footer" class="dialog-footer">
          <yu-button type="primary" @click="saveFn" v-if="viewType == 'EDIT'">保存</yu-button>
          <yu-button @click="cancelfn">取消</yu-button>
        </div>
      </yu-xdialog>
    </div>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
import mixinForm from '@/utils/mixins/mixin-form';
// 注册字典项
yufp.lookup.reg('STD_BANK_PRES_CASE,STD_GUAR_TYPE,STD_GRT_FLAG');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm, mixin],
  props: {
    cusCorp: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: backend.cmisNpam + '/api/plalawpresassetinfo/queryPlaLawPresAssetInfo',
      // TODO 查询押品的接口
      assertUrl: backend.cmisBiz + '/api/guarbaseinfo/selectBaseInfoByGuarNo',
      baseParam: '',
      assertParam: '',
      viewPage: true,
      viewType: 'EDIT',
      authDialogVisible: false,
      contNos: []
    };
  },
  created () {
    var _this = this;
    // _this.baseParam = { condition: JSON.stringify({ caseSerno: _this.$route.meta.params.caseSerno}) };
    if (_this.cusCorp) {
      _this.baseParam = { condition: JSON.stringify({ caseSerno: _this.cusCorp.contNo, isOtherPresAsset: '1' }) };
      _this.assertParam = { condition: JSON.stringify({ caseSerno: _this.cusCorp.contNo }) };
      _this.viewType = _this.cusCorp.viewType;
      if (_this.viewType == 'DETAIL') {
        _this.viewPage = false;
      }
    }
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit;
    }
  },

  methods: {
    cancelfn () {
      this.authDialogVisible = false;
    },
    importFn () {
      let _this = this;
      // 获取合同编号
      _this.contNos = [];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawcasebillrel/queryByPlaLawCaseBillRel',
        data: { condition: JSON.stringify({ cusId: _this.$route.meta.params.cusId}) },
        callback: function (code, message, response) {
          if (response.code == 0) {
            response.data.forEach(item => {
              _this.contNos.push(item.contNo);
              _this.assertParam = { condition: { contNos: _this.contNos} };
              _this.authDialogVisible = true;
            });
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
      // _this.assertParam = { condition: { cusId: _this.cusCorp.cusId } };
    },
    deleteFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var url;
      url = backend.cmisNpam + '/api/plalawpresassetinfo/delete/' + selectionsAry[0].plpaiSerno;
      yufp.service.request({
        method: 'POST',
        url: url,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /*
      查看（押品系统）
     */
    infoFn () {
      var _this = this;
      debugger;
      if (!_this.$refs.refTable.selections[0]) {
        _this.$message.warning('请选择1条记录');
        return;
      }
      var dataNo = _this.$refs.refTable.selections[0].guarNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/guarbaseinfo/all',
        data: { condition: JSON.stringify({ guarNo: dataNo}) },
        callback: function (code, message, response) {
          if (response.code == '0') {
            let params = response.data[0];

            // 获取登入信息
            const loginUserInfo = _this.$xutils.getLoginUserInfo();
            loginUserInfo.roles.forEach(function (_item, _index) {
              params['SystemNo'] = '01';
              // 如果是小微客户经理
              // SystemNo 请求的系统标识 01-信贷系统  02-小贷系统
              if (_item.code == 'R0010' || _item.code == 'R0030') {
                params['SystemNo'] = '02';
              }
            });
            params['callMethod'] = 'tGuarDetailInfo';
            params.managerBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
            params.managerId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
            _this.goToYpSys(params);
          }
        }
      });
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
    },
    /** 跳转押品系统 */
    goToYpSys (paramDats) {
      paramDats.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      paramDats.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      const url = this.getGuarSysUrl(paramDats);
      window.open(url, '_blank');
    },

    /*
     保存
     */
    saveAssertFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.getEditRows();
      var url;
      url = backend.cmisNpam + '/api/plalawpresassetinfo/batchInsert';
      var model = selectionsAry;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.authDialogVisible = false;
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    saveFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableAssert.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var url;
      url = backend.cmisNpam + '/api/plalawpresassetinfo/batchInsert';
      var lawGuarRels = [];
      selectionsAry.forEach(function (item) {
        item.caseSerno = _this.cusCorp.caseSerno;
        item.isOtherPresAsset = '1';
        item.autho = item.guarCusName;
        item.guarType = item.grtFlag;
        lawGuarRels.push(item);
      });
      yufp.service.request({
        method: 'POST',
        url: url,
        data: lawGuarRels,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.authDialogVisible = false;
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
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
