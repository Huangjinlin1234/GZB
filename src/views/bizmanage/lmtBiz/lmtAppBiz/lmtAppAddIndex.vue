<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './lmtAppAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * title 单一客户授信新增
       * author 朱滋润
       * date 2021-04-02
       * */
    AfterInit () {
      // YuXP.createBillCard('yuxpservice', 'd1', 'cus_indiv_list_pop', null, '下一步/onSaveData/type=primary;取消/onBack');
      this.d1_BillCard = this.$refs.d1_BillCard;

      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.initBillCard();
      this.d1_BillCard.addEditChangeAction(this.isBasicChangeFn);
    },

    // 初始化触发
    initBillCard () {
      this.d1_BillCard.addEditChangeAction(this.isBasicChangeFn);
    },

    // onchange触发
    isBasicChangeFn (thisCard, itemKey, oldVal, newVal) {
      // 调整以后的值与调整之前的值一样时，不触发onchange方法
      if (oldVal == newVal) {
        return;
      }

      if (itemKey == 'cusId' && newVal != '') {
        // 客户编号
        const result = this.judgeIsExistOnWayApp(newVal);

        if (result) {
          return;
        } else {
          this.getLmtTypeByCusId(newVal);
        }
      }
    },

    // 下一步
    onNextStep () {
      // 必输校验
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      // 获取页面保存数据
      let params = this.d1_BillCard.getBillCardValue();

      params['isGrp'] = 'N';

      // 调用后端生成放款申请记录的ajax请求
      let rtnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/savelmtapp',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
            this.$dialog.close(this.dialogId);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(rtnData) == '{}') {
        return;
      }

      if (rtnData.rtnCode != '0000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg); // 弹出提示
        return;
      }

      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        this.$xutils.getParentPage(this, null, 'getRefreshList');
        params['model_group_no'] = 'CMG000305';// 单一客户授信申请查看
        params['serno'] = rtnData.serno;
        params['op'] = 'EDIT';

        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          1200,
          -1,
          params,
          null,
          true,
          true
        );
      });
    },

    // 获取授信类型
    getLmtTypeByCusId (cus_id) {
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/getlmttypebycusid/' + cus_id,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            console.log(response.data);
            if (response.data.lmtType && response.data.lmtType != '') {
              this.d1_BillCard.setBillCardItemValue('lmtType', response.data.lmtType);
            } else {
              this.$xutils.showMsgBox('提示', '后台返回数据异常');
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 是否存在在途授信申请
    judgeIsExistOnWayApp (cus_id) {
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/judgeisexistonwayapp/' + cus_id,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 是否存在在途授信申请标志返回为否
            if (response.data.isExist && response.data.isExist != '') {
              if (response.data.isExist) {
                this.$xutils.showMsgBox('提示', '提示代码：' + response.data.rtnCode + ',提示信息：' + response.data.rtnMsg);
                this.d1_BillCard.setBillCardItemValue('lmt_type', '');
              }
            }
            return response.data.isExist;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          this.d1_BillCard.resetBillCardData();
        }
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
