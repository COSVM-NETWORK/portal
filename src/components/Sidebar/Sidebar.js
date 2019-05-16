import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SidebarRender from 'components/Sidebar/SidebarRender'

import { communityDetailSelector } from 'selectors/communities'
import { bandPriceSelector } from 'selectors/bandPrice'
import { currentUserSelector } from 'selectors/current'

class SideBar extends React.Component {
  state = {
    isSymbol: true,
  }

  toggleBalance() {
    this.setState({
      isSymbol: !this.state.isSymbol,
    })
  }

  render() {
    const {
      logedin,
      name,
      src,
      balance,
      symbol,
      communityPrice,
      bandPrice,
      address,
      hasTcd,
    } = this.props

    return (
      <SidebarRender
        logedin={logedin}
        name={name}
        address={address}
        src={src}
        balance={balance}
        usdBalance={
          balance &&
          balance.communityToBand(communityPrice).bandToUSD(bandPrice)
        }
        hasTcd={hasTcd}
        symbol={symbol}
        isSymbol={this.state.isSymbol}
        toggleBalance={this.toggleBalance.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, { communityAddress }) => {
  const community = communityDetailSelector(state, {
    address: communityAddress,
  })
  if (!community) return {}
  return {
    logedin: !!currentUserSelector(state),
    name: community.get('name'),
    src: community.get('logo'),
    balance: community.get('balance'),
    symbol: community.get('symbol'),
    communityPrice: community.get('price'),
    bandPrice: bandPriceSelector(state),
    address: community.get('address'),
    hasTcd: community.get('tcds').size > 0,
  }
}

export default withRouter(connect(mapStateToProps)(SideBar))
