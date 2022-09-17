<template>
  <div class="errPage-container">
    <errorA />
    <errorB />
    <!-- $t is vue-i18n global function to translate lang -->
    <h3>{{ $t('errorLog.tips') }}</h3>
    <code>
      {{ $t('errorLog.description') }}
      <a target="_blank" class="link-type" href="http://219.143.38.252:18080/yudp">
        {{ $t('errorLog.documentation') }}
      </a>
    </code>
    <a href="#">
      <img src="http://www.yusys.com.cn/group/newsCenter/newslist/201812/W020181213492932714886.png">
    </a>
  </div>
</template>

<script>
import errorA from './errorTestA'
import errorB from './errorTestB'

export default {
  name: 'ErrorLog',
  components: { errorA, errorB }
}
</script>

<style scoped>
  .errPage-container {
    padding: 30px;
  }
</style>
