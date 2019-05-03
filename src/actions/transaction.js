export const ADD_TX = 'ADD_TX'
export const SAVE_TXS = 'SAVE_TXS'
export const DUMP_TXS = 'DUMP_TXS'
export const BUY_TOKEN = 'BUY_TOKEN'
export const SELL_TOKEN = 'SELL_TOKEN'
export const TCD_DEPOSIT = 'TCD_DEPOSIT'
export const TCD_WITHDRAW = 'TCD_WITHDRAW'

export const addTx = (txHash, title, txType) => ({
  type: ADD_TX,
  txHash,
  title,
  txType,
})

export const saveTxs = (currentBlock, txs, force) => ({
  type: SAVE_TXS,
  currentBlock,
  txs,
  force,
})

export const dumpTxs = () => ({
  type: DUMP_TXS,
})

export const buyToken = (address, amount, priceLimit) => ({
  type: BUY_TOKEN,
  address,
  amount,
  priceLimit,
})

export const sellToken = (address, amount, priceLimit) => ({
  type: SELL_TOKEN,
  address,
  amount,
  priceLimit,
})

export const tcdDeposit = (tcdAddress, sourceAddress, stake) => ({
  type: TCD_DEPOSIT,
  tcdAddress,
  sourceAddress,
  stake,
})

export const tcdWithdraw = (tcdAddress, sourceAddress, ownership) => ({
  type: TCD_WITHDRAW,
  tcdAddress,
  sourceAddress,
  ownership,
})
