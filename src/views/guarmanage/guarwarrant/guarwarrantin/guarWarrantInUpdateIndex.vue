<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
    <yu-button type="primary" @click="doComit" v-show="showAble">提交</yu-button>
      <yu-button type="primary" @click="doSave" v-show="showAble2">保存</yu-button>
      <yu-button type="primary" @click="onClose" v-show="showClose">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import d1Billcard from './guarWarrantInUpdate_d1_BillCard.vue';
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
      showAble2: true,
      showClose: true,
      d1_BillCard: null,
      saveDatas: {}
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
    if (type === 'ADD') {
      this.d1_BillCard.tableData = this.params.guar;
      this.params.grtFlag = this.params.guarCont.grtFlag;
      this.params.coreGuarantyNo = this.params.guarCont.coreGuarantyNo;
      yufp.clone(this.params, this.d1_BillCard.formdata);
      this.d1_BillCard.execBillCardDefaultValueFormula();
      yufp.clone(this.d1_BillCard.formdata, this.d1_BillCard.formdata2);
      if (this.params.warrantInType == '02') {
        this.d1_BillCard.quanzhengShow = false;
      }
      //判断是否为抵押 
      if(this.d1_BillCard.formdata.grtFlag == '01' && (this.d1_BillCard.formdata2.warrantNo == '' || this.d1_BillCard.formdata2.warrantNo == null)){
          this.d1_BillCard.formdata2.warrantNo = '苏（）张家港市不动产证明第号';
      }
    } else if (type === 'EDIT') {
      this.editInit(serno);
    } else if (type === 'VIEW') {
      this.editInit(serno);
      for (var item1 in this.d1_BillCard.formdata) {
        this.d1_BillCard.$refs.refForm1.setItemDisabled(item1, true);
      }
      for (var item2 in this.d1_BillCard.formdata2) {
        this.d1_BillCard.$refs.refForm2.setItemDisabled(item2, true);
      }
      this.showAble = false;
      this.showAble2 = false;
    } else if (this.wfData) {
      serno = this.wfData.instanceInfo.bizId;
      this.editInit(serno);
      this.showAble = false;
      this.showAble2 = false;
      this.showClose = false;
    }
  },
  methods: {
    editInit (_serno) {
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/queryGuarWBySerno',
        method: 'post',
        data: _serno
      }).then((response) => {
        if (response.code === '0') {
          yufp.clone(response.data, this.d1_BillCard.formdata);
          yufp.clone(response.data.guarWarrantInfo, this.d1_BillCard.formdata2);
          yufp.clone(response.data, this.d1_BillCard.formdata3);
          //判断是否为抵押 
          if(this.d1_BillCard.formdata.grtFlag == '01' && (this.d1_BillCard.formdata2.warrantNo == '' || this.d1_BillCard.formdata2.warrantNo == null)){
              this.d1_BillCard.formdata2.warrantNo = '苏（）张家港市不动产证明第（）号';
          }
          if(this.params){
           this.params.coreGuarantyNo = this.d1_BillCard.formdata.coreGuarantyNo;
          }
          if (response.data.warrantInType == '02') {
            var type = this.params && this.params.type;
            if (type && type === 'EDIT') {
              this.d1_BillCard.quanzhengShow = false;
            }
            if (this.wfData && this.wfData.instanceInfo.nodeSign == 'input') {
              this.showAble2 = true;
            } else if (this.wfData && this.wfData.instanceInfo.nodeSign == 'noInput') {
              this.showAble2 = false;
            }
          }
          // 加载账务机构
          if (!this.d1_BillCard.formdata2.finaBrId) {
            if (this.d1_BillCard.formdata3.inputBrId) {
              this.d1_BillCard.formdata2.finaBrId = this.d1_BillCard.formdata3.inputBrId;
            } else {
              var orgId = this.$xutils.getDefaultformulaData('$LoginOrgCode');

              if (orgId.substring(0, 2) == '80') {
                //寿光村镇，账务机构默认800100--寿光村镇银行营业部
                this.d1_BillCard.formdata2.finaBrId = '800100'
              } else if (orgId.substring(0, 2) == '81') {
                //东海村镇，账务机构默认810100--东海村镇银行营业部
                this.d1_BillCard.formdata2.finaBrId = '810100'; 
              } else {
                this.d1_BillCard.formdata2.finaBrId = orgId;
              }
                
            }
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
      // 加载押品信息列表
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/queryguarbaseinfobywarrantinserno',
        method: 'POST',
        data: {
          condition: JSON.stringify({
            serno: _serno
          })
        }
      }).then((response) => {
        if (response.code === '0') {
          this.d1_BillCard.tableData = response.data;
          let a = [];
          for (let i = 0; i < response.data.length; i++) {
            a.push(response.data[i].grtFlag);
          }
          let proCertiItemVisable = false;
          if (a.indexOf('01') > -1) {
            proCertiItemVisable = true;
          }
          this.d1_BillCard.proCertiItemVisable = proCertiItemVisable;
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
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
      this.$refs.d1_BillCard.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (this.d1_BillCard.quanzhengShow) {
        this.$refs.d1_BillCard.$refs.refForm2.validate(function (valid) {
          validate = validate && valid;
        });
      }
      this.$refs.d1_BillCard.$refs.refForm3.validate(function (valid) {
        validate = validate && valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '请将必输项填写完整', 350, 150);
        return;
      }
      // const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2)));

      const preBackDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_BillCard.formdata.preBackDate));// 权证预计归还时间
      if (this.d1_BillCard.formdata.preBackDate && preBackDate < nowDate) {
      //  this.$xutils.showMsgBox('提示', '权证预计归还时间不能小于当前时间!');
      //  return;
      }
      const warrantInputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_BillCard.formdata2.warrantInputDate));// 权证登记日期
      if (this.d1_BillCard.formdata2.warrantInputDate && warrantInputDate > nowDate) {
      //  this.$xutils.showMsgBox('提示', '权证登记日期不能大于当前时间!');
      //  return;
      }
      const certiStartDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_BillCard.formdata2.certiStartDate));// 权证发证日期
      if (this.d1_BillCard.formdata2.certiStartDate && certiStartDate > nowDate) {
      //  this.$xutils.showMsgBox('提示', '权证发证日期不能大于当前时间!');
      //  return;
      }
      const certiEndDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_BillCard.formdata2.certiEndDate));// 权证到期日期
      if (this.d1_BillCard.formdata2.certiEndDate && certiEndDate < nowDate) {
      //  this.$xutils.showMsgBox('提示', '权证到期日期不能小于当前时间!');
      //  return;
      }
      if (this.d1_BillCard.formdata2.certiStartDate && this.d1_BillCard.formdata2.certiEndDate && (certiEndDate <= certiStartDate)) {
      //  this.$xutils.showMsgBox('提示', '到期日期必须大于生效日期!');
      //  return;
      }
      // 是否集中作业打印：选择为是时，录入的权利凭证号需在空白凭证登记簿中（未用状态）
      if (this.d1_BillCard.formdata2.isFocusWorkPrint == '1') {
        const certiStatus = this.getcertiStatus(this.d1_BillCard.formdata2.certiRecordId);
        if (certiStatus == null || certiStatus == '') {
        //  this.$xutils.showMsgBox('提示', '请到空白管理录入该凭证编号', 350, 150);
        //  return;
        } else if (certiStatus != '01') {
        //  this.$xutils.showMsgBox('提示', '该凭证编号需未使用状态', 350, 150);
        //  return;
        }
      }
      var baseData = this.d1_BillCard.formdata;// 基本信息
      var guarWarrantInfo = this.d1_BillCard.formdata2;// 权证信息
      var inputData = this.d1_BillCard.formdata3;// 登记信息
      if (!baseData.inputId) { // 如果为空  标示新增  初始化申请表数据
        yufp.extend(baseData, inputData);
      }
      if (!guarWarrantInfo.inputId && guarWarrantInfo.warrantNo) { // 初始化权证信息表数据
        baseData['warrantNo'] = guarWarrantInfo.warrantNo;// 防止extend时把warrantNo数据给丢失掉
        yufp.extend(guarWarrantInfo, baseData);
        guarWarrantInfo.certiState = '01';// 待入库
      }
      baseData['guarWarrantInfo'] = guarWarrantInfo;
      baseData['guarContRelWarrantList'] = this.d1_BillCard.tableData;

      this.$request({
        url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/tempSave',
        method: 'post',
        data: baseData
      }).then((response) => {
        if (response.code === '0') {
          func && func();
          yufp.clone(this.d1_BillCard.formdata, this.params);
          yufp.clone(this.d1_BillCard.formdata2, this.params);
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    // 提交
    doComit () {
      this.commonSave(() => {
        let jsoPar = this.d1_BillCard.formdata;
        // 01-电子权证自动入库模式  03-纸质权证柜面入库模式  02-纸质权证集中入库模式 04-电子权证手工入库模式
        // 01 03 不走流程
        if (jsoPar.warrantInType === '01' || jsoPar.warrantInType === '03') {
          this.$request({
            url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/warrantIn',
            method: 'post',
            data: jsoPar.serno
          }).then((response) => {
            if (response.code === '0') {
              this.$xutils.showMsgBox('提示', '提交成功', 350, 150);
              this.onClose();
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          });
        } else {
        // let dataParams = {};
        // yufp.clone(jsoPar, dataParams);
        // dataParams.startOrgId = this.org.id;
          for (var i = 0; i < this.d1_BillCard.tableData.length; i++) {
            if (this.d1_BillCard.tableData[i].guarCusName != '' && this.d1_BillCard.tableData[i].guarCusName != null) {
              jsoPar['guarCusName'] = this.d1_BillCard.tableData[i].guarCusName;
              jsoPar['guarCusId'] = this.d1_BillCard.tableData[i].guarCusId;
              break;
            }
          }
          let wfInitData = {};
          wfInitData.systemId = 'cmis';
          wfInitData.orgId = this.org.id;
          wfInitData.userId = this.userCode;
          wfInitData.bizId = jsoPar.serno;
          wfInitData.bizType = this.getWfNo();
          wfInitData.bizUserName = jsoPar.guarCusName;
          wfInitData.bizUserId = jsoPar.guarCusId;
          wfInitData.param = {guarNo: jsoPar.guarNo, warrantInType: jsoPar.warrantInType};// 流程代办页面影像用
          this.$refs.yufpNwfInit.wfInit(wfInitData);
          // this.onClose();
          // this.$dialog.closeAll();
        }
      });
    },

    getWfNo () {
      let jsoPar = this.d1_BillCard.formdata;
      var wfNo = '';
      // DB004权证入库（纸质权证集中入库模式）
      // DB005权证入库（电子权证手工入库模式）
      if (jsoPar.warrantInType == '02') {
        wfNo = 'DB004';
      } else if (jsoPar.warrantInType == '04') {
        wfNo = 'DB005';
      }
      return wfNo;
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    },

    // 校验凭证状态是否为未使用
    getcertiStatus (certiRecordId) {
      let returnData = '';
      yufp.service.request({
        method: 'POST',
        async: false,
        url: this.$backend.cmisBiz + '/api/blankcertiinfo/querylist',
        data: {
          condition: JSON.stringify({
            certiNo: certiRecordId
          })
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data != null && response.data.length > 0) {
              returnData = response.data[0].certiStatus;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        }
      });
      return returnData;
    },
    submitSuccess () {
      this.$dialog.close(this.dialogId, 'success');
    }
  }
};
</script>
