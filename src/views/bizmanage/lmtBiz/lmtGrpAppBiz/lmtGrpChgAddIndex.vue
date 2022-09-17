<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './lmtGrpChgAdd_d1_BillCard.vue';
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
       * title 向导界面
       * author xiamc
       * date 2021-04-01
       * */

    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.addEditChangeAction(this.isBasicChangeFn);
    },


    // onchange触发
    isBasicChangeFn (thisCard, itemKey, oldVal, newVal) {
      // 调整以后的值与调整之前的值一样时，不触发onchange方法
      if (oldVal == newVal) {
        return;
      }
      if (itemKey == 'grpCusId') {
        // 客户编号
        const result = this.judgeIsExistOnWayApp(newVal);

        if (result) {

        } else {
          this.getLmtTypeByCusId(newVal);
        }
      }
    },

    // 获取授信类型
    getLmtTypeByCusId (cus_id) {
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpapp/getlmttypebycusid/' + cus_id,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data.lmtType && response.data.lmtType != '') {
              this.d1_BillCard.setBillCardItemValue('lmt_type', response.data.lmtType);
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
      // alert('是否存在在途授信申请');
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpapp/judgeisexistonwayapp/' + cus_id,

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

    // 下一步直接就入库了
    onSave () {
      // 必输项校验
      const validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      // 1.表单数据获取
      const params = this.d1_BillCard.getBillCardValue();

      let saveFlag = this.sendSavePost(params);
    },

    // 关闭按钮
    onBack () {
      this.$dialog.close(this.dialogId);
    },

    // 封装发送后台的逻辑，保存，暂存通用的方法
    sendSavePost (params, a) {
      const saveFlag = true;

      let rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpapp/guidesave',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
            // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
            if (JSON.stringify(rtnData) == '{}') {
              return;
            }
            if (rtnData.rtnCode != '0000') {
              this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg); // 弹出提示
              return;
            }
            params['serno'] = rtnData.serno;
            params['op'] = 'VIEW';
            this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
              this.$dialog.open(
                '',
                'bizmanage/lmtBiz/lmtGrpAppBiz/lmtGroupAppChgIndex',
                -1,
                -1,
                params,
                null,
                true,
                true
              );
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
