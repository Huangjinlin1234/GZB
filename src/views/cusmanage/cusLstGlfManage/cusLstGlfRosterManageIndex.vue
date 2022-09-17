<template>
  <div>
    <div style="display:inline-block;width:350px;height:80px;float: left">
    <yu-input v-model="searchText">
      <template slot="append">
         <yu-button @click="doSearch">查询</yu-button>
      </template>
    </yu-input>
      <yu-xtree ref="d1_A_BillTree"
          :data-url="treeDataUrl"
          @node-click="onSelectTree"
          data-id="value"
          data-label="label"
          request-type="POST"
          data-params="000000"
          :expand-on-click-node="false"
          :default-expand-all="true"
          :filter-node-method="filterNodes"
      ></yu-xtree>
    </div>
    <div style="display:inline-block;width:calc(100% - 350px)">
      <div>
        <div style="display:inline-block;height:50px;margin-left: 20px;">
          <div style="display:flex;height:100%;align-items: center">
            <yu-button v-if="isShowInsertRepr" type="primary" @click="insertRepr">添加法人</yu-button>
            <yu-button v-if="isShowInsertPop" type="primary" @click="insertPop">添加自然人</yu-button>
            <yu-button type="primary" @click="exit">退出</yu-button>
          </div>
        </div>
        <div style="display:inline-block;height:calc(100% - 50px)">
          <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import d1BBBillcard from './cusLstGlfRosterManage_d1_B_B_BillCard.vue';
// 选择树结点的逻辑，就是查询右边的卡片,但要考虑反向选择的情况
// var selectedTreeNode;

export default {
  components: {d1BBBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      searchText: '',
      d1_B_B_BillCard: null,
      treeDataUrl: this.$backend.cmisCus + '/api/cuslstglf/treelist',
      isShowInsertRepr: true,
      isShowInsertPop: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    doSearch () {
      this.$refs.d1_A_BillTree.filter();
    },
    filterNodes (value, data, node) {
      if (node[this.$refs.d1_A_BillTree.dataLabel].indexOf(this.searchText) > -1) {
        return true;
      }
      return false;
    },
    /**
       * 关联方名单管理界面
       * @constructor
       */
    AfterInit () {
      this.d1_A_BillTree = this.$refs.d1_A_BillTree;
      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;
      this.d1_B_B_BillCard.execBillCardDefaultValueFormula();// 数据字典对应的2生效，将其设置为此下拉框的默认值

      // 添加表单监听 设置CHANGE事件
      // this.d1_B_B_BillCard.addEditChangeAction(change);
    },

    onSelectTree (_treeNode, _event) {
      // 如果选择的结点为空,即取消选择了,或者是根结
      // if (strOrg_id == null || strOrg_id == undefined) {
      // 清空卡片数据
      this.d1_B_B_BillCard.resetBillCardData();
      // 设置卡片状态为空
      this.d1_B_B_BillCard['BillSaveStatus'] = null;

      this.d1_B_B_BillCard.setBillCardValue(_treeNode.data);
      // selectedTreeNode = _treeNode;
      // const type = _treeNode.relatedPartyType;
      // const levels = _treeNode.levels;

      // if (type == '01') {
      //   this.isShowInsertRepr = true;
      //   this.isShowInsertPop = false;
      //   return;
      // } else if (type == '02') {
      //   this.isShowInsertRepr = false;
      //   this.isShowInsertPop = true;
      //   return;
      // } else {
      //   this.isShowInsertRepr = false;
      //   this.isShowInsertPop = false;
      //   return;
      // }
    },

    // 添加法人
    insertRepr () {
      this.d1_B_B_BillCard.setItemEditable('org_code', true);

      // 取得树选中的数据
      const selNodeData = this.d1_A_BillTree.getCurrentNode();

      if (selNodeData == null) {
        this.$xutils.showMsgBox('提示', '必须先选择一个父结点才能进行新增操作!');
        return;
      }

      // 关联方名称
      const name = selNodeData.data['relatedPartyName'];

      // 证件号码
      const certCode = selNodeData.data['certCode'];

      // 先清空卡片数据
      this.d1_B_B_BillCard.resetBillCardData();

      // 执行卡片默认值公式
      this.d1_B_B_BillCard.execBillCardDefaultValueFormula();

      this.d1_B_B_BillCard.setBillCardItemValue('parebt_related_party_name', name);
      this.d1_B_B_BillCard.setBillCardItemValue('parebt_related_party_cert_no', certCode);

      // 设置状态
      this.d1_B_B_BillCard['BillSaveStatus'] = 'INSERT';
    },

    // 添加自然人
    insertPop () {
      this.d1_B_B_BillCard.setItemEditable('org_code', true);
      const selNodeData = this.d1_A_BillTree.getCurrentNode(); // 取得树选中的数据

      if (selNodeData == null) {
        this.$xutils.showMsgBox('提示', '必须先选择一个父结点才能进行新增操作!');
        return;
      }

      const name = selNodeData.data['relatedPartyName'];
      const certCode = selNodeData.data['certCode'];

      // 先清空卡片数据
      this.d1_B_B_BillCard.resetBillCardData();

      // 执行卡片默认值公式
      this.d1_B_B_BillCard.execBillCardDefaultValueFormula();

      this.d1_B_B_BillCard.setBillCardItemValue('parebt_related_party_name', name);
      this.d1_B_B_BillCard.setBillCardItemValue('parebt_related_party_cert_no', certCode);

      // 设置状态
      this.d1_B_B_BillCard['BillSaveStatus'] = 'INSERT';
    },

    // 保存
    onSave () {
      let currSaveStatus = this.d1_B_B_BillCard['BillSaveStatus'];

      if (currSaveStatus == null || currSaveStatus == '') {
        currSaveStatus = 'UPDATE';
      }
      var oldVar = null;
      debugger;
      this.$request({
        method: 'Get',
        url: backend.cmisCus + '/api/cuslstglf/',
        data: {condition: {'relatedPartyName': this.d1_B_B_BillCard.formdata.relatedPartyName, 'status':'1'}}
      }).then((response) => {
        if (response.code == 0) {
          oldVar = response.data[0];
          // 如果是增加数据
          if (currSaveStatus == 'INSERT') {
            if (oldVar) {
              this.$xutils.showMsgBox('提示', '关联方名称已存在!');
              return;
            }
            this.d1_B_B_BillCard.saveBillCardData(this.backRefresh);
          } else if (currSaveStatus == 'UPDATE') {
            // 修改数据
            if (oldVar && oldVar.serno != this.d1_B_B_BillCard.formdata.serno) {
              this.$xutils.showMsgBox('提示', '关联方名称已存在!');
              return;
            }
            this.d1_B_B_BillCard.updateBillCardData(this.backRefresh);
          }
        }
      });
    },

    backRefresh () {
      this.d1_A_BillTree.remoteData();
    },
    exit () {
      if (!this.d1_B_B_BillCard.formdata.serno) {
        return;
      }
      this.$request({
        method: 'post',
        url: backend.cmisCus + '/api/cuslstglf/updateSelective',
        data: {serno: this.d1_B_B_BillCard.formdata.serno, status: '0'}
      }).then((response) => {
        if (response.code == '0') {
          this.$message('操作成功');
          this.$refs.d1_A_BillTree.remoteData();
          this.d1_B_B_BillCard.formdata.status = '0';
        }
      });
    },
    // 返回
    OnClose () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
