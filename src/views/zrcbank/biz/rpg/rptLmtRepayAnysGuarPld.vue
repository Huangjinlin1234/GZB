
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 授信可行性及还款能力分析————第二还款能力分析————抵质押担保
    相关的表为： rpt_lmt_repay_anys_guar_pld  rpt_lmt_repay_anys_guar_pld_detail
  -->
  <div>
      <yu-panel title="抵质押担保" panel-type="simple" v-if="isDy">
         <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="upPld" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="updatePldDetail" v-show="op!='VIEW'">更新押品信息</yu-button>
      </yu-toolbar>
    <yu-xtable ref="rptLmtRepayAnysGuarPldDetailTable" row-number :data="pldDetailData" :pageable="false"  request-type="POST">
      <yu-xtable-column prop="subSerno" label="授信分项" width="120px" hide-column></yu-xtable-column>
      <yu-xtable-column prop="guarNo" label="抵质押品编号" width="120px" hide-column></yu-xtable-column>
      <yu-xtable-column prop="guarTypeCd" label="担保分类名称" width="120px" :formatter="guarTypeCdFormatter" ></yu-xtable-column>
      <yu-xtable-column prop="guarTypeCdName" label="担保分类名称" width="120px" hide-column></yu-xtable-column>
      <yu-xtable-column prop="guarCusName" label="抵质押品所有人" width="120px"></yu-xtable-column>
      <yu-xtable-column prop="guarCusId" label="抵质押品所有人" hide-column></yu-xtable-column>
      <yu-xtable-column prop="pldAddress" label="抵押物地址" width="100px"></yu-xtable-column>
      <yu-xtable-column prop="pldSqu" label="抵押物面积" width="100px"></yu-xtable-column>
      <yu-xtable-column prop="evalAmt" label="评估价" width="100px"></yu-xtable-column>
      <yu-xtable-column prop="maxMortagageAmt" label="我行可用价值" width="100px"></yu-xtable-column>
      <yu-xtable-column prop="correFinAmt" label="对应融资金额" width="100px"></yu-xtable-column>
      <yu-xtable-column prop="mortagageRate" label="抵押率" width="100px">
      <template slot-scope="scope">
        {{ isNaN(formatterNum(scope.row.mortagageRate))? '':Number(scope.row.mortagageRate*100).toFixed(2) + '%' }}
      </template>
      </yu-xtable-column>
      <yu-xtable-column prop="isPldOrder" label="是否顺位抵押" data-code="STD_ZB_YES_NO" width="120px"></yu-xtable-column>
      <yu-xtable-column prop="isLease" label="抵押物是否出租" data-code="STD_ZB_YES_NO" width="120px" ></yu-xtable-column>
    </yu-xtable>
    <yu-xdialog title="抵押物情况" :visible.sync="dialogPldDetail" width="1000px">
        <yu-xform ref="pldDetailDialog" label-width="160px" v-model="formdataPldDetail">
          <yu-xform-group :column="2">
            <yu-xform-item label="授信分项" name="subSerno" ctype="input" disabled hidden></yu-xform-item>
            <yu-xform-item label="担保分类名称" name="guarTypeCd" ctype="yu-xdic-tree" @select-fn="commonSelectFn"  :parms="{ optType: 'STD_DZY_TYPE' }" disabled></yu-xform-item>
            <yu-xform-item label="抵质押品所有人" name="guarTypeCdName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="抵押物地址" name="pldAddress" ctype="input" rules="required"></yu-xform-item>
            <yu-xform-item label="抵押物面积" name="pldSqu" ctype="yu-num" rules="required" ></yu-xform-item>
            <yu-xform-item label="评估价" name="evalAmt" ctype="yu-num" disabled></yu-xform-item>
            <yu-xform-item label="我行可用价值" name="maxMortagageAmt"  ctype="yu-num"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="对应融资金额" name="correFinAmt" ctype="yu-num" disabled></yu-xform-item>
            <yu-xform-item label="抵押率(抵押率=对应融资金额/我行可用价值)" name="mortagageRate" ctype="yu-num" sign="%" :multiple="100" disabled></yu-xform-item>
            <yu-xform-item label="是否顺位抵押" name="isPldOrder"  ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
            <yu-xform-item label="抵押物是否出租" name="isLease"  ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="savePld">保存</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      </yu-panel>
        <yu-xform ref="rptLmtRepayAnysGuarPldForm" label-width="240px" v-model="formdata" style="margin-top:20px" :disabled="op =='VIEW'">
          <yu-xform-group :column="1">
            <yu-xform-item label="主键" name="pkId" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label="流水号" name="serno" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label="总体概述" name="generalOverview" rules="required" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="评估公司名称" name="assessmentComName" rules="required" ctype="input"></yu-xform-item>
            <yu-xform-item label="评估日期" name="assessmentDate" rules="required" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="其他说明事项" name="otherDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    <yu-panel title="如为质押物，则填写下表：" panel-type="simple" v-if="isZy">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="upZy" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="updatePldDetail" v-show="op!='VIEW'">更新押品信息</yu-button>
      </yu-toolbar>
      <yu-xtable ref="pldTable" row-number  :pageable="false" :data="zyData" request-type="POST">
        <yu-xtable-column prop="pledInfor" label="质押物情况"></yu-xtable-column>
        <yu-xtable-column prop="owner" label="所有权人"></yu-xtable-column>
        <yu-xtable-column prop="pledCurVal" label="质押物现价"></yu-xtable-column>
        <yu-xtable-column prop="pledRate" label="质押率">
        <template slot-scope="scope">
        {{ isNaN(formatterNum(scope.row.pledRate))? '':Number(scope.row.pledRate*100).toFixed(2) + '%' }}
      </template>
        </yu-xtable-column>
        <yu-xtable-column prop="exitsRisk" label="存在风险"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="rptLmtRepayAnysGuarZyForm"  v-model="formdataZy" :disabled="op =='VIEW'">
          <yu-xform-group :column="1">
            <yu-xform-item label="其他说明事项" name="zyOtherDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      <yu-xdialog title="质押物情况" :visible.sync="dialogPld" width="1000px">
        <yu-xform ref="pldDialog" label-width="160px" v-model="formdataPld">
          <yu-xform-group :column="1">
            <yu-xform-item label="质押物情况" name="pledInfor" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="所有权人" name="owner" ctype="input"></yu-xform-item>
            <yu-xform-item label="质押物现价" name="pledCurVal" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
            <yu-xform-item label="质押率" name="pledRate" ctype="yu-num" sign="%" :multiple="100" disabled></yu-xform-item>
            <yu-xform-item label="存在风险" name="exitsRisk" ctype="input"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveZy">保存</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
      <div class="yu-grpButton">
            <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
          </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_LAND_CHA');
