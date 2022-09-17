<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
    <yu-button type="primary" @click="doComit" v-show="showAble">提交</yu-button>
      <yu-button type="primary" @click="doSave" v-show="showAble">保存</yu-button>
      <yu-button type="primary" @click="onClose" v-show="showClose">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onClose"></yufpNwfInit>
  </div>
</template>
<script>
import d1Billcard from './guarMortgageRegisterUpdate_d1_BillCard.vue';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';

export default {
  components: { d1Billcard, yufpNwfInit },
  props: {
    params: Object,
    dialogId: String,
    wfData: Object
  },
  data () {
    return {
      showAble: true,
      showClose: true,
      d1_BillCard: null,
      saveDatas: {},
      bizLine: '',
      param:{}
    };
  },
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  mounted () {
    this.d1_BillCard = this.$refs.d1_BillCard;
    var type = this.params && this.params.type;
    var serno = this.params && this.params.serno;
    var data = {};
    if (type === 'ADD') {  
      var guarContNo = this.params.guarCont.guarContNo;
      this.d1_BillCard.tableData = this.params.guar;
      data = this.params.guarCont;
      this.params.mainContNo = this.params.guarCont.mainContNo;
      // regType 02抵押注销
      if (this.params.regType == '02') {
        data['regSubType'] = '03';
      }
      yufp.clone(data, this.d1_BillCard.formdata);
      if (!(this.params.guarCont.hasOwnProperty('serno') && this.params.guarCont.serno != '' && this.params.guarCont.serno != null)) {
        // 主合同编号
        this.getMainContNo(guarContNo);
      } else {
        this.d1_BillCard.formdata.mainContNo = this.params.guarCont.mainContNo;
      }   
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 隐藏按钮
      this.setHidden();
      // 获取业务条线
      this.getBizLine();
    } else if (type === 'EDIT') {
      this.editInit(serno);
    } else if (type === 'VIEW') {
      this.editInit(serno);
      this.d1_BillCard.setItemEditable('*');
      this.showAble = false;
    } else if (this.wfData) {
      serno = this.wfData.instanceInfo.bizId;
      this.editInit(serno);
      this.d1_BillCard.setItemEditable('*');
      this.showAble = false;
      this.showClose = false;
    }
  },
  methods: {

    editInit (_serno) {
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/queryGuarMBySerno',
        method: 'post',
        data: _serno
      }).then((response) => {
        if (response.code === '0') {
          yufp.clone(response.data, this.d1_BillCard.formdata);
          this.d1_BillCard.tableData = response.data.guarMortgageManageRelDtos;
          // 隐藏按钮
          this.setHidden();
          // 获取业务条线
          this.getBizLine();
          if(this.params){
           this.params.mainContNo = this.d1_BillCard.formdata.mainContNo;
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    // 设置按钮隐藏
    setHidden () {
      var data = this.d1_BillCard.getBillCardValue();
      // 隐藏按钮
      if (data.regType === '02') {
        this.d1_BillCard.setBillCardItemVisible('beforehandInd', false);
        this.d1_BillCard.setBillCardItemVisible('regSubType', true);
      } else {
        this.d1_BillCard.$refs.refTable.setHiddenColumns('warrantNo');
        this.d1_BillCard.$refs.refTable.setHiddenColumns('coreGuarantyNo');
      }
    },

    // 保存
    doSave () {
      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 150);
      });
    },

    commonSave (func) {
      // 判断必输项
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      let jsoPar = this.d1_BillCard.getBillCardValue();
      jsoPar['guarMortgageManageRelList'] = this.d1_BillCard.tableData;
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/tempSave',
        method: 'post',
        data: jsoPar
      }).then((response) => {
        if (response.code === '0') {
          func && func();
          yufp.clone(this.d1_BillCard.formdata, this.params.guarCont);
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    // 提交
    doComit () {
      this.commonSave(() => {
        let jsoPar = this.d1_BillCard.getBillCardValue();
        let dataParams = {};
        dataParams['regType'] = jsoPar.regType;
        dataParams['guarContNo'] = jsoPar.guarContNo;
        // regType 01 抵押登记 02 抵押注销
        this.getBizLine ();

        if (jsoPar.regType == '01') {
        // 主合同业务类型(业务条线01小微 02零售 03对公 04资产池)
          if(this.bizLine === ''){
          //    this.$xutils.showMsgBox('提示', '该担保合同的业务条线字段为空!', 350, 150);
          //    return;
          }
          dataParams['bizLine'] = this.bizLine;
        } else if (jsoPar.regType == '02') {
          // regSubType 01本地电子权证注销（系统自动生成并发起流程）
          // 02本地纸质权证集中作业注销（纸质权证出库到集中作业的，系统自动生成并发起流程）
          // 03本地纸质权证支行选择注销（纸质权证出库到支行的，客户经理录入注销申请，并发起流程）
          dataParams['regSubType'] = jsoPar.regSubType;
          // 是否在线办理抵押登记/注销 该字段是从担保合同中获取的
          dataParams['isRegOnline'] = jsoPar.isRegOnline;
        } else {
         // this.$xutils.showMsgBox('提示', '抵押办理类型异常!', 350, 150);
        }
        //特殊场景处理，当前流程的审批人为上一业务环节指定节点的审批人,在流程参数中增加上一业务环节流程的BIZ_ID
        //1.抵押登记审批流程（本地机构集中办理模式）DB002
        //2.押登记审批流程（本地机构放款后抵押模式）DB003
        //3.一般贷款出账审批流程
        //4.银承出账审批流程
        //零售送主合同号，对公送流水号

        dataParams['serno'] = this.d1_BillCard.formdata.mainContNo;

        if(this.bizLine == '03'){
            //对公送流水号
            this.getLastSerno(this.d1_BillCard.formdata.guarContNo, this.d1_BillCard.formdata.mainContNo);
            dataParams['serno'] = this.param.serno;
        }
        
        let wfInitData = {};
        wfInitData.systemId = 'cmis';
        wfInitData.orgId = this.org.id;
        wfInitData.userId = this.userCode;
        wfInitData.bizId = jsoPar.serno;
        wfInitData.bizType = this.getWfNo();
        wfInitData.bizUserName = this.params.cusName;
        wfInitData.bizUserId = this.params.cusId;
        wfInitData.param = dataParams;
        this.$refs.yufpNwfInit.wfInit(wfInitData);
      });
    },

    getWfNo () {
      let jsoPar = this.d1_BillCard.getBillCardValue();
      let regType = jsoPar.regType;
      var wfNo = '';
      // DB002抵押登记（本地机构集中办理模式）
      // DB003抵押登记（本地机构放款后抵押模式）
      // DB009抵押注销（本地机构）
      if (regType == '01') {
        wfNo = jsoPar.beforehandInd === '0' ? 'DB002' : 'DB003';
      } else if (regType == '02') {
        wfNo = 'DB009';
      }

      return wfNo;
    },

    getBizLine () {
      let jsoPar = this.d1_BillCard.getBillCardValue();
      this.$request({
        url: this.$backend.cmisBiz + '/api/grtguarcont/selectByGuarContNo',
        method: 'post',
        data: jsoPar.guarContNo
      }).then((response) => {
        if (response.code === '0') {
          this.bizLine = response.data.bizLine;
          this.params.cusId = response.data.cusId;
          this.params.cusName = response.data.cusName;
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },


    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    },

    // 获取主合同编号
    getMainContNo (guarContNo) {      
      // 获取默认主合同编号
      this.$request({
        url: this.$backend.cmisBiz + '/api/grtguarbizrstrel/selectcontnobyguarcontno',
        method: 'POST', 
        async: false,     
        data: {
            condition: JSON.stringify({
              guarContNo: guarContNo              
            })           
          },
      }).then((response) => {
        if (response.code == 0) {
            this.d1_BillCard.formdata.mainContNo = response.data.data;
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
   },

       // 获取主合同编号
    getLastSerno (guarContNo, contNo) { 
      var _this = this;  
      this.$request({
        url: this.$backend.cmisBiz + '/api/grtguarbizrstrel/selectsernobymodel',
        method: 'POST', 
        async: false,     
        data: {
            condition: JSON.stringify({
              guarContNo: guarContNo,              
              contNo: contNo
            })           
          },
      }).then((response) => {
        if (response.code == 0) {
          var serno = response.data.data;
          _this.param.serno = serno;
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
          return '';
        }
      });
   },

   // 获取主合同编号列表
   selectMainCont () {
     var _guarContNo = '';
     if (this.params.type === 'EDIT') {
       _guarContNo = this.params.guarContNo;
     } else {
       _guarContNo = this.params.guarCont.guarContNo;
     }  
     const jsoPar = this.d1_BillCard.getBillCardValue();
     jsoPar['guarContNo'] = _guarContNo;    
     var _this = this;
     this.$dialog.open('请选择主合同', 'guarmanage/registerManage/guarMainContSelectIndex', 1000, 600, jsoPar, function (rowData) {   
       if (rowData != null && Object.keys(rowData).length > 0) {
         _this.d1_BillCard.formdata.mainContNo = rowData.contNo;
       }       
    });
   }   
  }
};
</script>
