<template>
	<view class="login-container">
		<view class="login-box">
			<view class="logo-area">
				<uni-text class="logo-text">后台管理系统</uni-text>
			</view>

			<view class="form-area">
				<view class="input-group">
					<uni-icons :size="24" type="person" color="#666666" />
					<input v-model="username" class="input-item" type="text" placeholder="请输入用户名"
						placeholder-class="placeholder" />
					<uni-icons v-if="username" :size="20" type="clear" color="#999999" @click="clearUsername" />
				</view>

				<view class="input-group">
					<uni-icons :size="24" type="locked" color="#666666" />
					<input v-model="password" class="input-item" :type="showPassword ? 'text' : 'password'"
						placeholder="请输入密码" placeholder-class="placeholder" />
					<uni-icons :size="20" :type="showPassword ? 'eye-filled' : 'eye-slash-filled'" color="#999999"
						@click="togglePasswordVisibility" />
				</view>

				<button class="login-btn" @click="handleLogin">登录</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import request from '@/utils/request';

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const clearUsername = () => {
	username.value = '';
};

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
	if (!username.value || !password.value) {
		uni.showToast({
			title: '请输入用户名和密码',
			icon: 'none'
		});
		return;
	}
	// 这里添加登录逻辑
	let res = await request.post('/api/system/login', {
		"username": username.value,
		"password": username.value
	});
	if(res.id){
		uni.showToast({
			title: '登录成功',
			icon: 'success'
		});
		console.log(res);
		
	}

};
</script>

<style>
page {
	height: 100%;
}

.login-container {
	height: 100%;
	box-sizing: border-box;
	padding: 0rpx 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
}

.login-box {
	width: 650rpx;
	padding: 60rpx 40rpx;
	background-color: #ffffff;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.logo-area {
	text-align: center;
	margin-bottom: 60rpx;
}

.logo-text {
	font-size: 28px;
	font-weight: 600;
	color: #333333;
}

.form-area {
	width: 100%;
}

.input-group {
	display: flex;
	align-items: center;
	height: 96rpx;
	padding: 0 30rpx;
	margin-bottom: 40rpx;
	background-color: #f5f7fa;
	border-radius: 12px;
	transition: all 0.3s ease;
}

.input-group:focus-within {
	background-color: #ffffff;
	box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

.input-item {
	flex: 1;
	height: 96rpx;
	margin-left: 20rpx;
	font-size: 16px;
	color: #333333;
}

.placeholder {
	color: #999999;
	font-size: 16px;
}

.login-btn {
	width: 100%;
	height: 96rpx;
	margin-top: 60rpx;
	background: #4285f4;
	color: #ffffff;
	font-size: 18px;
	font-weight: 500;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.login-btn:active {
	background: #3367d6;
}
</style>