
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="业务小助手" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="90px" :rules="formRules">
          <yu-xform-group :column="4">
            <yu-xform-item label="产品编号" name="prdCode" ctype="input" fuzzy-query="both" maxlength="30"></yu-xform-item>
            <yu-xform-item label="产品名称" name="prdName" ctype="input" fuzzy-query="both" maxlength="30"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <div style="margin-bottom:10px;">
        <yu-button type="primary" @click="addFn">新增</yu-button>
        <yu-button type="primary" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="infoFn">查看</yu-button>
        <yu-button type="primary" @click="deleteFn">删除</yu-button>
      </div>
      <yu-xtable ref="refTable" selection-type="radio" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" request-type="POST">
        <yu-xtable-column label="业务流水号" prop="serno" width=""></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdCode" width=""></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width=""></yu-xtable-column>
        <yu-xtable-column label="更新人" prop="updIdName" width=""></yu-xtable-column>
        <yu-xtable-column label="更新机构" prop="updBrIdName" width=""></yu-xtable-column>
        <yu-xtable-column label="更新日期" prop="updDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
// 注册字典项
// yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_GUAR_CHG_TYPE');
import { validator } from '@/utils/validate';
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/cfgassistantinfo/',
      deleteUrl: backend.cmisBiz + '/api/cfgassistantinfo/delete/',
      formdata: {},
      formRules: { prdCode: [{validator: validator.numberAndLetter, message: '不是正确的产品编号', trigger: 'blur'}], prdName: [{validator: validator.isChnChar, message: '不是正确的产品名称', trigger: 'blur'}] },
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantAdd',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: Math.ceil(Math.random() * 10).toString(), // 必传
        // 页签名称
        title: '配置页面',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'ADD'
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      let serno = _this.$refs.refTable.selections[0].serno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantAdd',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'cfgAssistantUpdate' + serno, // 必传
        // 页签名称
        title: '维护页面',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'EDIT',
          serno: serno
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录'
        });
        return;
      }
      let serno = _this.$refs.refTable.selections[0].serno;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantAdd',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'cfgAssistantQuery' + serno, // 必传
        // 页签名称
        title: '查看界面',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: false,
          viewType: 'DETAIL',
          serno: serno
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let serno = selections[0].serno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.deleteUrl + serno,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>
