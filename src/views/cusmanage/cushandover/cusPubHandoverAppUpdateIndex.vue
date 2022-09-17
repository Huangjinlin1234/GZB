<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard" :back-status="backStatus" :operate="operate" @handover-model-event="handoverModeChg"></d1-a-billcard>
    </div>
    <div>
      <d1-b-billlist ref="d1_B_BillList" :operate="operate" :serno="serno" v-show="handoverMode==1 || handoverMode==3"></d1-b-billlist>
      <d1-b-1-billlist ref="d1_B_1_BillList" :operate="operate" :serno="serno"  v-show="handoverMode==2"></d1-b-1-billlist>
    </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="doCancel" @error-click="doError"></yufpNwfInit>
  </div>
</template>
<script>
import d1ABillcard from './cusPubHandoverAppUpdate_d1_A_BillCard.vue';
import d1BBilllist from './cusPubHandoverAppUpdate_d1_B_BillList.vue';
import d1B1Billlist from './cusPubHandoverAppUpdate_d1_B_1_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { request } from 'xy-utils';
export default {
  components: {d1ABillcard, d1BBilllist, d1B1Billlist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      d1_B_1_BillList: null,
      handoverMode: null,
      operate: 'add',
      backStatus: true,
      pageData: {},
      loading: null,
      serno: null
    };
  },
  mounted () {
    this.afterInit();
  },
  watch: {
    handoverMode: function (newVal, oldVal) {
      if (oldVal && newVal != oldVal) {
        this.isBasicChangeFn(newVal);
      }
    }
  },
  methods: {
    handoverModeChg (value) {
      this.handoverMode = value;
    },
    /**
       * 客户移交申请详情与修改调用页面
       */
    afterInit () {
      const bizPageData = this.bizPageData || {};
      const instanceInfo = bizPageData.instanceInfo;
      // 如果流程实例存在，则说明是从流程中打开的页面
      if (instanceInfo) {
        this.backStatus = false;
        this.operate = 'details';
        this.initBizData();
      } else {
        this.pageData = this.pageParams;
        this.operate = this.pageParams.op;
        this.initData();
      }
    },
    /**
       * 页面数据初始化
       */
    initData () {
      // 如果是查看，则只显示取消按钮
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      this.d1_B_1_BillList = this.$refs.d1_B_1_BillList;
      // 默认执行代码
      if (this.operate == 'add') {
        this.d1_A_BillCard.execBillCardDefaultValueFormula();
        this.pageData.serno = this.d1_A_BillCard.getItemValue('serno');
        this.d1_A_BillCard.orgTypeDis = false;
      } else {
        this.d1_A_BillCard.setBillCardValue(this.pageData);
        this.handoverMode = this.pageData.handoverMode;
        this.reloadData();
      }
    },
    /**
       * 如果是流程引擎打开的页面,则需要根据流水号查询对应的数据
       */
    initBizData () {
      const _this = this;
      this.queryData().then(res => {
        if (res.code == 0) {
          _this.pageData = res.data[0] || {};
          _this.initData();
        } else {
          _this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
        }
      });
    },
    /**
       * 根据流水号查询数据
       */
    queryData () {
      return request({
        url: this.$backend.cmisCus + '/api/cuspubhandoverapp/querybyserno',
        method: 'POST',
        data: {condition: JSON.stringify({serno: this.bizPageData.instanceInfo.bizId})}
      });
    },
    /**
       * 页面loading
       */
    openLoading () {
      var dom = this.dialogId ? this.$parent.$refs.dialog : this.$parent.$el;
      var options = {
        target: dom, // Loading 需要覆盖的 DOM 节点
        body: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
        fullscreen: false,
        text: '加载中' // 显示在加载图标下方的加载文案
      };
      this.loading = this.$loading(options);
    },
    /**
       * 关闭页面loading
       */
    hidenLoading () {
      if (this.loading) {
        this.loading.close();
      }
    },
    /**
       * 保存数据
       */
    saveData (callBack, temp) {
      const data = this.getSaveData(temp);

      if (data === false) {
        return;
      }
      request({
        url: this.$backend.cmisCus + '/api/cuspubhandoverapp/inserthandoverapp',
        method: 'POST',
        data: JSON.stringify(data)
      }).then(res => {
        callBack(res);
      });
    },
    /**
       * 验证页面数据
       */
    validate () {
      let validate = false;
      this.d1_A_BillCard.form.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return false;
      }
      // 获取表格数据
      const listData = this.d1_B_BillList.$refs.refTable.tabledata;
      if (this.handoverMode == 1 && listData.length == 0) {
        this.$xutils.showMsgBox('提示', '请添加客户移交明细'); // 弹出提示
        return false;
      }
      // 获取表格数据
      const listData1 = this.d1_B_1_BillList.$refs.refTable.tabledata;
      if (this.handoverMode == 2 && listData1.length == 0) {
        this.$xutils.showMsgBox('提示', '请添加客户移交明细'); // 弹出提示
        return false;
      }
      return true;
    },
    /**
       * 保存并提交数据到工作流
       */
    doSumbit () {
      if (!this.validate()) {
        return false;
      }
      const _this = this;
      const userInfo = _this.$xutils.getLoginUserInfo();
      _this.d1_A_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      _this.d1_A_BillCard.setItemValue('upd_id', userInfo.loginCode);
      _this.d1_A_BillCard.setItemValue('upd_date', _this.$xutils.dateFormat('yyyy-MM-dd', new Date()));
      _this.d1_A_BillCard.setItemValue('update_time', _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      if (_this.d1_A_BillCard.getItemValue('handoverId') === _this.d1_A_BillCard.getItemValue('receiverId')) {
        this.$xutils.showMsgBox('提示', '移出人不能和接收人相同!');
        return;
      }
      _this.saveData(res => {
        if (res.code == 0) {
          const resData = res.data;
          var table = null;
          if (this.handoverMode == 1 || this.handoverMode == 3) {
            this.d1_B_BillList.$refs.refTable.tabledata = resData.list;
            table = this.d1_B_BillList.$refs.refTable.tabledata;
          }
          // 获取表格数据
          if (this.handoverMode == 2) {
            this.d1_B_1_BillList.$refs.refTable.tabledata = resData.list;
            table = this.d1_B_1_BillList.$refs.refTable.tabledata;
          }
          const loginUser = _this.$xutils.getLoginUserInfo();
          let dutysArry = []; //  loginUser.dutys
          for (let i = 0; i < loginUser.dutys.length; i++) {
            dutysArry.push(loginUser.dutys[i].code);
          }
          const resExtData = res.extData;
          // 设置流程提交参数
          let startdto = {};
          startdto.systemId = 'cmis';
          startdto.orgId = loginUser.org.code;
          startdto.userId = loginUser.loginCode;
          startdto.userName = loginUser.loginName;
          startdto.bizParam2 = _this.d1_A_BillCard.getItemValue('handoverBrId');
          if (startdto.orgId.substring(0, 2) == '80') {
            startdto.bizType = 'SGA01';
            startdto.bizParam1 = _this.d1_A_BillCard.getItemValue('receiverId');
          } else if (startdto.orgId.substring(0, 2) == '81') {
            startdto.bizType = 'DHA01';
            startdto.bizParam1 = _this.d1_A_BillCard.getItemValue('receiverId');
          } else if (_this.d1_A_BillCard.getItemValue('launchType') === '1') {
            startdto.bizType = 'KH025';
            startdto.bizParam1 = _this.d1_A_BillCard.getItemValue('handoverId');
          } else {
            startdto.bizType = 'KH014';
            startdto.bizParam1 = _this.d1_A_BillCard.getItemValue('receiverId');
          }
          startdto.bizId = _this.d1_A_BillCard.getItemValue('serno');
          var bizUserId = '';
          var bizUserName = '';
          bizUserId = table[0].cusId;
          bizUserName = table[0].cusName;
          for (var i = 1; i < table.length; i++) {
            bizUserId += ',' + table[i].cusId;
            bizUserName += ',' + table[i].cusName;
          }
          startdto.bizUserId = bizUserId;
          startdto.bizUserName = bizUserName;
          let param = { condition: JSON.stringify({
            handoverId: _this.d1_A_BillCard.getItemValue('handoverId'),
            receiverId: _this.d1_A_BillCard.getItemValue('receiverId')
          }) };
          _this.$request({
            url: _this.$backend.appOcaService + '/api/empscheduleinfo/queryUserStsAndOrgType',
            method: 'POST',
            data: JSON.stringify(param)
          }).then(response => {
            if (response && response.code == '0') {
              startdto.param = {
                orgType: _this.d1_A_BillCard.getItemValue('orgType'),
                handoverMode: _this.d1_A_BillCard.getItemValue('handoverMode'), // 移交方式
                dutyOrgType: loginUser.org.orgType, // 客户经理所属机构类型  分行、支行、小微、非客户经理
                dutys: dutysArry.join(','),
                isContainSm: resExtData.isContainSm, // 是否涉及小企业客户 1 是 0 否
                userSts: _this.d1_A_BillCard.getItemValue('userSts'),
                receiverIdOrgType: response.data.receiverIdOrgType,
                isSameBank: response.data.isSameBank,
                isVirtualManager: response.data.isVirtualManager
              };
              console.info('startdto===========', startdto);
              _this.$refs.yufpNwfInit.wfInit(startdto);
            } else {
              this.$xutils.showMsgBox('提示', '提交失败，请重试！');
            }
          });
        }
      });
    },
    doError () {
      // this.hidenLoading();
    },
    /**
       * 获取页面数据
       */
    getSaveData (temp) {
      const param = this.d1_A_BillCard.getBillCardValue();
      let list = [];
      if (this.handoverMode == 1 || this.handoverMode == 3) {
        list = this.d1_B_BillList.$refs.refTable.tabledata;
      }
      // 获取表格数据
      if (this.handoverMode == 2) {
        list = this.d1_B_1_BillList.$refs.refTable.tabledata;
      }
      if (!temp) {
        if (list.length == 0 && this.handoverMode == 1) {
          this.$xutils.showMsgBox('提示', '请添加客户移交明细'); // 弹出提示
          return false;
        } else if (list.length == 0 && this.handoverMode == 2) {
          this.$xutils.showMsgBox('提示', '请添加业务移交明细'); // 弹出提示
          return false;
        }
      }
      return {
        cusPubHandoverApp: param,
        list: list
      };
    },
    // 暂存按钮处理
    doTempSave () {
      const _this = this;
      const userInfo = _this.$xutils.getLoginUserInfo();
      _this.d1_A_BillCard.setItemValue('updBrId', userInfo.orgCode);
      _this.d1_A_BillCard.setItemValue('updId', userInfo.loginCode);
      _this.d1_A_BillCard.setItemValue('updDate', _this.$xutils.dateFormat('yyyy-MM-dd', new Date()));
      _this.d1_A_BillCard.setItemValue('updateTime', _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      if (_this.d1_A_BillCard.getItemValue('handoverId') === _this.d1_A_BillCard.getItemValue('receiverId')) {
        this.$xutils.showMsgBox('提示', '移出人不能和接收人相同!');
        return;
      }
      // 如果保存成功，弹出框提示
      _this.saveData(res => {
        if (res.code == 0) {
          _this.$xutils.showMsgBox('提示', '保存成功!', 350, 150);
          _this.$dialog.close(_this.dialogId);
        } else {
          _this.$xutils.showMsgBox('提示', '保存失败!', 350, 150);
        }
      }, 'temp');
    },
    // d1_A 取消按钮，关闭当前页面
    doCancel () {
      // 关闭当前页面
      this.$dialog.close(this.dialogId);
    },
    // d1_B_BillList 新增 按钮操作
    handoverAppAdd () {
      const _this = this;
      // 点击新增时，校验客户移交方式必须输入
      // 客户移交方式
      const handoverMode = _this.d1_A_BillCard.getBillCardItemValue('handoverMode');
      if (handoverMode == '' || handoverMode == null) {
        _this.$xutils.showMsgBox('提示', '【客户移交方式】必须输入!');
        return;
      }
      const jsoPar = _this.d1_A_BillCard.getBillCardValue();
      this.serno = jsoPar.serno;
      let openUrl = '';
      if (handoverMode === '2') {
        openUrl = 'cusmanage/cushandover/cusPubHandoverLstInfoIndex';
      } else {
        openUrl = 'cusmanage/biz_rights_assign/cusSelectMultiIndex';
      }
      _this.$dialog.open(
        '客户移交新增',
        openUrl,
        950,
        _this.handoverMode == 1 ? 500 : 700,
        jsoPar,
        (data) => {
          if (this.handoverMode == 3) {
            _this.afterHandoverApp(data);
          } else if (this.handoverMode === '2') {
            if (JSON.stringify(data) !== '{}') {
              _this.d1_B_1_BillList.$refs.refTable.tabledata.push(data);
            }
          } else {
            data.forEach(item => {
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.workflowService + '/api/custom/bench/querycusflow?cusId=' + item.cusId,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    if (response.data.length == 0) {
                      _this.afterHandoverApp(data);
                    } else {
                      var cusName = response.data[0].bizUserName;
                      var flowName = response.data[0].flowName;
                      var bizId = response.data[0].bizId;
                      _this.$message({ message: '客户' + cusName + '存在流水号为【' + bizId + '】的' + flowName + '流程的在途任务，不可移交', type: 'error' });
                      return;
                    }
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                    return;
                  }
                }
              });
            });
          }
        },
        true,
        false
      );
    },
    afterHandoverApp (data) {
      data.forEach(item => {
        if (!item.cusId) {
          return false;
        }
      });

      if (this.handoverMode == 1 || this.handoverMode == 3) {
        data.forEach(item => {
          this.d1_B_BillList.$refs.refTable.tabledata.push(item);
        });
      } else {
        data.forEach(item => {
          this.d1_B_1_BillList.$refs.refTable.tabledata.push(item);
        });
      }
    },
    reloadData () {
      const model = {serno: this.pageData.serno};
      const params = { condition: JSON.stringify(model) };
      if (this.handoverMode == 1 || this.handoverMode == 3) {
        this.d1_B_BillList.$refs.refTable.remoteData(params);
      } else {
        this.d1_B_1_BillList.$refs.refTable.remoteData(params);
      }
    },
    // d1_B_BillList 删除按钮操作
    handoverAppDelete () {
      const _this = this;
      // 获取删除数据
      // const param = this.d1_B_BillList.getSelectedRowData();
      // const param2 = this.d1_B_1_BillList.getSelectedRowData();
      // 判断是否选中数据
      if (this.handoverMode == 1 || this.handoverMode == 3) {
        const param = this.d1_B_BillList.getSelectedRowData();
        if (param == null) {
          _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
          return;
        }
        param.oprType = '02';
        _this.$xutils.request({
          // 同步请求
          type: 'POST',
          url: _this.$backend.cmisCus + '/api/cuspubhandoverlst/deletebyparam',
          data: JSON.stringify(param),
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.$xutils.showMsgBox('提示', '删除成功');
              if (this.operate == 'add') {
                _this.d1_B_BillList.removeCurrRow();
              } else {
                _this.reloadData();
              }
            } else {
              this.$xutils.showMsgBox('提示', '删除失败');
            }
          },
          error: (result, b) => {
            this.$xutils.showMsgBox('提示', '系统异常');
          }
        });
      }


      if (this.handoverMode == 2) {
        const param = this.d1_B_1_BillList.getSelectedRowData();
        if (param == null) {
          _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
          return;
        }
        param.oprType = '02';
        _this.$xutils.request({
          // 同步请求
          type: 'POST',
          url: _this.$backend.cmisCus + '/api/cuspubhandoverlst/deletebyparam',
          data: JSON.stringify(param),
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.$xutils.showMsgBox('提示', '删除成功');
              _this.reloadData();
            } else {
              this.$xutils.showMsgBox('提示', '删除失败');
            }
          },
          error: (result, b) => {
            this.$xutils.showMsgBox('提示', '系统异常');
          }
        });
      }


      // if (this.handoverMode == 2) {
      //   if (param2 == null) {
      //     _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
      //     return;
      //   }
      // }
      // param.oprType = '02';
      // _this.$xutils.request({
      //   // 同步请求
      //   type: 'POST',
      //   url: _this.$backend.cmisCus + '/api/cuspubhandoverlst/update',
      //   data: JSON.stringify(param),
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       _this.$xutils.showMsgBox('提示', '删除成功');
      //       _this.reloadData();
      //     } else {
      //       this.$xutils.showMsgBox('提示', '删除失败');
      //     }
      //   },
      //   error: (result, b) => {
      //     this.$xutils.showMsgBox('提示', '系统异常');
      //   }
      // });
    },
    // 客户移交方式不同展示页面不同
    isBasicChangeFn (newVal) {
      // 如果新旧说句发生了改变，清空移交清单数据
      const param = {
        serno: this.d1_A_BillCard.getBillCardValue().serno
      };
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisCus + '/api/cuspubhandoverlst/deletebyparam',
        data: JSON.stringify(param),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 明细列表页面根据关联流水号查询
            this.reloadData();
          } else {
            this.$xutils.showMsgBox('提示', '查询失败');
          }
        },
        error: (result, b) => {}
      }, this);
    },
    callBack () {
      this.reloadData();
    }
  }
};
</script>
