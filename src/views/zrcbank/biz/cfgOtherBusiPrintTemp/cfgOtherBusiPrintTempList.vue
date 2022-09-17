
<template>
  <!--
    @created by 屈文
    @description 其他业务模板配置
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="其他业务合同模板配置" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" related-table-name="refTable">
              <yu-xform-group :column="3">
                <yu-xform-item label="模板名称" ctype="input" placeholder="模板名称" name="tempName"></yu-xform-item>
                <!--字典项暂无-->
                <yu-xform-item label="适用业务场景" ctype="input" placeholder="适用业务场景" name="suitGrtBusiScene"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yu-button @click="doAdd">新增</yu-button>
            <yu-button @click="doUpdate">修改</yu-button>
            <yu-button @click="doDelete">删除</yu-button>
            <yu-button @click="doView">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" row-number selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="模板编号" prop="tempNo"></yu-xtable-column>
            <yu-xtable-column label="模板名称" prop="tempName"></yu-xtable-column>
            <!--字典项暂无-->
            <yu-xtable-column label="适用业务场景" prop="suitGrtBusiScene"></yu-xtable-column>
            <yu-xtable-column label="适用报表全称" prop="suitReportName"></yu-xtable-column>
            <yu-xtable-column label="版本描述" prop="verDec"></yu-xtable-column>
            <yu-xtable-column label="发布日期" prop="releaseDate"></yu-xtable-column>
            <yu-xtable-column label="最后修改时间" prop="updDate"></yu-xtable-column>
            <yu-xtable-column label="最后修改人" prop="updId"></yu-xtable-column>
            <yu-xtable-column label="最后修改人所属机构" prop="updBrId"></yu-xtable-column>
            <yu-xtable-column label="模板状态" prop="mubanStatus" data-code="STD_MUBAN_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      </yu-tabs>
      <!--其他业务模板配置新增向导-->
      <yu-panel title="" :hideFilter="false" :collapseHide="false">
        <yu-xdialog title="其他业务模板配置新增向导" :visible.sync="dialogVisibleGuide" width="650px">
          <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="formDisabled">
            <yu-xform-group column="1">
              <yu-xform-item label="模板名称" ctype="input" placeholder="模板名称" name="tempName" rules="required"></yu-xform-item>
              <!--字典项暂无-->
              <yu-xform-item label="适用业务场景" ctype="input" placeholder="适用业务场景" name="suitGrtBusiScene" rules="required"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="nextFn">下一步</yu-button>
              <yu-button @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      dataUrl: backend.cmisCfg + '/api/cfgohterbusiprinttemp/tosignlist',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ]
    };
  },
  methods: {
    /**
     * 新增按钮
     */
    doAdd: function () {
      var _this = this;
      _this.dialogVisibleGuide = true;
    },

    /**
     * 下一步
     */
    nextFn: function () {
      var _this = this;
      var op = 'ADD';
      var data = _this.formdata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgohterbusiprinttemp/savecfgohterbusiprinttempinfo',
        data: data,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$xutils.showMsgBox('提示', '新增成功', 350, 150);
              _this.dialogVisibleGuide = false;
              let jsoPar = response.data;
              _this.addNewTab(jsoPar, op);
            } else {
              _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '新增失败', 350, 150);
            return;
          }
        }
      });
    },


    /**
     * 取消按钮
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },


    /**
     * 修改
     */
    doUpdate: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      // if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
      //   _this.$xutils.showMsgBox('提示', '仅允许修改【待发起】【打回】的数据', 350, 150);
      //   return;
      // }
      var op = 'EDIT';
      _this.addNewTab(jsoPar, op);
    },

    /**
     * 刪除
     */
    doDelete: function () {
      var _this = this;
      var jsoPar = _this.$refs.refTable.selections[0];
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      _this.logicDelete(jsoPar);
      // if (jsoPar.approveStatus != '000') {
      //   _this.$xutils.showMsgBox('提示', '仅允许删除【待发起】的数据', 350, 150);
      //   return;
      // }
      // 审批状态为000进行逻辑删除
      // if (jsoPar.approveStatus == '000') {
      //   _this.logicDelete(jsoPar);
      // }
    },

    // 逻辑删除
    logicDelete: function (jsoPar) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgohterbusiprinttemp/logicdelete',
        data: JSON.stringify(jsoPar),
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$message('删除成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message('删除失败');
            _this.$refs.refTable.remoteData();
            return;
          }
        }
      });
    },

    /**
     * 列表详情
     */
    doView: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var op = 'VIEW';
      _this.addNewTab(jsoPar, op);
    },

    // 跳转模板工厂
    addNewTab: function (jsoPar, op) {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/biz/cfgOtherBusiPrintTemp/cfgOtherBusiPrintTempInfo',
        title: '其他业务打印模板配置详情',
        key: jsoPar.tempNo,
        data: {
          data: jsoPar,
          op: op
        }
      });
      _this.initList();
    },

    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>