
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——tab页签+查询
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="单一客户授信批复变更申请" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="批复编号" ctype="input" name="replySerno"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="单一客户授信批复变更申请列表" :hideFilter="false" :collapseHide="false">
          <yu-toolbar>
            <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')" >新增</yu-button>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="viewDetail" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" condition-key="condition" row-number request-type="POST" :data-url="replyChgDataUrl">
            <yu-xtable-column label="变更流水号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" >
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="180">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态 " prop="approveStatus"  data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="单一客户授信批复变更历史" name="deal">
        <yu-panel title="单一客户授信批复变更历史" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refDealTable" form-type="search">
              <yu-xform-group :column="4">
                <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
                <yu-xform-item label="批复编号" placeholder="批复编号" ctype="input" name="replySerno"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="viewDetailHis" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" condition-key="condition" row-number request-type="POST" :data-url="hisDataUrl">
            <yu-xtable-column label="变更流水号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
             <yu-xtable-column label="客户编号" prop="cusId" >
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="180">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态 " prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  data: function () {
    return {
      replyChgDataUrl: backend.cmisBiz + '/api/lmtreplychg/replychg',
      activeName: 'messageTip',
      hisDataUrl: backend.cmisBiz + '/api/lmtreplychg/replychghis'
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    addFn: function () {
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyChg/lmtReplyChgNavi',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyChgNavi', // 必传
        // 页签名称
        title: '变更新增导航'
      });
    },
    modifyFn () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      // 判断审批状态为审批中
      if (selectionAry[0].approveStatus == '111') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      if (!selectionAry.length > 1) {
        _this.$message('请选择一条记录');
        return;
      }
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyChg/lmtReplyCHg',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyChg', // 必传
        // 页签名称
        title: '批复变更修改',
        data: {
          serno: selectionAry[0].serno
        }
      });
    },

    deleteFn () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message('请选择一条记录');
        return;
      }
      yufp.service.request({
        method: 'POST',
        data: selectionAry[0].pkId,
        url: backend.cmisBiz + '/api/lmtreplychg/deleteReplyChg',
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message('删除成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message('删除失败');
          }
        }
      });
    },

    viewDetail () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message('请选择一条记录');
        return;
      }
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyChg/lmtReplyCHg',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyChg', // 必传
        // 页签名称
        title: '批复变更详情',
        data: {
          viewType: 'view',
          serno: selectionAry[0].serno
        }
      });
    },

    viewDetailHis () {
      var _this = this;
      var selectionAry = _this.$refs.refDealTable.selections;
      if (selectionAry.length < 1) {
        _this.$message('请选择一条记录');
        return;
      }
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyChg/lmtReplyCHg',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyChg', // 必传
        // 页签名称
        title: '批复变更详情',
        data: {
          viewType: 'view',
          serno: selectionAry[0].serno
        }
      });
    },

    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      var _this = this;
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = data.cusId;
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView';
      title = '个人客户查看';
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
