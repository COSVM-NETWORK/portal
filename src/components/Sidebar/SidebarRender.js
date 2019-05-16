import React from 'react'
import styled from 'styled-components'

import { Image, Flex, Text, Bold, HighlightNavLink } from 'ui/common'
import CircleLoadingSpinner from 'components/CircleLoadingSpinner'
import MockProfileSrc from 'images/mock-profile.svg'
import BalanceWallet from 'images/balanceWallet.svg'

// Images inactive
import DetailSrc from 'images/detailInactive.svg'
import GovernanceSrc from 'images/govInactive.svg'
import ProposalSrc from 'images/voteInactive.svg'
import DataProviderInactive from 'images/dataProviderInactive.svg'

// Image active
import DetailActiveSrc from 'images/detailActive.svg'
import GovernanceActiveSrc from 'images/govActive.svg'
import ProposalActiveSrc from 'images/voteActive.svg'
import DataProviderActive from 'images/dataProviderActive.svg'

const Left = styled.div`
  width: 220px;
  flex: 0 0 220px;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background: #5973e7;
  position: sticky;
  top: 60px;
  box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.05);
`

const Tab = ({ link, imgSrcActive, imgSrcInactive, children }) => (
  <HighlightNavLink to={link} activeClassName="is-active">
    <Flex py={1} px={3} style={{ height: 52 }}>
      <Flex
        flex={1}
        flexDirection="row"
        alignItems="center"
        className="tab"
        pl={3}
      >
        <Image
          className="img-active"
          src={imgSrcActive}
          width="20px"
          height="20px"
        />
        <Image
          className="img-inactive"
          src={imgSrcInactive}
          width="20px"
          height="20px"
        />
        <Text px={3}>{children}</Text>
      </Flex>
    </Flex>
  </HighlightNavLink>
)

export default ({
  logedin,
  name,
  src,
  balance,
  usdBalance,
  symbol,
  address,
  hasTcd,
}) => (
  <Left>
    <Flex flexDirection="column" alignItems="center" py={3}>
      <Image
        src={src || MockProfileSrc}
        width="80px"
        height="80px"
        m={3}
        borderRadius="50%"
        style={{
          // border: 'solid 6px #ffffff',
          boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.2)',
        }}
      />
      <Flex mb="20px">
        <Text
          py={1}
          fontSize="15px"
          fontWeight={600}
          color="white"
          style={{ textTransform: 'uppercase' }}
        >
          {name}
        </Text>
      </Flex>
      {!logedin ? null : balance === undefined ? (
        <CircleLoadingSpinner radius="25px" color="white" />
      ) : (
        <Flex
          width="90%"
          flexDirection="column"
          justifyContent="center"
          px="18px"
          py="12px"
          style={{
            borderRadius: '7px',
            background:
              'linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.16))',
          }}
        >
          <Flex flexDirection="row" alignItems="center">
            <Image src={BalanceWallet} width="18px" mr={2} mb={1} />
            <Text fontSize="12px" lineHeight="20px" color="white">
              YOUR BALANCE
            </Text>
          </Flex>
          <Flex mt="20px">
            <Text color="white" fontSize="18px" fontWeight={500}>
              {`${balance.pretty()} ${symbol}`}
            </Text>
          </Flex>
          <Flex
            bg="#5973e7"
            mt="13px"
            mb="8px"
            ml="-10%"
            style={{ height: '1px', width: '120%' }}
          />
          <Text
            fontSize="12px"
            color="white"
          >{`≈ ${usdBalance.pretty()} USD`}</Text>
        </Flex>
      )}
      <Flex flexDirection="column" py={4} width={[1]}>
        <Bold px={4} pb={3} fontSize="12px" color="#a6c1ff">
          MENU
        </Bold>
        <Flex flexDirection="column" width="100%" justifyContent="center">
          <Tab
            link={`/community/${address}/overview`}
            imgSrcActive={DetailActiveSrc}
            imgSrcInactive={DetailSrc}
          >
            Overview
          </Tab>
          <Tab
            link={`/community/${address}/parameters`}
            imgSrcActive={GovernanceActiveSrc}
            imgSrcInactive={GovernanceSrc}
          >
            Parameters
          </Tab>
          <Tab
            link={`/community/${address}/proposal`}
            imgSrcActive={ProposalActiveSrc}
            imgSrcInactive={ProposalSrc}
          >
            Proposals
          </Tab>
          {hasTcd && (
            <Tab
              link={`/community/${address}/provider`}
              imgSrcActive={DataProviderActive}
              imgSrcInactive={DataProviderInactive}
            >
              Data providers
            </Tab>
          )}
        </Flex>
      </Flex>
    </Flex>
  </Left>
)
