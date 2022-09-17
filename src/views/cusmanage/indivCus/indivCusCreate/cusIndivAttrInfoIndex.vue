<template>
  <!--
    @created by
    @updated by zhoumw
    @description 客户属性
  -->
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import { mapState } from 'vuex';
import d1Billcard from './cusIndivAttrInfo_d1_BillCard.vue';
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
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
        个人客户客户属性
       */
    AfterInit () {
      let _this = this;
      let data = _this.$route.meta.params;
      this.d1_BillCard = this.$refs.d1_BillCard;
      let cusId = data.cusId;
      if (data != null && data != 'undefined') {
        // 客户编号
        if (data.cusId != null && data.cusId != 'undefined') {
          _this.$refs.d1_BillCard.setBillCardItemValue('cusId', data.cusId);
        }
      }

      // 业务条线（B01:正式/B02:临时）
      if (data.bizType != null && data.bizType != 'undefined') {
        var bizType = data.bizType;
        if (bizType == 'B01' || bizType == 'B03') {
          _this.$refs.d1_BillCard.required = 'required';
          _this.$refs.d1_BillCard.setItemVisible('isSmconCus', true);
        }else{
          _this.$refs.d1_BillCard.setItemVisible('isSmconCus', false)
        }
      }
      if (data.op != null && data.op != 'undefined') {
        var op = data.op;
        if (op == 'VIEW') {
          _this.$refs.d1_BillCard.disabled = true;
          _this.$refs.d1_BillCard.required = 'required';
        }
      }
      let cusIndivAttr = {};
      cusIndivAttr.cusId = cusId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindivattr/queryCusIndivAttr',
        data: cusIndivAttr,
        callback: function (code, message, response) {
          if (code == '0') {
            if (response.data != null) {
              yufp.clone(response.data, _this.$refs.d1_BillCard.formdata);
            }
            if(_this.$refs.d1_BillCard.formdata.inputId == '' || _this.$refs.d1_BillCard.formdata.inputId == null) _this.$refs.d1_BillCard.formdata.inputId = _this.$xutils.getDefaultformulaData('$LoginUserId');
            if(_this.$refs.d1_BillCard.formdata.inputIdName == '' || _this.$refs.d1_BillCard.formdata.inputIdName == null) _this.$refs.d1_BillCard.formdata.inputIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
            if(_this.$refs.d1_BillCard.formdata.inputBrId == '' || _this.$refs.d1_BillCard.formdata.inputBrId == null) _this.$refs.d1_BillCard.formdata.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgId');
            if(_this.$refs.d1_BillCard.formdata.inputBrIdName == '' || _this.$refs.d1_BillCard.formdata.inputBrIdName == null) _this.$refs.d1_BillCard.formdata.inputBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
            if(_this.$refs.d1_BillCard.formdata.managerId == '' || _this.$refs.d1_BillCard.formdata.managerId == null) _this.$refs.d1_BillCard.formdata.managerId = _this.$xutils.getDefaultformulaData('$LoginUserId');
            if(_this.$refs.d1_BillCard.formdata.managerIdName == '' || _this.$refs.d1_BillCard.formdata.managerIdName == null) _this.$refs.d1_BillCard.formdata.managerIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
            if(_this.$refs.d1_BillCard.formdata.managerBrId == '' || _this.$refs.d1_BillCard.formdata.managerBrId == null) _this.$refs.d1_BillCard.formdata.managerBrId = _this.$xutils.getDefaultformulaData('$LoginOrgId');
            if(_this.$refs.d1_BillCard.formdata.managerBrIdName == '' || _this.$refs.d1_BillCard.formdata.managerBrIdName == null) _this.$refs.d1_BillCard.formdata.managerBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
            if(_this.$refs.d1_BillCard.formdata.inputDate == '' || _this.$refs.d1_BillCard.formdata.inputDate == null) _this.$refs.d1_BillCard.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
          } else {
            this.$xutils.showMsgBox('提示', '' + response.code + ',错误信息：' + response.message);
          }

          if (_this.d1_BillCard.utrace === false) {
            _this.d1_BillCard.utrace = true;
          }
          _this.$utils.clone(_this.d1_BillCard.formdata, _this.d1_BillCard.formdatautrace);
        }
      });
    },

    // 暂存
    save () {
      this.dosave();
    },

    // 保存
    dosave (saveStatus) {
      const Data = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusindivattr/save',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '暂存成功', 500, 300, () => {});
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
