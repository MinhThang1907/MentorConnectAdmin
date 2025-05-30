import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  analytics: any;
}

export function StatsCards({ analytics }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Users",
      value: analytics?.totalUsers?.toLocaleString() || "0",
      change: `+${analytics?.userGrowth || 0}%`,
      icon: Users,
    },
    {
      title: "Active Sessions",
      value: analytics?.activeSessions?.toLocaleString() || "0",
      change: `+${analytics?.sessionGrowth || 0}%`,
      icon: Calendar,
    },
    {
      title: "Monthly Revenue",
      value: `$${analytics?.monthlyRevenue?.toLocaleString() || "0"}`,
      change: `+${analytics?.revenueGrowth || 0}%`,
      icon: DollarSign,
    },
    {
      title: "Growth Rate",
      value: `${analytics?.growthRate || 0}%`,
      change: `+${analytics?.growthChange || 0}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
