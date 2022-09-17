<template>
  <div>
    <yu-panel title="客户及关联人信息表" :hideFilter="false" :collapseHide="false">>
      <template slot="right">
        <yu-button-drop>
          <!-- <yu-button type="primary" ref="btn_allView" @click="customClick('allView')">360视图</yu-button> -->
          <yu-button type="primary" ref="btn_cusDetail" @click="customClick('cusDetail')">客户详情查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="false" :base-params="baseParams"  request-type="post">
        <yu-xtable-column label="与客户关系" prop="borrowRel" data-code="STD_BORROW_REL"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName">
            <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
            </template>
        </yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="管户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="管户机构" prop="managerBrIdName" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_SELFPER_REL_TYP,STD_BORROW_REL');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/selectCreditInfoByCrqlSerno',
      // baseParams: {cusId: this.$route.meta.params.borrowerCusId},
      // baseParams: {cusId: this.$route.meta.params.cusId || this.getFactory().contextData.cusId},
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditqrybizreal/delete/'
    };
  },
  mounted () {
    let params = {};
    if (this.getFactory().contextData != null) {
      if (this.getFactory().contextData.biz_serno != null) {
        params['bizSerno'] = this.getFactory().contextData.biz_serno;
      } else if (this.getFactory().contextData.iqpSerno != null) {
        params['bizSerno'] = this.getFactory().contextData.iqpSerno;
      } else if (this.getFactory().contextData.serno != null) {
        params['bizSerno'] = this.getFactory().contextData.serno;
      } else if (this.getFactory().contextData.bizGrpSerno != null) {
        // params['bizGrpSerno'] = this.getFactory().contextData.bizGrpSerno;
        params['bizSerno'] = this.getFactory().contextData.bizGrpSerno;
      }
    }
    if (this.$route.meta.params != null) {
      if (this.$route.meta.params.biz_serno != null) {
        params['bizSerno'] = this.$route.meta.params.biz_serno;
        params['period'] = this.$route.meta.params.period;
      } else if (this.$route.meta.params.iqpSerno != null) {
        params['bizSerno'] = this.$route.meta.params.iqpSerno;
        params['period'] = this.$route.meta.params.period;
      } else if (this.$route.meta.params.serno != null) {
        params['bizSerno'] = this.$route.meta.params.serno;
        params['period'] = this.$route.meta.params.period;
      } else if (this.$route.meta.params.bizGrpSerno != null) {
        // params['bizGrpSerno'] = this.$route.meta.params.bizGrpSerno;
        params['bizSerno'] = this.$route.meta.params.bizGrpSerno;
      }
    }
    params['qryCls'] = '';
    this.baseParams = { condition: JSON.stringify(params)};
  },
  methods: {
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
