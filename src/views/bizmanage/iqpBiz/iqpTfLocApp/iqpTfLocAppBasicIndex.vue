<template>
  <div>
    <div>
      <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
      </div>
      <div>
        <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
      </div>
      <div>
        <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
      </div>
      <div>
        <yufp-nwf-init ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufp-nwf-init>
      </div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="isShowButton">
          <yu-button type="primary" @click="tempSave">暂存</yu-button>
          <yu-button type="primary" @click="save">保存</yu-button>
          <yu-button type="primary" @click="commit">提交</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './iqpTfLocAppBasic_d1_A_BillCard.vue';
import d1BBBillcard from './iqpTfLocAppBasic_d1_B_B_BillCard.vue';
import d1BABilllist from './iqpTfLocAppBasic_d1_B_A_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
// 开证申请修改页面
// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;

// 定义流程页面标识，用于区分流程进入与申请页面进入
let wfFlag = false;

let nodeFlag, contType;

// 合同类型 2最高额合同1一般合同

export default {
  components: { d1ABillcard, d1BBBillcard, d1BABilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_B_BillCard: null,
      d1_B_A_BillList: null,
      topOutsystemCode: 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWXYZ;GJYWDCCZ;GJYWSQSQT;',
      isShowButton: true
    };
  },
  mounted () {
    // this.d1_BillCard.form.resetFields();
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var data = '';
      var serno = '';
      var op = '';

      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        serno = data.bizId;
        op = data.op;
      } else if (this.$route.meta.params) {
        data = this.$route.meta.params;
        serno = data.biz_serno;
        op = data.op;
      } else if (this.getFactory().contextData) {
        data = this.getFactory().contextData;
        serno = data.biz_serno;
        op = data.op;
      }
      nodeFlag = data.nodeFlag;
      contType = data.contType;
      // this.checkWfPage();
      // this.initWfStatus();
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;
      if (op == 'view' || op == 'VIEW') {
        this.d1_A_BillCard.isShowButton = false;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqptflocapp/showdetial',
        data: { serno: serno }
      })
        .then(response => {
          if (response.code == '0') {
            // 控制相关panel隐藏
            this.getFactory().triggerAction(response.data);
            // 重置表单数据
            this.d1_A_BillCard.form.resetFields();
            this.d1_B_B_BillCard.form.resetFields();

            yufp.clone(response.data, this.d1_A_BillCard.formdata);
            yufp.clone(response.data, this.d1_B_B_BillCard.formdata);

            if (this.d1_A_BillCard.formdata.prdId == '410002') {
              this.d1_A_BillCard.formdata.curType = 'CNY';
              this.d1_A_BillCard.isCurTypeDisabled = true;
            }
            this.d1_A_BillCard.setItemValue('exchangeRate', '1');
            if (op == 'ADD' || op == 'EDIT') {
              this.d1_A_BillCard.setItemValue('curType', 'CNY');
            }
            let guarMode = this.d1_A_BillCard.getItemValue('guarMode');
            if (guarMode != '10') {
              this.d1_A_BillCard.setBillCardItemVisible('isOlPld', false);
            }
            if (guarMode == '40' || guarMode == '21' || guarMode == '60') {
              this.d1_B_B_BillCard.isLmtAccNoRequired = false;
              this.d1_B_B_BillCard.isReplyNoRequired = false;
            } else {
              this.d1_B_B_BillCard.isLmtAccNoRequired = true;
              this.d1_B_B_BillCard.isReplyNoRequired = true;
            }

            // 担保方式为全额保证金时，保证金比列默认100%，保证金金额即合同金额
            let contAmt = this.d1_A_BillCard.getItemValue('contAmt');
            if (guarMode == '40') {
              this.d1_A_BillCard.setBillCardItemValue('bailPerc', '100%');
              this.d1_A_BillCard.setBillCardItemValue('bailAmt', contAmt);
            }

            // 最高额合同
            if (contType == '2') {
              // 贸易合同号
              this.d1_A_BillCard.setBillCardItemVisible('tcontNo', false);

              // 溢装比例
              this.d1_A_BillCard.setBillCardItemVisible('floodactPerc', false);

              // 货物名称
              this.d1_A_BillCard.setBillCardItemVisible('goodsName', false);

              // 受益人名称
              this.d1_A_BillCard.setBillCardItemVisible('beneficiarName', false);
            }

            let isRenew = this.d1_A_BillCard.getItemValue('isRenew');

            if (isRenew == '0') {
              this.d1_A_BillCard.setBillCardItemVisible('origiContNo', false);
              this.d1_A_BillCard.setBillCardItemRequired('origiContNo', false);

              // 隐藏后清空原有数据值
              this.d1_A_BillCard.setBillCardItemClearValue('origiContNo');
            }
            // 存值是否在线抵押
            this.setisOnlinePld();
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
      this.initBillCard();


      // 模板工厂主页面数据加载成功事件
      // window.parent.mainPageLoadDataSuccessAction(d1_BillCard.getBillCardValue());

      // 加载工具js
      // this.$xutils.importJsOrderBy(
      //   [
      //     "/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js"
      //   ],
      //   0,
      //   null
      // );

      // 页面录入框下拉框绑定onchange事件
      this.d1_A_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // onchang事件，若“是否续签合同 = 是”,则展示  “原合同编号”字段，否则隐藏不展示
    isBasicChange (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'isRenew' && newVal == '0') {
        thisCard.setBillCardItemVisible('origiContNo', false);
        thisCard.setBillCardItemRequired('origiContNo', false);

        // 隐藏后清空原有数据值
        thisCard.setBillCardItemClearValue('origiContNo');
      } else if (itemKey == 'isRenew' && newVal == '1') {
        thisCard.setBillCardItemVisible('origiContNo', true);
        thisCard.setBillCardItemRequired('origiContNo', true);
      }
    },

    // 初始化表单
    initBillCard () {
      // 判断页面是否为查看页面或流程进入的页面
      if (nodeFlag == '3') {
      } else {
        if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
          this.d1_A_BillCard.setBillCardItemRequired('*', false);
          this.d1_A_BillCard.setBillCardItemEditable('*', false);
          this.d1_B_B_BillCard.setBillCardItemRequired('*', false);
          this.d1_B_B_BillCard.setBillCardItemEditable('*', false);
          this.d1_B_A_BillList.add = false;
          this.d1_B_A_BillList.del = false;
          // this.d1_B_A_BillList.setBillListButtonVisable("新增", false);
          // this.d1_B_A_BillList.setBillListButtonVisable("删除", false);
        }
      }

      // 页面录入框下拉框绑定onchange事件
      this.d1_A_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // 保存
    save () {
      let validateFlagA = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlagA) {
        return;
      }

      let validateFlagB = this.d1_B_B_BillCard.validateBillCardValue();

      if (!validateFlagB) {
        return;
      }

      this.saveFn();
      this.setisOnlinePld();
    },

    // 保存方法
    saveFn () {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_B_B_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_B_B_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_B_B_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      // // let rtnData = this.d1_BillCard.updateBillCardData();
      // this.d1_A_B_BillCard.tempUpdateBillCardData();
      // this.d1_B_B_BillCard.tempUpdateBillCardData();
      // this.getFactory().back();
      // // if (rtnData && rtnData.code == 'ok') {
      // //   this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
      // //     // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
      // //     this.$xutils.getParentPage2(this, null, 'refreshBillListData');
      // //   });
      // // }

      // 获取数值的方式
      let params = this.d1_A_BillCard.getBillCardValue();

      let params2 = this.d1_B_B_BillCard.getBillCardValue();

      // 将d1_A_BillCard和d1_B_B_BillCard两个表单的数据合为一个JSON
      let tempParams = {};
      yufp.clone(params, tempParams);
      for (let i in params2) {
        if (params2[i] !== null) {
          tempParams[i] = params2[i];
        }
      }

      this.$request({
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqptflocapp/commonsaveiqptflocappinfo',
        data: tempParams
      })
        .then(response => {
          if (response.code == '0') {
            this.$message({message: '保存成功', type: 'info'});
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
    },

    // 暂存
    tempSave () {
      // 暂存操作不做任何校验
      let userInfo = this.$xutils.getLoginUserInfo();

      this.d1_B_B_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_B_B_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_B_B_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));

      // 获取数值的方式
      let params = this.d1_A_BillCard.getBillCardValue();

      let params2 = this.d1_B_B_BillCard.getBillCardValue();

      // 将d1_A_BillCard和d1_B_B_BillCard两个表单的数据合为一个JSON
      let tempParams = {};
      yufp.clone(params, tempParams);
      for (let i in params2) {
        if (params2[i] !== null) {
          tempParams[i] = params2[i];
        }
      }

      this.$request({
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqptflocapp/commonsaveiqptflocappinfo',
        data: tempParams
      })
        .then(response => {
          if (response.code == '0') {
            this.$message({message: '保存成功', type: 'info'});
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
      this.setisOnlinePld();
    },

    // 提交
    commit () {
      // 调用通用的保存方法
      let saveFlag = this.commonSave();

      if (saveFlag) {
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');
        this.afterSaveCommit();
      }
    },

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      let validateFlagA = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlagA) {
        return;
      }

      let validateFlagB = this.d1_B_B_BillCard.validateBillCardValue();

      if (!validateFlagB) {
        return;
      }
      saveFlag = this.commitSave();
      return saveFlag;
    },

    // 提交保存方法
    commitSave () {
      // 获取数值的方式
      let params = this.d1_A_BillCard.getBillCardValue();
      let params2 = this.d1_B_B_BillCard.getBillCardValue();
      // 将d1_A_BillCard和d1_B_B_BillCard两个表单的数据合为一个JSON
      let tempParams = {};
      yufp.clone(params, tempParams);
      for (let i in params2) {
        if (params2[i] !== null) {
          tempParams[i] = params2[i];
        }
      }
      let saveFlag = true;
      let rtnData = {};

      this.$xutils.request({
        async: false,
        url:
          this.$backend.cmisBiz + '/api/iqptflocapp/commonsaveiqptflocappinfo',
        data: tempParams,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            saveFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (
        !saveFlag ||
        JSON.stringify(rtnData) == '{}' ||
        JSON.stringify(rtnData) == ''
      ) {
        return false;
      }

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        return false;
      }

      return true;
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      var _this = this;
      let loginUser = this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'YX005';
      startdto.bizId = _this.$refs.d1_A_BillCard.formdata.serno;
      startdto.bizUserName = _this.$refs.d1_A_BillCard.formdata.cusName;
      startdto.bizUserId = _this.$refs.d1_A_BillCard.formdata.cusId;
      startdto.param = {
        contAmt: this.$refs.d1_A_BillCard.formdata.contAmt,
        lowRisk: this.$refs.d1_A_BillCard.formdata.guarMode,
        contNo: this.$refs.d1_A_BillCard.formdata.contNo,
        topOutsystemCode: this.topOutsystemCode,
        imageParams: {
          contid: this.$refs.d1_A_BillCard.formdata.contNo,
          businessid: _this.$refs.d1_A_BillCard.formdata.serno,
          docid: _this.$refs.d1_A_BillCard.formdata.serno
        }
      };
      this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.back();
    },

    // 新增
    onAdd () {
      this.$dialog.open(
        '保证金信息-新增',
        'bizmanage/iqpBiz/bailAccInfo/bailAccInfoAddIndex',
        800,
        700,
        this.getFactory().contextData,
        this.refresh
      );
    },

    // 刷新页面
    refresh () {
      this.d1_B_A_BillList.queryDataByCondition({serno: this.getFactory().contextData.serno});
    },

    // 逻辑删除
    onDelete () {
      let jsoPar = this.d1_B_A_BillList.getSelectedRowData();
      // let rtnData = {};
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录!');
        return;
      }

      this.$xutils.showConfirmBox(
        '提示',
        '是否确认删除?\r\n请谨慎操作!',
        350,
        150,
        isOK => {
          if (isOK) {
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/bailaccinfo/logicdelete',
              data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox(
                    '提示',
                    '删除成功!',
                    350,
                    150,
                    this.refresh
                  );
                  // rtnData = response.data;
                } else {
                  this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
    },

    // 对公客户查看
    viewCusDataByCusId () {
      if (this.d1_A_BillCard.formdata.cusId == null || this.d1_A_BillCard.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.d1_A_BillCard.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },

    viewReplyNo () {
      if (this.d1_B_B_BillCard.formdata.replyNo == null || this.d1_B_B_BillCard.formdata.replyNo == '') {
        this.$xutils.showMsgBox('提示', '批复编号为空!');
        return;
      }
      let params = {};
      params['replySerno'] = this.d1_B_B_BillCard.formdata.replyNo;
      this.$dialog.open(
        '',
        'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
        -1,
        -1,
        params
      );
    },
    setisOnlinePld () {
      // 存值是否在线抵押、担保起始日期、担保到期日期
      if (this.$route.meta.params) {
        this.$route.meta.params.isOlPld = this.d1_A_BillCard.formdata.isOlPld;
        this.$route.meta.params.guarStartDate = this.d1_A_BillCard.formdata.startDate;
        this.$route.meta.params.guarEndDate = this.d1_A_BillCard.formdata.endDate;
      } else {
        this.getFactory().contextData.isOlPld = this.d1_A_BillCard.formdata.isOlPld;
        this.getFactory().contextData.guarStartDate = this.d1_A_BillCard.formdata.startDate;
        this.getFactory().contextData.guarEndDate = this.d1_A_BillCard.formdata.endDate;
      }
    }

  }
};
</script>
