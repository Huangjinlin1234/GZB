<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="购房合同编号" ctype="input" placeholder="购房合同编号" name="purHouseContNo"  :disabled="op" rules="required"></yu-xform-item>
          <yu-xform-item label="托管协议编号" ctype="input" placeholder="托管协议编号" name="tgxyNo"  :disabled="op" :rules="isrequired" :hidden="tgxyNoFlag"></yu-xform-item>
          <yu-xform-item label="预售许可证编号" ctype="input" placeholder="预售许可证编号" name="presellPermitNo"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="开发商/出卖方" ctype="input" placeholder="开发商/出卖方" name="developersName" rules="required" :disabled="op"></yu-xform-item>
          <yu-xform-item label="房屋坐落区县" ctype="yu-xdic-tree-addr" rules="required" placeholder="房屋坐落区县" name="houseCounty" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="房屋地址" ctype="input" name="houseAddr" rules="required" placeholder="房屋地址" :min="0"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="房屋状况" ctype="select" name="houseStatus" rules="required" placeholder="房屋状况" data-code="STD_HOUSE_STATUS"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="房屋用途" ctype="select" name="houseUse" rules="required"  placeholder="房屋用途" data-code="STD_HOUSE_USE"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="房屋类型" ctype="select" name="houseType" rules="required" placeholder="房屋类型"  data-code="STD_ZB_REAL_ESTATE"  :disabled="op" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="成交价（元）" ctype="yu-currency" :precision="2" placeholder="成交价（元）" @change="amtChange" name="houseTotal" rules="required"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="建筑面积（m2）" ctype="yu-currency" :precision="2" name="houseSqu" placeholder="建筑面积（m2）" @change="amtChange2" rules="required"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="单价（元/m2）" ctype="yu-currency" :precision="2" placeholder="单价（元/m2）" name="sizePrice" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="每月物业费（元/m2）" ctype="yu-currency" :precision="2" placeholder="每月物业费（元/m2" name="propertyExpense" rules="required"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="贷款成数" ctype="yu-num" placeholder="贷款成数" name="schedLoanPct" sign="%" :multiple="100" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="首付金额（元）" ctype="yu-currency" :precision="2" placeholder="首付金额（元)"  @change="amtChange3" name="firstpayAmt" rules="required"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="首付比例" ctype="yu-num" placeholder="首付比例" name="firstpayPerc" rules="required" sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="购房套数" ctype="select" placeholder="购房套数" name="purHouseNum" rules="required" data-code="STD_PUR_HOUSE_NUM"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="房屋结构" ctype="select" placeholder="房屋结构" name="houseStr" rules="required" data-code="STD_ZB_HOUSE_STRUC"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="土地使用方式" ctype="select" name="landUtilMode"  placeholder="土地使用方式" data-code="STD_ZB_LAND_TYPE"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="房屋建成时间" ctype="datepicker" name="houseBuildTime"  value-format="yyyy-MM-dd" placeholder="房屋建成时间"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="交房日期" ctype="datepicker" placeholder="交房日期" name="competionDate" value-format="yyyy-MM-dd"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="土地剩余使用年限" ctype="yu-currency" name="landSurplusYears" placeholder="土地剩余使用年限" :min="0"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="房龄" ctype="yu-currency" name="houseYears" placeholder="房龄" rules="required"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="是否限购区域" ctype="select" name="purResFlag" placeholder="是否限购区域" data-code="STD_ZB_YES_NO"  rules="required"  :disabled="op"></yu-xform-item>
          <yu-xform-item label="详细说明" ctype="select" name="speCaseDesc" placeholder="详细说明" hidden></yu-xform-item>
          <yu-xform-item label="其他说明" ctype="select" name="otherDesc" placeholder="其他说明"  hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_COMMON_DEBIT_CORRE,STD_PUR_HOUSE_NUM,STD_ZB_HOUSE_STRUC');
export default {
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqphouse/update',
      addUrl: this.$backend.cmisBiz + '/api/iqphouse/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      op: false,
      isrequired: null,
      tgxyNoFlag: null

    };
  },
  mounted () {
    var _this = this;
    // 修改
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqphouse/querybyiqpserno',
      data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno},
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });

    var op2 = _this.$route.params.hasOwnProperty('op') ? _this.$route.params.op : 'VIEW';
    if (op2 == 'VIEW') {
      this.op = true;
    } else if (op2 == 'EDIT') {
      this.op = false;
    }


    yufp.service.request({
      async: true,
      method: 'POST',
      url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
      data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.instanceInfo.bizId},
      callback: function (code, message, response) {
        if (code == '0') {
          let prdId = response.data.prdId;
          if (prdId == '022040' || prdId == '022051') {
            _this.tgxyNoFlag = false;
            _this.isrequired = {
              required: true,
              message: '必填项',
              trigger: 'blur'
            };
          } else {
            _this.tgxyNoFlag = true;
            _this.isrequired = null;
          }
        }
      }
    });
  },
  methods: {

    amtChange (value) {
      var _this = this;
      var iqpSerno = _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno;
      yufp.service.request({
        method: 'GET',
        url: backend.cmisBiz + '/api/iqploanapp/' + iqpSerno,
        callback: function (code, message, response) {
          if (code == '0') {
            var appAmt = response.data.appAmt;
            if (appAmt != null && appAmt != '') {
              _this.formdata.schedLoanPct = parseFloat(appAmt) / parseFloat(value);
            }
          }
        }
      });

      if (this.formdata.houseSqu != null && this.formdata.houseSqu != '' && value != null && value != '') {
        this.formdata.sizePrice = parseFloat(value) / parseFloat(this.formdata.houseSqu);
      }
      if (this.formdata.firstpayAmt != null && this.formdata.firstpayAmt != '' && value != null && value != '') {
        this.formdata.firstpayPerc = parseFloat(this.formdata.firstpayAmt) / parseFloat(value);
      }
    },
    amtChange2 (value) {
      if (this.formdata.houseTotal != null && this.formdata.houseTotal != '' && value != null && value != '') {
        this.formdata.sizePrice = parseFloat(this.formdata.houseTotal) / parseFloat(value);
      }
    },
    amtChange3 (value) {
      if (this.formdata.houseTotal != null && this.formdata.houseTotal != '' && value != null && value != '') {
        this.formdata.firstpayPerc = parseFloat(value) / parseFloat(this.formdata.houseTotal);
      }
    },
    doSaveMain () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqphuose/',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
          // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功' + JSON.stringify(response.data), 500, 300, () => {
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    },
    // 筛选掉高档住宅
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == '03') {
          return false;
        }
        return true;
      });
    }
  }
};
</script>