<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './yddSurveyConInfo_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      yddDcjl: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
     * 优抵贷-调查结论
     */

    // 初始化页面1
    afterInit () {
      this.yddDcjl = this.$refs.d1_BillCard;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
        if (this.$route.meta.params != null && this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        // 修改按钮进入
          this.yddDcjl.showBtn = true;
          this.yddDcjl.disabledFlg = false;
        }
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      yufp.clone(this.queryData(this.surveySerno), this.yddDcjl.formdata);
      this.yddDcjl.setItemValue('surveySerno', this.surveySerno);
    },

    // 保存
    save () {
      let _this = this;
      const saveFlag = _this.yddDcjl.validateBillCardValue();// 校验必输
      if (!saveFlag) {
        return;
      }
      _this.yddDcjl.execBillCardDefaultValueFormula();// 手工执行表单的所有默认值公式
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/lmtsurveyconinfo/saveSurveyConInfo/',
        method: 'POST',
        data: _this.yddDcjl.formdata
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (data == '1') {
          _this.$message({ type: 'success', message: '保存成功！' });
        } else {
          _this.$message({ type: 'error', message: message });
        }
      });
    },

    // 参考利率测算按钮
    calculate () {
      var _this = this;
      const cardData = _this.yddDcjl.getBillCardValue();
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/getrefrate',
        data: JSON.stringify(_this.$xutils.toUpperCase(cardData, true)),
        callback: function (code, message, response) {
          if (code != '9999') {
            _this.$refs.yddDcjl.formdata.refRate = response.data.rate;
            _this.$message({message: '测算成功！', type: 'success'});
          } else {
            _this.$message({message: response.message, type: 'danger'});
          }
        }
      });
    },
    /*
     *初始化：通过调查编号，查找数据
     */
    queryData (surveySerno) {
      var returnData = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/selectbysurveyserno',
        data: {surveySerno: surveySerno},
        callback: function (code, message, response) {
          returnData = response.data;
        }
      });
      return returnData;
    }
  }
};
</script>
