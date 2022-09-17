
<template>
  <!--
    @created by lixm 2021-06-03
    @description 人民币利率定价申请信息-列表
  -->
  <div>
    <yu-panel panel-type="simple" title="输入查询条件">
      <yu-xform related-table-name="otherCnyRateAppTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both" clearable></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号 " name="cusId" ctype="input" clearable></yu-xform-item>
          <yu-xform-item label="审批表编号" placeholder="审批表编号 " name="serno" ctype="input" clearable></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel panel-type="simple" title="人民币利率定价申请列表">
      <yu-button-drop style="margin-bottom:10px;" >
        <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
        <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="otherCnyRateAppTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="审批表编号 " prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" :formatter="auditSatusFormatter"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup, clone} from '@/utils';
lookup.reg('STD_ZB_APPR_STATUS');
export default {
  name: 'OtherCnyRateAppList',
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/othercnyrateapp/getothercnyrateapp',
      searchFormdata: {
        cusName: '',
        cusId: '',
        serno: ''
      },
      formDisabled: false
    };
  },
  mounted () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshOtherCnyRateAppTable', this.refreshOtherCnyRateAppTable);

    const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
    this.loginInfo = userInfo;
  },
  destoryed: function () {
    // 移除绑定表格刷新事件
    yufp.globalEventBus.$off('refreshOtherCnyRateAppTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshOtherCnyRateAppTable: function () {
      let _this = this;
      _this.$refs.otherCnyRateAppTable.remoteData();
    },
    /**
     * 审批状态格式化
     */
    auditSatusFormatter: function (row, column, cellValue) {
      const statusArr = lookup.find('STD_ZB_APPR_STATUS');
      const obj = statusArr.find((item, index) => {
        return item.key === cellValue;
      });
      return obj ? obj.value : '';
    },
    addFn: function () {
      var _this = this;
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/OtherCnyRateAppGuide';
      _this.$dialog.open('人民币利率定价申请新增向导页面', url, -1, -1, null, true, (params) => {
        _this.refreshOtherCnyRateAppTable();
      });
    },
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.otherCnyRateAppTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherCnyRateAppTable.selections[0];
      if (!(selection.approveStatus == '000' || selection.approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/OtherCnyRateAppInfo';
      let date = _this.$xutils.dateFormat('yyyyMMddhhmmssSSS', new Date());
      this.$router.addTab({
        // 路由名称
        name: url, // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_OtherCnyRateAppInfo_Edit' + date, // 必传
        // 页签名称
        title: '人民币利率定价申请详情',
        // 传递的业务数据，可选配置
        data: {
          name: _this.$route.name,
          op: 'EDIT',
          data: selection
        },
        afterTabClose: () => {
          // this.$refs.otherCnyRateAppTable.remoteData();
        }
      });
    },
    infoFn: function () {
      var _this = this;
      if (_this.$refs.otherCnyRateAppTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherCnyRateAppTable.selections[0];
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/OtherCnyRateAppInfo';
      let date = _this.$xutils.dateFormat('yyyyMMddhhmmssSSS', new Date());
      this.$router.addTab({
        // 路由名称
        name: url, // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_OtherCnyRateAppInfo_View_' + date, // 必传
        // 页签名称
        title: '人民币利率定价申请详情',
        // 传递的业务数据，可选配置
        data: {
          name: _this.$route.name,
          op: 'VIEW',
          data: selection
        },
        afterTabClose: () => {
          // this.$refs.otherCnyRateAppTable.remoteData();
        }
      });
    },
    deleteFn: function () {
      var _this = this;
      if (_this.$refs.otherCnyRateAppTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherCnyRateAppTable.selections[0];
      if (!(selection.approveStatus == '000' || selection.approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
          type: 'warning'
        });
        return;
      }
      var obj = selection;
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            var selection = _this.$refs.otherCnyRateAppTable.selections[0];
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/othercnyrateapp/updateAll/' + selection.serno,
              callback: function (code, message, response) {
                console.log(code + ':' + response);
                if (response.code == 0) {
                  _this.$refs.otherCnyRateAppTable.remoteData();
                  _this.$message('删除成功');
                } else {
                  _this.$message('删除失败');
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
