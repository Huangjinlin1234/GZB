<template>
  <div id="seqconfig_seqconfigAdmin">
    <!--列表窗口-->
    <yu-panel :title="$t('sequenceConfig.xlhmb')" :hideFilter="false" :collapseHide="false">
      <div class="filter-container">
        <yu-xform
          v-model="formdata"
          related-table-name="seqconfigTable"
          form-type="search" more-fields-flag="false"
        >
          <yu-xform-group :column="3">
            <yu-xform-item
              :label="$t('sequenceConfig.xlmc')"
              :placeholder="$t('sequenceConfig.xlmc')"
              ctype="input"
              name="seqName"
            ></yu-xform-item>
            <yu-xform-item
              :label="$t('sequenceConfig.xl')"
              :placeholder="$t('sequenceConfig.xl')"
              ctype="input"
              name="seqId"
            ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-toolBar>
          <el-button @click="openAddFn">{{
            $t("sequenceConfig.xz")
          }}</el-button>
          <el-button @click="openUpdateFn">{{
            $t("sequenceConfig.bj")
          }}</el-button>
          <el-button @click="deleteFn">{{ $t("sequenceConfig.sc") }}</el-button>
          <el-button @click="createSeqFn">{{
            $t("sequenceConfig.shengcxl")
          }}</el-button>
          <el-button @click="deleteSeqFn">{{
            $t("sequenceConfig.shancxl")
          }}</el-button>
          <el-button @click="resetSeqFn">{{
            $t("sequenceConfig.zzxl")
          }}</el-button>
        </yu-toolBar>
      </div>
      <yu-xtable ref="seqconfigTable" align="center" :data-url="mainGrid.dataUrl" selection-type="radio" row-number :base-params="mainGrid.dataParams">
        <yu-xtable-column :label="$t('sequenceConfig.xl')" prop="seqId" width="150"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.xlmc')" prop="seqName" width="200"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.ksz')" prop="startvalue" width="120"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.zdz')" prop="maximumvalue" width="120"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.zzz')" prop="incrementvalue" width="80"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.czfs')" prop="isCycle" width="120" data-code="CYCLE_TYPE"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.hcz')" prop="cachevalue" width="120"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.xlmb')" prop="seqTemplet"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.xlydws')" prop="seqPlace" width="120"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.bzwsbq')" prop="zeroFill" width="120" data-code="ZEROFILL"></yu-xtable-column>
        <yu-xtable-column :label="$t('sequenceConfig.yscxl')" width="120">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.seqCreate == 'Y'" type="success"> {{ $t('sequenceConfig.yes') }}</el-button>
            <el-button size="small" v-if="scope.row.seqCreate != 'Y'" type="danger">{{ $t('sequenceConfig.no') }}</el-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <!--{{ $t('sequenceConfig.xz') }}/修改 表单窗口-->
    <el-dialog-x
      :center="true"
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      height="500px"
      width="800px"
      top="10%"
    >
      <el-collapse v-model="activeName">
        <el-collapse-item :title="$t('sequenceConfig.mbjcxxpz')" name="1">
          <el-form-x
            ref="form"
            :group-fields="updateFields"
            label-width="110px"
            :disabled="formAllDisabled"
          ></el-form-x>
        </el-collapse-item>
        <el-collapse-item :title="$t('sequenceConfig.mbgspz')" name="2">
          <el-table :data="tableData" :fit="true" @row-dblclick="dbClickFn">
            <el-table-column
              prop="variateName"
              :label="$t('sequenceConfig.blmc')"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="variateValue"
              :label="$t('sequenceConfig.blz')"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="variateDes"
              :label="$t('sequenceConfig.sm')"
              align="center"
            ></el-table-column>
          </el-table>
          <el-form-x
            ref="otherForm"
            label-width="130px"
            :group-fields="updateOtherFields"
            :disabled="formAllDisabled"
          ></el-form-x>
        </el-collapse-item>
      </el-collapse>
      <div slot="footer" align="center">
        <el-button v-if="!formAllDisabled" type="primary" @click="saveFn">{{
          $t("sequenceConfig.bc")
        }}</el-button>
        <el-button type="primary" @click="cancelFn">{{
          $t("sequenceConfig.qx")
        }}</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
