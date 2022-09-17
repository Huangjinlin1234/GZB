<!--add by shenli -->
<template>
  <div>
    <yu-panel title="合同管理" :hideFilter="false" :collapseHide="false" panel-type="normal">
        <yu-xform ref="searchTable" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" height="400px">
          <yu-xform-group :column="3">
            <yu-xform-item label="签约方式" placeholder="签约方式" ctype="select" name="signMode" data-code="STD_SIGN_MODE"></yu-xform-item>
            <yu-xform-item label="证件号码" placeholder="证件号码" ctype="input" name="certCode" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="借款合同编号" placeholder="借款合同编号" ctype="input" name="contNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="合同状态" placeholder="合同状态" ctype="select" name="contStatus" data-code="STD_CONT_STATUS"></yu-xform-item>
            <yu-xform-item label="产品名称" placeholder="产品名称" ctype="input" name="prdName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      <yu-button-drop show-length="12">
        <yu-button @click="doPrint" type="primary" v-if="checkCtrl('doPrint')">合同打印</yu-button>
        <yu-button @click="doSign" type="primary" v-if="checkCtrl('doSign')">合同签订</yu-button>
        <yu-button @click="doImageUp" type="primary" v-if="checkCtrl('doImageUp')">影像上传</yu-button>
        <yu-button @click="doView" type="primary" v-if="checkCtrl('doView')">查看</yu-button>
        <yu-button @click="doImageView" type="primary" v-if="checkCtrl('doImageView')">影像查看</yu-button>
        <yu-button @click="doReSign" type="primary" v-if="checkCtrl('doReSign')">签订撤销</yu-button>
        <yu-button @click="doCancel" type="primary" v-if="checkCtrl('doCancel')">合同注销</yu-button>
        <yu-button @click="doCancelSignAppr" type="primary" v-if="checkCtrl('doCancelSignAppr')">作废签章审批</yu-button>
        <yu-button @click="doReplace" type="primary" v-if="checkCtrl('doReplace')">替换调查报告</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" selection-type="radio" request-type="POST" :baseParams="baseParams">
        <yu-xtable-column label="借款合同编号" prop="contNo" width="200"></yu-xtable-column>
        <yu-xtable-column label="业务申请流水号" prop="iqpSerno" width="175"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="105"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="175"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同期限" prop="appTerm"></yu-xtable-column>
        <yu-xtable-column label="合同状态" disabled="true" prop="contStatus"  data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="签约方式" disabled="true" prop="signMode" data-code="STD_SIGN_MODE"></yu-xtable-column>
        <yu-xtable-column label="签约渠道" prop="signChannel"></yu-xtable-column>
        <yu-xtable-column label="客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属团队" prop="team" data-code="STD_TEAM_TYPE" width="100"> </yu-xtable-column>
        <yu-xtable-column label="签章审批" prop="signApproveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
      </yu-xtable>
      <yu-dialog title="合同打印方式选取" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-button-drop show-length="3">
          <yu-button @click="doPrinting">合同打印（不带电子章）</yu-button>
          <yu-button @click="doPrintingSeal1">合同打印（电子骑缝章）</yu-button>
          <yu-button @click="doPrintingSeal2">合同打印（银行电子公章）</yu-button>
        </yu-button-drop>
      </yu-dialog>
    </yu-panel>
    <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('XD_SIGN_WAY,STD_XW_CONT_TYPE,STD_ZB_CONT_TYP,STD_CONT_STATUS,STD_ZB_APPR_STATUS,STD_TEAM_TYPE');

