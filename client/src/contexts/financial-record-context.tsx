import { createContext, useContext, useEffect, useState } from "react";
import { FinancialRecordForm } from "../pages/dashboard/financal-reord-form";
import { useUser } from "@clerk/clerk-react";

export interface FinancialRecord {
    id?: string;
    date:Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}
interface FinancialRecordContextType {
    records: FinancialRecord[]
    addRecord: (record: FinancialRecord) => void
    // updateRecord: (id: string, newRecord: FinancialRecord) =>void
    // deleteRecord: (id: string) => void

}

export const FinancialRecordContext = createContext< FinancialRecordContextType | undefined>(undefined)

export const FinancialRecordProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([])
    const { user} =useUser()
    const fetchRecords = async () =>{
        if (!user) return
        const response = await fetch(`http://localhost:3001/financial-records/getAllByUserID/${user?.id}`)

        if (response.ok) {
            const records = await response.json()
            console.log(records)
            setRecords(records)
        }
    }

    useEffect(() =>{
        fetchRecords()
    }, [])

    const addRecord = async(record: FinancialRecord) =>{
        const response = await fetch ("http://localhost:3001/financial-records", {method: "POST", body: JSON.stringify(record),
            headers: {
                'Content-Type':"application/json"
            }
        })

        try{
            if (response.ok){
            const newRecord = await response.json()
            setRecords((prev) => [...prev,newRecord])}
        } catch (err){}
    }

    return (
        <FinancialRecordContext.Provider value={{records,addRecord}}>
            {""}
            {children}
        </FinancialRecordContext.Provider>
    )
}

export const useFinancialRecords =() => {
    const context = useContext<FinancialRecordContextType | undefined>(FinancialRecordContext)

    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordProvider")
    }
    return context
}