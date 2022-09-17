<template>
  <div>
    <yu-panel title="个人客户信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="客户分类" ctype="select" placeholder="客户分类" name="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId"  @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="管户客户经理工号" ctype="input" placeholder="管户客户经理" name="managerId" ></yu-xform-item>
          <yu-xform-item label="客户状态" ctype="select" placeholder="客户状态" name="cusState" data-code="STD_CUS_STATE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_do360View" v-if="checkCtrl('360view')" @click="customClick('do360View')" hidden>360视图</yu-button>
        <yu-button type="primary" ref="btn_doQuery" v-if="checkCtrl('view')" @click="customClick('doQuery')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId" width="140">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="140">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="证件类型 " prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="管户客户经理工号" prop="managerId" width="140"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_CUS_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dicOptions: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusindiv/queryCusIndiv',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusindiv/delete/'
    };
  },
  methods: {
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      // 只可以查看本机构用户
      if (data.managerBrId != this.$store.state.oauth.org.code) {
        this.$xutils.showMsgBox('非本机构用户无法查看！');
        return;
      }
      var _this = this;
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = data.cusId;
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView' + new Date().getTime();
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