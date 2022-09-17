<template>
  <!--
    @created by zxz
    @time  2021/5/5
    @description 用信条件落实情况
  -->
  <div>
    <yu-tabs v-model="tabName">
        <yu-panel title="用信条件落实情况" :hideFilter="false" :collapseHide="false">
          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button @click="addFn" :hidden="isHidden">新增</yu-button>
              <yu-button @click="deleteFn" :hidden="isHidden">删除</yu-button>
              <yu-button @click="saveFn" :hidden="isHidden">保存</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" request-type="post" condition-key="condition" :default-load="false" :base-params="dataParam">
            <yu-xtable-column label="条件说明" prop="condDesc" ctype="input" :disabled="isDisabled"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" hide-column></yu-xtable-column>
            <yu-xtable-column label="是否已落实" prop="isPact" width="100px" data-code="STD_ZB_YES_NO" ctype="select" :disabled="isDisabled"></yu-xtable-column>
            <yu-xtable-column label="描述" prop="description" ctype="textarea" :disabled="isDisabled"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');

export default {
  data: function () {
    return {
      tabName: 'base',
      dataUrl: backend.cmisBiz + '/api/imgconddetails/queryImgCondDetailsContNo',
      dataParam: {},
      dialogVisible: false,
      formDisabled: true,
      isDisabled: true,
      isHidden: true,
      contNo: ''
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    let contNo = '';
    let op = '';
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      if (data.nodeId == '243_6' || data.nodeId == '243_7' || data.nodeId == '244_8' || data.nodeId == '244_9' || data.nodeId == '245_9' || data.nodeId == '245_11') {
        op = 'disabled';
      }

      if (data.param.contNo) {
        contNo = data.param.contNo;
      } else {
        contNo = data.contNo;
      }
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      contNo = data.contNo;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      contNo = data.contNo;
    }
    if (op == 'disabled') {
      _this.isDisabled = false;
      _this.isHidden = false;
    }
    _this.contNo = contNo;
    _this.dataParam = { condition: {contNo: contNo, oprType: '01'} };
  },

  methods: {
    saveFn () {
      var _this = this;
      var tableData = _this.$refs.refTable.tabledata;
      if (tableData.length > 0) {
        for (let i = 0; i < tableData.length; i++) {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/imgconddetails/saveimgconddetails',
            data: tableData[i],
            callback: function (code, message, response) {
              if (response.code == '0') {
                if (i == tableData.length - 1) {
                  _this.$message({ message: '保存成功', type: 'success' });
                }
              } else {
                _this.$message({showClose: true, message: '保存失败', type: 'error'});
              }
            }
          });
        }
      } else {
        return;
      }
    },

    // 新增
    addFn: function () {
      var _this = this;
      _this.$refs.refTable.clearValidateMessage();
      _this.pushRefTableRow();
    },
    // 添加数据 添加一条空白数据
    pushRefTableRow: function () {
      var _this = this;
      let userInfo = this.$xutils.getLoginUserInfo();
      let pkId = this.$xutils.getUUID();
      let row = {pkId: pkId, contNo: _this.contNo, oprType: '01', inputId: userInfo.loginCode, inputBrId: userInfo.orgCode, inputDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), updId: userInfo.loginCode, updBrId: userInfo.orgCode, updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      this.$refs.refTable.tabledata.push(row);
      this.$refs.refTable.setCurrentRow(row);
    },

    // 删除
    deleteFn () {
      let selections = this.$refs.refTable.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      data['oprType'] = '02';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/imgconddetails/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({showClose: true, message: '删除成功', type: 'success'});
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({showClose: true, message: '保存失败', type: 'error'});
          }
        }
      });
    }
  }
};
</script>
