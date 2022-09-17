<template>
    <div class="processing">
  <yu-xform ref="refForm" label-width="120px" v-model="formdata">
    <yu-xform-group :column="4">
      <yu-xform-item ctype="select" name="serviceName" label="请选择微服务" :options="options" @change="changeService"></yu-xform-item>
      <yu-xform-item name="retryScene" label="重试场景"></yu-xform-item>
      <yu-xform-item ctype="select" name="retryResult" label="重试结果" :options="resultOptions"></yu-xform-item>
      <div slot="custom" class="btn-group" style="margin-top:7px;">
        <yu-button-group>
          <yu-button type="primary" icon="search" @click="getData">查询</yu-button>
          <yu-button type="primary" icon="search" @click="resetForm">重置</yu-button>
        </yu-button-group>
      </div>
    </yu-xform-group>
  </yu-xform>
  <yu-xtable ref="refTable" :data="dataList" @expand="loadHistoryData">
    <yu-xtable-column type="expand">
      <template slot-scope="scope">
        <yu-xtable :data="historyDatas[scope.row.retryId]" :pageable="false" style="width: 100%">
          <yu-xtable-column prop="retryTime" label="重试时间">
          </yu-xtable-column>
          <yu-xtable-column prop="retryResult" label="重试结果">
              <template slot-scope="scope2">
                  <el-tag v-if="scope2.row.retryResult=='S'" type="success">成功</el-tag>
                  <el-tag v-else type="danger" >失败</el-tag>
                </template>
          </yu-xtable-column>
          <yu-xtable-column prop="retryMsg" label="错误信息">
          </yu-xtable-column>
        </yu-xtable>
      </template>
    </yu-xtable-column>
    <yu-xtable-column label="重试场景" prop="retryScene"></yu-xtable-column>
    <yu-xtable-column label="重试处理器" prop="methodHandler"></yu-xtable-column>
    <yu-xtable-column label="上次重试结果" prop="retryResult">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.retryResult=='S'" type="success">成功</el-tag>
        <el-tag v-else type="danger" >失败</el-tag>
      </template>
    </yu-xtable-column>
    <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
    <yu-xtable-column label="操作">
      <template slot-scope="scope">
        <yu-button size="small" @click="handleTry(scope.row.retryId)">重试</yu-button>
        <yu-button size="small" type="danger" @click="handleDelete(scope.row.retryId)">删除</yu-button>
      </template>
    </yu-xtable-column>
  </yu-xtable>
</div>
</template>
<script>
yufp.lookup.reg('MICRO_SERVICE_LIST');
export default {
    name:'processing',
   data: function () {
        return {
          baseUrl: '/api/errorretry/',
          deleteUrl: '/api/errorretrylog/batchdelete/',
          retryUrl: '/api/errorretry/retry/',
          serviceName: '',
          formdata: {},
          options: [],
          resultOptions: [{
            key: 'F',
            value: '失败'
          },
          {
            key: 'S',
            value: '成功'
          }],
          dataList: [],
          historyDatas: {}
        };
      },
      methods: {
        resetForm: function () {
          this.formdata.retryScene = null;
          this.formdata.retryResult = null;
        },
        getData: function () {
          var _this = this;
          if (_this.serviceName == undefined || _this.serviceName == '') {
            return;
          }
          this.historyDatas = {};
          var condition = {};
          if (this.formdata.retryScene) {
            condition.retryScene = this.formdata.retryScene;
          }
          if (this.formdata.retryResult) {
            condition.retryResult = this.formdata.retryResult;
          }
          yufp.service.request({
            method: 'GET',
            url: _this.serviceName + _this.baseUrl + '?page=' + this.$refs.refTable.page + '&size=' + this.$refs.refTable.size + '&condition=' + JSON.stringify(condition),
            callback: function (code, message, response) {
              yufp.util.responseStatus(code, message, response, function (res) {
                _this.dataList.splice(0, _this.dataList.length);
                for (var i = 0; i < response.data.length; i++) {
                  _this.dataList.splice(_this.dataList.length, 0, response.data[i]);
                }
              });
            }
          });
        },
        loadHistoryData: function (row, expanded) {
          if (this.historyDatas[row.retryId] == undefined) {
            this.doLoadHistoryData(row.retryId);
          }
        },
        doLoadHistoryData: function (retryId) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            async: false,
            url: _this.serviceName + '/api/errorretry/log/' + retryId,
            callback: function (code, message, response) {
              yufp.util.responseStatus(code, message, response, function (res) {
                if (_this.historyDatas[retryId]) {
                  _this.historyDatas[retryId].splice(0, _this.historyDatas[retryId].length);
                  for (var i = 0; i < response.data.length; i++) {
                    _this.historyDatas[retryId].splice(_this.historyDatas[retryId].length, 0, response.data[i]);
                  }
                } else {
                  _this.historyDatas[retryId] = response.data;
                }
              });
            }
          });
        },
        changeService: function (val) {
          this.serviceName = '/' + val;
          this.dataUrl = this.serviceName + this.baseUrl;
          this.getData();
        },
        handleTry: function (id) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: _this.serviceName + _this.retryUrl + id,
            data: {},
            callback: function (code, message, response) {
              yufp.util.responseStatus(code, message, response, function (res) {
                _this.getData();
                if (response.data) {
                  _this.$message({message: '重试成功', type: 'success'});
                } else {
                  _this.$message({message: '重试失败', type: 'success'});
                }
              });
            }
          });
        },
        handleDelete: function (id) { // todo 确认是否批量删除
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: _this.serviceName + _this.deleteUrl + id,
            data: {},
            callback: function (code, message, response) {
              yufp.util.responseStatus(code, message, response, function (res) {
                _this.getData();
                _this.$message({message: '删除成功', type: 'success'});
              });
            }
          });
        }
      },
      created: function () {
        var _this = this;
        yufp.lookup.bind('MICRO_SERVICE_LIST', function (lookup) {
          _this.options = lookup;
        });
      }
}
</script>
<style>
.processing {
  padding: 5px;
}
</style>
