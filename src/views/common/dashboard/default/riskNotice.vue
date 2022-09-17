<template>
  <!--
    @created by tangxun 2021-06-11
    @updated by
    @description 页面
  -->
  <yu-panel panel-type="normal">
    <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTable" v-model="formdata">
      <yu-xform-group :column="3">
        <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
        <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
        <yu-xform-item label="提示类型" placeholder="提示类型" name="messageType" ctype="select" data-code="STD_WB_RISK_MESSAGE_TYPE" @change="selectType"></yu-xform-item>
        <yu-xform-item label="业务类型" placeholder="业务类型" name="busiCls" ctype="select" :options="busiType"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <template slot="right">
      <yu-button-drop>

      </yu-button-drop>
    </template>
    <yu-xtable ref="refTable" request-type="POST" condition-key="condition" :pageable="true"  style="margin-top:10px" row-number :data-url="url.riskNotice" :base-params="riskParam" :default-load="false">
        <yu-xtable-column label="提示类型" prop="messageType" data-code="STD_WB_RISK_MESSAGE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="业务编号" prop="lwaSerno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="busiCls" data-code="SID_RISK_TIP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId">
         <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="操作">
        <template slot-scope="scope">
              <yu-button  @click="openDetailsPage(scope.row)" type="text">查看详情</yu-button>
          </template>
        </yu-xtable-column>
    </yu-xtable>
  </yu-panel>
</template>

<script>
import { mapGetters } from 'vuex';
yufp.lookup.reg('SID_RISK_TIP_TYPE');
export default {
  data () {
    return {
      url: {
        riskNotice: `${backend.cmisCfg}/api/wbrisknotice/`,
        msgNotice: `${backend.cmisCfg}/api/wbmsgnotice/`,
        prbcomm: `${backend.cmisCfg}/api/wbprbcomm/`
      },
      riskParam: {},
      busiType: [],
      busiType1: [{key: '01', value: '单一客户授信'}, {key: '02', value: '集团客户授信'}, {key: '03', value: '同业客户授信'}, {key: '04', value: '资金业务授信'}, {key: '05', value: '小微客户授信'}],
      busiType2: [{key: '06', value: '最高额授信协议'}, {key: '07', value: '普通贷款合同/贸易融资合同/福费廷合同 '}, {key: '10', value: '贴现协议'}, {key: '11', value: '开证合同'}, {key: '12', value: '银承合同'}, {key: '13', value: '保函合同'}, {key: '14', value: '委托贷款合同'}, {key: '15', value: '担保合同'}],
      busiType3: [{key: '16', value: '贷款台账'}, {key: '17', value: '开证台账'}, {key: '18', value: '银承台账'}, {key: '19', value: '保函台账'}, {key: '20', value: '贴现台账'}, {key: '21', value: '委托贷款台账'}],
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
    this.riskParam = { condition: { managerId: this.loginCode }, sort: 'endDate desc' };
  },
  methods: {
    /** 打开详情页面 */
    openDetailsPage (data) {
      switch(data.busiCls) {
        case '01':
          // 单一客户授信
          this.$router.addTab({
            // 路由名称
            name: 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyAccDetail',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: 'lmtReplyAccDetail', // 必传
            // 页签名称
            title: '批复详情',
            data: {
              accNo: data.lwaSerno
            }
          });
          break;
        case '11':
          // 开证合同
          let jsoPar = {};
          jsoPar.opType = 'view';
          jsoPar.bizOp = 'VIEW';
          jsoPar.model_group_no = 'CMG000406';
          jsoPar.bizSerno = data.bizSerno;
          jsoPar.bizType = 'ctr';
          jsoPar.bizContNo = data.lwaSerno;

          this.$router.addTab({
            // 路由名称
            name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: 'custom_' + data.lwaSerno, // 必传
            // 页签名称
            title: '开证合同',
            data: jsoPar
          });
          break;
        case '12':
          let paramsYcht = {}
           // 银承合同模块
          paramsYcht['model_group_no'] = 'CMG000435';
          paramsYcht['op'] = 'VIEW';
          paramsYcht['bizContNo'] = data.lwaSerno;
          paramsYcht['contNo'] = data.lwaSerno;
          paramsYcht['serno'] = data.bizSerno;

          this.$router.addTab({
            // 路由名称
            name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: 'custom_' + data.lwaSerno, // 必传
            // 页签名称
            title: '银承合同',
            data: paramsYcht
          });
          break;
        case '15':
          let paramsDbht = {}
           // 担保合同模块
          paramsDbht['model_group_no'] = 'GRT_GUAR_CONT_ADD';
          paramsDbht['op'] = 'VIEW';
          paramsDbht['guarContNo'] = data.lwaSerno;
          paramsDbht['guarPkId'] = data.bizPkid;

          //因担保合同页面元素渲染是取的合同列表中的值，不是通过合同编号查回来的
          this.$dialog.open(
            '',
            'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
            -1,
            -1,
            paramsDbht,
            '',
            true,
            true
          );
          break;
        case '16':
          let paramsDktz = {}
           // 贷款台账模块
          paramsDktz['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
          paramsDktz['op'] = 'VIEW';
          paramsDktz['bill_no'] = data.lwaSerno;
          paramsDktz['billNo'] = data.lwaSerno;
          
          paramsDktz['pkId'] = data.bizPkid

          this.$dialog.open(
            '贷款台账',
            'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
            -1,
            -1,
            paramsDktz
          );
          // this.$router.addTab({
          //   // 路由名称
          //   name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          //   // 自定义唯一页签key,请统一使用custom_前缀开头
          //   key: 'custom_' + data.lwaSerno, // 必传
          //   // 页签名称
          //   title: '贷款台账',
          //   data: paramsDktz
          // });
          break;
        case '18':
          // 银承台账
          this.$router.addTab({

            name: 'cusmanage/indivCus/indivBankQuery/indivBankQueryDetail',
            key: 'indivBankQueryDetail' + data.lwaSerno, // 必传
            title: '银承台账详情',
            data: {
              coreBillNo: data.lwaSerno
            }
          });
          break;
        default:
          console.info('test================')
          break;
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
    },
    //选择业务
    selectType: function() {
      this.msgType = this.$refs.refForm.formdata.messageType
      if(this.msgType === '1') {
        this.busiType = Object.assign([], this.busiType1)
      } else if(this.msgType === '2') {
        this.busiType = Object.assign([], this.busiType2)
      } else {
        this.busiType = Object.assign([], this.busiType3)
      }
    }
  }
};
</script>
