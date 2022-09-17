
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="客户额度视图" panel-type="simple">
      <yu-xtable ref="cusLmtTable" row-number row-key="pkId" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" :data-url="urls.cusLmtInfoUrl" :base-params="Param" request-type="POST">
        <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
        <yu-xtable-column label="授信类型" prop="lmtMode" data-code="STD_ZB_LMT_MODE"></yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="fSerno"></yu-xtable-column>
        <yu-xtable-column label="额度分项编号" prop="apprSubSerno"></yu-xtable-column>
        <yu-xtable-column label="授信品种编号" prop="limitSubNo"></yu-xtable-column>
        <yu-xtable-column label="授信品种名称" prop="limitSubName"></yu-xtable-column>
        <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
        <yu-xtable-column label="额度起始日" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="lmtDate"></yu-xtable-column>
        <yu-xtable-column label="宽限期" prop="lmtGraper"></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="suitGuarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="是否预授信" prop="isPreCrd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="授信总额" align="center">
          <yu-xtable-column label="授信总额" prop="creditTotal"></yu-xtable-column>
          <yu-xtable-column label="合同已占用额度" prop="outstndAmt"></yu-xtable-column>
          <yu-xtable-column label="授信总额可用" prop="availableTotal"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="授信敞口" align="center">
          <yu-xtable-column label="授信敞口" prop="spacAmt"></yu-xtable-column>
          <yu-xtable-column label="合同已占用额度" prop="spacOutstndAmt"></yu-xtable-column>
          <yu-xtable-column label="授信敞口可用" prop="spacTotal"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_WAY,STD_ZB_APPR_ST,STD_ZB_LMT_MODE,STD_PRD_TYPE_PROP');

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
        cusLmtInfoUrl: ''
      },
      formdata: {},
      saveBtnShow: true
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
      _this.cusId = this.data.cusId;
      _this.instuCde = this.data.instuCde;
      _this.isPreCrd = this.data.isPreCrd;
      _this.suitGuarWay = this.data.suitGuarWay;
      _this.prdId = this.data.prdId;
      // 关联个人客户授信额度明细
      _this.urls.cusLmtInfoUrl =
        backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtCusInfoListDialog';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde, isPreCrd: _this.isPreCrd, suitGuarWay: _this.suitGuarWay, prdId: _this.prdId, cusType: '2' }) };
    },

    loadList (tree, treeNode, resolve) {
      var _this = this;
      var apprSubSerno = tree.apprSubSerno;
      if (apprSubSerno) {
        // 向后台发送请求
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectHasChildren',
          data: { condition: JSON.stringify({ parentId: apprSubSerno }) },
          callback: function (code, message, response) {
            if (code == 0) {
              var arr = response.data || [];
              resolve(arr);
            }
          }
        });
      }
    },
    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.cusLmtTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.cusLmtTable.selections[0];
      this.$dialog.close(this.dialogId, params);
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
