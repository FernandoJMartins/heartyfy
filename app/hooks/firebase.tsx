export default async function firebaseCreateData(lineData: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/firebase/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lineData),
        });


        if (!response.ok) {
            const res = await response.text()
            console.log('res: ', res);
            return
        }

        const data = await response.json();

    } catch (error) {
        console.error("Erro no Firebase Checkout:", error);
    }
}
