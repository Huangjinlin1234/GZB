
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="结算账户选择" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="acctTable" @cell-dblclick="cellClick" selection-type="radio" row-number row-key="pkId" condition-key="condition" :data-url="urls.endAccountInfoUrl" :base-params="Param" request-type="POST" :default-load="false">
        <yu-xtable-column label="客户编号" prop="Kehuhaoo" hide-column></yu-xtable-column>
        <yu-xtable-column label="结算账户账号" prop="kehuzhao"></yu-xtable-column>
        <yu-xtable-column label="结算账户名你" prop="zhhuzwmc"></yu-xtable-column>
        <yu-xtable-column label="账户子序号" prop="zhhaoxuh"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="huobdaih" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="开户机构" prop="kaihjigo"></yu-xtable-column>    
    </yu-xtable>
    <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE');

export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      urls: {
        endAccountInfoUrl: ''
      },
      formdata: {},
      saveBtnShow: true,
      cusId: '',
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      instu: state => state.oauth.instu, // 金融机构Object
      loginCode: state => state.oauth.loginCode
    })
  },
  mounted () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      let _this = this;
      _this.data = this.pageParams;
      _this.acctNo = _this.data.acctNo;
      _this.cusId = _this.data.cusId;
      // 关联个人客户授信额度明细
      _this.urls.endAccountInfoUrl =
        backend.cmisBiz + '/api/iqpentrustloanapp/selectaccount';
      _this.Param = { condition: JSON.stringify({ loanPayoutAccno: _this.acctNo }) };
    },

    /**
     * 选取返回
     */
    backToAdd () {
      debugger
      var _this = this;
      if (_this.$refs.acctTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        }); 
        return;
      }
      let params = _this.$refs.acctTable.selections[0];
      if(_this.pageParams.pkId){
        params['pkId'] = _this.pageParams.pkId;
        params['acctNo'] = params.kehuzhao;
        params['acctName'] = params.zhhuzwmc;
      }else{
        this.$dialog.close(this.dialogId, params);
        return;
      }
      // 客户校验是否是该客户的结算账号
      let selectCusId = params.kehuhaoo;
      
      if(selectCusId != _this.cusId){
        _this.$xutils.showMsgBox('提示', '请重新填写结算账号（该结算账号不属于客户：' + _this.cusId + ')', 350, 150);
        params['errCode'] = '9999';
        this.$dialog.close(this.dialogId, params);
        _this.cancel();
        return 
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpappaspl/updateselective',
        data: params,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.cancel();
          } else {
            _this.$xutils.showMsgBox('提示', '选取失败', 350, 150);
            return;
          }
        }
      });
    },
    /**
     * 取消
     */
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
