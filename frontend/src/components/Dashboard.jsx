import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/config'
import { BlinkBlur } from 'react-loading-indicators'
import { } from 'lucide-react'
import HeroSlider from '../DashboardComponents/HeroSlider'
import StatsCards from '../DashboardComponents/StatsCards'
import UpcomingCars from '../DashboardComponents/UpcomingCars'
import RecentCars from '../DashboardComponents/RecentCars'
import RecentBrands from '../DashboardComponents/RecentBrands'
import RecentReviews from '../DashboardComponents/RecentReviews'
import DashboardSkeleton from "../DashboardComponents/DashboardSkeleton";

const Dashboard = () => {

  const [ok, setOk] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {

      const token = localStorage.getItem("token");

      try {

        const res = await axios.get(`${BASE_URL}/api/total`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setData(res.data);
          setOk(true);
        }

      } catch (error) {
        console.log(error);
      }
    }

    fetchDashboard();

  }, []);

  if (!ok) {
     return <DashboardSkeleton />;
    // return (
    //   <div className="min-h-screen bg-black flex items-center justify-center">
    //     <BlinkBlur
    //       color="#fff200"
    //       size="medium"
    //       text="Loading..."
    //       textColor="#ffffff"
    //     />
    //   </div>
    // )
  }

  return (
    <div> 
      <HeroSlider data={data} />
      <StatsCards data={data}/>
      <UpcomingCars data={data} />
      <RecentCars data={data} />
      <RecentBrands brands={data.recentbrands} />
      <RecentReviews reviews={data.recentreviews} />
    </div>
  )
}

export default Dashboard