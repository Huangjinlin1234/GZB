<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './guarntrList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       *
       保证人信息台账
       *  @author 刘权
       */
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },
    // 查看详情
    viewDetail () {
      let params = this.d1_BillList.getSelectedRowData();
      console.info('params---------------', JSON.stringify(params))
      if (!params || params.length === 0) {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      const dataParams = {
        op: 'details',
        grtFlag: '03',
        GuarWay: 'BZ',
        callMethod: 'tGuarDetailInfo',
        managerBrId: this.$xutils.getDefaultformulaData('$LoginOrgCode'),
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        SystemNo: '01',
        guarNo: params.guarantyIdNew
      };
    //  this.$utils.clone(params[0], dataParams);
    //  const url = this.getGuarSysUrl(dataParams);
    //  window.open(url, '_black');
        this.route(dataParams);
    },
    route (jsonData) {
      var _this = this;
      var json = {};
      // yufp.clone(jsonData, json);
      json.serno = jsonData.guarNo;
      const name = 'guarmanage/collateralInfo/guarInfo/guarBaseInfoDetailIndex';
      const key = 'guarBaseInfoDetailIndex' + new Date().getTime();
      json.key = `/${name}/${key}`;
      json.op = jsonData.op;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '押品信息管理',
        // 传递的业务数据，可选配置
        data: json
      });
    },
    /*
      获取跳转押品系统url
       */
    getGuarSysUrl (params) {
      const rsPars = {};
      this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    }
  }
};
</script>
