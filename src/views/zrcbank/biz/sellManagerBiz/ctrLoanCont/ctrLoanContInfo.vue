<template>
  <!--
    @created by 合同申请列表
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->

  <div>
    <yu-tabs @tab-click="tabClick" value="2">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
        <yu-xform-group :column="2">
          <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="custom">
            <yu-date-picker label="登记日期" type="daterange" v-model="searchFormdata.inputDate"></yu-date-picker>
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>

      <yu-tab-pane label="待签订" name="2">
        <yu-button-drop show-length="5">
          <yu-button type="primary" @click="view" v-if="checkCtrl('view')">查看</yu-button>
          <yu-button type="primary" @click="sign" v-if="checkCtrl('sign')">签订</yu-button>
          <yu-button type="primary" @click="print" v-if="checkCtrl('print')">打印</yu-button>
          <yu-button type="primary" @click="withdraw" v-if="checkCtrl('withdraw')">撤回</yu-button>

        </yu-button-drop>

      </yu-tab-pane>
      <yu-tab-pane label="已签订" name="3">
        <yu-button-drop show-length="5">
          <yu-button type="primary" @click="view" v-if="checkCtrl('view')">查看</yu-button>
          <yu-button type="primary" @click="revocation" v-if="checkCtrl('revocation')">撤销</yu-button>
          <yu-button type="primary" @click="cancellation" v-if="checkCtrl('cancellation')">注销</yu-button>
          <yu-button type="primary" @click="onLineDraw" v-if="checkCtrl('onLineDraw')">线上提款启用</yu-button>
        </yu-button-drop>
      </yu-tab-pane>
    </yu-tabs>

    <yu-xtable ref="refTable" :default-sort="{prop:'contNo',order:'descending'}" condition-key="condition" row-number :data-url="dataUrl" :base-params="params" selection-type="radio" request-type="POST">
      <yu-xtable-column label="申请流水号" prop="iqpSerno" width="120" hide-column></yu-xtable-column>
      <yu-xtable-column label="合同编号" prop="contNo" width="120" sortable></yu-xtable-column>
      <yu-xtable-column label="合同状态" prop="contStatus" width="120" data-code="STD_CONT_STATUS"></yu-xtable-column>
      <yu-xtable-column label="客户编号" prop="cusId" width="120">
        <template slot-scope="scope">
          <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
        </template>
      </yu-xtable-column>
      <yu-xtable-column label="客户名称" prop="cusName" width="120">
        <template slot-scope="scope">
          <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
        </template>
      </yu-xtable-column>
      <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
      <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
      <yu-xtable-column label="合同类型" prop="contType" width="120" data-code="STD_ZB_CONT_TYPE"></yu-xtable-column>
      <yu-xtable-column label="是否线上提款" prop="isOnlineDraw" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      <yu-xtable-column label="是否电子打印" prop="isESeal" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
      <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
      <yu-xtable-column label="担保方式" prop="guarWay" width="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
      <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
      <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
      <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
    </yu-xtable>

  </div>

