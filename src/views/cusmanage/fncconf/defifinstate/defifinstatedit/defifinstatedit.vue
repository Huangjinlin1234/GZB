<template>
<div class="defifinstatedit">
  <div class="yu-toolBar">
    <yu-button-group>
      <yu-button icon="yx-plus" @click="addFn">新增</yu-button>
      <yu-button icon="yx-pencil" @click="modifyFn">修改</yu-button>
      <yu-button icon="yx-bin" @click="deleteFn">删除</yu-button>
      <yu-button icon="yx-file-empty" @click="infoFn">查看</yu-button>
    </yu-button-group>
  </div>
  <yu-row :gutter="6">
    <yu-col :span="24/fncConfCotes" v-for="(cote,index) in tableData" :key="index">
      <table width="100%">
        <thead>
          <tr class="theadtr">
            <th>
              <span v-if="fncConfTyp==='13'&&index===0">资产</span>
              <span v-else-if="fncConfTyp==='13'&&index===1">负债及所有者权益</span>
              <span v-else>项目</span>
            </th>
            <th v-if="!isPlainReport">行次</th>
            <th v-for="(coteItem, coteIndex) in thead[fncConfTyp]" :key="coteIndex">{{ coteItem }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, itemIndex) in tableData[index]">
            <tr @click="rowClickFn(item,tableData)" :class="{selected:item.selected}" :key="itemIndex">
              <td :class="{red:item.fncConfCalFrm}">
                <span v-for="(quto, qutoIndex) in item.fncConfIndent" :key="qutoIndex">&nbsp;&nbsp;</span>
                <span v-if="item.fncConfPrefix">{{ item.fncConfPrefix }}</span>
                <span>{{ item.itemName }}</span>
              </td>
              <td align="center" v-if="!isPlainReport"
                :class="[item.fncItemEditTyp==='3'&&(item.fncConfRowFlg==='0'||item.fncConfRowFlg==='2')?'border-none':'']">
                <span v-if="item.fncConfRowFlg==='1'">{{ item.rowOrder }}</span>
              </td>
              <td :class="[item.fncItemEditTyp==='3'?'border-none':'']"></td>
            </tr>
            <template  v-for="(row, rowIndex) in item.fncCnfAppRow">
              <tr v-if="item.fncCnfAppRow" style="width: 100%;height:19px;" :key="rowIndex"></tr> <!-- 追加空行 -->
            </template>
          </template>
        </tbody>
      </table>
    </yu-col>
  </yu-row>

  <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="70%">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
      <yu-xform-group>
        <yu-xform-item ctype="select" name="itemId" placeholder="请输入项目编号" label="项目编号" :options="options"
          rules="required" :disabled="viewType==='DETAIL'" filterable></yu-xform-item>
        <yu-xform-item ctype="yu-num" name="fncConfOrder" placeholder="请输入顺序编号" label="顺序编号" rules="required" percision="0" number-formatter="0">
        </yu-xform-item>
        <yu-xform-item ctype="select" name="fncConfCotes" placeholder="请选择" label="栏位" rules="required"
          data-code="STD_ZB_FNC_COTES"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncConfRowFlg" placeholder="请选择" label="行次标识" rules="required"
          data-code="STD_ZB_FNCCONFROW"></yu-xform-item>
        <yu-xform-item ctype="yu-num" name="fncConfIndent" placeholder="请输入层次" label="层次" percision="0" number-formatter="0">
        </yu-xform-item>
        <yu-xform-item ctype="input" name="fncConfPrefix" placeholder="请输入前缀" label="前缀">
        </yu-xform-item>
        <yu-xform-item ctype="select" name="fncItemEditTyp" placeholder="请选择" label="项目编辑方式" rules="required"
          data-code="STD_ZB_FNCITEMEDT" @change="projectEdit"></yu-xform-item>
        <yu-xform-item ctype="yu-num" name="fncConfDispAmt" placeholder="请输入显示数值" label="显示数值" percision="0" number-formatter="0">
        </yu-xform-item>
        <yu-xform-item ctype="yu-num" name="fncCnfAppRow" placeholder="请输入追加行数" label="追加行数" percision="0" number-formatter="0">
        </yu-xform-item>
        <yu-xform-item ctype="yufp-checkformula" :fnc-conf-typ="fncConfTyp" :disabled="formDisabled" name="fncConfChkFrm" label="检查公式"
          :row="2" colspan="24"></yu-xform-item>
        <yu-xform-item ctype="yufp-calcformula1" :get-show-formula-val="getShowFormulaVal" :fnc-conf-typ="fncConfTyp" :disabled="formDisabled" name="fncConfCalFrm" label="计算公式" :row="2" colspan="24" :hidden="switchCalcFormlu[fncConfTyp]!=='calcFormula1'">
        </yu-xform-item>
        <yu-xform-item ctype="yufp-calcformula3" :get-show-formula-val="getShowFormulaVal" name="fncConfCalFrm" :disabled="formDisabled" label="计算公式" :row="2" colspan="24" :hidden="switchCalcFormlu[fncConfTyp]!=='calcFormula3'">
        </yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <span slot="footer" class="dialog-footer">
      <yu-button type="primary" icon="el-icon-yx-checkmark" @click="saveFn" v-show="saveBtnShow">保存</yu-button>
      <yu-button type="primary" icon="el-icon-yx-undo2" @click="cancelFn">取消</yu-button>
    </span>
  </yu-xdialog>