export default {
  components: { YufpDemoSelector, yufpNwfInit },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctrloancont/xw/queryCtrLoanContList',
      loginCode: null,
      dialogTableVisible: false,
      baseParams: {condition: {oprType: '01',
        belgLine: '01'},
      sort: 'inputDate desc,contNo desc'
      }
    };
  },
  mounted () {
    // this.$refs.refTable.remoteData();
    const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
    this.loginCode = userInfo.loginCode;
  },

  methods: {
    /** 合同打印窗口显示
     */
    doPrint () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      } else if (selectionsAry[0].signMode == '02') {
        _this.$message({ message: '小微线上签约合同不支持合同打印！', type: 'warning' });
        return;
      } else {
        _this.dialogTableVisible = true;
      }
    },

    doPrinting () { // 合同打印（不带电子章）
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let inputId = selectionsAry[0].managerId;
      // if (_this.loginCode != inputId) {
      //   _this.$message({ message: '只能对客户经理是自己的合同，操作合同打印（不带电子章）', type: 'warning' });
      //   return;
      // }
      var contPageType = '1';// 合同版面标识
      var isESeal = '0';// 是否电子用印  1是0否
      var paramList = [];
      // 参数
      var printData = {
        contNo: selectionsAry[0].contNo,
        cusId: selectionsAry[0].cusId,
        serno: selectionsAry[0].iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: selectionsAry[0].contNo, // 合同编号
        serno: selectionsAry[0].iqpSerno, // 流水号
        contType: '1',
        suitContType: selectionsAry[0].contType, // 适用合同类型
        suitPrd: selectionsAry[0].prdId, // 适用产品
        isESeal: '0', // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: '' // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
      var contList = [];
      contList.push(selectionsAry[0].contNo);
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
              param2.contNo = selectionsAry[0].contNo; // 借款合同号
              param2.serno = selectionsAry[0].iqpSerno; // 借款合同流水号
              param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
              param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
              param2.contType = '2';
              param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
              param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
              param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
              param2.pldContType = guarData[i].pldContType; // 质押合同类型
              param2.isESeal = '0'; // 是否电子用印
              param2.contPageType = '1'; // 合同版面标识
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
      _this.dialogTableVisible = false;
    },

    doPrintingSeal1 () { // 合同打印（电子骑缝章）
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      // let inputId = selectionsAry[0].managerId;
      // if (_this.loginCode != inputId) {
      //   _this.$message({ message: '只能对客户经理是自己的合同，操作合同打印（电子骑缝章）', type: 'warning' });
      //   return;
      // }

      var contPageType = '2';// 合同版面标识
      var paramList = [];
      // 参数
      var printData = {
        contNo: selectionsAry[0].contNo,
        cusId: selectionsAry[0].cusId,
        serno: selectionsAry[0].iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: selectionsAry[0].contNo, // 合同编号
        serno: selectionsAry[0].iqpSerno, // 流水号
        contType: '1',
        suitContType: selectionsAry[0].contType, // 适用合同类型
        suitPrd: selectionsAry[0].prdId, // 适用产品
        isESeal: '1', // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: '' // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
      var contList = [];
      contList.push(selectionsAry[0].contNo);
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
              param2.contNo = selectionsAry[0].contNo; // 借款合同号
              param2.serno = selectionsAry[0].iqpSerno; // 借款合同流水号
              param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
              param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
              param2.contType = '2';
              param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
              param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
              param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
              param2.pldContType = guarData[i].pldContType; // 质押合同类型
              param2.isESeal = '1'; // 是否电子用印
              param2.contPageType = '2'; // 合同版面标识
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
      _this.dialogTableVisible = false;
    },

    doPrintingSeal2 () { // 合同打印（银行电子公章）
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      // let inputId = selectionsAry[0].managerId;

      // if (_this.loginCode != inputId) {
      //   _this.$message({ message: '只能对客户经理是自己的合同，操作合同打印（银行电子公章）', type: 'warning' });
      //   return;
      // }
      var contno = selectionsAry[0].contNo;
      var startdto = {};
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/xw/printingSeal2',
        data: {contNo: contno}
      }).then((res) => {
        if (res.code == '0') {
          if (res.data == 0) {
            var contPageType = '3';// 合同版面标识
            var paramList = [];
            // 参数
            var printData = {
              contNo: selectionsAry[0].contNo,
              cusId: selectionsAry[0].cusId,
              serno: selectionsAry[0].iqpSerno
            };
            // 借款合同
            var params1 = {
              contNo: selectionsAry[0].contNo, // 合同编号
              serno: selectionsAry[0].iqpSerno, // 流水号
              contType: '1',
              suitContType: selectionsAry[0].contType, // 适用合同类型
              suitPrd: selectionsAry[0].prdId, // 适用产品
              isESeal: '1', // 是否电子用印
              contPageType: contPageType, // 合同版面标识
              isDzpj: '', // 是否电子票据
              matchFlag: '' // 特定匹配标识
            };
            paramList.push(printData);
            paramList.push(params1);
            var contList = [];
            contList.push(selectionsAry[0].contNo);
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
                    param2.contNo = selectionsAry[0].contNo; // 借款合同号
                    param2.serno = selectionsAry[0].iqpSerno; // 借款合同流水号
                    param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
                    param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
                    param2.contType = '2';
                    param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
                    param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
                    param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
                    param2.pldContType = guarData[i].pldContType; // 质押合同类型
                    param2.isESeal = '1'; // 是否电子用印
                    param2.contPageType = '3'; // 合同版面标识
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
            _this.dialogTableVisible = false;
          } else if (res.data == 1) {
            _this.start(startdto, contno, selectionsAry[0]);
          } else if (res.data == 2) {
            _this.start(startdto, contno, selectionsAry[0]);
          } else if (res.data == 3) {
            _this.$message({ message: res.message, type: 'warning' });
          } else if (res.data == 4) {
            _this.$message({ message: res.message, type: 'warning' });
          }
        } else if (res.code == '9999') {
          _this.$message({ message: res.message, type: 'warning' });
        }
      });
    },

    /** 流程发起 */
    start (startdto, contno, selectionsAry) {
      var _this = this;
      startdto.systemId = 'cmis';
      startdto.orgId = _this.$store.state.oauth.org.code;
      startdto.userId = _this.$store.state.oauth.loginCode;
      startdto.bizType = 'XW003';
      // startdto.bizType = 'XD_PERFER_RATE_APPLY_TEST';
      startdto.bizId = selectionsAry.iqpSerno;
      startdto.bizUserName = selectionsAry.cusName;
      console.log(selectionsAry.cusName);
      startdto.bizUserId = selectionsAry.cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
      _this.dialogTableVisible = false;
    },
    doSign () { // 合同签订
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      // let userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      // let inputId = selectionsAry[0].managerId;
      // let contStatus = selectionsAry[0].contStatus;
      // let flg = this.getRole(userInfo.roles);
      // if ((_this.loginCode != inputId || flg) || contStatus != '100') {
      //   _this.$message({ message: '只能对未生效的且客户经理是自己的合同进行签订操作', type: 'warning' });
      //   return;
      // }


      this.$router.addTab({
        name: 'xwmanage/iqpManage/contManage/conSignInfo',
        key: 'custom_' + new Date().getTime(),
        title: '贷款合同签订',
        data: {
          contNo: selectionsAry[0].contNo,
          show: true

        },
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
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
    doReSign () { // 合同重签
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let inputId = selectionsAry[0].managerId;
      let signMode = selectionsAry[0].signMode;
      let contStatus = selectionsAry[0].contStatus;
      var contno = selectionsAry[0].contNo;
      if (_this.loginCode != inputId || contStatus != '200' || signMode != '01') {
        _this.$message({ message: '只能对生效状态、签约方式为线下且客户经理是自己的合同进行重签', type: 'warning' });
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否进行合同签订撤销', 400, 200, _isOK => {
        if (_isOK) {
          yufp.service.request({method: 'POST',
            url: backend.cmisBiz + '/api/ctrloancont/xw/contReSign',
            data: {contNo: contno},
            callback (code, message, response) {
              if (response.data.code === '0000') {
                _this.$message({ message: '撤销成功', type: 'success' });
                _this.$refs.refTable.remoteData();
              } else {
                _this.$message({ message: response.data.msg, type: 'warning' });
              }
            }
          });
        } else {
          this.$dialog.close(this.dialogId);
        }
      });
    },

    doView () { // 查看
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$router.addTab({
        name: 'xwmanage/iqpManage/contManage/conSignInfo',
        key: 'custom_conSignInfo' + new Date().getTime(),
        title: '普通贷款合同签订',
        data: {
          contNo: selectionsAry[0].contNo,
          show: false
        },
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    },

    doImageUp () { // 影像上传
      var _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let params = selectionsAry[0];
      this.$dialog.open(
        '影像上传',
        'xwmanage/iqpManage/contManage/imagePageUp',
        1500,
        1500,
        params
      );
    },

    doImageView () { // 影像查看
      var _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let params = selectionsAry[0];
      this.$dialog.open(
        '影像查看',
        'xwmanage/iqpManage/contManage/imagePage',
        1500,
        1500,
        params
      );
    },


    doCancel () { // 合同注销
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let inputId = selectionsAry[0].managerId;
      let contStatus = selectionsAry[0].contStatus;

      if (_this.loginCode != inputId || contStatus != '200') {
        _this.$message({ message: '只能对生效状态、签约方式为线下且客户经理是自己的合同进行注销', type: 'warning' });
        return;
      }


      var contno = selectionsAry[0].contNo;
      yufp.service.request({method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/xw/cancelCont',
        data: {contNo: contno},
        callback (code, message, response) {
          if (response.data.code === '0000') {
            _this.$message({ message: response.data.msg, type: 'success' });
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: response.data.msg, type: 'warning' });
          }
        }
      });
    },


    doCancelSignAppr () { // 作废签章审批
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = selectionsAry[0].managerId;
      let signApproveStatus = selectionsAry[0].signApproveStatus;
      let contno = selectionsAry[0].contNo;
      if (_this.loginCode != managerId || signApproveStatus != '992') {
        _this.$message({ message: '只能作废签章审批为退回的且客户经理是自己的签章审批', type: 'warning' });
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否作废签章审批', 400, 200, _isOK => {
        if (_isOK) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/ctrloancont/xw/cancelSign',
            data: {contNo: contno},
            callback (code, message, response) {
              if (response.data.code === '0000') {
                _this.$message({ message: response.data.msg, type: 'success' });
                _this.$refs.refTable.remoteData();
              } else {
                _this.$message({ message: response.data.msg, type: 'warning' });
              }
            }
          });
        } else {
          this.$dialog.close(this.dialogId);
        }
      });
    },
    /* 替换调查报告*/
    doReplace () {
      let _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let rtParam = selectionsAry[0];
      let contType = rtParam.contType;
      let managerBrId = rtParam.managerBrId;
      if (contType != '2' || (managerBrId != '016000' && managerBrId != '800100' && managerBrId != '810100')) {
        _this.$message({ message: '仅小贷最高额合同支持替换调查报告！', type: 'warning' });
        return;
      }
      _this.$dialog.open(
        '',
        'xwmanage/iqpManage/contManage/crdReplyInfoListPop',
        -1,
        -1,
        rtParam,
        params => {
          if (!params) {
            // 取消返回
            return;
          }
        }
      );
    }


  }
};
</script>
