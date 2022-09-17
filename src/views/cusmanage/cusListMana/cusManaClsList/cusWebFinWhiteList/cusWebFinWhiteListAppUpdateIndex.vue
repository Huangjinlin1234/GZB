<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard" :is-update-status="isUpdateStatus"></d1-a-billcard>
    </div>
    <div>
      <d1-b-billlist v-if="!doAddFlag" ref="d1_B_BillList"></d1-b-billlist>
    </div>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="doCancel"></yufp-nwf-init>
  </div>
</template>
<script>
import d1ABillcard from './cusWebFinWhiteListAppUpdate_d1_A_BillCard.vue';
import d1BBilllist from './cusWebFinWhiteListAppUpdate_d1_B_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
/**
 * 刘愿 网金客户白名单准入
 *
 */

export default {
  components: {d1ABillcard, d1BBilllist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      isUpdateStatus: false, // 是否可编辑，修改true, 查看：false
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
      if(this.bizPageData){
        var serno = this.bizPageData.instanceInfo.bizId;
        this.d1_A_BillCard.queryDataByCondition({'serno': serno});
        this.d1_B_BillList.setAppendSQLCondition({'serno': serno});
        this.d1_B_BillList.queryDataByCondition();
        this.d1_A_BillCard.setItemEditable('*', false);
        this.isUpdateStatus = false;
        this.d1_B_BillList.setBillListButtonVisable('新增', false);
        this.d1_B_BillList.setBillListButtonVisable('$delete', false);
        this.d1_B_BillList.setBillListButtonVisable('导入名单', false);
        this.d1_B_BillList.setBillListButtonVisable('模板下载', false);
      }else{
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
      }
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
        this.$message({message:'请添加准入名单！', type: 'warning'});
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
        startdto.bizType = 'KH021';
        startdto.bizId = dataTable.serno;
        // startdto.bizUserName = '';
        // startdto.bizUserId = '';
        _this.$refs.yufpNwfInit.wfInit(startdto);
      });
      this.flag;
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
      var opType = this.pageParams.opType;
      var _this = this;
      // 业务类型
      var data = _this.pageParams;
      if (opType == 'add') {
        data['serno'] = this.d1_A_BillCard.formdata.serno;
      } else if (opType == 'edit') {
        data['serno'] = this.pageParams.serno;
      }
      _this.$dialog.open(
        '',
        'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteDetailsAddIndex',
        900,
        500,
        data,
        (rtData) => {
          if (rtData == 'success') {
            _this.d1_B_BillList.queryDataByCondition();
          }
        }
      );
    }

  }
};
</script>
