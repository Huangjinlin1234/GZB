
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——tab页签+查询
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待办任务" name="messageTip">
        <yu-panel title="" :hideFilter="true" :collapseHide="true">
          <!--          查询条件-->
          <template slot="right">
            <yu-button-drop show-length="9">
              <yu-button @click="doAdd">新增</yu-button>
              <yu-button @click="editFn">修改</yu-button>
              <yu-button @click="deleteFn">删除</yu-button>
              <yu-button @click="infoFn">查看</yu-button>
            </yu-button-drop>
          </template>
      <template slot="filter"></template>
          <yu-xform v-model="searchFormdata" related-table-name="refTable" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="6">
              <yu-xform-item placeholder="勘验流水号" ctype="input" label="勘验流水号" name="inspectSerno" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人" ctype="input" label="勘验人" name="inspector" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人证件号码" ctype="input" label="勘验人证件号码" name="inspectorCertCode" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>

          <yu-xtable index selection-type="radio" ref="refTable" request-type="POST" row-number :data-url="dataUrl" condition-key="condition" :base-params="params">
            <yu-xtable-column label="勘验流水号" prop="inspectSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人" prop="inspector" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件类型" prop="inspectorCertType"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件号码" prop="inspectorCertCode"></yu-xtable-column>
            <yu-xtable-column label="云评估编号" prop="cloudEvalNo"></yu-xtable-column>
            <yu-xtable-column label="抵押物所有人" prop="pawnOwner"></yu-xtable-column>
            <yu-xtable-column label="小区名称" prop="buildingName" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验状态" prop="inspectStatus" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="最后修改人" prop="updId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改机构" prop="updBrId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改日期" prop="updDate" v-if="show"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>


      <yu-tab-pane label="在办任务" name="workSche">
        <yu-panel title="" :hideFilter="true" :collapseHide="true">
          <!--          查询条件-->
          <template slot="right">
            <yu-button-drop show-length="9">
              <yu-button @click="infoFn">查看</yu-button>
            </yu-button-drop>
          </template>
      <template slot="filter"></template>
          <yu-xform v-model="searchFormdata2" related-table-name="refTable2" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="6">
              <yu-xform-item placeholder="勘验流水号" ctype="input" label="勘验流水号" name="inspectSerno" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人" ctype="input" label="勘验人" name="inspector" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人证件号码" ctype="input" label="勘验人证件号码" name="inspectorCertCode" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>

          <yu-xtable index selection-type="radio" ref="refTable2" request-type="POST" row-number :data-url="dataUrl" condition-key="condition" :base-params="params">
            <yu-xtable-column label="勘验流水号" prop="inspectSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人" prop="inspector" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件类型" prop="inspectorCertType"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件号码" prop="inspectorCertCode"></yu-xtable-column>
            <yu-xtable-column label="云评估编号" prop="cloudEvalNo"></yu-xtable-column>
            <yu-xtable-column label="抵押物所有人" prop="pawnOwner"></yu-xtable-column>
            <yu-xtable-column label="小区名称" prop="buildingName" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验状态" prop="inspectStatus" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="最后修改人" prop="updId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改机构" prop="updBrId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改日期" prop="updDate" v-if="show"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>

      <yu-tab-pane label="办结任务" name="workOver">
        <yu-panel title="" :hideFilter="true" :collapseHide="true">
          <!--          查询条件-->
          <template slot="right">
            <yu-button-drop show-length="9">
              <yu-button @click="infoFn">查看</yu-button>
            </yu-button-drop>
          </template>
      <template slot="filter"></template>
          <yu-xform v-model="searchFormdata3" related-table-name="refTable3" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="6">
              <yu-xform-item placeholder="勘验流水号" ctype="input" label="勘验流水号" name="inspectSerno" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人" ctype="input" label="勘验人" name="inspector" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人证件号码" ctype="input" label="勘验人证件号码" name="inspectorCertCode" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>

          <yu-xtable index selection-type="radio" ref="refTable3" request-type="POST" row-number :data-url="dataUrl" condition-key="condition" :base-params="params">
            <yu-xtable-column label="勘验流水号" prop="inspectSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人" prop="inspector" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件类型" prop="inspectorCertType"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件号码" prop="inspectorCertCode"></yu-xtable-column>
            <yu-xtable-column label="云评估编号" prop="cloudEvalNo"></yu-xtable-column>
            <yu-xtable-column label="抵押物所有人" prop="pawnOwner"></yu-xtable-column>
            <yu-xtable-column label="小区名称" prop="buildingName" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验状态" prop="inspectStatus" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="最后修改人" prop="updId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改机构" prop="updBrId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改日期" prop="updDate" v-if="show"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>


    </yu-tabs></div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_CERT_TYP');
