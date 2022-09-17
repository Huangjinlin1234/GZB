<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yufpNwfInit ref="yufpNwfInit" @success-click="doCancel"></yufpNwfInit>
  </div>
</template>
<script>
import d1Billcard from './cusGrpAppUpdate_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { d1Billcard, yufpNwfInit },
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
      集团客户认定申请修改
      */
    AfterInit () {
      let _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 获取传入参数
      let serno = '';
      if (this.getFactory().contextData.instanceInfo) {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      } else {
        serno = this.getFactory().contextData.serno;
      }
      if (this.getFactory().contextData.op == 'view' || (this.getFactory().contextData.flowParam && this.getFactory().contextData.flowParam.op == 'view')) {
        this.d1_BillCard.setItemEditable('*', false);
        this.getFactory().setButtonVisiable('tempSave', false);
        this.getFactory().setButtonVisiable('save', false);
        this.getFactory().setButtonVisiable('commit', false);
      }
      yufp.service.request({
        method: 'post',
        url: this.$backend.cmisCus + '/api/cusgrpapp/' + serno,
        callback: function (code, message, response) {
          if(response.code == '0'){
            _this.d1_BillCard.setBillCardValue(response.data);
            _this.getFactory().triggerAction(response.data);
          }else{
            _this.$message({ message: '查询基础数据失败！', type: 'error' });
          }
        }
      });
      // this.d1_BillCard.queryDataByCondition({ serno: serno }, null, (respData) => {
        
      //   // 传输集团紧密程度
      //   // this.getFactory().contextData.grpCloselyDegree = this.d1_BillCard.getBillCardItemValue('grpCloselyDegree');
      //   // this.getFactory().contextData.grpNo = this.d1_BillCard.getBillCardItemValue('grpNo');
      // });

      // // 解散 处理申请申请原因可编辑，其余全部不可以编辑
      // if (this.getFactory().contextData.appType == '03' && this.getFactory().contextData.op != 'view') {
      //   // 设置未只读
      //   this.d1_BillCard.setItemEditable('*', false);

      //   this.d1_BillCard.setBillCardItemEditable('appResn', true);
      // }
    },

    /* 返回按钮*/
    doCancel () {
      this.getFactory().back();
    },

    // 调用暂存方法
    doTempSave () {
      // 暂存方法
      // const rst = this.d1_BillCard.tempUpdateBillCardData();
      
      this.updateUrl = this.$backend.cmisCus + '/api/cusgrpapp/update';
      var jsoCardData = this.d1_BillCard.getBillCardValue(); // 先取得表单的数据
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: jsoCardData
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          // jsoRt = response;
          this.$message({message: '暂存成功!', type: 'success'});
          return "success";
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '暂存失败', type: 'error' });
        return "fail";
      });
    },

    // 提交操作
    doSubmit () {
      let saveFlag = false;
      this.d1_BillCard.$refs.refForm.validate(function (valid) {
        saveFlag = valid;
      });
      if (!saveFlag) {
        return;
      }
      var _this = this;
      // 表单保存
      
      var rst = this.doTempSave();

      if (rst == "fail") {
        return;
      }

      let bizType = 'KH008';
      if (this.d1_BillCard.formdata.appType == '02' && this.d1_BillCard.op != 'view') {
        bizType = 'KH009';
      } else if (this.d1_BillCard.formdata.appType == '03' && this.d1_BillCard.op != 'view') {
        bizType = 'KH010';
      }
      const loginUser = this.$xutils.getLoginUserInfo();
      let dutysArry = []; //  loginUser.dutys
      if(loginUser.dutys === null){
          _this.$message({ message: "流程发起者无岗位信息，无法提交流程！", type: "error" });
          return;
      }
      for(let i = 0; i < loginUser.dutys.length; i++){
        dutysArry.push(loginUser.dutys[i].code);
      }

      if (dutysArry.indexOf("SGH01") > -1 || dutysArry.indexOf("SGH16") > -1 || dutysArry.indexOf("SGH21") > -1 || dutysArry.indexOf("DHH01") > -1 || dutysArry.indexOf("DHH16") > -1 || dutysArry.indexOf("DHH21") > -1) {
        this.sumbit4Town(this.d1_BillCard.getItemValue('serno'), bizType);
      } else {
        // 提交流程
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.code;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = bizType;
        startdto.bizId = this.d1_BillCard.getItemValue('serno');
        startdto.bizUserName = this.d1_BillCard.getItemValue('grp_name');
        startdto.bizUserId = this.d1_BillCard.getItemValue('grp_no');
        startdto.param = {
          dutys: dutysArry.join(',')
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },

    sumbit4Town(serno, bizType) {
      this.$request({
        url: this.$backend.cmisCus + '/api/cusgrpapp/cusgrpapp4town',
        method: 'post',
        data: {serno: serno, bizType: bizType},
      }).then((response) => {
        if (response.code === '0') {
          this.$xutils.showMsgBox('提示', '提交成功', 350, 150, () => {
            this.$dialog.closeAll();
          });
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    onClose () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
