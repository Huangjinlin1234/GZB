<template>
  <div>
    <div style="height:30%">
      <div>
        <div style="height:calc(100% - 30%)">
          <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
        </div>
        <div v-if="showList" style="height:calc(100% - 70%)">
          <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
        </div>
        <div style="height:70%">
          <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './ctrAccpContBasic_d1_A_BillCard.vue';
import d1BBBillcard from './ctrAccpContBasic_d1_B_B_BillCard.vue';
import d1BABilllist from './ctrAccpContBasic_d1_B_A_BillList.vue';
// 银承合同查看页面
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
      d1_A_BillCard: null,
      d1_B_B_BillCard: null,
      d1_B_A_BillList: null,
      showList: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var data = {};
      var contNo = '';
      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        contNo = data.param.contNo;
      } else if (this.$route.meta.params) {
        data = this.$route.meta.params;
        contNo = data.contNo;
      } else if (this.getFactory().contextData) {
        nodeFlag = this.getFactory().contextData.nodeFlag;
        contType = this.getFactory().contextData.contType;
        data = this.getFactory().contextData;
        contNo = data.contNo;
      }
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;

      // 合同类型不为一般合同时不展示保证金信息
      if (contType != '1') {
        this.showList = false;
      }

      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;

      // 最高额合同
      if (contType == '2') {
        // // 保证金比例
        // this.d1_A_BillCard.setBillCardItemVisible('bail_perc', false);

        // // 保证金金额
        // this.d1_A_BillCard.setBillCardItemVisible('bail_amt', false);

        // // 手续费率
        // this.d1_A_BillCard.setBillCardItemVisible('chrg_rate', false);

        // // 手续费金额
        // this.d1_A_BillCard.setBillCardItemVisible('chrg_amt', false);

        // 承兑行类型
        this.d1_B_B_BillCard.setBillCardItemVisible('aorg_type', false);

        // 承兑行行号
        this.d1_B_B_BillCard.setBillCardItemVisible('aorg_no', false);

        // 承兑行名称
        this.d1_B_B_BillCard.setBillCardItemVisible('aorg_name', false);

        // 出票人开户人账号
        this.d1_B_B_BillCard.setBillCardItemVisible('daorg_no', false);

        // 出票人开户人名称
        this.d1_B_B_BillCard.setBillCardItemVisible('daorg_name', false);
      }

      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/ctraccpcont/queryctraccpcontdatabycontno',
        data: contNo
      })
        .then(response => {
          if (response.code == '0') {
            yufp.clone(response.data, this.d1_A_BillCard.formdata);
            yufp.clone(response.data, this.d1_B_B_BillCard.formdata);
            this.d1_A_BillCard.setItemValue('signissueType', '1');
            this.d1_A_BillCard.setItemValue('curType', 'CNY');
            this.d1_B_B_BillCard.setItemValue('aorgType', '3');
            let guarMode = this.d1_A_BillCard.getItemValue('guarMode');
            if (guarMode != '10') {
              this.d1_A_BillCard.setBillCardItemVisible('isOlPld', false);
            }
            if (guarMode == '40') {
              this.d1_B_B_BillCard.isLmtAccNoRequired = false;
              this.d1_B_B_BillCard.isReplyNoRequired = false;
            } else {
              this.d1_B_B_BillCard.isLmtAccNoRequired = true;
              this.d1_B_B_BillCard.isReplyNoRequired = true;
            }

            // 担保方式为全额保证金时，保证金比列默认100%，保证金金额即合同金额
            let contAmt = this.d1_A_BillCard.getItemValue('contAmt');
            if (guarMode == '40') {
              this.d1_A_BillCard.setBillCardItemValue('bailPerc', '100');
              this.d1_A_BillCard.setBillCardItemEditable('bailPerc', false);
              this.d1_A_BillCard.setBillCardItemValue('bailAmt', contAmt);
            }


            // 是否续签合同选择是时才显示原合同编号
            let isRenew = this.d1_A_BillCard.getItemValue('isRenew');

            if (isRenew == '0') {
              this.d1_A_BillCard.setBillCardItemVisible('origiContNo', false);
              this.d1_A_BillCard.setBillCardItemRequired('origiContNo', false);

              // 隐藏后清空原有数据值
              this.d1_A_BillCard.setBillCardItemClearValue('origiContNo');
            }
            // 模板工厂主页面数据加载成功事件
            this.getFactory().triggerAction(response.data);

            // this.getFactory().triggerAction(this.d1_B_B_BillCard.getBillCardValue());
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });

      this.initBillCard();


      // // 加载工具js
      // this.$xutils.importJsOrderBy(
      //   [
      //     "/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js"
      //   ],
      //   0,
      //   null
      // );

      // 担保方式为抵押时，才显示是否在线抵押


      // 页面录入框下拉框绑定onchange事件
      // this.d1_A_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // 判断是否流程进入页面
    initWfStatus () {
      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          wfFlag = true;
          this.getFactory().contextData.wfFlag = wfFlag;

          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            // 将流程的关联业务主键设置到业务流水号中
            this.getFactory().contextData.iqp_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;

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
