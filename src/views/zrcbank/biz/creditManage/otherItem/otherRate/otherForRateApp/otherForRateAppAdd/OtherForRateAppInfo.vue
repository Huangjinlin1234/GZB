
<template>
  <!--
    @created by lixm 2021-06-04
    @description 外币利率定价申请信息-增删改查
  -->
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
      <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform-group>
        <yu-xform-item label="审批表编号" placeholder="审批表编号" name="serno" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="申请日期" placeholder="申请日期" name="inputDate" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="客户经理" placeholder="客户经理" name="inputIdName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="分支机构" placeholder="分支机构" name="InputBrIdName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="优惠理由" placeholder="2000个字符以内" name="preferResn" ctype="textarea" rules="required" :rows="3" :colspan="24" ></yu-xform-item>
      </yu-xform-group>
      </yu-panel>

      <yu-panel title="外币利率定价申请信息" :hideFilter="false" :collapseHide="false">
      <yu-xform-group>
        <!-- <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item> -->
        <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
        <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="信用等级" placeholder="信用等级" disabled name="cusCrdGrade" ctype="select" data-code="STD_ZB_GRADE_RANK" ></yu-xform-item>
        <yu-xform-item label="客户类型" placeholder="客户类型" name="cusType" ctype="select" data-code="STD_ZB_CUS_TYP"  rules="required"></yu-xform-item>
        <yu-xform-item label="上年我行存款日均（人民币）（万元）" placeholder="上年我行存款日均（人民币）（万元）" name="lyearAverdayDepCny" maxlength="14" :formatter="formatter" :digit="6" type="num" rules="required"></yu-xform-item>
        <yu-xform-item label="上年我行存款日均（外币）（万元）" placeholder="上年我行存款日均（外币）（万元）" name="lyearAverdayDepFor" maxlength="14" :formatter="formatter" :digit="6" type="num" rules="required"></yu-xform-item>
        <yu-xform-item label="上年我行国际结算量（万元）" placeholder="上年我行国际结算量（万元）" name="lyearInterSettl" maxlength="14" :formatter="formatter" :digit="6" type="num" rules="required"></yu-xform-item>
        <yu-xform-item label="上年我行结售汇量（万元）" placeholder="上年我行结售汇量（万元）" name="lyearSale" maxlength="14" :formatter="formatter" :digit="6" type="num" rules="required"></yu-xform-item>
        <yu-xform-item label="其他贡献情况" placeholder="2000个字符以内" name="otherContritutions" ctype="textarea" rules="required" :rows="3" :colspan="24"></yu-xform-item>
        <yu-xform-item label="其他合作意向" placeholder="2000个字符以内" name="otherIntenForCoop" ctype="textarea" rules="required" :rows="3" :colspan="24"></yu-xform-item>
      </yu-xform-group>
       </yu-panel>

      <yu-panel title="优惠内容" :hideFilter="false" :collapseHide="false">
       <yu-xform-group>
        <yu-xform-item label="优惠项目" placeholder="优惠项目" name="preferPro" ctype="input" rules="required" ></yu-xform-item>
        <yu-xform-item label="基本收费标准" placeholder="基本收费标准" name="stdBaseChrg" ctype="input" rules="required" ></yu-xform-item>
        <yu-xform-item label="上年优惠情况" placeholder="上年优惠情况" name="lyearOfferRate" ctype="input" rules="required" ></yu-xform-item>
        <yu-xform-item label="本次申请优惠价格" placeholder="本次申请优惠价格" name="curtAppOfferRate" ctype="input" rules="required" ></yu-xform-item>
        <yu-xform-item label="优惠期限（起始日）" placeholder="优惠期限（起始日）" name="preferTermStartDate" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" ></yu-xform-item>
        <yu-xform-item label="优惠期限（到期日）" placeholder="优惠期限（到期日）" name="preferTermEndDate" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" ></yu-xform-item>
        <yu-xform-item label="他行优惠条件" placeholder="2000个字符以内" name="otherBankPreferCond" ctype="textarea" rules="required" :rows="3" :colspan="24"></yu-xform-item>
      </yu-xform-group>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="submitBtnShow" icon="check" type="primary" @click="submitFn">提交</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn" v-show="cancelBtnShow">返回</yu-button>
      </div>
    </yu-xform>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import {clone, lookup, dateFormat} from '@/utils';
