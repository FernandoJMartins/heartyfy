export async function createFirebaseCheckout(checkoutData: any) {
    console.log(`${process.env.NEXT_PUBLIC_SITE_URL}/api/firebase/checkout`)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/firebase/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutData),
        });

        if (!response.ok) {
            const res = await response.text();
            console.error("❌ Firebase Checkout falhou:", res);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("💥 Erro ao chamar Firebase Checkout:", error);
        return null;
    }
}
