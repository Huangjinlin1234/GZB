<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-panel title="被告人列表" :collapseHide="false" :hideFilter="false">
        <div :hidden="viewType == 'DETAIL'">
          <yu-button type="primary" @click="doSave" >保存</yu-button>
        </div>
        <yu-xtable ref="refTable1" row-number :data-url="urls.index" selection-type="radio" :base-params="cusParam" requestType="POST" >
          <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" label="被告在我行身份" prop="accusedRole"  data-code="STD_ACCUSED_ROLE"></yu-xtable-column>
          <yu-xtable-column align="center" label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column align="center" label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column align="center" label="住所" prop="livingAddr"></yu-xtable-column>
          <yu-xtable-column align="center" label="是否起诉" prop="isLawsuit" ctype="select"  data-code="STD_ZB_YES_NO" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="是否撤回" prop="isWithdraw" ctype="select"  data-code="STD_ZB_YES_NO" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="撤回时间" prop="withdrawDate" ctype="datepicker" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="撤回原因" prop="withdrawResn" ctype="select"  data-code="STD_WITHDRAW_RESN" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="其他被告人列表" :collapseHide="false" :hideFilter="false">
        <div :hidden="viewType == 'DETAIL'">
          <yu-button type="primary" @click="addOtherAccuse">新增</yu-button>
          <yu-button type="primary" @click="deleteOtherAccuse">删除</yu-button>
          <yu-button type="primary" @click="saveOtherAccuse">保存</yu-button>
        </div>
        <yu-xtable ref="refTable2" row-number :data-url="urls.other" condition-key="condition" selection-type="radio" :base-params="otherParam">
          <yu-xtable-column align="center" label="客户名称" prop="cusName" ctype="input" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="被告身份" prop="accusedRole" ctype="select" data-code="STD_ACCUSED_ROLE" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="证件类型" prop="certType" ctype="select" data-code="STD_ZB_CERT_TYP" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="证件号码" prop="certCode" ctype="input" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="住所" prop="livingAddr" ctype="input" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="是否起诉" prop="isLawsuit" ctype="select"  data-code="STD_ZB_YES_NO" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="是否撤回" prop="isWithdraw" ctype="select" data-code="STD_ZB_YES_NO" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="撤回时间" prop="withdrawDate" ctype="datepicker" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
          <yu-xtable-column align="center" label="撤回原因" prop="withdrawResn" ctype="select" data-code="STD_WITHDRAW_RESN" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO,STD_WITHDRAW_RESN,STD_ZB_CERT_TYP,STD_ACCUSED_ROLE');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    viewType: String,
    cusCorp: Object,
    dialogId: String
  },
  data: function () {
    return {
      urls: {
        index: backend.cmisNpam + '/api/plalawaccusedlist/queryPlaLawAccusedList',
        other: backend.cmisNpam + '/api/plalawaccusedlist/'
      },
      cusParam: {},
      otherParam: {}
    };
  },
  created () {
    this.AfterInit();
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit();
    }
  },

  methods: {
    /* 页面初始化 */
    AfterInit () {
      var _this = this;
      if (_this.cusCorp) {
        _this.cusParam = { condition: JSON.stringify({ caseSerno: _this.$route.meta.params.caseSerno, isOtherAccused: '0'}) };
        _this.otherParam = { condition: JSON.stringify({ caseSerno: _this.$route.meta.params.caseSerno, isOtherAccused: '1'}) };
      }
    },
    // 新增
    addOtherAccuse: function () {
      var _this = this;
      var row = {
        caseSerno: _this.cusCorp.caseSerno,
        isOtherAccused: '1'
      };
      _this.$refs['refTable2']._data.tabledata.push(row);
      _this.$refs['refTable2'].setCurrentRow(row);
    },
    // 删除
    deleteOtherAccuse: function () {
      var _this = this;
      var selections = _this.$refs['refTable2'].selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条数据', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将删除被告人信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawaccusedlist/delete/' + selections[0].plalSerno,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs['refTable2'].remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message({ message: '操作失败：', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    // 保存
    saveOtherAccuse: function () {
      var _this = this;
      var validate = true;
      _this.$refs['refTable2'].validate(function (fields) {
        validate = fields;
      }, true);
      if (validate) {
        _this.$message({ message: '请先将表格填写完整', type: 'warning' });
        return;
      }
      var selections = _this.$refs['refTable2'].getEditRows();
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawaccusedlist/batchInsert',
        data: JSON.stringify(selections),
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$refs['refTable2'].remoteData();
            _this.$message('保存成功');
          } else {
            _this.$message({ message: '保存失败', type: 'error' });
          }
        }
      });
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    modifyFn () {},
    // 保存
    doSave () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable1.getEditRows();
      var url;
      url = backend.cmisNpam + '/api/plalawaccusedlist/batchUpdate';
      var model = selectionsAry;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable1.remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    }
  }
};
</script>
