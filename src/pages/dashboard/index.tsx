import React, {lazy, Suspense, useEffect} from 'react'
import PageContainer from "../../components/containers/page-container"
import {useDispatch, useSelector} from "react-redux"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useLocation} from "react-router-dom"
import {RootState} from "../../store/store"
import {updateLoggedInClient} from "../../slices/logged-in-client-slice"
import LoadingView from "../../components/loading-view";


const CompletedSetupDashboard = lazy(() => import('./completed-setup-dashboard'))
const UncompletedSetupDashboard = lazy(() => import('./uncomplted-setup-dashboard'))

export default function Dashboard() {

    const location = useLocation()
    const dispatch = useDispatch()

    const loggedInClient = useSelector((state: RootState) => state.loggedInClient)

    const toggleState = () => {
        if (loggedInClient.baseClientSetupCompleted)
            dispatch(updateLoggedInClient({baseClientSetupCompleted: false}))
        else dispatch(updateLoggedInClient({baseClientSetupCompleted: true}))
    }


    useEffect(() => {
        dispatch(updatePageTitle('Dashboard'))
        console.log(loggedInClient.baseClientSetupCompleted)
    }, [location])

    return (
        <PageContainer>
            <Suspense fallback={<LoadingView/>}>
                {
                    !(loggedInClient.baseClientSetupCompleted)
                        ? <UncompletedSetupDashboard/>
                        : <CompletedSetupDashboard/>
                }
            </Suspense>
        </PageContainer>
    )
}
