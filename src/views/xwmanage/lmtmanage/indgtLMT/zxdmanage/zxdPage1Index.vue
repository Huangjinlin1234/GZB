<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './zxdPage1_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      zxdPageCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      // 增享贷-基本信息
      this.zxdPageCard = this.$refs.d1_BillCard;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      yufp.clone(this.$route.meta.params, this.zxdPageCard.formdata);
      // 查询数据
      // 怕进征信页面 需要给参数
      this.$route.meta.params.period = '01';
      this.$route.meta.params.iqpSerno = this.surveySerno;
      this.$route.meta.params.contextDataborrowerCusId = this.$route.meta.params.cusId;
      this.$route.meta.params.contextDataborrowerCusName = this.$route.meta.params.cusName;
      this.$route.meta.params.contextDataborrowerCertCode = this.$route.meta.params.certCode;
      this.$route.meta.params.bizType = '01';
      if (this.$route.meta.params != null && this.$route.meta.params.PageType != '01') {
        this.zxdPageCard.lookPage = true;
        this.zxdPageCard.isDetails = false;
      }

      this.selectData(this.surveySerno);


      // let sql = 'surveySerno=\'' + this.$route.meta.params.surveySerno + '\'';
      // this.d1_BillCard.queryDataByCondition(sql);
    },

    save () {
      if (!this.zxdPageCard.validateBillCardValue()) {
        this.$message({message: '请补全数据'});
        return;
      }

      // $refs.refForm;
      // this.d1_BillCard.updateBillCardData();
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/saveorupdate',
        data: this.zxdPageCard.formdata
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data != null && data == 1) {
            this.$message({message: '保存成功', type: 'success'});
            // 操作成功
            // yufp.clone(data, this.d1_BillCard.formdata);
          } else {
            // 操作失败
            this.$message({message: '保存失败', type: 'warning'});
          }
        }
      });
    },
    // 查询数据的方法
    selectData (surveySerno) {
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/selectone',
        data: {surveySerno: surveySerno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data != null) {
            // 操作成功
            yufp.clone(data, this.zxdPageCard.formdata);
          } else {
            // 操作失败
          }
        }
      });
    },

    calculate () {
      // if (this.formdata.guarMode == '' || this.formdata.guarMode == null) {
      // this.d1_BillCard.formdata.guarMode = '30';
      if (!this.zxdPageCard.formdata.guarMode) {
        this.$message({ message: '请选择担保方式', type: 'warning' });
        return;
      }
      if (!this.zxdPageCard.formdata.phone) {
        this.$message({ message: '电话号码不能为空', type: 'warning' });
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/calculate/',
        // url: backend.cmisBiz + '/api/lmtsurveyconinfo/getrefrate/',
        data: this.zxdPageCard.formdata
      }).then(({code, message, data}) => {
        if (code == 0) {
          // this.formdata.refRate = data.rate;
          this.zxdPageCard.formdata.refRate = data.rate;
        } else {
          this.$message({message: message});
        }
      });
      // 先进行逻辑  然后进行赋值
      // 暂未进行逻辑判断
      /*    this.$xutils.showMsgBox('提示', '暂时赋假值'); // 弹出提示
      this.d1_A_BillCard.setItemValue('refRate', '0.1'); */
    }

  }
};
</script>
