<template>
  <!--
    @created by
    @updated by 2018-8-16 修改代码规范
    @updated by 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
  <yu-tabs v-model="activeName">
    <yu-tab-pane label="关联借据信息记账查看" name="base">
        <yu-button-drop>
          <yu-button type="plus" @click="infoFn">查看借据详情</yu-button>
          <!--<yu-button type="primary" @click="bookFn">记账补发</yu-button>-->
          <!--<yu-button type="primary" @click="rectFn">记账冲正</yu-button>-->
        </yu-button-drop>
        <yu-xtable ref="refTableCont" condition-key="condition" style="margin-top:10px" row-number :data-url="url.dataContNoUrl" :base-params="baseContParams" selection-type="radio" requestType="POST">
          <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="起始日期" prop="loanStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
          <yu-xtable-column align="center" label="到期日期" prop="loanEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
          <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
          <yu-xtable-column align="center" label="五级分类" prop="execRateYear" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column align="center" label="责任人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="责任机构" prop="inputBrIdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="转让对价金额" prop="takeoverPrice" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column align="center" label="是否转让代理" prop="isTransAgcyAsset" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column align="center" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
        </yu-xtable>
    </yu-tab-pane>
 </yu-tabs>

  </div>
</template>
<script>
import mixin from '@/utils/mixin';
// 获取仓库数据
yufp.lookup.reg('STD_FIVE_CLASS,STD_RECORD_STATUS,STD_ZB_YES_NO');
import { mapState } from 'vuex';
export default {
  mixins: [mixin],
  data: function () {
    return {
      baseParams: {condition: JSON.stringify({ ptaiSerno: this.$route.meta.params.ptaiSerno})},
      url: {
        dataContNoUrl: backend.cmisNpam + '/api/platakeoverbillrel/queryAll'
      },
      baseContParams: {
        condition: {ptaiSerno: this.$route.meta.params.ptaiSerno}
      },
      formdata: {},
      activeName: 'base',
      authDialogVisible: false,
      viewType: ''
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  mounted () {
    var _this = this;
    _this.formdata.ptaiSerno = _this.$route.meta.params.ptaiSerno;
    _this.viewType = _this.$route.meta.params.viewType;
    // 默认赋值
    _this.formdata['inputId'] = _this.userId;
    _this.formdata['inputIdName'] = _this.userName;
    _this.formdata['inputBrId'] = _this.orgCode;
    _this.formdata['inputBrIdName'] = _this.orgName;
    _this.formdata['updId'] = _this.userId;
    _this.formdata['updIdName'] = _this.userName;
    _this.formdata['updBrId'] = _this.orgCode;
    _this.formdata['updBrIdName'] = _this.orgName;
    _this.formdata['inputDate'] = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/platakeoverappinfo/showByPtaiSerno',
      data: _this.formdata.ptaiSerno,
      callback: function (code, message, response) {
        if (response.code == 0) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.formdata);
          });
        } else {
          _this.$message({
            message: response.message,
            type: 'error'
          });
        }
      }
    });
  },
  methods: {
    /**
    *记账冲正
     */
    rectFn () {
      var _this = this;
      if (!_this.$refs.refTableCont.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.applyBussTable.selections[0];
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/platakeoverbillrel/czcl',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.applyBussTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    },
    /**
    查看借据详情
    */
    infoFn () {
      this.$xutils.showMsgBox('提示', '功能待完善', 500, 140);
    }
  }
};
</script>