export default {
  data: function () {
    return {
      // params: { condition: {whData: '000', approveStatus: '000', belgLine: '01'}}, // 申请列表固定查询条件
      // params2: { condition: {whData: '111,200,992,996,997', belgLine: '01'}}, // 申请历史列表固定查询条件
      dataUrl: backend.cmisBiz + '/api/lmtinspectinfo/query/all',
      activeName: 'messageTip',
      searchFormdata: {}, // 查询条件框
      searchFormdata2: {},
      searchFormdata3: {},
      condition: {},
      pages: 10
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 获取数据
    onSubmit: function () {
      this.$request({
        method: 'GET',
        url: backend.cmisBiz + '/api/lmtinspectinfo/',
        data: {
          condition: this.searchFormdata
        }
      }).then(({res, message, data}) => {
        this.dataUrl = data;
      });
    },
    // 新增
    doAdd () {
      var _this = this;
      _this.pages = _this.pages + 1;
      _this.$router.addTab({
        // 路由名称
        name: 'bizmanage/chgBiz/area/lmtInspectInfoView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_lmtInspectInfoView' + _this.pages, // 必传
        // 页签名称
        title: '勘验信息录入页面',
        // 传递的业务数据，可选配置
        data: {pages: _this.pages

        }
      });
    },
    // 修改操作
    // editFn () {
    //   var _this = this;
    //   if (_this.$refs.refTable.selections.length != 1) {
    //     this.$message({ message: '请先选择一条记录', type: 'warning' });
    //     return;
    //   }
    //   // console.log(this.$refs.refTable.selections[0].pvpSerno);
    //   var pvpSerno = _this.$refs.refTable.selections[0].pvpSerno;
    //   _this.$router.addTab({
    //   // 路由名称
    //     name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage', // 菜单路径
    //     // 自定义唯一页签key,请统一使用custom_前缀开头
    //     key: 'customPvpLoanAppEdit', // 必传
    //     // key: 'custom_pvpLoanAppPage', // 必传
    //     // 页签名称
    //     title: '放款申请信息',
    //     // 传递的业务数据，可选配置
    //     data: {
    //       pageType: 2, // 修改,
    //       pvpSerno: pvpSerno,
    //       pageName: 'edit_' + pvpSerno
    //     }
    //   });
    // },
    // 查看操作
    // infoFn () {
    //   var _this = this;
    //   if (_this.$refs.refTable.selections.length != 1) {
    //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
    //     return;
    //   }
    //   var pvpSerno = _this.$refs.refTable.selections[0].pvpSerno;
    //   _this.$router.addTab({
    //   // 路由名称
    //     name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage', // 菜单路径
    //     // 自定义唯一页签key,请统一使用custom_前缀开头
    //     key: 'custom_info_' + pvpSerno, // 必传
    //     // key: 'custom_pvpLoanAppPage', // 必传
    //     // 页签名称
    //     title: '放款申请信息',
    //     // 传递的业务数据，可选配置
    //     data: {
    //       pageType: 1, // 查看,
    //       pvpSerno: pvpSerno,
    //       pageName: 'info_' + pvpSerno
    //     }
    //   });
    // },
    // 删除操作
    deleteFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var inspectSerno = _this.$refs.refTable.selections[0].inspectSerno;
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtinspectinfo/delete/' + inspectSerno
          // data: _this.$refs.refTable.selections[0].inspectSerno
        }).then(({code, message, data}) => {
          if (code == 0) {
            this.$message({ message: message, type: 'success' });
            this.$refs.refTable.remoteData();
          } else {
            // 操作失败
            this.$message({ message: message, type: 'warning' });
            this.$refs.refTable.remoteData();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
};
</script>
