<template>
<div>
  <div ref="refChildren" :is="currentView" :children="children"></div>
</div>
</template>
<script>
import d1Billcard from '../../../lmt/apprStrLmt/apprStrLmtDetail/apprStrLmtDetail.vue';
import d2Billcard from '../../../lmt/apprStrLmt/apprStrLmtDetailIndiv/apprStrLmtDetailIndiv.vue';
export default {
  components: {d1Billcard, d2Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      // d1_BillCard: null,
      // 当前页面表单
      isShowBillCardFlg: false,
      isShow15BillCardFlg: false,
      cusId: '',
      currentView: '',
      children: Object
    };
  },
  created () {
    this.AfterInit();
  },
  mounted () {
    // this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      if (_this.pageParams) {
        _this.cusId = _this.pageParams.borrowerCusId;
      } else if (_this.getFactory().contextData.borrowerCusId) {
        _this.cusId = _this.getFactory().contextData.borrowerCusId;
      } else if (_this.$route.meta.params) {
        // serno = this.getFactory().contextData.serno;
        _this.cusId = _this.$route.meta.params.borrowerCusId;
      }
      if (!_this.cusId || _this.cusId == '') {
        _this.cusId = this.getFactory().contextData.instanceInfo.bizUserId;
      }
      // _this.cusId = this.getFactory().contextData[0].cusId;
      let instuCde = this.$xutils.getDefaultformulaData('$LoginInstuCode');
      yufp.service.request({
        method: 'POST',
        data: _this.cusId,
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        callback: function (code, message, response) {
          let cusCatalog = response.data.cusCatalog;
          if (cusCatalog == '1') {
            // 数据加载
            _this.d1_BillCard = _this.$refs.d1_BillCard;
            _this.isShowBillCardFlg = false;
            _this.isShow15BillCardFlg = false;
            _this.children = {
              cusId: _this.cusId,
              instuCde: instuCde
            };
            _this.currentView = '';
            _this.$nextTick(() => {
              _this.currentView = 'd2Billcard';
            });
          } else if (cusCatalog == '2') {
            // 数据加载
            _this.d1_BillCard = _this.$refs.d2_BillCard;
            _this.isShowBillCardFlg = false;
            _this.isShow15BillCardFlg = false;
            _this.children = {
              cusId: _this.cusId,
              instuCde: instuCde
            };
            _this.currentView = '';
            _this.$nextTick(() => {
              _this.currentView = 'd1Billcard';
            });
          }
        }
      });
    }
  }
};
</script>
