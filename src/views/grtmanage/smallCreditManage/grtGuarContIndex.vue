<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSave" v-show="showAble">保存</yu-button>
      <yu-button type="primary" @click="OnCancel" v-show="showClose">返回</yu-button>
    </yu-form-buttons>
    </div>
    <div>
      <d1-b-billlist ref="d1_B_BillList" :pageParams="pageParams"  v-show="showPage1"></d1-b-billlist>
    </div>
        <div>
      <d1-c-billlist ref="d1_C_BillList"  v-show="showPage2"  ></d1-c-billlist>
    </div>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>

  </div>
</template>
<script>
import d1ABillcard from './grtPldCont_d1_A_BillCard.vue';
import d1BBilllist from './grtPldCont_d1_B_BillList.vue';
import d1CBilllist from './grtGuarCont_d1_B_BillList.vue';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';

// 抵押担保合同
let params = {};

export default {
  components: { d1ABillcard, d1BBilllist, d1CBilllist, guarBaseInfoView},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      d1_C_BillList: null,
      showAble: true,
      showClose: true,
      showPage1: false,
      showPage2: false,
      iserno: '',
      xygData: this.pageParams
    };
  },
  mounted () {
    this.d1_A_BillCard = this.$refs.d1_A_BillCard;
    this.d1_B_BillList = this.$refs.d1_B_BillList;
    this.d1_C_BillList = this.$refs.d1_C_BillList;
    this.d1_C_BillList.pageParams = this.pageParams;
    var data = this.pageParams;
    var type = data && data.type;
    if (type === 'ADD') {
      if (data.guarType == '101') {
      // 是否追加担保0 否
        data['isSuperaddGuar'] = '0';
      }
      yufp.clone(data, this.d1_A_BillCard.formdata);
      this.d1_A_BillCard.execBillCardDefaultValueFormula();
      // 隐藏操作
      this.setHidden(data);
      this.d1Query();
    } else if (type === 'EDIT') {
      this.afterInit(data.guarContNo);
    } else if (type === 'VIEW') {
      this.afterInit(data.guarContNo);
      this.showAble = false;
    }
    this.getSubSerno();
  },
  methods: {
    // 对公:根据额度编号获取分项编号
    getSubSerno () {
      var _this = this;
      if (_this.pageParams.bizLine == '03' && _this.pageParams.isUnderLmt == '1') {
        _this.$request({
          url: _this.$backend.cmisBiz + '/api/lmtreplyaccsubprd/getLmtReplyAccSubPrdByAccSubNo',
          method: 'post',
          data: _this.pageParams.lmtAccNo
        }).then((response) => {
          if (response.code === '0') {
            _this.iserno = response.data && response.data.subSerno;
          } else {
            _this.$xutils.showMsgBox('提示', response.message, 350, 150);
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
      // if (data.bizLine == '01' || data.bizLine == '02') {
      // 担保方式 10抵押 20 质押 30保证
      if (data.guarWay == '10') {
        this.showPage1 = true;
        this.showPage2 = false;
      } else if (data.guarWay == '20') {
        this.showPage1 = true;
        this.showPage2 = false;
      } else if (data.guarWay == '30') {
        this.showPage1 = false;
        this.showPage2 = true;
      }
      // } else if (data.bizLine == '03') {

      // }
    },

    afterInit (guarContNo) {
      var _this = this;
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/grtguarcont/selectByGuarContNo',
        method: 'post',
        data: guarContNo
      }).then((response) => {
        if (response.code === '0') {
          yufp.clone(response.data, _this.d1_A_BillCard.formdata);
          _this.setHidden(response.data);
          _this.d1Query();
        } else {
          _this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },


    commonSave (func) {
      var jsoPar = this.d1_A_BillCard.getBillCardValue();

      var grtGuarBizRstRelData = {};
      grtGuarBizRstRelData['serno'] = this.pageParams.serno;
      grtGuarBizRstRelData['contNo'] = jsoPar.contNo;
      grtGuarBizRstRelData['guarContNo'] = jsoPar.guarContNo;
      grtGuarBizRstRelData['guarAmt'] = jsoPar.guarAmt;
      grtGuarBizRstRelData['correRel'] = '01';// 生效
      grtGuarBizRstRelData['oprType'] = '01';
      grtGuarBizRstRelData['inputId'] = jsoPar.inputId;
      grtGuarBizRstRelData['inputBrId'] = jsoPar.inputBrId;
      grtGuarBizRstRelData['inputDate'] = jsoPar.inputDate;
      grtGuarBizRstRelData['managerId'] = jsoPar.managerId;
      grtGuarBizRstRelData['managerBrId'] = jsoPar.managerBrId;
      grtGuarBizRstRelData['updId'] = jsoPar.updId;
      grtGuarBizRstRelData['updBrId'] = jsoPar.updBrId;
      grtGuarBizRstRelData['updDate'] = jsoPar.updDate;
      jsoPar['grtGuarBizRstRel'] = grtGuarBizRstRelData;

      this.$request({
        url: this.$backend.cmisBiz + '/api/grtguarcont/tempSave',
        method: 'post',
        // data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true))
        data: jsoPar
      }).then((response) => {
        if (response.code === '0') {
          func && func();
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },
    // 保存
    onSave () {
      var jsoPar = this.d1_A_BillCard.getBillCardValue();
      // 判断必输项
      var validate = false;
      this.$refs.d1_A_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 日期校验
      var guarStartDate = new Date(jsoPar.guarStartDate);
      var guarEndDate = new Date(jsoPar.guarEndDate);
      if (guarStartDate >= guarEndDate) {
        this.$xutils.showMsgBox('提示', '到期日期应大于担保起始日期!', 350, 150);
        return;
      }

      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 150);
        // 担保变更时使用
        if (this.pageParams.guarChgAdd) {
          this.pageParams.guarChgAdd(jsoPar);
        }
      });
    },

    // 暂存
    // onTempSave () {
    //   var jsoPar = this.d1_A_BillCard.getBillCardValue();
    //   this.commonSave(() => {
    //     this.$xutils.showMsgBox('提示', '暂存成功', 350, 150);
    //     // 担保变更时使用
    //     if (this.pageParams.guarChgAdd) {
    //       this.pageParams.guarChgAdd(jsoPar);
    //     }
    //   });
    // },

    // 返回
    OnCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 点击引入，进入抵押物引入页面
    imPort () {
      var cardData = this.d1_A_BillCard.getBillCardValue();
      cardData['iserno'] = this.iserno;
      var _this = this;

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
      if (this.showPage1) {
        params = this.d1_B_BillList.getSelectedRowData();
      } else if (this.showPage2) {
        params = this.d1_C_BillList.getSelectedRowData();
      }
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      var cardData = this.d1_A_BillCard.getBillCardValue();
      var data = {};
      data['guarContNo'] = cardData.guarContNo;
      data['guarNo'] = params.guarNo;
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
    }

  }
};
</script>
