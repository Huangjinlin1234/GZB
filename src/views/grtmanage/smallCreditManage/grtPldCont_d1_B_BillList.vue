<template>
  <div>
    <yu-panel title="抵押物列表"  panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_imPort" @click="customClick('imPort')" :hidden="pageParams.type == 'VIEW'" >引入</yu-button>
          <yu-button ref="btn_offImport" @click="customClick('offImport')" :hidden="pageParams.type == 'VIEW'" >取消引入</yu-button>
          <yu-button ref="btn_checkInfo" @click="customClick('checkInfo')">查看押品信息</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick"  :pageable="true" :data-url="dataUrl" default-load="false" request-type="POST">
        <yu-xtable-column label="押品统一编号" prop="guarNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="抵质押标识" prop="grtFlag" width="100" data-code="STD_GRT_FLAG" ></yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="newlabel"></yu-xtable-column>
        <yu-xtable-column label="押品所有权人名称" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="pldimnMemo" width="140"></yu-xtable-column>
        <yu-xtable-column label="押品评估价值" prop="evalAmt" width="150"></yu-xtable-column>
        <yu-xtable-column label="权利价值" ctype="input" prop="certiAmt" width="150"></yu-xtable-column>
        <yu-xtable-column label="操作" v-if="pageParams.type !== 'VIEW'">
            <template slot-scope="scope">
                <el-link type="primary" @click="save(scope.row)">保存</el-link>
            </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/selectGuarBaseInfoByGuarContNo',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/delete/',
      guarContNo: ''
    };
  },

  created () {
    var _this = this;
    setTimeout(() => {
      if (_this.getFactory().contextData) {
        this.guarContNo = _this.getFactory().contextData.guarContNo;
      } else if (_this.pageParams) {
        this.guarContNo = _this.pageParams.guarContNo;
      }
      _this.baseParams = {
        condition: { guarContNo: this.guarContNo }
      };
    }, 500);
  },
  methods: {
    // 保证人保存
    save (row) {
      var _this = this;
      var model = {};
      if (!row.certiAmt) {
        _this.$message({ message: '请先输入权利价值', type: 'warning' });
        return;
      }
      row.guarContNo = _this.guarContNo;
      yufp.clone(row, model);
      _this.$xutils.request({
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/grtguarcontrel/updatecertiamt',
        data: {condition: JSON.stringify(model)},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              _this.$refs.refTable.remoteData();
            });
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
