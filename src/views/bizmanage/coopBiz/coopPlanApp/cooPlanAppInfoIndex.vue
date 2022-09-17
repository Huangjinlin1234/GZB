<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard" :operate="operate" v-show="partnerType == 1 || partnerType == 2|| partnerType == 5|| partnerType == 3 || partnerType == 4 || partnerType == 8||partnerType == 15"></d1-a-billcard>
    <d1-billcard ref="d1_BillCard" :operate="operate" v-show="!(partnerType == 1 || partnerType == 5|| partnerType == 2|| partnerType == 3 || partnerType == 4 || partnerType == 8|| partnerType == 15)"></d1-billcard>
    <d1-b-a-billlist ref="d1_B_A_BillList" :operate="operate" v-show="partnerType == 1 || partnerType == 2|| partnerType == 5|| partnerType == 3 || partnerType == 4 || partnerType == 8|| partnerType == 15"></d1-b-a-billlist>
    <d1-b-b-a-billcard ref="d1_B_B_A_BillCard" :page-param="param" :operate="operate"  v-show="partnerType == 1 || partnerType == 2|| partnerType == 5 || partnerType == 3 || partnerType == 4 || partnerType == 8|| partnerType == 15"></d1-b-b-a-billcard>
    <d1-b-b-b-a-billlist ref="d1_B_B_B_A_BillList" :operate="operate" v-show="partnerType == 2" ></d1-b-b-b-a-billlist>
    <d1-b-b-b-a-billcard ref="d1_B_B_B_A_BillCard" :operate="operate" v-show="partnerType == 1 || partnerType == 2|| partnerType == 5 || partnerType == 3 || partnerType == 4 || partnerType == 8|| partnerType == 15"></d1-b-b-b-a-billcard>
  </div>
</template>
<script>
import d1Billcard from './cooPlanAppInfo_d1_BillCard.vue';
import d1ABillcard from './cooPlanAppInfo_d1_A_BillCard.vue';
import d1BABilllist from './cooPlanAppInfo_d1_B_A_BillList.vue';
import d1BBABillcard from './cooPlanAppInfo_d1_B_B_A_BillCard.vue';
import d1BBBABilllist from './cooPlanAppInfo_d1_B_B_B_A_BillList.vue';
import d1BBBABillcard from './cooPlanAppInfo_d1_B_B_B_A_BillCard.vue';
import { request } from 'xy-utils';
/**
 * 合作方案申请详情
 * author yumeng@yusys.com.cn
 * date 2021-04-15
 **/
