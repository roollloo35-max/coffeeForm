


export default function Loading() {
    return (
        <div className="flex flex-1 justify-center aligen-items mt-100 h-100vh">
            <div className="text-[#AE6931] flex justify-center gap-x-5 animate-spin ">
                <span className="block w-[20px] h-[20px] bg-[#AE6931] rounded-full"></span>
                <span className="block w-[20px] h-[20px] bg-[#AE6931] rounded-full "></span>
                <span className="block w-[20px] h-[20px] bg-[#AE6931] rounded-full "></span>
            </div>
        </div>
    )
}