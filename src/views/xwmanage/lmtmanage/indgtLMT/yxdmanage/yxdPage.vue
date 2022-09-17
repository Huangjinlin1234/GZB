
<template>
  <!--
    @created by wh 2021-7-8 15:43:33
    @description 优享贷
  -->
  <div class="tab-form">
   <yu-panel>
    <yu-tabs v-model="tabName" :tab-position="'left'">

      <yu-tab-pane label="基本信息" name="base">
        <yu-panel>
          <yu-xform ref="refForm" label-width="160px" v-model="formdata" class="yu-form-gap" :validate-on-rule-change="false" :disabled="pageType" :form-type="formType">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled ></yu-xform-item>

            </yu-xform-group>
              <yu-xform-group :column="2">
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="电话号码" ctype="input" placeholder="电话号码" name="phone" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="学历" ctype="select" name="edu" rules="required" data-code="STD_ZB_EDU" placeholder="学历" disabled></yu-xform-item>
            <yu-xform-item label="居住年限" ctype="input" placeholder="居住年限" name="resiYears" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select"  name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" disabled></yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" rules="required" disabled :hidden="marStatusFlag" key="spouseCusId"  >  </yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" rules="required" :hidden="marStatusFlag"  disabled></yu-xform-item>
            <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone" rules="required" :hidden="marStatusFlag"  disabled></yu-xform-item>
            <yu-xform-item label="配偶证件号码" ctype="input" placeholder="配偶证件号码" name="spouseCertCode" rules="required" :hidden="marStatusFlag"> </yu-xform-item>
            <yu-button type="primary" autofocus icon="search"  :hidden="marStatusFlag" v-if="lookPage">查询</yu-button>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="livingAddr" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="livingAddr" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="isHaveChildren" disabled :hidden="dataVif" ></yu-xform-item>
            <yu-xform-item label="是否线上抵押" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否线上抵押"  name="isOnlinePld" disabled :hidden="dataVif" ></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode"  data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled :hidden="dataVif"></yu-xform-item>

            <yu-xform-item label="模型建议金额" ctype="input" placeholder="模型建议金额" name="modelAdviceAmt" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="模型建议利率" ctype="input" placeholder="模型建议利率" name="modelAdviceRate" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="input" placeholder="参考利率" name="refRate" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="建议金额" ctype="input" placeholder="建议金额" name="adviceAmt" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="input" placeholder="建议利率" name="adviceRate" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select"  data-code="STD_REPAY_MODE"  placeholder="还款方式" name="repayMode" disabled :hidden="dataVif"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="input"  placeholder="贷款用途" name="loanUse" disabled :hidden="dataVif"></yu-xform-item>
          </yu-xform-group>

          </yu-xform>
        </yu-panel>
        <yu-form-buttons align="center">
         <!-- <yu-button type="primary" @click="saveTable" v-if="!pageType">保存</yu-button>
          <yu-button @click="submit" v-if="!pageType">提交</yu-button>  -->
          <yu-button type="primary" @click="backtrack" >返回</yu-button>

        </yu-form-buttons>
      </yu-tab-pane>
      <yu-tab-pane label="影像信息" name="asset4">
        <yu-panel title="影像信息">
       <!--   <yxdImage ref="yxdImage" :imageData="imageParams"></yxdImage>  -->
          <yxdImage ref="yxdImage" ></yxdImage>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
      <yufpNwfInit ref="yufpNwfInit" @success-click="backtrack"></yufpNwfInit>
       </yu-panel>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_MAR_ST,STD_ZB_GUAR_WAY,STD_ZB_RAY_MODE,STD_ZB_LOAN_TYPE,STD_HX_HKFS,STD_ZB_ASSURE_MEANS,STD_ZB_YES_NO,STD_EI_INTERVAL_UNIT,STD_AGRI_LOAN_TER,STD_GUAR_DETAIL_MODE,STD_REPAY_MODE');
