<template>
  <div class="user-management">
    <div class="org-container">
      <div class="title">
        <div class="text">组织机构</div>
        <div class="opt">
          <i class="el-icon-edit"></i>
          <i class="el-icon-arrow-down"></i>
          <!--<i class="el-icon-arrow-up"></i>-->
          <i class="el-icon-refresh"></i>
        </div>
      </div>
      <el-scrollbar class="org-list">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <el-scrollbar class="user-list">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "User",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  }
</script>

<style lang="scss" scoped>

  $mainColor: #409EFF;
  $borderColor: #E6E6E6;

  .user-management {
    height: calc(100vh - 119px);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-flow: row nowrap;
    justify-content: flex-start;

    .org-container {
      width: 220px;

      .title {
        display: flex;
        padding: 20px 12px 15px 14px;
        border-bottom: solid 1px $borderColor;
        border-right: solid 1px $borderColor;
        color: #222;
        font-weight: bold;

        .opt {
          flex-grow: 1;
          text-align: right;

          i {
            margin-left: 10px;
            cursor: pointer;
            font-weight: bold;

            &:hover {
              color: $mainColor;
            }
          }
        }
      }

      .org-list {
        height: calc(100vh - 173px);

        /deep/ .el-scrollbar__wrap {
          border-right: solid 1px $borderColor;

          .el-menu {
            border: none;
          }
        }
      }
    }

    .user-list {
      flex-grow: 1;

      .el-main {
        z-index: -1;
      }
    }
  }

</style>
