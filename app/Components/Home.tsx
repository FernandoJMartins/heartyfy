'use client';

export default function Home() {
    function createGift() {

        window.location.href = "/create";

    }

    return (
        <main className="block mx-10 md:px-20 lg:px-55 mt-20 md:mt-50">



            <h1 className="text-[40px] font-bold w-full lg:w-[550px]">
                Mostre o quanto você ama,
                sem dizer uma palavra
            </h1>

            <h3 className="text-[28px] font-bold  w-[450px] mt-3">
                Crie um contador único do seu relacionamento e transforme ele em um presente 100% personalizado, feito só para a pessoa que você ama.
                Compartilhe com um QR Code e surpreenda com algo que ninguém mais terá.
            </h3>

            <button onClick={createGift} className=" mt-10 bg-[#C2255C] text-white px-24 py-3 rounded-2xl font-semibold text-[20px] font-bold w-full lg:w-[450px] border-white border-1 hover:bg-[#A61B4D] transition-colors duration-300 active:scale-95 transition-all shadow-md shadow-pink-800/30">
                Surpreender agora 💝
            </button>
        </main>)
}