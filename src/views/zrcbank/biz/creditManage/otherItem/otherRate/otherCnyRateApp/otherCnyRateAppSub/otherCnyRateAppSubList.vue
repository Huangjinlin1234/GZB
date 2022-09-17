<template>
  <!--
    @created by qiantj 2020-06-07
    @description 人民币利率定价申请定价权限表
  -->
  <div>
    <yu-panel panel-type="simple" title="人民币利率定价权限列表">
      <yu-button-drop style="margin-bottom:10px;" >
        <yu-button type="primary"  @click="addFn"  v-show="saveBtnShow">新增</yu-button>
        <yu-button type="primary" @click="modifyFn"  v-show="saveBtnShow">修改</yu-button>
        <yu-button type="primary" @click="deleteFn"  v-show="saveBtnShow">删除</yu-button>
        <yu-button type="primary" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="otherCnyRateAppSubTable" condition-key="condition" selection-type="radio" row-number request-type="GET" :default-load="false" :data-url="dataUrl">
        <yu-xtable-column label="权限表类型 " prop="rateAppType" data-code="STD_RATE_APP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="贷款类型" prop="rateLoanType" data-code="STD_RATE_LOAN_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup, clone} from '@/utils';
lookup.reg('STD_RATE_APP_TYPE,STD_RATE_LOAN_TYPE');
export default {
  name: 'otherCnyRateAppSubList',
  props: {
    pageParams: Object,
  },
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/othercnyrateappsub/',
      // pageParams: {},
      saveBtnShow: true,
      op:''
    };
  },
  created() {
    //判断是否为列表页面打开
    if (this.pageParams.serno == null || this.pageParams.serno == undefined){
      this.pageParams = this.$route.params.data;
      this.op = this.$route.params.op;
    }else{
      //流程审批页面打开
      this.op = this.pageParams.op;
    }
  },
  mounted(){
    console.log("pageParams----===>", this.pageParams);
     // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshOtherCnyRateAppSubTable', this.refreshOtherCnyRateAppSubTable);
    let _this = this;
    const userInfo = _this.$xutils.getLoginUserInfo();// 获取登陆人信息
    _this.loginInfo = userInfo;
    // _this.pageParams = _this.$route.params.data;
    //控制按钮
    if (_this.op == 'VIEW') {
         _this.saveBtnShow = false;
    }
    //加载列表
    this.reloadTable();
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshOtherCnyRateAppSubTable');
  },
  methods: {
    addFn: function() {
      var _this = this;
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppSub/otherCnyRateAppSubGuide';
      _this.$dialog.open('人民币利率定价权限新增向导页面', url, -1, -1, _this.pageParams, () => {_this.reloadTable()});
    },
    modifyFn: function(){
      var _this = this;
      if (_this.$refs.otherCnyRateAppSubTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherCnyRateAppSubTable.selections[0];
      var obj = {};
      clone(selection, obj);
      /*
      * 跳转到修改页面
      */
      obj['op'] = 'EDIT';
      var dateNow = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppSub/otherCnyRateAppSubInfo_' + selection.rateAppType;
      let date = _this.$xutils.dateFormat('yyyyMMddhhmmssSSS', new Date());
      this.$router.addTab({
        // 路由名称
        name: url, // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_OtherCnyRateAppSub_EDIT_' + date, // 必传
        // 页签名称
        title: '人民币利率定价权限详情',
        // 传递的业务数据，可选配置
        data: obj,
      });
    },
    infoFn: function() {
      var _this = this;
      if (_this.$refs.otherCnyRateAppSubTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherCnyRateAppSubTable.selections[0];
      var obj = {};
      clone(selection, obj);
      /*
      * 跳转到修改页面
      */
      obj['op'] = 'VIEW';
      var dateNow = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppSub/otherCnyRateAppSubInfo_' + selection.rateAppType;
      let date = _this.$xutils.dateFormat('yyyyMMddhhmmssSSS', new Date());
      this.$router.addTab({
        // 路由名称
        name: url, // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_OtherCnyRateAppSub_' + date, // 必传
        // 页签名称
        title: '人民币利率定价权限详情',
        // 传递的业务数据，可选配置
        data: obj,
      });
    },
    deleteFn: function() {
      var _this = this;
      if (_this.$refs.otherCnyRateAppSubTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            var selection = _this.$refs.otherCnyRateAppSubTable.selections[0];
            var url = _this.$backend.cmisBiz + '/api/othercnyrateappsub/updateAll/' + selection.subSerno;
            _this.$xutils.request({
              // 同步请求
              async: false,
              url: url,
              success: (response, status, xhr) => {
                if (response.code == '0') {
                    _this.$message('删除成功');
                    _this.refreshOtherCnyRateAppSubTable();
                } else {
                  _this.$message('删除失败');
                }
              },
              error: (result, b) => {
                _this.$message('删除失败');
              }
            });
          }
        }
      });

    },
    reloadTable: function() {
      var _this = this;
      console.log('_this.pageParams-->', _this.pageParams);
      this.$refs.otherCnyRateAppSubTable.remoteData({condition: {oprType: '01', serno: _this.pageParams.serno}});
    },
    refreshOtherCnyRateAppSubTable: function() {
      var _this = this;
      _this.$refs.otherCnyRateAppSubTable.remoteData();
    }
  }
};
</script>