export default {
  components: { YufpDemoSelector, mapState },
  mixins: [mixinForm],
  props: {
    param: Object
  },
  data: function () {
    return {
      pldDetailData: [],
      dialogPld: false,
      dialogPldDetail: false,
      formdataPld: {},
      zyData: [],
      pldType: '',
      formdata: {},
      isDy: true,
      isZy: true,
      DZDataObject: {},
      DZData: [],
      op: ''
    };
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      async: false,
      data: {
        optType: 'STD_DZY_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data.data, this.DZData);
      }
    });
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.init();
  },

  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarpld/selectPldBySerno',
        data: _this.param.serno,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null) {
              yufp.clone(response.data, _this.formdata);
              if (_this.isZy) {
                _this.formdataZy.zyOtherDesc = response.data.zyOtherDesc;
              }
            } else {
              _this.formdata.serno = _this.param.serno;
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
      _this.initPld();
    },
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed(2));
    },
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    },
    initPld: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarplddetail/initPldDetail',
        data: {condition: JSON.stringify({serno: _this.param.serno})},
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null) {
              _this.pldDetailData = response.data.rptLmtRepayAnysGuarPldDetailList;
              _this.zyData = response.data.rptLmtRepayAnysGuarZyList;
              if (response.data.rptLmtRepayAnysGuarPldDetailList == null || response.data.rptLmtRepayAnysGuarPldDetailList.length == 0) {
                _this.isDy = false;
              }
              if (response.data.rptLmtRepayAnysGuarZyList == null || response.data.rptLmtRepayAnysGuarZyList.length == 0) {
                _this.isZy = false;
              }
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    updatePldDetail: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarplddetail/updatePldDetail',
        data: {condition: JSON.stringify({serno: _this.param.serno})},
        callback: function (code, message, response) {
          _this.initPld();
        }
      });
    },
    upZy: function () {
      var _this = this;
      var selectionAry = _this.$refs.pldTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.pldType = 'edit';
      _this.dialogPld = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataPld);
      });
    },
    upPld: function () {
      var _this = this;
      var selectionAry = _this.$refs.rptLmtRepayAnysGuarPldDetailTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogPldDetail = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataPldDetail);
      });
    },
    delZy: function () {
      var _this = this;
      var selectionAry = _this.$refs.pldTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptlmtrepayanysguarzy/deletePld',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.pldTable.remoteData();
                  _this.$message('删除成功');
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    savePld: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarplddetail/save',
        data: _this.formdataPldDetail,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$refs.pldDetailDialog.resetFields();
            _this.dialogPldDetail = false;
            _this.initPld();
            _this.$message({
              message: '操作成功！'
            });
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    saveZy: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarzy/updatePld',
        data: _this.formdataPld,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.$refs.pldDialog.resetFields();
            _this.dialogPld = false;
            _this.initPld();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    saveBtn: function () {
      var _this = this;
      let obj = {};
      var validate = false;
      _this.$refs.rptLmtRepayAnysGuarPldForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.clone(_this.formdata, obj);
      if (_this.formdataZy) {
        obj.zyOtherDesc = _this.formdataZy.zyOtherDesc;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarpld/savePld',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }});
    }
  }
};
</script>
