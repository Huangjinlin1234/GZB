<template>
  <div>
  <plan-acc-info-list ref="planAccInfoList"></plan-acc-info-list>
  </div>
</template>
<script>
import planAccInfoList from './cooPlanAccInfoList.vue';
export default {
  components: {planAccInfoList},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      planAccInfoList: null
    };
  },
  mounted () {
    this.planAccInfoList = this.$refs.planAccInfoList;
  },
  methods: {
    viewFn: function () {
      const param = this.planAccInfoList.getSelectedRowData();
      if (!param) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      let _this = this;
      let name = 'bizmanage/coopBiz/coopPlanAccInfo/cooPlanAccInfo';
      let key = 'cooPlanAccInfo';
      param.op = 'details';
      param.isFromAccMenu = true;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '合作方准入台账-查看',
        // 传递的业务数据，可选配置
        data: param
      });
    },
    batchPrint () {
      var _this = this;
      const params = this.planAccInfoList.getSelectedRowData();
      if (!params) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      // 获取批复编号
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyacc/',
        data: {
          condition: JSON.stringify({
            coopPlanNo: params.coopPlanNo
          })
        },
        type: 'GET',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            if (response.data != null && response.data.length > 0) {
              let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
              let keydemo = 'frptdemohzfzhrppf';
              params.src = _this.$backend.frptRptService + 'hzfzhrppf.cpt&reply_no=' + response.data[0].replyNo;
              _this.$router.addTab({
              // 路由名称
                name: name,
                key: keydemo, // 必传
                // 页签名称
                title: '合作方准入批复审批表',
                // 传递的业务数据，可选配置
                data: params
              });
            }
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    }
  }
};
</script>
