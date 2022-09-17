<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="formDisabled">
        <yu-tabs v-model="activeName" @tab-click="handleClick">
          <yu-tab-pane label="申请信息" name="basicTab">
            <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="审批编号" ctype="input" name="serno" disabled ></yu-xform-item>
                <yu-xform-item label="申请日期" ctype="input" name="appDate" disabled></yu-xform-item>
                <yu-xform-item label="客户经理" ctype="input" name="managerId" disabled></yu-xform-item>
                <yu-xform-item label="分支机构" ctype="input" name="managerBrId" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="客户信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="证件号码" ctype="input" name="certCode" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="所属行业" ctype="input" name="tradeClass" rules="required" ></yu-xform-item>
                <yu-xform-item label="产品编号" ctype="input" name="prdId" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="产品名称" ctype="input" name="prdName" rules="required" disabled ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="是否关联信息" :hideFilter="false" :collapseHide="false">
             <yu-xform-group :column="2">
                <yu-xform-item label="关联授信流水" ctype="iqp-loan-app-retail" name="iqpSerno"  placeholder="关联授信流水" @select-fn="commonSelectFn" :mapping="{'iqpSerno':'iqpSerno'}" width="900" height="900"></yu-xform-item>
            </yu-xform-group>
            </yu-panel>
            <yu-panel title="申请信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请金额" ctype="num" unit="元" name="appAmt" rules="required" ></yu-xform-item>
                <yu-xform-item label="申请期限" ctype="input" unit="月" name="appTerm" rules="required" ></yu-xform-item>
                <yu-xform-item label="报价利率"  name="offerRate" ctype="yu-num" rules="required"   placeholder="报价利率" sign="%" :multiple="100" ></yu-xform-item>
                <yu-xform-item label="申请执行利率"  name="appRate" ctype="yu-num" rules="required"   placeholder="申请执行利率" sign="%" :multiple="100" ></yu-xform-item>
                <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" ></yu-xform-item>
                <yu-xform-item label="担保方式说明" ctype="textarea" rules="required" name="guarDetailMode" :rows="3" :colspan="24"></yu-xform-item>
                <yu-xform-item label="申请原因" ctype="textarea" rules="required" name="appReason" :rows="3" :colspan="24"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-tab-pane>
          <yu-tab-pane label="影像材料" name="photoTab">
            <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
          </yu-tab-pane>
        </yu-tabs>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="onSave" v-show="saveBtnShow">保存</yu-button>
        <yu-button type="primary" @click="onSubmit" v-show="saveBtnShow">提交</yu-button>
        <yu-button type="primary" @click="onBack" v-show="cancelBtnShow">返回</yu-button>
      </yu-form-buttons>
      <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
    </div>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixinForm from '@/utils/mixins/mixin-list';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_ZB_GUAR_WAY');
