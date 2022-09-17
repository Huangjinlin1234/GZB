
<template>
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="listFormDisabled">
      <yu-xform-group>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" rules="required" ctype="input" colspan="24" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" rules="required" colspan="24" disabled></yu-xform-item>
          <yu-xform-item label="申请类型" placeholder="申请类型" name="appType" ctype="select" rules="required" data-code="STD_SIGN_APP_TYPE" @change="canShow" colspan="24"></yu-xform-item>
          <yu-xform-item label="拟签发日期" placeholder="拟签发日期" name="planIssDate" ctype="datepicker" rules="required"></yu-xform-item>
          <yu-xform-item label="拟签发金额" placeholder="拟签发金额" name="planIssAmt" ctype="input" rules="required" ></yu-xform-item>
          <yu-xform-item label="担保方式" placeholder="担保方式" colspan="24" name="guarMode" ctype="checkbox" rules="required" data-code="STD_SIGN_GUAR_TYPE" ></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group v-if="bailRateShow">
          <yu-xform-item label="保证金比例" placeholder="保证金比例"  name="bailRate"  rules="required" ctype="yu-num" colspan="24"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="利率值" placeholder="利率值" name="rate" ctype="input" rules="required" colspan="24"></yu-xform-item>
          <yu-xform-item label="票据期限" placeholder="票据期限" name="drftTerm" ctype="input" rules="required" colspan="24"></yu-xform-item>
          <yu-xform-item label="票据类型" placeholder="票据类型"  name="drftType" ctype="select" data-code="STD_PLD_DRFT_TYPE" rules="required" colspan="24"></yu-xform-item>
          <yu-xform-item label="业务类型" placeholder="业务类型" name="busiType" ctype="select" data-code="STD_BIZ_TYPE" rules="required" colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {clone, lookup, dateFormat} from '@/utils';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_SIGN_APP_TYPE,STD_SIGN_GUAR_TYPE,STD_PLD_DRFT_TYPE,STD_BIZ_TYPE');

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      formDisabled: false,
      saveBtnShow: true,
      bailRateShow: true,
      customerBtn: false,
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'userCode', 'userInfo'])
  },
  mounted () {
    yufp.lookup.bind("STD_BIZ_TYPE", function (data) {
      console.log("================STD_BIZ_TYPE", data)
    });
    let _this = this;
    this.viewType = this.pageParams.op;
    // console.log(this.viewType);
    if (this.viewType === 'DETAIL') {
      clone(this.pageParams[0], this.formdata);
      this.listFormDisabled = true;
      this.saveBtnShow = false;
    }
    if (this.viewType === 'EDIT') {
      clone(this.pageParams[0], this.formdata);
    }
    if (this.viewType === 'ADD') {
      let serno = this.pageParams.serno;
      console.log(this.pageParams.serno);
      _this.formdata.serno = serno;
      if(_this.pageParams.otherType){
        _this.customerBtn = false
        _this.formdata.cusId = this.pageParams.cusId;
        _this.formdata.cusName = this.pageParams.cusName;
      }else{
        _this.customerBtn = true
      }
    }
    this.$nextTick(() => {
      _this.formdata.inputIdName = _this.userInfo;
      _this.formdata.InputBrName = _this.org.name;
      _this.formdata.updateTime = dateFormat(new Date(), '{y}-{m}-{d}');
      _this.formdata.inputId = _this.userCode;
      _this.formdata.inputBrId = _this.org.code;
      _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
      _this.formdata.updId = _this.userCode;
      _this.formdata.updBrId = _this.org.code;
      _this.formdata.updDate = dateFormat(new Date(), '{y}-{m}-{d}');
    });
  },
  methods: {
    canShow: function (val) {
      if(val){
        // let appType = this.formdata.appType;
        if (val == '01') { // 敞口类
          this.bailRateShow = true;
        } else { // 全资质押类
          this.bailRateShow = false;
          // this.formdata.bailRate = '';
          // 保证金、存单、结构性存款对于字典项数值05、06、07
        }
      }
    },

    // setRate: function () {
    //   let bailRate = this.formdata.bailRate;
    //   this.formdata.rate = bailRate;
    // },

    // 客户选取
    goCustomer () {
      var _this = this;
      if (this.viewType != 'ADD') {
        return;
      }
      if(!_this.customerBtn){
        return;
      }
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;
        }
      );
    },

    /**
     * 返回
     */
    cancelFn: function () {
      var _this = this;
      this.$dialog.close(this.dialogId);
    },

    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SAVE');
      } else {
        this.editSaveFn('SAVE');
      }
    },

    addSaveFn: function (actionType) {
      var _this = this;

      _this.formdata.oprType = '01';

      var info = _this.formdata.guarMode.toString();
      _this.formdata.guarMode = info;

      console.log(this.oprType);
      console.log(this.guarMode);

      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }

      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignplanappsub/`,
        data: _this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success'});
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },

    editSaveFn: function (actionType) {
      var _this = this;
      var info = _this.formdata.guarMode.toString();
      _this.formdata.guarMode = info;

      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignplanappsub/update`,
        data: _this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据修改成功！', type: 'success'});
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
        } else {
          _this.$message({ message: '数据修改失败！', type: 'error'});
        }
      });
    }
  }
};
</script>
