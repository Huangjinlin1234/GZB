<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './grtguarsignindex_d1_BillCard.vue';
export default {
  components: { d1Billcard },
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
    // 最高额担保合同新增、修改、查看、签订
    AfterInit () {
      // let button;
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片
      if (this.getFactory().contextData.myop == 'SIGN') {
        this.d1_BillCard.sign = true;
        // button = '签订/onSign;返回/onCancel';
      } else if (this.getFactory().contextData.myop == 'onLogout') {
        // button = '注销/onLogout;返回/onCancel';
        this.d1_BillCard.logout = true;
      }

      // 获取表单数据
      this.d1_BillCard.setBillCardValue(this.getFactory().contextData);     

      // this.d1_BillCard.queryDataByCondition({guarPkId: this.getFactory().contextData.guarPkId}, 'post');

      // //加载工具js
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   () => {
      // if (this.getFactory().contextData.myop == 'SIGN') {
      //   this.d1_BillCard.setBillCardItemValue('guar_end_date', getTimeOperator(
      //     this.$xutils.dateFormat('yyyy-MM-dd', new Date()),
      //     this.getFactory().contextData.term_type,
      //     this.getFactory().contextData.guar_term
      //   ));
      // }
      //   }
      // );

      /*  //修改担保
          if (frameContext.op == 'EDIT'){
            //字段隐藏【签订日期、担保可用、已用金额】
            d1_BillCard.setItemVisible('sign_date;guar_amt_used;guar_amt_available', false);
            d1_BillCard.setItemEditable('manager_br_id_name', false);
            //担保起始日
            d1_BillCard.setItemValue('guar_start_date',YuXPUtil.dateFormat('yyyy-MM-dd', new Date()));
          }*/
      // 新增担保
      if (
        this.getFactory().contextData.op == 'ADD' ||
        this.getFactory().contextData.op == 'EDIT'
      ) {
        let userInfo = this.$xutils.getLoginUserInfo();

        // 设置【担保合同状态、担保打印次数、币种、主办人、主办机构】默认值
        this.d1_BillCard.setItemValue('manager_id', userInfo.loginCode);
        this.d1_BillCard.setItemValue('manager_br_id', userInfo.orgCode);
        this.d1_BillCard.setItemValue('manager_id_name', userInfo.loginName);
        this.d1_BillCard.setItemValue('manager_br_id_name', userInfo.org.name);
        if (this.getFactory().contextData.op == 'EDIT') {
          this.d1_BillCard.execBillCardDefaultValueFormula();
        }

        // 担保起始日
        this.d1_BillCard.setItemValue(
          'guar_start_date',
          this.$xutils.dateFormat('yyyy-MM-dd', new Date())
        );

        // 字段隐藏【更新机构、更新人员、更新日期、担保可用、已用金额】
        this.d1_BillCard.setItemVisible(
          'upd_br_id_name;upd_id_name;upd_date;sign_date;guar_amt_used;guar_amt_available',
          false
        );
      } else if (this.getFactory().contextData.myop == 'SIGN') {
        // 签订日期（签订操作时的日期）
        this.d1_BillCard.setItemValue(
          'sign_date',
          this.$xutils.dateFormat('yyyy-MM-dd', new Date())
        );

        // 担保起始日=签订日期（签订操作时的日期）
        this.d1_BillCard.setItemValue(
          'guar_start_date',
          this.$xutils.dateFormat('yyyy-MM-dd', new Date())
        );

        // 签订时只允许修改中文合同编号
        this.d1_BillCard.setItemEditable('*', false);

        this.d1_BillCard.setItemEditable('guar_cont_cn_no', true);

        if (this.getFactory().contextData.bizTyp == 'CHG') {
          // 字段隐藏【担保可用、已用金额】
          this.d1_BillCard.setItemVisible(
            'guar_amt_used;guar_amt_available',
            true
          );

          // 已用金额以及可用金额需要通过后端进行计算反显
          this.getAmtInfoByGuarContNo();
        } else {
          // 字段隐藏【担保可用、已用金额】
          this.d1_BillCard.setItemVisible(
            'guar_amt_used;guar_amt_available',
            false
          );
        }
      } else if (this.getFactory().contextData.op == 'VIEW') {
        // 字段隐藏【担保可用、已用金额】
        if (this.getFactory().contextData.guar_cont_type == '01') {
          this.d1_BillCard.setItemVisible(
            'guar_amt_used;guar_amt_available',
            false
          );
        }

        if (
          this.getFactory().contextData.guar_cont_type == '00' &&
          this.getFactory().contextData.guar_cont_state == '01'
        ) {
          this.d1_BillCard.setItemVisible(
            'guar_amt_used;guar_amt_available',
            true
          );
        }

        if (this.getFactory().contextData.guar_cont_state == '01') {
          this.d1_BillCard.setItemVisible('sign_date', true); // 签订日期
        } else {
          this.d1_BillCard.setItemVisible('sign_date', false);
        }

        // 设置只读
        this.d1_BillCard.setItemEditable('*', false);

        // 已用金额以及可用金额需要通过后端进行计算反显
        this.getAmtInfoByGuarContNo();
      } else if (this.getFactory().contextData.myop == 'onLogout') {
        // 设置只读
        this.d1_BillCard.setItemEditable('*', false);

        // 字段隐藏【签订日期、担保可用、已用金额】
        this.d1_BillCard.setItemVisible(
          'sign_date;guar_amt_used;guar_amt_available',
          false
        );
      }

      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);

      // 设置CHANGE事件
      this.d1_BillCard.addEditChangeAction(this.onChange);

      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
    },

    // 重新点击时重新加载页面
    showAction () {
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);
    },

    onChange (thisCard, _itemkey, _oldValue, _newValue) {
      // 担保方式抵质押展示担保品页签；担保方式保证展示保证人页签
      if (_itemkey == 'guar_way') {
        this.getFactory().triggerAction({
          guar_way: _newValue
        });
      }

      if (
        _itemkey == 'guarStart_date' ||
        _itemkey == 'termType' ||
        _itemkey == 'guarTerm'
      ) {
        let guarStartDate = this.d1_BillCard.getBillCardItemValue(
          'guar_start_date'
        );
        let guarTerm = this.d1_BillCard.getBillCardItemValue('guar_term');
        let termType = this.d1_BillCard.getBillCardItemValue('term_type');

        if (guarTerm == '' || termType == '') {
          return;
        }

        // this.d1_BillCard.setItemValue(
        //   'guar_end_date',
        //   '',
        //   this.getTimeOperator(guarStartDate, termType, guarTerm) // 这里原来是调用工具类中的函数，需自己改写法
        // );
      }
    },

    getTimeOperator (date, operType, operNum) {
    // 将时间字符串转化为时间对象
      var formatDate = new Date(date.replace('/-/g', '/'));
      if (operType == '001') { // 年份计算
        formatDate = formatDate.setYear(formatDate.getFullYear() + operNum * 1);
      } else if (operType == '002') { // 月份计算
        formatDate = formatDate.setMonth(formatDate.getMonth() + operNum * 1);
      } else if (operType == '003') { // 日期计算
        formatDate = formatDate.setDate(formatDate.getDate() + operNum * 1);
      }

      var newFormatDate = new Date(formatDate);
      var newDateYear = newFormatDate.getFullYear();
      var newDateMonth = newFormatDate.getMonth() + 1;
      if (newFormatDate.length == 1) {
        newDateMonth = '0' + newDateMonth;
      }
      var newDateDay = newFormatDate.getDate();
      if (newDateDay.length == 1) {
        newDateDay = '0' + newDateDay;
      }
      return this.$xutils.formatDate(new Date(newDateYear + '-' + newDateMonth + '-' + newDateDay));
    },

    // 保存
    save () {
      let params = this.d1_BillCard.getBillCardValue();

      // 检验表单
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      let rtnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/grtguarcont/checkGuarAmtAndAppAmt',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == 0) {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox(
            '提示',
            b + '；错误信息：' + result.responseJSON.message
          ); // 弹出提示
        }
      });

      // 针对异常的场景，无返回数据，不进行后续的处理
      if (JSON.stringify(rtnData) == '{}') {
        return;
      }

      let rtnCode = rtnData.rtnCode;

      if (rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg);
      } else {
        let userInfo = this.$xutils.getLoginUserInfo();
        this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode); // 更新人
        this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode); // 更新机构
        this.d1_BillCard.setItemValue(
          'upd_date',
          this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
        ); // 更新时间
        let dealResult = this.d1_BillCard.updateBillCardData();

        if (dealResult && dealResult.code == 'ok') {
          this.$xutils.getParentPage2(null, 'getDialogDataFunc');
          this.$xutils.showMsgBox('提示', '保存成功', 350, 150, (_rt) => {});
        }
      }
    },

    // 签订
    onSign () {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode); // 更新人
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode); // 更新机构
      this.d1_BillCard.setItemValue(
        'upd_date',
        this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
      ); // 更新时间
      let params = this.d1_BillCard.getBillCardValue();

      // 入参区分操作
      params['myop'] = this.getFactory().contextData.myop;

      this.$xutils.showConfirmBox(
        '提示',
        '是否确认签订?\r\n请谨慎操作!',
        350,
        150,
        (isOK) => {
          if (isOK) {
            this.$xutils.request({
              // 同步请求
              async: false,

              url:
                this.$backend.cmisBiz +
                '/api/grtguarcont/updateSelectiveByParams',
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

              success: (response, status, xhr) => {
                if (response.data > 0) {
                  this.$xutils.showMsgBox('提示', '签订成功', 350, 150, () => {
                    this.$xutils.getParentPage2(
                      this,
                      null,
                      'getDialogDataFuncChg'
                    );
                    this.$xutils.getParentPage2(
                      this,
                      null,
                      'getDialogDataFunc'
                    );
                    this.$xutils.getParentPage(this, 'YuXP', 'closeDialog');
                  });
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox(
                  '提示',
                  b + '；错误信息：' + result.responseJSON.message
                ); // 弹出提示
              }
            });
          }
        }
      );
    },

    // 注销
    onLogout () {
      var _this = this;
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode); // 更新人
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode); // 更新机构
      this.d1_BillCard.setItemValue(
        'upd_date',
        this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
      ); // 更新时间
      let params = this.d1_BillCard.getBillCardValue();

      // 入参区分操作
      params['myop'] = this.getFactory().contextData.myop;

      this.$xutils.showConfirmBox(
        '提示',
        '是否确认注销?\r\n请谨慎操作!',
        350,
        150,
        (isOK) => {
          if (isOK) {
            yufp.service.request({
              async: false,
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/grtguarcont/updateSelectiveByParams',
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$xutils.showMsgBox('提示', '注销成功', 350, 150, () => {
                    // this.$xutils.getParentPage2(
                    //   this,
                    //   null,
                    //   'getDialogDataFunc'
                    // );
                    // this.$xutils.getParentPage(this, null, 'closeDialog');
                    _this.getFactory().back();
                    return;
                  });
                } else {
                  _this.$message({ message: response.erortx, type: 'error' });
                }
              }
            });
          }
        }
      );
    },

    // 签订注销返回按钮
    onCancel () {
      this.getFactory().back();
      // this.$xutils.getParentPage('YuXP', 'closeDialog');
    },

    // 通过担保合同编号去后端查询，引用关系表中【与业务关联】的关系数据
    getAmtInfoByGuarContNo () {
      let rtnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        url:
          this.$backend.cmisBiz +
          '/api/grtguarbizrstrel/getAmtInfoByGuarContNo',
        data: JSON.stringify(
          this.$xutils.toUpperCase(this.getFactory().contextData, true)
        ),

        success: (response, status, xhr) => {
          rtnData = response.data;
        },

        error: (result, b) => {
          this.$xutils.showMsgBox(
            '提示',
            b + '；错误信息：' + result.responseJSON.message
          ); // 弹出提示
        }
      });

      // 针对异常的场景，直接返回
      if (JSON.stringify(rtnData) == '{}') {
        return;
      }

      let rtnCode = rtnData.rtnCode;

      if (rtnCode != '000000') {
        this.$xutils.showMsgBox(
          '提示',
          '获取可用额度出现异常！异常原因：' + rtnData.rtnMsg
        );
      } else {
        let usedAmt = rtnData.usedAmt;
        let availableAmt = this.d1_BillCard.getBillCardItemValue('guar_amt') - usedAmt;
        this.d1_BillCard.setBillCardItemValue('guar_amt_used', usedAmt);
        this.d1_BillCard.setBillCardItemValue('guar_amt_available', availableAmt);
      }
    },

    // 查看客户信息
    viewCus () {
      let cusId = this.d1_BillCard.getItemValue('borrower_id');
      let cusBaseInfo;
      // = findCusInfoFromBackend(cusId);
      let params = null;

      // 判定对公对私
      if (cusBaseInfo && cusBaseInfo != null) {
        let cus_catalog = cusBaseInfo.cus_catalog;

        if (cus_catalog == '1') {
          // 对公
          // routeToPageCusCorp(cusId); //
        } else if (cus_catalog == '2') {
          // 对私
          // routeToPageCusIndiv(cusId);
        } else {
          this.$xutils.showMsgBox('提示', '无法确定客户大类！');
          return;
        }
      }
    }
  }
};
</script>
