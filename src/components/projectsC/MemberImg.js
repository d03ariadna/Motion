export function MiniIMG({member}) {
    return (
        <div className=' h-full w-full pt-[3px] text-center rounded-full font-medium text-base bg-black text-white'>{(member.email.charAt(0)).toUpperCase()}</div>
    )
}

export function BigIMG({member}) {
    return (
        <div className=' h-full w-full pt-[7px] text-center rounded-full font-medium text-2xl bg-black text-white'>{(member.email.charAt(0)).toUpperCase()}</div>
    )
}

export function MainIMG({ member }) {
    return (
        <div className=' h-full w-full pt-[6px] text-center rounded-full font-medium text-2xl bg-black text-white'>{(member.email.charAt(0)).toUpperCase()}</div>
    )
}