export default {
  components: {d1Billcard, d1ABillcard, d1BBABillcard, d1BBBABillcard, d1BABilllist, d1BBBABilllist},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object,
    pageData: Object
  },
  data () {
    return {
      d1_BillCard: null,
      d1_A_BillCard: null,
      d1_B_A_BillList: null,
      d1_B_B_A_BillCard: null,
      d1_B_B_B_A_BillList: null,
      d1_B_B_B_A_BillCard: null,
      param: {},
      partnerType: '',
      operate: '',
      apprStatus: '',
      isWholeBankSuit: ''
    };
  },
  mounted () {
    // 如果pageData存在值则说明数据是从工作流中传递的数据，这直接使用工作流中数据
    if (this.pageData) {
      this.param = this.pageData;
      this.operate = 'details';
    } else {
      this.param = this.$route.meta.params;
      this.operate = this.param.op;
    }
    this.partnerType = this.param.partnerType;
    this.apprStatus = this.param.apprStatus;
    this.afterInit();
    if (this.param != null && this.param.bailPerc > 0) {
      this.$refs.d1_B_B_B_A_BillCard.isBailRequired = true;
      if (this.param.partnerType != '1') {
        this.$refs.d1_B_B_B_A_BillCard.bailAccLowAmtRequired = true;
        this.$refs.d1_B_B_B_A_BillCard.sigLowDepositAmtRequired = true;
      }
    } else{
      this.$refs.d1_B_B_B_A_BillCard.isBailRequired = false;
    }
    if (this.param.partnerType == '1') {
      this.$refs.d1_B_B_B_A_BillCard.bailAccLowAmtHidden = true;
      this.$refs.d1_B_B_B_A_BillCard.sigLowDepositAmtHidden = true;
    } else {
      this.$refs.d1_B_B_B_A_BillCard.bailAccLowAmtHidden = false;
      this.$refs.d1_B_B_B_A_BillCard.sigLowDepositAmtHidden = false;
    }
  },
  methods: {
    /**
      * 页面数据初始化
      */
    afterInit () {
      if (this.param.partnerType == 2) {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        this.d1_B_B_A_BillCard = this.$refs.d1_B_B_A_BillCard;
        this.d1_B_B_B_A_BillCard = this.$refs.d1_B_B_B_A_BillCard;
        this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
        this.d1_B_B_B_A_BillList = this.$refs.d1_B_B_B_A_BillList;
        // 查询合作方案关联机构
        this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        // 查询合作方案关联特殊限额
        this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        // 将向导页面或者列表里面的数据赋值到报单中，根据需求coop_plan_app表被分成了三个表单
        this.d1_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_B_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_A_BillCard.setBillCardItemVisible('isWhiteListCtrl', false);
        const bailAccNo = this.param.bailAccNo;
        if (bailAccNo) {
          this.d1_B_B_B_A_BillCard.initBailAccNo();
        }
      } else if (this.param.partnerType == 1 || this.param.partnerType == 5 || this.param.partnerType == 3 || this.param.partnerType == 4 || this.param.partnerType == 8 || this.param.partnerType == 15) {
        // 开启创建组件任务,此种方式会合并请求一次性发送请求
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
        this.d1_B_B_A_BillCard = this.$refs.d1_B_B_A_BillCard;
        this.d1_B_B_B_A_BillCard = this.$refs.d1_B_B_B_A_BillCard;
        // 查询合作方案关联机构
        this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        // 将向导页面或者列表里面的数据赋值到报单中，根据需求coop_plan_app表被分成了三个表单
        this.d1_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_B_A_BillCard.setBillCardValue(this.param);
        const bailAccNo = this.param.bailAccNo;
        if (bailAccNo) {
          this.d1_B_B_B_A_BillCard.initBailAccNo();
        }
        if (this.param.partnerType == 4 || this.param.partnerType == 8) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible('commonGrtLmtAmt;outguarMultiple', false);
          this.d1_B_B_A_BillCard.setBillCardItemVisible('isWhiteListCtrl', true);
        }
        this.d1_B_B_B_A_BillCard.partnerType = this.param.partnerType;
        if (this.param.partnerType == 1) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible(
            'singleCoopQuota;sigBusiCoopQuota;isWhiteListCtrl;commonGrtLmtAmt;outguarMultiple',
            false
          );
        }
        if (this.param.partnerType == 12) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible('commonGrtLmtAmt;isWhiteListCtrl;outguarMultiple', false);
        }
        if (this.param.partnerType == 3 || this.param.partnerType == 5 || this.param.partnerType == 15) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible('commonGrtLmtAmt;isWhiteListCtrl;', false);
        }
      } else {
        this.d1_BillCard = this.$refs.d1_BillCard;
        this.d1_BillCard.setBillCardValue(this.param);
        if (this.param.partnerType == 13) {
          this.d1_BillCard.setBillCardItemVisible('bsinsTerm;operRange;corpScale;legal;regiAddr', false);
        }
      }
      if (this.param.bailPerc == 0) {
        this.d1_B_B_B_A_BillCard.bailAccNoDisabled = true;
        this.d1_B_B_B_A_BillCard.bailAccNoSubSeqDisabled = true;
      }
    },
    changeTotlCoopLmtAmt(){
      this.$refs.d1_B_B_A_BillCard.formdata.totlCoopLmtAmt = this.param.totlCoopLmtAmt;
    },
    changeTotlCoopLmtAmtUsed(){
      this.$refs.d1_B_B_A_BillCard.formdata.totlCoopLmtAmtUsed = this.param.totlCoopLmtAmtUsed;
    },
    /**
      * 选择机构
      */
    selectOrg () {
      var _this = this;
      if (_this.isWholeBankSuit == ""){
        _this.$message({ message: '请先选择是否全行适用', type: 'warning' });
        return;
      }
      // 传递方案编号到子表进行关联
      const json = {
        serno: this.param.serno,
        isWholeBankSuit:_this.isWholeBankSuit
      };
      this.$dialog.open(
        '选取机构',
        'bizmanage/coopBiz/coopPlanApp/cooPlanOrgIndex',
        660,
        240,
        json,
        () => {
          // 页面关闭后刷新数据
          this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        }
      );
    },
    /**
      * 删除机构
      */
    deleteOrg () {
      const rowData = this.d1_B_A_BillList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 删除操作
          this.deleteOrgAfter();
        }
      });
    },
    /**
      * 删除机构
      **/
    deleteOrgAfter () {
      const rowData = this.d1_B_A_BillList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      let json = {
        pkId: rowData.pkId
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopplansuitorginfo/delete',
        data: JSON.stringify(json),
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
            this.$xutils.showMsgBox('提示', '删除成功');
          }
        }
      });
    },
    /**
      * 全部删除机构
      **/
    deleteAllOrg () {
      this.$xutils.showConfirmBox('提示', '是否确认全部删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          let json = {
            serno: this.param.serno
          };
          this.$xutils.request({
            url: this.$backend.cmisBiz + '/api/coopplansuitorginfo/deleteall',
            data: JSON.stringify(json),
            type: 'POST',
            async: true,
            success: (response, status, xhr) => {
              if (response.code == 0) {
                this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
                this.$xutils.showMsgBox('提示', '删除成功');
              }
            }
          });
        }
      });
    },
    /**
     * 是否全行适用字段发生变化时，清空适用机构列表
     **/
    deleteAllOrg4Change (value) {
      var _this = this;
        let json = {
          serno: this.param.serno
        };
        _this.isWholeBankSuit = value;
        this.$xutils.request({
          url: this.$backend.cmisBiz + '/api/coopplansuitorginfo/deleteall',
          data: JSON.stringify(json),
          type: 'POST',
          async: true,
          success: (response, status, xhr) => {
            if (response.code == 0) {
              this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
            }
          }
        });
    },
    /**
      * 特殊限额新增
      **/
    quotaInsert () {
      let appMoney = this.d1_B_B_B_A_BillList.$refs.refTable.tabledata;
      let singlePrdCoopLmtAll = 0.0;
      for (let i = 0; i < appMoney.length; i++) {
         singlePrdCoopLmtAll += appMoney[i].singlePrdCoopLmt;
      }
      // 将合作方编号传递过去，新增时增加级联关系
      const json = {
        serno: this.param.serno,
        oprType: this.param.oprType,
        operate: 'ADD',
        coopPlanNo:this.param.coopPlanNo,
        singlePrdCoopLmtAll: singlePrdCoopLmtAll
      };
      this.$dialog.open(
        '特殊限额新增',
        'bizmanage/coopBiz/coopPlanApp/cooPlanQuataIndex',
        800,
        400,
        json,
        () => {
          this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        }
      );
    },
    /**
      * 方案特殊限额修改
      **/
    quotaUpdate () {
      let appMoney = this.d1_B_B_B_A_BillList.$refs.refTable.tabledata;
      let singlePrdCoopLmtAll = 0.0;
      for (let i = 0; i < appMoney.length; i++) {
         singlePrdCoopLmtAll += appMoney[i].singlePrdCoopLmt;
      }
      const row = this.d1_B_B_B_A_BillList.getSelectedRowData();
      if (!row) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      // 标记更新
      row.operate = 'UPDATE';
      row['singlePrdCoopLmtAll'] = singlePrdCoopLmtAll - row.singlePrdCoopLmt;
      this.$dialog.open(
        '特殊限额修改',
        'bizmanage/coopBiz/coopPlanApp/cooPlanQuataIndex',
        800,
        260,
        row,
        () => {
          this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        }
      );
    },
    /**
      * 方案特殊限额删除
      **/
    quataDelete () {
      const rowData = this.d1_B_B_B_A_BillList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 删除操作
          this.quataDeleteAfter();
        }
      });
    },
    /**
      * 方案特殊限额删除
      **/
    quataDeleteAfter () {
      const rowData = this.d1_B_B_B_A_BillList.getSelectedRowData();
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopplanespecquotactrl/delete/' + rowData.pkId,
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
            this.$xutils.showMsgBox('提示', '删除成功');
          }
        }
      });
    },
    /**
      * 关闭页面
      **/
    back () {
      this.getFactory().back();
    },
    /**
    * 获取合作方类型
    **/
    getPartnerType  () {
      return this.partnerType;
    },
    /**
    * 获取审批状态
    **/
    getApprStatus () {
      return this.apprStatus;
    },
    /**
      * 页面校验
      **/
    validate () {
      let result = true;
      let result1 = true;
      let result2 = true;
      const _this = this;
      if (this.param.partnerType == 2) {
        result = _this.d1_A_BillCard.validateBillCardValue();
        result1 = _this.d1_B_B_A_BillCard.validateBillCardValue(function () {});
        result2 = _this.d1_B_B_B_A_BillCard.validateBillCardValue();
        if (parseFloat(_this.d1_B_B_B_A_BillCard.formdata.bailAccLowAmt) > parseFloat(_this.d1_B_B_B_A_BillCard.formdata.bailAccNoAmt)) {
          // _this.$xutils.showMsgBox('提示', '该合作方当前保证金账户余额未达到我行缴存要求，请尽快督促其补足保证金');
        }
      } else if (_this.param.partnerType == 1 || _this.param.partnerType == 5 || _this.param.partnerType == 3 || _this.param.partnerType == 4 || _this.param.partnerType == 8 || _this.param.partnerType == 15) {
        result = _this.d1_A_BillCard.validateBillCardValue();
        result1 = _this.d1_B_B_A_BillCard.validateBillCardValue();
        result2 = _this.d1_B_B_B_A_BillCard.validateBillCardValue();
        if (parseFloat(_this.d1_B_B_B_A_BillCard.formdata.bailAccLowAmt) > parseFloat(_this.d1_B_B_B_A_BillCard.formdata.bailAccNoAmt)) {
          //_this.$xutils.showMsgBox('提示', '该合作方当前保证金账户余额未达到我行缴存要求，请尽快督促其补足保证金');
        }
      } else {
        result = _this.d1_BillCard.validateBillCardValue();
      }
      // 当全行是否适用选择否则需要适用机构必填
      if ((_this.param.partnerType == 2 || _this.param.partnerType == 1 || _this.param.partnerType == 3 || _this.param.partnerType == 4 || _this.param.partnerType == 8 || _this.param.partnerType == 15) && _this.d1_B_A_BillList.getBillListData().length == 0 && _this.d1_A_BillCard.getBillCardValue().isWholeBankSuit != '1') {
        _this.$xutils.showMsgBox('提示', '请添加适用机构');
        return false;
      }
      // 合作方类型为担保公司时再校验是否填写了特殊限额
      // if (_this.param.partnerType == 2 && _this.d1_B_B_B_A_BillList.getBillListData().length == 0) {
      //   _this.$xutils.showMsgBox('提示', '请添加方案特殊限额');
      //   return false;
      // }
      return result && result1 && result2;
    },
    /**
       * 保存数据
       **/
    saveData () {
      let card = {};
      let card1 = {};
      let card2 = {};
      const _this = this;
      let param = {};

      if (this.param.partnerType == 2) {
        card = _this.d1_A_BillCard.getBillCardValue();
        card1 = _this.d1_B_B_A_BillCard.getBillCardValue();
        card2 = _this.d1_B_B_B_A_BillCard.getBillCardValue();
        // let bailAccNo = card2.bailAccNo;
        // let bailAccNoSubSeq = card2.bailAccNoSubSeq;
        // let bailAccNoAmt = card2.bailAccNoAmt;
        // if(bailAccNo === '' || bailAccNo === null || bailAccNoSubSeq === null || bailAccNoSubSeq === null || bailAccNoAmt === null || bailAccNoAmt === null){
        //   _this.$xutils.showMsgBox('提示', '【专业担保公司】必须录入保证金账号、保证金账号子序号、当前保证金金额信息!', 350, 150, () => {
        //     return;
        //   });
        // }
        let valid = _this.d1_B_B_B_A_BillCard.validateBillCardValue();
        if (!valid) {
          return;
        }
      } else if (_this.param.partnerType == 1 || _this.param.partnerType == 5 || _this.param.partnerType == 3 || _this.param.partnerType == 4 || _this.param.partnerType == 8 || _this.param.partnerType == 15) {
        card = _this.d1_A_BillCard.getBillCardValue();
        card1 = _this.d1_B_B_A_BillCard.getBillCardValue();
        card2 = _this.d1_B_B_B_A_BillCard.getBillCardValue();
        let valid = _this.d1_B_B_B_A_BillCard.validateBillCardValue();
        if (!valid) {
          return;
        }
      } else {
        card = _this.d1_BillCard.getBillCardValue();
      }
      // 将三个表单的数据拼接到一个对象中
      this.clone4diff(card, param);
      this.clone4diff(card1, param);
      this.clone4diff(card2, param);
      param.totlCoopLmtAmt = card1.totlCoopLmtAmt;
      // param.bailAccNo = card1.bailAccNo;
      param.serno = _this.param.serno;
      param.subpayGraper = card1.subpayGraper;
      // _this.param = param;
      let bailPerc = card2.bailPerc;
      let bailAccNo = card2.bailAccNo;
      if (parseFloat(bailPerc) == 0 && (bailAccNo == null || bailAccNo == '' || bailAccNo == 'undefined')) {
        let param1 = {};
        param1.serno = _this.param.serno;
        param1.bailAccNo = null;
        param1.bailAccNoSubSeq = null;
        request({
          url: this.$backend.cmisBiz + '/api/coopplanapp/updateBailAccInfoEmptyBySerno',
          method: 'POST',
          async: false,
          data: JSON.stringify(param1)
        });
      }
      return request({
        url: this.$backend.cmisBiz + '/api/coopplanapp/update',
        method: 'POST',
        data: JSON.stringify(param)
      });
    },

    /**
       * 对象数据拷贝
       **/
    clone (src, dest) {
      const _this = this;
      if (!(typeof src !== 'object' || typeof src !== 'function' || src === null)) {
        return src;
      }
      Object.keys(src).forEach((key, index) => {
        if (src[key] && src[key] != '') {
          dest[key] = src[key];
        }
      });
    },
    /**
     * 对象数据拷贝
     **/
    clone4diff (src, dest) {
      const _this = this;
      if (!(typeof src !== 'object' || typeof src !== 'function' || src === null)) {
        return src;
      }
      Object.keys(src).forEach((key, index) => {
        if (typeof src[key] == 'number') {
          if (src[key] != null && src[key] != _this.param[key]) {
            dest[key] = src[key];
          }
        } else {
          if (src[key] && src[key] != '' && src[key] != _this.param[key]) {
            dest[key] = src[key];
          }
        }
      });
    },

    /**
      * 暂存数据
    **/
    saveTempData () {
      let card = {};
      let card1 = {};
      let card2 = {};
      const _this = this;
      let param = {};

      if (this.param.partnerType == 2) {
        card = _this.d1_A_BillCard.getBillCardValue();
        card1 = _this.d1_B_B_A_BillCard.getBillCardValue();
        card2 = _this.d1_B_B_B_A_BillCard.getBillCardValue();
        // let bailAccNo = card2.bailAccNo;
        // let bailAccNoSubSeq = card2.bailAccNoSubSeq;
        // let bailAccNoAmt = card2.bailAccNoAmt;
        // if(bailAccNo === '' || bailAccNo === null || bailAccNoSubSeq === null || bailAccNoSubSeq === null || bailAccNoAmt === null || bailAccNoAmt === null){
        //   _this.$xutils.showMsgBox('提示', '【专业担保公司】必须录入保证金账号、保证金账号子序号、当前保证金金额信息!', 350, 150, () => {
        //     return;
        //   });
        // }
      } else if (_this.param.partnerType == 1 || _this.param.partnerType == 5 || _this.param.partnerType == 3 || _this.param.partnerType == 4 || _this.param.partnerType == 8 || _this.param.partnerType == 15) {
        card = _this.d1_A_BillCard.getBillCardValue();
        card1 = _this.d1_B_B_A_BillCard.getBillCardValue();
        card2 = _this.d1_B_B_B_A_BillCard.getBillCardValue();
      } else {
        card = _this.d1_BillCard.getBillCardValue();
      }
      // 将三个表单的数据拼接到一个对象中
      this.clone4diff(card, param);
      this.clone4diff(card1, param);
      this.clone4diff(card2, param);
      param.totlCoopLmtAmt = card1.totlCoopLmtAmt;
      // param.bailAccNo = card1.bailAccNo;
      param.serno = _this.param.serno;
      param.subpayGraper = card1.subpayGraper;
      // _this.param = param;
      let bailPerc = card2.bailPerc;
      let bailAccNo = card2.bailAccNo;
      if (parseFloat(bailPerc) == 0 && (bailAccNo == null || bailAccNo == '' || bailAccNo == 'undefined')) {
        let param1 = {};
        param1.serno = _this.param.serno;
        param1.bailAccNo = null;
        param1.bailAccNoSubSeq = null;
        request({
          url: this.$backend.cmisBiz + '/api/coopplanapp/updateBailAccInfoEmptyBySerno',
          method: 'POST',
          async: false,
          data: JSON.stringify(param1)
        });
      }
      return request({
        url: this.$backend.cmisBiz + '/api/coopplanapp/update',
        method: 'POST',
        data: JSON.stringify(param)
      });
    }
  }
};
</script>
