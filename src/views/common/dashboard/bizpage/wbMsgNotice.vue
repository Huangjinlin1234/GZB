
<template>
    <!--
    @created by dongan
    @description 更多消息列表界面
    -->
  <div >
   <!-- <yu-xdialog title="问题交流"> -->
        <yu-panel title="消息提示" panel-type="normal">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
                <yu-xform-group :column="3">
                <yu-xform-item label="消息内容" placeholder="输入关键字模糊查询" name="noticeContent" ctype="input" fuzzy-query="both" />
                <yu-xform-item label="消息状态" placeholder="---请选择---" name="readSts" ctype="select" data-code="STD_WB_MESSAGE_STATUS" />
                </yu-xform-group>
            </yu-xform>
            <yu-button-drop>
                <yu-button @click="modifyFn">标记为已读</yu-button>
            </yu-button-drop>
            <yu-xtable index selection-type="checkbox" ref="refTable" row-number :data-url="dataUrl" :base-params="params" request-type="GET">
                <yu-xtable-column label="消息内容" prop="noticeContent"  >
                    <template slot-scope="scope">
                      <a class="underline" @click="wbMsgNoticeDetailFn(scope.row)" >{{ scope.row.noticeContent }}</a>
                    </template>
                </yu-xtable-column>
                <yu-xtable-column label="发布时间" prop="pubTime"  />
                <yu-xtable-column label="消息状态" prop="readSts" data-code="STD_WB_MESSAGE_STATUS" />
            </yu-xtable>
        </yu-panel>

        <yu-xdialog title="消息详情" :visible.sync="dialogVisible" width="1000px">
      <yu-xform ref="refForm" label-width="150px"  v-model="formdata" :disabled="formDisabled">
        <yu-xform-group :column="2">
          <yu-xform-item label="消息流水号" name="noticeId" ctype="input"></yu-xform-item>
          <yu-xform-item label="消息内容" name="noticeContent" ctype="textarea" :rows="3" :colspan="24" ></yu-xform-item>
          <yu-xform-item label="发布时间" name="pubTime" ctype="input"></yu-xform-item>
          <!-- 
            <yu-xform-item label="消息状态" name="messageStatus" ctype="select" data-code="STD_WB_MESSAGE_STATUS"></yu-xform-item>
            <yu-xform-item label="接收人类型" name="receiverType" ctype="input"></yu-xform-item>
            <yu-xform-item label="接收人工号" name="managerId" ctype="input"></yu-xform-item>
            <yu-xform-item label="接收人姓名" name="managerIdName" ctype="input"></yu-xform-item>
            <yu-xform-item label="接收人所属机构" name="managerBrIdName" ctype="input"></yu-xform-item>
           -->
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { lookup } from '@/utils';
lookup.reg('STD_WB_NOTICE_TYPE,STD_WB_MESSAGE_STATUS');

export default {
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/adminsmnotice/view/list',
      updateUrl: backend.appOcaService + '/api/notice/adminsmnoticeread/save',
      updateByIdsUrl: backend.cmisCfg + '/api/wbmsgnotice/batchupdate/',
      activeName: '1',
      searchFormdata: {}, // 查询条件框
      formdata: {},
      params: { },
      pages: 10,
      dialogVisible: false,
      formDisabled: true,
      status: '', //消息状态
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    // this.params = { condition: { inputId: this.loginCode, default: '1'}, sort: 'pub_time desc,noticeId desc'};// default 有值时，默认查询未读的消息
  },
  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      let _this = this;
      let model = {};
      if(_this.status === '0') {
        model.readSts = '1';
        yufp.service.request({
          method: 'GET',
          url: _this.updateUrl,
          data: {noticeIds: _this.formdata.noticeId},
          callback: function (code, message, response) {
            if (response.code != '0') {
              _this.$message({ message: '更新失败！', type: 'error'});
            }
            _this.$refs.refTable.remoteData();
          }
        });
      }
      _this.dialogVisible = false;
    },
    /**
     * 标记为已读
     */
    modifyFn: function () {
      let _this = this;
      var _length = _this.$refs.refTable.selections.length;
      var ids = new Array(_length);
      if (_length > 0) {
        for (let i = 0; i < _length; i++) {
          ids[i] = _this.$refs.refTable.selections[i].noticeId;
        }
        yufp.service.request({
          method: 'GET',
          url: _this.updateUrl,
          data: {noticeIds: ids.join(',')},
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '标记成功！', type: 'info'});
              _this.$refs.refTable.remoteData();
            }
          }
        });
      } else {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
    },

    /**
     * 消息提示详情
     */
    wbMsgNoticeDetailFn (row) {
      setTimeout(() => {
        this.formdata.noticeId = row.noticeId;
        this.formdata.noticeContent = row.noticeContent;
        this.formdata.pubTime = row.pubTime;
        this.status = row.readSts;
      }, 300)
      this.dialogVisible = true;
      // this.$request({
      //   url: this.dataUrl,
      //   method: 'GET',
      //   data: {
      //     noticeId: row.noticeId
      //   }
      // }).then(({code, message, data}) => {
      //   if (code == '0') {
      //     yufp.clone(data, this.formdata);
      //   } else {
      //     this.$message({message: message || '获取数据失败', type: 'error'});
      //   }
      // });
    }
  }
};
</script>
