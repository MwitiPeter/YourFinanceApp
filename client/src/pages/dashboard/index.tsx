import {useUser} from '@clerk/clerk-react'
import { FinancialRecordList } from './financial-record-list'
import { FinancialRecordForm } from './financal-reord-form'

export const Dashboard = () => {
    const{ user } = useUser() 
    return (
    <div className="dashboard-container">
        <h1> Welcome {user?.firstName}!Here Are your Finances:</h1>
        <FinancialRecordForm/>
        <FinancialRecordList/>
    </div>
    )
}