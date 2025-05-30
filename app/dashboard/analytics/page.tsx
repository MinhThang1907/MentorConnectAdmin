"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/overview";
import { UserGrowthChart } from "@/components/user-growth-chart";
import { SessionAnalytics } from "@/components/session-analytics";
import { RevenueChart } from "@/components/revenue-chart";
import { getDetailedAnalytics } from "@/lib/firebase-admin";
import { Users, Calendar, DollarSign, Star } from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getDetailedAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const monthlyRevenue = [
    { name: "Jan", total: 2400 },
    { name: "Feb", total: 1398 },
    { name: "Mar", total: 9800 },
    { name: "Apr", total: 3908 },
    { name: "May", total: 4800 },
    { name: "Jun", total: 3800 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${analytics?.totalRevenue?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +{analytics?.revenueGrowth || 0}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.activeUsers?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +{analytics?.userGrowth || 0}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sessions This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.monthlySessions?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +{analytics?.sessionGrowth || 0}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.averageRating?.toFixed(1) || 0}/5
            </div>
            <p className="text-xs text-muted-foreground">
              +{analytics?.ratingImprovement || 0}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>
                  Revenue and session trends over the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={analytics?.monthlyOverview || monthlyRevenue} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Session Completion Rate
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.completionRate || 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Average Session Duration
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.avgSessionDuration || 0} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    User Retention Rate
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.retentionRate || 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Response Time</span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.avgResponseTime || 0}h
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  New user registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart data={analytics?.userGrowthData || []} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  Breakdown of mentors vs mentees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Mentors</span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.totalMentors || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Mentees</span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.totalMentees || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Mentor/Mentee Ratio
                  </span>
                  <span className="text-sm text-muted-foreground">
                    1:{analytics?.mentorMenteeRatio || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Active This Month</span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.activeThisMonth || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Session Analytics</CardTitle>
                <CardDescription>Session trends and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <SessionAnalytics data={analytics?.sessionData || []} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Session Metrics</CardTitle>
                <CardDescription>
                  Key session performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Sessions</span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.totalSessions || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Completed Sessions
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.completedSessions || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Cancelled Sessions
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.cancelledSessions || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">No-show Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {analytics?.noShowRate || 0}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart data={analytics?.revenueData || []} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
                <CardDescription>
                  Financial performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Monthly Recurring Revenue
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ${analytics?.mrr?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Average Revenue Per User
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ${analytics?.arpu?.toFixed(2) || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Platform Commission
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ${analytics?.platformCommission?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Payout to Mentors</span>
                  <span className="text-sm text-muted-foreground">
                    ${analytics?.mentorPayouts?.toLocaleString() || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