// 注册字典项 币种 STD_ZB_CUR_TYP 支付方式 STD_ZB_RAY_MODE
import yxdImage from '@/views/xwmanage/lmtmanage/indgtLMT/yxdmanage/yxdImage';
export default {
  components: { yxdImage},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      pageType: true,
      formType: 'details', // edit ， details
      routeData: {},
      tabName: 'base',
      expandCollapseName: 'base',
      formdata: {},
      baseFormdata: {},
      pageParams: {},
      prdidType: false,
      bizType: null,
      isPlace: '0',
      isGuar: '0',
      isGreater1000: '0',
      // imageParams: {'pvpSerno': this.$route.meta.params.pvpSerno, 'topOutsystemCode': this.$route.meta.params.topOutsystemCode},
      marStatusFlag: true,
      lookPage: false,
      requiredFlg: '',
      hiddenFlg: false,
      isdsr: true,
      dataVif: false

    };
  },

  mounted () {
    // 新增逻辑 如果走的是审批流的页面
    // 如果走的是正常的页面
    // 初始化页面时执行的业务逻辑

    var _this = this;

    if (_this.bizPageData != null) {
      // 认为走的是模板工厂

      // this.$route.meta.params = {pvpSerno: _this.bizPageData.instanceInfo.bizId};
      // _this.routeData.pvpSerno = _this.bizPageData.instanceInfo.bizId;
    } else {
      if (_this.$route.meta.params.pageType != 1) {
        this.pageType = false;
        this.formType = 'edit';
      } else {
        this.pageType = true;
        this.formType = 'details';
      }

      // 赋值本页流水号
      let surveySerno = _this.$route.meta.params.surveySerno;
      // 清除校验规则
      this.findById(surveySerno);
    }
  },
  methods: {
    // 正常页面
    // 审批流的页面
    // 进入页面查询数据


    // 查询数据的方法
    findById (surveySerno) {
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/selectone',
        data: {surveySerno: surveySerno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data != null) {
            // 操作成功
            yufp.clone(data, this.formdata);
          } else {
            // 操作失败
          }
        }
      });
    },


    saveTable () {
      // 先暂时不做校验
      var validate = false, _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? console.log('校验通过') : _this.$message({message: '请补全数据', type: 'error'});
      });
      if (!validate) {
        return;
      }

      // var _this = this;
      // let postData = {};
      // yufp.clone(this.formData, postData);
      // // 发送请求修改数据;
      // this.$request({
      //   method: 'POST',
      //   url: backend.cmisBiz + '/api/pvploanapp/update',
      //   data: postData
      // }).then(({code, message, data}) => {
      //   if (code == 0) {
      //     if (data == 1) {
      //       this.$message({message: '保存成功', type: 'success'});
      //     } else {
      //       this.$message({message: '出了点小差错,请关闭页签重试', type: 'warning'});
      //     }
      //   }
      // });
    },
    // 提交
    submit () {
      // 先暂时不做校验
      var validate = false, _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? _this.selectDataSubmitlc() : _this.$message({message: '请补全数据', type: 'error'});
      });
      if (!validate) {
        return;
      }
    },
    // 查询是否可以提交
    selectDataSubmitlc () {

    },

    submitlc () {
      // var _this = this;
      // yufp.service.request({
      //   async: true,
      //   method: 'POST',
      //   url: backend.cmisBiz + '/api/iqploanapp/selectByIqpSerno',
      //   data: _this.formData.iqpSerno,
      //   callback: function (code, message, response) {
      //     if (response.data.contMode == '00') {
      //       _this.bizType = 'LS005';
      //     } else {
      //       _this.bizType = 'LS006';
      //     }

      //     if (_this.formData.pvpAmt >= 10000000) {
      //       _this.isGreater1000 = '1';
      //     }

      //     yufp.service.request({
      //       async: true,
      //       method: 'POST',
      //       url: backend.cmisBiz + '/api/iqploanapp/selectfdccount',
      //       data: _this.formData.iqpSerno,
      //       callback: function (code, message, response) {
      //         if (response.data > 0) {
      //           _this.isGuar = '1';
      //         }

      //         var startdto = {};
      //         startdto.systemId = 'cmis';
      //         startdto.orgId = _this.$store.state.oauth.loginCode;
      //         startdto.userId = _this.$store.state.oauth.loginCode;
      //         startdto.bizType = _this.bizType;
      //         startdto.bizId = _this.$route.meta.params.pvpSerno;
      //         startdto.bizUserName = _this.$store.state.oauth.userName;
      //         startdto.bizUserId = _this.$store.state.oauth.userId;
      //         startdto.param = {
      //           isPlace: _this.isPlace, // 是否异地支行:1-是,0-否
      //           isGuar: _this.isGuar, // 是否房屋抵押:1-是,0-否
      //           isGreater1000: _this.isGreater1000, // 是否大于1000万（含）:1-是,0-否
      //           prdId: _this.formData.prdId
      //         };
      //         _this.$refs.yufpNwfInit.wfInit(startdto);
      //       }
      //     });
      //   }
      // });
    },


    // 返回
    backtrack () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    }


  }


};
</script>
