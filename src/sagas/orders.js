import { put } from 'redux-saga/effects'
import { LOAD_ORDER_HISTORY, addOrders, addNumOrders } from 'actions'
import { takeEveryAsync } from 'utils/reduxSaga'
import { Utils } from 'band.js'

function* handleLoadHistory({ address, currentPage }) {
  const {
    communityByAddress: {
      curveByCommunityAddress: {
        ordersByCurveAddress: { nodes: orders, totalCount },
      },
    },
  } = yield Utils.graphqlRequest(`{
    communityByAddress(address: "${address}") {
      curveByCommunityAddress {
        ordersByCurveAddress(orderBy: TIMESTAMP_DESC, first: 10, offset: ${(currentPage -
          1) *
          10}) {
          nodes {
            amount
            price
            timestamp
            txHash
            user
            orderType
          }
          totalCount
        }
      }
    }
  }
  `)
  yield put(addOrders(address, currentPage, orders))
  yield put(addNumOrders(address, totalCount))
}

export default function*() {
  yield takeEveryAsync(LOAD_ORDER_HISTORY, handleLoadHistory)
}
