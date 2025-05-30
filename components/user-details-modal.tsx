"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, MapPin, Star } from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "mentor" | "mentee";
  status: "active" | "suspended" | "pending";
  createdAt: any;
  profileImage?: string;
  rating?: number;
  totalSessions?: number;
  bio?: string;
  skills?: string[];
  location?: string;
}

interface UserDetailsModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

export function UserDetailsModal({
  user,
  open,
  onClose,
}: UserDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    return (
      <Badge variant={role === "mentor" ? "default" : "secondary"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about the user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.profileImage || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <div className="flex space-x-2">
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-medium">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined {user.createdAt || "N/A"}
                </span>
              </div>
              {user.rating && (
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.rating}/5 rating</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Statistics */}
          <div className="space-y-3">
            <h4 className="font-medium">Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {user.totalSessions || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Sessions
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{user.rating || 0}</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Hours</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Bio</h4>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            </>
          )}

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
