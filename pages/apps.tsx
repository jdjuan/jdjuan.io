import { ReactElement } from "react";
import MainLayout from "../components/main-layout";
import Navbar from "../components/navbar";
import headscroll from "/public/headscroll.png";
import pada from "/public/pada.png";
import derdiedas from "/public/derdiedas.png";
import angularnow from "/public/ngnow.png";
import kindd from "/public/kindd.png";
import compliment from "/public/compliment.png";
import App from "../components/app";

const Apps = () => {
  return (
    <div className='prose'>
      <>
        <Navbar></Navbar>
        <>
          {/* MAIN TITLE */}
          <h1 className='mb-6 font-headline text-4xl md:mb-10'>Apps</h1>
          {/* APPS */}
          <div className='grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6'>
            <App
              title='HeadScroll'
              description='HeadScroll was a website that allowed you to scroll music tabs with your head. Perfect for playing an instrument!'
              image={headscroll}
              url='https://www.youtube.com/watch?v=oFL9mT2qML8'
            ></App>
            <App
              title='Der Die Das'
              description='Look up the grammatical gender of any noun quickly and easily within your browser.'
              image={derdiedas}
              url='https://chromewebstore.google.com/detail/der-die-das/hmonhjepfljoekiljlfoeppbilobkbmj'
            ></App>
            <App
              title='P.A.D.A.'
              description='P.A.D.A. is a template for better meeting invites. It stands for Purpose, Agenda, Documents, and Actions.'
              image={pada}
              url='https://jdjuan.github.io/pada/'
            ></App>
            <App
              title='Angular Now'
              description='Use a bookmarklet to run Angular projects with one click, on Stackblitz.'
              image={angularnow}
              url='https://jdjuan.github.io/ng-now/'
            ></App>
            <App
              title='Kindd'
              description='Social Media challenge to encourage people to share a kind advice with others.'
              image={kindd}
              url='https://photos.app.goo.gl/fABipdXjpe2gwP8VA'
            ></App>
            <App
              title='The Compliment Project'
              description='An initiative to encourage people to express their feelings to their loved ones before it is too late.'
              image={compliment}
              url='https://drive.google.com/file/d/1j1NuLd-I-4mXb4-8BQFSKQ8a-hHs3iOo/view?usp=sharing'
            ></App>
          </div>
        </>
      </>
    </div>
  );
};

Apps.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Apps;
