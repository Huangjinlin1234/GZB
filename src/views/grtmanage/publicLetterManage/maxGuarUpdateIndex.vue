<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList" :pageParams="pageParams" v-show="showPage1"></d1-b-billlist>
    </div>
    <div>
        <d1-c-billlist ref="d1_C_BillList" :pageParams="pageParams" v-show="showPage2"></d1-c-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './maxGuarUpdate_d1_A_BillCard.vue';
import d1BBilllist from './maxGuarUpdate_d1_B_BillList.vue';
import d1CBilllist from './maxGuarUpdateGuarntr_d1_B_BillList.vue';
// 修改界面
let param = {};

export default {
  components: {d1ABillcard, d1BBilllist, d1CBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      showPage1: false,
      showPage2: false,
      d1_A_BillCard: null,
      d1_B_BillList: null,
      d1_C_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      param = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      this.d1_C_BillList = this.$refs.d1_C_BillList;
      this.d1_A_BillCard.setBillCardValue(param);
      this.setHidden(param);
      this.d1Query();
      this.getSubSerno();
    },

    // 暂存
    save () {
      let iqpLoanAppSaveDto = this.d1_A_BillCard.getBillCardValue();
      // console.info(iqpLoanAppSaveDto);

      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'post',
        url: this.$backend.cmisBiz + '/api/grtguarcont/update',
        data: JSON.stringify(this.$xutils.toUpperCase(iqpLoanAppSaveDto, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据

            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);


            // exit;// ajax中return不生效，可以用exit
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示


          // exit;// ajax中return不生效，可以用exit
        }
      });
    },

    // 保存
    onSave () {
      let iqpLoanAppSaveDto = this.d1_A_BillCard.getBillCardValue();
      // console.info(iqpLoanAppSaveDto);

      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'post',
        url: this.$backend.cmisBiz + '/api/grtguarcont/update',
        data: JSON.stringify(this.$xutils.toUpperCase(iqpLoanAppSaveDto, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据

            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);


            // exit;// ajax中return不生效，可以用exit
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示


          // exit;// ajax中return不生效，可以用exit
        }
      });
    },

    // 点击引入，进入抵押物引入页面
    imPort () {
      var _this = this;
      var cardData = this.d1_A_BillCard.getBillCardValue();
      cardData['iserno'] = _this.iserno;
      _this.$dialog.open(
        '引入抵押物列表',
        'grtmanage/smallCreditManage/pldListIndex',
        1100,
        650,
        cardData,
        data => {
          this.d1Query();
        }
      );
    },

    // 取消引入
    offImport () {
      let params = {};
      var data = {};
      if (this.showPage1) {
        params = this.d1_B_BillList.getSelectedRowData();
        data['guarNo'] = params.guarNo;
      } else if (this.showPage2) {
        params = this.d1_C_BillList.getSelectedRowData();
        data['guarNo'] = params.guarantyId;
      }
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      var cardData = this.d1_A_BillCard.getBillCardValue();
      data['guarContNo'] = cardData.guarContNo;
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/grtguarcont/deleteGrtGuarContRelLink',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '取消引入成功', 350, 150, () => {
              // 列表刷新
              this.d1Query();
            });
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });
    },

    // 查看查看押品信息
    checkInfo () {
      let params = this.d1_B_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      this.$refs.guarBaseInfoView.guarBaseinfoView(params.guarNo);
    },


    // 引入保证人
    importGuarantee () {
      var cardData = this.d1_A_BillCard.getBillCardValue();
      cardData['iserno'] = this.iserno;
      var _this = this;

      var assureWay = cardData['assureWay'];
      // this.$xutils.showMsgBox('提示', '保证方式：' + assureWay, 350, 150);
      console.log('引入保证人', cardData);

      if (assureWay == '0401') {
        var dataList = this.d1_C_BillList.$refs.refTable.tabledata;
        if (dataList.length > 0) {
          this.$xutils.showMsgBox('提示', '保证方式为保证-单人担保只能引入一个保证人', 350, 150);
          return;
        }
      }
      _this.$dialog.open(
        '引入保证人列表',
        'grtmanage/smallCreditManage/guarContImportIndex',
        1100,
        650,
        cardData,
        data => {
          this.d1Query(cardData.guarWay);
        }
      );
    },

    // 对公:根据额度编号获取分项编号
    getSubSerno () {
      var _this = this;
      if (_this.pageParams.bizLine == '03' && _this.pageParams.isUnderLmt == '1') {
        _this.$request({
          url: _this.$backend.cmisBiz + '/api/lmtreplyaccsubprd/getlmtreplyaccsubdatabyaccsubprdno',
          method: 'post',
          data: _this.pageParams.lmtAccNo
        }).then((response) => {
          if (response.code === '0') {
            _this.iserno = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', response.message, 350, 150);
            return;
          }
        });
      } else {
        _this.iserno = _this.pageParams.serno;
      }
    },

    // 表单查询
    d1Query () {
      var cardData = this.d1_A_BillCard.getBillCardValue();
      if (this.pageParams.guarWay == '30') {
        this.d1_C_BillList.queryDataByCondition({ guarContNo: cardData.guarContNo });
      } else {
        this.d1_B_BillList.queryDataByCondition({ guarContNo: cardData.guarContNo });
      }
    },

    setHidden (data) {
      // // 业务条线 01 小微 02零售 03对公
      // 担保方式 10抵押 20 质押 30保证
      if (data.guarWay == '10') {
        this.showPage1 = true;
        this.showPage2 = false;
      } else if (data.guarWay == '20') {
        this.showPage1 = true;
        this.showPage2 = false;
      } else if (data.guarWay == '30' || data.guarWay == '40') {
        this.showPage1 = false;
        this.showPage2 = true;
      }
    },

    // 返回列表
    OnCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
