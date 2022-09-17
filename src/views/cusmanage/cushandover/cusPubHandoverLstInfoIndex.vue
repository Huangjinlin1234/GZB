<template>
  <div>
    <d1-billcard ref="d1_BillCard" :handoverMode="handoverMode" :pageParams="pageParams"></d1-billcard>
  </div>
</template>
<script>
import d1Billcard from './cusPubHandoverLstInfo_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      handoverMode: 1, //移交方式 默认客户与业务
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       * 客户移交明细页面
       *
       */
    afterInit () {
      const serno = this.pageParams.serno;
      this.handoverMode = this.pageParams.handoverMode;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setItemValue('handoverMode', this.handoverMode);
      // 设置主键操作
      this.d1_BillCard.setItemValue('serno', serno);
      // 默认执行代码
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // d1_B 新增进去后返回操作 进行保存操作
    doSave () {
      let _this = this;
      // 数据校验，校验改客户是否存在在途的客户移交
      const validate = _this.d1_BillCard.validateBillCardValue();
      if (!validate) {
        return false;
      }
      const param = _this.d1_BillCard.getBillCardValue();
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisCus + '/api/cuspubhandoverlst/selecthandvoerinwayapp',
        data: JSON.stringify(param, true),
        success: (response, status, xhr) => {
          if (response.data == 0) {
            //客户移交 - 仅业务
            if(param.handoverMode == '2' || param.prdId == '' || param.prdId == null){
              // 下一步的时候先判断是否有无在途任务
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.workflowService + '/api/custom/bench/querycusflow?cusId=' + param.cusId,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    if (response.data.length == 0) {
                      _this.$dialog.close(_this.dialogId, param);
                    } else {
                      _this.$xutils.showMsgBox('提示', '该客户有在途任务，不可移交！');
                    }
                  } else {
                    _this.$xutils.showMsgBox('提示', response.message);
                  }
                }
              });
            }else{
              //判断核心产品编号是否符合业务移交条件
              yufp.service.request({
                method: 'GET',
                url: _this.$backend.cmisCfg + '/api/cfgprdbasicinfo/' + param.prdId,
                callback: function (code, message, response) {
                  if (response.code == '0'){
                    if(response.data.corePrdId == '120001'){
                      _this.$xutils.showMsgBox('提示', '个人经营性贷款无法进行移交!');
                    }else{
                      // 下一步的时候先判断是否有无在途任务
                      yufp.service.request({
                        method: 'POST',
                        url: _this.$backend.workflowService + '/api/custom/bench/querycusflow?cusId=' + param.cusId,
                        callback: function (code, message, response) {
                          if (response.code == '0') {
                            if (response.data.length == 0) {
                              _this.$dialog.close(_this.dialogId, param);
                            } else {
                              _this.$xutils.showMsgBox('提示', '该客户有在途任务，不可移交！');
                            }
                          } else {
                            _this.$xutils.showMsgBox('提示', response.message);
                          }
                        }
                      });
                    }
                  }else{
                    _this.$xutils.showMsgBox('提示', response.message);
                  }
                }
              });
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：该客户已经存在在途移交，不允许重复发起！', 350, 200);
          }
        },
        error: (result, b) => {
          // this.$xutils.showMsgBox('错误代码：' + response.data.rtnCode + ',错误信息：' + data.rtnMsg, 350, 200); // 弹出提示
        }
      }, this);
    },

    // 返回网点列表  d1_B 新增进去后返回操作
    esc () {
      // 初始化列表页面
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
