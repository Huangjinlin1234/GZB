<template>
  <div>
    <div>
      <d1-billcard ref="d1_BillCard" :node="childParams"></d1-billcard>
    </div>
    <yu-form-buttons :padding-left="500">
      <yu-button type="primary" @click="save" v-if="editflag" >保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billcard from './iqpApplAppt_d1_BillCard.vue';

let params = {};
export default {
  components: {d1Billcard},
  props: {
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
      editflag: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      var op2 = _this.$route.params.hasOwnProperty('op') ? _this.$route.meta.params.op : 'VIEW';
      if (op2 == 'EDIT') {
        this.editflag = true;
      } else {
        this.editflag = false;
      }
    },

    // 保存方法  新增修改  傻傻分不清楚
    save () {
      var _this = this;
      var cusRiskLevel = this.d1_BillCard.formdata2.cusRiskLevel2;
      var priorCusDesc = this.d1_BillCard.formdata2.priorCusDesc2;
      var otherDesc = this.d1_BillCard.formdata2.otherDesc2;
      this.d1_BillCard.formdata.cusRiskLevel = cusRiskLevel;
      this.d1_BillCard.formdata.priorCusDesc = priorCusDesc;
      this.d1_BillCard.formdata.otherDesc = otherDesc;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpapplappt/update',
        data: {
          'iqpSerno': this.d1_BillCard.formdata.iqpSerno,
          'preIqpSerno': this.d1_BillCard.formdata.iqpSerno,
          'cusRiskLevel': this.d1_BillCard.formdata.cusRiskLevel,
          'priorCusDesc': this.d1_BillCard.formdata.priorCusDesc,
          'otherDesc': this.d1_BillCard.formdata.otherDesc
        },
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$xutils.showMsgBox('提示', '保存成功！'); // 弹出提示
          } else {
            _this.$xutils.showMsgBox('提示', message); // 弹出提示
          }
        }
      });
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