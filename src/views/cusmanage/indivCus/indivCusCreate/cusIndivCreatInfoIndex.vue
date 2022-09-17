<template>
  <!--
    @created by
    @updated by zhoumw
    @description 个人客户基本信息
  -->
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
yufp.lookup.reg('STD_ZB_SEX');
import d1Billcard from './cusIndivCreatInfo_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      operate: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
      客户基础信息
      */
    AfterInit () {
      let _this = this;
      let data = _this.$route.meta.params;
      // 初始展示
      this.d1_BillCard = this.$refs.d1_BillCard;
      let cusId;
      if(data.bizType == 'B04'){
        this.$refs.d1_BillCard.$refs.refForm.setItemDisabled('cusName', false);
      }
      if (data != null && data != 'undefined') {
        // 客户编号
        if (data.cusId != null && data.cusId != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('cusId', data.cusId);
          cusId = data.cusId;
        }

        // 客户名称
        if (data.cusName != null && data.cusName != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('cusName', data.cusName);
        }

        // 证件类型
        if (data.certType != null && data.certType != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('certType', data.certType);
        }

        // 证件号码
        if (data.certCode != null && data.certCode != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('certCode', data.certCode);
        }

        // 业务类型
        if (data.bizType != null && data.bizType != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('bizType', data.bizType);
        }
        // 是否我行股东
        if (data.isBankSharehd) {
          this.d1_BillCard.setBillCardItemValue('isBankSharehd', data.isBankSharehd);
        } else {
          // if (data.cusId != null && data.cusId != 'undefined') {
          this.isBankSharehd();
          // }
        }
        let cusIndivDto = {};
        cusIndivDto.cusId = cusId;
        this.$request({
          method: 'POST',
          url: backend.cmisCus + '/api/cusindiv/queryCusIndivInfo',
          data: cusIndivDto}).then((response) => {
          if (response.code == '0') {
            yufp.clone(response.data, _this.d1_BillCard.formdata);
            var initLoanDate = response.data.initLoanDate;
            if(initLoanDate){//计算我行成为我行客户时间
              this.$emit('load-success', parseInt((parseFloat(new Date().getTime()) - parseFloat(new Date(initLoanDate).getTime())) / (30 * 24 * 3600 * 1000)));
            }
            
            if (!_this.d1_BillCard.formdata.nation) {
              _this.d1_BillCard.formdata.nation = 'CHN';
            }
            if (!_this.d1_BillCard.formdata.indivFolk) {
              _this.d1_BillCard.formdata.indivFolk = '01';
            }
            if (_this.d1_BillCard.utrace === false) {
              _this.d1_BillCard.utrace = true;
            }

            _this.$utils.clone(_this.d1_BillCard.formdata, _this.d1_BillCard.formdatautrace);
            // 证件类型
            let certType = data.certType;
            // 如果证件类型是身份证则默认性别 100身份证类型
            if (certType == 'A' && !this.d1_BillCard.formdata.sex && !this.d1_BillCard.formdata.indivDtOfBirth) {
              // 身份证号码
              const certCode = data.certCode;

              // 倒数第二位性别
              const sex = certCode.substring(16, 17);

              // 第六位到第十四位为生日位
              const date = certCode.substring(6, 14).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
              // 出生日期赋值
              this.d1_BillCard.formdata.indivDtOfBirth = date;

              // 如果倒数第二位为0
              if (sex == '0') {
                this.d1_BillCard.formdata.sex = '2';

                // 如果倒数第二位为单数
              } else if (sex % 2 == 1) {
                // 01 男

                this.d1_BillCard.formdata.sex = '1';
              } else {
                // 02 女

                this.d1_BillCard.formdata.sex = '2';

                // this.d1_BillCard.formdata.sex = 2;
              }
            }
            
            // 是否我行股东
            if (data.isBankSharehd) {
              this.d1_BillCard.setBillCardItemValue('isBankSharehd', _this.d1_BillCard.formdata.isBankSharehd);
            } else {
              // if (data.cusId != null && data.cusId != 'undefined') {
              this.isBankSharehd();
              // }
            }
          } else {
            _this.$xutils.showMsgBox('提示', '' + response.code + ',错误信息：' + response.message);
          }
        });
      }
      if (data.op != null && data.op != 'undefined') {
        var op = data.op;
        if (op == 'VIEW') {
          _this.operate = true;
          _this.d1_BillCard.required = 'required';
        }
      }
    },

    // 暂存
    save () {
      this.dosave();
    },
    UTraceSet () {
      this.d1_BillCard.$refs.refForm.saveUTrace(this.d1_BillCard.formdatautrace);
      this.$utils.clone(this.d1_BillCard.formdata, this.d1_BillCard.formdatautrace);
    },
    // 保存
    dosave (saveStatus) {
      const Data = this.d1_BillCard.getBillCardValue();
      Data['save_status'] = saveStatus;
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusindiv/saveCusIndiv',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '暂存失败：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回
    doBack () {
      this.getFactory().back();
    },

    // 保存
    commit () {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }
      this.dosave();
    },
    // 查询客户是否我行股东
    isBankSharehd () {
      // cusId = this.$route.params.certCode;
      this.$xutils.request({
        // 同步请求
        url: this.$backend.cmisCus + '/api/cuslstglf/queryCount/' + this.$route.params.certCode,
        data: null,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data > 0) {
              // 是否我行股东
              this.d1_BillCard.setBillCardItemValue('isBankSharehd', '1');
            } else {
              this.d1_BillCard.setBillCardItemValue('isBankSharehd', '0');
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
