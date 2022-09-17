<template>
  <assign-list ref="assignList"></assign-list>
</template>
<script>
import assignList from './brightsassignList.vue';
export default {
  components: {assignList},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      assignList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       业务权分配申请信息
       */
    afterInit () {
      this.assignList = this.$refs.assignList;
    },
    // 分配发起
    onAssign () {
      this.$dialog.open('业务权分配', 'cusmanage/biz_rights_assign/brightsassignEditIndex', 1000, 600, {operate: 'add'});
    },
    // 修改按钮
    update () {
      const jsoPar = this.assignList.$refs.refTable.selections[0];
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      if (jsoPar.divisState == '02') {
        this.$xutils.showMsgBox('提示', '状态已生效！不可修改');
        return;
      }
      jsoPar.operate = 'edit';
      this.$dialog.open(
        '业务权分配修改',
        'cusmanage/biz_rights_assign/brightsassignEditIndex',
        1000,
        600,
        jsoPar
      );
    },

    // 查看按钮
    view () {
      const jsoPar = this.assignList.$refs.refTable.selections[0];
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      jsoPar.operate = 'details';
      this.$dialog.open(
        '业务权分配修改',
        'cusmanage/biz_rights_assign/brightsassignEditIndex',
        1000,
        600,
        jsoPar
      );
    },

    // 删除按钮
    deleteBtn () {
      const _this = this;
      const jsoPar = _this.assignList.$refs.refTable.selections[0];
      if (jsoPar == null) {
        _this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      if (jsoPar.divisState == '02') {
        _this.$xutils.showMsgBox('提示', '状态已生效！不可删除');
        return;
      }
      _this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          _this.sendState(jsoPar.assignAppSerno);
        }
      });
    },
    // 交互数据
    sendState (data) {
      const _this = this;
      _this.$xutils.request({
        // 同步请求
        async: true,
        url: _this.$backend.cmisCus + '/api/cusbizassignapp/delete/' + data,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.assignList.$refs.refTable.remoteData();
            _this.$xutils.showMsgBox('提示', '信息删除成功'); // 弹出提示
          } else {
            _this.$xutils.showMsgBox('提示', '信息删除失败');
          }
        },
        error: (result, status, errorThrown) => {
          _this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.message); // 弹出提示
        }
      });
    }
  }
};
</script>
