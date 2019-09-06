<template>
    <div class="footer-bar">&copy; 2019 Sin-Admin Copyright</div>
</template>

<script>
  import variables from '@/styles/variables.scss'
  export default {
    computed: {
      variables() {
        return variables
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 15px 10px 0;
    text-align: right;
    background-color: white;
    font-size: 13px;
    z-index: 999;
    border-top: 1px solid #E7EAEC;
    width: 100%;
  }
</style>
