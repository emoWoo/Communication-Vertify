<template>
    <div style="padding: 30px;">
        <a-tabs v-model:activeKey="activeKey" :tabBarStyle="{ pointerEvents: loadingKey ? 'none' : 'auto' }">
            <a-tab-pane v-for="(op) in operations" :key="op.tabKey" :tab="op.title">
                <a-alert v-if="alerts[op.tabKey]" :type="alerts[op.tabKey].type" :message="alerts[op.tabKey].message"
                    banner closable @close="alerts[op.tabKey] = null">
                </a-alert>
                <div class="content">
                    <div v-for="(cmd, cmdIndex) in op.contents" :key="cmdIndex">
                        <a-button type="primary" size="large" :loading="loadingKey === cmd.cmdId"
                            @click="sendOrder(cmd.cmdId, op.tabKey)"
                            :disabled="loadingKey !== null && loadingKey !== cmd.cmdId"
                            style="margin-right: 10px;">{{ cmd.describe }}</a-button>
                        <CheckCircleOutlined v-if="cmd.status === 1" style="font-size: 18px;color: #569c30;" />
                        <CloseCircleOutlined v-if="cmd.status === 2" style="font-size: 18px;color: #e43b32;" />
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="5" tab="日志">
                <a-spin :spinning="loading" tip="加载中...">
                    <div class="log" v-if="logData.length">
                        <pre class="log-content" v-if="logData.length">{{ logData.join("\n\n") }}</pre>
                    </div>
                    <a-empty v-else description="暂无数据" />
                </a-spin>
            </a-tab-pane>
        </a-tabs>

    </div>
</template>
<script setup>
import { ref, watch, onUnmounted, reactive } from 'vue';
import cmdApi from '@/api/cmd';
import logApi from '@/api/log';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';

const activeKey = ref('1');
const loadingKey = ref(null)
const alerts = ref({})
const loading = ref(true)

const operations = reactive([
    {
        tabKey: '1',
        title: '系统基本功能',
        contents: [
            { cmdId: 1, describe: '系统任务与同步同信', status: 0 },
            { cmdId: 2, describe: '时钟/定时器', status: 0 },
            { cmdId: 3, describe: '中断/异常', status: 0 },
            { cmdId: 4, describe: '内存', status: 0 },
            { cmdId: 5, describe: '采集与上报频率', status: 0 },
        ]
    },
    {
        tabKey: '2',
        title: '外设驱动',
        contents: [
            { cmdId: 6, describe: '串口', status: 0 },
            { cmdId: 10, describe: 'I2C', status: 0 },
        ]
    },
    {
        tabKey: '3',
        title: '分布式软总线',
        contents: [
            { cmdId: 7, describe: '蓝牙(BLE)', status: 0 },
            { cmdId: 8, describe: '星闪', status: 0 },
        ]
    },
    {
        tabKey: '4',
        title: '通信协议',
        contents: [
            { cmdId: 9, describe: 'MQTT', status: 0 },
        ]
    },
])

const sendOrder = async (cmdId, tabKey) => {
    if (cmdId === 10 ) {
        alerts.value[tabKey] = {
            type: "error",
            message: `该功能未开放测试`
        };
        return
    }

    loadingKey.value = cmdId
    console.log(loadingKey.value)

    const tab = operations.find(op => op.tabKey === tabKey);
    const cmdItem = tab?.contents.find(cmd => cmd.cmdId === cmdId);

    try {
        const res = await cmdApi.sendcmd(cmdId)
        console.log(res)
        if (cmdId === 3 && !res.result) {
            operations[tabKey].contents[2].status = 2
            alerts.value[tabKey] = {
                type: "error",
                message: `中断异常测试失败`
            };
            throw new Error("中断异常测试失败");
        }
        // if (!res.status) {

        //测试成功 alert、图标显示
        if (cmdItem) cmdItem.status = 1;
        alerts.value[tabKey] = {
            type: "success",
            message: `测试成功！请查看日志`
        };
        // }
    } catch (error) {

        //测试失败 alert、图标显示
        if (cmdItem) cmdItem.status = 2;
        alerts.value[tabKey] = {
            type: "error",
            message: `操作失败，请重试。`
        }
        console.log('this is an error', error)
    } finally {
        loadingKey.value = null
    }

    console.log('finished')
}

let logInterval = null;
watch(activeKey, (newKey) => {
    if (newKey === '5') {
        fetchLog()
        if (!logInterval) {
            logInterval = setInterval(fetchLog, 3000); // 每 3 秒自动更新
        }
    } else {
        clearInterval(logInterval);
        logInterval = null;
    }
})
//日志数组
const logData = ref([])
const fetchLog = async () => {
    try {
        const res = await logApi.getLog()
        console.log(res)
        const parsedData = []

        res.forEach(item => {
            const details = item.details;
            if (details && details.message) {
                let messageContent = "";
                if (Array.isArray(details.message)) {
                    messageContent = details.message.map(msg =>
                        typeof msg === "object" ? JSON.stringify(msg) : msg
                    ).join("\n");
                } else {
                    messageContent = details.message.toString();
                }

                parsedData.push(
                    `Message:\n${messageContent}\n Receiver: ${item.receiver}\n Sender: ${item.sender}\n Timestamp: ${item.timestamp}\n Result: ${item.details.result}\n`
                );
            }
        });
        logData.value = parsedData
    } catch (error) {
        console.log('error:', error)
    } finally {
        loading.value = false
    }
}
onUnmounted(() => {
    clearInterval(logInterval);
});
</script>

<style scoped>
.content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 88vh;
    /* background: pink; */
}

button {
    /* color: rgb(88, 148, 248);
    border: 1px solid rgb(88, 148, 248);
    border-radius: 5px;
    background-color: white; */
    margin-bottom: 20px;
}

.log {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 88vh;
    width: 88vw;
    background: black;
}

.log-content {
    width: 100%;
    margin-top: 8px;
    margin-left: 8px;
    white-space: pre-wrap;
    /* 自动换行 */
    word-break: break-word;
    /* 长单词换行 */
    font-size: 14px;
    color: #fff;
}
</style>