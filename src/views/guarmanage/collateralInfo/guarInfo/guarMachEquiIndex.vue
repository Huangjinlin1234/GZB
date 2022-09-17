<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button v-if="allowWrite" type="primary" @click="doSave"
        >保存</yu-button
      >
      <yu-button v-if="allowWrite" type="primary" @click="doSubmit"
        >提交</yu-button
      >
      <yu-button type="primary" @click="doClose">关闭</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billcard from './guarMachEqui_d1_BillCard.vue';
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      allowWrite: true
    };
  },
  mounted () {
    this.allowWrite =
      this.getFactory().contextData.op == 'ADD' ||
      this.getFactory().contextData.op == 'EDIT';
    this.AfterInit();
  },
  methods: {
    /**
     * 押品详情——机器设备
     *
     *
     * @constructor
     */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      debugger;
      // $(".yuxp-card-form__row").css("padding-left", "15%");
      // 获取符合条件的列表数据
      this.d1_BillCard.queryDataByCondition({
        serno: this.getFactory().contextData.serno
      });

      if (this.getFactory().contextData.op == 'ADD') {
        // 新增时回显和设置默认值
        this.d1_BillCard.setItemValue(
          'serno',
          this.getFactory().contextData.serno
        ); // 流水号


        // 执行默认值公式
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else if (this.getFactory().contextData.op == 'VIEW') {
        // 设置只读
        this.d1_BillCard.setItemEditable('*', false);
      }

      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
    },

    // 保存
    doSave () {
      const params = this.d1_BillCard.getBillCardValue();

      // 保存数据
      const flag = this.save(params);

      if (flag) {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, null);
      }
    },

    // 提交
    doSubmit () {
      const params = this.d1_BillCard.getBillCardValue();

      // 保存页面数据  此处先保存详情信息,后校验基本信息
      const flag = this.save(params);

      if (!flag) { return }

      // 校验押品基本信息是否已经保存
      const isExist = this.checkGuarInfoIsExist(params);

      if (isExist == '0') {
        this.$xutils.showMsgBox('提示', '请先保存基本信息!', 350, 200, null);
        return;
      } else if (isExist == '') {
        return;
      }

      if (flag) {
        const loginUser = this.$xutils.getLoginUserInfo();

        // 设置流程提交参数
        const rsPars = {
          systemId: 'cmis',
          orgId: loginUser.orgId,
          bizId: this.getFactory().contextData.serno,
          is_scan_mater: this.getFactory().contextData.isScanMater,
          grt_flag: this.getFactory().contextData.grtFlag,
          bizType: 'WF_CUS_COM_PLD_INPUT_APP',
          userId: loginUser.loginCode,

          // 客户名称
          bizUserName: '',

          // 客户编号
          bizUserId: ''
        };

        // 调用公用的流程提交方法
        this.$xutils.wfInit(rsPars, this.afterCommitCallBack);
      }
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.doClose();
    },

    save (params) {
      // 校验必输项
      const validate = this.d1_BillCard.validateBillCardValue();

      if (!validate) {
        return false;
      }

      const rsPars = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        url:
          this.$backend.cmisBiz +
          '/api/guarinfmachequi/preserveGuarInfMachEqui',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
          }

          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
            rsPars['handleFlag'] = false;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            '提示',
            '错误代码：' + result.status + '；错误信息1：' + errorThrown
          ); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      return rsPars.handleFlag;
    },

    // 校验押品基本信息是否已经保存
    checkGuarInfoIsExist (params) {
      let repFlag = ''; // 返回结果 0 不存在 1 存在
      const rsPars = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        url:
          this.$backend.cmisBiz +
          '/api/guarbaseinfo/checkGuarInfoIsExist/' +
          params.serno,

        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
            rsPars['handleFlag'] = false;
          }

          if (response.data != null) {
            rsPars['handleFlag'] = true;
            repFlag = response.data;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            '提示',
            '错误代码：' + result.status + '；错误信息1：' + errorThrown
          ); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      return repFlag;
    },

    // 关闭
    doClose () {
      this.$xutils.getParentPage2(this, 'd1_BillList', 'queryDataByCondition');
      this.$xutils.getParentPage(this, 'YuXP', 'closeDialog');
    }
  }
};
</script>
