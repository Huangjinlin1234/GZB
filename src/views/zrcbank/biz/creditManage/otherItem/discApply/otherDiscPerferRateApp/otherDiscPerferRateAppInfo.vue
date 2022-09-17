<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="formDisabled">
        <yu-tabs v-model="activeName" @tab-click="handleClick">
          <yu-tab-pane label="申请信息" name="basicTab">
            <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="审批编号" ctype="input" name="serno" disabled></yu-xform-item>
                <yu-xform-item label="申请日期" ctype="input" name="inputDate" disabled></yu-xform-item>
                <yu-xform-item label="客户经理" ctype="input" name="managerId" disabled></yu-xform-item>
                <yu-xform-item label="分支机构" ctype="input" name="managerBrId" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="企业信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <!-- <yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item> -->
                <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="银行存款余额（万元）" name="bankDepBal" :formatter="formatter" :digit="6" type="num" rules="required" :min="0"></yu-xform-item>
                <yu-xform-item label="存款日均（万元）" name="depAverday" :formatter="formatter" :digit="6" type="num" rules="required" :min="0"></yu-xform-item>
                <yu-xform-item label="银行贷款余额（万元）" name="bankLoanBal" :formatter="formatter" :digit="6" type="num" rules="required" :min="0"></yu-xform-item>
                <yu-xform-item label="贷款日均（万元）" rules="required" name="loanAverday" :formatter="formatter" :digit="6" type="num" :min="0"></yu-xform-item>
                <yu-xform-item label="本行年度贴现总额（万元）" name="yearDiscAmt" :formatter="formatter" :digit="6" type="num" rules="required" :min="0"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="申请信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请内容" ctype="textarea" rules="required" name="favourContent" :rows="3" :colspan="24" placeholder="2000个字符以内">
                </yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-tab-pane>
          <yu-tab-pane label="影像材料" name="photoTab">
            <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
          </yu-tab-pane>
          <yu-tab-pane label="贴现优惠利率审批表" name="approveTab">
            <iframe v-if="showPrint" :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
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
import mixinList from '@/utils/mixins/mixin-list';
import mixinForm from '@/utils/mixins/mixin-form';
import {selectCustomer} from '@/utils/unitchange';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  mixins: [mixinForm, selectCustomer],
  components: { yufpNwfInit, imageSystem },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl:
        this.$backend.cmisBiz +
        '/api/otherdiscperferrateapp/getotherdiscperferrateapp',
      activeName: 'basicTab',
      formdata: {},
      formDisabled: false,
      dialogVisibleSelected: false,
      formDataPlan: {},
      triggerEditChangeEvent: {},
      formType: {},
      // type: this.pageParams.op,
      // type: this.$route.meta.params.op,
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
    this.printUrl = this.$backend.frptRptService + 'yhllspb.cpt&serno=' + this.formdata.serno;
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
        showImg(formData);
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
              showImg(data[0]);
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

      function showImg (params) {
        _this.show_img = false;
        _this.imageBizParam = [
          {
            // TODO 根据实际业务场景修正
            top_outsystem_code: 'XXD_QTSXSQ',
            outsystem_code:"XXD_QTSXSQ0501",
            index: {
              businessid: params.serno,
              custtype: params.curType,
              custconductid: params.inputId,
              custconductname: params.inputIdName,
              orgid: params.inputBrId,
              orgname: params.inputBrIdName,
              opername: params.updIdName,
              custid: params.cusId,
              custname: params.cusName,
              custconduct: '',
              operid: '',
              maintaindate: '',
              contid: "",
              billno: ""
            }
          }
        ];

        _this.$nextTick(() => {
          _this.show_img = true;
        });
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
        }
      );
    },
    getCustomer(){

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
      model.bankDepBal = parseFloat(model.bankDepBal * 10000).toFixed(2);
      model.depAverday = parseFloat(model.depAverday * 10000).toFixed(2);
      model.bankLoanBal = parseFloat(model.bankLoanBal * 10000).toFixed(2);
      model.loanAverday = parseFloat(model.loanAverday * 10000).toFixed(2);
      model.yearDiscAmt = parseFloat(model.yearDiscAmt * 10000).toFixed(2);
      var url = this.$backend.cmisBiz + '/api/otherdiscperferrateapp';
      if (_this.$route.meta.params.op == 'ADD') {
        url = url + '/';
      } else if (_this.$route.meta.params.op == 'EDIT') {
        url = url + '/update';
      }
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
                serno: data.serno
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
      this.onSave('SUBMIT');
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      var isOver = null;
      var dialogData = {};
      const bizType = 'QT006'; // 贴现优惠利率定价
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;      

      if('1' == loginUser.org.orgType){
        _this.$dialog.open(
          '',
          'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppSelectDialog',
          900,
          650,
          dialogData,
          (retVal) => {
            isOver = retVal;
            if(isOver != "1" && isOver != "0"){
            _this.$message({
              message: '请选择是否保证金超过1000万',
              type: 'warning'
            });
            return;
          }
          if(isOver == "1"){
            isOver = "Y";
          }else{
            isOver = "N";
          }
          startdto.param = {orgType: loginUser.org.orgType, amtType: isOver};
          if('A' == loginUser.org.orgType){
            if (loginUser.orgCode.startsWith('80')) {
                startdto.bizType = 'SGF07';// （寿光）
            } else if (loginUser.orgCode.startsWith('81')) {
                startdto.bizType = 'DHF07';// （东海）
            }
          }
          console.log('业务类型--->', startdto.bizType);
          _this.$refs.yufpNwfInit.wfInit(startdto);
          },
          true,
          true
        );    
      }else {
        startdto.param = {orgType: loginUser.org.orgType, amtType: "N"};
        if('A' == loginUser.org.orgType){
          if (loginUser.orgCode.startsWith('80')) {
                startdto.bizType = 'SGF07';// （寿光）
            } else if (loginUser.orgCode.startsWith('81')) {
                startdto.bizType = 'DHF07';// （东海）
            }
        }
        console.log('业务类型--->', startdto.bizType);
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }  
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
      // this.$xutils.getParentPage(this, null, 'reload');

      // var _this = this;
      // yufp.router.removeTab(_this.$route.path);
      // // 返回列表页面
      // yufp.globalEventBus.$emit('refreshRefTable');
    },
    handleClick: function (tab, event) {
      if(this.activeName == "approveTab"){
        this.showPrint = false;
        this.$nextTick(() => {
          this.showPrint = true;
        });
      }
    }
  }
};
</script>