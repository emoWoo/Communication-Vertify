<template>
    <div class="container">
        <div class="content">
            <text class="title">Login</text>
            <a-spin :spinning="loading" tip="登录中...">
                <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-form-item label="账号" name="accountid" :rules="[{ required: true, message: '请输入账号' }]">
                        <a-input v-model:value="formState.accountid" allow-clear placeholder="手机号/邮箱/用户名">
                        </a-input>
                    </a-form-item>

                    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
                        <a-input-password v-model:value="formState.password" allow-clear placeholder="请输入密码">
                        </a-input-password>
                    </a-form-item>

                    <a-form-item>
                        <a-form-item name="remember" no-style>
                            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
                        </a-form-item>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="login-form-button">
                            登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-spin>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import userApi from '@/api/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading=ref(false)
const formState = reactive({
    accountid: '',
    password: '',
    remember: true,
});
const onFinish = async (values) => {
    loading.value=true
    try {
        const res = await userApi.login({
            username: values.accountid,
            password: values.password,
        });
        console.log('res:', res);
        if (res.status === 200) {
            router.push('/home')
        } else {
            throw new Error("登录失败");
        }
    } catch (error) {
        alert('账号或密码错误')
        console.log('error:', error);
    }finally{
        loading.value=false
    }
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    height: 100vh;
}

.content {
    margin-top: 400px;
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.login-form {
    width: 400px;
}

.login-form-forgot {
    float: right;
}

.login-form-button {
    width: 100%;
}
</style>