<template>
<!--
    @created by lixm 2021-06-15
    @description 保证金存款特惠利率登记信息
  -->
  <div>
    <yu-xform ref="refForm" form-type="search" v-model="formdata" label-width="200px" :disabled="formDisabled">
    <yu-panel title="保证金存款特惠利率登记" panel-type="simple">
    <yu-xform-group :column="2">
      <!-- <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item> -->
      <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
      <yu-xform-item label="评级" placeholder="评级" name="cusCrdGrade" ctype="select" data-code="STD_ZB_GRADE_RANK"  disabled  ></yu-xform-item>
      <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" rules="required" disabled></yu-xform-item>
      <yu-xform-item label="担保方式" placeholder="担保方式" name="guarMode" ctype="radio" value-type="string" data-code="STD_ZB_GUAR_WAY" rules="required" exclude-key="21,40,60" :colspan="24"></yu-xform-item>
      <yu-xform-item label="对公活期存款日均（万元）" placeholder="对公活期存款日均（万元）" name="corpAverdayDep" maxlength="14" :formatter="formatter" :digit="2" type="num" rules="required" ></yu-xform-item>
      <yu-xform-item label="关联个人存款日均（万元）" placeholder="关联个人存款日均（万元）" name="relIndivAverdayDep" maxlength="14" :formatter="formatter" :digit="2" type="num" rules="required" ></yu-xform-item>
      <yu-xform-item label="对公贷款日均（万元）" placeholder="对公贷款日均（万元）" name="corpAverdayLoan" maxlength="14" :formatter="formatter" :digit="2" type="num" rules="required" ></yu-xform-item>
      <yu-xform-item label="是否开通网银" placeholder="是否开通网银" name="isOpnEbank" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
      <yu-xform-item label="是否代发工资" placeholder="是否代发工资" name="isIssSal" ctype="select" @change="isIssSalChange" data-code="STD_ZB_YES_NO" ></yu-xform-item>
      <yu-xform-item v-show="showIssSalTimes" label="代发工资户数" placeholder="代发工资户数" name="issSalTimes" ctype="input"></yu-xform-item>
      <yu-xform-item label="保证金存款利率是否需要申请优惠" placeholder="保证金存款利率是否需要申请优惠" name="isAppPrefer" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
      <yu-xform-item label="保证金比例" placeholder="保证金比例" name="bailPerc" ctype="yu-num" unit="%" rules="required"  ></yu-xform-item>
      <yu-xform-item label="保证金结息方式" placeholder="保证金结息方式" name="bailEiMode" ctype="select" data-code="STD_SECURITY_EI_TYPE" ></yu-xform-item>
      <yu-xform-item label="如申请上浮，则上浮比例为" placeholder="如申请上浮，则上浮比例为" name="upRatePercent" ctype="yu-num" unit="%" ></yu-xform-item>
      <yu-xform-item label="到期日" placeholder="到期日" name="endDate"  ctype="datepicker" value-format="yyyy-MM-dd"></yu-xform-item>
      <yu-xform-item label="状态" placeholder="状态" name="cusListStatus"  ctype="select" data-code="STD_CUS_LIST_STATUS" disabled></yu-xform-item>
      <yu-xform-item label="分项流水号" placeholder="分项流水号" name="serno"  ctype="input"  hidden></yu-xform-item>
    </yu-xform-group>
    </yu-panel>

    <div class="yu-grpButton">
        <yu-button type="primary"  @click="saveFn" v-show="saveBtnShow">保存</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>
<script>
import {clone, lookup, dateFormat} from '@/utils';
import {isNull} from "../../../../../../../bizmanage/lmtBiz/common/bizUtils";
import mixinForm from '@/utils/mixins/mixin-form';
import {selectCustomer} from '@/utils/unitchange';
yufp.lookup.reg('STD_ZB_GRADE_RANK,STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_SECURITY_EI_TYPE,STD_CUS_LIST_STATUS');
export default {
  mixins: [mixinForm, selectCustomer],
  props: {
    pageParams: Object,
    operate: String,
    dialogId: String
  },
  data: function () {
    return {
      formDisabled: false,
      saveBtnShow: true,
      formatter: function (money, num) {
        var num = num && num > 0 && num <= 20 ? num : 2;
        var money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        var l = money.split('.')[0].split('').reverse();
        var r = money.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      },
      showIssSalTimes: true,
    };
  },
  mounted () {
    var _this = this;
    yufp.clone(_this.pageParams, _this.formdata);
    if (_this.pageParams.op == 'VIEW') {
      this.formDisabled = true;
      this.saveBtnShow = false;
    }
    if (this.pageParams.otherType) {
      _this.otherTypeFn();
    }
  },
  methods: {
    isIssSalChange(val){
      if(val == 0){
        this.showIssSalTimes = false
      }else{
        this.showIssSalTimes = true
      }
    },
    saveFn () {
      var _this = this;
      var validate = false;
      //var dt = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      if (this.formdata.endDate < openday) {
        this.$message({
          duration: 4000,
          message: '到期日期不可小于当前日期！',
          type: 'warning'
        });
        return;
      }
      if (!isNull(_this.formdata.isIssSal) && _this.formdata.isIssSal == '1'){
        if (isNull(_this.formdata.issSalTimes)){
          this.$message({
            duration: 4000,
            message: '代发工资户数不能为空！',
            type: 'warning'
          });
          return;
        }
      }
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = this.$backend.cmisBiz + '/api/otherbaildeppreferrateappcuslist';
      if (_this.pageParams.op == 'ADD') {
        url = url + '/addotherbaildeppreferrateappcuslist';
      } else if (_this.pageParams.op == 'EDIT') {
        url = url + '/updateotherbaildeppreferrateappcuslist';
      }
      debugger;
      var data = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
            if (_this.pageParams.op == 'ADD') {
              _this.pageParams.op = 'EDIT';
            }
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },

    // 客户选取
    goCustomer () {
      var _this = this;
      if (!_this.saveBtnShow) {
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
          _this.$request({
            method: 'POST',
            url: `${backend.cmisCus}/api/cuscomgrade/selectGradeInfoByCusId`,
            data: retVal.cusId
          }).then(({ code, message, data }) => {
            if (code == '0') {
              console.log('========>', data);
              _this.formdata.cusCrdGrade = data.finalRank;
            } else {
              _this.$message({ message: '请求失败！', type: 'error' });
            }
          });
        }
      );
    },
    getCustomer(obj){
      var _this = this;
       //获取信用等级
      _this.$request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cuscomgrade/selectGradeInfoByCusId`,
        data: obj.cusId
      }).then(({ code, message, data }) => {
        if (code == '0') {
          console.log('========>', data);
          _this.formdata.cusCrdGrade = data.finalRank;
        } else {
          _this.$message({ message: '请求失败！', type: 'error' });
        }
      });
    },

    // 其他事项
    otherTypeFn () {
      var _this = this;
      _this.formdata.cusId = _this.pageParams.cusId;
      _this.formdata.cusName = _this.pageParams.cusName;
      this.$request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cuscomgrade/selectGradeInfoByCusId`,
        data: _this.pageParams.cusId
      }).then(({ code, message, data }) => {
        if (code == '0') {
          console.log('========>', data);
          _this.formdata.cusCrdGrade = data.finalRank;
        } else {
          _this.$message({ message: '请求失败！', type: 'error' });
        }
      });
    },

    // 返回信息页面
    cancelFn () {
      this.$dialog.close(this.dialogId);
      yufp.globalEventBus.$emit('refreshCusRelTable');
    }
  }
};
</script>
