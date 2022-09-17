<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard" :pageParams="pageParams" :contNoSerno="contNoSerno"></d1-a-billcard>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList" :pageParams="pageParams" :contNoSerno="contNoSerno"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './maxGuarUpdateGuarntr_d1_A_BillCard.vue';
import d1BBilllist from './maxGuarUpdateGuarntr_d1_B_BillList.vue';
// 担保合同信息(保证人)

let params = {};

export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      contNoSerno: ''
    };
  },

  created () {
      var data = this.pageParams;
      var type = data && data.type;
      this.contNoSerno = data && data.guarContNo;

      if (type === 'ADD') {
        this.contNoSerno = this.$xutils.getSEQWithParamFromServer('GRT_GUAR_SERNO');
        this.pageParams.guarContNo = this.contNoSerno;
      }

      this.d1_A_BillCard.formdata.guarContNo = this.contNoSerno;
  },

  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      params = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      // 赋值获取的参数
      this.d1_A_BillCard.setBillCardValue(params);

      // 自动添加流水号
      this.d1_A_BillCard.execBillCardDefaultValueFormula();
      this.d1Query();
      this.getSubSerno();
    },

    // 暂存
    save () {
      let iqpLoanAppSaveDto = this.d1_A_BillCard.getBillCardValue();
      // console.info(iqpLoanAppSaveDto);
      let dto = {
        serno: iqpLoanAppSaveDto.serno,
        contNo: iqpLoanAppSaveDto.contNo,
        grtGuarCont: iqpLoanAppSaveDto
      };
      // JSON.stringify(this.$xutils.toUpperCase(iqpLoanAppSaveDto, true))
      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'post',
        url: this.$backend.cmisBiz + '/api/grtguarcont/insertPublic',
        data: dto,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              console.log('insertPublic===>', JSON.stringify(response.data));
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

      // js校验必输
      let saveFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      let dto = {
        serno: iqpLoanAppSaveDto.serno,
        contNo: iqpLoanAppSaveDto.contNo,
        grtGuarCont: iqpLoanAppSaveDto
      };

      // console.info(iqpLoanAppSaveDto);

      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'post',
        url: this.$backend.cmisBiz + '/api/grtguarcont/insertPublic',
        data: dto,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据

            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              // window.parent.d1_A_BillCard.queryDataByCondition();
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              console.log('insertPublic===>', JSON.stringify(response.data));
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

    // 取消引入
    offImport () {
      let params = {};
      var data = {};
      params = this.d1_B_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      data['guarNo'] = params.guarantyId;
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

    // 引入保证人
    importGuarantee () {
      var cardData = this.d1_A_BillCard.getBillCardValue();
      cardData['iserno'] = this.iserno;
      var _this = this;

      var assureWay = cardData['assureWay'];
      // this.$xutils.showMsgBox('提示', '保证方式：' + assureWay, 350, 150);
      console.log('引入保证人', cardData);

      if (assureWay == '0401') {
        var dataList = this.d1_B_BillList.$refs.refTable.tabledata;
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
          this.d1Query();
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
      this.d1_B_BillList.queryDataByCondition({ guarContNo: cardData.guarContNo });
    },

    // 返回列表
    OnCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
