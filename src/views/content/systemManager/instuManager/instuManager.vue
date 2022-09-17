<!--
  @created by tanrui1@yusys.com.cn 2020-12-28
  @updated by
  @description 金融机构管理
-->
<template>
  <div id="instuManager"> 
    <yu-panel ref="panel" :title="$t('金融机构管理')" :placeholder="$t('关键字')" show-search-input @search="fuzzyQuery" class="adjust-height">
      <!--金融机构列表操作按钮-->
      <template slot="right">
        <yu-toolBar>
          <yu-button @click="addFn">{{ $t('instuManager.xz') }}</yu-button>
          <yu-button v-norepeat.disabled @click="useFn">{{ $t('instuManager.qy') }}</yu-button>
          <yu-button v-norepeat.disabled @click="stopFn">{{ $t('instuManager.ty') }}</yu-button>
          <yu-button v-norepeat.disabled @click="deleteFn">{{ $t('instuManager.sc') }}</yu-button>
        </yu-toolBar>
      </template>
      <!--金融机构列表高级查询条件-->
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="instuTable" label-width="120px" v-model="searchFormdata" form-type="search" @form-reset="resetFn">
          <yu-xform-group :column="4">
            <yu-xform-item name="instuCde" label="金融机构代码" placeholder="请输入"></yu-xform-item>
            <yu-xform-item name="instuName" label="金融机构名称" placeholder="请输入"></yu-xform-item>
            <yu-xform-item name="instuSts" label="状态" placeholder="请输入" ctype="select" data-code="DATA_STS"></yu-xform-item>
            <!-- <div slot="custom">
              <yu-button type="primary" icon="search" @click="searchFn" style="margin-left: 10px">{{ $t(查看) }}</yu-button>
              <yu-button type="primary" icon="edit" @click="resetFn">{{ $t(重置) }}</yu-button>
            </div> -->
          </yu-xform-group>
        </yu-xform>
      </template>
      <!--金融机构列表-->
      <yu-xtable ref="instuTable" row-number :data-url="tableUrl" selection-type="checkbox" :base-params="tableParams" condition-key="" @select="tableSelectedChangeFn">
        <yu-xtable-column label="金融机构名称">
          <template slot-scope="scope">
            <a class="underline" @click="instuDetailFn(scope.row)">{{ scope.row.instuName }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="金融机构代码" prop="instuCde"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="instuSts" data-code="DATA_STS">
          <template slot-scope="scope">
            <yu-tag v-if="scope.row.instuSts=== 'A'" type="success">{{ instuSts[scope.row.instuSts] }}</yu-tag>
            <yu-tag v-if="scope.row.instuSts=== 'I'" type="danger">{{ instuSts[scope.row.instuSts] }}</yu-tag>
            <yu-tag v-if="scope.row.instuSts=== 'W'" type="warning">{{ instuSts[scope.row.instuSts] }}</yu-tag>
          </template>
        </yu-xtable-column>    
        <yu-xtable-column label="最新更新" width="260">
          <template slot-scope="scope" v-if="scope.row.lastChgUsr">
            <span>{{ scope.row.lastChgUsr + '（' + scope.row.lastChgDt + '）' }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <yu-button-drop set-index="0" :show-length="2" type="text">
              <yu-button @click="editDptFn(scope.row)" type="text">修改</yu-button>
              <yu-button @click="deleteFn(scope.row)" type="text">删除</yu-button>
            </yu-button-drop>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!--金融机构 新增 修改 详情-->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" size="small" @close="dialogCloseFn">
      <yu-xform ref="instuForm" v-model="formdata" :form-type="formType" label-width="120px" :rules="formRules">
        <yu-xform-group columns="4">
          <yu-xform-item label="金融机构名称" name="instuName" placeholder="请输入"></yu-xform-item>
          <yu-xform-item label="金融机构代码" name="instuCde" placeholder="请输入" :disabled="viewType != 'ADD'"></yu-xform-item> 
          <yu-xform-item label="状态" name="instuSts" placeholder="请输入" ctype="select" data-code="DATA_STS"></yu-xform-item>
          <yu-xform-item label="进入日期" name="joinDt" placeholder="请输入" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="地址" name="instuAddr" placeholder="请输入"></yu-xform-item>
          <yu-xform-item label="邮编" name="zipCde" placeholder="请输入" ></yu-xform-item>
          <yu-xform-item label="联系电话" name="contTel" placeholder="请输入" :rules="mobilePhoneRules"></yu-xform-item>
          <yu-xform-item label="联系人" name="contUsr" placeholder="请输入"></yu-xform-item>
          <yu-xform-item label="最新变更用户" name="lastChgUsr" :hidden="viewType === 'ADD'" :disabled="true"></yu-xform-item>
          <yu-xform-item label="最新变更时间" name="lastChgDt" :hidden="viewType === 'ADD'" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div slot="footer" class="yu-grpButton">
        <yu-button type="primary" v-if="formType==='edit'" key="edit" v-norepeat.disabled @click="saveDptFn">保存</yu-button>
        <yu-button v-if="checkCtrl('update') && viewType === 'DETAIL'" type="primary" @click="switchStatus('EDIT', true)">修改</yu-button>
        <yu-button v-if="formType === 'details'" @click="cancelFn">返回</yu-button>
        <yu-button v-else @click="cancelFn">取消</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
import { clone, extend, lookup } from '@/utils'
import { validator } from "@/utils/validate"
import { checkBelongToChooseNode } from '@/utils/util'
import { mapGetters } from 'vuex';
lookup.reg('DATA_STS');
export default {
  data() {
    return {
      viewType: 'ADD', // 弹框模式
      viewTitle: lookup.find('CRUD_TYPE', false), // 弹出框类型
      formType: 'details', // 表单模式
      orgId: '', // 快速搜索 机构树
      searchFormdata: {}, // 高级搜索 表单数据
      selected: false,
      tableUrl: backend.appOcaService + '/api/adminsminstu/page', // 金融机构列表查询地址
      tableParams: {
      }, // 金融机构列表查询参数
      instuSts: {}, // 用户状态

      dialogVisible: false,
      formdata: {

      },
      formDisabled: false,

      formRules: {
        instuName: [
          { required: true, message: this.$t('instuManager.qsrbmmc') },
          { max: 50, message: this.$t('instuManager.zdcdbcggzf') },
          { validator: validator.speChar, message: this.$t('instuManager.srxxbhtszf') }
        ],
        instuCde: [
          { required: true, message: this.$t('instuManager.qsrbmdm') },
          { max: 10, message: this.$t('最大长度不超过10位') },
          { validator: validator.speChar, message: this.$t('instuManager.srxxbhtszf') }
        ],
        zipCde: [
          { max: 6, message: this.$t('instuManager.zdcdbcggzf') },
          { validator: validator.postcode, message: '邮编格式不正确' }
        ],
        instuSts: [{ required: true, message: this.$t('instuManager.qxzbmzt') }]
      },
         mobilePhoneRules: [
        {
          validator: validator.mobile,
          message: '手机号码格式不正确',
          trigger: 'blur'
        }
      ],
    };
  },
  computed: {
  },
  watch: {
    orgId(newVal, oldVal) {
      this.$refs.tree.filter(newVal);
    },
  },
  mounted() {
    this.instuSts = lookup.find('DATA_STS', false);
    this.$store.dispatch('funData/orgTreeFn').then(res => {
    })
  },
  methods: {
    switchStatus(viewType, editable) { // 初始面板标题、按钮等信息
      if (this.formdata && this.formdata.instuSts === 'A' && viewType === 'EDIT') {
        this.$message({
          message: this.$t('instuManager.znxztyhdqydsj'),
          type: 'warning'
        });
        return;
      }
      this.viewType = viewType;
      this.dialogVisible = true;
      this.formType = viewType === 'DETAIL' ? 'details' : 'edit';
      this.formDisabled = !editable;
    },
    /**
        * 快速查询
        * @param data 模糊查询关键字
        */
    fuzzyQuery(data) {
      debugger;
      var param = {
        instuName: data.value
      };
      this.$refs.instuTable.remoteData(param);
    },
    tableSelectedChangeFn() {
      this.selected = this.$refs.instuTable.selections.length > 0;
    },
    /**
      * 通过所在机构查询部门列表
      * @param node 点击的节点信息
      * @param immidately 是否立即执行查询，区分快速查询和精确查询
        */
    /**
      * 查询表单触发查询
      */
    searchFn() {
      debugger;
      this.$refs.instuTable.remoteData(this.searchFormdata);
    },
    /**
      * 清空表单查询参数
      */
    resetFn() {
      this.$refs.searchForm.resetFields();
    },
    addFn() { // 新增弹出方法
      this.switchStatus('ADD', true);
      this.$nextTick(function () {
        this.$refs.instuForm.resetFields(); // 重置form
        this.formdata.instuSts = 'W';
      });
    },
    deleteFn(row) { // 批量删除
      var _this = this;
      var ids = [];
      if (row.instuId) { // 行内操作
        if (row.instuSts === 'A') {
          this.$message({
            message: this.$t('instuManager.znscdqyhqydsj'),
            type: 'warning'
          });
          return;
        }else{
          ids.push(row.instuId);
        }
      } else if (this.$refs.instuTable.selections.length > 0) { // 按钮组
        for (var i = 0; i < this.$refs.instuTable.selections.length; i++) {
          var selection = this.$refs.instuTable.selections[i];
          if (selection.instuSts != 'A') {
            ids.push(selection.instuId);
          } else {
            this.$message({
              message: this.$t('instuManager.znscdqyhqydsj'),
              type: 'warning'
            });
            return;
          }
        }
      } else {
        _this.$message({
          message: _this.$t('instuManager.qxxzyscdsj'),
          type: 'warning'
        });
        return;
      }
      _this.$confirm(_this.$t('instuManager.cczjscgbmxxsfjx'), _this.$t('instuManager.ts'), {
        confirmButtonText: _this.$t('instuManager.qd'),
        cancelButtonText: _this.$t('instuManager.qx'),
        type: 'warning'
      }).then(function () {
        _this.$request({
          method: 'POST',
          url: backend.appOcaService + '/api/adminsminstu/batchdelete',
          data: ids
        }).then(({code, message, data}) => {
        //处理请求成功的情况
          if (code === '0') {
            _this.$message({
              message: _this.$t('instuManager.sjczcg')
            });
            _this.$refs.instuTable.remoteData();
          } else {
            _this.$message({
              message: _this.$t('instuManager.sjczsb')
            });
          }
        })
      }).catch(function () {
        return;
      });
    },
    useFn() { // 批量启用
      var _this = this;
      if (this.$refs.instuTable.selections.length > 0) {
        var ids = [];
        for (var i = 0; i < this.$refs.instuTable.selections.length; i++) {
          var row = this.$refs.instuTable.selections[i];
          if (row.instuSts === 'W' || row.instuSts === 'I') {
            ids.push(row.instuId);
          } else {
            this.$message({
              message: this.$t('instuManager.znxztyhdqydsj'),
              type: 'warning'
            });
            return;
          }
        }
        this.$confirm(this.$t('instuManager.czzjqysxbm'), this.$t('instuManager.ts'), {
          confirmButtonText: this.$t('instuManager.qr'),
          cancelButtonText: this.$t('instuManager.qx'),
          type: 'warning',
          callback(action) {
            if (action === 'confirm') {
              // 发起启用用部门请求
              _this.$request({
                method: 'POST',
                url: backend.appOcaService + '/api/adminsminstu/batchenable',
                data: ids
              }).then(({code, message, data}) => {
                //处理请求成功的情况
                if (code === '0') {
                  _this.$message({
                    message: _this.$t('instuManager.sjczcg')
                  });
                  _this.$refs.instuTable.remoteData();
                } else {
                  _this.$message({
                    message: _this.$t('instuManager.sjczsb')
                  });
                }
              })
            }
          }
        });
      } else {
        _this.$message({
          message: _this.$t('instuManager.qxxzyqydsj'),
          type: 'warning'
        });
        return;
      }
    },
    /**
        * 停用金融机构
        */
    stopFn() {
      // 校验是否已选择数据
      var _this = this;
      if (this.$refs.instuTable.selections.length < 1) {
        this.$message({
          message: this.$t('instuManager.qxzytjl'),
          type: 'warning'
        });
        return;
      }
      var selections = this.$refs.instuTable.selections;
      var ids = [];
      for (var i = 0; i < selections.length; i++) {
        if (selections[i].instuSts === 'A') {
          // 只能停用已启用的机构
          ids.push(selections[i].instuId);
        } else {
          this.$message({
            message: this.$t('instuManager.znxzyqydsj'),
            type: 'warning'
          });
          return;
        }
      }
      this.$confirm(this.$t('instuManager.cczjtysyxzsj'), this.$t('instuManager.ts'), {
        confirmButtonText: this.$t('instuManager.qr'),
        cancelButtonText: this.$t('instuManager.qx'),
        type: 'warning',
        callback(action) {
          if (action === 'confirm') {
            // 发起停用机构请求
            _this.$request({
              method: 'POST',
              url: backend.appOcaService + '/api/adminsminstu/batchdisable',
              data: ids,
            }).then(({code, message, data}) => {
              //处理请求成功的情况
              if (code === '0') {
                _this.$message({
                  message: _this.$t('instuManager.sjczcg')
                });
                _this.$refs.instuTable.remoteData();
              } else {
                _this.$message({
                  message: _this.$t('instuManager.sjczsb')
                });
              }
            })
          }
        }
      });
    },

    /**
        * 部门详情
        * @param row 当前机构信息
        */
    instuDetailFn(row) {
      this.switchStatus('DETAIL', true);
      this.$nextTick(function () {
        this.$refs.instuForm.resetFields(); // TODO 发/info接口
        clone(row, this.formdata);
      });
    },
    editDptFn(row) {
      if (row.instuSts === 'A') {
        this.$message({
          message: this.$t('instuManager.znxztyhdqydsj'),
          type: 'warning'
        });
        return;
      }
      this.switchStatus('EDIT', false);
      this.$nextTick(function () {
        this.$refs.instuForm.resetFields(); // 重置form
        extend(this.formdata, row);
      });
    },
    clearOrgFn() {
      this.formdata.orgId = null;
    },
    clearUpdptFn() {
    },
    dialogCloseFn() {
    },
    /**
        * 保存机构
        * @param row 当前机构信息
        */
    saveDptFn() { // 新增保存方法
    debugger;
      var _this = this;
      var url = this.viewType == 'ADD' ? backend.appOcaService + '/api/adminsminstu/save' : backend.appOcaService + '/api/adminsminstu/update';
      this.$refs.instuForm.validate(function (valid) {
        if (valid) {
          var params = clone(_this.formdata);
          if (_this.viewType == 'ADD') {
            delete params.instuId;
          }
          _this.$request({
            method: 'POST',
            url: url,
            data: params
          }).then(({code, message, data}) => {
            //处理请求成功的情况
            if (code === '0') {
              _this.$message({
                message: _this.$t('instuManager.sjbccg')
              });
              _this.dialogVisible = false;
              _this.$refs.instuTable.remoteData();
            } else {
              _this.$message({
                message:message,
                type: 'warning'
              });
            }
          })
        }
      });
    },
    /**
        * 关闭弹出框
        */
    cancelFn() {
      this.dialogVisible = false;
    }
  }
}
</script>
