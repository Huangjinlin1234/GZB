
<template>
  <!--
    @created by creazyCder 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @description 展期申请主表-增删改查
  -->
  <div>
    <yu-panel title="待签展期协议列表" panel-type="simple">
      <yu-xform related-table-name="refContTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('export')" @click="onPrint">合同打印</yu-button>
          <yu-button type="primary" v-if="checkCtrl('sign')" @click="signFn">签订</yu-button>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
          <yu-button type="primary" @click="printFn">展期协议打印</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refContTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams" condition-key="condition">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="contApproveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="展期协议状态" prop="status">
         <template slot-scope="scope">
            {{ setStatus(scope.row.status)  }}
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  components: {},
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontext/query',
      baseParams:{condition:JSON.stringify({
        accApply: '1'
      }),sort : 'inputDate desc'}
    };
  },
  methods: {
    /**
     * 打印 TODO
     */
    printFn: function () {
      var _this = this;
      var params = _this.$refs.refContTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var iqpSerno = params.iqpSerno;
      let name = 'xwmanage/iqpManage/contManage/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemojkzqxy' + iqpSerno;
      params.src = _this.$backend.frptRptService + 'jkzqxy.cpt&iqpSerno=' + iqpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '借款展期协议',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    // 打印
    onPrint () {
      var _this = this;
      var params = _this.$refs.refContTable.selections[0];
      // var contPrintNum = params.cont_print_num;
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var contPageType = '';// 合同版面标识
      var isESeal = '0';// 是否电子用印
      if (isESeal !== '0') {
        let managerId = params.managerId;
        const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
        let loginCode = userInfo.loginCode;
        if (managerId == loginCode) {
          contPageType = '2';
        } else {
          contPageType = '3';
        }
      } else {
        contPageType = '1';
      }
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
        data: {
            contNo: params.contNo
          },
        callback: function (code, message, response) {
          params.prdId = response.data.ctrLoanCont.prdId;
        }
      });
      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: params.contNo, // 合同编号
        serno: params.iqpSerno, // 流水号
        contType: '1',
        suitContType: params.contType, // 适用合同类型
        suitPrd: params.prdId, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: '' // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
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
              let param2 = {};
              param2.contNo = params.contNo; // 借款合同号
              param2.serno = params.iqpSerno; // 借款合同流水号
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
      });
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
    /**
     * 进入修改页面
     */
    jumpToEditPageFn: function (dataParam, op) {
      let params = yufp.clone(dataParam, {});
      params.op = op;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/bizchg/iqpContExtCont/iqpcontextContDetailMain', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_iqpContExtCont_' + op + '_' + dataParam.iqpSerno, // 必传
        // 页签名称
        title: '展期协议申请详情',
        // 传递的业务数据，可选配置
        data: params,
        afterTabClose: () => {
        }
      });
    },

    /**
     * 修改
     */
    signFn: function () {
      let _this = this;
      if (_this.$refs.refContTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refContTable.selections[0];
      //不是待发起和打回 不能修改
      if(obj.contApproveStatus != '000' && obj.contApproveStatus != '992'){
        _this.$message({
          message: '该条记录不是待发起或打回状态，无法签订！',
          type: 'warning'
        });
        return;
      }

      _this.jumpToEditPageFn(obj, 'EDIT');
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refContTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refContTable.selections[0];
      _this.jumpToEditPageFn(obj, 'VIEW');
    },

    setStatus(status){
      if(status == '0'){
        return '失败'
      } else if (status == '1'){
        return '成功'
      }else{
        return ''
      }
    }
  }
};
</script>
