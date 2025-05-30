"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Filter,
  Download,
  Eye,
  Calendar,
  Clock,
} from "lucide-react";
import { getSessions } from "@/lib/firebase-admin";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  title: string;
  mentorId: string;
  menteeId: string;
  mentor: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  mentee: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  scheduledAt: any;
  duration: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: any;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [sessions, searchTerm, filterStatus]);

  const fetchSessions = async () => {
    try {
      const sessionsData = await getSessions();
      setSessions(sessionsData);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch sessions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSessions = () => {
    let filtered = sessions;

    if (searchTerm) {
      filtered = filtered.filter(
        (session) =>
          session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.mentor.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          session.mentor.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          session.mentee.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          session.mentee.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((session) => session.status === filterStatus);
    }

    setFilteredSessions(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "confirmed":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Confirmed
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sessions</h2>
          <p className="text-muted-foreground">
            Manage mentoring sessions on the platform
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sessions</CardTitle>
          <CardDescription>
            A list of all mentoring sessions on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {filterStatus === "all" ? "All" : filterStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("confirmed")}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("cancelled")}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session</TableHead>
                <TableHead>Mentor</TableHead>
                <TableHead>Mentee</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {session.id.slice(0, 8)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            session.mentor.profileImage || "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {session.mentor.firstName[0]}
                          {session.mentor.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {session.mentor.firstName} {session.mentor.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            session.mentee.profileImage || "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {session.mentee.firstName[0]}
                          {session.mentee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {session.mentee.firstName} {session.mentee.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{session.scheduledAt}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {formatDuration(session.duration)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
