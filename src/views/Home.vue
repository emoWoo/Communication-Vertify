<template>
    <div style="padding: 30px;">
        <a-tabs v-model:activeKey="activeKey" :tabBarStyle="{ pointerEvents: loadingKey ? 'none' : 'auto' }">
            <a-tab-pane key="1" tab="系统基本功能">
                <a-alert 
                    v-if="alerts['1']" 
                    :type="alerts['1'].type" 
                    :message="alerts['1'].message" 
                    banner closable 
                    @close="alerts['1'] = null">
                </a-alert>
                <div class="content">
                    <a-button type="primary" size="large" :loading="loadingKey === 1" @click="sendOrder(1,'1')"
                        :disabled="loadingKey !== null && loadingKey !== 1">系统任务与同步同信</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 2" @click="sendOrder(2,'1')"
                        :disabled="loadingKey !== null && loadingKey !== 2">时钟/定时器</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 3"
                        @click="sendOrder(3,'1')"
                        :disabled="loadingKey !== null && loadingKey !== 3">中断/异常</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 4"
                        @click="sendOrder(4,'1')"
                        :disabled="loadingKey !== null && loadingKey !== 4">内存</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 5"
                        @click="sendOrder(5,'1')"
                        :disabled="loadingKey !== null && loadingKey !== 5">采集与上报频率</a-button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="外设驱动">
                <a-alert 
                    v-if="alerts['2']" 
                    :type="alerts['2'].type" 
                    :message="alerts['2'].message" 
                    banner closable 
                    @close="alerts['2'] = null">
                </a-alert>
                <div class="content">
                    <a-button type="primary" size="large" :loading="loadingKey === 6"
                        @click="sendOrder(6,'2')"
                        :disabled="loadingKey !== null && loadingKey !== 6">串口</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 7" @click="sendOrder(7,'2')"
                        :disabled="loadingKey !== null && loadingKey !== 7">I2C</a-button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="分布式软总线">
                <a-alert 
                    v-if="alerts['3']" 
                    :type="alerts['3'].type" 
                    :message="alerts['3'].message" 
                    banner closable 
                    @close="alerts['3'] = null">
                </a-alert>
                <div class="content">
                    <a-button type="primary" size="large" :loading="loadingKey === 8" @click="sendOrder(8,'3')"
                        :disabled="loadingKey !== null && loadingKey !== 8">蓝牙(BLE)(考虑外挂ws63测试机)</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 9"
                        @click="sendOrder(9,'3')"
                        :disabled="loadingKey !== null && loadingKey !== 9">星闪(可选)</a-button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="通信协议">
                <a-alert 
                    v-if="alerts['4']" 
                    :type="alerts['4'].type" 
                    :message="alerts['4'].message" 
                    banner closable 
                    @close="alerts['4'] = null">
                </a-alert>
                <div class="content">
                    <a-button type="primary" size="large" :loading="loadingKey === 10" @click="sendOrder(10,'4')"
                        :disabled="loadingKey !== null && loadingKey !== 10">MQTT</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 11" @click="sendOrder(11,'4')"
                        :disabled="loadingKey !== null && loadingKey !== 11">HTTP</a-button>
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
const loadingKey = ref(null)
const alerts=ref({})

const sendOrder = (cmdId,tabKey) => {
    loadingKey.value = cmdId
    console.log(loadingKey.value)

    // 模拟发送请求
    setTimeout(() => {
        loadingKey.value = null
        const isSuccess = Math.random() > 0.5
        alerts.value[tabKey] = {
            type: isSuccess ? "success" : "error",
            message: isSuccess ? `操作成功！` : `操作失败，请重试。`
        };
    }, 8000)
}
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
    /* color: rgb(88, 148, 248);
    border: 1px solid rgb(88, 148, 248);
    border-radius: 5px;
    background-color: white; */
    margin-bottom: 20px;
}
</style>