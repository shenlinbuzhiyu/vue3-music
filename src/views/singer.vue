<template>
  <div class="singer">
    <IndexList :data="singers" v-loading="!singers.length"></IndexList>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list.vue'
export default {
  name: 'singer',
  components: {
    IndexList
  },
  data() {
    return {
      singers: []
    }
  },
  async created() {
     const result = await getSingerList()
     this.singers = result.singers
  }
}
</script>

<style lang="scss" scoped>
  .singer{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
