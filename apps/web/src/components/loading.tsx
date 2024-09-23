export default function LoadingComp() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://www.svgrepo.com/show/439153/event-loop.svg" className="h-8" alt="Blog Logo" />
                <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-gray-500">Eventism</span>
            </div>
        </div>
    )
}