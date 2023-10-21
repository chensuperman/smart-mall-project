<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="search" @search="goSearch(search)" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(search)" >搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length>0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div class="list-item" v-for="item in history" :key="item" @click="goSearch(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '', // 输入框的内容
      history: getHistoryList()// 历史记录
    }
  },
  methods: {
    goSearch (key) {
      // console.log(key)
      if (key !== '') {
        const index = this.history.indexOf(key)
        if (index !== -1) {
        // 存在相同的项，将原有的关键字移除
        // splice（开始位置，个数，项1，项2）
          this.history.splice(index, 1)
        }
        // 前插数组
        this.history.unshift(key)
        // 持久化搜索列表
        setHistoryList(this.history)
        // 清空搜索栏
        this.search = ''

        // 跳转到搜索列表页
        this.$router.push(`/searchlist/?search=${key}`)
      } else {
        Toast.fail('输入为空')
      }
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
