import { takeEvery, put, select, delay, all } from 'redux-saga/effects'
import { Utils } from 'band.js'
import BN from 'utils/bignumber'
import moment from 'utils/moment'

import { LOAD_PROPOSALS, saveProposals } from 'actions'

import { currentUserSelector } from 'selectors/current'

import { parameterByNameSelector } from 'selectors/parameter'

function* handleLoadProposals({ address }) {
  const currentUser = yield select(currentUserSelector)
  const {
    communityByAddress: {
      parameterByCommunityAddress: {
        proposalsByParameterAddress: { nodes: rawProposals },
      },
    },
  } = yield Utils.graphqlRequest(`{
    communityByAddress(address: "${address}") {
      parameterByCommunityAddress {
        proposalsByParameterAddress {
          nodes {
            reason
            changes
            proposalId
            proposer
            minParticipation
            supportRequired
            currentYesCount
            currentNoCount
            totalVotingPower
            timestamp
            expirationTime
            status
            proposalVotesByParameterAddressAndProposalId(condition: {voter: "${currentUser}"}) {
              nodes {
                voter
                yesWeight
                noWeight
              }
            }
          }
        }
      }
    }
  }`)

  const proposals = yield all(
    rawProposals.map(function*(proposal) {
      if (proposal.changes.length === 0) {
        return {
          deleted: true,
        }
      }
      const [prefix, name] = Object.keys(proposal.changes)[0].split(':')
      if (!name)
        return {
          deleted: true,
        }
      const changes = yield all(
        Object.entries(proposal.changes).map(function*([key, value]) {
          const [_prefix, _name] = key.split(':')
          if (_prefix !== prefix || !_name) {
            return {
              deleted: true,
            }
          }
          const oldValue = yield select(parameterByNameSelector, {
            address,
            type: prefix,
            name: _name,
          })

          return {
            name: _name,
            oldValue,
            newValue: new BN(value),
          }
        }),
      )

      const vote = proposal.proposalVotesByParameterAddressAndProposalId.nodes
      console.warn(vote)
      if (changes.filter(c => c.deleted).length !== 0) {
        return {
          deleted: true,
        }
      }

      return {
        proposalId: proposal.proposalId,
        proposer: proposal.proposer,
        title: proposal.reason && proposal.reason.title,
        reason: proposal.reason && proposal.reason.reason,
        prefix: prefix,
        changes: changes,
        status: proposal.status,
        proposedAt: moment.unix(proposal.timestamp),
        expiredAt: moment.unix(proposal.expirationTime),
        yesVote: new BN(proposal.currentYesCount),
        noVote: new BN(proposal.currentNoCount),
        supportRequiredPct: new BN(proposal.supportRequired),
        minParticipation: new BN(proposal.minParticipation),
        totalVotingPower: new BN(proposal.totalVotingPower),
        vote:
          vote.length !== 0 && currentUser
            ? new BN(vote[0].yesWeight).gt(new BN(vote[0].noWeight))
              ? 'SUPPORT'
              : 'REJECT'
            : 'NOT VOTED',
      }
    }),
  )

  yield put(saveProposals(address, proposals.filter(p => !p.deleted)))
}

export default function*() {
  yield takeEvery(LOAD_PROPOSALS, handleLoadProposals)
}
