<template>
  <!--
    @created by qiantj
    @description 人民币利率定价申请新增向导页面
  -->
  <div>
    <div>
      <yu-xform ref="refForm" label-width="138px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" >
        <yu-panel title="人民币利率定价申请" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <!-- <yu-xform-item label="客户编号"  ctype="input" placeholder="客户编号" name="cusId" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item> -->
             <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="客户选取"></yu-xform-item>
            <yu-xform-item label="客户名称"  ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户类型"  ctype="select" placeholder="客户类型" name="cusType" rules="required" data-code="STD_ZB_CUS_TYP"></yu-xform-item>
           </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary"  @click="onNext">下一步</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import {lookup, clone} from '@/utils';
import mixinForm from '@/utils/mixins/mixin-form';
import {selectCustomer} from '@/utils/unitchange';
lookup.reg('STD_ZB_APPR_STATUS', 'STD_ZB_CUS_TYP');
export default {
  mixins: [mixinForm, selectCustomer],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {}
    };
  },
  mounted () {
    const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
    this.loginInfo = userInfo;
  },
  methods: {
    // 下一步
    onNext: function () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var data = {};
      clone(_this.formdata, data);
      const serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
      data['serno'] = serno;
      data['managerId'] = this.loginInfo.loginCode;
      data['managerBrId'] = this.loginInfo.org.id;
      var dateNow = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      data['inputDate'] = dateNow;
      /*
      * 保存客户申请信息
      */
      _this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisBiz + '/api/othercnyrateapp/',
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$dialog.close(_this.dialogId, 'success');
            // 解析返回值
            let params = response.data;
            let url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/OtherCnyRateAppInfo';
            let date = _this.$xutils.dateFormat('yyyyMMddhhmmssSSS', new Date());
            this.$router.addTab({
              // 路由名称
              name: url, // 菜单路径
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: 'custom_OtherCnyRateAppInfo_ADD_' + date, // 必传
              // 页签名称
              title: '人民币利率定价申请详情',
              // 传递的业务数据，可选配置
              data: {
                name: _this.$route.name,
                op: 'ADD',
                data: params
              },
              afterTabClose: () => {
                // this.$refs.otherCnyRateAppTable.remoteData();
              }
            });
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result) => {
          _this.$message('保存异常');
        }
      });
    },

    // 客户选取
    goCustomer () {
      var _this = this;
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          console.log('==========', retVal);
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;
          _this.formdata.cusType = retVal.cusType;
          if (retVal.cusCatalog == '2') { // 如果是企业客户获取客户的 客户类型 cusType ,行业 trade
            _this.$request({
              method: 'POST',
              url: `${backend.cmisCus}/api/cuscorp/${_this.formdata.cusId}`,
              data: _this.formdata.cusId
            }).then((data) => {
              _this.formdata.tradeClass = data.data.tradeClass;
              _this.formdata.corpScale = data.data.corpScale;
            });
          } else {
            // 个人
            let cusIndivUnit = {};
            cusIndivUnit.cusId = _this.formdata.cusId;
            _this.$request({
              method: 'POST',
              url: `${backend.cmisCus}/api/cusindivunit/queryByCusId/`,
              data: cusIndivUnit
            }).then((data) => {
              _this.formdata.tradeClass = data.data.indivComTrade;
              _this.formdata.corpScale = data.data.indivComTyp;
            });
          }
        }
      );
    },
    getCustomer(obj){
      var _this = this;
      if (obj.cusCatalog == '2') { // 如果是企业客户获取客户的 客户类型 cusType ,行业 trade
        _this.$request({
          method: 'POST',
          url: `${backend.cmisCus}/api/cuscorp/${obj.cusId}`,
          data: obj.cusId
        }).then((data) => {
          _this.formdata.tradeClass = data.data.tradeClass;
          _this.formdata.corpScale = data.data.corpScale;
        });
      } else {
        // 个人
        let cusIndivUnit = {};
        cusIndivUnit.cusId = obj.cusId;
        _this.$request({
          method: 'POST',
          url: `${backend.cmisCus}/api/cusindivunit/queryByCusId/`,
          data: cusIndivUnit
        }).then((data) => {
          _this.formdata.tradeClass = data.data.indivComTrade;
          _this.formdata.corpScale = data.data.indivComTyp;
        });
      }
    },
    // 返回
    onBack: function () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>