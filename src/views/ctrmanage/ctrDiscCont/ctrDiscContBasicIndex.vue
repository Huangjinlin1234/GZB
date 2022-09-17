<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './ctrDiscContBasic_d1_BillCard.vue';
// 贴现申请修改页面
// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;
// 定义流程页面标识，用于区分流程进入与申请页面进入
let wfFlag = false;
let nodeFlag;
// 贴现协议01一般贴现协议 02贴现额度协议
let discContType;
// 票据种类1银行承兑汇票 2商业承兑汇票
let drftType;
let selfPar = {};

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      debtInfo: false
    };
  },
  mounted () {
    nodeFlag = this.getFactory().contextData.nodeFlag;
    discContType = this.getFactory().contextData.discContType;
    drftType = this.getFactory().contextData.drftType;
    this.AfterInit(nodeFlag);
  },
  methods: {
    AfterInit () {
      this.checkWfPage();
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.initBillCard(nodeFlag);
      var data = {};
      var contNo = '';
      var op = '';
      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        contNo = data.param.contNo;
        op = 'VIEW';
      } else if (this.$route.meta.params) {
        data = this.$route.meta.params;
        contNo = data.contNo;
        op = data.op;
      } else if (this.getFactory().contextData) {
        data = this.getFactory().contextData;
        contNo = data.contNo;
        op = data.op;
      }
      if (op == 'VIEW') {
        this.d1_BillCard.isFormDisabled = true;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/ctrdisccont/queryctrdisccontdatabycontno',
        data: contNo
      })
        .then(response => {
          // 控制页签显隐处理
          this.getFactory().triggerAction(response.data);
          // 重置表单数据
          this.d1_BillCard.form.resetFields();
          // 给表单数据赋值
          this.$utils.clone(response.data, this.d1_BillCard.formdata);
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });

      // 模板工厂主页面数据加载成功事件
      // this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue()); // 没有d1_A_BillCard、d1_B_B_BillCard对象 add by liucheng3
      // this.getFactory().triggerAction(d1_A_BillCard.getBillCardValue());
      // this.getFactory().triggerAction(d1_B_B_BillCard.getBillCardValue());

      // 加载工具js TODO add by liucheng3
      // this.$xutils.importJsOrderBy(["/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js"], 0, null);

      // 银行承兑一般贴现
      if (discContType == '01' && drftType == '1') {
        this.d1_BillCard.setBillCardItemVisible('start_date', false);
        this.d1_BillCard.setBillCardItemVisible('end_date', false);
        this.d1_BillCard.setBillCardItemVisible('guar_mode', false);
        this.d1_BillCard.setBillCardItemVisible('pint_mode', false);
        this.d1_BillCard.setBillCardItemVisible('rqstr_reply_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_reply_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_cus_name', false);
        // this.d1_BillCard.setBillCardItemVisible('rqstr_lmt_limit_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_lmt_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_cus_id', false);
        this.d1_BillCard.debtInfo = false;
      }

      // 银行承兑贴现额度
      if (discContType == '02' && drftType == '1') {
        this.d1_BillCard.setBillCardItemVisible('is_atcf', false);
        this.d1_BillCard.setBillCardItemVisible('guar_mode', false);
        this.d1_BillCard.setBillCardItemVisible('pint_mode', false);
        this.d1_BillCard.setBillCardItemVisible('rqstr_reply_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_reply_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_cus_name', false);
        // this.d1_BillCard.setBillCardItemVisible('rqstr_lmt_limit_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_lmt_no', false);
        this.d1_BillCard.setBillCardItemVisible('acpt_crp_cus_id', false);
        this.d1_BillCard.debtInfo = false;
      }

      // 商业承兑一般贴现
      if (discContType == '01' && drftType == '2') {
        this.d1_BillCard.setBillCardItemVisible('cont_no', false);
        this.d1_BillCard.setBillCardItemVisible('start_date', false);
        this.d1_BillCard.setBillCardItemVisible('end_date', false);
        this.d1_BillCard.setBillCardItemVisible('lmt_acc_no', false);
        this.d1_BillCard.setBillCardItemVisible('reply_no', false);
      }

      const isRenew = this.d1_BillCard.getItemValue('is_renew');

      if (isRenew == 'N') {
        this.d1_BillCard.setBillCardItemVisible('origi_cont_no', false);
        this.d1_BillCard.setBillCardItemRequired('origi_cont_no', false);

        // 隐藏后清空原有数据值
        this.d1_BillCard.setBillCardItemClearValue('origi_cont_no'); // 没有thisCard对象 TODO  add by liucheng3
        // thisCard.setBillCardItemClearValue("origi_cont_no");
      }

      // 页面录入框下拉框绑定onchange事件
      this.d1_BillCard.addEditChangeAction(this.isBasicChange);
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
          this.d1_BillCard.setBillCardItemRequired('*', false);
          this.d1_BillCard.setBillCardItemEditable('*', false);
        }
      }

      // 页面录入框下拉框绑定onchange事件
      this.d1_BillCard.addEditChangeAction(this.isBasicChange);
    }

    // 获取打开的菜单栏tab对象
    // getOpenMenuTab(title) {
    //   const topwin = this.$xutils.getTopWindow();
    //   const openTabObj = $(topwin.document)
    //     .find("#TabBtnBar")
    //     .find("[data-menu_name=" + title + "]");
    //   return openTabObj;
    // }
  }
};
</script>
