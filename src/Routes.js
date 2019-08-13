import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Flex } from 'ui/common'
import FullLoadingPage from 'pages/FullLoading'
import { BackdropProvider } from 'context/backdrop'

import ScrollToTop from 'ScrollToTop'
import TCDRoutes from 'TCDRoutes'
import Backdrop from 'components/Backdrop'
// import Sidebar from 'components/Sidebar'
// import CommunitiesPage from 'pages/Communities'
// import CommunityDetailPage from 'pages/CommunityDetail'
// import CommunityParameterPage from 'pages/CommunityParameter'
// import CommunityProposalPage from 'pages/CommunityProposal'
// import CreateCommunityPage from 'pages/CreateCommunity'

// Lazy Loading
const Sidebar = lazy(() => import('components/Sidebar'))
const CommunitiesPage = lazy(() => import('pages/Communities'))
const CommunityDetailPage = lazy(() => import('pages/CommunityDetail'))
const CommunityParameterPage = lazy(() => import('pages/CommunityParameter'))
const CommunityProposalPage = lazy(() => import('pages/CommunityProposal'))
const CreateCommunityPage = lazy(() => import('pages/CreateCommunity'))

export default ({ match, location }) => (
  <React.Fragment>
    <ScrollToTop />
    <Suspense fallback={<FullLoadingPage />}>
      <Switch location={location}>
        <BackdropProvider>
          <Route
            path="/community/:community/:tcd?"
            render={({ match, history, location }) => (
              <React.Fragment>
                <Flex
                  flexDirection="row"
                  style={{
                    minHeight: '100vh',
                  }}
                >
                  <Sidebar tokenAddress={match.params.community} />
                  <Backdrop />
                  <Switch>
                    {/* Global Routes */}
                    <Route
                      path="/community/:community/overview"
                      render={({ match }) => (
                        <CommunityDetailPage
                          tokenAddress={match.params.community}
                        />
                      )}
                    />
                    <Route
                      path="/community/:community/parameters"
                      render={({ match }) => (
                        <CommunityParameterPage
                          tokenAddress={match.params.community}
                        />
                      )}
                    />
                    <Route
                      path="/community/:community/proposal"
                      render={({ match }) => (
                        <CommunityProposalPage
                          tokenAddress={match.params.community}
                        />
                      )}
                    />
                    {/* TCD Routes */}
                    <Route
                      path="/community/:community/:tcd/:path"
                      render={({ match }) => (
                        <TCDRoutes
                          communityAddress={match.params.community}
                          tcdAddress={match.params.tcd}
                          path={match.params.path}
                        />
                      )}
                    />

                    {/* Default TCD Route */}
                    <Route
                      path="/community/:community/:tcd"
                      render={({ match }) => (
                        <Redirect
                          to={`/community/${match.params.community}/${
                            match.params.tcd
                          }/dataset`}
                        />
                      )}
                    />
                    {/* Default Global Route */}
                    <Route
                      path="/community/:community"
                      exact
                      render={({ match }) => (
                        <Redirect
                          to={`/community/${match.params.community}/overview`}
                        />
                      )}
                    />
                  </Switch>
                </Flex>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/create-community"
            component={CreateCommunityPage}
          />
          <Route exact path="/" component={CommunitiesPage} />
        </BackdropProvider>
      </Switch>
    </Suspense>
  </React.Fragment>
)
