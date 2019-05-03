import createReducer from 'reducers/creator'

import { SAVE_COMMUNITY_INFO, SAVE_CT_BALANCE, REMOVE_BALANCE } from 'actions'
import { Map, List } from 'immutable'

const handleSaveCommunityInfo = (
  state,
  {
    name,
    symbol,
    address,
    tokenAddress,
    logo,
    banner,
    description,
    website,
    organization,
    marketCap,
    price,
    last24Hrs,
    totalSupply,
    collateralEquation,
    tcds,
  },
) =>
  state.set(
    address,
    Map({
      name,
      address,
      tokenAddress,
      symbol,
      logo,
      banner,
      description,
      website,
      organization,
      marketCap,
      price,
      last24Hrs,
      totalSupply,
      collateralEquation,
      tcds: List([...tcds]),
    }),
  )

const handleSaveCTBalance = (state, { communityAddress, balance }) =>
  state.setIn([communityAddress, 'balance'], balance)

const handleRemoveBalance = state =>
  state.map(community => community.delete('balance'))

export default createReducer({
  [REMOVE_BALANCE]: handleRemoveBalance,
  [SAVE_COMMUNITY_INFO]: handleSaveCommunityInfo,
  [SAVE_CT_BALANCE]: handleSaveCTBalance,
})
