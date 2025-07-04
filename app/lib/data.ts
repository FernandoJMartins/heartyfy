import { firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore'

export default async function getSiteDataBySlug(slug: string) {

    const ref = doc(firestore, `sites`, slug);

    const snap = await getDoc(ref);

    return snap.exists() ? snap.data() : null;
}


