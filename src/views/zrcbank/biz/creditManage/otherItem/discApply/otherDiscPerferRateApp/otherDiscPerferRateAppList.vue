<template>
  <!--
    @created by qiantj
    @description 贴现优惠利率申请
  -->
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="贴现优惠利率申请" name="rateAppTab">
        <yu-panel title="输入查询条件">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="4">
              <yu-xform-item label="申请表编号" name="serno"></yu-xform-item>
              <yu-xform-item label="企业名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="贴现优惠利率申请列表" :hideFilter="false" :collapseHide="false">
          <yu-toolbar>
            <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
            <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
            <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" request-type="GET">
            <yu-xtable-column label="申请表编号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="企业名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="本年度累计贴现总额" prop="yearDiscAmt"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="贴现优惠利率申请历史" name="rateAppHistTab">
        <yu-panel title="输入查询条件">
          <yu-xform related-table-name="refHistTable" form-type="search">
            <yu-xform-group :column="4">
              <yu-xform-item label="申请表编号" name="serno"></yu-xform-item>
              <yu-xform-item label="企业名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="贴现优惠利率申请历史列表" :hideFilter="false" :collapseHide="false">
          <yu-toolbar>
            <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoHistFn">查看</yu-button>
            <yu-button type="primary" v-if="checkCtrl('export')" @click="outputHis">打印报表</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refHistTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="baseParamsHist" selection-type="radio" request-type="GET">
            <yu-xtable-column label="申请表编号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="企业名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="本年度累计贴现总额" prop="yearDiscAmt"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
// 注册字典项 审批状态
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  props: {
    dialogId: String
  },
  data: function () {
    return {
      serno: '',
      baseParams: {
        condition: { oprType: '01', approveStatusS: '000,111,992' }
      },
      baseParamsHist: {
        condition: { oprType: '01', approveStatusS: '990,991,997,998,996' }
      },
      bailaccinfo: [],
      dataUrl: backend.cmisBiz + '/api/otherdiscperferrateapp/',
      activeName: 'rateAppTab',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  mounted () {
    const userInfo = this.$xutils.getLoginUserInfo(); // 获取登陆人信息
    this.loginInfo = userInfo;
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshRefTable', this.refreshRefTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshRefTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshRefTable: function () {
      let _this = this;
      _this.$refs.refTable.remoteData();
    },
    handleClick: function (tab, event) {
      // TODO
      if (tab.name == 'rateAppTab') {
        this.$refs.refTable.remoteData();
      } else if (tab.name == 'rateAppHistTab') {
        this.$refs.refHistTable.remoteData();
      }
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      var obj = {};
      const serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
      obj['serno'] = serno;
      obj['managerId'] = this.loginInfo.loginCode;
      obj['managerBrId'] = this.loginInfo.org.id;
      var dateNow = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      obj['inputDate'] = dateNow;
      // obj['op'] = 'ADD';
      // _this.$dialog.open('', 'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo', -1, -1, obj, true, true);

      let path =
        'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '新增贴现优惠利率申请信息',
        data: {
          name: _this.$route.name,
          op: 'ADD', // 操作类型
          data: obj
        }
      });
    },
    // 修改按钮
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.refTable.selections[0];
      if (!(selection.approveStatus == '000' || selection.approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      var obj = selection;
      // obj['op'] = 'EDIT';
      // _this.$dialog.open('', 'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo', -1, -1, obj, true, true);

      let path =
        'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '修改贴现优惠利率申请信息',
        data: {
          name: this.$route.name,
          op: 'EDIT', // 操作类型
          data: obj
        }
      });
    },
    // 查看按钮
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.refTable.selections[0];
      var obj = selection;
      // obj['op'] = 'VIEW';
      // _this.$dialog.open('', 'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo', -1, -1, obj, true, true);

      let path =
        'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看贴现优惠利率申请信息',
        data: {
          op: 'VIEW', // 操作类型
          data: obj,
          name: this.$route.name
        }
      });
    },

    // 删除按钮
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (!(selections[0].approveStatus == '000' || selections[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            var selection = _this.$refs.refTable.selections[0];
            var data = {};
            data['serno'] = selection.serno;
            data['oprType'] = '02';
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/otherdiscperferrateapp/update',
              data: data,
              callback: function (code, message, response) {
                console.log(code + ':' + response);
                if (response.code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message('删除成功');
                } else {
                  _this.$message('删除失败');
                }
              }
            });
          }
        }
      });
    },
    infoHistFn: function () {
      var _this = this;
      if (_this.$refs.refHistTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.refHistTable.selections[0];
      var obj = selection;
      let path =
        'zrcbank/biz/creditManage/otherItem/discApply/otherDiscPerferRateApp/otherDiscPerferRateAppInfo';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看贴现优惠利率申请信息',
        data: {
          op: 'VIEW', // 操作类型
          data: obj,
          name: this.$route.name
        }
      });
    },
    /**
     * 导出
     */
    outputHis () {
      var _this = this;
      var rowData = _this.$refs.refHistTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/frptdemo';
      let keydemo = 'frptdemo';
      rowData.src = _this.$backend.frptRptService + 'qtsx-txyhll.cpt&serno=' + rowData[0].serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: rowData
      });
    },

    reload: function () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
