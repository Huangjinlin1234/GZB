<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgBizRateList_d1_BillList.vue';
export default {
  components: { d1Billlist },
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
    this.$lookup.reg('STD_ZB_OPRD_TYP', 'STD_ZB_CUR_TYP', 'STD_ZB_BIZ_TYP');
    this.AfterInit();
  },
  methods: {
    /**
     *  业务参数配置列表
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    doAdd () {
      // YuXP.openDialog('利率配置-新增', '/yuxp/product/pages/cfgmanage/cfgBizParamInfoList/cfgRateInsertBiz.js', -1, -1, {}, null);
      this.$dialog.open('利率配置(新增)', 'cfgmanage/cfgBizParamInfoList/cfgRateInsertBizIndex', 800, 600, {}, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    doUpdate () {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      let pkId = jsoPar['pkId']; // 主键id

      // 绘制修改页面
      this.$dialog.open('利率配置(修改)', 'cfgmanage/cfgBizParamInfoList/cfgRateListUpdateIndex', '900', '600', jsoPar, null);
      //         jsoPar['model_group_no'] = 'CMG000059';//利率配置-修改
      //         jsoPar['op'] = 'EDIT';
      //         jsoPar['recons'] = 'RECONS';
      // 绘制修改页面
      // YuXP.openDialog('利率配置修改', '/yuxp/product/pages/cfgmanage/productconfig/templetfactory/tempetfactorypreview.js', '1200', '800', jsoPar, close);
    },

    // 查看
    doView () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // 绘制查看面
      this.$dialog.open('利率配置(查看)', 'cfgmanage/cfgBizParamInfoList/cfgRateListViewIndex', '900', '600', jsoPar, null);
    },

    // 利率配置模板下载
    byModelDown () {
      this.$dialog.open('制式模板文件下载', 'cfgmanage/cfgStandardTemplate/cfgStandardTemplateFileDownloadIndex', 1200, 800, null);
    },

    // 利率配置批量数据导入
    // 批量导入成功,回调
    byImport () {
      this.$dialog.open(
        '文件导入',
        'cfgmanage/cfgBizParamInfoList/cfgRatelistImportIndex',
        500,
        300,
        {
          templetcode: 'cfg_rate_list'
        },
        this.backRateList()
      );
    },

    backRateList () {
      this.d1_BillList.queryDataByCondition();
    },

    // 列表数据导出
    // 删除操作
    outPort () {
      this.d1_BillList.downloadBillListDataAsExcel();
    },

    doDelete () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let current_id = jsoUser['loginCode']; // 当前登录人
      let manager_id = jsoPar['managerId']; // 责任人
      let pkId = jsoPar['pkId']; // 主键id

      this.$xutils.showConfirmBox('提示', '该操作会删除利率配置信息,是否确认要删除？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          // 调用后端的删除逻辑，删除相关的关系表数据
          this.$xutils.request({
            // 同步请求
            async: false,

            url: this.$backend.cmisCfg + '/api/cfgrate/delete/' + pkId,
            data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                  this.d1_BillList.queryDataByCondition();
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            },

            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    }
  }
};
</script>
