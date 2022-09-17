<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      curCompoments: {}
    };
  },
  created () {
    this.afterInit();
  },
  methods: {
    /* 押品信息录入流程主界面
     * @author lq
     * */
    afterInit () {
      let serno = '';
      // 获取流水号
      if (this.bizPageData) {
        serno = this.bizPageData.instanceInfo.bizId;
      } else {
        serno = this.pageParams.flowData.instanceInfo.bizId;
      }
      this.queryData(serno);
    },
    queryData (serno) {
      const _this = this;
      const json = { oprType: '01', serno: serno };
      _this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/guarbaseinfo/all',
        data: {condition: JSON.stringify(json)},
        success: (response, status, xhr) => {
          if (response.code == 0) {
            const list = response.data;
            const jsonData = {};
            yufp.clone(list[0], jsonData);
            _this.onView(jsonData);
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });
    },
    onView (params) {
      const grtFlag = '01';
      if (grtFlag != '' && grtFlag == '01') {
        // 01抵押  02质押
        let modelGroupNo = '';
        let guarTypeCdFlag = '' + params.guarTypeCd;
        if (guarTypeCdFlag.length < 7) {
          this.$xutils.showMsgBox('提示', '抵质押物类型异常!');
        }
        // 截取担保分类代码的前六位,获取担保二级码值
        guarTypeCdFlag = guarTypeCdFlag.substring(0, 6);
        switch (guarTypeCdFlag) {
        case 'DY0801':
          modelGroupNo = 'CMG000372';
          break;
        case 'DY0601':
        case 'DY0602':
        case 'DY0603':
          modelGroupNo = 'CMG000367'; // DY0601  DY0602 DY0603  在建工程
          break;
        case 'DY0501':
          modelGroupNo = 'CMG000364'; // DY0501  机器设备
          break;
        case 'DY0299':
          modelGroupNo = 'CMG000362'; // DY0299 其他使用权
          break;
        case 'DY0201':
          modelGroupNo = 'CMG000371'; // DY0201 建筑用地使用权
          break;
        case 'DY0199':
          modelGroupNo = 'CMG000363'; // DY0199 其他用房
          break;
        case 'DY0102':
          modelGroupNo = 'CMG000369'; // DY0102  商业用房
          break;
        case 'DY0101':
          modelGroupNo = 'CMG000368'; // 11601   居住用房
          break;
        case 'DY0103':
          modelGroupNo = 'CMG000369'; // DY0103  工业用房
          break;
        default:
          modelGroupNo = '';
        }
        params['model_group_no'] = modelGroupNo;
        params['op'] = 'VIEW';
        // params["serno"] = params.serno;
        // this.$dialog.open(
        //   '新增押品信息',
        //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        //   -1,
        //   -1,
        //   _params,
        //   null,
        //   true,
        //   true
        // );
        this.route(params);
      } else {
        const url = this.getGuarSysUrl(params.guarNo, params.gftFlag);
        // 跳转至押品系统
        // this.$xutils.getTopWindow().addTabbItem('IM0000', '押品系统', '押品系统', 'HTTPURL', url, true, true);
        this.$router.addTab({
          name: url,
          key: 'custom_' + url + new Date().getTime(),
          title: '押品系统'
        });
      }
    },

    route (jsonData) {
      var _this = this;
      var json = {};
      let name = '';
      let key = '';
      yufp.clone(jsonData, json);
      const modelGroupNo = json.model_group_no;
      if (modelGroupNo == 'CMG000367') {
        // 13004  12004 11004  在建工程
        name = 'zrcbank/cus/cuscom/guarTemp/guarInfBuilProject';
        key = 'guarInfBuilProject';
      } else if (modelGroupNo == 'CMG000372') {
        // 11005  存货
        name = 'zrcbank/cus/cuscom/guarTemp/guarCargoPledge';
        key = 'guarCargoPledge';
      } else if (modelGroupNo == 'CMG000364') {
        // 11003  机器设备
        name = 'zrcbank/cus/cuscom/guarTemp/guarMachEqui';
        key = 'guarMachEqui';
      } else if (modelGroupNo == 'CMG000362') {
        // 12502  12302  12202  12102 其他使用权
        name = 'zrcbank/cus/cuscom/guarTemp/guarUsufLand';
        key = 'guarUsufLand';
      } else if (modelGroupNo == 'CMG000356') {
        // 12402 其他使用权 (林业权)
        name = 'zrcbank/cus/cuscom/guarTemp/guarUsufLand02';
        key = 'guarUsufLand02';
      } else if (modelGroupNo == 'CMG000371') {
        // 11502  11402  11302  11202 11102 建筑用地使用权
        name = 'zrcbank/cus/cuscom/guarTemp/guarBuildUse';
        key = 'guarBuildUse';
      } else if (modelGroupNo == 'CMG000363') {
        // 14101  其他用房
        name = 'zrcbank/cus/cuscom/guarTemp/guarOtherHouse';
        key = 'guarOtherHouse';
      } else if (modelGroupNo == 'CMG000369') {
        // 12201  12701 12601 12501  12401    12301  12101 商业用房
        name = 'zrcbank/cus/cuscom/guarTemp/guarBusinessIndustry';
        key = 'guarBusinessIndustry';
      } else if (modelGroupNo == 'CMG000368') {
        // 11601  11501  11401  11301  11201  11101  居住用房
        name = 'zrcbank/cus/cuscom/guarTemp/guarLivingRoom';
        key = 'guarLivingRoom';
      } else if (modelGroupNo == 'CMG000370') {
        // 11501 居住用房(车库)
        name = 'zrcbank/cus/cuscom/guarTemp/guarLivingRoom02';
        key = 'guarLivingRoom02';
      } else if (modelGroupNo == 'CMG000366') {
        // 13401  13301  13201  13101  工业用房
        name = 'zrcbank/cus/cuscom/guarTemp/guarBusinessIndustry02';
        key = 'guarBusinessIndustry02';
      }
      this.curCompoments = (() => require('@/views/' + name).default)();
      // json.key = `/${name}/${key}`;
      // // _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
      // _this.$router.addTab({
      //   // 路由名称
      //   name: name,
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: key, // 必传
      //   // 页签名称
      //   title: '押品信息',
      //   // 传递的业务数据，可选配置
      //   data: json
      // });
    },
    // 上传影像
    upload () {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // alert("上传影像");
    },
    // 跳转押品系统
    jump () {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      let gftFlag = '';

      if (params.grtFlag == '01') {
        gftFlag = 'DY';
      } else if (params.grtFlag == '02') {
        gftFlag = 'ZY';
      } else {
        this.$xutils.showMsgBox('提示', '押品类型异常!');
        return;
      }

      const url = this.getGuarSysUrl(params.guarNo, gftFlag);

      // 跳转至押品系统
      // this.$xutils.getTopWindow().addTabbItem("IM0000", "押品系统", "押品系统", "HTTPURL", url, true, true);
      this.$router.addTab({
        name: url,
        key: 'custom_' + url + new Date().getTime(),
        title: '押品系统'
      });
    },

    /*
      获取跳转押品系统url
       */
    getGuarSysUrl (guarNo, gftFlag) {
      const rsPars = {};
      const params = {};

      // 请求的系统标识 01-对公系统 02-个贷系统
      // 需根据客户经理角色进行区分
      // TODO
      params['SystemFlag'] = '01';

      // 请求的系统标识 01-信贷系统  02-小贷系统
      params['SystemNo'] = '01';

      // 担保方式标识 BZ-保证 DY-抵押 ZY-质押
      params['GuarWay'] = gftFlag;

      // 数据修改标识 01-正常修改 02-期房换证入库修改 03-需走数据修改流程的修改 04-特殊业务及期房换证修改
      params['DataFlag'] = '01';

      // 押品编号
      params['GuarNo'] = guarNo;

      // 请求参数
      const reqParams = {
        // 押品新增页面
        callMethod: 'tGuarExistQry',

        parameter: params
      };

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(reqParams, true)),

        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }

          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
            rsPars['handleFlag'] = false;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            '提示',
            '错误代码：' + result.status + '；错误信息1：' + errorThrown
          ); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    },

    /*
      获取跳转影像系统url
       */
    getImageSysUrl () {
      // 参数未完善 //TODO
      // alert("影像系统");
      // return;
      const repData = this.getImageSysToken();
      const rsPars = {};
      // 请求参数
      const reqParams = {
        authority: '',
        authorization: '',
        para: {
          index: {},
          outsystem_code: '',
          top_outsystem_code: ''
        },
        prefixUrl: '',
        s: ''
      };

      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getImageSysUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(reqParams, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
            rsPars['handleFlag'] = false;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            '提示',
            '错误代码：' + result.status + '；错误信息1：' + errorThrown
          ); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '影像系统打开失败', 350, 200, null);
      }
    },

    /*
      获取影像系统token
       */
    getImageSysToken () {
      let rsPars = {};
      const jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      const useName = jsoUser['loginCode']; // 主办人
      const passWord = useName;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        url:
          this.$backend.cmisBiz +
          '/api/guarbaseinfo/getImageSysToken/' +
          useName +
          '/' +
          passWord,
        data: '',

        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }

          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
            rsPars['handleFlag'] = false;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox(
            '提示',
            '错误代码：' + result.status + '；错误信息1：' + errorThrown
          ); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转影像系统失败', 350, 200, null);
      }
    }
  },
  render (h) {
    return (
      <div>
        {h(this.curCompoments)}
      </div>
    );
  }
};
</script>
