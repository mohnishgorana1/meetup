'use client'
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Loader, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

function MeetingRoom() {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal')
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)

    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()

    // if(callingState !== callingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition={'right'} />
            default:
                return <SpeakerLayout participantsBarPosition={'left'} />

        }
    }
    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className={`h-[calc(100vh-86px)] hidden  ${showParticipants && 'block'}`}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className="fixed  bottom-0 flex flex-wrap items-center w-full justify-center gap-5">
                <CallControls />
                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                            <LayoutList size={20} className='text-white' />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, idx) => (
                            <div key={idx}>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}>

                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='border-dark-1' />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className="cursor-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                        <Users size={20} className='text-white' />
                    </div>
                </button>
                {
                    !isPersonalRoom && <EndCallButton />
                }

            </div>
        </section>
    )
}

export default MeetingRoom