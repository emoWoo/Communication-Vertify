<template>
    <div style="padding: 30px;">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="系统基本功能">
                <div class="content">
                    <button>系统任务与同步同信</button>
                    <button>时钟/定时器</button>
                    <button>中断/异常</button>
                    <button>内存</button>
                    <button>采集与上报频率</button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="外设驱动">
                <div class="content">
                    <button>系统任务与同步同信</button>
                    <button>时钟/定时器</button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="分布式软总线">
                <div class="content">
                    <button>系统任务与同步同信</button>
                    <button>时钟/定时器</button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="通信协议">
                <div class="content">
                    <button>系统任务与同步同信</button>
                    <button>时钟/定时器</button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="5" tab="日志">
                <a-empty />
            </a-tab-pane>
        </a-tabs>

    </div>
</template>
<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
</script>

<style scoped>
.content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 100vh;
    /* background: pink; */
}

button {
    font-size: 20px;
    color: rgb(88, 148, 248);
    border: 1px solid rgb(88, 148, 248);
    border-radius: 5px;
    padding: 10px 20px;
    background-color: white;
    margin-bottom: 20px;
}
</style>