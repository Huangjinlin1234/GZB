<template>
  <div>
    <div>
      <d1-a-billlist ref="d1_A_BillList" :page-params="pageParams"></d1-a-billlist>
    </div>
    <div>
    <div>
    <yu-panel title="保证担保信息" panel-type="normal">
        <yu-toolbar>
          <!-- 需求变更隐藏引入功能 -->
          <yu-button type="primary" v-if="false" @click="OnImportGuar">引入</yu-button>
          <yu-button type="primary" v-if="type!='VIEW'" @click="doAddGuarantee">新增</yu-button>
          <!-- 需求变更隐藏修改功能 -->
          <yu-button type="primary" v-if="false" @click="doUpdateGuarantee">修改</yu-button>
          <yu-button type="primary" @click="doViewGuarantee">查看</yu-button>
          <yu-button type="primary" v-if="type!='VIEW'" @click="deleteGuaree">删除</yu-button>
          <yu-button type="primary" v-if="type!='VIEW'" @click="freshList">刷新</yu-button>
        </yu-toolbar>
      <yu-xtable ref="refTable1" row-number condition-key="condition" selection-type="radio"  request-type="post" :base-params="searchData" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="担保编号" prop="guarantyId"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="保证人客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证方式" v-if="type != 'VIEW'" ctype="select" prop="guarantyType" data-code="STD_ZB_GUARANTY_TYPE" ></yu-xtable-column>
        <yu-xtable-column label="保证方式" v-else prop="guarantyType" data-code="STD_ZB_GUARANTY_TYPE" ></yu-xtable-column>
        <yu-xtable-column label="担保金额(元)" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保标识" v-if="type != 'VIEW'" ctype="select" prop="isAddGuar" data-code="STD_GUAR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保标识" v-else prop="isAddGuar" data-code="STD_GUAR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="操作" v-if="type != 'VIEW'">
            <template slot-scope="scope">
                <el-link type="primary" @click="save(scope.row)">保存</el-link>
            </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </div>
    </div>
  </div>
