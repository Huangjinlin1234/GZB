<template>
  <div>
    <yu-container>
        <el-aside height="800px" highlight-current>
            <yu-xtree :local-data="data" data-id="id" data-label="label"  data-pid="pid" data-root="0" @node-click="handleNodeClick" ></yu-xtree>
        </el-aside>
        <el-main>
            <yu-panel title="合同影像信息" panel-type="simple"  v-show="isShow">
                <imageDataIndex ref="imageDataIndex" :pageParams="imageData"></imageDataIndex>
            </yu-panel>      
            <yu-panel title="合同基本信息" panel-type="simple"  v-show="!isShow">
                <docAsplTcontForm ref="docAsplTcontForm"></docAsplTcontForm>
            </yu-panel>   
        </el-main>
    </yu-container>
  </div>
</template>
<script>
// 合同类型
import mixin from '@/utils/mixin';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
import imageDataIndex from '@/views/zrcbank/biz/imageData/imageDataIndex.vue';
import docAsplTcontForm from './docAsplTcontForm.vue';
export default {
  components: {imageDataIndex},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
        data: [
          { id: '0', label: '贸易合同申请信息', pid: '-1', children:[
            { id: '01', label: ' 合同基本信息', pid: '-1'},
            { id: '02', label: '合同影像信息', pid: '-1' }
          ]}
        ],
        isShow: false,
        imageData:{
            
        }
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 最高额授信协议申请列表
    AfterInit () {
     
    },
    // 列表点击时间
    handleNodeClick: function (data) {
         if (data.id == '01') {
            this.isShow = false;
         }else if(data.id == '02'){
            this.isShow = true;
         }
    },
    // 新增
    doAdd () {
        
    },
    // 删除
    doDelete () {
    },
    doUpdate: function () {
    
    },
    // 下一步
    nextFn: function () {

    }
  }
};
</script>
