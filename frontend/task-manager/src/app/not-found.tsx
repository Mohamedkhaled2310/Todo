import  Link  from 'next/link';

const NotFoundPage = ()=>{
        return(
            <section className='bg-gray-800 flex justify-center items-center flex-col h-screen'>
                <h1 className= 'text-7xl  font-bold'>404</h1>
                <p className=' text-3xl mt-2 mb-4'>
                    Page Not Found
                </p>
                <Link href="/dashboard" className='text-xl underline text-purple-600'>
                    Go To Home Page
                </Link>
            </section>
        );
} 


export default NotFoundPage;