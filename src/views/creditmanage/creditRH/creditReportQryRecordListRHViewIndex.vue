<template>
  <yu-tabs type="card">
  <yu-tab-pane label="征信信息">
    <d1-billcard ref="d1_BillCard"></d1-billcard>
  </yu-tab-pane>
  <yu-tab-pane label="影像信息" lazy="true">
    <imageSystem authority="import;insert;download;scan;delImg" s="2" :para="imageBizParam"></imageSystem>
  </yu-tab-pane>
</yu-tabs>
</template>
<script>
import d1Billcard from './creditReportQryRecordListRHViewBillCard.vue';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {d1Billcard, imageSystem},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      imageBizParam: [
        {
          'top_outsystem_code': 'ZXCXSQZLGR',
          // 'outsystem_code': 'ZX_HXD0101',
          'index': {
            // 'docid': this.pageParams.serno,
            // [{"index":{"docid":"3aba9f1030d44fbfadeee91b48041731"},"top_outsystem_code":"HLWYX","outsystem_code":"HLWYX"}]
            'scanid': ''
            // 'businessid': 'XD00234997'
            // 'custname': this.pageParams.cusName,
            // 'custname': this.getFactory().contextData.cusName,
            // 'cardno': this.pageParams.cusName,
            // 'cardno': this.getFactory().contextData.cusName,
            // 'custphone': ''
          }
        }
      ],
      d1BillCard: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillCard = this.$refs.d1_BillCard;
      if (this.pageParams) {
        this.d1BillCard.queryDataByCondition({crqlSerno: this.pageParams.crqlSerno}, 'post', this.queryBorrowerCertType);
        if (this.pageParams.qryResn == '27') {
          this.d1BillCard.setBillCardItemVisible('qryResnDec', true);
        } else {
          this.d1BillCard.setBillCardItemVisible('qryResnDec', false);
        }
        if (this.pageParams.imageNo) {
          this.imageBizParam[0].index.scanid = this.pageParams.imageNo;
        } else {
          this.imageBizParam[0].index.scanid = this.pageParams.crqlSerno;
        }
      } else {
        this.d1BillCard.queryDataByCondition({crqlSerno: this.bizPageData.instanceInfo.bizId}, 'post', this.queryBorrowerCertType);
        this.imageBizParam[0].index.scanid = this.bizPageData.instanceInfo.bizId;
      }

      this.d1BillCard.setBillCardItemVisible('legalName', false);
      this.d1BillCard.setBillCardItemVisible('legalPhone', false);
      if (this.bizPageData && this.bizPageData.instanceInfo.param.bizQryCls == '1') {
        this.d1BillCard.$data.dicOptions = {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions: [{key: '17', value: '额度审批'}, {key: '01', value: '贷前审查'}, {key: '27', value: '贷后管理'}, {key: '04', value: '其他原因'}, {key: '05', value: '关联查询'}, {key: '18', value: '担保审查'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '003', value: '关联人'}], certTypeOptions: [{key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}], authbookContentOptions: [{key: '008', value: '审核本单位信贷业务申请'}, {key: '009', value: '审核本单位作为担保人'}, {key: '010', value: '审核本单位作为关联人'}, {key: '011', value: '受理企业信用等级评定'}, {key: '007', value: '对已发放的信贷业务进行贷后风险管理'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] };
        this.imageBizParam[0]['top_outsystem_code'] = 'ZXCXSQZLQY';
        this.d1BillCard.setBillCardItemVisible('legalName', true);
        this.d1BillCard.setBillCardItemVisible('legalPhone', true);
      }

      if (this.bizPageData && this.bizPageData.instanceInfo.param.bizFlag == '27') {
        this.d1BillCard.setBillCardItemVisible('qryResnDec', true);
      } else {
        this.d1BillCard.setBillCardItemVisible('qryResnDec', false);
      }

      this.d1BillCard.setItemEditable('*');
      this.queryLoan();
    },
    // 查询贷款融资信息
    queryLoan () {
      var _this = this;
      let crqlSerno;
      if (this.pageParams) {
        crqlSerno = _this.pageParams.crqlSerno;
      } else {
        crqlSerno = _this.bizPageData.instanceInfo.bizId;
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/creditreportloanfina/querybycrqlserno',
        data: crqlSerno,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            if (response.data.legalName || response.data.legalPhone || response.data.otherBankIsFin || response.data.ourBankIsFin || response.data.applyFinAmt || response.data.applyFinTerm || response.data.applyFinGuarType || response.data.applyFinRemark) {
              _this.$refs.d1_BillCard.$data.isShowLoan = true;
              _this.$refs.d1_BillCard.$data.formdata.legalName = response.data.legalName;
              _this.$refs.d1_BillCard.$data.formdata.legalPhone = response.data.legalPhone;
              _this.$refs.d1_BillCard.$data.formdata.otherBankIsFin = response.data.otherBankIsFin;
              _this.$refs.d1_BillCard.$data.formdata.ourBankIsFin = response.data.ourBankIsFin;
              _this.$refs.d1_BillCard.$data.formdata.applyFinAmt = response.data.applyFinAmt;
              _this.$refs.d1_BillCard.$data.formdata.applyFinTerm = response.data.applyFinTerm;
              _this.$refs.d1_BillCard.$data.formdata.applyFinGuarType = response.data.applyFinGuarType;
              _this.$refs.d1_BillCard.$data.formdata.applyFinRemark = response.data.applyFinRemark;
            }
          } else {
            // _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    queryBorrowerCertType ({borrowerCusId}) {
      if (borrowerCusId) {
        var _this = this;
        // 根据客户编号查询证件类型
        yufp.service.request({
          async: false,
          method: 'POST',
          url: _this.$backend.cmisCus + '/api/cusbase/queryCus',
          data: borrowerCusId,
          callback: function (code, message, response) {
            if (code == '0') {
              _this.$refs.d1_BillCard.$data.formdata.borrowerCertType = response.certType;
            }
          }
        });
      }
    },

    onBack () {
      if (this.pageParams) {
        this.$dialog.close(this.dialogId);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