</div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
yufp.lookup.reg('STD_ZB_FNC_COTES,STD_ZB_FNCCONFROW,');
export default {
  data: function () {
    let data = this.$route.meta.params;
    return {
      styleId: data.row.styleId, // 样式ID
      fncConfTyp: data.row.fncConfTyp, // 类型
      fncConfCotes: data.row.fncConfCotes, // 栏位
      fncConfDataCol: data.row.fncConfDataCol, // 列数
      optionUrl: backend.cmisCus + '/api/nrcs-cms/fncconfitems/q/fncconfitems/all/list',
      addUrl: backend.cmisCus + '/api/nrcs-cms/fncconfdeffmt/s/fncconfdeffmt/add',
      updateUrl: backend.cmisCus + '/api/nrcs-cms/fncconfdeffmt/s/fncconfdeffmt/update',
      thead: {
        '01': ['期初数', '期末数'], // 资产负债表
        '02': ['上年同期', '本年累计数'], // 损益表
        '03': ['金额'], // 现金流量表
        '04': ['指标值(比率:%)'], // 财务指标
        '05': ['实收资本（股本）', '资本公积', '减：库存股', '盈余公积', '未分配利润', '其他', '所有者权益合计'], // 所有者权益变动
        '06': ['金额'], // 财务简表
        '07': ['期初数', '期末数'], // 其他财务报表
        '13': ['期末数'], // 资产负债简表
        '14': ['上二年累计数', '上年累计数', '本年*月累计数'], // 利润简表
        '15': ['数值'] // 财务分析简表
      },
      isPlainReport: false, // 是否为简表
      formDisabled: false,
      formdata: {},
      rowData: null,
      dialogVisible: false,
      options: [],
      tableData: [],
      viewType: 'DETAIL', // 表头初始化
      viewTitle: yufp.lookup.find('CRUD_TYPE', false), // 弹框类型控制
      saveBtnShow: true, // 保存按钮默认显示
      switchCalcFormlu: {
        '01': 'calcFormula1',
        '02': 'calcFormula1',
        '03': 'calcFormula3',
        '04': 'calcFormula3',
        '05': 'calcFormula3',
        '06': 'calcFormula3',
        '07': 'calcFormula3',
        '13': 'calcFormula1',
        '14': 'calcFormula1',
        '15': 'calcFormula3'
      },
      showCalcFormula: false,
      dataVue: this.$route.meta.params
    };
  },
  methods: {
    /**
         * 获取列表数据
         */
    getList: function () {
      var _this = this;
      var arr = [];
      for (let a = 0; a < this.fncConfCotes; a++) {
        arr.push([]);
      }
      yufp.service.request({
        method: 'GET',
        url: backend.cmisCus + '/api/nrcs-cms/fncconfdeffmt/q/fncconfdeffmt/list',
        data: {
          styleId: this.styleId
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            let num = 0;
            for (let i = 0; i < response.data.length; i++) {
              let item = response.data[i];
              item.selected = false;
              item.fncConfCotes = String(item.fncConfCotes); // 栏位
              arr[item.fncConfCotes - 1] && arr[item.fncConfCotes - 1].push(item);
              if (item.fncConfRowFlg === '1') { // 行次显示
                num++;
                item.rowOrder = num; // 自定义行次
              } else {
                item.rowOrder = '';
              }
            }
            _this.tableData = arr;
          }
        }
      });
    },
    /**
         * 获取项目列表
         */
    getProjectOptions: function () {
      var _this = this;
      yufp.service.request({
        url: _this.optionUrl,
        method: 'GET',
        data: {
          condition: JSON.stringify({
            fncConfTyp: _this.fncConfTyp
          })
        },
        callback: function (code, message, response) {
          if (response.code === '0') {
            let dataList = response.data;
            _this.options = [];
            dataList.forEach(function (item) {
              _this.options.push({
                key: item.itemId,
                value: '[' + item.itemId + ']' + item.itemName
              });
            });
          }
        }
      });
    },
    projectEdit: function (val) {
      this.showCalcFormula = val == 2;
    },
    getShowFormulaVal: function () {
      return this.showCalcFormula;
    },
    /**
         * 行点击方法
         * @param row 行数据
         * @param tdata 所有table数据
         */
    rowClickFn: function (row, tdata) {
      for (let i = 0, length = tdata.length; i < length; i++) {
        for (let j = 0, len = tdata[i].length; j < len; j++) {
          tdata[i][j].selected = false;
        }
      }
      row.selected = true;
      this.rowData = row;
    },
    /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
    switchStatus: function (viewType, editable) {
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.dialogVisible = true;
      this.formDisabled = !editable;
    },
    /**
         * 新增
         */
    addFn: function () {
      if (this.fncConfTyp === '13' || this.fncConfTyp === '14' || this.fncConfTyp === '15') {
        this.$message({ message: '简表类型不可以新增!', type: 'warning' });
        return;
      }
      this.switchStatus('ADD', true);
      this.$nextTick(function () {
        this.$refs.refForm.resetFields();
        this.showCalcFormula = false;
      });
    },
    /**
         * 修改
         */
    modifyFn: function () {
      if (!this.rowData) {
        this.$message({message: '请先选择一条数据!', type: 'warning'});
        return;
      }
      if (this.fncConfTyp === '13' || this.fncConfTyp === '14' || this.fncConfTyp === '15') {
        this.$message({ message: '简表类型不可以修改!', type: 'warning' });
        return;
      }
      this.switchStatus('EDIT', true);
      this.$nextTick(function () {
        yufp.clone(this.rowData, this.formdata);
      });
    },
    /**
         * 删除
         */
    deleteFn: function () {
      var _this = this;
      if (!this.rowData) {
        this.$message({message: '请先选择一条数据!', type: 'warning'});
        return;
      }
      if (this.fncConfTyp === '13' || this.fncConfTyp === '14' || this.fncConfTyp === '15') {
        this.$message({ message: '简表类型不可以删除!', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCus + '/api/nrcs-cms/fncconfdeffmt/s/fncconfdeffmt/delete', // 删除接口
              data: {
                itemId: _this.rowData.itemId,
                styleId: _this.rowData.styleId
              },
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.getList();
                  _this.$message({message: '删除成功', type: 'success'});
                } else {
                  _this.$message({message: response.message, type: 'error'});
                }
              }
            });
          }
        }
      });
    },
    /**
         * 查看详情
         */
    infoFn: function () {
      console.log(111);
      if (!this.rowData) {
        this.$message({message: '请先选择一条数据!', type: 'warning'});
        return;
      }
      this.switchStatus('DETAIL', false);
      this.$nextTick(function () {
        this.formDisabled = true;
        yufp.clone(this.rowData, this.formdata);
      });
    },
    /**
         * 保存
         */
    saveFn: function () {
      var _this = this;
      var validate;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.formdata.fncItemEditTyp === '2' && !_this.formdata.fncConfCalFrm) {
        return this.$message({message: '请输入计算公式!', type: 'warning'});
      }
      var url = this.viewType === 'ADD' ? this.addUrl : this.updateUrl;
      if (this.viewType === 'ADD') {
        yufp.clone({styleId: _this.styleId}, _this.formdata);
      }
      yufp.service.request({
        method: 'POST',
        url: url,
        data: _this.formdata,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.dialogVisible = false;
            _this.getList();
            _this.$message({message: '操作成功', type: 'success'});
          } else {
            _this.$message({message: response.message, type: 'error'});
          }
        }
      });
    },
    /**
         * 取消
         */
    cancelFn: function () {
      this.dialogVisible = false;
    }
  },
  created: function () {
    this.isPlainReport = this.fncConfTyp === '13' || this.fncConfTyp === '14' || this.fncConfTyp === '15';
  },
  mounted: function () {
    // 获取列表数据
    this.getList();
    // 获取项目Options
    this.getProjectOptions();
  }
};
</script>
<style>
.defifinstatedit {
  padding: 5px;
}
.defifinstatedit table {
  border-spacing: 1px;
  border-collapse: separate;
}
.defifinstatedit table thead {
  background-color: #d5e3f9;
}
.defifinstatedit table td,
.defifinstatedit table th {
  border: 1px solid #a2aebd;
}
.defifinstatedit table td.border-none {
  border: none;
}
.defifinstatedit td {
  color:#48576a;
}

.defifinstatedit td.red {
  color:#ff0000;
}
.defifinstatedit table tr:not(.theadtr):hover {
  background-color: #fffbc0;
}
.defifinstatedit table tr.selected {
  background-color: #fffbc0;
}
</style>