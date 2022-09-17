<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusGrpAppChgAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
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
    // 核心客户选取，可以选择对公或者同业
    onAdd () {
      // 打开选取页面
      this.$dialog.open(
        '',
        'cusmanage/cusgrp/cusgrpapp/cusGrpSelectIndex',
        800,
        600,
        {},
        data => {
          // 插入选取返回的客户编号，客户名称
          // 判断是否正式客户 20 正式客户
          // if (data.groupCusStatus != '01') {
          //   this.$xutils.showMessage('集团不是生效状态！');
          //   return;
          // }
          yufp.extend(this.d1_BillCard.formdata, data);
          this.d1_BillCard.formdata.sociCredCode = data.socialCreditCode;
          this.setGrpNature();
        }
      );
    },
    /*
      集团客户变更新增页面
      */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 默认 执行加载公式，默认公式
      this.d1_BillCard.execBillCardDefaultValueFormula();

      const appType = this.pageParams.appType;
      this.d1_BillCard.setBillCardItemValue('app_type', appType);
    },

    // 下一步方法 执行保存，并跳转下一个页面
    doNextStep () {
      const appType = this.pageParams.appType;

      if (this.checkInWayCusGrpApp()) {
        // 保存数据
        const rst = this.d1_BillCard.saveBillCardData();
        this.$request({// 变更时主表成员客户信息转存到申请表
          url: this.$backend.cmisCus + '/api/cusgrpmemberapp/getMemberFromRel',
          method: 'POST',
          data: this.d1_BillCard.formdata
        });

        // 保存成功
        if (rst) {
          // 集团认定详情展示组合模板
          const cardValue = this.d1_BillCard.getBillCardValue();
          let params = {};
          yufp.clone(cardValue, params);
          var title = '';
          if (appType == '03') {
            params['model_group_no'] = 'CMG000245';
            params['appType'] = '03';
            title = '集团客户解散';
            params['op'] = 'update';
            params['appTypeOp'] = 'add';
          } else {
            params['model_group_no'] = 'CMG000307';
            params['appType'] = '02';
            title = '集团客户变更';
            params['op'] = 'update';
          }
         
          this.$dialog.open(title, 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, params);
        }
      }
    },
    //设置集团性质
    setGrpNature () {
      // 当前登录用户信息
      const jsoUser = this.$xutils.getLoginUserInfo();
      //根据角色获取集团性质：投资经理-R0100:02 投资集团;否则01 法人集团
      let grp_nature = '01';
      const roles = jsoUser['roles'];
      for (let key in roles) {
        if (roles[key].code == 'R0100') {
          grp_nature = '02';
          break;
        }
      }
       this.d1_BillCard.formdata.grpNature = grp_nature;
    },

    // 返回方法
    onCancel () {
      // 关闭当前页面
      this.$dialog.close(this.dialogId);
    },

    // 调用校验方法，校验该集团是否存在在途变更或解散申请
    checkInWayCusGrpApp () {
      let flag = false;
      const param = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCus + '/api/cusgrpapp/checkcusgrpappinway',
        data: JSON.stringify(this.$xutils.toUpperCase(param, true)),

        success: (response, status, xhr) => {
          const data = response.data;

          if (data.rtnCode == 'ECS040000') {
            flag = true;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + data.rtnCode + ',错误信息：' + data.rtnMsg, 350, 200, () => {
              flag = false;
            });
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('错误代码：' + result.rtnCode + ',错误信息：' + result.rtnMsg, 350, 200); // 弹出提示
        }
      });

      return flag;
    },
  }
};
</script>
