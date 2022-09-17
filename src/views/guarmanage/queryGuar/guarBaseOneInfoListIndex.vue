<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './guarBaseOneInfoList_d1_BillList.vue';
/* 押品信息管理主界面
 * @author lq
 * */
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillList: null,
      serno: '',
      reflush: false
    };
  },
  activated () {
    if (this.d1BillList != null && this.reflush) {
      this.d1BillList.queryDataByCondition({ oprType: '01' });
    }
    this.reflush = true;
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillList = this.$refs.d1_BillList;
    },

    onAdd () {
      this.$dialog.open(
        '新增向导',
        'guarmanage/collateralInfo/guarInfo/guarBaseInfoAddPopIndex',
        '-1',
        '-1',
        null,
        this.close,
        true,
        true
      );
    },
    /** 修改* */
    onUpdate () {
      let params = this.d1BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      if (!(params.approveStatus == '000' || params.approveStatus == '992' || params.approveStatus == '' || params.approveStatus == null)) {
        this.$xutils.showMsgBox('提示', '只有待发起状态或打回状态的才能修改!', 350, 150);
        return;
      }
      // 获取登入信息
      const loginUserInfo = this.$xutils.getLoginUserInfo();
      let flag = -1;
      loginUserInfo.roles.every(function (_item, _index) {
        // 如果是小微客户经理
        // SystemNo 请求的系统标识 01-信贷系统  02-小贷系统
        if (_item.code == 'R0020') {
          flag = 1;
          return true;
        } else { return false }
      });
      this.serno = params.serno;
      if (flag == 1) { params['SystemNo'] = '01' } else { params['SystemNo'] = '02' }
      // 待加客户经理是否对公客户经理的判断
      if (params.grtFlag != '' && params.grtFlag == '01' && flag == 1) {
        // 01抵押  02质押
        let guarTypeCdFlag = '' + params.guarTypeCd;
        if (guarTypeCdFlag.length < 7) {
          this.$xutils.showMsgBox('提示', '抵质押物类型异常!');
        }
        // 截取担保分类代码的前六位,获取担保二级码值
        params['op'] = 'edit';
        this.route(params);
      } else if (params.grtFlag != '' && (params.grtFlag == '02' || flag == -1)) {
        // 担保方式标识 BZ-保证 DY-抵押 ZY-质押
        if (params.grt_flag == '02') {
          params['GuarWay'] = 'ZY';
        } else if (params.grt_flag == '01') {
          params['GuarWay'] = 'DY';
        }
        // 业务关联流水号
        // params['busNo'] = params.serno;
        // 跳转至押品系统  tGuarUpdate
        params['callMethod'] = 'tGuarUpdate';
        this.goToYpSys(params);
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
      json.serno = jsonData.serno;
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

    /** 删除 */
    onDelete () {
      const _this = this;
      const params = _this.d1BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 审批状态为 000待发起 992打回  才能删除
      if (!(params.approveStatus == '000' || params.approveStatus == '992' || params.approveStatus == null || params.approveStatus == '')) {
        _this.$xutils.showMsgBox(
          '提示',
          '只有待发起状态或打回状态的才能删除! ',
          350,
          200,
          () => {
            _this.d1BillList.queryDataByCondition({ oprType: '01' });
          }
        );
        return false;
      }
      params.oprType = '02';
      _this.$xutils.request({
        // 同步请求
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/guarbaseinfo/update/',
        data: params,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.$xutils.showMsgBox('提示', '删除成功', 350, 200, () => {
              _this.d1BillList.queryDataByCondition({ oprType: '01' }); // opr_type='01'
            });
          } else {
            _this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        },
        error: (result, status, errorThrown) => {
          _this.$xutils.showMsgBox(
            '提示',
            '错误代码：' + result.status + '；错误信息1：' + errorThrown
          ); // 弹出提示
        }
      });
    },
    // 查看
    onView () {
      let params = this.d1BillList.getSelectedRowData();
      // let groupData = {};
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 获取登入信息
      const loginUserInfo = this.$xutils.getLoginUserInfo();
      loginUserInfo.roles.forEach(function (_item, _index) {
        params['SystemNo'] = '01';
        // 如果是小微客户经理
        // SystemNo 请求的系统标识 01-信贷系统  02-小贷系统
        if (_item.code == 'R0010' || _item.code == 'R0030') {
          params['SystemNo'] = '02';
        }
      });
      if (params.grtFlag != '' && params.grtFlag == '01') {
        // 01抵押  02质押
        // let guarTypeCdFlag = '' + params.guarTypeCd;
        // if (guarTypeCdFlag.length < 7) {
        //   this.$xutils.showMsgBox('提示', '抵质押物类型异常!');
        // }
        // params['op'] = 'details';
        // this.route(params);

        // 跳转至押品系统
        params['callMethod'] = 'tGuarDetailInfo';
        params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        // const url = this.getGuarSysUrl(params);
        this.goToYpSys(params);
      } else if (params.grtFlag != '' && params.grtFlag == '02') {
        // 跳转至押品系统
        params['callMethod'] = 'tGuarDetailInfo';
        params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        // const url = this.getGuarSysUrl(params);
        this.goToYpSys(params);
      }
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
