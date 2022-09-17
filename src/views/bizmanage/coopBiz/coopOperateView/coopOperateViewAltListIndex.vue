<template>
  <!--
    @created by tangxun 2021-06-11
    @updated by
    @description 页面
  -->
  <yu-panel title="预警信息列表" :collapseHide="false">
    <template slot="right">
      <yu-button-drop>
        <yu-button ref="btn_$query" @click="viewFn()">查看</yu-button>
      </yu-button-drop>
    </template>
    <yu-xtable ref="refTable" request-type="POST" condition-key="condition" selection-type="radio" :pageable="true" style="margin-top:10px" row-number :data-url="url" :base-params="baseParams" :default-load="false">
      <yu-xtable-column label="预警单编号" prop="riskId"></yu-xtable-column>
      <yu-xtable-column label="客户编号" prop="custId"></yu-xtable-column>
      <yu-xtable-column label="客户名称" prop="custName"></yu-xtable-column>
      <yu-xtable-column label="客户经理" prop="mainMgrName"></yu-xtable-column>
      <yu-xtable-column label="所属机构" prop="inputBrIdName"></yu-xtable-column>
      <yu-xtable-column label="预警信号来源" prop="signSource"></yu-xtable-column>
      <yu-xtable-column label="预警等级" prop="riskLvl"></yu-xtable-column>
      <yu-xtable-column label="预警日期" prop="riskDate"></yu-xtable-column>
      <yu-xtable-column label="预警状态" prop="riskStatus"></yu-xtable-column>
    </yu-xtable>
  </yu-panel>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      url: this.$backend.cmisBiz + '/api/batbizrisksign/',
      baseParams: {
        condition: {
          custId:this.$route.meta.params.cusId
        }
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
            picker.$emit('pick', [start, end]);
          }
        }]
      }

    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    this.$refs.refTable.remoteData();
  },
  methods: {
    viewFn: function () {
      const param = this.$refs.refTable.selections[0];
      if (!param) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      let _this = this;
      let name = 'bizmanage/coopBiz/coopWarn/coopWarnDetail';
      let key = 'coopWarnDetail' + new Date().getTime();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '预警信息查看',
        // 传递的业务数据，可选配置
        data: param
      });
    }
  }
};
</script>
