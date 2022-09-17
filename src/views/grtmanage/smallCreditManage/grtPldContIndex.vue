<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard" :pageParams="pageParams" :contNoSerno="contNoSerno" @debtGuarClick="debtGuarChange"></d1-a-billcard>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSave" v-show="showAble">保存</yu-button>
      <yu-button type="primary" @click="onCancel" v-show="showClose">返回</yu-button>
    </yu-form-buttons>
    </div>
    <div>
      <d1-b-billlist ref="d1_B_BillList" :pageParams="pageParams" v-show="showPage1" :contNoSerno="contNoSerno"></d1-b-billlist>
    </div>
        <div>
      <d1-c-billlist ref="d1_C_BillList" :pageParams="pageParams" v-show="showPage2" :contNoSerno="contNoSerno"></d1-c-billlist>
    </div>
    <div>
      <d1-d-billlist ref="d1_D_BillList" :pageParams="pageParams" v-show="isDebtGuar" :contNoSerno="contNoSerno"></d1-d-billlist>
    </div>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>

  </div>
</template>
<script>
import d1ABillcard from './grtPldCont_d1_A_BillCard.vue';
import d1BBilllist from './grtPldCont_d1_B_BillList.vue';
import d1CBilllist from './grtGuarCont_d1_B_BillList.vue';
import d1DBilllist from './grtPldCont_d1_D_BillList.vue';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';

