<template>
  <!--
    @created by
    @updated by zhoumw
    @description 工作信息
  -->
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusIndivUnitInfo_d1_BillCard.vue';
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
      个人客户工作信息
       */
    AfterInit () {
      let _this = this;
      let data = _this.$route.meta.params;
      this.d1_BillCard = this.$refs.d1_BillCard;
      let cusId = data.cusId;
      if (data != null && data != 'undefined') {
        // 客户编号
        if (data.cusId != null && data.cusId != 'undefined') {
          this.d1_BillCard.formdata.cusId = data.cusId;
        }
      }
      // 业务条线（B01:正式/B02:临时）
      if (data.bizType != null && data.bizType != 'undefined') {
        var bizType = data.bizType;
        if (bizType == 'B01' || bizType == 'B03') {
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

      let cusIndivUnit = {};
      cusIndivUnit.cusId = cusId;
      this.$request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindivunit/queryByCusId',
        data: cusIndivUnit}).then((response) => {
          if (response.code == '0') {
            this.$utils.clone(response.data, this.$refs.d1_BillCard.formdata);
            if (_this.d1_BillCard.utrace === false) {
              _this.d1_BillCard.utrace = true;
            }

            _this.$utils.clone(_this.d1_BillCard.formdata, _this.d1_BillCard.formdatautrace);
          } else {
            this.$xutils.showMsgBox('提示', '' + response.code + ',错误信息：' + response.message);
          }
        });
    },

    // 暂存
    save () {
      this.dosave();
    },

    // 保存
    dosave () {
      const Data = this.d1_BillCard.getBillCardValue();
      this.$xutils.request({
        // 同步请求
        async: true,

        url: this.$backend.cmisCus + '/api/cusindivunit/save',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '暂存成功', 500, 300, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            //
            // exit;// ajax中return不生效，可以用exit
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
      yufp.router.removeTab(this.$route.path);
      // this.$dialog.close(this.dialogId);
      // this.getFactory().back();
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
