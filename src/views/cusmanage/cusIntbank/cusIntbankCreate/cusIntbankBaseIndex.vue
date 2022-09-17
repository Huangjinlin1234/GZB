<template>
  <d1-billcard ref="d1_BillCard"  :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './cusIntbankBase_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    cusCorp: Object,
  },
  data () {
    return {
      d1_BillCard: null,
      formdata: {},
      operate: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 机构基础信息
       * @constructor
       */
    AfterInit () {
      // 待优化
      if(this.cusCorp.viewType === 'VIEW') {
        // this.operate = 'details';
        this.$refs.d1_BillCard.setItemEditable('*', false);
      } else {
        this.operate = 'edit';
      }
      this.inItFormData();
      // 禁用按钮
      // this.getFactory().setButtonVisiable('commit', false);
      // this.getFactory().setButtonVisiable('save', false);
      // this.getFactory().setButtonVisiable('tempSave', false);
      // this.getFactory().setButtonVisiable('back', false);
    },

    // 根据社会信用代码初始化数据
    inItFormData () {
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      var data = {'socialCreditCode' : this.cusCorp.certCode,'certType' : this.cusCorp.certType};
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusintbank/queryCusIntbankBySocialCreditCode',
        data: data,
        callback: function (code, message, response) {
          if (code === '0') {
            _this.$utils.clone(response.data, _this.d1_BillCard.formdata);
            if (_this.d1_BillCard.utrace === false) {
              _this.d1_BillCard.utrace = true;
            }
            _this.$utils.clone(_this.d1_BillCard.formdata, _this.d1_BillCard.formdatautrace);
            // if (response.data != null) {
            //   _this.d1_BillCard.setBillCardValue(response.data);
            // } else {
            //   _this.$xutils.showMsgBox('提示', '获取同业客户信息失败!', 500, 300);
            // }
          } else {
            _this.$message({
              message: message,
              type: 'error'
            });
          }
        }
      });
    },
    UTraceSet () {
      let dataObj = this.d1_BillCard.getBillCardValue();
      if (dataObj.cusName === '' || dataObj.intbankType === '' || dataObj.evalEndDt === '' || dataObj.largeBankNo === '' || dataObj.fnaCllTyp === '' || dataObj.bankProLic === ''
        || dataObj.holdType === '' || dataObj.isLt === '' || dataObj.expDateEnd === '' || dataObj.regiAreaCode === '' || dataObj.comRegAdd === '' || dataObj.natBusi === '' 
        || dataObj.mrkFlg === '' || dataObj.operArea === '') {
      } else {
        this.d1_BillCard.$refs.refForm.saveUTrace(this.d1_BillCard.formdatautrace);
      }
      this.$utils.clone(this.d1_BillCard.formdata, this.d1_BillCard.formdatautrace);
    },
    // 暂存
    save () {
      const Data = this.d1_BillCard.getBillCardValue();
      // 客户状态 2 生效 1暂存
      Data['cusState'] = '1';
      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'POST',
        url: this.$backend.cmisCus + '/api/cusintbank/saveTempcusIntbank',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.UTraceSet();
            this.$xutils.showMsgBox('提示', '暂存成功', 500, 300);// +JSON.stringify(response.data)
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 提交
    commit () {
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const data = this.d1_BillCard.getBillCardValue();
      // 客户状态 2 生效 1暂存
      this.UTraceSet();
      data['cusState'] = '2';
      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'POST',
        url: this.$backend.cmisCus + '/api/cusintbank/saveTempcusIntbank',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 保存后更新任务表状态
            this.updateTaskStatus();
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    },

    // 更改cus_mana_task 任务表状态为 3 已处理 cus_mana_task
    updateTaskStatus () {
      var _this = this;
      const data = _this.d1_BillCard.getBillCardValue();
      data['bizType'] = _this.cusCorp.bizType;
      _this.$xutils.request({
        // 同步请求
        async: true,

        type: 'POST',
        url: _this.$backend.cmisCus + '/api/cusmanatask/updateTaskStatusByCusId',
        data: JSON.stringify(_this.$xutils.toUpperCase(data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.$xutils.showMsgBox('提示', '提交成功', 500, 300, () => {
              _this.doBack();
            });// +JSON.stringify(response.data)
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
