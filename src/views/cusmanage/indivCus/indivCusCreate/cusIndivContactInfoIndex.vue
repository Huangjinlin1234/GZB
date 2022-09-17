<template>
  <!--
    @created by
    @updated by zhoumw
    @description 地址与联系信息
  -->
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusIndivContactInfo_d1_BillCard.vue';
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
    /*
        个人客户地址与联系方式信息
       */
    AfterInit () {
      let _this = this;
      let data = _this.$route.meta.params;
      this.d1_BillCard = this.$refs.d1_BillCard;
      let cusId;
      if (data != null && data != 'undefined') {
        // 客户编号
        if (data.cusId != null && data.cusId != 'undefined') {
          cusId = data.cusId;
          this.d1_BillCard.setBillCardItemValue('cusId', data.cusId);
        }
      }
      // 业务条线（B01:正式/B02:临时）
      if (data.bizType != null && data.bizType != 'undefined') {
        var bizType = data.bizType;
        if (bizType == 'B01' || bizType == 'B03' || bizType == 'B09') {
          this.d1_BillCard.required = 'required';
        }
      }
      if (data.op != null && data.op != 'undefined') {
        var op = data.op;
        if (op == 'VIEW') {
          _this.d1_BillCard.disabled = true;
          _this.d1_BillCard.required = 'required';
        }
      }

      let cusIndivContact = {};
      cusIndivContact.cusId = cusId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindivcontact/queryCusIndivContact',
        data: cusIndivContact,
        callback: function (code, message, response) {
          if (code == '0') {
            yufp.clone(response.data, _this.$refs.d1_BillCard.formdata);
            if (_this.d1_BillCard.utrace === false) {
              _this.d1_BillCard.utrace = true;
            }
            _this.$utils.clone(_this.d1_BillCard.formdata, _this.d1_BillCard.formdatautrace);
          } else {
            this.$xutils.showMsgBox('提示', '' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    },

    // 暂存
    save () {
      this.dosave();
    },

    // 保存
    dosave (saveStatus) {
      // 微信号
      const wechatNo = this.d1_BillCard.getItemValue('wechatNo');
      const qq = this.d1_BillCard.getItemValue('qq');
      // 邮箱
      const email = this.d1_BillCard.getItemValue('email');
      if ((wechatNo == '' || wechatNo == null) && (qq == '' || qq == null) && (email == '' || email == null)) {
        this.$xutils.showMsgBox('温馨提示', '微信、QQ、Email地址三项中至少输入一项!');
        return;
      }
      const Data = this.d1_BillCard.getBillCardValue();
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusindivcontact/save',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          //
        }
      });
    },

    // 返回
    doBack () {
      this.getFactory().back();
      // window.parent.back();
    },

    // 定义树切换调用方法
    showAction () {},

    commit () {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      this.dosave();
    },

    UTraceSet () {
      this.d1_BillCard.$refs.refForm.saveUTrace(this.d1_BillCard.formdatautrace);
      this.$utils.clone(this.d1_BillCard.formdata, this.d1_BillCard.formdatautrace);
    }
  }
};
</script>