</template>
<script>
import d1ABilllist from './grtGuarCont_d1_A_BillList';
// import d1BBilllist from './grtGuarCont_d1_B_BillList';
// 保证担保合同
export default {
  components: {d1ABilllist},
  // components: {d1ABilllist},
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillList: null,
      d1_B_BillList: null,
      params: {},
      guarMode: '',
      type: this.getFactory().contextData.op,
      searchData: {condition: {
        serno: this.getFactory().contextData.subSerno
      }},
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/querguaranteerel/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/deleteGuaranteefoSell/'
    };
  },
  mounted () {
    this.AfterInit();
    this.innit(this.getFactory().contextData.subSerno);
    console.log(this.getFactory().contextData.op);
  },
  methods: {
    AfterInit () {
      debugger;
      var _this = this;
      this.d1_A_BillList = this.$refs.d1_A_BillList;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      // var iqpSerno = _this.$route.meta.params.iqpSerno;
      var iqpSerno = _this.getFactory().contextData.subSerno;
      this.params['iqp_Serno'] = iqpSerno;
      this.params['bizSerno'] = _this.getFactory().contextData.serno;
      this.params['lmtAmt'] = _this.getFactory().contextData.lmtAmt;
      // this.d1_A_BillList.setParamsData(iqpSerno);
    },
    innit: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsub/getbysubserno',
        data: subSerno,
        success: (response, status, xhr) => {
          if (response.code == '0' && response.data != null) {
            _this.guarMode = response.data.guarMode;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 点击引入，进入抵质押引入页面
    OnImport () {
      this.$dialog.open(
        '引入抵质押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCard',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.d1_A_BillList.queryDataByCondition();
        }
      );
    },
    // 点击引入，进入保证人引入页面
    OnImportGuar () {
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfo',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.$refs.refTable1.remoteData();
        }
      );
    },
    // 保证人删除申请
    deleteGuaree () {
      const params = this.$refs.refTable1.selections;
      // const params = this.d1_B_BillList.getSelectedRowData();
      if (params.length == 0) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var pkId = params[0].pkId;
      this.$xutils.showConfirmBox(
        '提示',
        '是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/guarbizrel/delete/' + pkId,
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.$refs.refTable1.remoteData();
                  });
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },
              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },
    // 抵质押删除申请
    deleteGuar () {
      const params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var pkId = params.pkId;
      this.$xutils.showConfirmBox(
        '提示',
        '是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/guarbizrel/delete/' + pkId,
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    this.d1_A_BillList.queryDataByCondition();
                  });
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },
    // 抵押物修改申请
    doUpdate () {
      const params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['biz_type'] = '02';
      this.params['guarNo'] = params.guarNo;
      this.params['serno'] = params.serno;
      this.$dialog.open(
        '引入抵押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCardUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.$xutils.getParentPage(this, 'd1_A_BillList', 'queryDataByCondition');
        }
      );
    },
    // 新增保证人
    doAddGuarantee () {
      
      debugger;
      const params = {};
      this.params['subSerno'] = this.getFactory().contextData.subSerno;
      this.$dialog.open(
        '保证人机构',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarbao',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          //this.$xutils.getParentPage(this, 'd1_A_BillList', 'queryDataByCondition');
        }
      );
      // const params = {};
      // // params['serno'] = this.$xutils.getDefaultformulaData('SEQ:GUAR_BASE_SEQ');
      // params['serno'] = this.getFactory().contextData.subSerno;
      // params['callMethod'] = 'tGuarExistQry';
      // params['grtFlag'] = '03';// 03保证
      // params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      // params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      // const url = this.getGuarSysUrl(params);
      // // let date = new Date();
      // if (url != '') {
      //   this.$nextTick(function () {
      //     window.open(url, '_blank');
      //   });
      // }
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
      //  url: 'http://172.20.10.4:8080/cms/userSignOn.do?OutSys='+params.managerBrId + '&OperUser='+params.managerId,
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
    // 修改申请
    doUpdateGuarantee () {
      const params = this.$refs.refTable1.selections;
      if (params.length == 0) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['biz_type'] = '02';
      this.params['serno'] = params[0].serno;
      this.params['guarantyId'] = params[0].guarantyId;
      this.params['pkId'] = params[0].pkId;
      this.params['cusId'] = params[0].cusId;
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfoUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.$refs.refTable1.remoteData();
        }
      );
    },
    // 查看申请
    doViewGuarantee () {
      const params = this.$refs.refTable1.selections;
      if (params.length == 0) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['op'] = 'VIEW';
      this.params['biz_type'] = '02';
      this.params['serno'] = params[0].serno;
      this.params['guarantyId'] = params[0].guarantyId;
      this.params['pkId'] = params[0].pkId;
      this.params['cusId'] = params[0].cusId;
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarGuaranteeInfoUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.$refs.refTable1.remoteData();
        }
      );
    },
    // 返回
    OnCancel () {
      this.$dialog.close(this.dialogId);
    },
    // 刷新列表数据
    freshList () {
      this.$refs.refTable1.remoteData();
    },
    // 保证人保存
    save (row) {
      var _this = this;
      var model = {};
      yufp.clone(row, model);
      _this.$xutils.request({
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/guarbizrel/updateguarinforelGuarantee',
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              _this.$refs.refTable1.remoteData();
            });
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 修改引入的押品信息
    doGuarUpdate () {
      const params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['pkId'] = params.pkId;
      this.params['op'] = 'EDIT';
      this.$dialog.open(
        '引入抵质押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCardUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.d1_A_BillList.queryDataByCondition();
        }
      );
    },
    // 查看引入的押品信息
    doGuarView () {
      const params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.params['op'] = 'VIEW';
      this.params['pkId'] = params.pkId;
      this.$dialog.open(
        '引入抵质押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoCardUpdate',
        1100,
        650,
        this.params,
        () => {
          // 自动刷新列表数据
          this.d1_A_BillList.queryDataByCondition();
        }
      );
    }
  }
};
</script>