</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg(
  'STD_ZB_CUR_TYP,STD_CONT_STATUS,STD_ZB_GUAR_WAY,STD_ZB_CONT_TYPE'
);

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      params: { condition: { flag: '2'}, sort: 'input_date desc'
      },
      dataUrl: backend.cmisBiz + '/api/ctrloancont/retail/qyeryCtrLoanContList',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      value6: '',
      loginCode: null
    };
  },

  mounted () {
    const userInfo = this.$xutils.getLoginUserInfo(); // 获取登陆人信息
    this.loginCode = userInfo.loginCode;
  },

  methods: {
    /**
     * 查看
     */
    view: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      _this.$router.addTab({
        // 查看跳转
        name: 'zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContSign',
        key: _this.$refs.refTable.selections[0].contNo,
        title: '合同申请查看',
        data: {
          contNo: _this.$refs.refTable.selections[0].contNo,
          cnContNo: _this.$refs.refTable.selections[0].cnContNo,
          oprType: '03' // 查看
        }
      });
    },

    tabClick: function (t, e) {
      // tab 被选中时触发
      let _this = this;
      let name = t.name;
      if (name == '2') {
        // 待签订
        _this.params.condition.flag = '2';
        _this.$refs.refTable.remoteData();
      } else if (name == '3') {
        // 已签订
        _this.params.condition.flag = '3';
        _this.$refs.refTable.remoteData();
      }
    },

    sign: function () {
      // 签订
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.loginCode != managerId) {
        _this.$message({
          message: '只能对责任人是自己本人的合同进行签订',
          type: 'warning'
        });
        return;
      }

      _this.$router.addTab({
        // 签订跳转
        name: 'zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContSign',
        key: _this.$refs.refTable.selections[0].contNo,
        title: '合同签订',
        data: {
          contNo: _this.$refs.refTable.selections[0].contNo,
          cnContNo: _this.$refs.refTable.selections[0].cnContNo,
          iqpSerno: _this.$refs.refTable.selections[0].iqpSerno,
          oprType: '04' // 签订
        }
      });
    },

    withdraw: function () {
      // 撤回
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.loginCode != managerId) {
        _this.$message({
          message: '只能对责任人是自己本人的合同进行撤回',
          type: 'warning'
        });
        return;
      }

      var d = _this.$refs.refTable.selections[0];
      d['contStatus'] = '';
      d['approveStatus'] = '000';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/update',
        data: d,
        callback (code, message, response) {
          if (response.code === '0') {
            _this.$message({ message: '撤回成功', type: 'success' });
            _this.refresh();
          } else {
            _this.$message({ message: '撤回失败', type: 'warning' });
          }
        }
      });
    },

    print () {
      // 合同打印
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = selectionsAry[0].managerId;
      if (_this.loginCode != managerId) {
        _this.$message({
          message: '只能对责任人是自己的合同，操作合同打印!',
          type: 'warning'
        });
        return;
      }
      var contPageType = ''; // 合同版面标识
      var isESeal = selectionsAry[0].isESeal; // 是否电子用印
      var matchFlag = '';// 特定匹配标识
      var suitPrd = selectionsAry[0].prdId;// 适用产品
      if (isESeal !== '0') {
        let managerId = selectionsAry[0].managerId; // --todo
        const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
        let loginCode = userInfo.loginCode;
        if (managerId == loginCode) {
          contPageType = '2';
        } else {
          contPageType = '3';
        }
      } else {
        contPageType = '1';
      }
      // 部分产品合同打印不需要判断担保类型
      if (suitPrd !== '022001' && suitPrd !== '022002' && suitPrd !== '022020' && suitPrd !== '022021' && suitPrd !== '022024' && suitPrd !== '022031' && suitPrd !== '022040' && suitPrd !== '022051' && suitPrd !== '022052' && suitPrd !== '022053' && suitPrd !== '022054' && suitPrd !== '022055' && suitPrd !== '022056') {
        matchFlag = selectionsAry[0].guarWay;
      } else {
        matchFlag = '';
      }
      var paramList = [];
      // 参数
      var printData = {
        contNo: selectionsAry[0].contNo,
        cusId: selectionsAry[0].cusId,
        serno: selectionsAry[0].iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: selectionsAry[0].contNo, // 合同编号
        serno: selectionsAry[0].iqpSerno, // 流水号
        contType: '1',
        suitContType: selectionsAry[0].contType, // 适用合同类型
        suitPrd: suitPrd, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: matchFlag // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
      var contList = [];
      contList.push(selectionsAry[0].contNo);
      var prds1 = ['022001', '022002', '022020', '022021', '022024', '022031', '022040', '022051', '022052', '022053', '022054', '022055', '022056', '022028'];
      var prds2 = ['022005', '022019', '022006', '022098', '022017', '022023', '022090', '022095', '022097'];
      // 主合同与担保合同合并，只需打印该合同即可
      if (prds1.includes(suitPrd)) {

      } else if (prds2.includes(suitPrd)) {
        // 打印担保合同
        if (selectionsAry[0].guarWay == '20') {
          // 担保合同
          yufp.service.request({
            method: 'POST',
            async: false,
            url: backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByContNohtdy',
            data: JSON.stringify(contList),
            callback: function (code, message, response) {
              var isInit = response.code;
              if (isInit == 0) {
                let guarData = response.data;
                for (let i = 0; i < guarData.length; i++) {
                  let param2 = {};
                  param2.contNo = selectionsAry[0].contNo; // 借款合同号
                  param2.serno = selectionsAry[0].iqpSerno; // 借款合同流水号
                  param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
                  param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
                  param2.contType = '2';
                  param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
                  param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
                  param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
                  param2.pldContType = guarData[i].pldContType; // 质押合同类型
                  param2.isESeal = isESeal; // 是否电子用印
                  param2.contPageType = contPageType; // 合同版面标识
                  param2.matchFlag = ''; // 特定匹配标识
                  paramList.push(param2);
                }
              }
            }
          });
        }
      } else {
        // 担保合同
        yufp.service.request({
          method: 'POST',
          async: false,
          url: backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByContNohtdy',
          data: JSON.stringify(contList),
          callback: function (code, message, response) {
            var isInit = response.code;
            if (isInit == 0) {
              let guarData = response.data;
              for (let i = 0; i < guarData.length; i++) {
                let param2 = {};
                param2.contNo = selectionsAry[0].contNo; // 借款合同号
                param2.serno = selectionsAry[0].iqpSerno; // 借款合同流水号
                param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
                param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
                param2.contType = '2';
                param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
                param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
                param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
                param2.pldContType = guarData[i].pldContType; // 质押合同类型
                param2.isESeal = isESeal; // 是否电子用印
                param2.contPageType = contPageType; // 合同版面标识
                param2.matchFlag = ''; // 特定匹配标识
                paramList.push(param2);
              }
            }
          }
        });
      }
      this.$dialog.open(
        '合同打印',
        'printManage/index',
        800,
        500,
        paramList,
        null,
        true,
        true
      );
    },

    revocation () {
      // 撤销
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = selectionsAry[0].managerId;
      let contStatus = selectionsAry[0].contStatus;
      let contMode = selectionsAry[0].contMode;

      if (contMode != '01' || _this.loginCode != managerId || contStatus != '200') {
        _this.$message({
          message: '只可撤销责任人为本人并且为生效打印模式的合同',
          type: 'warning'
        });
        return;
      }

      var contno = selectionsAry[0].contNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/retail/contReSign/' + contno,
        callback (code, message, response) {
          if (response.data.code === '0000') {
            _this.$message({ message: response.data.msg, type: 'success' });
            _this.refresh();
          } else {
            _this.$message({ message: response.data.msg, type: 'warning' });
          }
        }
      });
    },

    cancellation () {
      // 作废
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = selectionsAry[0].managerId;

      if (_this.loginCode != managerId) {
        _this.$message({
          message: '只能对责任人为本人的合同进行作废',
          type: 'warning'
        });
        return;
      }

      var contno = selectionsAry[0].contNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/retail/cancelCont/' + contno,
        callback (code, message, response) {
          if (response.data.code === '0000') {
            _this.$message({ message: response.data.msg, type: 'success' });
            _this.refresh();
          } else {
            _this.$message({ message: response.data.msg, type: 'warning' });
          }
        }
      });
    },

    // 刷新页面数据
    refresh () {
      this.$refs.refTable.remoteData();
    },

    onLineDraw () {
      // 线上提款启用
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = selectionsAry[0].managerId;
      let contStatus = selectionsAry[0].contStatus;
      let prdId = selectionsAry[0].prdId;
      let isOnlineDraw = selectionsAry[0].isOnlineDraw;

      if (
        _this.loginCode != managerId ||
        contStatus != '200' ||
        prdId != '022028' ||
        isOnlineDraw != '1'
      ) {
        _this.$message({
          message:
            '只能对生效且线上提款的白领易贷通，责任人为本人的合同发起线上提款启用',
          type: 'warning'
        });
        return;
      }

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/donextstep',
        data: selectionsAry[0],
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$router.addTab({
              // 修改跳转
              name: 'bizmanage/ctrBiz/ctrContImageAppList/ctrLoanContEdit',
              key: _this.$refs.refTable.selections[0].contNo,
              title: '合同信息完善',
              data: {
                contNo: response.data.contNo,
                serno: response.data.serno,
                oprType: '02' // 修改
              }
            });
          } else {
            _this.$message({ message: message, type: 'warning' });
          }
        }
      });
    },
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      var _this = this;
      // 查询客户大类
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: data.cusId,
        callback: function (code, message, response) {
          if (code == 0) {
            let json = {};
            let title = '';
            let name = '';
            let key = '';
            json['cusId'] = data.cusId;
            if (response.data.cusCatalog == '1') {
              json['op'] = 'VIEW';
              title = '个人客户查看';
              name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
              // 个人正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            } else if (response.data.cusCatalog == '2') {
              json['viewType'] = 'VIEW';
              title = '对公客户查看';
              name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
              // 对公正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            }
            _this.$router.addTab({
              // 路由名称
              name: name,
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: key,
              // 页签名称
              title: title,
              // 传递的业务数据，可选配置
              data: json
            });
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }
  }
};
</script>
