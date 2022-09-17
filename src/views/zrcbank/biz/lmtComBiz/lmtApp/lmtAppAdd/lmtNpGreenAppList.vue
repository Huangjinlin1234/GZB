
<template>
  <!--
    @created by  lyj
    @updated by
    @updated by
    @description 内评低准入例外审批列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" >
      <yu-tab-pane label="内评低准入例外审批列表" name="appList">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
              <yu-xform-group :column="3">
                  <yu-xform-item label="业务流水号" ctype="input" name="serno"></yu-xform-item>
                  <yu-xform-item label="客户编号" ctype="input" name="cusId"></yu-xform-item>
                  <yu-xform-item label="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
                  <yu-xform-item label="申请人" ctype="input" name="inputIdName" fuzzy-query="both"></yu-xform-item>
                  <yu-xform-item label="申请人" ctype="input" name="inputId" hidden></yu-xform-item>
                  <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" exclude-key="990,991,993,997,998,996" name="approveStatus" ></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-panel>
          <yu-panel title="内评低准入例外审批列表" :hideFilter="false" :collapseHide="false">
            <yu-toolbar>
              <yu-button @click="addFn" type="primary" v-if="checkCtrl('add')">新增</yu-button>
              <yu-button @click="modifyFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
              <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
              <yu-button @click="deleteFn" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
            </yu-toolbar>
          <yu-xdialog :visible.sync="dialogVisibleSelected" width="650px">
            <yu-xform ref="refFormDialog" label-width="120px" v-model="formdata" >
              <yu-xform-group column="1">
                <yu-xform-item label="业务流水号" ctype="input" name="serno" rules="required" colspan="20" disabled  ></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="custom" colspan="2"> <yu-button type="primary" @click="choseSerno">选取</yu-button></yu-xform-item>
                <yu-xform-item label="客户编号" rules="required" ctype="input" name="cusId" disabled colspan="22"></yu-xform-item>
                <yu-xform-item label="客户名称" rules="required" ctype="input" name="cusName" disabled colspan="22"></yu-xform-item>
                <yu-xform-item label="申请人" rules="required" ctype="input" name="inputIdName" disabled colspan="22"></yu-xform-item>
                <yu-xform-item label="申请人" rules="required" ctype="input" name="inputId"  hidden colspan="22"></yu-xform-item>
                <yu-xform-item label="申请原因" rules="required" ctype="textarea" name="applyReason" colspan="22"></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton">
                <yu-button type="primary" @click="nextFn">下一步</yu-button>
                <yu-button type="primary" @click="cancelFn">返回</yu-button>
              </div>
            </yu-xform>
          </yu-xdialog>
          <yu-xdialog :visible.sync="dialogVisibleSelectedApp" width="1000px" height="600px">
              <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTableApp" form-type="search" v-model="searchFormdataApp" label-width="100px">
              <yu-xform-group :column="3">
                  <yu-xform-item label="业务流水号" ctype="input" name="serno"></yu-xform-item>
                  <yu-xform-item label="授信类型" ctype="select" data-code="STD_SX_LMT_TYPE" exclude-key="02,07" name="lmtType" ></yu-xform-item>
                  <yu-xform-item label="客户编号" ctype="input" name="cusId"></yu-xform-item>
                  <yu-xform-item label="客户名称" ctype="input" name="cusName"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-panel>
          <yu-xtable ref="refTableApp" row-number condition-key="condition" selection-type="radio" :data-url="dataUrlApp" requestType="POST">
           <yu-xtable-column label="主键" prop="pkId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_SX_LMT_TYPE" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="180"> </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="180"></yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" width="180"></yu-xtable-column>
            <yu-xtable-column label="原授信批复流水号" prop="origiLmtReplySerno" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原授信期限" prop="origiLmtTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原宽限期" prop="origiLmtGraperTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原敞口额度合计" prop="origiOpenTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原低风险额度合计" prop="origiLowRiskTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="测算最高流动资金贷款额度" prop="evalHighCurfundLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="是否集团授信" prop="isGrp" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计" prop="lowRiskTotalLmtAmt" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column label="授信期限" prop="lmtTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="授信宽限期" prop="lmtGraperTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="操作类型" prop="oprType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="180"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="180"></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>
              <div class="yu-grpButton">
                <yu-button type="primary" @click="choseBack">选取返回</yu-button>
              </div>
          </yu-xdialog>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" requestType="POST">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" >
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" >
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="申请人" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate"  ></yu-xtable-column>
            <yu-xtable-column label="申请原因" prop="applyReason" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
            <yu-xtable-column label="操作类型" prop="oprType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="内评低准入例外审批历史列表" name="appHis">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTableHis" form-type="search" v-model="searchFormdata2" label-width="100px">
              <yu-xform-group :column="3">
                  <yu-xform-item label="业务流水号" ctype="input" name="serno"></yu-xform-item>
                  <yu-xform-item label="客户编号" ctype="input" name="cusId"></yu-xform-item>
                  <yu-xform-item label="客户名称" ctype="input" name="cusName"></yu-xform-item>
                  <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" exclude-key="000,111,992" name="approveStatus" ></yu-xform-item>
               </yu-xform-group>
            </yu-xform>
          </yu-panel>
          <yu-panel title="内评低准入例外审批历史列表" :hideFilter="false" :collapseHide="false">
            <yu-toolbar>
              <yu-button @click="infoFnHis" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
            </yu-toolbar>
          <yu-xtable ref="refTableHis" row-number condition-key="condition" selection-type="radio" :data-url="dataUrlHis" requestType="POST">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" >
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" >
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="申请人" prop="inputIdName"  ></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate"  ></yu-xtable-column>
            <yu-xtable-column label="申请原因" prop="applyReason" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
            <yu-xtable-column label="操作类型" prop="oprType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import mixin from '@/utils/mixin';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  components: { YufpDemoSelector },
  mixins: [mixin],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/lmtnpgreenapp/getLmtGreenApp',
      dataUrlHis: backend.cmisBiz + '/api/lmtnpgreenapp/getLmtGreenAppHis',
      activeName: 'appList',
      dialogVisibleSelected: false,
      dialogVisibleSelectedApp: false,
      formdata: {},
      dataUrlApp: backend.cmisBiz + '/api/lmtapp/getNpGreenApp'
    };
  },
  methods: {
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      const params = data;
      var _this = this;
      let json = {};
      let cusCatalog = '';
      let name = '';
      let title = '';
      // 判断客户属于个人还是公司（1.对私;2.对公）
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: params.cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            cusCatalog = response.data.cusCatalog;
          }
        }
      });
      if (cusCatalog == '1') {
        name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
        title = '个人客户查看';
      } else if (cusCatalog == '2') {
        name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        title = '公司客户查看';
      } else {
        _this.$xutils.showMsgBox('提示', '当前客户大类未识别,请确认客户信息是否完整!');
      }
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = params.cusId;
      // 个人正式客户创建 B01
      key = params.cusId + new Date().getTime();
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    },
    /** 选取流水号 */
    choseSerno: function () {
      var _this = this;
      _this.dialogVisibleSelectedApp = true;
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      this.dialogVisibleSelected = true;
      this.$nextTick(function () {
        _this.initDialog();
      });
    },
    cancelFn: function () {
      this.$refs.refFormDialog.resetFields();
      this.dialogVisibleSelected = false;
    },
    initDialog: function () {
      var _this = this;
      var obj = {};
      obj.inputId = this.$xutils.getLoginUserInfo().loginCode;
      obj.inputIdName = this.$xutils.getLoginUserInfo().userName;
      yufp.clone(obj, _this.formdata);
    },
    /**
    * 修改
    */
    modifyFn: function () {
      var _this = this;
      var rowData = _this.$refs.refTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approve = rowData[0].approveStatus;
      if (approve != '000' && approve != '992') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      rowData[0].type = 'EDIT';
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtNpGreenAppInfo', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_npGreenApp', // 必传
        // 页签名称
        title: '内评低准入例外审批',
        // 传递的业务数据，可选配置
        data: rowData[0]
      });
    },
    infoFn: function () {
      var _this = this;
      var rowData = _this.$refs.refTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData[0].type = 'VIEW';
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtNpGreenAppInfo', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_npGreenApp', // 必传
        // 页签名称
        title: '内评低准入例外审批',
        // 传递的业务数据，可选配置
        data: rowData[0]
      });
    },

    /**
     * 历史详情查看
     */
    infoFnHis: function () {
      var _this = this;
      var rowData = _this.$refs.refTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData[0].type = 'VIEW';
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtNpGreenAppInfo', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_npGreenApp', // 必传
        // 页签名称
        title: '内评低准入例外审批',
        // 传递的业务数据，可选配置
        data: rowData[0]
      });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approve = selections[0].approveStatus;
      if (approve != '000' && approve != '992') {
        _this.$message({
          message: '审批中的数据不允许删除',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtnpgreenapp/logicDelete',
              data: selections[0],
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /** 选取返回流水号 */
    choseBack: function () {
      var _this = this;
      var rowData = _this.$refs.refTableApp.selections;
      var serno = rowData[0].serno;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtladeval/checkNpGreenApp',
        data: serno,
        callback: function (code, message, response) {
          if (response.data.rtnCode == '0000') {
            _this.dialogVisibleSelectedApp = false;
            _this.formdata.serno = serno;
            _this.formdata.cusId = rowData[0].cusId;
            _this.formdata.cusName = rowData[0].cusName;
          } else {
            _this.$message({
              message: response.data.rtnMsg,
              type: 'warning'
            });
            return;
          }
        }});
    },
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refFormDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var obj = _this.formdata;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtnpgreenapp/insertNpGreenApp',
        data: obj,
        callback: function (code, message, response) {
          if (response.data.rtnCode == '0000') {
            _this.$message({
              message: '新增成功'
            });
            _this.dialogVisibleSelected = false;
            _this.$refs.refTable.remoteData();
            obj.type = 'ADD';
            _this.$router.addTab({
              // 路由名称
              name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtNpGreenAppInfo', // 菜单路径
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: 'custom_npGreenApp', // 必传
              // 页签名称
              title: '内评低准入例外审批',
              // 传递的业务数据，可选配置
              data: obj
            });
          } else {
            _this.$message({
              message: response.data.rtnMsg,
              type: 'warning'
            });
          }
        }
      });
    }

  }
};
</script>