import { mapState } from 'vuex';
import {validator} from '@/utils/validate';
import mixinForm from '@/utils/mixins/mixin-form';
import {selectCustomer} from '@/utils/unitchange';
lookup.reg('STD_ZB_CREDIT_GRADE', 'STD_ZB_CUS_TYP', 'STD_ZB_CREDIT_GRADE');
export default {
  mixins: [mixinForm, selectCustomer],
  name: 'OtherForRateAppInfo',
  components: {yufpNwfInit},
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/otherforrateapp/getotherforrateapp',
      updateUrl: this.$backend.cmisBiz + '/api/otherforrateapp/updateotherforrateapp',
      addUrl: this.$backend.cmisBiz + '/api/otherforrateapp/addotherforrateapp',
      formdata: {},
      formDisabled: false,
      viewType: 'DETAIL',
      saveBtnShow: true,
      submitBtnShow: true,
      cancelBtnShow: true,
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
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },
  mounted () {
    debugger;
    let _this = this;
    // 判断是否流程
    var biz = _this.applyInfoParams;
    if (biz == 'undefined' || biz == null || biz == '') {
      this.parentRoutName = this.$route.params.name;
      this.viewType = this.$route.meta.params.actionType ? this.$route.meta.params.actionType : this.$route.meta.params.op;
      let formData = this.$route.meta.params.data;
      yufp.service.request({
        async: false,
        method: 'GET',
        url: backend.cmisBiz + '/api/otherforrateapp/' + formData.serno,
        callback (code, message, response) {
          if (response.code == '0') {
            formData = response.data
          } else {
            _this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        }
      });

      if (this.viewType == 'DETAIL') {
        clone(formData, this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
      }
      if (this.viewType == 'EDIT') {
        clone(formData, this.formdata);
        _this.formdata.inputIdName = _this.userInfo;
        _this.formdata.InputBrIdName = _this.org.name;
      }
      this.$nextTick(() => {
        if (this.viewType == 'ADD') {
          // const serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
          _this.formdata.serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
          _this.formdata.inputIdName = _this.userInfo;
          _this.formdata.inputId = _this.userCode;
          _this.formdata.inputBrId = _this.org.code;
          _this.formdata.InputBrIdName = _this.org.name;
          _this.formdata.updId = _this.userCode;
          _this.formdata.updBrId = _this.org.code;
          _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
        } else {
        // 上年我行存款日均（人民币）（万元）
          var lyearAverdayDepCny = _this.formdata.lyearAverdayDepCny;
          _this.formdata.lyearAverdayDepCny = parseFloat(parseFloat(lyearAverdayDepCny / 10000).toFixed(6));
          // 上年我行存款日均（外币）（万元）
          var lyearAverdayDepFor = _this.formdata.lyearAverdayDepFor;
          _this.formdata.lyearAverdayDepFor = parseFloat(parseFloat(lyearAverdayDepFor / 10000).toFixed(6));
          // 上年我行国际结算量（万元）
          var lyearInterSettl = _this.formdata.lyearInterSettl;
          _this.formdata.lyearInterSettl = parseFloat(parseFloat(lyearInterSettl / 10000).toFixed(6));
          // 上年我行结售汇量（万元）
          var lyearSale = _this.formdata.lyearSale;
          _this.formdata.lyearSale = parseFloat(parseFloat(lyearSale / 10000).toFixed(6));
        }
      });
    } else { // 流程页面跳转
      let reqData = {
        condition: JSON.stringify({serno: _this.applyInfoParams.serno})
      };
      this.$request({
        url: _this.dataUrl,
        method: 'POST',
        data: reqData
      }).then(({code, message, data}) => {
        if (code == '0') {
          // 上年我行存款日均（人民币）（万元）
          var lyearAverdayDepCny = data[0].lyearAverdayDepCny;
          data[0].lyearAverdayDepCny = parseFloat(parseFloat(lyearAverdayDepCny / 10000).toFixed(6));
          // 上年我行存款日均（外币）（万元）
          var lyearAverdayDepFor = data[0].lyearAverdayDepFor;
          data[0].lyearAverdayDepFor = parseFloat(parseFloat(lyearAverdayDepFor / 10000).toFixed(6));
          // 上年我行国际结算量（万元）
          var lyearInterSettl = data[0].lyearInterSettl;
          data[0].lyearInterSettl = parseFloat(parseFloat(lyearInterSettl / 10000).toFixed(6));
          // 上年我行结售汇量（万元）
          var lyearSale = data[0].lyearSale;
          data[0].lyearSale = parseFloat(parseFloat(lyearSale / 10000).toFixed(6));
          clone(data[0], _this.formdata);
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });

      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
      this.cancelBtnShow = false;
    }
  },
  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 返回列表页面
      yufp.globalEventBus.$emit('refreshOtherForRateAppTable');
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
          _this.formdata.cusCrdGrade = retVal.cusCrdGrade;
          _this.formdata.cusType = retVal.cusType;
          //获取信用等级
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

    /**
     * 提交按钮
     */
    submitFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SUBMIT');
      } else {
        this.editSaveFn('SUBMIT');
      }
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      const bizType = 'QT003'; // 对公外币利率定价
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = loginUser.userName;
      startdto.bizUserId = loginUser.loginCode;
      startdto.param = {
        orgType: loginUser.org.orgType
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      // yufp.frame.removeTab(this.$route.path);
      this.cancelFn();
    },

    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
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
        url: _this.addUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success'});
          if (actionType == 'SUBMIT') {
            let params = {
              serno: data.serno,
              certCode: data.certCode
            };
            this.submitProcessFun(params);
          }
          if (this.viewType == 'ADD') {
            this.viewType = 'EDIT';
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
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
        url: _this.updateUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          } else {
            _this.$message({ message: '数据更新成功！', type: 'success'});
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error'});
        }
      });
    }
  }
};
</script>
