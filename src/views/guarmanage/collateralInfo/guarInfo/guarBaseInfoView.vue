<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'GuarBaseinfoView',
  props: {
  },
  data () {
    return {
    };
  },
  methods: {
    // 根据押品号查看押品详情  公共方法
    guarBaseinfoView (guarNo) {
      this.$request({
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarBaseInfoByGuarNo',
        method: 'post',
        data: guarNo
      }).then((response) => {
        if (response.code == '0') {
          this.onView(response.data);
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
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
    },
    // 查看
    onView (data) {
      if (data == null) {
        this.$xutils.showMsgBox('提示', '该押品信息不存在!');
        return;
      }

      let params = '';
      params = data;
      if (params.grtFlag != '' && (params.grtFlag == '01' || params.grtFlag == '02')){
        // 跳转至押品系统
        params['callMethod'] = 'tGuarDetailInfo';
        params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      //  this.goToYpSys(params);
        params['op'] = 'details';
        this.route(params);
      } else {
      //  this.$xutils.showMsgBox('提示', '押品信息异常，抵质押标识为空!');
      //  return;
      }
    },
    /** 跳转押品系统 */
    goToYpSys (paramDats) {
      paramDats.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      paramDats.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');

      const url = this.getGuarSysUrl(paramDats);
      window.open(url, '_blank');
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
    }
  }
};
</script>
