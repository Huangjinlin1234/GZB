<template>
  <div>
    <div style="height:30%">
      <div>
        <div style="height:calc(100% - 30%)">
          <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
        </div>
        <div style="height:calc(100% - 70%)">
         <!--<d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>-->
      <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number selection-type="radio" :pageable="true" :data="bailaccinfo" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="保证金账号" prop="bailAccNo"></yu-xtable-column>
        <yu-xtable-column label="保证金币种" prop="bailCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="accobName"></yu-xtable-column>
        <yu-xtable-column label="保证金计息方式" prop="bailInterestMode"  data-code="STD_BAIL_INTEREST_MODE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
        </div>
        <div style="height:70%">
          <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './ctrTfLocContBasic_d1_A_BillCard.vue';
import d1BBBillcard from './ctrTfLocContBasic_d1_B_B_BillCard.vue';
import d1BABilllist from './ctrTfLocContBasic_d1_B_A_BillList.vue';
// 开证合同修改页面
// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;

// 定义流程页面标识，用于区分流程进入与申请页面进入
let wfFlag = false;

let nodeFlag;

// 合同类型 2最高额合同1一般合同
let contType;

export default {
  components: { d1ABillcard, d1BBBillcard, d1BABilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/bailaccinfo/',
      baseParams: {},
      bailaccinfo: [],
      d1_A_BillCard: null,
      d1_B_B_BillCard: null,
      d1_B_A_BillList: null
    };
  },
  mounted () {
    // 合同类型 2最高额合同1一般合同
    var _this = this;
    var data = {};
    var contType = '';
    var serno = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.param.contSerno;
      contType = data.contType;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      serno = data.serno;
    } else if (_this.getFactory().contextData) {
      nodeFlag = this.getFactory().contextData.nodeFlag;
      data = _this.getFactory().contextData;
      serno = data.bizSerno;
      contType = data.contType;
    }
    this.baseParams = { serno: serno};
    this.getAllBailData(this.baseParams);
    _this.AfterInit(serno, contType);
  },
  methods: {
    AfterInit (serno, contType) {
      this.checkWfPage();
      this.initWfStatus();
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;
      this.d1_A_BillCard.queryDataByCondition({ serno: serno });
      // this.d1_B_A_BillList.queryDataByCondition({ serno: this.getFactory().contextData.bizSerno });
      this.d1_B_B_BillCard.queryDataByCondition({ serno: serno });
      this.initBillCard();

      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_A_BillCard.getBillCardValue());

      this.getFactory().triggerAction(this.d1_B_B_BillCard.getBillCardValue());

      // 加载工具js TODO
      // this.$xutils.importJsOrderBy(["/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js"], 0, null);

      // 最高额合同
      if (contType == '2') {
        // 贸易合同号
        this.d1_A_BillCard.setBillCardItemVisible('tcont_no', false);

        // 溢装比例
        this.d1_A_BillCard.setBillCardItemVisible('floodact_perc', false);

        // 货物名称
        this.d1_A_BillCard.setBillCardItemVisible('goods_name', false);

        // 受益人名称
        this.d1_A_BillCard.setBillCardItemVisible('beneficiar_name', false);
      }

      const guarMode = this.d1_A_BillCard.getItemValue('guar_mode');

      if (guarMode != '10') {
        this.d1_A_BillCard.setBillCardItemVisible('is_ol_pld', false);
      }

      const isRenew = this.d1_A_BillCard.getItemValue('is_renew');

      if (isRenew == 'N') {
        this.d1_A_BillCard.setBillCardItemVisible('origi_cont_no', false);
        this.d1_A_BillCard.setBillCardItemRequired('origi_cont_no', false);

        // 隐藏后清空原有数据值
        this.d1_A_BillCard.setBillCardItemClearValue('origi_cont_no');
      }

      // 页面录入框下拉框绑定onchange事件
      this.d1_A_BillCard.addEditChangeAction(this.isBasicChange);
    },

    getAllBailData: function (baseParams) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/getList/',
        data: baseParams,
        callback: function (code, message, response) {
          _this.bailaccinfo = response.data;
        }
      });
    },
    // 判断是否流程进入页面
    initWfStatus () {
      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          wfFlag = true;
          this.getFactory().contextData.wfFlag = wfFlag;

          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            // 将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.iqpSerno = this.getFactory().contextData.flowData.instanceInfo.bizId;

            // 隐藏按钮
            this.getFactory().setButtonVisiable('commit', false);

            this.getFactory().setButtonVisiable('save', false);
            this.getFactory().setButtonVisiable('tempSave', false);
            this.getFactory().setButtonVisiable('back', false);
          }
        }
      }
    },

    // onchang事件，若“是否续签合同 = 是”,则展示  “原合同编号”字段，否则隐藏不展示
    isBasicChange (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'isRenew' && newVal == 'N') {
        thisCard.setBillCardItemVisible('origi_cont_no', false);
        thisCard.setBillCardItemRequired('origi_cont_no', false);

        // 隐藏后清空原有数据值
        thisCard.setBillCardItemClearValue('origi_cont_no');
      } else if (itemKey == 'isRenew' && newVal == 'Y') {
        thisCard.setBillCardItemVisible('origi_cont_no', true);
        thisCard.setBillCardItemRequired('origi_cont_no', true);
      }
    },

    // 判断是否为流程进入页面
    checkWfPage () {
      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          wfFlag = true;
          this.getFactory().contextData['wfFlag'] = wfFlag;

          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            // 将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.serno = this.getFactory().contextData.flowData.instanceInfo.bizId;

            this.getFactory().contextData.bizSerno = this.getFactory().contextData.flowData.instanceInfo.bizId;

            // 隐藏按钮
            this.getFactory().setButtonVisiable('commit', false);

            this.getFactory().setButtonVisiable('save', false);
            this.getFactory().setButtonVisiable('tempSave', false);
            this.getFactory().setButtonVisiable('back', false);
          }
        }
      }
    },

    // 初始化表单
    initBillCard () {
      // 判断页面是否为查看页面或流程进入的页面
      if (nodeFlag == '3') {
      } else {
        if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
          this.d1_A_BillCard.setBillCardItemRequired('*', false);
          this.d1_A_BillCard.setBillCardItemEditable('*', false);
          this.d1_B_B_BillCard.setBillCardItemRequired('*', false);
          this.d1_B_B_BillCard.setBillCardItemEditable('*', false);
          this.d1_B_A_BillList.setBillListButtonVisable('新增', false);
          this.d1_B_A_BillList.setBillListButtonVisable('删除', false);
        }
      }

      // 页面录入框下拉框绑定onchange事件
      this.d1_A_BillCard.addEditChangeAction(this.isBasicChange);
    }

  }
};
</script>
