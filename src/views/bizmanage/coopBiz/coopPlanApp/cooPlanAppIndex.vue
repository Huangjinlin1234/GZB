<template>
  <div>
  <d1-billlist ref="d1_BillList"></d1-billlist>
  </div>
</template>
<script>
import d1Billlist from './cooPlanApp_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      reflush: false
    };
  },
  mounted () {
    this.afterInit();
  },
  activated () {
    if (this.d1_BillList != null && this.reflush) {
      this.d1_BillList.queryDataByCondition();
    }
    this.reflush = true;

    const loginUser = this.$xutils.getLoginUserInfo();
    console.log('用户信息', loginUser);
  },
  methods: {
    batchPrint () {
      // this.$xutils.showMsgBox('提示', '待开发');
    },
    /**
      * 合作方案申请
      * author yumeng@yusys.com.cn
      * date 2021-04-15
      **/
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },
    /**
      * 新增按钮，打开新增向导页面
      **/
    insertFn () {
      this.$dialog.open(
        '合作方案管理-新增向导',
        'bizmanage/coopBiz/coopPlanApp/cooPlanAppAddIndex',
        460,
        450,
        null,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },
    /**
      * 修改按钮，打开合作方案详情页面
      **/
    updateFn () {
      const param = this.d1_BillList.$refs.refTable.selections[0];
      if (!param) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      let apprStatus = param.apprStatus;
      let inputId = param.inputId;// 登记人
      if (!(apprStatus == '000' || apprStatus == '992') || (inputId != this.$xutils.getLoginUserInfo().loginCode && param.managerId != this.$xutils.getLoginUserInfo().loginCode)) {
        this.$xutils.showMsgBox('提示', '只能修改审批状态为【待发起】、【退回】且登记人是自己的合作方准入申请！');
        return;
      }
      let _this = this;
      let name = 'bizmanage/coopBiz/coopPlanApp/cooPlanAppInfo';
      let key = 'cooPlanAppInfoUpdate' + new Date().getTime();
      param.op = 'edit';
      param.flag = '合作方';
      if (param.oprType != '1') {
        param.isFromAppChangeMenu = true;
      }
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '合作方案准入申请-修改',
        // 传递的业务数据，可选配置
        data: param
      });
    },
    viewFn: function () {
      const param = this.d1_BillList.$refs.refTable.selections[0];
      if (!param) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      let _this = this;
      let name = 'bizmanage/coopBiz/coopPlanApp/cooPlanAppInfo';
      let key = 'cooPlanAppInfoView' + new Date().getTime();
      param.op = 'details';
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '合作方案准入申请-查看',
        // 传递的业务数据，可选配置
        data: param
      });
    },
    /**
       *删除，删除合作方案
       **/
    deleteFn () {
      const _this = this;
      const param = _this.d1_BillList.$refs.refTable.selections[0];
      if (!param) {
        _this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      // 登记人与责任人都不是当前登录人，则不允许删除
      if (param.inputId != _this.$xutils.getLoginUserInfo().loginCode && param.managerId != _this.$xutils.getLoginUserInfo().loginCode) {
        _this.$xutils.showMsgBox('提示', '经办人非当前用户,不能删除');
        return false;
      }
      // 审批状态为退回或待发起的状态方可删除
      if (param.apprStatus != '000' && param.apprStatus != '992') {
        _this.$xutils.showMsgBox('提示', '当前审批状态不能删除');
        return false;
      }
      let url = _this.$backend.cmisBiz + '/api/coopplanapp/batchdelete/' + param.serno;
      if(param.apprStatus === '992'){
        url = _this.$backend.cmisBiz + '/api/coopplanapp/update';
        param.apprStatus = '996';
      }
      // 调用后端服务删除操作,异步请求
      _this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          const serno = param.serno;
          _this.$xutils.request({
            url: url,
            data: JSON.stringify(_this.$xutils.toUpperCase(param, true)),
            type: 'POST',
            async: true,
            success: (response, status, xhr) => {
              if (response.code == 0) {
                _this.$xutils.showMsgBox('提示', '删除成功', '300', '150', () => {
                  // 删除成功后刷新列表
                  _this.d1_BillList.queryDataByCondition();
                });
              }
            }
          });
        }
      });
    }
  }
};
</script>
