<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard" :operate="operate" @set-serno="setSerno"></d1-a-billcard>
    </div>
    <div>
      <d1-b-billlist :page-data="pageData" ref="d1_B_BillList" :operate="operate"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './cusBatPubHandoverAppUpdate_d1_A_BillCard.vue';
import d1BBilllist from './cusBatPubHandoverAppUpdate_d1_B_BillList.vue';
import {getBaseUrl} from '@/utils/util';
/**
 *
 * 批量导入客户移交修改详情页面，修改和新增共用一个页面
 */

export default {
  components: {getBaseUrl, d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      operate: '',
      pageData: {}
    };
  },
  created () {
    this.operate = this.pageParams.op;
    this.pageData = this.pageParams;
    if (this.operate == 'add') {
      this.pageData.cbphaSerno = this.$xutils.getSEQWithParamFromServer('CUS_BLK_SERNO');
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    setSerno (val) {
      if (val) { this.d1_B_BillList.serno = val }
    },
    reloadData () {
      const model = {serno: this.pageParams.cbphaSerno, oprType: '01'};
      const params = { condition: JSON.stringify(model) };
      if (this.handoverMode == 1) {
        this.d1_B_BillList.$refs.refTable.remoteData(params);
      } else {
        this.d1_B_1_BillList.$refs.refTable.remoteData(params);
      }
    },
    afterInit () {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      if (this.operate == 'add') {
        this.d1_A_BillCard.execBillCardDefaultValueFormula();
        this.d1_A_BillCard.setItemValue('cbphaSerno', this.pageData.cbphaSerno);
        this.pageData.cbphaSerno = this.d1_A_BillCard.getItemValue('cbphaSerno');
      } else {
        this.d1_A_BillCard.setBillCardValue(this.pageData);
        // this.reloadData();
      }
    },

    // 暂存按钮处理
    doTempSave () {
      let resp = '';
      // 新增按钮，调用插入保存方法，修改按钮调用保存方法
      if (this.pageParams.op == 'add') {
        resp = this.d1_A_BillCard.saveBillCardData();
      } else {
        // 如果是保存进入，则对最近更新人，最近更新日期，最近更新机构，更新时间进行赋值操作
        // 当前登录人信息
        const userInfo = this.$xutils.getLoginUserInfo();
        this.d1_A_BillCard.setItemValue('updBrId', userInfo.orgCode);
        this.d1_A_BillCard.setItemValue('updId', userInfo.loginCode);
        this.d1_A_BillCard.setItemValue('updDate', this.$xutils.dateFormat('yyyy-MM-dd', new Date()));
        this.d1_A_BillCard.setItemValue('updateTime', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
        // 更新数据信息
        resp = this.d1_A_BillCard.updateBillCardData();
      }
      // 如果保存成功，弹出框提示
      if (resp) {
        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150);
        this.$dialog.close(this.dialogId);
      }
    },
    // d1_A 取消按钮，关闭当前页面
    doCancel () {
      // 关闭当前页面
      this.$dialog.close(this.dialogId);
    },

    doSumbit () {
      var _this = this;
      const data = _this.d1_B_BillList.getAllData();
      if (data == 0) {
        _this.$xutils.showMsgBox('提示', '请添加批量客户移交清单数据!', 350, 150);
        return false;
      }
      _this.d1_A_BillCard.setBillCardItemValue('batchHandoStatus', '02');
      _this.d1_A_BillCard.updateBillCardData(function(responseData){
        if(responseData.code != '0'){
          _this.$message({ message: responseData.erortx, type: 'warning' });
        }
      });
      _this.doCancel();
    }
  }
};
</script>
