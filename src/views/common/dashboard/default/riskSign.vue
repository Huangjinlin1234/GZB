<template>
  <!--
    @created by tangxun 2021-06-11
    @updated by
    @description 页面
  -->
  <yu-panel panel-type="normal">
    <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTable">
      <yu-xform-group :column="3">
        <yu-xform-item label="客户编号" placeholder="客户编号" name="custId" ctype="input"></yu-xform-item>
        <yu-xform-item label="客户名称" placeholder="客户名称" name="custName" ctype="input"></yu-xform-item>
        <yu-xform-item label="预警单编号" placeholder="预警单编号" name="riskId" ctype="input" ></yu-xform-item>
        <yu-xform-item label="预警信号来源" placeholder="预警信号来源" name="signSource" ctype="input" ></yu-xform-item>
        <yu-xform-item label="预警日期" placeholder="预警日期" name="riskDate" ctype="datepicker"></yu-xform-item>
        <yu-xform-item label="预警等级" placeholder="预警等级" name="riskLvl" ctype="input" ></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-xtable ref="refTable" request-type="POST" condition-key="condition" :pageable="true" style="margin-top:10px" row-number :data-url="url.riskNotice" :base-params="riskParam" :default-load="false">
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
      url: {
        riskNotice: `${backend.cmisBiz}/api/batbizrisksign/`
      },
      riskParam: {},
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
  created () {
    // 此处，可根据用户角色信息，动态绑定对应的组件
    // this.currentRole = 'DefaultDashboard'
  },
  mounted () {
    this.riskParam = { condition: { inputId: this.loginCode }};
  },
  methods: {
    /** 打开详情页面 */
    infoFn () {
      let _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
    },
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      var _this = this;
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = data.cusId;
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView';
      title = '个人客户查看';
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
    }
  }
};
</script>
