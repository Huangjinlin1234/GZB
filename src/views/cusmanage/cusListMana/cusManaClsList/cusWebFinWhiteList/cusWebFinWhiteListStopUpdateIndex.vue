<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard" :is-update-status="isUpdateStatus"></d1-a-billcard>
    </div>
    <div>
      <d1-b-billlist v-if="!doAddFlag" ref="d1_B_BillList"></d1-b-billlist>
    </div>
    <yufp-nwf-init ref="yufpNwfInit"  @success-click="doCancel"></yufp-nwf-init>
  </div>
</template>
<script>
import d1ABillcard from './cusWebFinWhiteListStopUpdate_d1_A_BillCard.vue';
import d1BBilllist from './cusWebFinWhiteListStopUpdate_d1_B_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';

/**
 * 刘愿 网金客户白名单停用
 *
 */
export default {
  components: {d1ABillcard, d1BBilllist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      doAddFlag: false,
      flag: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      var opType = this.pageParams.opType;
      this.d1_A_BillCard.setBillCardValue(this.pageParams);
      if (opType == 'view') {
        // 查看 页面只读
        this.d1_A_BillCard.setItemEditable('*', false);
        // 按钮隐藏
        this.d1_B_BillList.setBillListButtonVisable('新增', false);
        this.d1_B_BillList.setBillListButtonVisable('$delete', false);
        this.d1_B_BillList.setBillListButtonVisable('导入名单', false);
        this.d1_B_BillList.setBillListButtonVisable('模板下载', false);
      } else if (opType == 'add') {
        // 如果是查看，则只显示取消按钮
        this.isUpdateStatus = true;
        this.d1_A_BillCard.execBillCardDefaultValueFormula();
      } else if (opType == 'edit') {
        // 名单列表数据根据流水号显示
        this.isUpdateStatus = true;
      }
      this.d1_B_BillList.setAppendSQLCondition({'serno': this.d1_A_BillCard.formdata.serno });
      this.d1_B_BillList.queryDataByCondition();
    },

    // d1-A 保存操作
    doSave () {
      var _this = this;
      _this.commonSave(function () {
        _this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {});
      });
    },

    // 提交
    doSubmit () {
      // 必输校验
      let validateFlag = this.d1_A_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      if(this.d1_B_BillList.$refs.refTable.total < 1){
        this.$message({message:'请添加停用名单！', type: 'warning'});
        return;
      }
      this.commonSave(() => {
        var _this = this;
        var dataTable = this.d1_A_BillCard.formdata;
        var startdto = {};
        const loginUser = _this.$xutils.getLoginUserInfo();
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.code;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'KH022';
        startdto.bizId = dataTable.serno;
        // startdto.bizUserName = '';
        // startdto.bizUserId = '';
        _this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },

    // 暂存，提交通用的方法
    commonSave (func) {
      var _this = this;
      _this.flag = false; ;
      var dataTable = this.d1_A_BillCard.formdata;
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisCus + '/api/cuslstwjkhapp/tempSave',
        data: dataTable,
        callback: function (code, message, response) {
          if (code === '0') {
            if (response.data == '1') {
              func && func();
            } else {
              _this.$message('暂存失败!');
            }
          } else {
            _this.$message({
              message: message,
              type: 'error'
            });
          }
        }
      });
    },

    // d1_A 取消按钮，关闭当前页面
    doCancel () {
      this.$dialog.close(this.dialogId);
    },

    // d1_B 新增操作
    doAdd () {
      var _this = this;
      // 业务类型
      var data = _this.pageParams;
      data['serno'] = _this.d1_A_BillCard.formdata.serno;

      _this.$dialog.open(
        '网金客户白名单选取',
        'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListStopSelect',
        900,
        500,
        data,
        (rtData) => {
          if (rtData) {
            rtData.serno = _this.d1_A_BillCard.formdata.serno;
            rtData['busiType'] = _this.d1_A_BillCard.formdata.busiType;
            _this.$request({
              method: 'POST',
              url: backend.cmisCus + '/api/cuslstwjkhmxxx/',
              data: rtData
            }).then((response) => {
              if (response.code === '0') {
                _this.$message('新增成功');
                // console.log('新增成功');
                _this.d1_B_BillList.queryDataByCondition();
              } else {
                _this.$message('新增失败');
                // console.log('新增失败');
              }
            });
          }
        }
      );
    }


  }
};
</script>
