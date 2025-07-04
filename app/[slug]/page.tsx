import getSiteDataBySlug from '@/app/lib/data';
import BrowserMockup from '../Components/BrowserMockup';



export default async function SlugPage({ params }: any) {
    const data = await getSiteDataBySlug(params.slug);

    if (!data) return <div>Site não encontrado</div>;

    const { url, title, description, dataInicio, urlFotos, estiloFoto, estiloBackground } = data;

    return (
        <BrowserMockup
            url={url}
            title={title}
            description={description}
            dataInicio={dataInicio}
            urlFotos={urlFotos}
            estiloFoto={estiloFoto}
            estiloBackground={estiloBackground}
        />
    );
}
