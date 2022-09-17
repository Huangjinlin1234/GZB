
<template>
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="listFormDisabled">
      <yu-xform-group>
        <!-- <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" rules="required" ctype="input" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item> -->
        <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="借款人选取"></yu-xform-item>
        <yu-xform-item label="评级" placeholder="评级" name="cusCrdGrade" ctype="select" data-code="STD_ZB_GRADE_RANK" disabled></yu-xform-item>
        <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="担保方式" placeholder="担保方式" name="guarMode" ctype="radio" rules="required" data-code="STD_ZB_GUAR_WAY" exclude-key="21,40,60"></yu-xform-item>
        <yu-xform-item label="对公活期存款日均（万元）" placeholder="对公活期存款日均（万元）" name="corpAverdayDep" :formatter="formatter" :digit="2" type="num" rules="required"></yu-xform-item>
        <yu-xform-item label="关联个人存款日均(万元)" placeholder="关联个人存款日均(万元)" name="relIndivAverdayDep" :formatter="formatter" :digit="2" type="num" rules="required"></yu-xform-item>
        <yu-xform-item label="对公贷款日均(万元)" placeholder="对公贷款日均(万元)" name="corpAverdayLoan" :formatter="formatter" :digit="2" type="num" rules="required"></yu-xform-item>
        <yu-xform-item label="是否开通网银" placeholder="是否开通网银" name="isOpnEbank" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
        <yu-xform-item label="是否代发工资" placeholder="是否代发工资" name="isIssSal" ctype="select" @change="isIssSalChange" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
        <yu-xform-item v-if="showIssSalTimes" label="代发工资户数" placeholder="代发工资户数" name="issSalTimes" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="银票手续费率是否需要申请优惠" placeholder="银票手续费率是否需要申请优惠" name="isAppPrefer" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
        <yu-xform-item label="按照管理办法测试的月手续费率" placeholder="按照管理办法测试的月手续费率" name="chrgRateM" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="分支行此次申请的手续费率" placeholder="每笔万分之五或者月手续费率X%" name="curtChrgRate" ctype="input" rules="required"></yu-xform-item>
        <yu-xform-item label="到期日期" placeholder="到期日期" name="endDate" ctype="datepicker" value-format="yyyy-MM-dd" rules="required"></yu-xform-item>
        <yu-xform-item label="客户名单状态" placeholder="客户名单状态" name="cusListStatus" ctype="select" disabled data-code="STD_CUS_LIST_STATUS"></yu-xform-item>
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
import { clone, lookup, dateFormat } from '@/utils';
import {toSingleCustomer, selectCustomer} from '@/utils/unitchange';
import mixinForm from '@/utils/mixins/mixin-form';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg(
  'STD_ZB_GRADE_RANK,STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_CUS_LIST_STATUS'
);

export default {
  mixins: [toSingleCustomer, mixinForm, selectCustomer],
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
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'userCode', 'userInfo'])
  },
  mounted () {
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
      var serno = this.pageParams.serno;
      _this.formdata.serno = serno;
      _this.formdata.cusListStatus = '00';
      _this.formdata.isAppPrefer = '1';
    }
    if (this.pageParams.otherType) {
      _this.otherTypeFn();
    }
    // 非空判断
    if (_this.formdata.corpAverdayDep) {
      _this.formdata.corpAverdayDep = parseFloat(_this.formdata.corpAverdayDep / 10000).toFixed(6);
    }
    if (_this.formdata.relIndivAverdayDep) {
      _this.formdata.relIndivAverdayDep = parseFloat(_this.formdata.relIndivAverdayDep / 10000).toFixed(6);
    }
    if (_this.formdata.corpAverdayLoan) {
      _this.formdata.corpAverdayLoan = parseFloat(_this.formdata.corpAverdayLoan / 10000).toFixed(6);
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
    isIssSalChange(val){
      if(val == 0){
        this.showIssSalTimes = false
      }else{
        this.showIssSalTimes = true
      }
    },
    /**
     * 返回
     */
    cancelFn: function () {
      // var _this = this;
      this.$dialog.close(this.dialogId);
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

          this.$request({
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
    getCustomer (obj) {
      var _this = this;
      this.$request({
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

    /**
     * 保存按钮
     */
    saveFn: function () {
      var dt = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      if (this.formdata.endDate < dt) {
        this.$message({
          duration: 4000,
          message: '到期日期不可小于当前日期！',
          type: 'warning'
        });
        return;
      }
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

      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      var model = {};
      yufp.clone(_this.formdata, model);
      model.corpAverdayDep = parseFloat(model.corpAverdayDep * 10000).toFixed(2);
      model.relIndivAverdayDep = parseFloat(model.relIndivAverdayDep * 10000).toFixed(2);
      model.corpAverdayLoan = parseFloat(model.corpAverdayLoan * 10000).toFixed(2);
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otheraccpperferfeeappcuslist/`,
        data: model
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success' });
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error' });
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
      var model = {};
      yufp.clone(_this.formdata, model);
      model.corpAverdayDep = parseFloat(model.corpAverdayDep * 10000).toFixed(2);
      model.relIndivAverdayDep = parseFloat(model.relIndivAverdayDep * 10000).toFixed(2);
      model.corpAverdayLoan = parseFloat(model.corpAverdayLoan * 10000).toFixed(2);
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otheraccpperferfeeappcuslist/update`,
        data: model
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据修改成功！', type: 'success' });
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
        } else {
          _this.$message({ message: '数据修改失败！', type: 'error' });
        }
      });
    }
  }
};
</script>
