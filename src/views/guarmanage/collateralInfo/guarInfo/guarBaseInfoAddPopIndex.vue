<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import { mapState } from 'vuex';
import d1Billcard from './guarBaseInfoAddPop_d1_BillCard.vue';

/* 下一步按钮*/
export default {
  components: { d1Billcard, mapState},
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
    this.afterInit();
  },
  methods: {
    /**
        押品信息新增向导
      */
    // var par=jsoOpenPars;
    afterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 自动添加流水号
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    doNextStep () {
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const _this = this;
      // 判断必输项
      var validate = false;
      // 标签名 _this.$refs. 后面的是 ref="cusCorpBase" 属性
      _this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const grtFlag = this.d1_BillCard.getItemValue('grtFlag');
      // 获取登入信息
      const loginUserInfo = this.$xutils.getLoginUserInfo();
      const dataParams = {};
      let flag = -1;
      loginUserInfo.roles.every(function (_item, _index) {
        // 如果是小企业客户经理R0050，综合客户经理R0020走集中作业
        if (_item.code == 'R0050' || _item.code == 'R0020') {
          flag = 1;
          return true;
        } else { return false }
      });
      // 如果是村镇银行不走集中作业
      this.orgCodeSu = loginUserInfo.org.code.substring(0, 2);
      if (this.orgCodeSu == '80' || this.orgCodeSu == '81') {
          flag = -1;
      }
      // SystemNo 请求的系统标识 01-信贷系统  02-小贷系统
      if (flag == 1) { dataParams['SystemNo'] = '01' } else { dataParams['SystemNo'] = '02' }
      this.$dialog.closeAll();
      // 押品类型  01抵押，02质押   flag=1 为对公
      if (grtFlag != '' && grtFlag == '01' && flag == 1) {
        jsoPar['op'] = 'ADD';
        jsoPar['oprType'] = '01';
        this.route(jsoPar);
      } else if (grtFlag != '' && (grtFlag == '02' || flag == -1)) {
        yufp.clone(jsoPar, dataParams);
        // params['SystemFlag'] = '01';
        // 担保方式标识 BZ-保证 DY-抵押 ZY-质押
        if (grtFlag == '02') {
          dataParams['GuarWay'] = 'ZY';
        } else if (grtFlag == '01') {
          dataParams['GuarWay'] = 'DY';
        }
        dataParams['callMethod'] = 'tGuarExistQry';
        dataParams.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        dataParams.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      //  const url = this.getGuarSysUrl(dataParams);
      //  window.open(url, '_black');
        jsoPar['op'] = 'ADD';
        jsoPar['oprType'] = '01';
        this.route(jsoPar);
      }
    },
    route (jsonData) {
      var _this = this;
      var json = {};
      yufp.clone(jsonData, json);
      const name = 'guarmanage/collateralInfo/guarInfo/guarBaseInfoDetailIndex';
      const key = 'guarBaseInfoDetailIndex' + new Date().getTime();
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '押品信息',
        // 传递的业务数据，可选配置
        data: json
      });
    },
    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    },
    /*
      获取跳转押品系统url
       */
    getGuarSysUrl (params) {
      const rsPars = {};
      const _this = this;
      _this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }
          if (response.code != '0') {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },
        error: (result, status, errorThrown) => {
          _this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        _this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    }
  }
};
</script>
