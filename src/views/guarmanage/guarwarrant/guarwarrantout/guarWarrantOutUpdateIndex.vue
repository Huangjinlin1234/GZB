<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
    <yu-button type="primary" @click="doComit" v-show="showAble">提交</yu-button>
      <yu-button type="primary" @click="doSave" v-show="showAble">保存</yu-button>
      <yu-button type="primary" @click="onClose" v-show="showClose">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onClose"></yufpNwfInit>
    <yufpNwfRisk ref="yufpNwfRisk"></yufpNwfRisk>
  </div>
</template>
<script>
import yufpNwfRisk from '@/components/widgets/YufpNwfRisk';
import d1Billcard from './guarWarrantOutUpdate_d1_BillCard.vue';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';

export default {
  components: { d1Billcard, yufpNwfInit, yufpNwfRisk},
  props: {
    params: Object,
    dialogId: String,
    wfData: Object
  },
  data () {
    return {
      showAble: true,
      requiredFlag1: true,
      requiredFlag3: true,
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
    var type = '';
    var serno = '';
    var warrantNo = '';
    var certiState = '04';
    var coreGuarantyNo = '';

    if (this.wfData) {
      warrantNo = this.wfData.instanceInfo.param.warrantNo;
      certiState = this.wfData.instanceInfo.param.certiState;
      coreGuarantyNo = this.wfData.instanceInfo.param.coreGuarantyNo;
    } else if (this.getFactory().contextData) {
      type = this.getFactory().contextData.instanceInfo.type;
      serno = this.getFactory().contextData.instanceInfo.serno;
      warrantNo = this.getFactory().contextData.instanceInfo.warrantNo;
      certiState = this.getFactory().contextData.instanceInfo.certiState;
      coreGuarantyNo = this.getFactory().contextData.instanceInfo.coreGuarantyNo;
    } else {
      type = this.params && this.params.type;
      serno = this.params && this.params.serno;
      warrantNo = this.params && this.params.warrantNo;
      certiState = this.params && this.params.certiState ? this.params.certiState : '04';
      coreGuarantyNo = this.params && this.params.coreGuarantyNo;
    }

    this.d1_BillCard = this.$refs.d1_BillCard;

    if (type === 'ADD') {
      yufp.clone(this.params, this.d1_BillCard.formdata);
      yufp.clone(this.params, this.d1_BillCard.formdata2);
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 隐藏按钮
      this.setItemHid();
      this.innitYp(coreGuarantyNo);
    } else if (type === 'EDIT') {
      this.editInit(serno, coreGuarantyNo);
    } else if (type === 'VIEW') {
      this.editInit(serno, coreGuarantyNo);
      for (var item1 in this.d1_BillCard.formdata) {
        this.d1_BillCard.$refs.refForm1.setItemDisabled(item1, true);
      }
      for (var item2 in this.d1_BillCard.formdata2) {
        this.d1_BillCard.$refs.refForm2.setItemDisabled(item2, true);
      }
      this.showAble = false;
    } else if (this.wfData) {
      serno = this.wfData.instanceInfo.bizId;
      this.editInit(serno, coreGuarantyNo);
      this.showAble = false;
      this.showClose = false;
      for (var item1 in this.d1_BillCard.formdata) {
        this.d1_BillCard.$refs.refForm1.setItemDisabled(item1, true);
      }
      for (var item2 in this.d1_BillCard.formdata2) {
        this.d1_BillCard.$refs.refForm2.setItemDisabled(item2, true);
      }
    }
  },
  methods: {
    innitYp (coreGuarantyNo) {
      // 加载押品信息列表
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/queryguarbaseinfobycoreguarantyno',
        method: 'POST',
        async: false,
        data: {
          condition: JSON.stringify({
            coreGuarantyNo: coreGuarantyNo
          })
        }
      }).then((response) => {
        if (response.code === 0) {
          this.d1_BillCard.tableData = response.data.data;
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },
    editInit (_serno, coreGuarantyNo) {
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/queryGuarWBySerno',
        method: 'post',
        data: _serno
      }).then((response) => {
        if (response.code === '0') {
          yufp.clone(response.data, this.d1_BillCard.formdata);
          yufp.clone(response.data.guarWarrantInfo, this.d1_BillCard.formdata2);
          yufp.clone(response.data, this.d1_BillCard.formdata3);

          // 隐藏按钮
          this.setItemHid();
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
      this.innitYp(coreGuarantyNo);
    },

    // 隐藏按钮
    setItemHid () {
      let warrantOutType = this.d1_BillCard.formdata.warrantOutType; // 01-结清出库 02-非结清出库
      let warrantOutTypeSub = this.d1_BillCard.formdata.warrantOutTypeSub; // 01-押品部分出库 02-押品置换出库
      let gagTyp = this.d1_BillCard.formdata.gagTyp; // 01-土地使用权 02-在建工程 03-房产/房地产 40-不动产
      if (((warrantOutType === '01') || (warrantOutTypeSub === '01' || warrantOutTypeSub === '02')) && (gagTyp === '01' || gagTyp === '02' || gagTyp === '03' || gagTyp === '40')) {
        // 显示是否发集中作业
        this.d1_BillCard.$refs.refForm1.setItemHidden('isZhblzx', false);
      } else { // 隐藏是否发集中作业
        this.d1_BillCard.$refs.refForm1.setItemHidden('isZhblzx', true);
      }
      // 权证出库原因大类:01结清出库 隐藏权证出库原因细类按钮
      if (warrantOutType === '01') {
        this.d1_BillCard.$refs.refForm1.setItemHidden('warrantOutTypeSub', true);
        this.d1_BillCard.$refs.refForm1.setItemHidden('preBackDate', true);
        this.d1_BillCard.requiredFlag1 = false;
        this.d1_BillCard.requiredFlag3 = false;
      }
      // 是否还款即解押 抵质押物类型 出库时候展示
      if (this.d1_BillCard.formdata.warrantAppType === '02') {
        this.d1_BillCard.$refs.refForm1.setItemHidden('isRepayRemoveGuar', false);
        this.d1_BillCard.requiredFlag4 = true;
        this.d1_BillCard.$refs.refForm1.setItemHidden('gagTyp', false);
        this.d1_BillCard.requiredFlag4 = true;
      } else {
        this.d1_BillCard.$refs.refForm1.setItemHidden('isRepayRemoveGuar', true);
        this.d1_BillCard.requiredFlag4 = false;
        this.d1_BillCard.$refs.refForm1.setItemHidden('gagTyp', true);
        this.d1_BillCard.requiredFlag4 = false;
      }
    },

    // 保存
    doSave () {
      let validate = false;
      this.d1_BillCard.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
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
      this.$refs.d1_BillCard.$refs.refForm2.validate(function (valid) {
        validate = validate && valid;
      });
      this.$refs.d1_BillCard.$refs.refForm3.validate(function (valid) {
        validate = validate && valid;
      });
      if (!validate) {
        return;
      }
      const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      const preBackDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_BillCard.formdata.preBackDate));// 权证预计归还时间
      if (this.d1_BillCard.formdata.preBackDate && preBackDate < nowDate) {
      //  this.$xutils.showMsgBox('提示', '权证预计归还时间不能小于当前时间!');
      //  return;
      }
      var baseData = this.d1_BillCard.formdata;// 基本信息
      var guarWarrantInfo = this.d1_BillCard.formdata2;// 权证信息
      var inputData = this.d1_BillCard.formdata3;// 登记信息
      if (this.params && this.params.type == 'ADD') {
        yufp.extend(baseData, inputData);
      }
      baseData['guarWarrantInfo'] = guarWarrantInfo;
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/tempSave',
        method: 'post',
        data: baseData
      }).then((response) => {
        if (response.code === '0') {
          func && func();
          yufp.clone(this.d1_BillCard.formdata, this.params);
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    // 提交
    doComit () {
      let validate = false;
      this.d1_BillCard.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.commonSave(() => {
        let jsoPar = this.d1_BillCard.formdata;
        for (var i = 0; i < this.d1_BillCard.tableData.length; i++) {
          if (this.d1_BillCard.tableData[i].guarCusName != '' && this.d1_BillCard.tableData[i].guarCusName != null) {
            jsoPar['guarCusName'] = this.d1_BillCard.tableData[i].guarCusName;
            jsoPar['guarCusId'] = this.d1_BillCard.tableData[i].guarCusId;
            break;
          }
        }
        // 获取岗位
        let duty = '';
        const loginUser = this.$xutils.getLoginUserInfo();
        // 是否资产保全岗 0--否 1--是
        var isZcbq = '0';

        if (loginUser.dutys) {
          loginUser.dutys.forEach(item => {
            // FZH01 对公客户经理 FZH02 零售客户经理 XWB01小微客户经理 SGH21资产保全客户经理（寿光） DHH21 资产保全客户经理（东海）
            if (item.code == 'FZH01' || item.code == 'FZH02' || item.code == 'XWB01' || item.code == 'SGH21' || item.code == 'DHH21') { duty = item.code }

            if (item.code == 'DHH16' || item.code == 'SGH16') {
              isZcbq = '1';
            }
          });
        }

        // 权证出库
        if (jsoPar.warrantAppType == '02') {
          if (jsoPar.warrantOutType == '01' || jsoPar.warrantOutTypeSub == '01' || jsoPar.warrantOutTypeSub == '02' || jsoPar.warrantOutTypeSub == '03') {
            // 如果是结清出库、押品部分出库、押品置换出库、权证更新出库，则不走流程
            let param = {
              nodeId: '159_4'
            };
            var startdto = {};
            startdto.systemId = 'cmis';
            startdto.orgId = this.org.id;
            startdto.userId = this.userCode;
            startdto.bizType = 'DB008';
            startdto.bizId = jsoPar.serno;
            startdto.bizUserName = jsoPar.guarCusName;
            startdto.bizUserId = jsoPar.guarCusId;
            this.$refs.yufpNwfRisk.riskFn(param, startdto);
          } else {
            let wfInitData = {};
            wfInitData.systemId = 'cmis';
            wfInitData.orgId = this.org.id;
            wfInitData.userId = this.userCode;
            wfInitData.bizId = jsoPar.serno;
            wfInitData.bizType = this.getWfNo(wfInitData.orgId);
            wfInitData.bizUserName = jsoPar.guarCusName;
            wfInitData.bizUserId = jsoPar.guarCusId;
            wfInitData.param = {'duty': duty, guarNo: jsoPar.guarNo, warrantNo: jsoPar.warrantNo, certiState: '04', coreGuarantyNo: jsoPar.coreGuarantyNo, isZcbq: isZcbq};// 流程代办页面影像用};
            this.$refs.yufpNwfInit.wfInit(wfInitData);
          }
          // 权证续借
        } else {
          if (jsoPar.warrantOutType == '02' && (jsoPar.warrantOutTypeSub == '04' || jsoPar.warrantOutTypeSub == '05')) {
            let wfInitData = {};
            wfInitData.systemId = 'cmis';
            wfInitData.orgId = this.org.id;
            wfInitData.userId = this.userCode;
            wfInitData.bizId = jsoPar.serno;
            wfInitData.bizType = this.getWfNo(wfInitData.orgId);
            wfInitData.bizUserName = jsoPar.guarCusName;
            wfInitData.bizUserId = jsoPar.guarCusId;
            wfInitData.param = {'duty': duty, guarNo: jsoPar.guarNo, warrantNo: jsoPar.warrantNo, certiState: '07', coreGuarantyNo: jsoPar.coreGuarantyNo, isZcbq: isZcbq};// 流程代办页面影像用
            this.$refs.yufpNwfInit.wfInit(wfInitData);
          } else {
            this.$request({
              url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/warrantRenew',
              method: 'post',
              data: jsoPar.serno
            }).then((response) => {
              if (response.code === '0') {
                this.$xutils.showMsgBox('提示', '提交成功', 350, 150);
              } else {
                this.$xutils.showMsgBox('提示', response.message, 350, 150);
              }
            });
          }
        }
      });
    },

    saveData () {
      let jsoPar = this.d1_BillCard.formdata;
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/warrantOut',
        method: 'post',
        data: jsoPar.serno
      }).then((response) => {
        if (response.code === '0') {
          yufp.clone(this.d1_BillCard.formdata, this.params.guarCont);
          this.$xutils.showMsgBox('提示', '提交成功', 350, 150, () => {
            this.onClose();
          });
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    getWfNo (orgId) {
      let jsoPar = this.d1_BillCard.formdata;
      var wfNo = '';
      // DB006权证出库（非诉讼原因借阅）
      // DB007权证出库（诉讼原因借阅）
      // DB008权证出库（其他）
      // DB010权证续借（非诉讼原因）
      // DB011权证续借（诉讼原因）
      if (jsoPar.warrantAppType == '02') {
        if (jsoPar.warrantOutTypeSub == '04') {
          if (orgId && orgId.substring(0, 2) == '80') {
            wfNo = 'SGI02';
          } else if (orgId && orgId.substring(0, 2) == '81') {
            wfNo = 'DHI02';
          } else {
            wfNo = 'DB007';
          }
        } else if (jsoPar.warrantOutTypeSub == '05') {
          if (orgId && orgId.substring(0, 2) == '80') {
            wfNo = 'SGI01';
          } else if (orgId && orgId.substring(0, 2) == '81') {
            wfNo = 'DHI01';
          } else {
            wfNo = 'DB006';
          }
        } else if (jsoPar.warrantOutTypeSub == '99') {
          wfNo = 'DB008';
        }
      } else if (jsoPar.warrantAppType == '03') {
        if (jsoPar.warrantOutTypeSub == '04') {
          if (orgId && orgId.substring(0, 2) == '80') {
            wfNo = 'SGI04';
          } else if (orgId && orgId.substring(0, 2) == '81') {
            wfNo = 'DHI04';
          } else {
            wfNo = 'DB011';
          }
        } else if (jsoPar.warrantOutTypeSub == '05') {
          if (orgId && orgId.substring(0, 2) == '80') {
            wfNo = 'SGI03';
          } else if (orgId && orgId.substring(0, 2) == '81') {
            wfNo = 'DHI03';
          } else {
            wfNo = 'DB010';
          }
        }
      }
      return wfNo;
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
