import React from 'react'
import SideBarLink from './SideBarLink'


const drillIcon = (
    <svg className='h-4' xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1"><path fill='#EDF2F7' d="m4 4h7v2h-7zm0 5h7v-2h-7zm20-1.5h-4v2.5h-3.538l-3.6 3h-3.149l-.588 5h.875c1.654 0 3 1.346 3 3v3h-13v-3c0-1.56 1.201-2.831 2.725-2.972l.6-5.096c-1.884-.323-3.325-1.957-3.325-3.932v-5c0-2.124 1.71-4 4-4h8.862l3.6 3h3.538v2.5h4zm-14 12.5h-7c-.551 0-1 .448-1 1v1h9v-1c0-.552-.449-1-1-1zm-2.301-7h-2.368l-.588 5h2.368zm6.301-3.552v-5.896l-1.862-1.552h-8.138c-1.077 0-2 .875-2 2v5c0 1.103.897 2 2 2h8.138zm4-4.448h-2v3h2z"/></svg>
)

const calendarIcon = (
    <svg className='h-4 w-4 fill-neutral-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M21,2H18V0H16V2H8V0H6V2H3A3,3,0,0,0,0,5V24H24V5A3,3,0,0,0,21,2ZM2,5A1,1,0,0,1,3,4H21a1,1,0,0,1,1,1V8H2ZM2,22V10H22V22Z"/><rect x="15" y="13" width="2" height="2"/><rect x="11" y="13" width="2" height="2"/><rect x="7" y="13" width="2" height="2"/><rect x="15" y="17" width="2" height="2"/><rect x="11" y="17" width="2" height="2"/><rect x="7" y="17" width="2" height="2"/></g></svg>
)

const accountIcon = (
    <svg className='h-4 w-4 fill-neutral-white' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
        <path d="M12.006,12.309c3.611-.021,5.555-1.971,5.622-5.671-.062-3.56-2.111-5.614-5.634-5.637-3.561,.022-5.622,2.17-5.622,5.637,0,3.571,2.062,5.651,5.634,5.672Zm-.012-9.309c2.437,.016,3.591,1.183,3.634,3.636-.047,2.559-1.133,3.657-3.622,3.672-2.495-.015-3.582-1.108-3.634-3.654,.05-2.511,1.171-3.639,3.622-3.654Z"/>
        <path d="M11.994,13.661c-5.328,.034-8.195,2.911-8.291,8.322-.01,.552,.43,1.008,.982,1.018,.516-.019,1.007-.43,1.018-.982,.076-4.311,2.08-6.331,6.291-6.357,4.168,.027,6.23,2.106,6.304,6.356,.01,.546,.456,.983,1,.983h.018c.552-.01,.992-.465,.983-1.017-.092-5.333-3.036-8.288-8.304-8.322Z"/>
    </svg>
)


export default function SideBar() {
  return (
    <section className='bg-primary-dark flex flex-col gap-5 p-5 text-neutral-white h-full'>
        <SideBarLink text="Machines" icon={drillIcon}/>
        <SideBarLink text="Calendar" icon={calendarIcon}/>
        <SideBarLink text="Account" icon={accountIcon}/>
    </section>
  )
}
