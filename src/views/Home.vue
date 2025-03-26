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
                    <a-button type="primary" size="large" :loading="loadingKey === 'task'" @click="sendOrder('task','1')"
                        :disabled="loadingKey !== null && loadingKey !== 'task'">系统任务与同步同信</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 'timer'" @click="sendOrder('timer','1')"
                        :disabled="loadingKey !== null && loadingKey !== 'timer'">时钟/定时器</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 'interrupt'"
                        @click="sendOrder('interrupt','1')"
                        :disabled="loadingKey !== null && loadingKey !== 'interrupt'">中断/异常</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 'memory'"
                        @click="sendOrder('memory','1')"
                        :disabled="loadingKey !== null && loadingKey !== 'memory'">内存</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 'frequency'"
                        @click="sendOrder('frequency','1')"
                        :disabled="loadingKey !== null && loadingKey !== 'frequency'">采集与上报频率</a-button>
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
                    <a-button type="primary" size="large" :loading="loadingKey === 'serial port'"
                        @click="sendOrder('serial port','2')"
                        :disabled="loadingKey !== null && loadingKey !== 'serial port'">串口</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 'I2C'" @click="sendOrder('I2C','2')"
                        :disabled="loadingKey !== null && loadingKey !== 'I2C'">I2C</a-button>
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
                    <a-button type="primary" size="large" :loading="loadingKey === 'ble'" @click="sendOrder('ble','3')"
                        :disabled="loadingKey !== null && loadingKey !== 'ble'">蓝牙(BLE)(考虑外挂ws63测试机)</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 'shining'"
                        @click="sendOrder('shining','3')"
                        :disabled="loadingKey !== null && loadingKey !== 'shining'">星闪(可选)</a-button>
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
                    <a-button type="primary" size="large" :loading="loadingKey === 'mqtt'" @click="sendOrder('mqtt','4')"
                        :disabled="loadingKey !== null && loadingKey !== 'mqtt'">MQTT</a-button>
                    <a-button type="primary" size="large" :loading="loadingKey === 'http'" @click="sendOrder('http','4')"
                        :disabled="loadingKey !== null && loadingKey !== 'http'">HTTP</a-button>
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

const sendOrder = (type,tabKey) => {
    loadingKey.value = type
    console.log(loadingKey.value)

    // 模拟发送请求
    setTimeout(() => {
        loadingKey.value = null
        const isSuccess = Math.random() > 0.5
        alerts.value[tabKey] = {
            type: isSuccess ? "success" : "error",
            message: isSuccess ? `操作 ${type} 成功！` : `操作 ${type} 失败，请重试。`
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