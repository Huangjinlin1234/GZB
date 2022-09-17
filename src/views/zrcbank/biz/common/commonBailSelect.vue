
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="保证金选择" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="bailTable" row-number @cell-dblclick="cellClick" selection-type="radio" row-key="pkId" condition-key="condition" :data-url="urls.bailInfoUrl" :base-params="Param" request-type="POST" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId" hide-column></yu-xtable-column>
        <yu-xtable-column label="保证金账号" prop="bailAccNo"></yu-xtable-column>
        <yu-xtable-column label="保证金账号户名" prop="bailAccName"></yu-xtable-column>
        <yu-xtable-column label="科目名称" prop=""></yu-xtable-column>
        <yu-xtable-column label="开户行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="子序号" prop="bailAccNoSub"></yu-xtable-column>
        <yu-xtable-column label="计息方式" prop="bailInterestMode"></yu-xtable-column>
        <yu-xtable-column label="结息周期" prop=""></yu-xtable-column>
        <yu-xtable-column label="币种" prop="bailCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
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
        bailInfoUrl: ''
      },
      formdata: {},
      saveBtnShow: true,
      cusId: ''
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
      var _this = this;
      _this.data = this.pageParams;
      _this.bailAccNo = this.data.bailAccNo;
      _this.zhshuxin = _this.data.zhshuxin;
      _this.cusId = _this.data.cusId;
      // _this.instuCde = this.data.instuCde;
      // _this.lmtAccNo = this.data.lmtAccNo;
      // 关联个人客户授信额度明细
      _this.urls.bailInfoUrl = backend.cmisBiz + '/api/bailaccinfo/sendcoreforbail';
      _this.Param = { condition: JSON.stringify({ bailAccNo: _this.bailAccNo, zhshuxin: _this.zhshuxin}) };
    },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.bailTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.bailTable.selections[0];
      if (_this.pageParams.serno) {
        params['serno'] = _this.pageParams.serno;
      } else {
        this.$dialog.close(this.dialogId, params);
        return;
      }
      params['serno'] = _this.pageParams.serno;
      params['bailRate'] = _this.pageParams.bailRate;
      // 客户校验是否是该客户的保证金账号
      let selectCusId = params.cusId;
      if (selectCusId != _this.cusId) {
        _this.$xutils.showMsgBox('提示', '请重新填写保证金账号（该保证金账号不属于客户：' + _this.cusId + ')', 350, 150);
        params['errCode'] = '9999';
        this.$dialog.close(this.dialogId, params);
        _this.cancel();
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/updatebailaccinfobyserno',
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
    //     /**
    //  * 选取返回
    //  */
    // backToAdd () {
    //   var _this = this;
    //   if (_this.$refs.bailTable.selections.length !== 1) {
    //     _this.$message({
    //       message: '请先选择一条记录',
    //       type: 'warning'
    //     });
    //     return;
    //   }
    //   const params = _this.$refs.bailTable.selections[0];
    //   this.$dialog.close(this.dialogId, params);
    // },
    /**
     * 取消
     */
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
