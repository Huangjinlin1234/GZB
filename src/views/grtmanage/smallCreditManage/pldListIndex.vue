<template>
  <d1-billlist ref="d1_BillList" :pageParams="pageParams"></d1-billlist>
</template>
<script>
import d1Billlist from './pldList_d1_BillList.vue';
export default {
  components: {d1Billlist},
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
  methods: {
    /**
       *
       引入抵押物列表
       *  @author 刘权
       */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // 是否授信项下为是时，展示授信分项下关联的抵质押品
      var data = this.pageParams;
      if (data.isUnderLmt == 1) {
        // 原url为：this.$backend.cmisBiz + '/api/guarbaseinfo/queryGuarInfoIsUnderLmt/'
        this.d1_BillList.dataUrl = this.$backend.cmisBiz + '/api/guarbaseinfo/queryguarbaseinfodatabyparams';
        this.d1_BillList.baseParams = {condition: {
          serno: data.iserno
        }};
      } else {
        // 是否授信项下为否时，展示所有的的抵质押品
        this.d1_BillList.dataUrl = this.$backend.cmisBiz + '/api/guarbaseinfo/querybymanagerid';
      }
    },

    // 确定引入
    cfirmImport () {
      // 获取所有数据
      var _this = this;
      let params = _this.d1_BillList.getSelectedRowData();
      var data = _this.pageParams;
      data['guarNo'] = params.guarNo;
      // 0 失效,在担保合同保存时,置为1生效
      data['status'] = '0';
      // 显示提示框成功并自动关闭
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '请选择一条数据', 350, 150);
        return;
      }
      var dataList = [];
      let dataReq = {
        guarContNo: data.guarContNo,
        guarNo: data.guarNo,
        oprType: '01'
      };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/grtguarcontrel/selectbymodel',
        data: dataReq,
        callback: function (code, message, response) {
          if (response.code == 0) {
            dataList = response.data;
            if (dataList.length > 0) {
              _this.$message('已选抵质押品已存在，请勿重复引入');
              return;
            } else {
              _this.creteGrtGuarContRel(data);
            }
          }
        }
      });
    },

    creteGrtGuarContRel (data) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: true,
        type: 'post',
        url: _this.$backend.cmisBiz + '/api/grtguarcontrel/creteGrtGuarContRel',
        data: JSON.stringify(_this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '引入成功', 500, 300, () => {
              _this.$dialog.close(_this.dialogId);
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
