<template>
    <div id="app">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <div style="margin-top:30px;">
        <el-select v-model="ipColumn" placeholder="请选择IP列" clearable>
          <el-option
            v-for="item in tableHeader"
            :key="item.index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button type="primary" @click.native="addToScanTask" style="margin-left: 10px;">添加至扫描任务</el-button>
      </div>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:30px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
</template>
  
<script>
import UploadExcelComponent from './UploadExcel.vue'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      ipColumn: ''
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '请上传小于1M的文件',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    addToScanTask() {
      if(this.ipColumn) {
        let ips = []
        this.tableData.forEach(row => {
          let ip = row[this.ipColumn]
          if(ip) {
            ips.push(ip.toString().replace(/\s/g,''))
          }
        });
        parent.goby.addScanIps(ips, 1)
        this.$message.success(`${ips.length} 个IP已被添加至扫描任务`)
      } else {
        this.$message.error('请先选择IP列')
      }
    }
  }
}
</script>

<style>
  ::-webkit-scrollbar{
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 0;
    background-color: #CFD9E5;
  }
  ::-webkit-scrollbar-track{
    background-color: transparent;
    -webkit-border-radius: 0;
    border-radius: 0
  }
</style>