// 抵押担保合同
let params = {};
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  components: { d1ABillcard, d1BBilllist, d1CBilllist, guarBaseInfoView, d1DBilllist},
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
      xygData: this.pageParams,
      contNoSerno: '',
      contNo: '',
      isDebtGuar: false // 是否将存量债务纳入担保范围
    };
  },
  mounted () {
    this.d1_A_BillCard = this.$refs.d1_A_BillCard;
    this.d1_B_BillList = this.$refs.d1_B_BillList;
    this.d1_C_BillList = this.$refs.d1_C_BillList;
    this.d1_C_BillList.pageParams = this.pageParams;
    var data = this.pageParams;
    var type = data && data.type;
    this.contNoSerno = data && data.guarContNo;
    this.contNo = data && data.contNo;
    // 担保方式不为抵押时，是否在线抵押字段隐藏
    // if (data.guarMode && data.guarMode != null && data.guarMode != '') {
    //   data.guarWay = data.guarMode;
    // }
    if (data.guarWay == '10') {
      this.d1_A_BillCard.isOnlinePldHidden = false;
    }
    if (type === 'ADD') {
      if (data.guarType == '101') {
      // 是否追加担保0 否
        data['isSuperaddGuar'] = '0';
      }
      yufp.clone(data, this.d1_A_BillCard.formdata);
      this.d1_A_BillCard.execBillCardDefaultValueFormula();

      // 隐藏操作
      this.setHidden(data);
      this.d1Query(data.guarWay);
      this.contNoSerno = this.$xutils.getSEQWithParamFromServer('GRT_GUAR_SERNO');
      this.pageParams.guarContNo = this.contNoSerno;
    } else if (type === 'EDIT') {
      this.afterInit(data.guarContNo);
    } else if (type === 'VIEW') {
      this.d1_A_BillCard.setItemEditable('*', false);
      this.afterInit(data.guarContNo);
      this.showAble = false;
    }
    this.getSubSerno();
    // 2021年7月3日13:55:23 Hubp 增加小微条线担保显示规则
    if (data.belgLine == '01' && this.d1_A_BillCard.formdata.guarContType == 'A') {
      this.d1_A_BillCard.$refs.refForm.setItemHidden('guarTerm', false);
    }
    this.d1_A_BillCard.formdata.guarAmt = data.contAmt;
    this.d1_A_BillCard.formdata.guarTerm = data.contTerm;
    this.d1_A_BillCard.formdata.guarStartDate = data.startDate;
    this.d1_A_BillCard.formdata.guarEndDate = data.endDate;
    this.d1_A_BillCard.formdata.guarContNo = this.contNoSerno;
    // }
  },
  methods: {
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
    d1Query (guarWay) {
      var cardData = this.d1_A_BillCard.formdata;
      if (guarWay == '30') {
        this.d1_C_BillList.baseParams = {condition: {guarContNo: cardData.guarContNo}};
      } else {
        this.d1_B_BillList.baseParams = {condition: {guarContNo: cardData.guarContNo}};
      }
    },

    setHidden (data) {
      // // 业务条线 01 小微 02零售 03对公
      // if (data.bizLine == '01' || data.bizLine == '02') {
      // 担保方式 10抵押 20 质押 30保证 21低风险质押
      if (data.guarWay == '10') {
        this.showPage1 = true;
        this.showPage2 = false;
      } else if (data.guarWay == '20' || data.guarWay == '21') {
        this.showPage1 = true;
        this.showPage2 = false;
      } else if (data.guarWay == '30' || data.guarWay == '40') {
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
          debugger;
          _this.d1_A_BillCard.setBillCardValue(response.data);
          // yufp.clone(response.data, _this.d1_A_BillCard.formdata);
          _this.d1_A_BillCard.formdata.isOnlinePld = _this.pageParams.isOnlinePld;
          if ((!_this.pageParams.guarStartDate || _this.pageParams.guarStartDate == null || _this.pageParams.guarStartDate == '') && this.showAble) {
            _this.$message({ message: '请先选择填写主合同的起始日、到期日！', type: 'warning' });
          }

          if (_this.pageParams.guarStartDate) {
            _this.d1_A_BillCard.formdata.guarStartDate = _this.pageParams.guarStartDate;
          }
          if (_this.pageParams.guarEndDate) {
            _this.d1_A_BillCard.formdata.guarEndDate = _this.pageParams.guarEndDate;
          }
          let guarStartDate = this.d1_A_BillCard.formdata.guarStartDate;
          let guarEndDate = this.d1_A_BillCard.formdata.guarEndDate;

          // 计算月份
          let termMap = {
            startDate: guarStartDate,
            endDate: guarEndDate
          };
          yufp.service.request({
            async: false,
            method: 'POST',
            url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
            data: termMap,
            callback: function (code, message, response) {
              var data = response.data;
              _this.d1_A_BillCard.formdata.guarTerm = data;
            }
          });
          _this.d1_A_BillCard.formdata.igcarSerno = _this.pageParams.igcarSerno;
          _this.setHidden(response.data);
          _this.d1Query(response.data.guarWay);
        } else {
          _this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },


    commonSave (func) {
      var jsoPar = this.d1_A_BillCard.getBillCardValue();

      var grtGuarBizRstRelData = {};
      grtGuarBizRstRelData['serno'] = this.pageParams.serno;
      grtGuarBizRstRelData['contNo'] = this.contNo;// 主业务合同
      grtGuarBizRstRelData['guarContNo'] = jsoPar.guarContNo;
      grtGuarBizRstRelData['guarAmt'] = jsoPar.guarAmt;
      grtGuarBizRstRelData['correRel'] = '01';// 生效
      grtGuarBizRstRelData['oprType'] = '01';
      grtGuarBizRstRelData['inputId'] = jsoPar.inputId;
      grtGuarBizRstRelData['inputBrId'] = jsoPar.inputBrId;
      grtGuarBizRstRelData['inputDate'] = jsoPar.inputDate;
      // 小微的特殊处理 managerId用接口传回来的
      if (this.pageParams && this.pageParams.modelGroupNo === 'CMG000350') {
        grtGuarBizRstRelData['managerId'] = this.pageParams.managerId;
        grtGuarBizRstRelData['managerBrId'] = this.pageParams.managerBrId;
        jsoPar['managerId'] = this.pageParams.managerId;
        jsoPar['managerBrId'] = this.pageParams.managerBrId;
      } else {
        grtGuarBizRstRelData['managerId'] = jsoPar.managerId;
        grtGuarBizRstRelData['managerBrId'] = jsoPar.managerBrId;
      }
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

      // // 担保起始日期和担保到期日期与主合同的一致性校验
      // if (this.d1_A_BillCard.checkValue == false) {
      //   this.$xutils.showMsgBox('提示', this.d1_A_BillCard.checkMsg, 350, 150);
      //   return;
      // }

      // 日期校验
      var guarStartDate = new Date(jsoPar.guarStartDate);
      var guarEndDate = new Date(jsoPar.guarEndDate);
      if (guarStartDate >= guarEndDate) {
        this.$xutils.showMsgBox('提示', '到期日期应大于担保起始日期!', 350, 150);
        return;
      }

      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 150, this.onCancel());
        // 担保变更时使用
        if (this.pageParams.guarChgAdd) {
          this.pageParams.guarChgAdd(jsoPar);
        }
        if (this.pageParams.guarEdit) {
          this.pageParams.guarEdit(jsoPar);
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
    onCancel () {
      this.$dialog.close(this.dialogId);
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
          this.d1Query(cardData.guarWay);
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
              this.d1Query(cardData.guarWay);
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
    debtGuarChange (val) {
      if (val === '1') {
        this.isDebtGuar = true;
      } else {
        this.isDebtGuar = false;
      }
    },
    // 新增未结清的贷款合同
    addCont () {
      this.$dialog.open('', 'grtmanage/smallCreditManage/grtPldCont_d1_BillList', 1600, 800, this.pageParams, data => {
        if (JSON.stringify(data) !== '{}') {
          data.forEach((item) => {
            // this.$refs.d1_D_BillList.$refs.refTable.tabledata.push(item)
            this.$refs.d1_D_BillList.$refs.refTable.remoteData();
          });
        }
      });
    },
    // 删除未结清的贷款合同
    deleteCont () {
      var _this = this;
      const params = _this.$refs.d1_D_BillList.$refs.refTable.selections[0];
      if (params == null) {
        _this.$message({
          message: '请先选择记录',
          type: 'warning'
        });
        return;
      }

      let data = {
        guarContNo: _this.contNoSerno,
        contNo: params.contNo
      };
      _this.$request({
        data: {condition: JSON.stringify(data)},
        method: 'POST',
        url: backend.cmisBiz + '/api/grtstockdebtrel/deletebymodel'
      }).then(({code, message, data}) => {
        if (code == 0) {
          this.$message({message: '删除成功', type: 'success'});
          this.$refs.d1_D_BillList.$refs.refTable.remoteData();
        }
      });
    }
  }
};
</script>
