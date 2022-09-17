<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
  </div>
</template>
<script>
import d1ABillcard from './hxdPage3_d1_A_BillCard.vue';
export default {
  components: { d1ABillcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dcjl: null,
      surveySerno: ''
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.dcjl = this.$refs.d1_A_BillCard;
      // 调查结论界面

      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
        this.$route.meta.params.bizType = '01';
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }

      this.selectbysurveyserno();
    },
    selectbysurveyserno () {
      this.dcjl.formdata.surveySerno = this.surveySerno;
      this.$request({
        method: 'POST',
        // url: backend.cmisBiz + '/api/lmtsurveyconinfo/calculate/',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/selectbysurveyserno',
        data: {surveySerno: this.surveySerno}
      }).then(({code, message, data}) => {
        if (code == 0 && data != null) {
          yufp.clone(data, this.dcjl.formdata);
        } else {
          // yufp.clone();
          // this.d1_A_BillCard.formdata.surveySerno = this.getFactory().contextData.surveySerno;
        }
      });
    },


    doSave () {
      // 校验表单
      if (!this.dcjl.validateBillCardValue()) {
        this.$message({message: '请补全数据'});
        return;
      }


      // 直接创建默认数据
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/saveorupdatecon',
        data: this.dcjl.formdata
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data == 1) {
            // 操作成功

            this.$message({ message: '操作成功', type: 'success' });
          } else {
            // 操作失败
            this.$message({ message: '操作失败', type: 'warning' });
          }
        }
      });
    },


    showAction () {
      this.dcjl.setBillCardItemValue('surveySerno', this.surveySerno);
    }
  }
};
</script>
