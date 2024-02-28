<script setup>
import {ref} from 'vue';
//const string = ref("hello");

import Web3 from "web3";
//wss://goerli.infura.io/ws/v3/cb7e63cf28244e4499b4b6fb6162e746;
const web3 = new Web3("https://endpoints.omniatech.io/v1/eth/goerli/public");
//const account = web3.eth.accounts.create();
const private_key = ""; // 必须要加0x
const account = web3.eth.accounts.privateKeyToAccount(private_key);

console.log(account);

const address = ref("");
const pri = ref("");
const amount = ref(-1);
const toAddr = ref("");

address.value = account.address; // ref变量读写时必须加上.value
pri.value = account.privateKey;
web3.eth.getBalance(account.address).then((res) => {
  amount.value = web3.utils.fromWei(res, "ether");
  console.log("amount:"+amount.value)
});

/*
// to wei
console.log(web3.utils.toWei("0.1", "ether"));
// from wei
console.log(web3.utils.fromWei("100000000", "ether"));
*/

const send = async() => {
  //const toAddr = "0x30173841f988CB83133f79fa8B1927dEFFFAebdF";
  console.log(address.value);
  const nonce = await web3.eth.getTransactionCount(address.value);
  console.log("nonce:", nonce);
  const gasPrice = await web3.eth.getGasPrice();
  console.log("gasPrice:", gasPrice);
  /*
  const gas = await web3.eth.estimateGas({
    to: toAddr,
    data: "0x0"
  });
  */
  const gas = "21000"; // 转账只需要21000
  console.log("gasPrice:", gasPrice, "gas:", gas);
  const value = web3.utils.toWei("0.00023", "ether");
  const rawTx = {
    from: address.value,
    to: toAddr.value,
    nonce,
    gas,
    gasPrice,
    value,
    //data: "0x0"; // 转账不需要data，如过加了data，gas不够21000
  };
  // 签署交易
  const signedTx = await account.signTransaction(rawTx);
  // 发送交易
  //const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  //console.log('交易成功！交易哈希:', result.transactionHash);

  const trans = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  trans.on("transactionHash", (txid) => {
    console.log(`https://goerli.etherscan.io/tx/${txid}`)
  }).on("receipt", (res) => { // 第一个block确认就返回
    console.log("receipt", res);
  }).on("confirmation", () => { // 每个block确认都返回
    console.log("confirmation");
  })
}

</script>

<template>
  <h1>账户信息：</h1>
  <van-divider/>
  <p>地址：{{ address }}</p>
  <p>私钥：{{ pri }}</p>
  <p>余额：{{ amount }}</p>

  <h1>转账操作：</h1>
  <van-divider/>
    <p> 地址：<input type="text" v-model="toAddr" class="address"> </p>
  <van-button type="primary" @click="send">开始转账：</van-button>
</template>

<style>
h1 {
  color: red;
}
.address {
    width: 400px;
}
</style>
