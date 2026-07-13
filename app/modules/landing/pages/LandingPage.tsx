import { CardContent } from '~/components/Common/Card';
import { Button } from '../../../components/ui/button';
import { ThemeIconButton, ThemeSelector, ThemeSwitcher } from '~/components/Theme';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const tutorialVideos = [
    {
      title: 'Bench Creation',
      description:
        'Learn to architect custom benches and manage talent pools with precision filtering and skill-mapping automation.',
      image: '/Bench Creation UI Illustration.png',
    },
    {
      title: 'Opportunities',
      description:
        'Track RFP workflows, bidding wars and project assignments through our proprietary opportunity tracking dashboard.',
      image: '/Opportunities Dashboard Illustration.png',
    },
    {
      title: 'Hotlist',
      description:
        'Identify high-priority resources and critical vacancies with our real-time performance and availability monitoring system.',
      image: '/Hotlist Real-time Monitoring Illustration.png',
    },
    {
      title: 'Recruiters',
      description:
        'Manage internal and external recruitment teams, track conversion rates, and optimize your vendor acquisition pipeline.',
      image: '/Recruiters Management Interface Illustration.png',
    },
    {
      title: 'Freelancers',
      description:
        'Streamline compliance, onboarding, and payment cycles for independent contractors within the portal ecosystem.',
      image: '/Freelancers Onboarding & Compliance Illustration.png',
    },
    {
      title: 'Admin',
      description:
        'Configure system-wide settings, manage user permissions, and oversee the architectural health of your vendor portal.',
      image: '/Admin Configuration & Settings Illustration.png',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row gap-5">
      {/* Sidebar */}
      <div className="w-full bg-white p-6 lg:w-64 lg:p-10 flex justify-center lg:justify-start">
        <img
          src="/BridgeTalentLogo.png"
          alt="Bridge Talent Logo"
          className="h-9 w-auto object-contain"
        />
      </div>

      {/* Main */}
      <div className="flex-1 bg-[#F7F9FB] overflow-y-auto">
        {/* Top Buttons */}
        <div className="flex justify-center lg:justify-end gap-4 lg:gap-10 p-5 flex-wrap">
          {/* Theme Toggle Button */}
          <ThemeIconButton size="icon" />

          <Button
            className="rounded-lg bg-[#136DEC] px-6 py-5 text-white hover:bg-[#0f5dd0]"
            onClick={() => navigate('/register')}
          >
            Sign up
          </Button>

          <Button
            className="rounded-lg bg-[#136DEC] px-6 py-5 text-white hover:bg-[#0f5dd0]"
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
          <ThemeSwitcher />
        </div>

        <div className="m-4 flex flex-col gap-10 lg:m-8">
          {/* Hero */}
          <div className="rounded-lg bg-[#1A365D] p-6 text-white lg:p-8">
            <h1 className="text-3xl font-bold lg:text-4xl">Welcome to Bridge Talent</h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#86A0CD] lg:text-lg">
              Master the Architectural Authority platform with curated feature tours. Explore
              specialized tools designed for high-performance vendor management and resource
              optimization.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button className="rounded-lg bg-white px-5 py-5 text-black hover:bg-gray-100">
                Overview Video
              </Button>

              <Button
                variant="outline"
                className="rounded-lg border-white bg-transparent px-5 py-5 text-white hover:bg-white hover:text-black"
              >
                Release Notes
              </Button>
            </div>
          </div>

          {/* Theme Switcher Section */}
          <ThemeSelector />

          {/* Feature Catalog */}
          <div>
            <h2 className="text-2xl font-semibold text-[#002045]">Feature Tour Catalog</h2>

            <p className="mt-2 text-base leading-7 text-[#515F74]">
              Select a module to begin your technical deep-dive.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tutorialVideos.map((video, index) => (
                <Card key={index} className="overflow-hidden rounded-xl pt-0 shadow-sm">
                  {/* Image */}
                  <div className="relative">
                    <div className="absolute inset-0 z-10" />

                    <img src={video.image} alt={video.title} className="h-56 w-58" />
                  </div>

                  {/* Content */}
                  <CardContent className="p-0">
                    <CardHeader className="space-y-3 p-5">
                      <CardTitle>{video.title}</CardTitle>

                      <CardDescription className="leading-6">{video.description}</CardDescription>
                    </CardHeader>

                    <CardFooter className="p-5 pt-5">
                      <Button
                        className="w-full rounded-md bg-[#ECEEF0] py-5 text-[#002045] hover:bg-[#dcdee0]"
                        size="sm"
                      >
                        Watch Video Tour
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
