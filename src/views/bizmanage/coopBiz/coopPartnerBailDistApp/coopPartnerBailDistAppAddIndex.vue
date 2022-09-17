<template>
  <yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="合作方案信息" name="cooPlanApp">
      <d1-billcard ref="billCard" :operate="operate"></d1-billcard>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史" name="coopApproval">
        <coop-approval :params="param"></coop-approval>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d1Billcard from './coopPartnerBailDistAppAdd_d1_BillCard.vue';
import coopApproval from '../coopApproval/coopApprovalIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {d1Billcard, coopApproval},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      activeName: 'cooPlanApp',
      billCard: null,
      param: {},
      operate: ''
    };
  },
  created(){
    if (this.bizPageData) {
      this.param.serno = this.bizPageData.instanceInfo.bizId;
    }else {
      this.param.serno = this.pageParams.serno;
    }
  },
  mounted () {
    if (this.bizPageData) {
      this.operate = 'details';
      let serno = this.bizPageData.instanceInfo.bizId;
      this.billCard = this.$refs.billCard;
      this.initCardData(serno);
    } else {
      this.afterInit();
    }
  },
  methods: {
    // 保证金提取管理  新增、修改明细
    afterInit () {
      this.param = this.pageParams;
      this.operate = this.param.operate;
      this.billCard = this.$refs.billCard;
      if (this.operate == 'add') {        
        const serno = this.$xutils.getSEQWithParamFromServer('COOP_SERNO');
        const userInfo = this.$xutils.getLoginUserInfo();
        this.billCard.setItemValue('apprStatus', '000');// 登记人
        this.billCard.setItemValue('serno', serno);// 登记人
        this.billCard.setItemValue('inputId', userInfo.loginCode);// 登记人
        this.billCard.setItemValue('inputBrId', userInfo.orgCode);// 登记机构
        this.billCard.setItemValue('inputDate', this.$xutils.dateFormat('yyyy-MM-dd', new Date()));// 登记日期
        this.billCard.setItemValue('updId', userInfo.loginCode);// 更新人
        this.billCard.setItemValue('updBrId', userInfo.orgCode);// 更新机构
        this.billCard.setItemValue('updDate', this.$xutils.dateFormat('yyyy-MM-dd', new Date()));// 更新日期
        this.billCard.setItemValue('inputIdName', userInfo.loginName);// 登记人名称
        this.billCard.setItemValue('inputBrIdName', userInfo.org.name);// 登记机构名称
      } else {
        this.billCard.setBillCardValue(this.param);
      }
    },
    doSave (type) {
      const _this = this;
      const result = this.billCard.validateBillCardValue();
      if (!result) {
        return false;
      }
      // 查询是否已存在
      let isExist = this.getIsExist(this.billCard.formdata.serno);
      if (isExist) {
        this.operate = 'EDIT';
      }
      var bailAccLowAmt1 = this.billCard.formdata.bailAccLowAmt;//保证金账户最低金额(元)
      var bailAccLowAmt2 = parseFloat(this.billCard.formdata.bailPerc) * parseFloat(this.billCard.formdata.curtGrtBal);//在保余额*保证金缴存比例
      var bailAccLowAmt = bailAccLowAmt1 > bailAccLowAmt2 ? bailAccLowAmt1 : bailAccLowAmt2;
      var bailAccNoBal = this.billCard.formdata.bailAccNoBal;//保证金账户余额(元)
      var canDistAmt = bailAccNoBal - bailAccLowAmt;//可提取金额(元)
      var curtDistAmt = this.billCard.formdata.curtDistAmt;//本次提取金额（元）
      if(canDistAmt < curtDistAmt){
        this.$xutils.showMsgBox('提示', '本次提取金额【' + curtDistAmt + '】大于可提取金额【' + canDistAmt + '】', '350', '150');
        return false;
      }
      // 若合作方近三个工作日内有保证金提取审批通过记录，再次申请保证金提取时进行提醒
      var jsoPar = {};
      var condition = {};
      condition['partnerName'] = this.billCard.formdata.partnerName;
      condition['apprStatus'] = '997';
      jsoPar = { condition: JSON.stringify(condition), sort: 'upd_date desc' };
      console.log(jsoPar);
      var validateDays = true;
      yufp.service.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/',
        method: 'GET',
        data: jsoPar,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let data = response.data;
            if (data != null && data.length > 0) {
              var updDate = data[0].updDate;
              updDate = new Date(updDate.replace(/--/g, '/'));
              var now = new Date();
              var days = parseInt(now.getTime() - updDate.getTime()) / (1000 * 60 * 60 * 24);
              if (days <= 3) {
                validateDays = false;
              }
            } else {
              validateDays = true;
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message, '350', '150');
          }
        }
      });
      if (!validateDays) {
        _this.$confirm('合作方近三个工作日内有保证金提取审批通过记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              if (_this.operate == 'add') {
                _this.billCard.saveBillCardData();
              } else {
                _this.billCard.updateBillCardData();
              }
              if (type == 'submit') {
                _this.confirmCommit();
              }
            }
          }
        });
      } else {
        if (_this.operate == 'add') {
          _this.billCard.saveBillCardData();
        } else {
          _this.billCard.updateBillCardData();
        }
        if (type == 'submit') {
          _this.confirmCommit();
        }
      }
      return true;
    },
    btn () {
      const bailAccCo = this.billCard.getItemValue('bailAccNo');// 保证金账号
      const bailAccNoSubSeq = this.billCard.getItemValue('bailAccNoSubSeq');// 保证金账号子序号
      if (!bailAccCo || !bailAccNoSubSeq) {
        this.$xutils.showMsgBox('提示', '保证金账号及子序号必输！'); // 弹出提示
        return;
      }
      // 保证金账户余额(元)
      this.billCard.setItemValue('bailAccNoBal', 300);
      // 当前已担保余额(元)
      this.billCard.setItemValue('curtGrtBal', 200);
      // 可提取保证金金额(元)
      this.billCard.setItemValue('allowDistBailAmt', 100);
      // var rsPars = {};
      // YuXPUtil.AJAX({
      //     async: false, // 同步请求
      //     url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/tempresource/getcusid/' + commen_owner_name + '/' + commen_owner_cert_code,
      //     data: JSON.stringify(),
      //     success: function (response, status, xhr) {
      //         console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
      //         if (response.data != null) {
      //             rsPars['data'] = response.data;
      //         }
      //     },
      //     error: function (result, status, errorThrown) {
      //         YuXP.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.responseJSON.message); // 弹出提示
      //         rsPars['handleFlag'] = false;
      //     }
      // });
      // if (rsPars.data != null || rsPars.data != "") {//ajax返回值正常
      //     billCard.setItemValue('commen_owner_cus_id', rsPars.data)// 将查出的值填充到共有人客户编号中
      //     return;
      // } else {
      //     YuXP.showMsgBox('提示', '若未查询到客户，则跳转到客户快捷创建页面'); // 弹出提示
      //     return;
      // }
    },
    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },
    initCardData (serno) {
      let _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/' + serno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.billCard.setBillCardValue(response.data);
          } else {
            _this.$message({type: 'error', message: '加载业务表单数据失败'});
          }
        }
      });
    },
    commitFn () {
      var _this = this;
      const result = this.billCard.validateBillCardValue();
      if (!result) {
        return false;
      }
      // 保存数据
      this.doSave('submit');      
    },   
    confirmCommit () {     
      const params = this.billCard.getBillCardValue();    
      var bizType = 'HZ017';
      const approveStatus = params.apprStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【退回】且经办人是自己的数据可以提交!');
        return;
      } else {
        // 选择一条满足条件的申请，点击提交，进行以下：
        const loginUser = this.$xutils.getLoginUserInfo();
        const dutys = loginUser.dutys;
        var duty = '';
          for (let i = 0; i < dutys.length; i++) {
            // 如果是SGH01（寿光客户经理）或DHH01（东海客户经理），则是村镇银行客户经理)
            if (dutys[i].code == 'SGH01' || dutys[i].code == 'DHH01') {
              duty = dutys[i].code;
              break;
            }
          }
        if (loginUser.org.code.substring(0, 2) == '80' && duty == 'SGH01') {
          // 寿光村镇 合作方保证金提取-分支机构（寿光）
          bizType = 'SGB07';
        } else if (loginUser.org.code.substring(0, 2) == '80') {
          // 寿光村镇 合作方保证金提取-普惠金融部（寿光）
          bizType = 'SGB14';
        } else if (loginUser.org.code.substring(0, 2) == '81' && duty == 'DHH01') {
          // 东海村镇 合作方保证金提取-分支机构（东海）
          bizType = 'DHB07';
        } else if (loginUser.org.code.substring(0, 2) == '81') {
          // 东海村镇 合作方保证金提取-普惠金融部（东海
          bizType = 'DHB14';
        } else {
          bizType = 'HZ017';
        }
        const startdto = {
          'systemId': 'cmis',
          'orgId': loginUser.org.code,
          'bizId': params.serno,
          // 流程申请类型会自动创建队列
          'bizType': bizType,
          'userId': loginUser.loginCode,
          // 客户名称
          'bizUserName': params.partnerName,
          // 客户编号
          'bizUserId': params.partnerNo
        };
        this.$refs.billCard.$refs.yufpNwfInit.wfInit(startdto);
      }       
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.$dialog.closeAll();
    },
    getIsExist (serno) {
      let resultData = false;
      let _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/' + serno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data != null) {
              resultData = true;
            }
          }
        }
      });
      return resultData;
    }
  }
};
</script>
