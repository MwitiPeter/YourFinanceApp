import {useUser} from '@clerk/clerk-react'
import { FinancialRecordList } from './financial-record-list'
import { FinancialRecordForm } from './financal-record-form'
import "./financial-record.css"
import { useFinancialRecords } from '../../contexts/financial-record-context'
import { useMemo } from 'react'
export const Dashboard = () => {
    const{ user } = useUser()
    const { records} = useFinancialRecords ()

    const totalMonthly = useMemo(() => {
        let totalAmount = 0
        records.forEach((record) => {
            totalAmount += record.amount
        })

        return totalAmount
    }, [records])
    return (
    <div className="dashboard-container">
        <h1> Welcome {user?.firstName}!Here Are your Finances:</h1>
        <FinancialRecordForm/>
        <div>Total Monthly : ${totalMonthly} </div>
        <FinancialRecordList/>
    </div>
    )
}