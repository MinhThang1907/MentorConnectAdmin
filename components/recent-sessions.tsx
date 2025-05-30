import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentSessionsProps {
  sessions: any[];
}

export function RecentSessions({ sessions }: RecentSessionsProps) {
  return (
    <div className="space-y-8">
      {sessions.map((session, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={
                session.mentorAvatar ||
                "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
              }
              alt="Avatar"
            />
            <AvatarFallback>
              {session.mentorName?.charAt(0) || "M"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{session.title}</p>
            <p className="text-sm text-muted-foreground">
              {session.mentorName} with {session.menteeName}
            </p>
          </div>
          <div className="ml-auto font-medium">{session.duration}min</div>
        </div>
      ))}
    </div>
  );
}
