import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { showModal } from 'actions'

import ProviderListBodyRender from './ProviderListBodyRender'

import { dataProvidersSelector } from 'selectors/dataProvider'

const mapDispatchToProps = (dispatch, { tokenAddress }) => ({
  showDepositWithdraw: (
    actionType,
    tcdAddress,
    dataSourceAddress,
    userOwnership,
    userStake,
    stake,
    totalOwnership,
  ) =>
    dispatch(
      showModal('DEPOSITWITHDRAW', {
        actionType,
        tcdAddress,
        dataSourceAddress,
        userOwnership,
        userStake,
        stake,
        totalOwnership,
        tokenAddress,
      }),
    ),
})

const mapStateToProps = (
  state,
  { tokenAddress, currentPage, pageSize, user, tcdAddress },
) => {
  const items = dataProvidersSelector(state, {
    address: tokenAddress,
    page: currentPage,
    pageSize,
    tcdAddress,
  })
  /*
    while (items.length < pageSize) {
      items.push(null)
    }
  */
  return { user, items }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProviderListBodyRender),
)
