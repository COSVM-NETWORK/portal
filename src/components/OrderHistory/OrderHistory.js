import React from 'react'
import OrderHistoryRender from './OrderHistoryRender'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadOrderHistory } from 'actions'
import { numOrderSelector } from 'selectors/order'
import { dispatchAsync } from 'utils/reduxSaga'

class OrderHistory extends React.Component {
  state = {
    currentPage: 1,
    fetching: true,
  }

  async componentDidMount() {
    this.loadOrderHistory()
    this.checker = setInterval(() => {
      this.props.loadOrderHistorySaga(this.state.currentPage)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.checker)
  }

  async loadOrderHistory() {
    await this.props.loadOrderHistorySaga(this.state.currentPage)
    this.setState({
      fetching: false,
    })
  }

  onChangePage(selectedPage) {
    this.setState(
      {
        currentPage: selectedPage,
        fetching: true,
      },
      async () => {
        await this.loadOrderHistory()
      },
    )
  }

  render() {
    return (
      <OrderHistoryRender
        {...this.state}
        {...this.props}
        onChangePage={this.onChangePage.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, { communityAddress }) => {
  return {
    numOrders: numOrderSelector(state, {
      address: communityAddress,
    }),
  }
}

const mapDispatchToProps = (dispatch, { communityAddress }) => ({
  loadOrderHistorySaga: (currentPage, id) =>
    dispatchAsync(dispatch, loadOrderHistory(communityAddress, currentPage)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(OrderHistory),
)
