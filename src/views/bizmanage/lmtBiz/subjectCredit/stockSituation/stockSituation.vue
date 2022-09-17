<template>
  <yu-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <yu-tab-pane label="主体授信" name="first">
      <subjectCredit v-if="activeName=='first'" :children="children"></subjectCredit>
    </yu-tab-pane>
    <yu-tab-pane v-if="group" label="机构归属集团存量授信" name="second">
      <yu-xform ref="refForm" v-model="formdata" label-width="120px">
        <yu-panel title="机构归属集团存量授信" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="所属集团名称" placeholder="所属集团名称" name="grpCusName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="集团授信总额" placeholder="集团授信总额" name="grpLmtAmt" ctype="yu-num" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-button-drop style="margin-bottom:10px;">
            <yu-button ref="btn_doView" type="primary" @click="doView">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl"
            :base-params="Param" requestType="POST" :default-load="true">
            <yu-xtable-column label="成员客户编号" prop="cusId" width="200"></yu-xtable-column>
            <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信总额（万元）" prop="lmtAmt" width="150">
              <template slot-scope="scope">
                <span>{{ parseFloat(scope.row.lmtAmt / 10000).toFixed() }}</span>
              </template>
            </yu-xtable-column>
            <!-- <yu-xtable-column label="已用额度" prop="outstndAmt" width="150"></yu-xtable-column> -->
            <yu-xtable-column label="可用额度（万元）" prop="avlLmtAmt" width="150">
              <template slot-scope="scope">
                <span>{{ parseFloat(scope.row.avlLmtAmt / 10000).toFixed() }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column v-if="children.customer==3" label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-xform>
    </yu-tab-pane>

    <!-- 机构归属集团存量授信  查看弹层 -->
    <yu-xdialog title="查看详情" :visible.sync="show_dialog" width="800px" height="300px">
      <subjectCredit v-if="show_dialog" :children="children"></subjectCredit>
    </yu-xdialog>
  </yu-tabs>
</template>
<script>
import subjectCredit from './subjectCredit';
import {isNull} from "../../common/bizUtils";
export default {
  components: {
    subjectCredit
  },
  props: {
    children: Object
  },
  data () {
    return {
      formdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtapprelcuslimit/selectByModel',
      Param: {
        condition: JSON.stringify({
          serno: this.children.serno,
          oprType: '01'
        })
      },
      activeName: 'first',
      show_dialog: false,
      group: false
    };
  },
  created () {
    console.log('==========================', this.children);
    let serno = this.children.serno;
    // this.getDetails(serno);
    this.stockStatus(serno);
  },
  mounted () {},
  methods: {
    // 存量业务情况页签显示状态获取
    stockStatus (serno) {
      var _this = this;
      if (isNull(serno)) {
        _this.$message({message: '获取失败，请重新访问！', type: 'error'});
        return;
      }
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsiginvestapp/cunLiangYeWuTabsStatus',
          data: {
            serno: serno
          }
        })
        .then((data) => {
          if (data.code == '0') {
            _this.group = data.data.tab2;
            _this.getDetails(serno);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
    },
    getDetails (serno) {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprelgrplimit/getGrpLmtInfoBySerno',
          data: {
            serno: serno
          }
        })
        .then((data) => {
          if (data.code == '0') {
            console.log('========================', data);
            yufp.clone(data.data, _this.formdata);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
    },
    person (serno) {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprelgrplimit/getGrpLmtInfoBySerno',
          data: {
            serno: serno
          }
        })
        .then((data) => {
          if (data.code == '0') {
            console.log('========================', data);
            yufp.clone(data.data, _this.formdata);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
    },
    // 查看
    doView () {
      var _this = this;
      let jsoPar = _this.$refs.refTable1.selections;
      if (jsoPar.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      _this.show_dialog = false;
      this.children = jsoPar[0];
      _this.$nextTick(() => {
        _this.show_dialog = true;
      });

      // _this
      //   .$request({
      //     method: "POST",
      //     url: backend.cmisBiz + "/api/lmtapprelcusdetailslimit/selectByPkId",
      //     data: {
      //       // pkId: jsoPar[0].pkId,
      //     },
      //   })
      //   .then((data) => {
      //     if (data.code == "0") {
      //       console.log("========================", data);
      //       yufp.clone(data.data, _this.formdata);
      //     } else {
      //       _this.$message({ message: "请求失败", type: "error" });
      //     }
      //   });
    },
    doCancel () {
      this.show_dialog = false;
    }
  }
};
</script>
