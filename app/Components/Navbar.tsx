'use client'

export default function Navbar() {
    return (
        <div className="mt-5 font-[family-name:var(--font-geist-sans)]">
            <header className="mx-10 md:px-20 lg:px-55 flex items-center justify-between w-full">

                <img

                    onClick={() => window.location.href = '/'}
                    src='/background1.svg' alt='Logo HeartyFy' className='w-[140px] md:w-[140px] lg:w-[250px] hover:cursor-pointer' />


                <ul className=" hidden lg:flex gap-4">
                    <div className="row-start-10 flex justify-center gap-4 " id='navbar'>
                        <li className="text-white cursor-pointer">
                            <a className="cursor-pointer">Preços</a>
                        </li>
                        <li className="text-white cursor-pointer">
                            <a className="cursor-pointer" href='#comoFazer'>Como Fazer</a>
                        </li>
                        <li className="text-white cursor-pointer">
                            <a className="cursor-pointer" href='#feedbacks'>Feedbacks</a>
                        </li>

                    </div>
                </ul >
            </header >
        </div>)
}