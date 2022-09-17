<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="空白凭证登记簿">
  <d1-billlist ref="d1_BillList"></d1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="变更记录">
  <d2-billlist ref="d2_BillList"></d2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d1Billlist from './blankCertiInfoList_d1_BillList.vue';
import d2Billlist from './blankCertiModifyAppList_d2_BillList.vue';

export default {
  components: { d1Billlist, d2Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      // eslint-disable-next-line camelcase
      d1_BillList: null,
      // eslint-disable-next-line camelcase
      d2_BillList: null
    };
  },
  mounted () {
    // eslint-disable-next-line new-cap
    this.AfterInit();
  },
  methods: {
    /**
     * 权证入库列表页面
     * 日期：2021-04-14
     */
    AfterInit () {
      // eslint-disable-next-line camelcase
      this.d1_BillList = this.$refs.d1_BillList;
      // eslint-disable-next-line camelcase
      this.d2_BillList = this.$refs.d2_BillList;
    },

    doAdd () {
      var opJso = {};
      opJso['type'] = 'ADD';
      this.$dialog.open('空白凭证登记', 'guarmanage/blankCertiManage/blankCertiInfoAppAddIndex.vue', 800, 300, opJso, () => {
        this.d1_BillList.doAutoQuery();
      });
    },

    doUpdate () {
      let jsoPar = this.d1_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (jsoPar.certiStatus != '01') {
        this.$xutils.showMsgBox('提示', '只有凭证状态为【未用】状态才允许修改操作！', 350, 150);
        return;
      }

      const checkFlag = this.checkOnTheWaySerno(jsoPar.certiNo);

      if (!checkFlag) {
       return;
      }

      jsoPar['type'] = 'EDIT';
      jsoPar['appType'] = '01';
      // 获取变更信息
      const modifiedAppInfo = this.getModifiedAppInfo(jsoPar.certiNo);
      if (modifiedAppInfo != null) {        
        jsoPar['modifiedCertiNo'] = modifiedAppInfo.modifiedCertiNo;
        jsoPar['optReason'] = modifiedAppInfo.optReason;
      }
      this.$dialog.open('空白凭证修改', 'guarmanage/blankCertiManage/blankCertiInfoAppAddIndex.vue', -1, -1, jsoPar);
    },
    // 作废
    doInvalid () {
      let jsoPar = this.d1_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (jsoPar.certiStatus != '01') {
        this.$xutils.showMsgBox('提示', '只有凭证状态为【未用】状态才允许修改操作！', 350, 150);
        return;
      }

      const checkFlag = this.checkOnTheWaySerno(jsoPar.certiNo);

      if (!checkFlag) {
        return;
      }

      jsoPar['type'] = 'EDIT';
      jsoPar['appType'] = '02';
      // 获取变更信息
      const modifiedAppInfo = this.getModifiedAppInfo(jsoPar.certiNo);
      if (modifiedAppInfo != null) {        
        jsoPar['optReason'] = modifiedAppInfo.optReason;
      }
      this.$dialog.open('空白凭证作废', 'guarmanage/blankCertiManage/blankCertiInfoAppAddIndex.vue', -1, -1, jsoPar);
    },

    // 查看
    doView () {
      let jsoPar = this.d1_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar['type'] = 'VIEW';
      this.$dialog.open('空白凭证查看', 'guarmanage/blankCertiManage/blankCertiInfoAppAddIndex.vue', -1, -1, jsoPar);
    },

    // 修改空白凭证变更申请
    doUpdateModifyApp () {
      let jsoPar = this.d2_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992' && jsoPar.approveStatus != '') {
        this.$message({
          message: '只有"待发起或打回"状态的记录才能进行删除操作',
          type: 'warning'
        });
        return;
      } 
      jsoPar['type'] = 'EDIT';     
      this.$dialog.open('', 'guarmanage/blankCertiManage/blankCertiModifyAppDetailIndex.vue', -1, -1, jsoPar);
    },

    // 删除空白凭证变更申请
    doDeleteModifyApp () {
      let jsoPar = this.d2_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var approveStatus = jsoPar.approveStatus;
      var certiNo = jsoPar.certiNo;
      var pkId = jsoPar.pkId;
      var _this = this;
      if (approveStatus != '000' && approveStatus != '992' && approveStatus != '') {
        _this.$message({
          message: '只有"待发起或打回"状态的记录才能进行删除操作',
          type: 'warning'
        });
        return;
      }
      if (approveStatus === '000') {
        // 进行逻辑删除
        _this.$confirm('确定要删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(function () {
          yufp.service.request({
            method: 'POST',
            url: `${backend.cmisBiz}/api/blankcertimodifyapp/delete?pkId=` + jsoPar.pkId,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // todo 更新 凭证登记簿凭证状态为未使用 01
                _this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              } else {
                _this.$message({
                  message: '删除失败',
                  type: 'error'
                });
              }
            }
          });
        });
      } else if (approveStatus === '992') { // 打回
        this.$request({
          url: _this.$backend.cmisBiz + '/api/blankcertimodifyapp/deleteonlogic',
          method: 'post',
          data: {pkId: pkId, certiNo: certiNo, approveStatus: '996'}
        }).then((response) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '操作成功！', 350, 150);
            this.d2_BillList.doAutoQuery();
          }
        });
      }
    },

    //检查该凭证编号是否有在途的申请
    checkOnTheWaySerno (certiNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/blankcertimodifyapp/checkOnTheWaySernoByCertino/' +
          certiNo,

        success: (response, status, xhr) => {
          if (response.data) {
            this.$xutils.showMsgBox('提示', '该凭证编号有在途的变更申请，流水号为【' + response.data + '】!', 350, 150);   
          } else {
            returnData = true;
          }
        }
      });

      return returnData;
    },

    // 查看空白凭证变更申请
    doViewModifyApp () {
      let jsoPar = this.d2_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar['type'] = 'VIEW';
      this.$dialog.open('', 'guarmanage/blankCertiManage/blankCertiModifyAppDetailIndex.vue', -1, -1, jsoPar);
    },
    getModifiedAppInfo (certiNo) {
      let resultData = {};
      this.$request({
        url: this.$backend.cmisBiz + '/api/blankcertimodifyapp/querylist',
        method: 'POST',
        async: false,
        data: {
          condition: JSON.stringify({
            certiNo: certiNo
          })
        }
      }).then((response) => {
        if (response.code == 0) {
          if (response.data != null) {
            resultData = response.data.data[0];            
          }                   
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
      return resultData;
    }
  }
};
</script>
