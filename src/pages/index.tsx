import type { NextPage } from "next";
import Head from "next/head";
import Table from "@components/table";
import { trpc } from "@utils/trpc";

const Home: NextPage = () => {
  const { data, refetch, isLoading } = trpc.tse.useQuery();

  return (
    <>
      <Head>
        <title>Apuração Eleições 2022/2º turno</title>
        <meta name='description' content='Apuração Eleições 2022 - 2º turno' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/apple-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/apple-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/apple-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/apple-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/apple-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/apple-icon-144x144.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/apple-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-icon-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/android-icon-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/favicon-96x96.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='msapplication-TileColor' content='#ee0000' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#ee0000' />
      </Head>
      <div className=''>
        <h1 className='flex justify-center text-lg mt-4'>
          <strong>Apuração Eleições 2022 / 2º turno</strong>
        </h1>

        <div className='mt-4 flex justify-center'>
          <span>
            Percentual de urnas apuradas: <strong>{data?.psi || 0}%</strong>
          </span>
        </div>

        <div className='mt-4 flex justify-center'>
          <button
            className='border flex p-1 rounded align-center'
            onClick={() => refetch()}
          >
            {isLoading ? (
              "Carregando"
            ) : (
              <span className='text-sm'>Recarregar</span>
            )}
          </button>
        </div>

        <div className='mt-4'>
          <Table data={data?.cand} />
        </div>
      </div>
    </>
  );
};

export default Home;
