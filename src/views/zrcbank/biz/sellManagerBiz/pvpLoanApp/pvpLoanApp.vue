<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——tab页签+查询
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="tabClick">
      <yu-tab-pane label="放款申请列表" name="messageTip">
        <yu-panel title="" :hideFilter="true" :collapseHide="true">
            <yu-xform v-model="searchFormdata" related-table-name="refTable" form-type="search"  :remove-empty="true">
              <yu-xform-group :column="2">
                <yu-xform-item placeholder="放款流水" ctype="input" label="放款流水" name="pvpSerno" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item placeholder="客户编号" ctype="input" label="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item placeholder="客户名称" ctype="input" label="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item placeholder="合同编号" ctype="input" label="合同编号" name="contNo" ></yu-xform-item>
                <yu-xform-item placeholder="借据编号" ctype="input" label="借据编号" name="billNo" ></yu-xform-item>
                <yu-xform-item placeholder="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" label="审批状态" name="approveStatus"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
              <yu-button type="primary" @click="addFn" v-if="checkCtrl('addFn')">新增</yu-button>
              <yu-button type="primary" @click="editFn" v-if="checkCtrl('editFn')">修改</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('infoFn')">查看</yu-button>
              <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('deleteFn')">删除</yu-button>
              <yu-button type="primary" @click="accloanFn" v-if="checkCtrl('accloanFn')">借据打印</yu-button>
              <yu-button type="primary" @click="applybookFn" v-if="checkCtrl('applybookFn')">额度支用申请书打印</yu-button>
          <yu-xtable index selection-type="radio" :default-sort="{prop:'contNo',order:'descending'}" ref="refTable" request-type="POST" row-number :data-url="dataUrl" condition-key="condition" :base-params="params">
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="iqpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" ></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" sortable></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="本次出账金额" prop="pvpAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据起始日期" prop="loanStartDate"></yu-xtable-column>
            <yu-xtable-column label="借据到期日期" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>

      <yu-tab-pane label="放款申请历史" name="workSche">
        <yu-panel title="">
             <yu-xform v-model="searchFormdata2" related-table-name="refWorkScheduleTable" form-type="search"  :remove-empty="true">
              <yu-xform-group :column="2">
                <yu-xform-item placeholder="放款流水" ctype="input" label="放款流水" name="pvpSerno" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item placeholder="客户编号" ctype="input" label="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item placeholder="客户名称" ctype="input" label="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item placeholder="合同编号" ctype="input" label="合同编号" name="contNo" ></yu-xform-item>
                <yu-xform-item placeholder="借据编号" ctype="input" label="借据编号" name="billNo"></yu-xform-item>
                <yu-xform-item placeholder="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" label="申请状态" name="approveStatus"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
             <yu-button type="primary" @click="infoFn2" v-if="checkCtrl('infoFn2')">详情查看</yu-button>
             <yu-button type="primary" @click="accloanFnHis" v-if="checkCtrl('accloanFnHis')">借据补打</yu-button>
             <yu-button type="primary" @click="lcgjLook" v-if="checkCtrl('lcgjLook')">流程轨迹</yu-button>
             <yu-button type="primary" @click="revocation" v-if="checkCtrl('revocation')">撤销</yu-button>
          <yu-xtable index  selection-type="radio" :default-sort="{prop:'contNo',order:'descending'}" ref="refWorkScheduleTable" request-type="POST" row-number :data-url="dataUrl" condition-key="condition" :base-params="params2">
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="iqpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" sortable></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="本次出账金额" prop="pvpAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据起始日期" prop="loanStartDate"></yu-xtable-column>
            <yu-xtable-column label="借据到期日期" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>


    </yu-tabs></div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_APPR_STATUS,STD_LOAN_TYPE_DETAIL,STD_REPAY_MODE');
