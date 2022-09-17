<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusLstXwbmd_d1_BillList.vue';
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  watch: {
    '$routh.path': function () {
      this.d1_BillList.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
     * 小微无还本续贷
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },
    // 新增
    insert () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'cusmanage/nameListManage/cusLstXwBmdInsertIndex', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_cusLstXwBmdInsertIndex' + new Date().getTime(), // 必传
        // 页签名称
        title: '新增无还本续贷申请',
        // 传递的业务数据，可选配置
        data: {name: this.$route.name},
        afterTabClose: () => {
          this.d1_BillList.queryDataByCondition();
        }
      });
    },
    // 修改
    modify () {
      var _this = this;
      var selections = _this.d1_BillList.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'cusmanage/nameListManage/cusLstXwBmdModifyPage', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_cusLstXwBmdInsertIndex', // 必传
        // 页签名称
        title: '新增无还本续贷申请',
        // 传递的业务数据，可选配置
        data: {name: this.$route.name, serno: selections[0].serno, billNo: selections[0].billNo},
        afterTabClose: () => {
          this.d1_BillList.queryDataByCondition();
        }
      });
    },
    // 删除
    delete () {
      var _this = this;
      var selections = _this.d1_BillList.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 校验是否办理状态为待办的数据才可删除
      if (selections[0].applyStatus != '5') {
        _this.$message({
          message: '只有办理状态为待办的数据才可删除！',
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
              // url: backend.cmisCus + '/api/cuslstmclwhbxd/delete/' + selections[0].billNo,
              url: backend.cmisBiz + '/api/cuslstmclwhbxd/delete',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.d1_BillList.$refs.refTable.remoteData();
                  _this.$message('删除成功');
                } else {
                  _this.$message({message: message, type: 'warning'});
                }
              }
            });
          }
        }
      });
    },
    // 预授信
    credit () {
      var _this = this;
      var selections = _this.d1_BillList.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selections[0].status != 1) {
        _this.$message({
          message: '该笔记录已失效，不可操作',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否进行预授信操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/cuslstmclwhbxd/credit/',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({message: '预授信请求已发送', type: 'info'});
                } else {
                  _this.$message({message: message, type: 'warning'});
                }
              }
            });
          }
        }
      });
      _this.d1_BillList.queryDataByCondition();
    },
    // 启用
    start () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '1') {
          this.$xutils.showMsgBox('提示', '该客户已被启用!');
          return;
        } else {
          selectedRowData.status = '1';
          this.sendStartState(selectedRowData);
        }
      }
    },

    // 停用
    stop () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '0') {
          this.$xutils.showMsgBox('提示', '该客户已被停用!');
          return;
        } else {
          selectedRowData.status = '0';
          this.sendStartState(selectedRowData);
        }
      }
    },

    sendStartState (corp) {
      const rsPars = {};
      this.$xutils.request({
        type: 'post',
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/cuslstmclwhbxd/update',
        data: JSON.stringify(this.$xutils.toUpperCase(corp, true)),
        success: (response, status, xhr) => {
          this.$xutils.showMsgBox('启用/停用 提示', '操作成功');
          this.d1_BillList.queryDataByCondition();
          if (response.data != null) {
            rsPars['data'] = response.data;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.responseJSON.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      return rsPars;
    }
  }
};
</script>
