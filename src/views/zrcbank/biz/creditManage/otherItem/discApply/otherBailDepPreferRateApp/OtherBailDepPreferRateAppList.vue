
<template>
  <!--
    @created by lixm 2021-06-11
    @description 保证金存款特惠利率申请信息-列表
  -->
  <div>
    <yu-panel panel-type="simple" title="输入查询条件">
      <yu-xform related-table-name="otherBailDepPreferRateAppTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="审批表编号" placeholder="审批表编号 " name="serno" ctype="input" clearable></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel panel-type="simple" title="保证金存款特惠利率申请列表">
      <yu-button-drop style="margin-bottom:10px;" >
        <yu-button type="primary" v-if="checkCtrl('add')"  @click="addFn">新增</yu-button>
        <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="otherBailDepPreferRateAppTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="审批表编号 " prop="serno"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" :formatter="auditSatusFormatter"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import {lookup} from '@/utils';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
lookup.reg('STD_ZB_APPR_STATUS');
export default {
  name: 'OtherBailDepPreferRateAppList',
  components: {yufpNwfInit},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/otherbaildeppreferrateapp/getotherbaildeppreferrateapp',
      searchFormdata: {
        cusName: '',
        cusId: '',
        serno: ''
      },
      formDisabled: false
    };
  },
  mounted: function () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshOtherBailDepPreferRateAppTable', this.refreshOtherBailDepPreferRateAppTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshOtherBailDepPreferRateAppTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshOtherBailDepPreferRateAppTable: function () {
      let _this = this;
      _this.$refs.otherBailDepPreferRateAppTable.remoteData();
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
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      let path = 'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '新增保证金存款特惠利率申请信息',
        data: {
          name: _this.$route.name,
          actionType: 'ADD', // 操作类型
          data: {}
        }
      });
    },
    /**
     * 修改按钮
     */
    modifyFn: function () {
      let _this = this;
      let selData = _this.$refs.otherBailDepPreferRateAppTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selData[0].approveStatus == '000' || selData[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '修改保证金存款特惠利率申请信息',
        data: {
          name: this.$route.name,
          actionType: 'EDIT', // 操作类型
          data: selData[0]
        }
      });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.otherBailDepPreferRateAppTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selections[0].approveStatus == '000' || selections[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
          type: 'warning'
        });
        return;
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/otherbaildeppreferrateapp/deleteInfo/' + selections[0].serno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (selections[0].approveStatus == '992') {
                    _this.$message({ message: '自行退出成功！', type: 'info'});
                  } else {
                    _this.$message({ message: '数据删除成功！', type: 'info'});
                  }
                  _this.$refs.otherBailDepPreferRateAppTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },
    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.otherBailDepPreferRateAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看保证金存款特惠利率申请信息',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    }
    /**
     * 提交按钮
    submitFn: function() {
      var _this = this;
      if (_this.$refs.otherForRateAppTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.otherForRateAppTable.selections[0];

      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      startdto.bizType = 'OTHER_FOR_RATE_APP';
      startdto.bizId = obj.serno;
      startdto.bizUserName = obj.cusName;
      startdto.bizUserId = obj.cusId;
      startdto.param = {};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    }
    */
  }
};
</script>
