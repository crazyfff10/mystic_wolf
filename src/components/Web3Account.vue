<script setup>
//import {ref} from 'vue';

import Web3 from "web3";
//const url = "wss://goerli.infura.io/ws/v3/cb7e63cf28244e4499b4b6fb6162e746";
//const web3 = new Web3(url);
const web3 = new Web3(window.ethereum); // 使用metamask的provider

//const web3 = new Web3("https://endpoints.omniatech.io/v1/eth/goerli/public");
//const web3 = new Web3(Web3.givenProvider);

//const account = web3.eth.accounts.create();
const private_key = ""; // 必须要加0x
const account = web3.eth.accounts.privateKeyToAccount(private_key);

console.log(account);

//web3.eth.requestAccounts().then(console.log);

/* if (typeof window.ethereum !== 'undefined') {
  // MetaMask is installed
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
  } catch (error) {
    console.error("User denied account access", error);
  }
} else {
  console.log("Please install MetaMask!");
} */

// 获取对应metamask provider已连接的账号
web3.eth.requestAccounts().then((res) => {
  console.log(res);
});


</script>

<template>
  <h1>账户信息：</h1>
  <p> 地址：<input type="text" v-model="toAddr"> </p>
</template>

<style>
h1 {
  color: red;
}
</style>