export default {
  data: function () {
    return {
      params: { condition: {whData: '000,992', oprType: '01', belgLine: '02'}, sort: 'input_date desc'}, // 申请列表固定查询条件
      params2: { condition: {whData: '111,990,991,993,997,998,996', belgLine: '02'}, sort: 'input_date desc'}, // 申请历史列表固定查询条件
      dataUrl: backend.cmisBiz + '/api/pvploanapp/selectDataByModel',
      activeName: 'messageTip',
      searchFormdata: {}, // 查询条件框
      searchFormdata2: {},
      condition: {},
      pages: 0
    };
  },
  methods: {
    // 新增
    addFn () {
      var _this = this;

      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppAdd', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_pvpLoanAppAdd' + 1, // 必传
        // 页签名称
        title: '放款申请新增',
        // 传递的业务数据，可选配置
        data: {

        }
      });
    },
    // 修改操作
    editFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.$xutils.getDefaultformulaData('$LoginLoginCode') != managerId) {
        _this.$message({ message: '只能对客户经理是自己本人的放款申请进行修改', type: 'warning' });
        return;
      }

      // console.log(this.$refs.refTable.selections[0].pvpSerno);
      var pvpSerno = _this.$refs.refTable.selections[0].pvpSerno;
      var iqpSerno = _this.$refs.refTable.selections[0].iqpSerno;
      var contNo = _this.$refs.refTable.selections[0].contNo;
      var certCode = '';
      let docid = '';


      var imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';
      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/iqploanapp/show',
        data: iqpSerno,
        callback: function (code, message, response) {
          certCode = response.data.certCode;
        }
      });

      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + contNo,
        callback: function (code, message, response) {
          docid = response.data;
          if (docid != null) {
            imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ;CMSYPYX';
          }
        }
      });


      _this.$router.addTab({
      // 路由名称
        name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'customPvpLoanAppEdit', // 必传
        // key: 'custom_pvpLoanAppPage', // 必传
        // 页签名称
        title: '放款申请信息',
        // 传递的业务数据，可选配置
        data: {
          pageType: 2, // 修改,
          pvpSerno: pvpSerno,
          serno: pvpSerno,
          pageName: 'edit_' + pvpSerno,
          iqpSerno: iqpSerno,
          contNo: contNo,
          period: '03',
          borrowerCusId: _this.$refs.refTable.selections[0].cusId,
          borrowerCusName: _this.$refs.refTable.selections[0].cusName,
          borrowerCertCode: certCode,
          oprType: '03',
          topOutsystemCode: imageCode,
          PageType: 'UPDATE',
          docid: docid


        }
      });
    },
    // 查看操作
    infoFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var pvpSerno = _this.$refs.refTable.selections[0].pvpSerno;
      var iqpSerno = _this.$refs.refTable.selections[0].iqpSerno;
      var contNo = _this.$refs.refTable.selections[0].contNo;
      var certCode = '';
      let docid = '';


      var imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';


      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/iqploanapp/show',
        data: iqpSerno,
        callback: function (code, message, response) {
          certCode = response.data.certCode;
        }
      });

      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + contNo,
        callback: function (code, message, response) {
          docid = response.data;
          if (docid != null) {
            imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ;CMSYPYX';
          }
        }
      });

      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + contNo,
        callback: function (code, message, response) {
          docid = response.data;
        }
      });

      _this.$router.addTab({
      // 路由名称
        name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPageView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_info_' + pvpSerno, // 必传
        // key: 'custom_pvpLoanAppPage', // 必传
        // 页签名称
        title: '放款申请信息',
        // 传递的业务数据，可选配置
        data: {
          pageType: 1, // 查看,
          pvpSerno: pvpSerno,
          serno: pvpSerno,
          pageName: 'info_' + pvpSerno,
          iqpSerno: iqpSerno,
          contNo: contNo,
          period: '03',
          borrowerCusId: _this.$refs.refTable.selections[0].cusId,
          borrowerCusName: _this.$refs.refTable.selections[0].cusName,
          borrowerCertCode: certCode,
          oprType: '03',
          topOutsystemCode: imageCode,
          docid: docid
        }
      });
    },

    // 详情查看
    infoFn2 () {
      var _this = this;
      if (_this.$refs.refWorkScheduleTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var pvpSerno = _this.$refs.refWorkScheduleTable.selections[0].pvpSerno;
      var iqpSerno = _this.$refs.refWorkScheduleTable.selections[0].iqpSerno;
      var contNo = _this.$refs.refWorkScheduleTable.selections[0].contNo;
      var certCode = '';
      let docid = '';


      var imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';

      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + contNo,
        callback: function (code, message, response) {
          docid = response.data;
          if (docid != null) {
            imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ;CMSYPYX';
          }
        }
      });

      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/iqploanapp/show',
        data: iqpSerno,
        callback: function (code, message, response) {
          certCode = response.data.certCode;
          _this.$router.addTab({
            // 路由名称
            name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPageView', // 菜单路径
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: 'custom_info_' + pvpSerno, // 必传
            // key: 'custom_pvpLoanAppPage', // 必传
            // 页签名称
            title: '放款申请信息',
            // 传递的业务数据，可选配置
            data: {
              pageType: 1, // 查看,
              pvpSerno: pvpSerno,
              serno: pvpSerno,
              pageName: 'info_' + pvpSerno,
              iqpSerno: iqpSerno,
              contNo: contNo,
              period: '03',
              borrowerCusId: _this.$refs.refWorkScheduleTable.selections[0].cusId,
              borrowerCusName: _this.$refs.refWorkScheduleTable.selections[0].cusName,
              borrowerCertCode: certCode,
              oprType: '03',
              PageType: 'LOOK',
              prdCode: response.data.prdId,
              prdTypeProp: response.data.prdTypeProp,
              topOutsystemCode: imageCode,
              docid: docid

            }
          });
        }
      });
    },
    // 删除操作
    deleteFn () {
      let _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.$xutils.getDefaultformulaData('$LoginLoginCode') != managerId) {
        _this.$message({ message: '只能对客户经理是自己本人的放款申请进行删除', type: 'warning' });
        return;
      }

      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        _this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/pvploanapp/invalidpvploanapp',
          data: {pvpSerno: _this.$refs.refTable.selections[0].pvpSerno}
        }).then(({code, message, data}) => {
          if (code == 0) {
          // 请求成功
            if (data == 1) {
            // 操作成功
              _this.$message({ message: message, type: 'success' });
              _this.$refs.refTable.remoteData();
            } else {
            // 操作失败
              _this.$message({ message: message, type: 'warning' });
              _this.$refs.refTable.remoteData();
            }
          }
        });
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 作废操作
    invalidFn () {
      if (this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm('此操作将作废该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/pvploanapp/invalidpvploanapp',
          data: {pvpSerno: this.$refs.refTable.selections[0].pvpSerno}
        }).then(({code, message, data}) => {
          if (code == 0) {
          // 请求成功
            if (data == 1) {
            // 操作成功
              this.$message({ message: message, type: 'success' });
              this.$refs.refTable.remoteData();
            } else {
            // 操作失败
              this.$message({ message: message, type: 'warning' });
              this.$refs.refTable.remoteData();
            }
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消作废'
        });
      });
    },
    // 撤销
    revokeFn () {
      if (this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm('此操作将撤销该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/pvploanapp/revokepvploanapp',
          data: this.$refs.refTable.selections[0].pvpSerno
        }).then(({code, message, data}) => {
          if (code == 0) {
          // 请求成功
            if (data == 1) {
            // 操作成功
              this.$message({ message: message, type: 'success' });
              this.$refs.refTable.remoteData();
            } else {
            // 操作失败
              this.$message({ message: message, type: 'warning' });
              this.$refs.refTable.remoteData();
            }
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤销'
        });
      });
    },
    // 借据打印
    accloanFn () {
      var _this = this;
      var params = this.$refs.refTable.selections[0];
      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.$xutils.getDefaultformulaData('$LoginLoginCode') != managerId) {
        _this.$message({ message: '只能对客户经理是自己本人的放款申请进行删除', type: 'warning' });
        return;
      }

      var pvpSerno = params.pvpSerno;
      let name = 'xwmanage/iqpManage/contManage/frptdemo';
      let keydemo = 'frptdemo';
      // 本地配置路径
      // params.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=pvpLoanAppBill.cpt&pvp_serno=' + pvpSerno;
      // 服务器路径
      params.src = _this.$backend.frptRptService + 'xwyx-jj.cpt&pvpSerno=' + pvpSerno;

      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '借款借据',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    // 额度申请书打印
    applybookFn () {
      var _this = this;
      if (this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.$xutils.getDefaultformulaData('$LoginLoginCode') != managerId) {
        _this.$message({ message: '只能对客户经理是自己本人的放款申请进行删除', type: 'warning' });
        return;
      }

      let rowData;
      rowData = this.$refs.refTable.selections[0];
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/applybookprint',
        data: this.$refs.refTable.selections[0].pvpSerno
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data == 1) {
            // 操作成功
            let name = 'xwmanage/iqpManage/contManage/frptdemo';
            let keydemo = 'frptdemo';
            // rowData.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwyx-edzy.cpt&pvpSerno=' + rowData.pvpSerno;
            rowData.src = _this.$backend.frptRptService + 'xwyx-edzy.cpt&pvpSerno=' + rowData.pvpSerno;
            _this.$router.addTab({
              // 路由名称
              name: name,
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: keydemo + new Date().getTime(), // 必传
              // 页签名称
              title: '额度支用申请书打印',
              // 传递的业务数据，可选配置
              data: rowData
            });
          } else {
            // 操作失败
            this.$message({ message: message, type: 'warning' });
            this.$refs.refTable.remoteData();
          }
        }
      });
    },
    // 流程轨迹查看
    lcgjLook () {
      var _this = this;
      if (_this.$refs.refWorkScheduleTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      this.$dialog.open(
        '流程轨迹查看',
        'xwmanage/common/splsty',
        -1,
        -1,
        {lsh: this.$refs.refWorkScheduleTable.selections[0].pvpSerno}

      );
    },
    // 借据打印
    accloanFnHis () {
      var _this = this;
      if (this.$refs.refWorkScheduleTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var params = this.$refs.refWorkScheduleTable.selections[0];
      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      var pvpSerno = params.pvpSerno;
      let name = 'xwmanage/iqpManage/contManage/frptdemo';
      let keydemo = 'frptdemo';
      // 本地配置路径
      // params.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=pvpLoanAppBill.cpt&pvp_serno=' + pvpSerno;
      // 服务器路径
      params.src = _this.$backend.frptRptService + 'xwyx-jj.cpt&pvpSerno=' + pvpSerno;

      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '借款借据',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    revocation () {
      // 撤销
      var _this = this;
      var selectionsAry = _this.$refs.refWorkScheduleTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = selectionsAry[0].managerId;
      const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let loginCode = userInfo.loginCode;
      if (loginCode != managerId) {
        _this.$message({
          message: '只可撤销责任人为本人放款申请',
          type: 'warning'
        });
        return;
      }

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/pvploanapprevocationretail',
        data: {pvpSerno: selectionsAry[0].pvpSerno},
        callback (code, message, response) {
          if (response.code === '0000') {
            _this.$message({ message: '撤销成功', type: 'success' });
            _this.refresh();
          } else {
            _this.$message({ message: response.data.msg, type: 'warning' });
          }
        }
      });
    },

    tabClick: function (t, e) {
      // tab 被选中时触发
      let _this = this;
      let name = t.name;
      if (name == 'messageTip') {
        _this.$refs.refTable.remoteData();
      } else if (name == 'workSche') {
        _this.$refs.refWorkScheduleTable.remoteData();
      }
    }

  }
};
</script>
