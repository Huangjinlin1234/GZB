<template>
  <div>
    <div style="height:50px">
          </div>
    <div style="height:calc(100% - 50px)">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 业务规则扩展类弹窗js
       */
    AfterInit () {
      const strWebContext = this.$xutils.getTopMenuWindow().YUFP_SYS_CONFIG.webcontext;

      this.$xutils.importJsOrderBy(
        [strWebContext + '/yuxp/framework/libs/ztree/js/jquery.ztree.exhide.min.js'],
        0
      );

      this.$xutils.createBillQuery('yuxpservice', 'd1_A', 'cfg_rule_class');
      this.d1_B_BillTree = this.$refs.d1_B_BillTree;
      this.d1_B_BillTree.addNodeDBClickAction(this.nodeDbClickFn);
      this.d1_A_BillQuery.addCustQueryAction(this.searchNode);
      this.initTreeData();
    },

    /**
       * 初始化树数据
       */
    initTreeData () {
      this.$xutils.request({
        url: this.$backend.cmisCfg + '/api/cfgriskprevent/beanNameSet',
        type: 'GET',

        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.processTreeData(response.data);
          }
        }
      });
    },

    /**
       * 查询返回的数据
       * @param {*} orgindata
       */
    processTreeData (orgindata) {
      const treeListData = [];
      const tempServices = [];

      if (orgindata.length > 0) {
        for (let index = 0; index < orgindata.length; index++) {
          const element = orgindata[index];
          const itemArry = element.split('.');
          const tempObj = {};
          tempObj['service_name'] = itemArry[0];
          tempObj['bean_name'] = itemArry[1];
          tempObj['name'] = itemArry[2];
          treeListData.push(tempObj);

          if (tempServices.indexOf(itemArry[0]) < 0) {
            tempServices.push(itemArry[0]);
            const newObj = {};
            newObj['service_name'] = '';
            newObj['bean_name'] = itemArry[0];
            newObj['name'] = itemArry[0];
            treeListData.push(newObj);
          }
        }
      }

      const opt = {};
      opt['idField'] = 'bean_name';
      opt['textField'] = 'name';
      opt['parentField'] = 'service_name';
      const treeData = this.$xutils.arrayToTree(opt, treeListData);
      this.d1_B_BillTree.setTreeData(treeData);
    },

    confirmFn () {
      const node = this.d1_B_BillTree.getSelectedNode();

      if (node) {
        if (node.isParent) {
          this.$xutils.showMsgBox('提示', '请选择正确的扩展类！');
          return;
        }

        const returnData = {};
        returnData['service_bean_name'] = node.service_name + ':' + node.bean_name;
        this.$dialog.close(this.dialogId, returnData);
      } else {
        this.$xutils.showMsgBox('提示', '请选择扩展类！');
      }
    },

    cancelFn () {
      this.$dialog.close(this.dialogId, false);
    },

    nodeDbClickFn (e, node) {
      if (node.isParent) {
        return;
      }

      const returnData = {};
      returnData['service_bean_name'] = node.service_name + ':' + node.bean_name;
      this.$dialog.close(this.dialogId, returnData);
    },

    // 搜索
    searchNode () {
      const condi = this.d1_A_BillQuery.getBillQueryValue();
      const ztree = this.d1_B_BillTree.zTreeObj;

      let nodeList = ztree.getNodesByFilter(node => {
        let isShow = true;

        if (node.isParent) {
          return true;
        }

        if (condi.bean_name && condi.rule_desc) {
          isShow = node.bean_name.indexOf(condi.bean_name) > -1 && node.name.indexOf(condi.rule_desc) > -1;
        } else if (condi.bean_name) {
          isShow = node.bean_name.indexOf(condi.bean_name) > -1;
        } else if (condi.rule_desc) {
          isShow = node.name.indexOf(condi.rule_desc) > -1;
        }

        if (isShow) {
          ztree.showNode(node);
        } else {
          ztree.hideNode(node);
        }

        return isShow;
      });
    }
  }
};
</script>
