
<template>
  <!--
    @created by 陈杰 2021-08-23
    @description 敞口划分
  -->
  <div>
    <yu-panel title="输入查询条件" panel-type="simple">
      <yu-xform related-table-name="refTable" ref="searchForm" v-model="searchFormdata" :remove-empty="true" label-width="120px">
        <yu-xform-group :column="2">
          <yu-xform-item label="产品编号" placeholder="产品编号" name="prdId" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" placeholder="产品名称" name="prdName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="button-group" align="center">
        <yu-button type="primary" @click="searchFn()">查询</yu-button>
        <yu-button @click="resetFn()">重置</yu-button>
      </div>
    </yu-panel>
    <yu-panel title="敞口划分列表" panel-type="simple">
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button @click="doAdd" v-if="checkCtrl('add')" type="primary">新增</yu-button>
        <yu-button @click="doUpdate" v-if="checkCtrl('edit')" type="primary">修改</yu-button>
        <yu-button @click="doDelete" v-if="checkCtrl('delete')" type="primary">删除</yu-button>
        <!-- <yu-button @click="infoFn" v-if="checkCtrl('view')" type="primary">查看</yu-button> -->
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" :options="options" :disabled="doAddFlag" filterable clearable ctype="select" rules="required" @change="prdNameChange"></yu-xtable-column>
        <yu-xtable-column label="表内外业务标识" ctype="select" prop="bussFlag" data-code="STD_BUSS_FLAG" :disabled="doUpdateFlag" rules="required" @change="savefn"></yu-xtable-column>
        <yu-xtable-column label="信用风险转换系数(CCF)" ctype="input" prop="ccf" :disabled="doUpdateFlag" rules="required" @blur="savefn"></yu-xtable-column>
        <yu-xtable-column label="敞口风险分类代码" ctype="select" prop="spacType" data-code="STD_SPAC_TYPE" :disabled="doUpdateFlag" rules="required" @change="savefn"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_BUSS_FLAG,STD_SPAC_TYPE');

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/expodivide/selectbymodel',
      formdata: {},
      restaurants: [],
      state4: '',
      timeout: null,
      doAddFlag: true,
      doUpdateFlag: true,
      options: []
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.oauth.userName,
      userId: (state) => state.oauth.userId,
      org: (state) => state.oauth.org,
      instu: (state) => state.oauth.instu, // 金融机构Object
      loginCode: (state) => state.oauth.loginCode
    })
  },
  mounted () {
    this.Param = {
      condition: JSON.stringify({ oprType: '01' })
    };
    this.getOptions();
  },
  methods: {
    doAdd () {
      var _this = this;
      let isRefTableValidateOk = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTableValidateOk = true;
        }
      });
      if (!isRefTableValidateOk) {
        return;
      }
      let userInfo = this.$xutils.getLoginUserInfo();
      let pkId = this.$xutils.getUUID();
      let row = {
        pkId: pkId,
        oprType: '01'
      };
      _this.doAddFlag = false;
      _this.doUpdateFlag = false;
      this.$refs.refTable.tabledata.push(row);
      this.$refs.refTable.setCurrentRow(row);
    },
    doUpdate () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.doUpdateFlag = false;
    },
    doDelete () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      // 如果未选中表格数据，则弹出提示
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      // 获得选中的表格数据
      yufp.clone(selectionsAry[0], model);
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            // 操作类型，01--可展示   02--不可展示
            model.oprType = '02';
            // 向后台发送删除请求
            // method: 请求方式
            // url: 接口路径
            // data: 向后端传递的数据
            // callback: 服务请求后执行的回调函数
            // 逻辑删除，修改状态OPR_TYPE 01变为02
            yufp.service.request({
              method: 'POST',
              data: model,
              url: backend.cmisLmt + '/api/expodivide/update',
              callback: function (code, message, response) {
                // 删除后刷新表格数据
                _this.$refs.refTable.remoteData();
                // 弹出提示
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    prdNameChange (val) {
      var _this = this;
      if (_this.doAddFlag) {
        return;
      }
      this.$refs.refTable.selections[0].prdId = val;
      this.options.forEach(item => {
        if (item.key == val) {
          _this.insert(item.value);
        }
      });
    },

    savefn () {
      var _this = this;
      if (_this.doAddFlag) {
        _this.doSave();
      } else {
        _this.insert();
      }
    },

    insert (prdName) {
      console.log('===============');
      // 获取选中的数据
      var _this = this;
      var model = {};

      var selectionsAry = _this.$refs.refTable.selections;
      yufp.clone(selectionsAry[0], model);
      if (prdName) {
        model.prdName = prdName;
      }


      let isRefTableValidateOk = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTableValidateOk = true;
        }
      });
      if (!isRefTableValidateOk) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisLmt + '/api/expodivide/',
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message('保存成功');
            _this.doAddFlag = true;
            _this.doUpdateFlag = true;
          } else {
            _this.$refs.refTable.remoteData();
            _this.$message({
              message: '保存失败',
              type: 'warning'
            });
          }
        }
      });
    },

    doSave () {
      // 获取选中的数据
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        return;
      }
      if (!_this.doAddFlag || _this.doUpdateFlag) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisLmt + '/api/expodivide/update',
        data: selectionsAry[0],
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message('保存成功');
            _this.doUpdateFlag = true;
          } else {
            _this.$refs.refTable.remoteData();
            _this.$message({
              message: '保存失败',
              type: 'warning'
            });
          }
        }
      });
    },
    getOptions () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: {},
        url: backend.cmisLmt + '/api/lmtriscpxxckhf/selectall',
        callback: function (code, message, response) {
          if (code == '0') {
            _this.options = response.data;
          } else {
            _this.$message({
              duration: 4000,
              message: '请求失败！',
              type: 'warning'
            });
          }
        }
      });
    },

    // 条件查询
    searchFn: function () {
      let _this = this;
      _this.doAddFlag = true;
      _this.doUpdateFlag = true;
      _this.$refs.refTable.remoteData({ condition: JSON.stringify(_this.searchFormdata) });
    },
    // 重置
    resetFn: function () {
      let _this = this;
      _this.$refs.searchForm.resetFields();
    }
  }
};
</script>
