import React from 'react'
import { Icon } from 'antd'

export const TITLE = "Nightingale"
export const DATE_FORMAT = "DD/MM/YYYY"
export const TIME_FORMAT = "hh:mm A"
export const GET_ADDRESS_API_KEY = "FZzv8K70rUupMksa7Zy8fA25121"
export const TIMESHEET_DAYS = [
    {id: 1, name: 'Monday'},
    {id: 2, name: 'Tuesday'},
    {id: 3, name: 'Wednesday'},
    {id: 4, name: 'Thursday'},
    {id: 5, name: 'Friday'},
    {id: 6, name: 'Saturday'},
    {id: 7, name: 'Sunday'}
]
export const TIMESHEET_SHIFTS = [
    {id: 1, name: 'Early Shift', startTime: '07:00 AM', endTime: '03:00 PM'},
    {id: 2, name: 'Late Shift', startTime: '02:00 PM', endTime: '10:00 PM'},
    {id: 3, name: 'Night Shift', startTime: '08:00 PM', endTime: '08:00 AM'},
    {id: 4, name: 'Early Long Shift', startTime: '07:00 AM', endTime: '08:00 PM'},
    {id: 5, name: 'Customized Shift'}
]

export const GENDER_OPTIONS = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Others' }
]
export const QUALIFICATION_OPTIONS = [
    { id: 1, name: 'Registered Nurse Learning Disabilities' },
    { id: 2, name: 'Registered General Nurse' },
    { id: 3, name: 'Registered Mental Nurse' },
    { id: 4, name: `Registered Sick Children's Nurse` },
    { id: 5, name: 'Advanced Nursing Practitioner' },
    { id: 6, name: 'Emergency Nursing Practitioner' },
    { id: 7, name: 'Operating Department Practitioner' },
    { id: 8, name: 'ICU/HDU Nurse' },
    { id: 9, name: 'Nursing Associate' }
]

export const PROFESSIONAL_COLUMNS = [
    { title: 'Name', dataIndex: 'fullName' },
    { title: 'Gender', dataIndex: 'status' },
    { title: 'NMC Pin', dataIndex: 'nmcPin' },
    { title: 'CPD Hours', dataIndex: 'cpdHours' },
    { title: 'View Profile', dataIndex: '', key: 'x', render: () => <Icon type="eye" /> }
]

export const data = [
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' },
    { status: 'Male', fullName: 'Salman Haider', nmcPin: '1234', cpdHours: '25' }
]