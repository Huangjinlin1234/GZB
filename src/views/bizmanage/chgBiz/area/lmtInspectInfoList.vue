
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——tab页签+查询
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待办任务" name="1">
      </yu-tab-pane>
      <yu-tab-pane label="在办任务" name="2">
      </yu-tab-pane>
      <yu-tab-pane label="办结任务" name="3">
      </yu-tab-pane>


    </yu-tabs>
      <div>
        <yu-panel title="" :hideFilter="true" :collapseHide="true">
          <!--          查询条件-->
          <template slot="right">
            <yu-button-drop show-length="9">
              <yu-button @click="doAdd" v-if="add">新增</yu-button>
              <yu-button @click="editFn"  v-if="add">修改</yu-button>
              <yu-button @click="deleteFn"  v-if="add">删除</yu-button>
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
          <yu-xtable index selection-type="radio" ref="refTable" request-type="POST" row-number :data-url="dataUrl" condition-key="condition" :base-params="params" >
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
        </div>
    </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_CERT_TYP');
export default {
  data: function () {
    return {
      // params: { condition: {whData: '000', approveStatus: '000', belgLine: '01'}}, // 申请列表固定查询条件
      // params2: { condition: {whData: '111,200,992,996,997', belgLine: '01'}}, // 申请历史列表固定查询条件
      dataUrl: backend.cmisBiz + '/api/lmtinspectinfo/selectbymodel',
      activeName: '1',
      searchFormdata: {}, // 查询条件框
      params: {condition: {inspectStatus: '01', oprType: '01', inputId: this.$store.state.oauth.loginCode}},
      pages: 10,
      add: true
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
      if (tab.name == '1') {
        this.add = true;
        this.params.condition.inspectStatus = '01';
        this.$refs.refTable.remoteData();
      } else if (tab.name == '2') {
        this.add = false;
        this.params.condition.inspectStatus = '02';
        this.$refs.refTable.remoteData();
      } else if (tab.name == '3') {
        this.add = false;
        this.params.condition.inspectStatus = '03';
        this.$refs.refTable.remoteData();
      }
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
      _this.$router.addTab({
        // 路由名称
        name: 'bizmanage/chgBiz/area/lmtInspectInfoView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_lmtInspectInfoView' + _this.pages, // 必传
        // 页签名称
        title: '勘验信息录入页面',
        // 传递的业务数据，可选配置
        data: {
          pageType: 1 // 新增,
        },
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    },
    // 修改操作
    editFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请选择一条记录', type: 'warning' });
        return;
      }
      var params = _this.$refs.refTable.selections[0];
      _this.$router.addTab({
      // 路由名称
        name: 'bizmanage/chgBiz/area/lmtInspectInfoView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_lmtInspectInfoView', // 必传
        // key: 'custom_pvpLoanAppPage', // 必传
        // 页签名称
        title: '勘验信息修改页面',
        // 传递的业务数据，可选配置
        data: {
          params: params,
          pageType: 2 // 修改,
        }
      });
    },
    // 查看操作
    infoFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请选择一条记录', type: 'warning' });
        return;
      }
      var params = _this.$refs.refTable.selections[0];
      _this.$router.addTab({
      // 路由名称
        name: 'bizmanage/chgBiz/area/lmtInspectInfoView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_lmtInspectInfoView', // 必传
        // key: 'custom_pvpLoanAppPage', // 必传
        // 页签名称
        title: '勘验信息修改页面',
        // 传递的业务数据，可选配置
        data: {
          params: params,
          pageType: 0 // 查看,
        }
      });
    },
    // 删除操作
    deleteFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var params = _this.$refs.refTable.selections[0];
      params.oprType = '02';
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtinspectinfo/saveandupdate',
          data: params
        }).then(({code, message, data}) => {
          if (data == '1') {
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
