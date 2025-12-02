<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          v-model.trim="formParams.input"
          placeholder="请输入站点名称、ID"
        >
          <template #append>
            <el-select v-model="select" style="width: 115px">
              <el-option label="按名称查询" value="name" />
              <el-option label="按ID查询" value="id" />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="formParams.values" placeholder="充电站状态">
          <el-option label="全部" :value="1" />
          <el-option label="使用中" :value="2" />
          <el-option label="空闲中" :value="3" />
          <el-option label="维护中" :value="4" />
          <el-option label="待维修" :value="5" />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="default" @click="loadData"
          >查询</el-button
        >
        <el-button type="warning" size="default" @click="handleReset"
          >重置</el-button
        >
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-row>
      <el-col :span="6">
        <el-statistic title="累计充电量(度)" :value="268500" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计充电次数(次)" :value="8500" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="服务区域(个)" :value="2500" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计效益(元)" :value="7713865" />
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-button type="primary" size="default" icon="Plus">
      新增充电站
    </el-button>
  </el-card>
  <el-card class="mt">
    <el-table
      v-loading="loading"
      element-loading-text="Loading..."
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" width="60" label="序号" align="center" />
      <el-table-column
        prop="name"
        label="站点名称"
        width="180"
        align="center"
      />
      <el-table-column prop="id" label="站点ID" align="center" />
      <el-table-column prop="city" label="所属城市" align="center" />
      <el-table-column prop="fast" label="快充数" align="center" />
      <el-table-column prop="slow" label="慢充数" align="center" />
      <el-table-column prop="status" label="充电站状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 2" type="success">使用中</el-tag>
          <el-tag v-if="scope.row.status === 3" type="primary">空闲中</el-tag>
          <el-tag v-if="scope.row.status === 4" type="warning">维护中</el-tag>
          <el-tag v-if="scope.row.status === 5" type="danger">待维修</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="now" label="正在充电" align="center" />
      <el-table-column prop="fault" label="故障数" align="center" />
      <el-table-column prop="person" label="站点负责人" align="center" />
      <el-table-column
        prop="tel"
        label="负责人电话"
        width="110"
        align="center"
      />
      <el-table-column label="操作" width="110" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" icon="Edit" />
          <el-popconfirm
            title="确定要删除吗？"
            icon="WarningFilled"
            icon-color="#F56C6C"
            confirm-button-type="danger"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      class="fr mt mb"
      :page-sizes="[10, 20, 30, 40]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="totals"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { listApi } from "@/api/chargingstation";
const select = ref("name");
const formParams = reactive({
  input: "",
  values: 1,
});

const loadData = async () => {
  loading.value = true;
  const {
    data: { list, total },
  } = await listApi({
    ...pageInfo,
    status: formParams.values,
    [select.value]: formParams.input,
  });
  tableData.value = list;
  totals.value = total;
  loading.value = false;
};
const handleReset = () => {
  pageInfo.page = 1;
  pageInfo.pageSize = 10;
  formParams.input = "";
  formParams.values = 1;
  select.value = "name";
  loadData();
};
const loading = ref<boolean>(false);
const tableData = ref([]);
// const tableData = ref<RowType[]>([]);
const totals = ref<number>(0);

const pageInfo = reactive({
  page: 1,
  pageSize: 10,
});
const handleCurrentChange = (page: number) => {
  pageInfo.page = page;
  loadData();
};
const handleSizeChange = (size: number) => {
  pageInfo.pageSize = size;
  loadData();
};
onMounted(() => {
  loadData();
});
</script>
