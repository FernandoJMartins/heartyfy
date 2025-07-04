import { useRouter } from "next/navigation";

const useFirebase = () => {
    const router = useRouter();

    async function createFirebaseCheckout(checkoutData: any) {
        try {
            const response = await fetch("/api/firebase/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutData),
            });



            if (!response.ok) {
                const res = await response.text()
                console.log('res: ', res);
                return
            }

            const data = await response.json();

            if (data?.redirectUrl) {
                router.push(data.redirectUrl);
            } else {
                console.error("Erro no redirecionamento", data);
            }
        } catch (error) {
            console.error("Erro no Firebase Checkout:", error);
        }
    }

    return { createFirebaseCheckout };
};

export default useFirebase;
