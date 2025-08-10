import React from 'react';
import { DashboardTemplate } from '../templates';
import {
  EcommerceMetrics,
  MonthlyTarget,
  MonthlySalesChart,
  StatisticsChart,
  RecentOrders,
  DemographicCard,
} from '../organisms';

const DashboardPage: React.FC = () => {
  return (
    <DashboardTemplate
      title='Dashboard'
      subtitle="Welcome back! Here's what's happening with your business today."
    >
      <div className='grid grid-cols-12 gap-4 md:gap-6'>
        <div className='col-span-12 space-y-6 xl:col-span-7'>
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className='col-span-12 xl:col-span-5'>
          <MonthlyTarget />
        </div>

        <div className='col-span-12'>
          <StatisticsChart />
        </div>

        <div className='col-span-12 xl:col-span-5'>
          <DemographicCard />
        </div>

        <div className='col-span-12 xl:col-span-7'>
          <RecentOrders />
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default DashboardPage;