yufp.lookup.reg('CYCLE_TYPE,ZEROFILL');
export default{
  // el: '#seqconfig_seqconfigAdmin',
  data: function () {
    var _this = this;
    var validateNum09 = function (rule, value, callback) {
      if (value) {
        if (!isNaN(value)) {
          if (value < 0 || value > 999999999) {
            callback(new Error(_this.$t('sequenceConfig.qsrdsz')));
          } else {
            callback();
          }
        } else {
          callback(new Error(_this.$t('sequenceConfig.qsrsz')));
        }
      } else {
        callback(new Error(_this.$t('sequenceConfig.qsrsz')));
      }
    };
    var seqIdStr = function (rule, value, callback) {
      var reg = /^[A-Z]{1}[A-Z0-9_]+$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error(_this.$t('sequenceConfig.znydxzmszxhxzcqszmznsdxzm')));
      } else {
        callback();
      }
    };
    var validateNum19 = function (rule, value, callback) {
      if (value) {
        if (!isNaN(value)) {
          if (value < 1 || value > 999999999) {
            callback(new Error(_this.$t('sequenceConfig.qsrdsz')));
          } else {
            callback();
          }
        } else {
          callback(new Error(_this.$t('sequenceConfig.qsrsz')));
        }
      } else {
        callback(new Error(_this.$t('sequenceConfig.qsrsz')));
      }
    };
    var validateNum099 = function (rule, value, callback) {
      if (value) {
        if (!isNaN(value)) {
          if (value <= 1 || value > 99) {
            callback(new Error(_this.$t('sequenceConfig.qsrdszmax99')));
          } else {
            callback();
          }
        } else {
          callback(new Error(_this.$t('sequenceConfig.qsrdszmax99')));
        }
      } else {
        callback(new Error(_this.$t('sequenceConfig.qsrdszmax99')));
      }
    };
    var validateNum199 = function (rule, value, callback) {
      if (value) {
        if (!isNaN(value)) {
          if (value < 1 || value > 99) {
            callback(new Error(_this.$t('sequenceConfig.qsrdsz')));
          } else {
            callback();
          }
        } else {
          callback(new Error(_this.$t('sequenceConfig.qsrsz')));
        }
      } else {
        callback(new Error(_this.$t('sequenceConfig.qsrsz')));
      }
    };
    return {
      formdata: {},
      dialogTitle: this.$t('sequenceConfig.xzpzmbym'),
      dialogFormVisible: false,
      formDisabled: false,
      formAllDisabled: false,
      activeName: ['1', '2'],
      isUpdate: false, // 是否为编辑
      mainGrid: {
        height: yufp.custom.viewSize().height - 220,
        radiobox: true,
        dataUrl: backend.seqService + '/api/sequenceconfig/'
      },
      updateFields: [{
        columnCount: 2,
        fields: [
          { field: 'id', label: 'id', hidden: true },
          {
            field: 'seqId',
            label: this.$t('sequenceConfig.xl'),
            readonly: false,
            maxlength: 25,
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' },
              { validator: seqIdStr, trigger: 'blur' }
            ]
          },
          {
            field: 'seqName',
            label: this.$t('sequenceConfig.xlmc'),
            maxlength: 25,
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' }
            ]
          },
          {
            field: 'startvalue',
            label: this.$t('sequenceConfig.ksz'),
            readonly: false,
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' },
              { validator: validateNum09, trigger: 'blur' }
            ]
          },
          {
            field: 'maximumvalue',
            label: this.$t('sequenceConfig.zdz'),
            readonly: false,
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' },
              { validator: validateNum19, trigger: 'blur' }
            ]
          },
          {
            field: 'incrementvalue',
            label: this.$t('sequenceConfig.zzz'),
            readonly: false,
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' },
              { validator: validateNum19, trigger: 'blur' }
            ]
          },
          {
            field: 'isCycle',
            label: this.$t('sequenceConfig.czfs'),
            calcDisabled: false,
            type: 'select',
            dataCode: 'CYCLE_TYPE',
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' }
            ]
          },
          {
            field: 'cachevalue',
            label: this.$t('sequenceConfig.hcz'),
            readonly: false,
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' },
              { validator: validateNum099, trigger: 'blur' }
            ]
          }
        ]
      }],
      updateOtherFields: [{
        columnCount: 1,
        fields: [
          {
            field: 'seqTemplet',
            label: this.$t('sequenceConfig.xlmb'),
            type: 'textarea',
            row: 1,
            maxlength: 100,
            placeholder: this.$t('sequenceConfig.sjblbgsxksxlmbgspz'),
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' }
            ]
          }
        ]
      }, {
        columnCount: 2,
        fields: [
          {
            field: 'seqPlace',
            label: this.$t('sequenceConfig.xlydws'),
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' },
              { validator: validateNum099, trigger: 'blur' }
            ]
          },
          {
            field: 'zeroFill',
            label: this.$t('sequenceConfig.bzwsbq'),
            type: 'select',
            dataCode: 'ZEROFILL',
            rules: [
              { required: true, message: this.$t('sequenceConfig.btx'), trigger: 'blur' }
            ]
          }
        ]
      }],
      tableData: [
        { variateName: this.$t('sequenceConfig.nf'), variateValue: 'yyyy', variateDes: this.$t('sequenceConfig.nf') },
        { variateName: this.$t('sequenceConfig.yf'), variateValue: 'MM', variateDes: this.$t('sequenceConfig.yf') },
        { variateName: this.$t('sequenceConfig.yft'), variateValue: 'dd', variateDes: this.$t('sequenceConfig.yft') },
        { variateName: this.$t('sequenceConfig.xls'), variateValue: 'SEQUENCE', variateDes: this.$t('sequenceConfig.xls') }
      ]
    };
  },
  methods: {
    queryFn: function () { // 重新加载数据
      this.$refs.seqconfigTable.remoteData();
    },
    openAddFn: function () { // 新增
      this.isUpdate = false;
      this.dialogTitle = this.$t('sequenceConfig.mbxzym');
      this.formDisabled = false;
      this.formAllDisabled = false;

      this.dialogFormVisible = true;
      var _this = this;
      _this.$nextTick(function () {
        this.$refs.form.switch('seqId', 'disabled', this.formDisabled);
        this.$refs.form.switch('seqName', 'disabled', this.formDisabled);
        this.$refs.form.switch('startvalue', 'disabled', this.formDisabled);
        this.$refs.form.switch('maximumvalue', 'disabled', this.formDisabled);
        this.$refs.form.switch('incrementvalue', 'disabled', this.formDisabled);
        this.$refs.form.switch('isCycle', 'disabled', this.formDisabled);
        this.$refs.form.switch('cachevalue', 'disabled', this.formDisabled);
        _this.$refs.form.resetFields();
        _this.$refs.form.resetFn();
        _this.$refs.otherForm.resetFn();
      });
    },
    openUpdateFn: function () { // 打开修改页面
      this.isUpdate = true;
      if (this.$refs.seqconfigTable.selections.length == 1) {
        var row = this.$refs.seqconfigTable.selections[0];
        this.formDisabled = true;
        if (row.seqCreate == 'N') {
          // 未生成序列，可编辑
          this.formDisabled = false;
        }
        this.dialogTitle = this.$t('sequenceConfig.mbxgym');
        this.formAllDisabled = false;
        this.dialogFormVisible = true;

        this.$nextTick(function () {
          yufp.extend(this.$refs.form.formModel, row);
          yufp.extend(this.$refs.otherForm.formModel, row);
          this.$refs.form.switch('seqId', 'disabled', true);
          this.$refs.form.switch('seqName', 'disabled', this.formDisabled);
          this.$refs.form.switch('startvalue', 'disabled', this.formDisabled);
          this.$refs.form.switch('maximumvalue', 'disabled', this.formDisabled);
          this.$refs.form.switch('incrementvalue', 'disabled', this.formDisabled);
          this.$refs.form.switch('isCycle', 'disabled', this.formDisabled);
          this.$refs.form.switch('cachevalue', 'disabled', this.formDisabled);

          this.$refs.form.formModel.startvalue = String(row.startvalue);
          this.$refs.form.formModel.maximumvalue = String(row.maximumvalue);
          this.$refs.form.formModel.incrementvalue = String(row.incrementvalue);
          this.$refs.form.formModel.cachevalue = String(row.cachevalue);
          this.$refs.otherForm.formModel.seqPlace = String(row.seqPlace);
          // this.formDisabled = true;
        });
      } else {
        this.$message({ message: this.$t('sequenceConfig.qxzytxlsj'), type: 'warning' });
        return false;
      }
    },
    deleteFn: function () { // 删除
      if (this.$refs.seqconfigTable.selections.length == 1) {
        var id = this.$refs.seqconfigTable.selections[0].id;
        var _this = this;
        this.$confirm(this.$t('sequenceConfig.cczjscgsjjlsfjx'), this.$t('sequenceConfig.ts'), {
          confirmButtonText: this.$t('sequenceConfig.qd'),
          cancelButtonText: this.$t('sequenceConfig.qx'),
          type: 'warning',
          center: true
        }).then(function () {
          yufp.service.request({
            method: 'POST',
            url: backend.seqService + '/api/sequenceconfig/delete/' + id,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message({ message: response.message, type: 'success' });
                _this.queryFn();
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        });
      } else {
        this.$message({ message: this.$t('sequenceConfig.qxzytyscdsj'), type: 'warning' });
        return false;
      }
    },
    createSeqFn: function () { // 创建序列
      if (this.$refs.seqconfigTable.selections.length == 1) {
        var seqId = this.$refs.seqconfigTable.selections[0].seqId;
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.seqService + '/api/sequenceconfig/createsequence/' + seqId,
          callback: function (code, message, response) {
            if (code == 0) {
              _this.$message({ message: response.message, type: 'success' });
              _this.queryFn();
            } else {
              _this.$message({ message: response.message, type: 'error' });
            }
          }
        });
      } else {
        this.$message({ message: this.$t('sequenceConfig.qxzytycjxldxlsj'), type: 'warning' });
        return false;
      }
    },
    deleteSeqFn: function () { // 删除序列
      if (this.$refs.seqconfigTable.selections.length == 1) {
        var seqId = this.$refs.seqconfigTable.selections[0].seqId;
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.seqService + '/api/sequenceconfig/deletesequence/' + seqId,
          callback: function (code, message, response) {
            if (code == 0) {
              _this.$message({ message: response.message, type: 'success' });
              _this.queryFn();
            } else {
              _this.$message({ message: response.message, type: 'error' });
            }
          }
        });
      } else {
        this.$message({ message: this.$t('sequenceConfig.qxzytyscdxlsj'), type: 'warning' });
        return false;
      }
    },
    resetSeqFn: function () { // 重置序列
      if (this.$refs.seqconfigTable.selections.length == 1) {
        var seqId = this.$refs.seqconfigTable.selections[0].seqId;
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.seqService + '/api/sequenceconfig/recreatesequence/' + seqId,
          callback: function (code, message, response) {
            if (code == 0) {
              _this.$message({ message: response.message, type: 'success' });
              _this.queryFn();
            } else {
              _this.$message({ message: response.message, type: 'error' });
            }
          }
        });
      } else {
        this.$message({ message: this.$t('sequenceConfig.qxzytyzzdxlsj'), type: 'warning' });
        return false;
      }
    },
    openDetailFn: function (row) { // 查看
      this.formAllDisabled = true;
      this.dialogFormVisible = true;
      this.dialogTitle = this.$t('sequenceConfig.mbzkym');
      this.$nextTick(function () {
        var form = this.$refs.form, otherForm = this.$refs.otherForm;
        this.$refs.form.resetFields();
        this.$refs.otherForm.resetFields();

        yufp.extend(form.formModel, row.row);
        yufp.extend(otherForm.formModel, row.row);
      });
    },
    dbClickFn: function (row) { // 双击
      var otherForm = this.$refs.otherForm;
      otherForm.formModel.seqTemplet = otherForm.formModel.seqTemplet + '{' + row.variateValue + '}';
    },
    saveFn: function () { // 保存
      var _this = this;
      var formFlag = true;
      _this.$refs.form.validate(function (valid) {
        formFlag = valid;
      });
      var otherFormFlag = true;
      _this.$refs.otherForm.validate(function (valid) {
        otherFormFlag = valid;
      });

      if (formFlag && otherFormFlag) {
        var comitData = {};

        var url = '';
        if (this.isUpdate) {
          // 编辑
          url = backend.seqService + '/api/sequenceconfig/update';
          if (this.formDisabled) {
            yufp.extend(comitData, _this.$refs.otherForm.formModel);
            comitData.seqName = _this.$refs.form.formModel.seqName;
          } else {
            yufp.extend(comitData, _this.$refs.form.formModel);
            comitData.seqTemplet = _this.$refs.otherForm.formModel.seqTemplet;
            comitData.seqPlace = _this.$refs.otherForm.formModel.seqPlace;
            comitData.zeroFill = _this.$refs.otherForm.formModel.zeroFill;
          }
        } else {
          // 新增
          url = this.mainGrid.dataUrl;
          yufp.extend(comitData, _this.$refs.form.formModel);
          yufp.extend(comitData, _this.$refs.otherForm.formModel);
        }
        yufp.service.request({
          method: 'POST',
          url: url,
          data: comitData,
          callback: function (code, message, response) {
            _this.$refs.form.resetFields();
            _this.$refs.otherForm.resetFields();
            _this.dialogFormVisible = false;
            // _this.queryFn();
            // if (code == 0) {
            if (code == 0) {
              _this.$message({ message: response.message, type: 'success' });
              _this.queryFn();
            } else {
              _this.$message({ message: response.message, type: 'error' });
            }
            // }
          }
        });
      }
    },
    cancelFn: function () { // 取消
      var form = this.$refs.form, otherForm = this.$refs.otherForm;
      form.resetFields();
      otherForm.resetFields();
      this.dialogFormVisible = false;
    }
  }
};
</script>
