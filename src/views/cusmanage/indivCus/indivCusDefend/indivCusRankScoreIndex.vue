<template>
  <d1-billcard ref="d1_BillCard" :cusDuration="cusDuration"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusRankScore_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String,
    cusDuration:{
      type: String,
      default: '0'
    },
  },
   watch: {
    cusDuration: function(val){
      if (val){
        this.$refs.d1_BillCard.formdata.cusDuration = val;
      }
    }
  },
  data () {
    return {
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
      个人客户评级信息
      */
    AfterInit () {
      let _this = this;
      let data = _this.$route.meta.params;
      // 客户号
      const cusId = data.cusId;
      let params = {};
      params.cusId = cusId;
      // 通过客户号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisCus + '/api/cusindiv/queryRankScore',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.$refs.d1_BillCard.formdata);
              _this.$refs.d1_BillCard.computeIsHaveChildren();
              _this.$refs.d1_BillCard.formdata.cusDuration = _this.cusDuration;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    doSave () {
      let _this = this;
      // 保存之前校验必输项
      const saveFlag = _this.$refs.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      // 客户号
      const cusId = _this.$route.params.cusId;
      const Data = _this.$refs.d1_BillCard.getBillCardValue();
      Data['cusId'] = cusId;
      _this.$xutils.request({
        // 同步请求
        async: true,
        url: _this.$backend.cmisCus + '/api/cusindiv/updateSelective',
        data: JSON.stringify(_this.$xutils.toUpperCase(Data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.$xutils.showMsgBox('提示', '修改成功', 500, 300, () => {});
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          //
        }
      });
    },
    // 返回
    doBack () {
      let data = this.$route.meta.params;
      yufp.frame.removeTab(data.key);
    }
  }
};
</script>
