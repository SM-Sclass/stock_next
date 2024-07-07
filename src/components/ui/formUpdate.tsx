"use client"
import React, { useEffect, useState } from 'react'
import UsernameSearch from './search'
import { Grid, TextField } from '@mui/material'
import { getEntry } from '@/helpers/search'
import CollapsibleTable from '@/components/ui/Table'
type Props = {}

const test = (props: Props) => {
    const [uid, setUid] = useState("")
    const [week, setWeek] = useState("")
    const [userentry, setUserentry] = useState<any[]>([])
    const handleUserid = (value: string) => {
        setUid(value)
    }
    useEffect(
        () => {
            const fetchEntries = async () => {
                if (!uid || !week) {
                    setUserentry([])
                }
                const result = await getEntry(uid, week)
                console.log(typeof result)
                setUserentry(result)
            };
            fetchEntries()
        }
        , [week, uid])
    return (
        <div>
            <UsernameSearch handleUID={handleUserid} />
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Buy price"
                    name="buyprice"
                    type="number"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                />
            </Grid>
            <div>
                {userentry && 
                    <CollapsibleTable row={userentry} />}
            </div> 
        </div>
    )
}

export default test