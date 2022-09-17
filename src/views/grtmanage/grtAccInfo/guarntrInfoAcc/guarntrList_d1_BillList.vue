<template>
  <div>
    <yu-panel title="保证人信息台账" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="保证编号" ctype="input" placeholder="保证编号" name="guarantyId"></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarantyIdNew"></yu-xform-item>
          <yu-xform-item label="保证人客户编号" ctype="input" placeholder="保证人客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="保证人名称" ctype="input" placeholder="保证人名称" fuzzy-query="both" name="assureName"></yu-xform-item>
          <yu-xform-item label="保证人证件类型" ctype="select" placeholder="保证人证件类型" name="cerType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="保证人证件号码" ctype="input" placeholder="保证人证件号码" name="assureCertCode"></yu-xform-item>
          <yu-xform-item label="保证方式 " ctype="select" placeholder="保证方式" name="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop>
          <yu-button type="primary" ref="btn_viewDetail" v-if="checkCtrl('view')" @click="customClick('viewDetail')">查看详情</yu-button>
          <!--<yu-button type="primary" @click="searchFfn">担保圈查询</yu-button>-->
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="searchData" request-type="POST" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="保证编号" prop="guarantyId"></yu-xtable-column>
        <yu-xtable-column label="押品统一编号" prop="guarantyIdNew"></yu-xtable-column>
        <yu-xtable-column label="保证人客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证方式 " prop="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xtable-column>
        <yu-xtable-column label="保证人类型" prop="cusTyp" data-code="STD_ASSURE_CUS_TYPE"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型 " prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt" :formatter="Currency"></yu-xtable-column>
        <!--<yu-xtable-column label="保证开始日期" prop="grtStartDate" hidden></yu-xtable-column>
        <yu-xtable-column label="押品所在业务阶段" prop="guarBusistate"></yu-xtable-column>
        <yu-xtable-column label="保证结束日期" prop="grtEndDate" hidden></yu-xtable-column>-->
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_GUARANTEE_TY,STD_ASSURE_CUS_TYPE');
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
export default{
  name: 'D1BillList',
  mixins: [mixinList, mixin],
  data: function () {
    return {
      searchData: {condition: {
        // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        // approveStatus: '000,992',
        // oprType: '01'
      }},
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/queryList',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/'
    };
  },
  methods: {
    searchFfn () {
      let _this = this;
      let params = _this.$refs.refTable.selections;
      if (params < 1) {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!请重新操作!',
          350,
          150
        );
        return;
      }
      _this.getToken(params[0]);
    },
    // 获取token
    getToken (params) {
      let _this = this;
      // 跳转智能图谱
      let model = {
        'username': 'xindai',
        'password': '123456'
      };
      // 获取token
      var url = _this.$backend.jumpKGGetTokenService;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == 0) {
            let accessToken = response.result.oauth2AccessToken.access_token;
            let tokenType = response.result.oauth2AccessToken.token_type;
            _this.getEntId(accessToken, tokenType, params.assureName, params.certCode);
          } else {
            _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!');
          }
        }
      });
    },

    getEntId (accessToken, tokenType, assureName, certCode) {
      let _this = this;
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let currentId = jsoUser['loginCode']; // 当前登录人
      let currentIdName = jsoUser['loginName'];// 当前登录人名称
      let orgCode = jsoUser['orgCode'];// 当前登录机构
      let orgCodeName = jsoUser['org'].name;// 当前登录机构名称
      let wsUser = 'zjgns-ssjk';// 征信提供的用户名
      // 获取企业ID
      let url = _this.$backend.jumpKGGetEndIdService;
      _this.$request({
        headers: {
          Key: 'authorization',
          Value: tokenType + accessToken
        },
        needToken: false,
        url: url,
        method: 'post',
        data: {'entName': assureName}
      }).catch((result) => {
        _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
      }).then((response) => {
        if (response && response.code == '0') {
          let entId = response.result;
          // 担保圈测试数据 794d3725-f702-11ea-8aa7-619d192f7573
          let url1 = _this.$backend.jumpKG360Service + entId + '/guaranteeCircle/dbq?token=' + accessToken +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        } else {
          _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
        }
      });
    }
  }
};
</script>