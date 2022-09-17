<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="担保变更签订" name="first">
        <yu-panel title="普通查询" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="担保变更类型" placeholder="担保变更类型" name="guarChgType" ctype="select" data-code="STD_GUAR_CHG_TYPE"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <template panel-type="simple">
            <yu-button-drop style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('export')" @click="printFn">打印</yu-button>
              <yu-button type="primary" v-if="checkCtrl('sign')" @click="signFn(true)">担保合同签订</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="signFn(false)">详情</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable" selection-type="radio" request-type="POST" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="{ condition: { approveStatus: '997', contapply: 'Y' } ,'sort':'inputDate desc'}">
            <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="担保变更类型" prop="guarChgType" data-code="STD_GUAR_CHG_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="contApproveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="担保变更签订历史" name="sec">
        <yu-panel title="普通查询" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable1" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
                <yu-xform-item label="担保变更类型" placeholder="担保变更类型" name="guarChgType" ctype="select" data-code="STD_GUAR_CHG_TYPE"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-button-drop>
            <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFn1">详情</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1" selection-type="radio" request-type="POST" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="{ condition: { approveStatus: '997', conthistory: 'Y' } ,'sort':'inputDate desc'}">
            <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="担保变更类型" prop="guarChgType" data-code="STD_GUAR_CHG_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="contApproveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */

yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_GUAR_CHG_TYPE');
export default {
  data: function () {
    return {
      searchFormdata: {},
      activeName: 'first',
      dataUrl: `${backend.cmisBiz}/api/iqpguarchgapp/`
    };
  },
  methods: {
    // 打印
    printFn () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      var contPageType = ''; // 合同版面标识
      var isESeal = '0'; // 是否电子用印
      var prdId = '';
      contPageType = '1';

      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.iqpSerno
      };
      console.log(printData);

      //获取产品编号
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/ctrloancont/showdetial',
        data: {contNo:params.contNo},
        callback: function (code, message, response) {
          console.log(response.data);
          prdId = response.data.prdId;
        }
      });
      //本次新增担保合同
      var newGuarCont = [];
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/iqpguarchgapprel/cont',
        data: {condition: JSON.stringify({ serno: params.iqpSerno, opFlag: '02'})},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            let guarData = response.data;
            for (let i = 0; i < guarData.length; i++) {
              var guarContNo = guarData[i].guarContNo;
              newGuarCont.push(guarContNo);
            }
            console.log(newGuarCont);
          }
        }
      });
      // // 借款合同
      // var params1 = {
      //   contNo: params.contNo, // 合同编号
      //   serno: params.serno, // 流水号
      //   contType: '1',
      //   suitContType: params.contType, // 适用合同类型
      //   suitPrd: prdId, // 适用产品
      //   isESeal: isESeal, // 是否电子用印
      //   contPageType: contPageType, // 合同版面标识
      //   isDzpj: '', // 是否电子票据
      //   matchFlag: '' // 特定匹配标识
      // };
      // console.log(params1);
      paramList.push(printData);
      // paramList.push(params1);
      var contList = [];
      contList.push(params.contNo);
      // 担保合同
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByContNohtdy',
        data: JSON.stringify(contList),
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            let guarData = response.data;
            for (let i = 0; i < guarData.length; i++) {
              var itemNo = guarData[i].guarContNo;
              if(newGuarCont.indexOf(itemNo) >= 0){
                let param2 = {};
                param2.contNo = params.contNo; // 借款合同号
                param2.serno = params.serno; // 借款合同流水号
                param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
                param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
                param2.contType = '2';
                param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
                param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
                param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
                param2.pldContType = guarData[i].pldContType; // 质押合同类型
                param2.isESeal = isESeal; // 是否电子用印
                param2.contPageType = contPageType; // 合同版面标识
                param2.matchFlag = ''; // 特定匹配标识
                paramList.push(param2);
              }

            }
          }
        }
      });
      console.log(paramList);
      this.$dialog.open(
        '合同打印',
        'printManage/index',
        800,
        500,
        paramList,
        null,
        true,
        true
      );
    },
    print () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var params = _this.$refs.refTable.selections[0];;
      console.log(params);
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpf';
      params.src = _this.$backend.frptRptService + 'buchong-1.cpt&type=2&serno=' + params.iqpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '担保变更签订',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    /** 签订 */
    signFn (flag) {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if(flag){
        var contApproveStatus = _this.$refs.refTable.selections[0].contApproveStatus;
        if(contApproveStatus != '000' && contApproveStatus != '992'){
          _this.$message({
          message: '该条记录不是待发起或打回状态，无法签订！',
          type: 'warning'
        });
        return;
        }
      }

      let viewType = flag ? 'EDIT' : 'VIEW';
      let serno = _this.$refs.refTable.selections[0].iqpSerno;
      let name = 'zrcbank/biz/bizchg/iqpGuarChgAppList/iqpGuarChgAppDetails/iqpGuarChgAppSignDetails';
      let key = 'iqpGuarChgAppDetailsUpdate' + serno+ '_' + new Date().getTime();
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '担保合同签订',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: viewType,
          guarChgType: _this.$refs.refTable.selections[0].guarChgType,
          serno: serno,
          key: `/${name}/${key}`
        }
      });
    },
    /** 详情 */
    infoFn () {},
    /** 详情 */
    infoFn1 () {
      var _this = this;
      if (_this.$refs.refTable1.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let serno = _this.$refs.refTable1.selections[0].iqpSerno;
      let name = 'zrcbank/biz/bizchg/iqpGuarChgAppList/iqpGuarChgAppDetails/iqpGuarChgAppSignDetails';
      let key = 'iqpGuarChgAppDetailsUpdate' + serno+ '_' + new Date().getTime();
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '担保合同签订',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'VIEW',
          guarChgType: _this.$refs.refTable1.selections[0].guarChgType,
          serno: serno,
          key: `/${name}/${key}`
        }
      });
    }
  }
};
</script>