export default {
  mixins: [mixinForm],
  components: { yufpNwfInit, imageSystem },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {

      activeName: 'basicTab',
      isZh: '0',
      saveBtnShow: true,
      cancelBtnShow: true,
      show_img: false,
      showPrint: true,

      formatter: function (money, num) {
        var num = num && num > 0 && num <= 20 ? num : 2;
        var money =
          parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
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
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit: function () {
      var _this = this;
      console.log('===========pageParams', _this.pageParams, _this.bizPageData);
      // 判断是否流程
      var biz = _this.bizPageData;
      if (biz == 'undefined' || biz == null || biz == '') {
        let formData;
        if (_this.pageParams) {
          formData = _this.pageParams;
        } else if (_this.$route.meta.params) {
          formData = _this.$route.meta.params.data;
        }
        console.log('===========params', _this.$route.meta.params);
        // this.formdata.serno = this.pageParams.serno;
        if (_this.$route.meta.params.op == 'VIEW') {
          _this.saveBtnShow = false;
          _this.formDisabled = true;
        }
        yufp.clone(formData, _this.formdata);
      } else {
        // 流程页面跳转
        let reqData = {
          condition: JSON.stringify({
            serno: _this.bizPageData.instanceInfo.bizId
          })
        };
        _this
          .$request({
            url: _this.dataUrl,
            method: 'POST',
            data: reqData
          })
          .then(({ code, message, data }) => {
            if (code == '0') {
              yufp.clone(data[0], _this.formdata);
            } else {
              _this.$message({ message: message || '操作失败', type: 'error' });
            }
          });

        _this.formDisabled = true;
        _this.saveBtnShow = false;
        _this.cancelBtnShow = false;
      }
      // 非空判断
      if (_this.formdata.bankDepBal) {
        _this.formdata.bankDepBal = parseFloat(_this.formdata.bankDepBal / 10000).toFixed(6);
      }
      if (_this.formdata.depAverday) {
        _this.formdata.depAverday = parseFloat(_this.formdata.depAverday / 10000).toFixed(6);
      }
      if (_this.formdata.bankLoanBal) {
        _this.formdata.bankLoanBal = parseFloat(_this.formdata.bankLoanBal / 10000).toFixed(6);
      }
      if (_this.formdata.loanAverday) {
        _this.formdata.loanAverday = parseFloat(_this.formdata.loanAverday / 10000).toFixed(6);
      }
      if (_this.formdata.yearDiscAmt) {
        _this.formdata.yearDiscAmt = parseFloat(_this.formdata.yearDiscAmt / 10000).toFixed(6);
      }
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
          _this.formdata.certCode = retVal.certCode;
        }
      );
    },

    gotradeClass () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      var dialogData = {
        cusId: _this.formdata.cusId
      };

      _this.$dialog.open('关联信息', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppViewPage', 900, 650, dialogData, () => {
        _this.$refs.refTable.remoteData();
      });
    },

    /**
     * 新增申请信息
     */
    onSave: function (actionType) {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var model = {};
      yufp.clone(_this.formdata, model);
      var url = this.$backend.cmisBiz + '/api/retailprimerateapp/addretailapp';
      var data = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
            if (actionType == 'SUBMIT') {
              let params = {
                serno: data.iqpSerno
              };
              this.submitProcessFun(params);
            }
            if (_this.$route.meta.params.op == 'ADD') {
              _this.$route.meta.params.op = 'EDIT';
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
    onSubmit: function () {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/retailprimerateapp/checkretailprimerateapp',
        data: _this.formdata,
        callback: function (code, message, response) {
          if (response.code != '0') {
            _this.$message({message: response.erortx, type: 'warning'});
          } else {
            _this.onSave('SUBMIT');
          }
        }
      });
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      if (orgType != '3') {
        _this.isZh = '1';
      }

      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'QT001';
      startdto.bizId = this.formdata.serno; // 流水号
      startdto.bizUserName = this.formdata.cusId;
      startdto.bizUserId = this.formdata.cusName;
      startdto.param = {
        isZh: _this.isZh, // 是否支行:1-是,0-否
        powerFlag: 'false'
      };
      // 村镇银行
      if (loginUser.org.orgType == 'A') {
        // 是否保全客户经理岗
        startdto.param.duty = '0';
        const dutysList = loginUser.dutys;
        if (dutysList != undefined && dutysList.length > 0) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
              startdto.param.duty = '1';
              break;
            }
          }
        }
        if (loginUser.orgCode.startsWith('80')) {
          startdto.bizType = 'SGF02';// （寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          startdto.bizType = 'DHF02';// （东海）
        }
      }
      console.log('业务类型--->', startdto.bizType);
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.onBack();
    },
    /**
     * 关闭当前页面
     */
    onBack: function () {
      console.log('=============', this.$route.meta.params, this.pageParams);
      if (this.$route.meta.params.data) {
        yufp.router.removeTab(this.$route.path);
      } else if (this.pageParams) {
        this.$dialog.close(this.dialogId);
      }
    },
    handleClick: function (tab, event) {
      if (this.activeName == 'approveTab') {
        this.showPrint = false;
        this.$nextTick(() => {
          this.showPrint = true;
        });
      }
    }
  }

};
</script>
