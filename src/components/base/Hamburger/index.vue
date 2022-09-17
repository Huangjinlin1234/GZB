<template>
  <div>
    <yu-row>
      <yu-col :span="19">
        <div class="zrc-frame-search" v-if="isActive">
          <i class="zrcbk-icon-toubu-sousuo" @click="searchBarClick"></i>
          <yu-input placeholder="搜索快捷菜单..." v-model="searchValue" @input="searchDataFilter"></yu-input>
        </div>
      </yu-col>
      <yu-col :span="5">
        <div @click="toggleClick" style="height: 42px;    text-align: center;    line-height: 42px;">
          <!--<svg :class="{'is-active':isActive}" class="hamburger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
      </svg>-->
          <i :class="{ 'yu-icon-meun-fold hamburger': true, 'is-active': !isActive }"></i>
        </div>
      </yu-col>
    </yu-row>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
      searchPlaceholder: '搜索快捷菜单...',
      searchValue: ''
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick');
    },
    searchDataFilter () {
      // console.log('输入的值' + this.searchValue);
      this.$emit('searchDataFilter', this.searchValue);
    }
  }
};
</script>

<style scoped>
.hamburger {
  display: inline-block;
  width: 20px;
  position: relative;
  width: 48px;
  text-align: center;
  color: #949494;
  font-size: 20px;
  transition: transform 0.1s;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
