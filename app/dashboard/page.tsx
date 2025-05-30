"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { RecentSessions } from "@/components/recent-sessions";
import { StatsCards } from "@/components/stats-cards";
import { UserGrowthChart } from "@/components/user-growth-chart";
import { getAnalytics } from "@/lib/firebase-admin";

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
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

  const userGrowthData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 300 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 280 },
    { month: "May", users: 590 },
    { month: "Jun", users: 320 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to MentorConnect Admin Dashboard
        </p>
      </div>

      <StatsCards analytics={analytics} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={monthlyRevenue} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>
              Latest mentoring sessions on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSessions sessions={analytics?.recentSessions || []} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user registration trends</CardDescription>
          </CardHeader>
          <CardContent>
            <UserGrowthChart data={userGrowthData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>
              Key metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Active Sessions</span>
              <span className="text-sm text-muted-foreground">
                {analytics?.activeSessions || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm text-muted-foreground">
                {analytics?.completionRate || 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Average Rating</span>
              <span className="text-sm text-muted-foreground">
                {analytics?.averageRating || 0}/5
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Response Time</span>
              <span className="text-sm text-muted-foreground">
                {analytics?.responseTime || 0}h
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
