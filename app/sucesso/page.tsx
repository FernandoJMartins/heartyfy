import '../globals.css';
import Navbar from '../Components/Navbar';

export default function PagamentoAprovado() {
    return (
        <div className="min-h-screen text-center flex flex-col items-center justify-center p-6">
            <Navbar />

            <h1 className="font-bold  mt-10">
                ✅ Pagamento aprovado com sucesso!
            </h1>

            <p className="mt-6 text-white max-w-xl">
                Obrigado por confiar na <span className="font-semibold">HeartFy</span>! 🎉
            </p>

            <p className="mt-2 text-white  max-w-xl">
                Acabamos de te enviar um <span className="font-semibold">email com o QR Code de acesso</span> ao seu presente personalizado.
            </p>

            <p className="mt-2 text-white max-w-xl">
                Caso não encontre na caixa de entrada, verifique sua <span className="font-semibold">caixa de spam ou promoções</span>.
            </p>

            <p className="mt-6 text-white italic">
                Seu carinho está a um clique de distância ❤️
            </p>
        </div>
    );
}
