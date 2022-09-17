<template>
  <div>
    <div>
      <d1-billcard ref="d1_BillCard" :node="childParams" ></d1-billcard>
    </div>
    <div>
      <d1-billlist ref="d1_BillList" :node="childParams"></d1-billlist>
    </div>
    <yu-form-buttons :padding-left="500">
          <yu-button type="primary" @click="tempSave" :hidden="editflag" >暂存</yu-button>
      <yu-button type="primary" @click="save" :hidden="editflag" >保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billcard from './houseInfo_d1_BillCard.vue';
import d1Billlist from './houseInfo_d1_BillList.vue';
let params = {};
export default {
  components: {d1Billcard, d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  computed: {
    childParams: function () {
      let params = {
        iqpSerno: this.node.iqpSerno
      };
      return params;
    }
  },
  data () {
    return {
      d1_BillCard: null,
      editflag: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillList = this.$refs.d1_BillList;
      // this.d1_BillCard.execBillCardDefaultValueFormula();
      var op2 = _this.$route.params.hasOwnProperty('op') ? _this.$route.params.op : 'VIEW';
      if (op2 == 'EDIT') {
        this.editflag = false;
      } else {
        this.editflag = true;
      }
    },

    // 暂存
    tempSave () {
      let _this = this;
      var speCaseDesc = this.d1_BillList.formdata2.speCaseDesc;
      var otherDesc = this.d1_BillList.formdata2.otherDesc;
      this.d1_BillCard.setBillCardItemValue('speCaseDesc', speCaseDesc);
      this.d1_BillCard.setBillCardItemValue('otherDesc', otherDesc);
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqphouse/update',
        data: _this.d1_BillCard.getBillCardValue(),
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$xutils.showMsgBox('提示', '暂存成功！');
          } else {
            _this.$xutils.showMsgBox('提示', '暂存失败！');
          }
        }
      });
    },


    // 保存方法  新增修改  傻傻分不清楚
    save () {
      let flagSave;
      var speCaseDesc = this.d1_BillList.formdata2.speCaseDesc;
      if (speCaseDesc == '' || speCaseDesc == null) {
        this.$xutils.showMsgBox('提示', '详细说明不可为空');
        return;
      }
      var otherDesc = this.d1_BillList.formdata2.otherDesc;
      if (otherDesc == '' || otherDesc == null) {
        this.$xutils.showMsgBox('提示', '其他说明不可为空');
        return;
      }

      this.d1_BillCard.setBillCardItemValue('speCaseDesc', speCaseDesc);
      this.d1_BillCard.setBillCardItemValue('otherDesc', otherDesc);
      var firstpayPerc = parseFloat(this.d1_BillCard.getBillCardItemValue('firstpayPerc'));


      // 首付金额与合计金额比较
      var firstpayAmt = this.d1_BillCard.getBillCardItemValue('firstpayAmt');
      var sum = this.d1_BillList.formdata.sum;
      if (firstpayAmt != sum) {
        this.$xutils.showMsgBox('提示', '首付金额与合计金额不一致！');
        return;
      }

      if (firstpayPerc < 0.2) {
        this.$xutils.showMsgBox('提示', '首付金额小于房屋总价的20%!');
        return;
      }

      if (this.d1_BillCard.getItemValue('pkId')) {
        // 更新
        this.d1_BillCard.updateBillCardData();
      } else {
        // 新增
        this.d1_BillCard.setItemValue(
          'iqp_serno',
          this.getFactory().contextData.iqp_serno
        );

        flagSave = this.d1_BillCard.saveBillCardData();

        if (flagSave && flagSave.code == 'ok') {
          this.$xutils.showMsgBox('提示', '保存信息成功! ');
        } else {
          this.d1_BillCard.setItemValue('iqp_serno', null);
        }
      }
    },

    saveUpdInfo () {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode); // 更新人
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode); // 更新机构
      this.d1_BillCard.setItemValue(
        'upd_date',
        this.$xutils.dateFormat('yyyy-MM-dd', new Date())
      ); // 更新时间
    },

    // 设置本页面的编辑情况
    initSingelPageEdiable () {
      if (
        this.getFactory().contextData.op &&
        this.getFactory().contextData.op == 'VIEW'
      ) {
        this.d1_BillCard.setItemEditable('*', false);
        this.getFactory().setButtonVisiable('tempSave', false);
        this.getFactory().setButtonVisiable('save', false);
        this.getFactory().setButtonVisiable('commit', false);
        this.getFactory().setButtonVisiable('back', false);
      }
    },

    // todo点击菜单栏刷新页面的方法
    showAction () {
      this.d1_BillCard.addEditChangeAction(this.change);
      this.d1_BillCard.queryDataByCondition(
        'iqp_serno = \'' + this.getFactory().contextData.iqp_serno + '\''
      );
    },

    initDataQuery () {
      // 定义标志位
      let bol = true;

      let rtnData = {};

      // 调用ajax请求获取数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqphouse/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
            bol = false;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          bol = false;
        }
      });

      if (!bol) {
        return;
      }

      for (let key in rtnData) {
        if (rtnData[key] != null && rtnData[key] != '') {
          let map = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          this.d1_BillCard.setBillCardItemValue(map, rtnData[key]);
        }
      }
    }
  }
};
</script>