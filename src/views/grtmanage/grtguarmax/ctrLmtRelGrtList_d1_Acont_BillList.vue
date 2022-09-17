<template>
  <div>
    <yu-panel title="保证人信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_viewDetail" @click="viewDetailFn">查看详情</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" request-type="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="保证编号" prop="guarantyId"></yu-xtable-column>
        <yu-xtable-column label="押品统一编号" prop="guarantyIdNew"></yu-xtable-column>
        <yu-xtable-column label="保证人客户编号" prop="cusId">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证方式 " prop="guaranteeType" data-code="STD_ZB_GUARANTEE_TY"></yu-xtable-column>
        <yu-xtable-column label="保证人类型" prop="cusTyp" data-code="STD_ASSURE_CUS_TYPE"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型 " prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt" :formatter="Currency"></yu-xtable-column>
       </yu-xtable>
    </yu-panel>    
  </div>  
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './ctrLmtRelGrtList_dialog_BillCard';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';
export default{
  name: 'D1ABillList',
  components: { dialogBillcard, guarBaseInfoView },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/querylistbyguarcontno',
      baseParams: {}
    };
  },

  mounted () {
    var _this = this;
    var data = {};
    var guarContNo = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      guarContNo = data.param.guarContNo;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      guarContNo = data.guarContNo;
    }
    _this.baseParams = {condition: {guarContNo: guarContNo}};
  },
  methods: {    
    viewDetailFn () {
      let selections = this.$refs.refTable.selections;
      let params;
      if (selections == null || selections.length < 1) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      params = selections[0];
      console.info('params---------------', JSON.stringify(params))
      if (!params || params.length === 0) {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      const dataParams = {
        op: 'view',
        grtFlag: '03',
        GuarWay: 'BZ',
        callMethod: 'tGuarDetailInfo',
        managerBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode'),
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        SystemNo: '01',
        guarNo: params.guarantyIdNew
      };
      this.$utils.clone(params[0], dataParams);
      const url = this.getGuarSysUrl(dataParams);
      window.open(url, '_black');
    },
    /*
      获取跳转押品系统url
       */
    getGuarSysUrl (params) {
      const rsPars = {};
      this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    },
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      this.getFactory().back(); // 关闭dialog弹框
      var _this = this;
      let json = {};
      if(data.cusTyp === '10002') {
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
      } else {
        json['cusId'] = data.cusId;
        json['modelGroupNo'] = 'CMG000296';
        json['viewType'] = 'VIEW';
        json['opType'] = 'view';
        // json['op_type'] = 'view';
        // this.$dialog.open("公司客户创建（正式）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        let key = 'formalCusMaintainA05View' + json.cusId + new Date().getTime();
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户查看',
          // 传递的业务数据，可选配置
          data: json
        });
      }
    }
  }  
};
</script>
